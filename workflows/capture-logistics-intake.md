---
document_type: dca_ai_workflow
status: current-testing
scope: logistics-intake-pilot
workflow: capture-logistics-intake
provider_independent: true
---

# Capture Logistics Intake

## Purpose

Capture current Logistics operational evidence from DCA people with minimal friction so it can be preserved, reconstructed, reconciled, and later promoted into the appropriate shared records without forcing premature structure.

This workflow supports two related uses:

- **initial capture** — create the starting picture for a Logistics cycle;
- **cycle update** — keep that picture current as goods, people, organisations, locations, routes, arrangements, and other operational references change or become visible.

It does not define the full Logistics workflow, the final Logistics schema, or the final relationship between Logistics objects and Relationship Data.

## Current pilot storage

During the bounded pilot, store new mixed Logistics-cycle intake evidence in:

`DCA Integrations & Reconciliation`

using:

- `Logistics_Intake_Submissions` — source/provenance envelope;
- `Logistics_Intake_Facts` — minimally interpreted goods/state facts extracted from the submission;
- `Logistics_Intake_Operational_References` — minimally interpreted people, organisations, locations, contact routes, and other references tied to an operational function, step, handoff, or context.

These tables are reconstruction/reconciliation staging. Records in them are not automatically canonical Logistics objects, canonical relationship records, or claims in DCA Operational Reality.

## What belongs in this intake

Capture what is actually known about the current Logistics cycle, including goods that are:

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

Also preserve operational references revealed in the same work, including when supported by the submission:

- people involved;
- organisations involved;
- phone, WhatsApp, email, address, location, or other contact/operational routes;
- which route is used for which operational purpose;
- locations that differ by operational function;
- who contacts whom, when, or for what step;
- other context needed to understand how the work actually happens.

Existing WhatsApp, email, Slack, screenshots, photos, or other messages may be supplied as source evidence.

No cleanup or extra research is required from the human contributor. Unknown information may remain unknown.

## Pilot principle: capture before modelling

The current pilot is deliberately reconstruction-first.

Do not require Claude or the human contributor to decide during intake whether a new statement ultimately belongs in a Contact, Organisation, Partner, contact-route structure, Logistics object, workflow step, location object, or another future model.

Use this sequence:

```text
mixed current-cycle evidence
→ preserve submission
→ minimally extract supported facts/references
→ reconstruction
→ reconciliation
→ stable shared structure only when justified
```

The point is to learn the structure the real work requires before imposing it.

## Core boundary

Keep these things separate:

```text
source evidence / live capture
→ reconstruction + reconciliation
→ reusable operational records / shared state

material patterns about how the work happens
→ DCA Operational Reality maintenance
```

The Operational Reality document describes how DCA currently works: roles, dependencies, handoffs, variation, exceptions, current practices, and visibility gaps.

It is not a live inventory, offer queue, expected-intake list, cycle ledger, contact-route register, or address book.

Captured pilot records may later justify an Operational Reality update only when they reveal or confirm a material pattern, dependency, workflow change, variation, or visibility gap.

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

### 2. Extract only supported goods/state facts

Create one or more `Logistics_Intake_Facts` records when the submission contains separable operational goods/state facts.

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

### 3. Preserve operational references without forcing a final model

Create `Logistics_Intake_Operational_References` records when the submission contains operationally meaningful people, organisations, locations, routes, or other references that should remain connected to the context in which they are used.

Use the smallest supported `reference_type`:

- `person`
- `organisation`
- `location`
- `contact_route`
- `other`

Use free-text reconstruction fields such as `function_or_step_text`, `operational_context`, `route_type`, `route_value`, and `direction_or_action_text` only when the submission supports them.

Examples of useful preserved meaning:

- this is the person Kees calls when a truck arrives;
- this address is used for unloading rather than the organisation's general address;
- intake information arrives from this person via WhatsApp;
- transport information for the same goods arrives by email;
- this number is associated with a specific operational handoff.

Do not turn those observations into a final `Contact_Route`, `Workflow_Step_Contact`, `Partner_Location`, `Operational_Role`, or similar object during capture.

### 4. Preserve uncertainty

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
- operational function;
- whether a route is general or step-specific;
- whether two mentions refer to the same person, location, route, goods batch, or operational object.

