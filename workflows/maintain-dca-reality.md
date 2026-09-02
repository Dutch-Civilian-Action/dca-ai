---
document_type: dca_ai_workflow
status: current
scope: organisation-wide
workflow: maintain-dca-reality
provider_independent: true
---

# Maintain DCA Reality

## Purpose

Maintain DCA's current shared reality by detecting and processing materially new or changed evidence across two evidence views:

- **Operational Reality** — what changes in actual DCA domain work;
- **System & Structure Capability Reality** — what System & Structure actually does, maintains, changes, supports, depends on, enables, and whether that capability remains current, aligned, usable, monitored, and transferable.

This workflow is provider-independent. It defines DCA behaviour, not a ChatGPT-, Claude-, or model-specific prompt.

## Governing sources

Use the current DCA authority and method layer, including:

- DCA Operational Reality;
- DCA Derived Organisational Reality;
- DCA Structure Method — Reality to Requirements;
- DCA Reconstruction & Reconciliation Method;
- DCA Capability Reality foundation;
- DCA Authority Map;
- DCA System & Structure — Capability Reality;
- relevant current domain/system specifications where the evidence requires them;
- `workflows/reconcile-established-findings-into-maintained-reality.md` for every established candidate that may affect maintained reality.

## Evidence surfaces

Use relevant observable evidence from, where available:

- Google Drive;
- GitHub;
- public DCA Slack;
- Airtable and current system state;
- integrations, automations, and runtime evidence;
- downstream use of shared outputs.

## Workflow

```text
scheduled / explicit check
        ↓
identify materially changed evidence
        ↓
classify evidence
Operational / Capability / both
        ↓
reconstruct what the evidence supports
        ↓
reconcile identity, meaning, conflict, or state where needed
        ↓
invoke maintained-reality reconciliation
compare / classify / route
        ↓
persist required change
        ↓
verify target + record outcome
        ↓
preserve provenance, authority, uncertainty, variation, conflict
        ↓
identify affected reality / dependency / capability health / architecture
        ↓
continue bounded validation when unresolved
        ↓
notify only after a material maintained change
```

## Operational Reality change criteria

Surface only meaningful changes such as:

- new operational evidence;
- correction or contradiction;
- changed workflow or dependency;
- new uncertainty or visibility gap;
- validation-status change;
- operational consequence that changes current shared understanding.

## System & Structure Capability Reality change criteria

Surface only material changes such as:

- a new, changed, or stopped recurring capability;
- architecture or authority drift;
- documentation/system mismatch;
- stale assumptions;
- unresolved dependency;
- automation or integration failure or unobserved behaviour;
- key-person continuity risk;
- repeated reconstruction that should become organisation-held;
- output produced but not actually used;
- downstream use/outcome evidence contradicting the intended benefit.

## Evidence boundaries

Keep explicit:

- artifact creation ≠ organisational adoption;
- GitHub commit ≠ organisational decision unless current authority supports it;
- Slack discussion ≠ validated organisational fact automatically;
- technical implementation ≠ organisational structure;
- tool presence ≠ demonstrated capability;
- activity ≠ successful outcome;
- AI output ≠ validated organisational truth.

## Method application

Apply the **Reconstruction & Reconciliation Method** when evidence is distributed, conflicting, duplicated, incomplete, or must become reusable shared information.

Apply the **Structure Method** only when sufficiently established reality justifies a new or changed organisational, information, structural, or system requirement.

Do not force current evidence into superseded fixed-layer, entry-point, anchor, or other historical models.

## Validation boundary

Do not request broad revalidation when only a bounded uncertainty needs confirmation.

Preserve unresolved uncertainty when evidence does not support a conclusion.

A finding may be prepared for human validation when its consequence or authority boundary requires it.

Validation does not complete maintenance. After required validation, run `workflows/reconcile-established-findings-into-maintained-reality.md` to determine whether the finding is already represented, confirms, adds, corrects, qualifies, conflicts with, or belongs outside the maintained target. A change-bearing validation thread remains open until the supported target change is persisted and verified.

