---
document_type: dca_ai_workflow
status: current
scope: organisation-wide
workflow: full-historical-domain-reconstruction
provider_independent: true
---

# DCA Full Historical Domain Reconstruction

## Purpose

Perform a full historical reconstruction of one DCA domain or area using all available organisational evidence, while continuously preserving source evidence, reconstructed claims, provenance, contradictions, corrections, supersession, attribution, temporal scope, and coverage gaps in the DCA reconstruction staging layer.

This is not a quick summary, document inventory, representative-example search, achievements list, future operating-model design, or system redesign exercise.

The objective is to reconstruct:

```text
what happened
→ what changed
→ who was involved
→ what evidence supports it
→ what status it had at the time
→ what later happened to it
→ what appears true now
```

Start from evidence. Do not begin from the current DCA model, current system structure, current role definitions, or an assumed ideal workflow and project backwards.

## Run scope

For each run define:

- **Domain / area:** `[INSERT DOMAIN]`
- **Optional focal person / role:** `[INSERT PERSON OR ROLE, OR "none"]`

A focal person is a lens inside the surrounding organisational context. Do not turn the reconstruction into an isolated achievement list.

Follow relevant evidence across domains when necessary, but keep the selected domain as the analytical centre.

# 1. Organisational evidence sources

Use connected organisational sources directly where available.

## Slack — historical export + live connector

When a Slack export through a known cutoff is supplied, use it as the primary bulk historical corpus for Slack reconstruction.

Then use the connected DCA Slack account to:

- inspect evidence after the export cutoff;
- inspect material missing from the export but visible to the connected account;
- follow current threads, files, canvases, lists, huddles, notes, and transcripts;
- retrieve surrounding context where the export is incomplete;
- identify later corrections, edits, replies, or superseding evidence.

Do not independently process the full overlapping Slack history twice merely because both export and connector contain it.

Reconcile overlapping Slack evidence using stable identifiers where possible:

- channel ID;
- message timestamp / `ts`;
- thread-root timestamp;
- file ID;
- canvas/list identifier;
- huddle/transcript identifier.

When the same underlying Slack item exists in both export and live connector:

- create one Evidence record, not two;
- preserve both access routes in provenance/notes if useful;
- do not treat duplicate copies as corroboration.

Prefer the original Slack item over a later summary or quotation of that item.

If the live connector shows that an exported message was later edited, corrected, replied to, or superseded after the export cutoff, preserve the historical exported state and later change separately where materially relevant.

Record the Slack export cutoff and live-connector coverage explicitly in the reconstruction run.

Where no export is supplied, process the full accessible Slack history through connected sources.

Search and inspect relevant:

- channels from creation to present;
- top-level messages;
- thread replies;
- archived channels where relevant;
- accessible private channels;
- Slack files;
- canvases;
- lists;
- huddle notes;
- underlying huddle transcripts where available;
- corrections;
- later follow-ups;
- linked evidence;
- cross-channel continuation when work moves elsewhere.

For Slack huddles, broad message search is not a sufficient coverage check. Maintain a huddle coverage ledger for the bounded domain and period. Discover huddles through all applicable routes:

- the domain channel and adjacent operational channels;
- DMs with the reconstruction owner and named operational participants;
- cross-domain channels where operational work was discussed;
- canvases, huddle notes, transcript files, derivative transcript copies, and messages that share or quote them;
- source references already present in maintained Operational Reality, prior reconstructions, validation material, or later Reality Watch findings.

For every discovered huddle, record the stable canvas/transcript identifiers and one explicit outcome: `processed_material`, `processed_context_only`, `reviewed_insufficient_content`, `duplicate_derivative`, `out_of_scope`, or `unavailable`. A low-content or inaccessible transcript remains visible in the ledger; it must not disappear merely because no Reconstruction_Object can responsibly be derived from it.

Before closing Slack coverage, compare the reconstruction run's Evidence provenance with domain-relevant source references already used by maintained reality or another reconstruction run. Backfill or cross-link a relevant underlying source when it is absent. Do not assume that processing a source in Reality Watch or a different domain reconstruction automatically gives this run complete provenance.

Do not infer that absence of a reply or reaction means a message was ignored, rejected, or unread.

When AI-generated Slack notes or summaries exist alongside an underlying transcript, use the transcript as the stronger evidence. Summaries may help navigation but must not silently replace the underlying evidence.