Preserve approximate language in `quantity_text`, `timing_text`, reference fields, and notes where needed.

Use normalized fields only when directly supported.

### 5. Mixed Logistics and relationship information stays together during the pilot

A current-cycle Logistics submission may contain goods state, a person or organisation, a phone number, an address, an operational function, and a contact route in one message.

During this reconstruction pilot:

- preserve the entire submission in `DCA Integrations & Reconciliation`;
- extract goods/state facts into `Logistics_Intake_Facts` when supported;
- extract operational people/organisation/location/route references into `Logistics_Intake_Operational_References` when supported;
- do not write new mixed intake directly into canonical Contacts, Organizations, Partners, or other Relationship Data records;
- do not infer partner status, primary-contact status, general contact-route status, or a stable workflow role from Logistics context;
- Relationship Data may be queried to check whether an identity already exists, but a match is reference/reconciliation context rather than permission to mutate the canonical record;
- use `canonical_reference` / `canonical_references` only after a sufficiently supported match exists, and preserve unresolved identity when it does not.

A later reconstruction/reconciliation pass may determine which parts should be promoted into Relationship Data, Logistics records, operational-function structures, or another shared model.

### 6. Do not promote prematurely

During the initial pilot, do not automatically create or mutate final objects such as:

- Expected Intake;
- Intake Batch;
- Logistics Unit;
- Shipment Unit;
- Shipment;
- Contact Route;
- Partner Location;
- Workflow Step Contact;
- Operational Role;
- canonical relationship records.

The point of this pilot is to preserve the current picture and expose the structure the real work requires.

### 7. Reconcile changes without deleting evidence

Later submissions may change or cancel earlier information.

Preserve the new submission as new evidence. Mark prior staging facts or references resolved, cancelled, superseded, matched, or reconciled only when the new evidence or later reconciliation supports that consequence.

Do not delete historical source submissions merely because the current state changed.

### 8. Return a simple operational confirmation

The human user should not need to understand staging tables, field names, reconciliation mechanics, or architecture.

After a successful capture, respond briefly with what was recorded and any material unresolved ambiguity.

Good examples:

- `Recorded: 3 pallets currently in the warehouse, 2 expected Friday, and one pickup still unresolved.`
- `Recorded the goods and the contact/address context you gave me. I left the exact operational role unresolved.`
- `Recorded the update. The quantity for the hygiene goods is still unknown, which is fine.`
- `I kept the warehouse address and unloading address separate because the message shows they are used for different purposes.`

Do not narrate internal Airtable mechanics unless the user explicitly asks.

## Initial capture behaviour

For the first cycle capture, accept a broad dump of everything currently known that did not leave with the last truck and the messages/context needed to understand it.

The human does not need to organize the information first.

Claude may split a long submission into multiple supported facts and operational references, but must preserve the original submission and must not manufacture missing structure.

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
- a new person/number/address appears in the operational flow;
- an existing contact route is shown to be used for a different step;
- a warehouse, pickup, or unloading location changes;
- new uncertainty is discovered.

Do not require the human to resubmit the full current picture every time.

## Reconstruction and Operational Reality maintenance

The captured records become evidence available to DCA's Reconstruction & Reconciliation Method and `maintain-dca-reality` workflow.

Use them to learn, among other things:

- which intake states actually recur;
- what information is normally available at each point;
- which information arrives through WhatsApp/email/private messages;
- which facts are repeatedly missing;
- which people, organisations, locations, and routes recur;
- whether contact routes are general or tied to a specific function/step;
- where different addresses or contacts serve different operational purposes;
- where identity, route, location, or goods matching becomes difficult;
- which person-held decisions or handoffs are required;
- what should later become stable operational objects, relationship structures, or interfaces.

Only material findings about how the work operates should flow into the maintained Operational Reality document.

## Failure behaviour

If a submission is too ambiguous to split safely:

- preserve the raw submission;
- create the minimum `unresolved` fact and/or operational reference if useful;
- ask only the smallest clarification needed for an operationally consequential distinction;
- otherwise leave the uncertainty visible for later reconstruction/reconciliation.

Do not block capture merely because the information is incomplete.
