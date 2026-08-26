---
document_type: dca_ai_workflow
status: current-testing
scope: logistics-intake-pilot
workflow: capture-logistics-intake
provider_independent: true
---

# Capture Logistics Intake

## Purpose

Capture current Logistics operational-state evidence from DCA people with minimal friction so it can be preserved, reconciled, and later promoted into the appropriate shared operational records without forcing premature structure.

This workflow supports two related uses:

- **initial capture** — create the starting picture for a Logistics cycle;
- **cycle update** — keep that picture current as goods are offered, expected, incoming, present, changed, cancelled, or resolved.

It does not define the full Logistics workflow or the final Logistics schema.

## Current pilot storage

During the bounded pilot, store intake evidence in:

`DCA Integrations & Reconciliation`

using:

- `Logistics_Intake_Submissions` — source/provenance envelope;
- `Logistics_Intake_Facts` — minimally interpreted facts extracted from the submission.

These tables are staging/reconciliation structures. Records in them are not automatically canonical Logistics objects and are not automatically claims in DCA Operational Reality.

## What belongs in this intake

Capture what is actually known about goods that are:

- currently in the warehouse;
- offered;
- expected;
- incoming;
- arranged for pickup;
- arranged for delivery;
- remaining or unresolved from the previous movement;
- changed;
- cancelled;
- no longer expected.

Existing WhatsApp, email, Slack, screenshots, photos, or other messages may be supplied as source evidence.

No cleanup or extra research is required from the human contributor. Unknown information may remain unknown.

## Core boundary

Keep three things separate:

```text
source evidence / live capture
→ reconstruction + reconciliation
→ reusable operational records / shared state

material patterns about how the work happens
→ DCA Operational Reality maintenance
```

The Operational Reality document describes how DCA currently works: roles, dependencies, handoffs, variation, exceptions, current practices, and visibility gaps.

It is not a live inventory, offer queue, expected-intake list, or cycle ledger.

A captured Logistics fact may later justify an Operational Reality update only when it reveals or confirms a material pattern, dependency, workflow change, variation, or visibility gap.

## Capture procedure

### 1. Preserve the human submission

Create one `Logistics_Intake_Submissions` record for the human submission.

Preserve:

- `raw_submission` verbatim;
- authenticated human actor where available;
- submission interface/runtime separately from the human actor;
- capture type (`initial_capture` or `cycle_update`);
- source types and references supplied by the human;
- optional cycle/task reference.

Do not rewrite the raw submission into normalized prose.

### 2. Extract only supported facts

Create one or more `Logistics_Intake_Facts` records when the submission contains separable operational facts.

Use the smallest supported interpretation.

Supported fact types for the pilot are:

- `in_warehouse`
- `offered`
- `expected`
- `incoming`
- `pickup_arranged`
- `delivery_arranged`
- `remaining_from_previous_movement`
- `change`
- `cancellation`
- `no_longer_expected`
- `unresolved`

Do not infer a more specific state merely to complete a field.

### 3. Preserve uncertainty

Unknown is a valid result.

Do not invent:

- exact quantity;
- exact date;
- category;
- sender/receiver identity;
- partner status;
- contact identity;
- destination;
- shipment assignment;
- whether two mentions refer to the same underlying batch.

Preserve approximate language in `quantity_text`, `timing_text`, and notes where needed.

Use normalized numeric fields only when directly supported.

### 4. Keep operational and relationship facts distinct

A Logistics submission may mention people or organisations because they offered goods, arranged pickup, receive goods, or appear in a message.

During capture:

- preserve the named organisation/contact in the raw Logistics fact fields;
- do not create or update canonical relationship records merely because they were mentioned;
- do not infer partner status from Logistics context;
- if a separate relationship fact or correction is actually supplied, route that fact through the Relationship Data capability.

The same real-world submission may therefore support both a Logistics fact and a separate relationship-data consequence, but one does not silently redefine the other.

### 5. Do not promote prematurely

During the initial pilot, do not automatically create or mutate final objects such as:

- Expected Intake;
- Intake Batch;
- Logistics Unit;
- Shipment Unit;
- Shipment;
- canonical relationship records.

Use `canonical_references` only after a sufficiently supported reconciliation or promotion decision exists.

The point of this pilot is to preserve the current picture and expose the structure the real work requires.

### 6. Reconcile changes without deleting evidence

Later submissions may change or cancel earlier information.

Preserve the new submission as new evidence. Mark prior staging facts resolved, cancelled, or superseded only when the new evidence supports that consequence.

Do not delete the historical source submission merely because the current state changed.

### 7. Return a simple operational confirmation

The human user should not need to understand staging tables, field names, reconciliation mechanics, or architecture.

After a successful capture, respond briefly with what was recorded and any material unresolved ambiguity.

Good examples:

- `Recorded: 3 pallets currently in the warehouse, 2 expected Friday, and one pickup still unresolved.`
- `Recorded the update. The quantity for the hygiene goods is still unknown, which is fine.`
- `I kept the offer from X separate from the incoming batch because the message does not establish that they are the same goods.`

Do not narrate internal Airtable mechanics unless the user explicitly asks.

## Initial capture behaviour

For the first cycle capture, accept a broad dump of everything currently known that did not leave with the last truck.

The human does not need to organize the information first.

Claude may split a long submission into multiple supported facts, but must preserve the original submission and must not manufacture missing structure.

## Continuous cycle behaviour

For later updates, capture only new or changed information.

Examples:

- a new goods offer;
- expected quantity changed;
- pickup arranged;
- goods arrived;
- offer cancelled;
- expected goods no longer coming;
- remaining goods resolved;
- new uncertainty discovered.

Do not require the human to resubmit the full current picture every time.

## Reconstruction and Operational Reality maintenance

The captured records become evidence available to DCA's Reconstruction & Reconciliation Method and `maintain-dca-reality` workflow.

Use them to learn, among other things:

- which intake states actually recur;
- what information is normally available at each point;
- which information arrives through WhatsApp/email/private messages;
- which facts are repeatedly missing;
- where identity or batch matching becomes difficult;
- which person-held decisions or handoffs are required;
- what should later become stable operational objects or interfaces.

Only material findings about how the work operates should flow into the maintained Operational Reality document.

## Failure behaviour

If a submission is too ambiguous to split safely:

- preserve the raw submission;
- create the minimum `unresolved` fact if useful;
- ask only the smallest clarification needed for an operationally consequential distinction;
- otherwise leave the uncertainty visible for later reconciliation.

Do not block capture merely because the information is incomplete.