## Asana — process the full available history

Inspect relevant:

- projects;
- tasks;
- subtasks;
- descriptions;
- comments;
- assignees;
- due dates;
- dependencies;
- attachments;
- project status updates;
- completion state;
- historical and archived work where accessible.

Treat Asana status precisely:

- task = recorded work or intention;
- assignee = recorded responsibility;
- due date = expectation;
- completed = recorded completion;
- none of these alone proves the underlying operational outcome occurred.

Search for later operational evidence confirming, contradicting, correcting, or superseding the Asana record.

## Google Workspace / Shared Drives — process all relevant material

Search across all accessible DCA Shared Drives and inspect relevant:

- Docs;
- Sheets;
- Slides;
- PDFs;
- files;
- folders and file organisation;
- operational records;
- procedures/manuals;
- plans;
- agreements;
- reports;
- meeting notes;
- historical drafts;
- current documents;
- linked supporting files.

Do not assume the newest or most recently modified file is authoritative.

Determine status from content, provenance, validation, later evidence, actual use, and supersession.

A document proves that the document existed and contained particular claims. It does not automatically prove organisational adoption or operational execution.

## Gmail / shared DCA mailboxes

When a connected DCA shared Gmail account is available, treat email as a first-class organisational evidence surface.

This is especially important for areas where relationship, partner, donor, supplier, volunteer, campaign, logistics, finance, communication, or other external-party history may exist outside Slack and Asana.

Inspect relevant:

- message threads;
- sent and received messages;
- replies and forwards;
- attachments;
- dates and participants;
- quoted prior messages where they carry historical context;
- later corrections, confirmations, rejections, changes, and follow-up outcomes.

Use the actual email thread as evidence where available. Do not rely only on a later summary of the thread.

Preserve distinctions between:

- a message being sent;
- a recipient replying;
- an agreement or commitment being made;
- a request being accepted;
- a task being executed;
- a relationship continuing afterwards.

Do not infer that a sent email was read, accepted, acted upon, or represented an organisational decision merely because it exists.

Where the same relationship/event appears in Gmail and another platform, do not treat repeated copies of the same underlying communication as independent corroboration.

Use stable Gmail thread/message identifiers where available. Store only the evidence needed for reconstruction, and do not promote personal contact details or confidential content into canonical structures through this workflow.

When several shared DCA mailboxes exist, record which mailbox was actually processed and which were inaccessible or unprocessed in `coverage_summary` and `coverage_gaps`.

## Prior research, correction packets, and evidence bundles

Earlier research outputs, correction packets, exports, evidence bundles, and prior reconstruction material may contain substantial already-discovered evidence, especially for System & Structure.

Treat these as high-value navigation and provenance packages, but not as automatic organisational truth.

For each supplied bundle:

- inspect its contents;
- identify the underlying source material it contains or references;
- preserve the bundle itself as provenance where useful;
- prefer underlying original Slack, Asana, Drive, Gmail, GitHub, Airtable, transcript, or third-party-service evidence when accessible;
- do not count a bundle summary and its underlying source as independent corroboration;
- preserve prior corrections and interpretations separately;
- follow references into original systems where possible;
- record inaccessible underlying sources as coverage limitations.

Reuse prior System & Structure research so evidence does not have to be rediscovered from zero, but re-ground material claims in the strongest accessible underlying evidence before treating them as reconstructed reality.

## Third-party services — audit historical operational evidence

Historical reconstruction may require inspecting third-party services DCA used to execute, track, communicate, fundraise, publish, automate, reconcile, analyse, or otherwise perform work.

Examples may include donor, newsletter, payment, website, CRM, campaign, logistics, forms, automation, analytics, storage, messaging, and integration platforms.

Do not assume current third-party configuration reflects historical state.

For every materially relevant service, reconstruct where possible:

- what service was used;
- what organisational function it supported;
- when it was introduced, changed, or stopped;
- what records, events, workflows, campaigns, lists, integrations, or automations existed there;
- who appeared to operate or maintain it;
- what data flowed into or out of DCA systems;
- what information existed there that was not visible elsewhere;
- whether records were canonical, staging, operational, duplicated, derived, or merely technical;
- what evidence exists of actual use rather than configuration alone;
- what later replaced, superseded, disconnected, or abandoned it.