When validation is requested from an operational person:

- ask in normal working language about what they did, saw, decided, received, handed over, what varies, what currently happens, a concrete example, or where a record exists;
- provide **Confirm as written**, **Correct**, **Missing**, **Unsure**, and **Not mine to confirm** as clear response paths;
- give the packet's purpose, status/authority boundary, intended audience/action, scope/date, response guidance, limitations, uncertainty, validation state, and the exact operational statement being checked;
- identify each material source in reader-usable terms: name/title, platform and account/container, date/coverage, what it supports, limitations, and a stable reference where access permits; keep internal trace IDs secondary;
- keep Reconstruction Object fields, evidence-link types, routing, promotion, target revisions, persistence, architecture, and other System & Structure mechanics out of the operator-facing request;
- treat “Not mine to confirm” as information about the validation route, not as disagreement;
- when meaning changes, always show the precise revised operational wording back to the reviewer for confirmation;
- when the response is “correct”, record the bounded validation and continue to the maintained-target comparison. Resolve without a cosmetic edit or new task only when the comparison establishes a no-change outcome and any target-required evidence/status write is verified; otherwise complete the supported addition, correction, or qualification.

When Asana work is needed to establish or materially re-establish shared operational reality, create or reuse the **Establish** parent and A–E/C1–C3 structure defined in `workflows/reconstruction-self-evaluation-and-routing.md`. Link it to the relevant operational project where useful; do not assign System & Structure mechanics to the operational reviewer.

### Validation contact and reminders

When bounded validation requires input from a particular person:

- identify the person relevant to the specific fact, uncertainty, dependency, or work being validated;
- resolve that person to the runtime's available communication identity when needed, for example a Slack user ID; do not require a hard-coded person-to-platform-ID mapping in this workflow;
- place the validation question in the relevant Reality Watch thread when the validation belongs to a published Watch;
- contact the relevant person directly with a short reminder that points them to the validation request;
- prefer a response in the Reality Watch thread so the confirmation, correction, or clarification remains visible and traceable;
- allow a direct/private response when that is more appropriate or easier for the person;
- treat a private response as evidence and reconcile its supported result back into the maintained reality and visible correction path where appropriate;
- stop reminders once the validation is resolved.

Reminder cadence is runtime configuration and should not be inferred by this provider-independent workflow.

## Reality Watch feedback and correction loop

Reality Watch threads are an ongoing evidence surface. Feedback beneath a Watch can correct, qualify, challenge, confirm, or add missing context to the maintained reality that produced the post.

Before producing a new Reality Watch:

- review the immediately previous Reality Watch thread for unprocessed corrections, clarifications, confirmations, disagreements, or missing context;
- review older Reality Watch threads where correction cases remain unresolved;
- reconcile confirmed corrections before deriving or publishing new findings;
- carry unresolved corrections forward explicitly rather than silently dropping them.

Published Reality Watch threads should continue to be inspected for substantive feedback during later evidence checks. A comment, reaction, or disagreement is evidence of a possible correction; it does not automatically overwrite maintained organisational reality.

When feedback indicates a possible correction:

1. acknowledge the point in the relevant thread;
2. identify the affected Watch observation, finding, or interpretation;
3. state the proposed corrected interpretation as specifically as the evidence permits;
4. preserve both the current and proposed interpretation where uncertainty remains;
5. request bounded confirmation from the relevant person or evidence source when confirmation is required.

Until sufficiently resolved, keep the correction **pending / unresolved**. Do not silently promote it into maintained reality.

Once a correction is sufficiently confirmed:

- reconcile it into the relevant maintained reality;
- preserve the correction's provenance and confirmation basis;
- check connected findings, dependencies, derived conclusions, capability implications, or downstream outputs that may also be affected;
- update those connected elements where the evidence supports a change;
- reply in the original Reality Watch thread with what was reconciled and what it affects.

