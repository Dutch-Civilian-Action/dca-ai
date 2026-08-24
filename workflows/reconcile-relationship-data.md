---
document_type: dca_ai_workflow
status: current-testing
scope: relationship-data
workflow: reconcile-relationship-data
provider_independent: true
---

# Reconcile Relationship Data

## Purpose

Turn new or requested relationship information into reliable reusable DCA information while preserving source evidence, identity boundaries, uncertainty, conflicts, validation requirements, human attribution, and access boundaries.

This workflow is provider-independent. It implements the current DCA Reconstruction & Reconciliation Method for the bounded relationship-data use case.

## Governing method

Use current DCA authority, especially:

- DCA Reconstruction & Reconciliation Method;
- DCA Authority Map;
- relevant current Operational Reality or validated relationship information;
- current implementation state where technical records are being used operationally.

Do not use superseded fixed-layer, entry-point, anchor, or legacy schema documents as current authority.

## Bounded need

The current use case is simple:

- DCA receives relationship information that should remain reusable;
- people need to retrieve that information later without depending on one person's memory or private messages;
- identity and relationship meaning must remain correct enough for operational use.

The workflow does not require DCA to define a universal CRM architecture before this bounded need can be supported.

## Evidence surfaces

Relevant evidence may include, where available:

- direct user submission;
- authenticated identity of the DCA person supplying or requesting the change;
- current shared relationship records;
- source/provenance or intake records;
- current Airtable relationship data;
- existing organisation/contact relationships;
- review or clarification state;
- other current DCA evidence needed to resolve identity or meaning.

A technical record is evidence and implementation state. It is not organisational truth merely because it exists.

## Read flow

```text
user asks for relationship information
        ↓
identify requested person / organisation / relationship
        ↓
search current reusable records
        ↓
reconcile identity if needed
        ↓
preserve uncertainty / access boundary
        ↓
return the supported information
```

When retrieving information:

- distinguish person, organisation, and relationship facts;
- do not transfer relationship status between entities without evidence;
- do not present inference as stored or validated fact;
- state when information is unresolved, unavailable, or outside the requester's access boundary.

## Write flow

```text
new relationship information
        ↓
preserve human attribution + raw/source evidence
        ↓
search current reusable records
        ↓
reconcile identity and meaning
        ↓
clear match? ── no ──→ preserve ambiguity / bounded clarification or review
        │
       yes
        ↓
apply only evidence-supported consequence
        ↓
persist reusable result with provenance
        ↓
return concise reconciliation result
```

## Source and provenance rule

Before new information changes the reusable shared result, preserve enough provenance to understand later:

- what was submitted;
- which human DCA actor supplied or requested it, when that identity is available;
- which runtime, interface, automation, or import captured or processed it;
- where the underlying information came from;
- what was normalised or interpreted;
- what remains uncertain;
- what resulting record or relationship was affected.

Do not collapse the human actor, the AI/runtime, and the evidence source into one attribution field. They are different facts.

An AI runtime that performs a write is not thereby the human operator who supplied the information.

When an implementation has an organisation-held operator registry, use stable authenticated identity evidence to bind the human actor to that record. Do not resolve an operator from display-name similarity alone when identity is ambiguous.

If an authenticated and authorised DCA actor is not yet represented in the operator registry, an implementation may create the minimum actor record needed for durable attribution using only verified identity facts. Do not infer operational roles merely from use of the interface.

For fully automated intake, human operator attribution may legitimately remain blank while automation/interface provenance is preserved separately.

The active implementation may use a staging/intake record such as `Contact_Intake`, but that table is an implementation choice, not the provider-independent workflow definition.

## Identity resolution

Search before create.

Identity must be resolved from evidence, not similarity alone.

Strong person/contact evidence may include:

1. exact email;
2. exact or normalized phone number;
3. full name together with a sufficiently established organisation relationship;
4. name plus other strong contextual evidence.

Name similarity alone is not sufficient for merge or overwrite.

Organisation evidence may include:

1. exact or normalized organisation name;
2. known alias;
3. website/domain;
4. location plus sufficiently specific organisation context.

If more than one plausible identity remains, do not resolve the ambiguity by guessing.

## Relationship meaning

Keep distinct where the current implementation represents them separately:

- person/contact identity;
- organisation identity;
- relationship between person and organisation;
- role inside an external organisation;
- DCA-facing contact function;
- DCA relationship status such as partner;
- primary-contact status.

Operational context alone does not establish a DCA relationship status. For example, appearing in Logistics work does not automatically establish partner status.

## Update behaviour

When one sufficiently supported existing identity is found:

- apply only facts supported by the new evidence;
- do not erase information because the new source omits it;
- do not silently overwrite conflicting information;
- preserve source differences when one value cannot safely supersede another.

When no existing identity is sufficiently supported and the new identity is clear enough:

- create only the minimum implementation records required to preserve the evidenced reality;
- do not assign unsupported classifications, roles, functions, or relationship states.

## Conflict and uncertainty

Ambiguity is valid state.

When evidence conflicts or is insufficient:

- preserve the new evidence;
- leave affected shared information unchanged unless a source clearly supersedes it;
- state the unresolved question precisely;
- request bounded clarification or use the current review mechanism;
- do not force completion.

## Validation boundary

Validation should be proportional to the consequence of being wrong.

A provider implementation may distinguish:

- deterministic low-risk updates;
- identity-changing updates;
- relationship-changing updates;
- destructive changes;
- ambiguous changes.

Early testing may require explicit confirmation before every canonical write. That testing rule must not become permanent provider-independent behaviour unless later evidence justifies it.

## Privacy and access

Relationship data may contain restricted operational information.

The workflow must:

- preserve the authoritative system's access boundary;
- not widen visibility because a runtime can technically retrieve a field;
- not reproduce restricted personal contact details into broad or public communication surfaces;
- respect the requesting user's permissions.

## Persistence and retrieval

Persist the sufficiently reconciled result in the appropriate current organisation-held implementation together with enough provenance for later recheck.

Expose the result through a usable retrieval surface. The surface may be Airtable Omni, another AI runtime, a view, Slack integration, or another interface.

The retrieval surface is replaceable. The reusable relationship meaning and provenance must remain intelligible independently of that surface.

## Recheck

New evidence may confirm, correct, split, merge, or invalidate an earlier reconciliation.

Relationship reconciliation is therefore not a one-time cleanup action.

```text
capture
→ reconcile
→ shared information
→ operational use
→ new evidence
→ recheck
```

## Failure behaviour

If identity, relationship meaning, human attribution, authority, permissions, or write consequence cannot be resolved safely:

- do not guess;
- do not perform the unsafe write;
- preserve the evidence;
- return the smallest useful unresolved state or clarification request.