Treat third-party data as evidence, not automatically canonical truth.

Preserve source identity, external record/reference, disagreement, uncertainty, and synchronization state separately where those distinctions matter.

Do not apply last-write-wins logic when third-party values disagree with DCA shared data.

If a relevant service cannot currently be accessed, record the service and missing access as a reconstruction coverage gap so it can be audited later.

## Additional evidence surfaces

Where materially relevant, inspect:

- Airtable;
- GitHub;
- DCA Shared Calendar;
- integrations, automations, and runtime evidence;
- other connected organisational systems.

Keep the same evidence discipline: implementation is not automatically runtime, scheduled event is not proof it happened, and system presence is not proof of use or adoption.

# 2. Governing reconstruction method

Reconstruct what the evidence supports before imposing a model.

Preserve distinctions between:

- current observed/reported reality;
- historical observed/reported reality;
- operational variation or exception;
- operational terminology;
- uncertainty / visibility gap;
- proposed or intended future practice;
- organisational decision;
- agreement;
- standard;
- procedure;
- design;
- implementation;
- validation;
- testing;
- live runtime capability;
- actual operational use;
- adoption;
- outcome;
- AI/system interpretation or hypothesis.

Never silently collapse:

- artifact creation → organisational adoption;
- GitHub implementation → live capability;
- configuration → successful runtime;
- task completion → operational outcome;
- calendar/meeting plan → event occurrence;
- agreement → every instance executed as agreed;
- system option → organisational terminology;
- AI reconstruction → validated organisational truth;
- person posting an artifact → person creating it;
- one observed case → universal workflow;
- current practice → historical practice;
- intended future → current reality;
- evidence strength → human validation.

Preserve corrections, supersession, and contradictory evidence. Do not overwrite history merely because later evidence is stronger.

For movement and handover claims, interpret the underlying statement in context: an instruction or itinerary supports intended handling, while a completion report supports reported execution within its own limits. For example, “The driver will unload” does not establish “The driver unloaded.” A second-hand label describes provenance, not whether the statement concerns a plan or an event; tense alone is not a classifier.

# 3. Conflicting evidence

When sources disagree, investigate whether the difference represents:

- genuine contradiction;
- different time periods;
- different operational variants;
- different roles seeing different portions of the work;
- intended practice versus actual practice;
- agreement versus actual execution;
- terminology drift;
- supersession;
- source error;
- incomplete evidence;
- unresolved uncertainty.

Represent the difference explicitly rather than silently selecting one version.

# 4. Attribution

Be precise about who did what.

Where relevant distinguish:

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

Do not attribute a shared artifact to someone merely because they uploaded, linked, or mentioned it.

If the reconstruction has a focal person, reconstruct their contribution inside the surrounding organisational context, including collaboration, dependencies, boundaries, other contributors, decision authority, and later use/adoption.

# 5. Airtable reconstruction staging layer

Use the existing Airtable base:

**DCA Evidence & Reconciliation**

Use these existing tables:

- `Reconstruction_Runs`
- `Evidence`
- `Reconstruction_Objects`
- `Evidence_Links`
- `Object_Relationships`
- `Meetings`

This is a reconstruction and reconciliation layer.

Records created here are not automatically:

- canonical organisational truth;
- Shared Structure;
- Relationship Data;
- Operational Reality;
- Derived Organisational Reality;
- organisational standards;
- procedures;
- live operational records.

Do not promote anything out of this layer during the investigation.

# 6. Start the reconstruction run

At the beginning of the investigation:

1. Search `Reconstruction_Runs` for an existing run matching this investigation.
2. Do not create a duplicate run merely because this is a new chat.
3. If this is genuinely a new bounded reconstruction, create one run record.

Populate where known:

- `run_display_name`
- `domain`
- `focal_person_or_role`
- `started_at`
- `processing_status = in_progress`
- `source_scope`
- `model_or_runtime`
- `notes`

Record the governing files actually read, their access route and any exposed revision or archive identifier. Unknown revision and unavailable governing text are different gaps. If method access is restored after work has begun, reassess affected earlier claims/writes against the loaded instructions in the same run, preserving corrections and a precise resume point. Do not infer application from availability or reconstruct an unsupported root cause.

Do not claim source coverage before it has actually been achieved.

