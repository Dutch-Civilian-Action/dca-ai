import rules from '../rules/dca-airtable-rules.json';

const tableNamePattern = new RegExp(rules.naming.tablePattern);
const fieldNamePattern = new RegExp(rules.naming.fieldPattern);
const vagueDescriptionPatterns = rules.descriptions.vagueOnlyPatterns.map(pattern => new RegExp(pattern, 'i'));

function issue({code, severity, scope, table, field, message, expected, actual, safeFix = null}) {
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
  };
}

export function toSnakeCase(name) {
  const normalized = String(name)
    .trim()
    .replace(/([a-z0-9])([A-Z])/g, '$1_$2')
    .replace(/[^A-Za-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '')
    .toLowerCase();
  return normalized;
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

function auditTableName(base, table, issues) {
  if (tableNamePattern.test(table.name)) return;

  const target = toTitleCaseUnderscore(table.name);
  const safe = target && target !== table.name && tableNamePattern.test(target) && !tableHasNameCollision(base, table, target);

  issues.push(issue({
    code: 'table_name',
    severity: safe ? 'warning' : 'review',
    scope: 'table',
    table,
    message: safe
      ? `Table name does not follow ${rules.naming.tableStyle}.`
      : `Table name does not follow ${rules.naming.tableStyle}, and no unambiguous safe rename is available.`,
    expected: rules.naming.tableStyle,
    actual: table.name,
    safeFix: safe ? {kind: 'rename_table', targetName: target} : null,
  }));
}

function auditFieldName(table, field, issues) {
  if (fieldNamePattern.test(field.name)) return;

  const target = toSnakeCase(field.name);
  const safe = target && target !== field.name && fieldNamePattern.test(target) && !fieldHasNameCollision(table, field, target);

  issues.push(issue({
    code: 'field_name',
    severity: safe ? 'warning' : 'review',
    scope: 'field',
    table,
    field,
    message: safe
      ? `Field name does not follow ${rules.naming.fieldStyle}.`
      : `Field name does not follow ${rules.naming.fieldStyle}, and no unambiguous safe rename is available.`,
    expected: rules.naming.fieldStyle,
    actual: field.name,
    safeFix: safe ? {kind: 'rename_field', targetName: target} : null,
  }));
}

function auditDescriptions(table, field, issues) {
  if (!field && rules.descriptions.requiredForTables && descriptionIsMissing(table.description)) {
    issues.push(issue({
      code: 'table_description_missing',
      severity: 'review',
      scope: 'table',
      table,
      message: 'Maintained table is missing a usage description. Schema Guard must not invent one.',
      expected: 'Clear table purpose and usage description',
      actual: null,
    }));
  }

  if (field && rules.descriptions.requiredForFields && descriptionIsMissing(field.description)) {
    issues.push(issue({
      code: 'field_description_missing',
      severity: 'review',
      scope: 'field',
      table,
      field,
      message: 'Maintained field is missing a usage description. Schema Guard must not invent one.',
      expected: 'Clear field purpose and usage description',
      actual: null,
    }));
  } else if (field && descriptionIsVague(field.description)) {
    issues.push(issue({
      code: 'field_description_vague',
      severity: 'review',
      scope: 'field',
      table,
      field,
      message: 'Field description is too vague to establish correct usage.',
      expected: 'Explicit meaning, usage, boundaries, and blank/uncertainty semantics where applicable',
      actual: field.description,
    }));
  }
}

function auditPrimaryField(table, issues) {
  const configured = rules.configuredTables?.[table.name];
  if (configured?.primaryFieldException === true) return;

  const primary = table.primaryField;
  if (!primary) {
    issues.push(issue({
      code: 'primary_field_unknown',
      severity: 'review',
      scope: 'table',
      table,
      message: 'Primary field could not be inspected.',
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
      message: 'Primary field is not a formula. Changing a primary field is review-required.',
      expected: rules.primaryField.preferredType,
      actual: primary.type,
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
    message: 'Field name has an established semantic type mapping, but the current Airtable type differs. Type changes are never auto-applied.',
    expected: allowed.join(' or '),
    actual: field.type,
  }));
}

function auditConfiguredLanguage(table, issues) {
  const configured = rules.configuredTables?.[table.name];
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
        message: `Configured communication-related table is missing ${fieldName}. Language fields are contextual and are not auto-created.`,
        expected: fieldName,
        actual: null,
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
      return summary;
    },
    {total: 0, warning: 0, review: 0, error: 0, safeFixes: 0},
  );
}

export async function applySafeFix(base, finding) {
  if (!finding.safeFix) return {applied: false, reason: 'No safe fix configured'};

  const table = base.getTableByIdIfExists
    ? base.getTableByIdIfExists(finding.tableId)
    : base.tables.find(item => item.id === finding.tableId);

  if (!table) return {applied: false, reason: 'Table no longer exists'};

  if (finding.safeFix.kind === 'rename_table') {
    if (typeof table.updateNameAsync !== 'function') {
      return {applied: false, reason: 'This Interface Extensions runtime does not expose table.updateNameAsync'};
    }
    if (tableHasNameCollision(base, table, finding.safeFix.targetName)) {
      return {applied: false, reason: 'Target table name now collides with another table'};
    }
    await table.updateNameAsync(finding.safeFix.targetName);
    return {applied: true};
  }

  if (finding.safeFix.kind === 'rename_field') {
    const field = table.getFieldByIdIfExists
      ? table.getFieldByIdIfExists(finding.fieldId)
      : table.fields.find(item => item.id === finding.fieldId);

    if (!field) return {applied: false, reason: 'Field no longer exists'};
    if (typeof field.updateNameAsync !== 'function') {
      return {applied: false, reason: 'This Interface Extensions runtime does not expose field.updateNameAsync'};
    }
    if (fieldHasNameCollision(table, field, finding.safeFix.targetName)) {
      return {applied: false, reason: 'Target field name now collides with another field'};
    }
    await field.updateNameAsync(finding.safeFix.targetName);
    return {applied: true};
  }

  return {applied: false, reason: 'Unknown safe-fix kind'};
}

export {rules};
