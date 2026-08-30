import {initializeBlock, useBase} from '@airtable/blocks/interface/ui';
import React, {useMemo, useState} from 'react';
import {auditBase, summarizeIssues, applySafeFix, applyApprovedAction, rules} from './audit';
import './style.css';

function Finding({finding, mode, busyKey, onApprove}) {
  const key = `${finding.code}-${finding.tableId}-${finding.fieldId ?? 'table'}`;
  const isBusy = busyKey === key;

  return (
    <article className={`finding finding--${finding.severity}`}>
      <div className="finding__header">
        <span className="badge">{finding.severity}</span>
        <strong>{finding.tableName}{finding.fieldName ? ` / ${finding.fieldName}` : ''}</strong>
      </div>
      <p>{finding.message}</p>
      {(finding.expected || finding.actual) && (
        <dl className="finding__details">
          {finding.expected && <><dt>Expected</dt><dd>{finding.expected}</dd></>}
          {finding.actual && <><dt>Current</dt><dd>{String(finding.actual)}</dd></>}
        </dl>
      )}
      {finding.safeFix && <p className="safe-fix"><strong>Ready:</strong> Schema Guard can apply this repair directly.</p>}
      {mode === 'plan' && finding.reviewAction && (
        <div className="review-action">
          <p><strong>Proposed repair:</strong> {finding.reviewAction.label}</p>
          <p>{finding.reviewAction.risk}</p>
          <button onClick={() => onApprove(finding, key)} disabled={Boolean(busyKey)}>
            {isBusy ? 'Applying…' : 'Approve & repair'}
          </button>
        </div>
      )}
      {mode === 'plan' && finding.executionState === 'unavailable' && (
        <div className="execution-unavailable">
          <p><strong>Guard repair not available yet.</strong></p>
          {finding.executionNote && <p>{finding.executionNote}</p>}
        </div>
      )}
    </article>
  );
}

function SchemaGuard() {
  const base = useBase();
  const [mode, setMode] = useState('audit');
  const [revision, setRevision] = useState(0);
  const [busy, setBusy] = useState(false);
  const [busyKey, setBusyKey] = useState(null);
  const [runMessage, setRunMessage] = useState('');

  const auditedTables = base.tables ?? [];
  const scopeLabel = auditedTables.length === 1
    ? auditedTables[0].name
    : auditedTables.length > 1
      ? `${auditedTables.length} tables in current interface context`
      : 'No table context';

  const findings = useMemo(() => auditBase(base), [base, revision]);
  const summary = useMemo(() => summarizeIssues(findings), [findings]);

  const visibleFindings = mode === 'plan'
    ? findings.filter(item => item.severity === 'review' || item.severity === 'error' || item.reviewAction || item.executionState === 'unavailable')
    : findings;

  async function fixSafe() {
    const safeFindings = findings.filter(item => item.safeFix);
    if (!safeFindings.length) {
      setRunMessage('No explicitly cleared safe repairs are currently available.');
      return;
    }

    setBusy(true);
    setRunMessage('');
    let applied = 0;
    const skipped = [];

    try {
      for (const finding of safeFindings) {
        try {
          const result = await applySafeFix(base, finding);
          if (result.applied) applied += 1;
          else skipped.push(`${finding.tableName}${finding.fieldName ? ` / ${finding.fieldName}` : ''}: ${result.reason}`);
        } catch (error) {
          skipped.push(`${finding.tableName}${finding.fieldName ? ` / ${finding.fieldName}` : ''}: ${error.message ?? String(error)}`);
        }
      }
    } finally {
      setBusy(false);
      setRevision(value => value + 1);
    }

    const suffix = skipped.length ? ` ${skipped.length} skipped: ${skipped.join(' | ')}` : '';
    setRunMessage(`${applied} safe repair${applied === 1 ? '' : 's'} applied and the table was re-audited.${suffix}`);
  }

  async function approveAndApply(finding, key) {
    if (!finding.reviewAction) return;

    setBusyKey(key);
    setRunMessage('');
    try {
      const result = await applyApprovedAction(base, finding);
      if (result.applied) {
        setRunMessage(`Approved repair applied: ${finding.reviewAction.label}. Re-auditing current table.`);
      } else {
        setRunMessage(`Approved repair was not applied: ${result.reason}`);
      }
    } catch (error) {
      setRunMessage(`Approved repair failed: ${error.message ?? String(error)}`);
    } finally {
      setBusyKey(null);
      setRevision(value => value + 1);
    }
  }

  return (
    <main className="app">
      <header className="hero">
        <div>
          <p className="eyebrow">DCA Systems & Data</p>
          <h1>DCA Schema Guard</h1>
          <p className="subtitle">Audit and repair Airtable implementation without inventing organisational structure.</p>
          <p className="scope"><strong>Auditing:</strong> {scopeLabel}</p>
        </div>
        <span className="version">rules {rules.version}</span>
      </header>

      <section className="controls" aria-label="Schema Guard mode">
        <button className={mode === 'audit' ? 'active' : ''} onClick={() => setMode('audit')}>Audit</button>
        <button className={mode === 'plan' ? 'active' : ''} onClick={() => setMode('plan')}>Plan ({summary.approvable} approvable)</button>
        <button onClick={fixSafe} disabled={busy || Boolean(busyKey) || summary.safeFixes === 0}>
          {busy ? 'Repairing…' : `Repair safe (${summary.safeFixes})`}
        </button>
      </section>

      {runMessage && <p className="run-message">{runMessage}</p>}

      <section className="summary" aria-label="Audit summary">
        <div><strong>{summary.total}</strong><span>findings</span></div>
        <div><strong>{summary.approvable}</strong><span>ready for approval</span></div>
        <div><strong>{summary.safeFixes}</strong><span>safe repairs</span></div>
        <div><strong>{summary.awaitingExecutor}</strong><span>Guard support pending</span></div>
      </section>

      <section className="boundary">
        <strong>Scope:</strong> this Interface Extension audits the table context Airtable exposes on the current interface page. Cross-table/base-wide reconciliation is a separate capability. <strong>Ownership:</strong> Schema Guard owns schema enforcement and repair. Safe deterministic repairs execute here; consequential repairs execute here after explicit approval. If the current Guard runtime cannot safely execute a repair yet, the finding stays visible as <em>Guard support pending</em> rather than becoming a normal manual Airtable task.
      </section>

      <section className="findings">
        <div className="section-heading">
          <h2>{mode === 'plan' ? 'Repair plan' : 'Audit findings'}</h2>
          <span>{visibleFindings.length}</span>
        </div>
        {visibleFindings.length === 0 ? (
          <p className="empty">No findings in this view.</p>
        ) : (
          visibleFindings.map((finding, index) => (
            <Finding
              key={`${finding.code}-${finding.tableId}-${finding.fieldId ?? 'table'}-${index}`}
              finding={finding}
              mode={mode}
              busyKey={busyKey}
              onApprove={approveAndApply}
            />
          ))
        )}
      </section>
    </main>
  );
}

initializeBlock({interface: () => <SchemaGuard />});