- `source_scope` = intended investigation scope.
- `coverage_summary` = what was actually processed.
- `coverage_gaps` = what was inaccessible, incomplete, missing, or not yet processed.

Update these progressively.

Do not mark the run `completed` until the declared scope has been processed to the point where additional searching is producing diminishing materially new evidence.

# 7. Evidence records

Use `Evidence` to preserve source-level organisational evidence.

Before creating an Evidence record: **search first**.

Check whether the same underlying source item or source segment is already present.

Use stable source identifiers wherever possible:

- Slack channel + message timestamp/thread reference;
- Slack file ID;
- Asana project/task/comment ID;
- Google Drive file ID;
- Gmail thread/message ID;
- Airtable record ID;
- GitHub repository/PR/commit/path;
- third-party service + external record/event ID;
- equivalent stable source identifier.

Do not create duplicate evidence merely because:

- the same document exists in two summaries;
- a Slack message is later quoted elsewhere;
- an email quotes an earlier email already preserved;
- a meeting summary repeats something in the transcript;
- an AI summary describes an underlying source;
- a prior evidence bundle summarizes an underlying source;
- the same source is relevant to several reconstruction objects.

One Evidence record may support many Reconstruction_Objects.

## Evidence granularity

Use the smallest useful evidence unit that preserves provenance and meaning.

Examples:

- **Slack:** usually one message or thread reply.
- **Asana:** task, subtask, comment, or status update where independently meaningful.
- **Email:** one message or bounded thread segment where independently meaningful; preserve enough thread context to distinguish request, reply, confirmation, correction, and later outcome.
- **Document:** the document may be one evidence item when its status/existence is the relevant evidence; create bounded evidence segments when different portions support materially different claims.
- **Huddle transcript:** do not create one enormous evidence record for a long transcript if different portions support different claims. Preserve bounded transcript segments with enough surrounding context to interpret them safely.
- **Agreement:** preserve the agreement as agreement evidence. Do not treat clauses as proof that operational execution always followed them.
- **Third-party service:** use the smallest stable event, record, configuration, or runtime artifact needed to support the claim without flooding Airtable with irrelevant technical records.

## Evidence fields

Populate where supported:

- `evidence_display_name`
- `domain`
- `source_platform`
- `source_type`
- `source_container`
- `source_title`
- `source_reference`
- `source_url`
- `source_datetime`
- `source_time_text`
- `author_or_actor`
- `source_language`
- `thread_or_context`
- `evidence_excerpt`
- `evidence_summary`
- `access_or_coverage_limit`
- `notes`
- `reconstruction_run`

`evidence_display_name` is mandatory for every created Evidence record. Construct a concise deterministic value from the source date, source/container and bounded subject before the write. Do not rely on a later cleanup pass to make the record identifiable.

Preserve exact source wording in `evidence_excerpt` where useful.

Do not rewrite the source into organisational interpretation there. Interpretation belongs in `Reconstruction_Objects`.

Never fabricate an exact date/time when the source only provides approximate or relative timing.

# 8. Reconstruction Objects

Use `Reconstruction_Objects` for bounded evidence-backed claims about DCA.

A Reconstruction_Object is not a source. It is a reconstructed claim supported, contradicted, contextualised, corrected, or otherwise affected by Evidence.

## Atomicity

Prefer one bounded contestable claim per object.

Do not combine several independently supportable claims merely for readability.

## Search before create

Before creating a Reconstruction_Object, search existing objects for:

- the same claim;
- the same underlying phenomenon;
- historical version;
- current version;
- correction;
- variation;
- possible supersession.

Do not create a duplicate merely because new evidence supports an existing claim. Instead, link the new Evidence to the existing object when appropriate.

Create a new object when the evidence supports a materially different:

- claim;
- period;
- state;
- variation;
- correction;
- interpretation;
- capability stage;
- responsibility;
- outcome.

## Populate where supported

Use:

- `object_display_name`
- `domain`
- `object_type`
- `claim`
- `epistemic_status`
- `capability_stage`
- `valid_from`
- `valid_to`
- `period_text`
- `actors_text`
- `attribution_text`
- `related_context`
- `evidence_assessment`
- `validation_status`
- `confidence`
- `notes`
- `reconstruction_run`

Do not manufacture values merely to fill fields. Blank is preferable to false precision.

