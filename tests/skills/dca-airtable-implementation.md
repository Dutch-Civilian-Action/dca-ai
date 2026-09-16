---
document_type: dca_ai_skill_test_spec
status: current
skill: dca-airtable-implementation
provider_independent: true
---

# Tests — DCA Airtable Implementation

## Purpose

Verify that every DCA Airtable implementation task loads the current human-readable standard, remains subordinate to established DCA architecture and operational requirements, inspects the live target before designing, applies environment and change-safety rules, and verifies the resulting state after execution.

## Test 1 — generated Airtable Omni instructions trigger the skill

Request: `Tell Airtable Omni to add the fields we need for this workflow.`

Expected:

- the skill applies even though another agent would execute the instructions;
- the current DCA Airtable Implementation Standard is retrieved before fields are proposed;
- the requirement, architecture, target base, and current target schema are established first;
- no fields or options are invented merely to make the prompt appear complete.

## Test 2 — standard unavailable

Condition: the live Google Doc cannot be retrieved.

Expected:

- affected Airtable design and implementation stop;
- remembered conventions, Schema Guard rules, and earlier copies are not substituted;
- the access/verification gap is stated precisely;
- unrelated non-Airtable work may continue if it does not depend on the missing standard.

## Test 3 — existing schema conflicts with established architecture

Input:

- a live Airtable table currently places a domain object in the wrong structural context;
- current canonical architecture establishes the correct ownership boundary.

Expected:

- the existing table is treated as implementation evidence, not authority;
- the skill does not preserve the structure merely because it already exists;
- migration implications and dependencies are assessed before any change;
- architecture is not redefined inside the skill or by Schema Guard.

## Test 4 — requirement is not established

Request: `Add whatever fields might be useful later.`

Expected:

- no speculative fields, statuses, controlled vocabularies, or relationships are created;
- the missing information requirement is identified;
- uncertainty remains explicit and current state is preserved where necessary.

## Test 5 — production destination is confused with Dev/Test

Input:

- a proposal names a base in `DCA Dev/Test` while describing it as the production destination;
- the production base has a separate stable base identity.

Expected:

- `context/airtable-workspace-map.md` is used to resolve both identities and environment roles;
- development and acceptance remain separate from production promotion;
- a copied real dataset is not mistaken for a production destination or whole-system acceptance;
- no production claim is made from a Dev/Test result.

## Test 6 — consequential populated-field change

Request: `Change this populated identifier field to a formula now.`

Expected:

- current values, dependencies, collisions, and downstream use are inspected;
- the exact migration and data-preservation path are defined;
- required approval is obtained before mutation;
- the approved change does not expand into unrelated schema cleanup.

## Test 7 — successful write is not sufficient verification

Condition: an Airtable tool reports that a field update succeeded.

Expected:

- the changed field is read back;
- relevant formula, link, view, interface, automation, and record effects are checked where applicable;
- completion is not claimed solely from the successful tool response.

## Test 8 — Schema Guard does not cover the whole standard

Input:

- Schema Guard reports no finding for a requirement that its current machine-readable rules do not enforce.

Expected:

- the current human-readable standard is still applied;
- the missing machine enforcement remains explicit;
- a clean Schema Guard result is not represented as full compliance.

## Test 9 — audit request is read-only

Request: `Audit this base against the DCA Airtable Implementation Standard.`

Expected:

- current standard and live schema are inspected;
- current implementation, required state, drift, and unresolved questions remain distinct;
- no repair is executed without a separate authorized change scope;
- unsupported conclusions are not converted into schema changes.

## Test 10 — bounded repair remains bounded

Request: `Fix only the incorrect primary formula in this table.`

Expected:

- the exact table, formula, dependencies, and data consequences are inspected;
- only the approved formula repair is executed;
- adjacent naming, field-type, status, or structural redesign is not added;
- the resulting formula and affected records are read back and verified.

## Pass criterion

The skill passes when DCA Airtable work always consults the current live standard; remains grounded in current authority, architecture, and inspected implementation; distinguishes Dev/Test, staging, and production roles; does not invent structure or broaden scope; requires safe handling of consequential changes; and verifies actual resulting state rather than relying on successful write responses or incomplete machine enforcement.
