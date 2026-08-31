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

This workflow supports two related operational processes:

- **goods intake** — the recurring operational process beginning with the first concrete partner/source message that goods are coming and continuing through later warehouse entry, handling, and warehouse exit;
- **Logistics information intake** — reconstruction or maintenance of shared Logistics information when the submission is not itself evidence of a concrete goods-intake progression.

A submission separately expresses whether it is **new information**, an **update**, or a **correction**. Do not ask the operator to classify either distinction; infer both from ordinary language and preserve ambiguity when the evidence does not support one safely.

Do not classify an ordinary message about concrete goods as `logistics_information_intake` merely because an AI or system is recording it. If the submission itself is evidence in a concrete goods progression, use `goods_intake`.

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

Treat a Logistics cycle as the interval from the previous Ukraine transport, through ongoing Logistics work, toward the next Ukraine transport. Goods may carry over across that boundary; do not force them into the next transport merely because they remain current.

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

Attachments remain bounded source evidence. Preserve the file and its relationship to the submission. Any automated attachment analysis is proposed extraction, not validated fact, and must not trigger broad or canonical writes.

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

## Validated operational distinctions

Preserve these distinctions during capture:

- **current goods picture ≠ warehouse inventory** — the current picture may include offered, expected, incoming, pickup/delivery arrangements, goods physically in the warehouse, and carry-over; inventory is only the physical warehouse state at a point in time;
- **first concrete message ≠ warehouse entry ≠ warehouse exit** — preserve each as a distinct capture moment when evidence arrives;
- **update ≠ correction** — an update records a later operational state; a correction states that earlier evidence or interpretation was wrong;
- **Direct Transit ≠ no sorting** — Direct Transit is a goods-flow distinction; evidence must say whether sorting occurred. Preserve Direct Transit descriptively in Fact context/notes; do not translate it into `goods_state`, storage behaviour, or sorting behaviour, and do not add a new structured field for it until a structured flow representation has been validated;
- **`offered` vs `expected` is an unresolved semantic distinction** — the current schema lists both as `goods_state` options without defining which applies when a source reports goods as available with an unconfirmed pickup/delivery. Do not resolve this arbitrarily at runtime and do not invent a new definition. Preserve the supported evidence and flag the distinction as requiring organisational/operational validation when a submission falls in the gap between the two;
- **operational role context ≠ canonical relationship role** — a person or organisation may perform a contextual Logistics function without acquiring a canonical Relationship Data role;
- **temporary holding location / handover point ≠ canonical location** — preserve the stated function and context without inventing a final location object.

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
- inferred `submission_kind` (`new_information`, `update`, or `correction`);
- inferred `operational_process` (`goods_intake` or `logistics_information_intake`);
- `baseline_capture` only for initial reconstruction of the current picture;
- `controlled_test` when the submission is also a bounded test;
- evidence forms and evidence channels separately;
- source references supplied by the human;
- optional cycle/task reference only when established;
- `corrects_submission` when a correction target is supported.

Do not rewrite the raw submission into normalized prose.

`controlled_test` is provenance/test metadata only. It must not change the operational interpretation of the evidence or cause test/placeholder commentary to appear in the ordinary operator-facing completion message unless the user explicitly asks about the test mechanics.

### 2. Extract only supported goods/state facts

Create one or more `Logistics_Intake_Facts` records when the submission contains separable operational goods/state facts.

Use the smallest supported interpretation.

Use `goods_state` only for supported current goods states:

- `offered`
- `expected`
- `incoming`
- `pickup_arranged`
- `delivery_arranged`
- `in_warehouse`

Represent change, cancellation, uncertainty, warehouse exit, and replacement through the preserved submission, `lifecycle_status`, notes, and supersession/correction links. Do not force those events into `goods_state`.

Preserve `quantity_text` exactly as reported. Populate normalized value/unit only when doing so loses no ambiguity, and preserve quantity precision separately.

### 3. Preserve operational references without forcing a final model

Create `Logistics_Intake_Operational_References` records when the submission contains operationally meaningful people, organisations, locations, routes, or other references that should remain connected to the context in which they are used.

Use the smallest supported `entity_type`: `person`, `organisation`, `location`, or `other`. A contact route belongs in `route_type` / `route_value`; it is not an entity type.

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

Later submissions may update or correct earlier information.

Preserve every later submission as new evidence. For an operational state transition, create/preserve the supported later fact and link `supersedes_fact` only when the same goods are sufficiently identified.

Supersession is a two-sided lifecycle transition. When a later fact validly supersedes an earlier fact whose `lifecycle_status` is `current`:

- preserve the earlier fact and its source evidence;
- set the earlier fact's `lifecycle_status` to `superseded`;
- keep the later fact's own lifecycle status according to the supported later state (`current`, `resolved`, or another existing supported non-invented value).

Do not leave a directly superseded predecessor marked `current`. Do not force an already resolved, cancelled, or superseded predecessor into `superseded` merely because a link is added; preserve its existing non-current lifecycle unless the evidence itself establishes a correction to that lifecycle.

For a correction, link `corrects_submission` to the earlier submission when supported; do not disguise a correction as a normal state update.

Link `corrects_submission` only when exactly one prior submission is sufficiently identifiable as the correction target. Do not use recency ("most recent matching submission") as a matching heuristic. When more than one prior submission is a plausible target, still preserve the correction submission and its content, leave `corrects_submission` unresolved, and flag the ambiguity for human clarification rather than guessing.

When a correction or any other submission states the direction goods are moving, preserve that direction using the existing source/destination fields rather than leaving it implicit.

- Explicit wording such as `X is handing the goods to DCA` or `for DCA` supports DCA as the destination.
- In an authenticated DCA Logistics context, `for us` may support DCA as the destination only when the immediate conversational referent is unambiguous.
- Preserve third-party direction such as `Organisation X hands the goods to Organisation Y`; do not replace either party with DCA merely because DCA operates the system.
- If the submission does not establish direction, leave source/destination unresolved rather than inferring it from warehouse context or system ownership.

Warehouse exit must remain visible even though it is not a `goods_state` option: preserve the exit evidence and resolve/supersede the earlier in-warehouse assertion only when the evidence supports the link.

Do not overwrite or delete historical source submissions merely because the current state changed or earlier interpretation was wrong.

### 8. Return a simple operational confirmation

The human user should not need to understand staging tables, field names, reconciliation mechanics, or architecture.

After a successful capture, respond briefly with what was recorded and any material unresolved ambiguity.

Good examples:

- `Recorded: 3 pallets currently in the warehouse, 2 expected Friday, and one pickup still unresolved.`
- `Recorded the goods and the contact/address context you gave me. I left the exact operational role unresolved.`
- `Recorded the update. The quantity for the hygiene goods is still unknown, which is fine.`
- `I kept the warehouse address and unloading address separate because the message shows they are used for different purposes.`

Do not narrate internal Airtable mechanics unless the user explicitly asks.

A test marker such as `controlled_test` must not by itself change this operator-facing language.

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