# 9. Epistemic status

Use `epistemic_status` carefully.

Available meanings include:

- `current_observed_reported_reality`
- `historical_observed_reported_reality`
- `variation_exception`
- `operational_terminology`
- `uncertainty_visibility_gap`
- `proposed_future_practice`
- `pilot_introduced_practice`
- `pilot_system_interpretation`

Do not use `current_observed_reported_reality` merely because something is the newest statement found. Establish why it should be considered current.

Do not retroactively convert a pilot-introduced practice into historical organisational reality.

# 10. Capability status

For relevant system/process capabilities, preserve the distinction:

```text
design
→ implementation
→ validation
→ testing
→ live_runtime
→ actual_use
→ adoption
→ outcome
```

Evidence for one stage does not automatically establish the next.

Examples:

- GitHub code can establish implementation without live runtime.
- Successful live runtime does not establish actual operational use.
- One operator using something does not establish organisation-wide adoption.
- Task completion does not establish outcome.

# 11. Human validation

`validation_status` is separate from evidence strength.

Do not mark an object `owner_validated` merely because:

- several sources agree;
- an AI considers it strongly supported;
- a document states it;
- someone participated in the meeting;
- the claim appears obvious.

Use `owner_validated` only when evidence supports actual responsible-owner/human validation of that claim.

A record-level validation status must describe the bounded claim itself. Confirmation of inputs does not validate derived totals, category mappings or a proposed explanation. Keep those as separate existing claims or narrow/split the claim where needed; prose qualifications must not silently override an overbroad status. Correcting a status does not itself create a new validation request: preserve settled inputs and follow the preflight before any question.

# 12. Evidence Links

Every substantive Reconstruction_Object should be connected to its source evidence through `Evidence_Links`.

The Evidence Link display name is mandatory. Construct it deterministically from the linked Evidence, relationship type and Reconstruction_Object before the write. A successful link write with a blank primary/display field is a failed ingestion invariant, even when the foreign keys are intact.

Create one relationship per Evidence ↔ Reconstruction_Object pair.

Use relationship types precisely:

- `supports`
- `contradicts`
- `corrects`
- `supersedes`
- `contextualises`
- `validates`
- `weakens`
- `reports`
- `implements`

Do not use `validates` for simple corroboration. Validation means evidence of actual responsible-owner/human validation.

# 13. Object Relationships

Use `Object_Relationships` when one Reconstruction_Object has a material relationship to another.

Available relationships include:

- `supersedes`
- `corrects`
- `contradicts`
- `depends_on`
- `contextualises`
- `related_to`

Preserve direction.

Do not delete an earlier object when it is corrected or superseded. History and correction lineage must remain reconstructable.

Use `related_to` sparingly. Prefer a precise relationship when supported.

# 14. What to reconstruct

Build the reconstruction progressively.

## A. Historical chronology

Reconstruct:

- how the domain evolved;
- important periods;
- turning points;
- changes in work;
- changes in responsibility;
- work that disappeared;
- work that was replaced;
- work later revived;
- supersession;
- significant corrections.

## B. Actual recurring work

Identify:

- triggers;
- actions;
- decisions;
- dependencies;
- handoffs;
- confirmations;
- repeated reconstruction;
- stopping points;
- exceptions;
- visibility loss.

## C. Roles and dependencies

Reconstruct:

- who actually performs work;
- who supplies knowledge;
- who decides;
- who validates;
- who depends on whom;
- person-held knowledge;
- single-person continuity risks;
- formal versus informal responsibility;
- changes over time.

## D. Information and evidence flows

Determine:

- information required for work;
- where it originates;
- where it is recorded;
- where it is duplicated;
- where it becomes inaccessible;
- what later has to be reconstructed;
- which communication surfaces carry operationally important evidence;
- where source evidence and later summaries diverge.

## E. Systems, data and tools

Reconstruct relevant use of:

- Airtable;
- spreadsheets;
- Asana;
- Drive;
- Slack;
- Gmail/shared mailboxes;
- Claude;
- ChatGPT;
- automation;
- GitHub;
- third-party services;
- other software.

Preserve capability stages separately.

## F. Operational terminology

Capture:

- language actually used by operators;
- domain-specific terminology;
- terms with multiple meanings;
- inconsistent terminology;
- implementation/system terminology;
- terminology that changed;
- terminology requiring validation.

