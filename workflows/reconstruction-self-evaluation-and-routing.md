---
document_type: dca_ai_workflow
status: current
scope: organisation-wide
workflow: reconstruction-self-evaluation-and-routing
provider_independent: true
---

# DCA Reconstruction — Self-Evaluation, Establishment & Routing

## Purpose

Define the gate between historical reconstruction and any validation, classification, routing, or promotion into maintained DCA organisational structures.

Reconstruction does not become organisational truth merely because an investigation has produced many evidence records or a coherent narrative.

The required sequence is:

```text
organisational sources
        ↓
evidence preservation
        ↓
reconstruction objects
        ↓
reconciliation
        ↓
RECONSTRUCTION SELF-EVALUATION
        │
        ├── insufficient → continue investigation / preserve gaps
        │
        └── sufficient
                ↓
        what did we establish?
                ↓
        human validation where required
                ↓
        object classification + destination
                ↓
        promotion assessment
                ↓
        maintained organisational structure / operational system
```

This workflow does not itself authorise promotion or writes into canonical systems. It determines whether reconstructed material is ready to move to the next stage and where an established object belongs.

## 1. Self-evaluation is a required gate

Before declaring a reconstruction complete, establishing current organisational meaning, or recommending an object for promotion, evaluate the reconstruction itself.

Self-evaluation is not human validation.

- **Self-evaluation** asks whether the investigation and reconstruction are sufficiently complete, well-grounded, internally disciplined, and explicit about uncertainty to support the next step.
- **Human validation** asks whether a responsible person confirms, corrects, disputes, or qualifies organisational meaning where such validation is required.

Strong evidence does not substitute for required human validation. Human validation does not repair an incomplete investigation.

## 2. Self-evaluation dimensions

Evaluate at minimum the following dimensions.

### Coverage

Check whether the materially relevant evidence surfaces were actually processed, including where applicable:

- Slack historical export;
- live Slack delta and missing context;
- Asana;
- Shared Drives / Google Workspace;
- shared DCA Gmail accounts;
- Airtable;
- GitHub;
- DCA Master Calendar;
- prior research, correction packets, and evidence bundles;
- relevant third-party services;
- linked files, attachments, transcripts, and underlying source artifacts.

Do not mark coverage sufficient merely because many records were found.

Distinguish:

- processed;
- partially processed;
- inaccessible;
- known but not yet audited;
- discovered during investigation and still requiring follow-up.

### Source independence and duplication

Check whether apparent corroboration is actually the same underlying evidence repeated across systems.

Examples:

- Slack message quoted in email;
- transcript summarized in meeting notes;
- source document summarized in a prior evidence packet;
- third-party record synchronized into Airtable;
- AI summary describing an original artifact.

Do not count repeated copies as independent corroboration.

### Temporal completeness

Check whether the reconstruction establishes enough of the relevant lifecycle rather than only a snapshot:

```text
origin / earlier state
→ change
→ later correction or supersession
→ current supported state
```

Where the beginning or end of a period is unknown, preserve that uncertainty rather than inventing dates.

### Contradictions and unresolved conflicts

Check whether contradictory evidence has been:

- identified;
- represented explicitly;
- explained where evidence supports an explanation;
- linked to relevant objects;
- left unresolved where it cannot yet be resolved.

A coherent narrative is not sufficient if material conflicting evidence was silently omitted.

### Correction and supersession lineage

Check whether later corrections, changed states, superseded procedures, changed responsibilities, terminology drift, and abandoned implementations are represented without deleting the earlier state.

### Attribution quality

Check whether the reconstruction distinguishes where relevant:

- initiator;
- operational knowledge supplier;
- designer;
- implementer;
- AI/runtime executor;
- reviewer;
- validator;
- decision authority;
- operator;
- subsequent user/adopter.

Do not convert visibility, posting, uploading, or mentioning into authorship or responsibility.

### Capability-stage discipline