When evidence conflicts:

- preserve the conflict explicitly;
- do not silently select one version merely because it is newer or stated more confidently;
- identify what evidence or confirmation is still needed to resolve it.

Do not rewrite the historical Reality Watch post as though the original observation never existed. The post remains a snapshot of what was maintained at that time; correction and reconciliation are additive and traceable.

The visible correction lifecycle is:

```text
Observation
    ↓
Correction / clarification
    ↓
Proposed correction
    ↓
Confirmation
    ↓
Reconciliation
```

Every new Reality Watch must begin from the **reconciled maintained reality**, not from the previous Watch post itself.

A new Watch should not proceed as though the previous state is settled while material corrections from earlier Watch threads remain unreviewed. Each unresolved case must either be reconciled or explicitly carried forward as unresolved.

## Output contract

Reality Watch may produce several distinct outputs from the same evidence pass. Keep their functions and authority separate.

Every candidate that reaches this contract must first have an auditable maintained-reality reconciliation result. A claimed update requires `addition`, `correction`, or `qualification` plus verified persistence. `already_represented` and `confirmation_only` are valid no-change outcomes. `conflict_unresolved`, `historical_only`, `proposed_future`, `alternate_destination`, and `not_ready` remain explicitly bounded and must not be described as maintained-target changes.

### Reader context and source visibility

Every organisation-facing document or Reality Watch post must be understandable without the reader having seen the reconstruction run, an earlier draft, private chat, or correction packet.

- state the maintained fact or change directly, with its relevant scope and period;
- identify status, uncertainty, and requested validation where those matter;
- name evidence in reader-usable terms—source title/type, platform and account/container, relevant date/coverage, what it supports, material limitations/gaps, and a stable reference where access permits—rather than exposing only internal Evidence or Reconstruction Object IDs;
- do not use phrases such as “former gap”, “earlier claim”, “new source”, “current outcome”, “remaining issue”, or “this run” unless the same output identifies the antecedent and the comparison is meaningful to the audience;
- keep technical reconciliation and persistence detail in the auditable lineage or linked System & Structure work unless the audience genuinely needs it;
- use `skills/dca-document-authoring/SKILL.md` for maintained documents and other native document outputs, including its standalone-reader, source-guide, and native-structure quality gates.

### 1. Operational Reality update

Update **DCA Operational Reality** only when new or changed evidence materially changes, confirms, corrects, qualifies, or makes visible current operational reality.

Rules:

- preserve provenance, uncertainty, variation, conflict, ownership, dependencies, and handoffs;
- do not replace current reality with intended, proposed, or preferred future state;
- do not create an update merely because source activity occurred;
- bounded confirmation may strengthen existing reality without creating a new finding.

### 2. Derived Organisational Reality update

Update **DCA Derived Organisational Reality** only when the maintained evidence supports an organisationally meaningful pattern or implication beyond the isolated event.

This may include, where supported:

- recurring dependencies or loops;
- repeated reconstruction;
- person-held capability or continuity risk;
- cross-functional consequences;
- recurring visibility or information gaps;
- structural contradictions;
- trapped or underused organisational capacity;
- patterns in how work, responsibility, information, decisions, or evidence move through DCA.

Rules:

- derivation must remain traceable to maintained reality and supporting evidence;
- do not turn a single anecdote into an organisation-wide pattern without sufficient support;
- preserve uncertainty and competing interpretations where the evidence does not justify one conclusion;
- a derived finding does not automatically create a system requirement or organisational decision.

### 3. System & Structure Capability Reality update

Update **DCA System & Structure — Capability Reality** when material evidence changes what is known about an existing System & Structure capability, dependency, health condition, adoption state, continuity risk, or actual downstream use.

Rules:

- distinguish implemented capability from intended capability;
- distinguish technical availability from demonstrated organisational use;
- retain failures, drift, stale assumptions, unsupported dependencies, and non-adoption as reality rather than smoothing them away.

### 4. Reality Watch Slack post