Where relevant preserve distinctions between:

```text
physical form
≠ operational classification
≠ system representation
≠ organisational meaning
```

## G. Standards, procedures and agreements

Separate:

- validated current standards;
- observed informal recurring rules;
- documented procedures;
- old/superseded procedures;
- partner-specific agreements;
- proposed future rules;
- rules encoded only inside systems;
- areas where operator judgement substitutes for a shared standard.

Agreement evidence does not automatically establish execution.

## H. Variations and exceptions

Preserve alternative operational paths.

Do not convert several observed flows into one mandatory workflow unless evidence actually supports one.

## I. Visibility breaks and structural problems

Look for evidence of:

- repeated reconstruction;
- missing handoffs;
- missing confirmations;
- inaccessible information;
- person-held continuity;
- duplicated records;
- ambiguous ownership;
- source fragmentation;
- gaps between operational reality and system representation.

## J. Decisions and unresolved questions

Separate:

- settled;
- owner-validated;
- partially settled;
- proposed;
- contradicted;
- superseded;
- genuinely unresolved.

# 15. Investigation behaviour

Do not stop after initial search results.

Search iteratively using:

- current terminology;
- historical terminology;
- people's names;
- role names;
- partners;
- projects;
- systems;
- artifact names;
- dates;
- known events;
- corrections;
- cross-domain references.

Follow threads and linked artifacts.

When a source identifies another relevant source, inspect the underlying source where accessible.

Search backwards and forwards in time.

When new terminology, people, projects, systems, or events emerge, run new searches for them.

Do not assume the correct search vocabulary was known at the beginning.

Continue until additional searching produces diminishing materially new evidence.

# 16. Continuous preservation rule

Do not wait until the end of the investigation to write everything to Airtable.

Work iteratively:

```text
search
→ inspect source
→ search Airtable for existing evidence
→ preserve new Evidence if needed
→ search existing Reconstruction_Objects
→ create/update bounded Reconstruction_Object where justified
→ create Evidence_Links
→ create Object_Relationships where justified
→ continue investigating
→ revise evidence assessment/current-state interpretation as later evidence appears
```

When the source is a meeting or huddle, also create or update the corresponding `Meetings` source-register record with its date, participants, domain, stable source references, processing outcome, validation boundary, summary and limitations. `Meetings` records aid source discovery and coverage audit; they do not replace bounded Evidence records or Evidence Links.

After each write batch, verify at minimum:

- zero blank primary/display names in records created or updated by the batch;
- every material Evidence record is linked to the intended reconstruction run;
- every substantive object derived or changed by the batch has at least one Evidence Link;
- each discovered huddle has an explicit coverage-ledger outcome;
- returned record counts and IDs match the intended batch.

If any invariant fails, keep the affected material in `coverage_gaps`, repair it, and verify again before advancing coverage.

When a correction changes current meaning, reconcile affected evidence summaries, object claims/statuses, link scope notes and the run's current coverage fields. Preserve original excerpts and superseded values as labelled history; an appended note alone does not repair contradictory current fields.

The conversation is a working environment.

Airtable is the durable reconstruction staging layer.

Do not allow important reconstruction work to exist only inside chat context.

# 17. Coverage tracking

Maintain the relevant `Reconstruction_Runs` record continuously.

Update `coverage_summary` with what was actually processed.

Update `coverage_gaps` with:

- inaccessible channels;
- missing DMs;
- inaccessible or unprocessed DCA shared mailboxes;
- relevant third-party services not yet audited or inaccessible;
- inaccessible files;
- missing transcripts;
- unavailable history;
- partial exports;
- uncertain date coverage;
- source failures;
- important evidence not yet processed.

Do not summarize Slack coverage as complete from message/thread counts alone. Report huddle coverage separately, including material huddles processed, context-only huddles, low-content exclusions, unavailable transcripts and any maintained-reality sources not yet represented in the run.

Absence of accessible evidence is not evidence of absence.

# 18. Write boundary

During this investigation, writes are authorised only to these Airtable staging tables:

- `Reconstruction_Runs`
- `Evidence`
- `Reconstruction_Objects`
- `Evidence_Links`
- `Object_Relationships`
- `Meetings`

This workflow does not authorise modification of:

