import rules from '../rules/dca-airtable-rules.json';

const tableNamePattern = new RegExp(rules.naming.tablePattern);
const fieldNamePattern = new RegExp(rules.naming.fieldPattern);
const vagueDescriptionPatterns = rules.descriptions.vagueOnlyPatterns.map(pattern => new RegExp(pattern, 'i'));

function issue({
  code,
  severity,
  scope,
  table,
  field,
  message,
  expected,
  actual,
  safeFix = null,
  reviewAction = null,
  executionState = 'unavailable',
  executionNote = null,
}) {
  return {
    code,
    severity,
    scope,
    tableId: table?.id ?? null,
    tableName: table?.name ?? null,
    fieldId: field?.id ?? null,
    fieldName: field?.name ?? null,
    message,
    expected: expected ?? null,
    actual: actual ?? null,
    safeFix,
    reviewAction,
    executionState,
    executionNote,
  };
}

export function toSnakeCase(name) {
  return String(name)
    .trim()
    .replace(/([a-z0-9])([A-Z])/g, '$1_$2')
    .replace(/[^A-Za-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '')
    .toLowerCase();
}

export function toTitleCaseUnderscore(name) {
  const parts = String(name)
    .trim()
    .replace(/([a-z0-9])([A-Z])/g, '$1_$2')
    .split(/[^A-Za-z0-9]+/)
    .filter(Boolean);

  if (!parts.length || parts.some(part => !/^[A-Za-z][A-Za-z0-9]*$/.test(part))) {
    return null;
  }

  return parts
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join('_');
}

function descriptionIsMissing(value) {
  return !value || !String(value).trim();
}

function descriptionIsVague(value) {
  if (descriptionIsMissing(value)) return false;
  const text = String(value).trim();
  if (text.length >= rules.descriptions.minimumUsefulLength) return false;
  return vagueDescriptionPatterns.some(pattern => pattern.test(text));
}

function tableHasNameCollision(base, table, targetName) {
  return base.tables.some(other => other.id !== table.id && other.name.toLowerCase() === targetName.toLowerCase());
}

function fieldHasNameCollision(table, field, targetName) {
  return table.fields.some(other => other.id !== field.id && other.name.toLowerCase() === targetName.toLowerCase());
}

function configuredTableRule(table) {
  return rules.configuredTables?.[table.name] ?? null;
}

function approvedTableRename(table, targetName) {
  const configured = configuredTableRule(table);
  return configured?.dependencyClearance === true && configured?.approvedRenameTarget === targetName;
}

function approvedFieldRename(table, field, targetName) {
  const configured = configuredTableRule(table)?.fields?.[field.name];
  return configured?.dependencyClearance === true && configured?.approvedRenameTarget === targetName;
}

function auditTableName(base, table, issues) {
  if (tableNamePattern.test(table.name)) return;

  const target = toTitleCaseUnderscore(table.name);
  const candidate = target && target !== table.name && tableNamePattern.test(target) && !tableHasNameCollision(base, table, target);
  const safe = candidate && approvedTableRename(table, target);

  issues.push(issue({
    code: 'table_name',
    severity: safe ? 'warning' : 'review',
    scope: 'table',
    table,
    message: safe
      ? `Table name does not follow ${rules.naming.tableStyle}; an explicitly cleared mechanical repair is ready.`
      : candidate
        ? `Table name does not follow ${rules.naming.tableStyle}. Schema Guard can repair this after explicit approval.`
        : `Table name does not follow ${rules.naming.tableStyle}, and no unambiguous repair can currently be generated.`,
    expected: candidate ? target : rules.naming.tableStyle,
    actual: table.name,
    safeFix: safe ? {kind: 'rename_table', targetName: target} : null,
    reviewAction: !safe && candidate ? {
      kind: 'rename_table',
      targetName: target,
      label: `Rename to ${target}`,
      risk: 'Renaming may affect external consumers that reference the current table name. Approval authorizes only this exact rename; Schema Guard re-checks collisions immediately before applying it.',
    } : null,
    executionState: safe ? 'safe' : candidate ? 'approval' : 'unavailable',
    executionNote: candidate ? null : 'Schema Guard cannot derive one exact repair from the current evidence.',
  }));
}

function auditFieldName(table, field, issues) {
  if (fieldNamePattern.test(field.name)) return;

  const target = toSnakeCase(field.name);
  const candidate = target && target !== field.name && fieldNamePattern.test(target) && !fieldHasNameCollision(table, field, target);
  const safe = candidate && approvedFieldRename(table, field, target);

  issues.push(issue({
    code: 'field_name',
    severity: safe ? 'warning' : 'review',
    scope: 'field',
    table,
    field,
    message: safe
      ? `Field name does not follow ${rules.naming.fieldStyle}; an explicitly cleared mechanical repair is ready.`
      : candidate
        ? `Field name does not follow ${rules.naming.fieldStyle}. Schema Guard can repair this after explicit approval.`
        : `Field name does not follow ${rules.naming.fieldStyle}, and no unambiguous repair can currently be generated.`,
    expected: candidate ? target : rules.naming.fieldStyle,
    actual: field.name,
    safeFix: safe ? {kind: 'rename_field', targetName: target} : null,
    reviewAction: !safe && candidate ? {
      kind: 'rename_field',
      targetName: target,
      label: `Rename to ${target}`,
      risk: 'Renaming may affect formulas, automations, interfaces, scripts, APIs, syncs, or external consumers that reference the current field name. Approval authorizes only this exact rename; Schema Guard re-checks collisions immediately before applying it.',
    } : null,
    executionState: safe ? 'safe' : candidate ? 'approval' : 'unavailable',
    executionNote: candidate ? null : 'Schema Guard cannot derive one exact repair from the current evidence.',
  }));
}

function auditDescriptions(table, field, issues) {
  if (!field && rules.descriptions.requiredForTables && descriptionIsMissing(table.description)) {
    issues.push(issue({
      code: 'table_description_missing',
      severity: 'review',
      scope: 'table',
      table,
      message: 'Maintained table is missing a usage description. Schema Guard owns the repair, but it must not invent the authoritative wording.',
      expected: 'Clear table purpose and usage description',
      actual: null,
      executionState: 'unavailable',
      executionNote: 'Add an authoritative description to Schema Guard configuration; once configured, this should become an executable repair rather than a manual Airtable task.',
    }));
  }

  if (field && rules.descriptions.requiredForFields && descriptionIsMissing(field.description)) {
    issues.push(issue({
      code: 'field_description_missing',
      severity: 'review',
      scope: 'field',
      table,
      field,
      message: 'Maintained field is missing a usage description. Schema Guard owns the repair, but it must not invent the authoritative wording.',
      expected: 'Clear field purpose and usage description',
      actual: null,
      executionState: 'unavailable',
      executionNote: 'Add an authoritative description to Schema Guard configuration; once configured, this should become an executable repair rather than a manual Airtable task.',
    }));
  } else if (field && descriptionIsVague(field.description)) {
    issues.push(issue({
      code: 'field_description_vague',
      severity: 'review',
      scope: 'field',
      table,
      field,
      message: 'Field description is too vague to establish correct usage. Schema Guard must receive authoritative replacement wording before it can repair it.',
      expected: 'Explicit meaning, usage, boundaries, and blank/uncertainty semantics where applicable',
      actual: field.description,
      executionState: 'unavailable',
      executionNote: 'Awaiting authoritative replacement wording in Schema Guard configuration.',
    }));
  }
}

function auditPrimaryField(table, issues) {
  const configured = configuredTableRule(table);
  if (configured?.primaryFieldException === true) return;

  const primary = table.primaryField;
  if (!primary) {
    issues.push(issue({
      code: 'primary_field_unknown',
      severity: 'review',
      scope: 'table',
      table,
      message: 'Primary field could not be inspected.',
      executionState: 'unavailable',
      executionNote: 'Schema Guard cannot safely plan a repair until the primary field can be inspected.',
    }));
    return;
  }

  if (primary.type !== rules.primaryField.preferredType) {
    issues.push(issue({
      code: 'primary_field_type',
      severity: 'review',
      scope: 'field',
      table,
      field: primary,
      message: 'Primary field is not a formula. Schema Guard owns this repair, but execution stays unavailable until the exact formula migration and supported executor are defined.',
      expected: rules.primaryField.preferredType,
      actual: primary.type,
      executionState: 'unavailable',
      executionNote: 'Do not repair this manually as part of normal Guard use. Add an exact migration/executor to Schema Guard, then approve and execute it through the Guard.',
    }));
  }
}

function auditCanonicalType(table, field, issues) {
  const allowed = rules.canonicalFieldTypes[field.name];
  if (!allowed || allowed.includes(field.type)) return;

  issues.push(issue({
    code: 'canonical_field_type',
    severity: 'review',
    scope: 'field',
    table,
    field,
    message: 'Field name has an established semantic type mapping, but the current Airtable type differs. Schema Guard must use an exact migration rather than blindly converting the field.',
    expected: allowed.join(' or '),
    actual: field.type,
    executionState: 'unavailable',
    executionNote: 'Awaiting an exact, data-safe migration executor in Schema Guard.',
  }));
}

function auditConfiguredLanguage(table, issues) {
  const configured = configuredTableRule(table);
  if (!configured?.communicationRelated) return;

  const required = configured.languageFields ?? ['communication_language'];
  const names = new Set(table.fields.map(field => field.name));
  for (const fieldName of required) {
    if (!names.has(fieldName)) {
      issues.push(issue({
        code: 'language_context_missing',
        severity: 'review',
        scope: 'table',
        table,
        message: `Configured communication-related table is missing ${fieldName}. Schema Guard must have the complete authoritative field definition before creating it.`,
        expected: fieldName,
        actual: null,
        executionState: 'unavailable',
        executionNote: 'Awaiting complete configured field definition and a supported field-creation executor.',
      }));
    }
  }
}

export function auditBase(base) {
  const issues = [];

  for (const table of base.tables) {
    auditTableName(base, table, issues);
    auditDescriptions(table, null, issues);
    auditPrimaryField(table, issues);
    auditConfiguredLanguage(table, issues);

    for (const field of table.fields) {
      auditFieldName(table, field, issues);
      auditDescriptions(table, field, issues);
      auditCanonicalType(table, field, issues);
    }
  }

  return issues;
}

export function summarizeIssues(issues) {
  return issues.reduce(
    (summary, current) => {
      summary.total += 1;
      summary[current.severity] = (summary[current.severity] ?? 0) + 1;
      if (current.safeFix) summary.safeFixes += 1;
      if (current.reviewAction) summary.approvable += 1;
      if (current.executionState === 'unavailable') summary.awaitingExecutor += 1;
      return summary;
    },
    {total: 0, warning: 0, review: 0, error: 0, safeFixes: 0, approvable: 0, awaitingExecutor: 0},
  );
}

async function resolveTable(base, finding) {
  return base.getTableByIdIfExists
    ? base.getTableByIdIfExists(finding.tableId)
    : base.tables.find(item => item.id === finding.tableId);
}

export async function applySafeFix(base, finding) {
  if (!finding.safeFix) return {applied: false, reason: 'No explicitly cleared safe repair is configured'};
  return applyAction(base, finding, finding.safeFix, false);
}

export async function applyApprovedAction(base, finding) {
  if (!finding.reviewAction) return {applied: false, reason: 'No approval-executable repair is available'};
  return applyAction(base, finding, finding.reviewAction, true);
}

async function applyAction(base, finding, action, approvedByUser) {
  const table = await resolveTable(base, finding);
  if (!table) return {applied: false, reason: 'Table no longer exists'};

  if (action.kind === 'rename_table') {
    if (!approvedByUser && !approvedTableRename(table, action.targetName)) {
      return {applied: false, reason: 'Dependency clearance is no longer configured for this rename'};
    }
    if (typeof table.updateNameAsync !== 'function') {
      return {applied: false, reason: 'Schema Guard runtime cannot execute table renames here'};
    }
    if (tableHasNameCollision(base, table, action.targetName)) {
      return {applied: false, reason: 'Target table name now collides with another table'};
    }
    await table.updateNameAsync(action.targetName);
    return {applied: true};
  }

  if (action.kind === 'rename_field') {
    const field = table.getFieldByIdIfExists
      ? table.getFieldByIdIfExists(finding.fieldId)
      : table.fields.find(item => item.id === finding.fieldId);

    if (!field) return {applied: false, reason: 'Field no longer exists'};
    if (!approvedByUser && !approvedFieldRename(table, field, action.targetName)) {
      return {applied: false, reason: 'Dependency clearance is no longer configured for this rename'};
    }
    if (typeof field.updateNameAsync !== 'function') {
      return {applied: false, reason: 'Schema Guard runtime cannot execute field renames here'};
    }
    if (fieldHasNameCollision(table, field, action.targetName)) {
      return {applied: false, reason: 'Target field name now collides with another field'};
    }
    await field.updateNameAsync(action.targetName);
    return {applied: true};
  }

  return {applied: false, reason: 'Schema Guard has no executor for this repair yet'};
}

export {rules};