For system/process capability claims, check that evidence has not collapsed:

```text
design
≠ implementation
≠ validation
≠ testing
≠ live runtime
≠ actual use
≠ adoption
≠ outcome
```

### Current-state confidence

Check whether objects labelled current have evidence sufficient to establish current state rather than merely being the newest item found.

Ask what later evidence could reasonably have changed the state and whether that evidence surface was inspected.

### Domain completeness

Check whether investigation discovered materially relevant:

- people;
- roles;
- partners;
- projects;
- systems;
- terminology;
- third-party services;
- communication surfaces;
- documents;
- workflows;
- adjacent domains;

that still require searching before the domain can be considered sufficiently reconstructed.

### Unknowns

Separate:

- genuinely unknown after reasonable investigation;
- inaccessible evidence;
- known evidence not yet processed;
- unresolved contradiction;
- missing human validation;
- assumption or interpretation requiring further evidence.

Do not call something unknown merely because it has not yet been searched.

### Promotion readiness

For each material Reconstruction_Object, determine whether it is:

- ready for establishment and classification;
- ready only for bounded human validation;
- supported but not current enough for promotion;
- historical only;
- a variation/exception;
- unresolved;
- contradicted;
- insufficiently investigated;
- required to remain reconstruction/staging.

## 3. Self-evaluation outcome

The self-evaluation must be allowed to conclude:

> This reconstruction is not yet sufficiently complete to establish or route some or all reconstructed objects.

When insufficient:

1. do not force a final organisational conclusion;
2. identify the specific failing dimensions;
3. identify the evidence or source surface needed next;
4. update `Reconstruction_Runs.coverage_summary` and `coverage_gaps`;
5. continue investigation where access exists;
6. preserve unresolved objects in reconstruction staging.

Do not use a numerical score as a substitute for reasoning about material gaps.

A reconstruction may be sufficient overall while individual objects remain insufficient for establishment or promotion.

## 4. What did we establish?

Only after the self-evaluation gate is sufficiently passed should the investigation distinguish what has actually been established.

For each candidate object, state:

- what the evidence establishes;
- applicable time period;
- whether it appears current, historical, variant, proposed, implemented, used, etc.;
- evidence strength;
- remaining uncertainty;
- whether responsible-owner/human validation is required;
- whether it is ready for classification/routing;
- whether it must remain in reconstruction staging.

Do not turn an evidence-backed interpretation into organisational fact solely because the reconstruction is complete.

## 5. Human validation gate

Request bounded human validation when authority, operational meaning, unresolved ambiguity, or consequence requires it.

Do not request broad revalidation of everything merely because reconstruction occurred.

Human validation may:

- confirm;
- correct;
- qualify;
- dispute;
- identify a variation;
- reveal missing evidence;
- establish that the reconstructed object is historical rather than current.

Any correction becomes new evidence and must be reconciled back through the reconstruction lineage before promotion assessment.

## 6. Object classification and destination

After sufficient reconstruction and any required validation, classify established organisational objects by their actual meaning and route them toward the appropriate maintained structure.

Classification identifies the destination. It does not itself perform the write or promotion.

```text
Established object
        │
        ├── Contact / Organisation
        │       → DCA relationship structure
        │
        ├── Goods / operational goods unit
        │       → Logistics
        │
        ├── Execution
        │       → relevant operational / shared system
        │
        ├── Donation
        │       → Fundraising
        │
        ├── Campaign
        │       → Marketing
        │
        ├── Publication
        │       → Communication
        │
        ├── Meeting
        │       → DCA How We Work
        │
        ├── Recurring workflow
        │       → DCA How We Work
        │
        ├── Decision
        │       → DCA How We Work
        │
        └── Procedure
                → DCA How We Work
                → governed Drive SOP when sufficiently validated,
                  current, stable, and appropriate for durable procedure
```

### Contact / Organisation