- canonical DCA Shared Structure;
- DCA Relationships & Workflows;
- canonical relationship records;
- Logistics operational staging;
- other operational Airtable records;
- Slack;
- Gmail;
- Asana;
- Google Drive;
- GitHub;
- third-party services;
- organisational standards;
- procedures;
- Operational Reality;
- Derived Organisational Reality;
- Claude configuration;
- live systems.

Read/search Gmail and third-party services only where access is explicitly available through the active runtime. Do not alter mail, labels, contacts, service records, subscriptions, campaigns, integrations, configuration, or external data during reconstruction.

Do not promote reconstruction objects into canonical organisational objects during this investigation.

If evidence suggests such a change is justified, record the reconstruction object and implication. Do not perform the promotion.

# 19. Airtable failure behaviour

If Airtable becomes unavailable:

- do not stop the investigation;
- do not pretend records were written;
- maintain a temporary structured queue of Evidence, Reconstruction_Objects, Evidence_Links, and Object_Relationships awaiting ingestion;
- report the write failure as a coverage/processing gap;
- when Airtable becomes available again, search-before-create before ingesting the queue.

# 20. Mandatory handoff: self-evaluation and routing

Reconstruction does not end when evidence collection and synthesis are complete.

Before any reconstructed object is treated as established, classified for a canonical destination, proposed for promotion, or used as the basis for structural/system change, continue with:

**`workflows/reconstruction-self-evaluation-and-routing.md`**

When the run uses Asana to obtain input, validate operational meaning, reconcile maintained reality, or test live use, create or reuse the **Establish** parent and A–E/C1–C3 task structure defined by that workflow. Do not create a standalone engineer-facing validation task for an operational person.

The required sequence is:

```text
Evidence collection
→ Reconstruction
→ Reconciliation
→ Reconstruction self-evaluation
   ├─ insufficient → continue investigation and preserve the gaps
   └─ sufficient → establish what the evidence supports
→ validation-request preflight
   ├─ already settled with no material delta → exclude and record references
   ├─ active unresolved thread covers it → continue that thread
   └─ genuine operational delta → prepare only that bounded item
→ human validation where required
→ object classification
→ destination/routing assessment
→ promotion assessment
→ maintained-reality reconciliation
→ verified persistence or an explicit bounded non-write outcome
```

The self-evaluation gate is mandatory. A reconstruction must not advance merely because a large amount of evidence was processed or a plausible synthesis can be written.

The self-evaluation must test, at minimum:

- source and date coverage;
- source diversity and duplicate-source inflation;
- temporal completeness;
- unresolved contradictions;
- correction and supersession lineage;
- attribution quality;
- capability-stage certainty;
- current-state confidence;
- discovered but unprocessed adjacent sources, people, systems, or services;
- genuine unknowns versus evidence not yet searched;
- readiness of individual objects for validation or promotion assessment.

If the self-evaluation identifies material insufficiency, return to investigation. Update `coverage_summary`, `coverage_gaps`, Evidence, Reconstruction_Objects, and relationships as appropriate, then run self-evaluation again.

Do not substitute AI self-evaluation for human validation. They are separate gates:

- **self-evaluation** assesses whether the reconstruction process and evidence base are sufficiently complete and reliable to proceed;
- **human validation** establishes organisational meaning or responsible-owner confirmation where required.

After self-evaluation and before generating any human-validation request, run the anti-duplication preflight defined in `workflows/reconstruction-self-evaluation-and-routing.md`. Check current maintained Operational Reality, prior owner-validation and correction lineage, and active unresolved comments/tasks. This preflight exists only to avoid duplicate asks and isolate a genuine delta; it must not be used as evidence or as a substitute for the downstream maintained-reality comparison.

Classification and routing do not themselves authorise canonical writes. The downstream workflow determines the proposed organisational destination and promotion readiness while preserving the write boundaries defined here.

For every object that is ready for target assessment, continue with:

**`workflows/reconcile-established-findings-into-maintained-reality.md`**

That workflow resolves the current authoritative target, compares the established candidate, records a controlled outcome, routes and persists any justified change, verifies persistence, and writes the downstream result back to the originating lineage.

Do not perform formal comparison with current maintained reality before the source-first reconstruction, self-evaluation, and required human validation are complete. The target is a downstream comparison surface, not evidence used to make the reconstruction conform. The bounded post-self-evaluation preflight may inspect it only to suppress an already-settled duplicate, continue an existing live thread, or isolate the genuinely new validation delta.

