---
document_type: dca_ai_workflow_test_boundary
status: test-design
workflow: reconcile-relationship-data
provider_independent: true
---

# Relationship Data Reconciliation — Test Boundary

## Purpose

Define the provider-independent behaviour that concrete relationship-data tests should validate.

Concrete provider/runtime cases must test the same behavioural boundary rather than redefining expected DCA behaviour around the runtime.

## Behaviour to test

Tests should cover at minimum:

- existing identity found by exact email;
- existing identity found by normalized phone;
- same name with insufficient evidence remains unresolved;
- organisation spelling/alias variation does not create an avoidable duplicate;
- new clear person/organisation information creates only the minimum required implementation records;
- organisation/contact relationship is represented without transferring unsupported relationship status;
- Logistics context does not automatically create partner status;
- omitted fields do not erase existing information;
- conflicting evidence is preserved rather than silently overwritten;
- unresolved identity produces bounded clarification/review rather than guessing;
- source/provenance remains recoverable after reconciliation;
- retrieval returns only supported current information;
- restricted contact details respect the active access boundary;
- provider-specific confirmation rules do not alter the provider-independent reconciliation result.

## Portability expectation

Where another runtime is evaluated, rerun the same behavioural cases against that implementation rather than redefining the expected DCA behaviour around the provider.

## Current operational implementation target

Claude using the Airtable MCP connector against `2 | DCA Relationships & Workflows`.

Slack is the intended organisation-facing conversational surface where Claude is enabled.

Airtable Omni may still be used for bounded embedded regression, inspection, or comparison tests.

Provider-specific tests for the Claude implementation belong under `tests/providers/claude/`.
