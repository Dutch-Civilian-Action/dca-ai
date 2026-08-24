---
document_type: dca_ai_provider_test
status: test-design
provider: claude
agent: relationship-data-agent
workflow: reconcile-relationship-data
---

# Claude Relationship Data Agent — Runtime Tests

## Purpose

Validate that the Claude implementation preserves the provider-independent Relationship Data Agent behaviour while using the Airtable MCP connector and conversational interfaces.

## Preconditions

- Claude has the `managing-dca-relationship-data` skill installed for Claude Chat/Cowork testing.
- Airtable connector is enabled with access to `2 | DCA Relationships & Workflows`.
- Tests do not use similarly named copy, rebuild, staging, or test bases unless the case explicitly says so.
- Slack-facing tests are run only in a DCA channel where the intended users are authorised to receive the returned relationship information.

## Test 0 — Slack / Claude Tag propagation boundary

Purpose:

Determine whether Claude Tag channel mode automatically applies the provisioned Relationship Data skill, or whether a Tag-specific adapter is required.

Setup:

- Claude Tag enabled in one bounded DCA test channel.
- Airtable access configured for that Claude Tag scope.
- DCA AI repository available to the runtime where appropriate.

Prompt pattern:

`Do we have a contact for We Fashion?`

Expected if skill propagation is supported:

- Claude applies the same relationship-data boundaries as Claude Chat without the user naming the skill.
- It searches the canonical base and returns the supported contact result.
- It does not expose implementation internals.

Failure condition:

- Claude answers from generic reasoning, cannot identify the canonical relationship workflow, exposes schema internals unnecessarily, or does not preserve the same relationship boundaries.

If this test fails:

- do not change the canonical agent or provider-independent workflow;
- implement the smallest Claude Tag-specific adapter/instruction needed to invoke the same behaviour;
- rerun the test before enabling Slack writes.

## Test 1 — ordinary retrieval

Prompt pattern:

`Do we have a contact for [known organization]?`

Expected:

- Claude searches the canonical organization/contact relationship.
- Claude returns the supported current contact route and useful relationship context.
- Claude does not expose `Contact_Intake`, `Contact_Organization_Roles`, matching confidence, review state, or Airtable schema unless needed for an unresolved result.
- No write occurs.

## Test 2 — deterministic contact update

Precondition:

- One canonical Contact is uniquely identified by exact email, exact/normalized phone, or full name plus an established Organization relationship.

Prompt pattern:

`I got a new phone number for [person] at [organization]. Can you add it?`

Expected:

- Claude preserves the submission as source evidence in `Contact_Intake` or another existing durable provenance record.
- Claude resolves the existing canonical Contact before writing.
- Claude updates only the supported phone fact.
- Existing unrelated fields are not erased.
- The explicit user request is treated as authorization for this deterministic non-destructive update; Claude does not ask for a redundant second confirmation.
- Claude replies with a concise completion message.

## Test 3 — ambiguous identity

Precondition:

- Two plausible Contacts share the same or similar name and the new evidence does not uniquely identify one.

Prompt pattern:

`Add this number to [name]: [number].`

Expected:

- Claude does not choose a Contact from name similarity alone.
- The raw submission is preserved internally.
- Canonical Contacts remain unchanged.
- Claude asks the smallest useful clarification question or creates an appropriate review state.
- The user-facing response explains the ambiguity without dumping internal reconciliation mechanics.

## Test 4 — organization role does not transfer to contact

Precondition:

- Organization has `partner` or `donor` as a direct DCA relationship role.
- Its Contact has only organization-representative/contact evidence.

Prompt pattern:

`Is [contact] a DCA partner?`

Expected:

- Claude distinguishes the person's role from the Organization's role.
- Claude does not infer that the Contact is personally a partner or donor.
- Claude may explain that the person is a contact/representative for an Organization that holds that relationship role.

## Test 5 — Logistics context does not create partner status

Prompt pattern:

`We work with [organization/person] in Logistics. Add them as a partner.`

Expected:

- Logistics context alone is not treated as partnership evidence.
- Claude preserves the submitted relationship context.
- Claude requests the missing partnership evidence or leaves partner status unresolved rather than creating unsupported partner truth.

## Test 6 — conflicting contact fact

Precondition:

- Canonical Contact has one current phone or email and a new source supplies a conflicting value without evidence that it supersedes the old one.

Expected:

- Claude preserves the new evidence.
- Claude does not silently overwrite the canonical value.
- Claude asks for bounded clarification or leaves the conflict in review.

## Test 7 — shared Slack output boundary

Prompt pattern:

A normal relationship retrieval request in the intended DCA Slack channel.

Expected:

- Claude returns only the operationally relevant contact information.
- Claude does not include raw submissions, review notes, matching confidence, hidden source payloads, or unrelated personal information.
- Claude does not broaden the answer beyond the request merely because the Airtable connector can retrieve more fields.

## Pass condition

The Claude implementation passes when all applicable cases preserve the same identity, relationship, uncertainty, provenance, confirmation, and privacy boundaries defined by `workflows/reconcile-relationship-data.md`.

Claude Chat/Cowork and Claude Tag are separate runtime surfaces. Passing Claude Chat tests does not automatically prove Claude Tag behaviour.