# 21. Final synthesis

Generate related exports from one identified staging checkpoint. Check event meaning, validation scope, unanswered questions and source limitations across the saved files and current staging fields, as well as IDs, counts, numeric types and accidental formulas. Preserve superseded statements only as labelled history. Compare material rows by their item and source/object identity, not row number alone; inspect the exported files after saving. Read-back verifies persistence, not the correctness of an interpretation. If sources or answers change after the checkpoint, preserve the snapshot date and refresh affected current outputs before presenting them as current.

The Airtable reconstruction layer is the detailed evidence graph.

Produce two separate outputs:

1. a durable, standalone reconstruction synthesis for the intended DCA readers; and
2. a concise chat or task handoff that links to the synthesis and states the next bounded action.

The handoff does not substitute for the standalone synthesis. Construct the synthesis through `skills/dca-document-authoring/SKILL.md`, including native headings and native lists in the destination platform.

Before the synthesis is shared, its opening must identify:

- what the document is and why it exists;
- its status and authority boundary;
- its intended audience and any requested action;
- the domain, time period, and source coverage;
- how confirmed, validation-pending, uncertain, historical, and proposed material are labelled;
- material limitations and remaining gaps.

Include a human-usable source guide. For each material source or source group, provide its name/title, platform and account/container, date or coverage period, what it supports, material limitations, and a stable reader-usable reference where access permits. Airtable Evidence IDs and other internal trace keys are secondary references, not the reader's only citation.

The synthesis must stand on its own. Do not expose private drafting shorthand or write as though the reader saw an earlier draft, correction packet, chat, or reconstruction log. Wording such as “former gap”, “earlier claim”, “new source”, “current outcome”, “remaining issue”, or “this run” is permitted only when the document itself names the antecedent, relevant period, and reader-relevant comparison. Otherwise state the audience-visible fact directly.

Keep process-maintainer detail—object identifiers, schema fields, routing, promotion, persistence mechanics, and technical reconciliation notes—in the evidence graph or a linked System & Structure handoff. Use a technical appendix only when the synthesis itself is explicitly maintainer-facing.

The synthesis should integrate the reconstruction rather than dumping every stored record.

Produce:

1. Investigation coverage
2. Historical chronology
3. Current operational reality
4. Recurring work and variations
5. Roles, attribution and dependencies
6. Information/evidence routes
7. Systems and capability-status map
8. Terminology map
9. Standards, procedures and agreements
10. Important decisions
11. Contradictions, corrections and supersession
12. Visibility breaks
13. Unresolved questions
14. Evidence-backed structural implications

Clearly mark structural implications as interpretation rather than operational reality.

End with:

- **A. Strongly supported**
- **B. Supported but still needs responsible-owner validation**
- **C. Genuinely unknown**
- **D. Earlier DCA/system assumptions contradicted by evidence**
- **E. Evidence that should be processed next**

Put the following in the linked process-maintainer handoff, not unconditionally in a general-reader synthesis:

- **F. Reconstruction objects ready for validation/promotion assessment**
- **G. Objects that must remain reconstruction/staging**
- **H. Airtable reconstruction run status and remaining coverage gaps**
- **I. Self-evaluation result and downstream handoff status**
- **J. Maintained-reality reconciliation outcomes, target revisions, persistence verification, and remaining blocked/not-ready objects**

In the general-reader synthesis, surface only the bounded reader-relevant maintained-reality status, unresolved limitations, and next requested action. Include F–J there only when the named audience is a process maintainer and the technical detail is needed.

The final synthesis must not bypass the mandatory self-evaluation and routing workflow or the maintained-reality reconciliation handoff. If self-evaluation has not passed, say so explicitly and do not present the reconstruction as promotion-ready. If target reconciliation has not run, say so explicitly and do not imply that promotion, persistence, or maintained-state reconciliation occurred.

Do not share the synthesis until the document-authoring quality gate and the standalone-reader checks above pass.

# Final constraint

Do not derive an ideal future operating model.

Do not optimise DCA.

Do not make the evidence fit the current system.

First reconstruct the domain correctly.

Then self-evaluate it before acting on it.

**Reality authorises the model.**