Route Contact and Organisation objects according to the existing DCA relationship naming rules, identity-resolution rules, Airtable implementation standards, and canonical relationship structure.

Do not create duplicate organisations or contacts because historical sources use spelling variants, aliases, personal email addresses, changed organisations, or inconsistent names.

Historical reconstruction evidence remains in the reconstruction layer even after an identity is reconciled into the relationship structure.

### Goods / operational goods unit

Route established goods and meaningful operational goods-unit objects to Logistics.

Do not invent a generic `Logistics Unit` merely because a physical grouping exists. Determine the operational meaning from evidence. Physical form, operational classification, system representation, and organisational meaning may differ.

### Execution

Route established execution objects to the relevant operational/shared system only after determining what was actually executed and which domain/system owns the maintained state.

Do not route a plan, task, design, or intended execution as though execution occurred.

### Donation

Route established donation objects toward Fundraising while preserving source provenance and any required reconciliation with donor/relationship identity.

### Campaign

Route established campaign objects toward Marketing while preserving links to fundraising, communication, relationship, or operational objects where the campaign crosses domains.

### Publication

Route established publication objects toward Communication.

Do not confuse a draft, content plan, scheduled item, or publication request with an actually published artifact.

### Meeting

Route established Meeting objects toward DCA How We Work where the meeting itself or its durable organisational meaning should be maintained.

Calendar scheduling alone does not prove the meeting occurred. Meeting notes, transcript, attendance evidence, or other operational evidence may establish occurrence.

### Recurring workflow

Route established recurring workflows toward DCA How We Work.

Do not infer a recurring workflow from a single case unless other evidence establishes recurrence.

Preserve variants and exceptions rather than forcing one universal path.

### Decision

Route established organisational decisions toward DCA How We Work.

Discussion, recommendation, proposal, implementation choice, or individual action does not automatically establish an organisational decision.

Preserve decision authority, date/period, scope, supersession, and supporting evidence where known.

### Procedure

Route established procedures toward DCA How We Work.

A procedure should become a governed Drive SOP only when evidence supports that it is sufficiently validated, current, stable, and appropriate to govern recurring work.

Do not turn observed operator judgement, one-off handling, a proposed procedure, or an obsolete document into a current SOP.

## 7. Cross-domain objects

One reconstructed object may have consequences in more than one maintained domain.

Do not duplicate the underlying organisational fact merely to satisfy destination boundaries.

Examples:

- a Donation may connect Fundraising and a Contact/Organisation relationship;
- a Campaign may connect Marketing, Fundraising, Communication, and Relationships;
- a Logistics execution may depend on partner relationship data;
- a Meeting may establish a Decision affecting an operational domain;
- a Procedure may govern execution represented in an operational system.

Preserve identity and relationships between objects while routing each maintained aspect to the appropriate authority/system.

## 8. Promotion boundary

Routing recommendation is not promotion.

Before a canonical write, the target system's own authority, naming, identity-resolution, validation, and write rules still apply.

The reconstruction layer must retain:

- original evidence;
- reconstructed historical states;
- contradictions;
- corrections;
- supersession;
- provenance;
- uncertainty;
- validation history.

Do not delete reconstruction evidence after promotion.

## 9. Required handoff output

At the end of a sufficiently complete reconstruction, produce a bounded handoff containing:

1. self-evaluation result;
2. material coverage gaps;
3. established objects;
4. objects needing human validation;
5. classification and proposed destination for established objects;
6. cross-domain relationships;
7. objects ready for promotion assessment;
8. objects that must remain reconstruction/staging;
9. target-system rules that must be consulted before any promotion;
10. next evidence or validation action where required.

## Final constraint

Do not use the destination model to decide what the evidence must mean.

The order is:

```text
reconstruct
→ reconcile
→ self-evaluate
→ establish
→ validate where required
→ classify
→ route
→ assess promotion
```

Never reverse it.

**Reality authorises the model.**