Publish a top-level DCA Bot Reality Watch post only when there is a material update worth making visible to the organisation.

The post may surface relevant changes from Operational Reality, Derived Organisational Reality, and System & Structure Capability Reality while preserving the distinctions between them.

Use only the headings that are relevant:

- Changed reality
- Derived organisational reality
- Evidence
- Conflict / uncertainty
- Validation status
- Capability / dependency / health impact
- Required reconciliation or next update

#### Channel routing

Choose the publication channel from the affected reality after reconstruction, not merely from the channel or source where the evidence was observed.

- route a domain-specific update to the closest relevant operational channel;
- route a genuinely cross-domain or organisation-wide finding to `#organisation`;
- do not duplicate the same Reality Watch across multiple channels;
- where a domain-specific Watch has a material cross-domain consequence, surface that consequence organisation-wide only when it is itself a material organisational finding.

Current routing examples include:

- Logistics → `#logistics`;
- Fundraising → `#fundraising`;
- Marketing → `#marketing`;
- Ukraine / missions → `#ukraine`;
- structural or system implications → `#structural-alignment`.

Keep Slack publication readable:

- begin the title with the robot icon and format the title bold and italic: `🤖 *_Reality Watch_*`;
- format each section heading in italics, for example `_Changed reality_`;
- insert one blank line after the title;
- insert one blank line between sections;
- keep each section heading visually separate from the previous bullet list;
- place bullets directly under their heading;
- omit unused sections entirely;
- do not add extra decorative blank lines beyond the single separator needed for clear section boundaries;
- end every Reality Watch post with the italic line `_P.S. Tell me when I’m wrong — I learn from corrections._`.

Do not publish a source-change dump. The Slack post is an organisationally meaningful view of maintained reality, not a log of every observed event.

### 5. `What this makes visible` thread

When a Reality Watch update contains a strong, concrete instance that makes an established or newly supported organisational pattern legible in everyday DCA work, DCA Bot may add one short thread reply beneath the relevant Reality Watch post.

Purpose:

- make Operational Reality and Derived Organisational Reality recognisable through a small concrete example;
- show how a structural pattern manifests in actual DCA work without turning the main Reality Watch post into system advocacy;
- create space for organisational recognition or discussion while keeping the maintained reality itself separate.

A thread case must be grounded in:

1. current observable evidence;
2. the relevant maintained Operational Reality; and
3. an established or sufficiently supported Derived Organisational Reality finding or implication.

The thread may use this minimal structure when useful:

**What this makes visible**

- **Current:** what concretely happened or currently happens;
- **If shared:** what relevant information or capability could persist or become reusable, only when this follows from the evidence;
- **Effect:** the concrete work that could become easier, such as less waiting, reconstruction, repetition, coordination, dependency, or loss of context.

Rules:

- maximum one strong case per relevant Reality Watch post;
- no strong case → no thread;
- do not invent a hypothetical event, benefit, dependency, or improvement to fill the format;
- do not create a new organisational finding solely in the thread;
- do not present a proposed solution as current reality;
- omit `If shared` or `Effect` when the evidence supports only making the current pattern visible;
- use concrete DCA work and existing terminology rather than architecture language where possible;
- keep the case short enough to be understood without opening supporting system documentation;
- the thread is an organisational interface to maintained reality, not a replacement for Operational Reality or Derived Organisational Reality.

### 6. No-output condition

No material maintained change → no unnecessary report.

Processing activity, validation completion, task completion, a generated draft, or an unverified write is not a material maintained change.

No sufficiently supported derived change → do not manufacture one.

No strong concrete case → do not add a `What this makes visible` thread.

The workflow is not required to produce every output type on every run.

## Runtime independence

The same workflow may be executed by ChatGPT, Claude, another AI runtime, or a future orchestration layer, provided the runtime can satisfy the required source access, authority rules, validation boundaries, failure behaviour, and tests.

Runtime choice is an implementation decision, not part of DCA organisational architecture.
