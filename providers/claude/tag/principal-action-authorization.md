---
document_type: dca_ai_provider_configuration
status: current-testing
provider: claude-tag
scope: principal-action-authorization
---

# Claude Tag Principal / Action Authorization

## Purpose

Define what a request needs before Claude Tag treats a provider action as authorized — especially any action that would touch production data.

This is a decision model, not a live capability grant. It states the conditions under which an action is authorized; it does not itself expand what any bundle, credential, or channel can do. Where this document and `access-bundles.md` disagree on what is actually attached, `access-bundles.md` and the organisation-managed Claude Tag configuration are authoritative on runtime access — this document only adds the authorization test that must also pass.

This composes with, and does not replace, `context/capability-access-boundaries.md`. That document separates shared Core meaning, capability behaviour, and runtime access. This document adds a fourth question that sits across all three layers: **given that access exists, is this specific action, right now, actually authorized?**

## Governing principle

**Every condition below must hold at the same time. None of them is a substitute for another, and none of them widens what another one grants.**

Tools being available, credentials being attached, channel membership, or a bundle being present are runtime *capability* — they describe what could technically be attempted. They are never, by themselves, action *authorization*. A request is authorized only when the full chain resolves.

## The decision chain

For any provider action, and especially for anything that would touch production data:

```text
1. trusted Slack workspace + principal
   → 2. exact DCA Operator binding
   → 3. explicit provider action grant
   → 4. correct channel/bundle capability
   → 5. explicit current-request scope
```

Each link:

1. **Trusted Slack workspace + principal** — the request originates in a known, trusted DCA Slack workspace, from a specific authenticated Slack identity resolved by stable ID (workspace ID and user ID), never by display name, title, or channel presence alone.
2. **Exact DCA Operator binding** — that stable Slack identity is bound to exactly one DCA Operator/human-principal record, resolved by stable ID rather than name similarity. Authenticating the Slack identity (link 1) is a precondition for checking this link; it does not itself satisfy it. An Operator-reference field (for example, an Operator ID) may exist in a given case, but only when it is an actual **independently verified** record — a record that exists in DCA personnel/authority sources apart from the principal's own say-so. A principal directly confirming a reference value about themselves is real evidence (state who confirmed it and when) but is not the same evidentiary weight as that kind of independent record, and must not be labeled "verified." Absent an independent record, this link is **not satisfied**, whether the gap is total (no reference at all) or partial (a principal-confirmed reference with no independent corroboration) — the chain fails closed at this link exactly as it would for any other missing link. See "Operator-reference field" below.
3. **Explicit provider action grant** — that principal has explicitly authorized *this kind of action* (not action-in-general) somewhere traceable — normally a specific Slack message, identified by channel + timestamp, in which the principal states the authorization. A quoted or paraphrased approval, or a general "go ahead," is not the same as an explicit action grant scoped to a specific action. A message that authorizes a **delegated controller to exist and act in a bounded role** (see "Delegated non-human controllers" below) is a distinct thing from a message that grants a **specific action class and scope**; establishing the former does not by itself satisfy this link for any given action — the action class and scope still need their own traceable grant. A short reply from the principal (for example, a plain "confirmed") **can** satisfy this link when it is a direct, unambiguous reply to a structured, itemized proposal that lists the specific action class(es) and scope being requested — the reply's own message must be from the principal, not the proposing party, and its scope is exactly what the proposal itemized, no more.
4. **Correct channel/bundle capability** — the channel the request arrives in actually carries the access bundle and credential needed to perform the action, per `access-bundles.md`. A grant from step 3 does not manufacture capability that the channel does not have configured.
5. **Explicit current-request scope** — the action being attempted now is the action that was actually granted, for this request, not a broader or adjacent action inferred from it, and not a standing grant being replayed into a new, different request.

**If any link is missing, ambiguous, or only partially satisfied, the action is not authorized.** Fail closed before any mutation — do not proceed on the assumption that a missing link will turn out fine, and do not treat partial satisfaction as sufficient.

### What never substitutes for a link in this chain

None of the following establishes action authority on its own, and none of them may be combined to stand in for a missing link above:

- channel membership;
- profile or title fields;
- conversational memory of an earlier, different request;
- a quoted or pasted approval that is not an explicit, traceable action grant;
- an `operator_roles` field, if such a field exists elsewhere in the repository;
- bundle presence or attachment;
- tool or credential availability;
- the `authority-map.md` document-authority record (that record establishes organisational document authority, not runtime action authorization).

### Operator-reference field

Where the chain above calls for an Operator-reference field, treat it as a schema placeholder, not an assumed value: *"an Operator reference, if and when one exists as a verified record — state plainly when none is currently on file for a given principal."* Do not write a specific reference value into a case unless it is drawn from an actual event — either an independently verified record, or the principal's own traceable confirmation of that value (named message + timestamp). Never write a reference value that is merely plausible-looking or inferred with no traceable source at all; that is a fabricated identity match, which `governance/authority-rules.md` already prohibits (a candidate/inferred value must not be silently converted into a confirmed identity). When the source is the principal's own confirmation rather than an independent record, that distinction must travel with the value every time it is written — see below.

A verified stable Slack identity (link 1) is not a substitute for a verified Operator record and must not be treated as satisfying link 2 by proxy. Likewise, a principal directly confirming their own Operator-reference value — for example replying to name a specific reference and stating it is correct — is first-hand self-attestation, not independent corroboration. Record both facts precisely when they apply: that the principal confirmed the value directly (naming the message and timestamp), and that no independent DCA personnel/authority record corroborates it. Do not call a self-attested value "verified"; state it as "confirmed directly by the principal" instead. Either way — no reference at all, or a principal-confirmed reference without independent corroboration — treat link 2 as unsatisfied. An unsatisfied link 2 means the decision chain does not resolve, and per the governing principle above, the action is not authorized, regardless of how well links 1, 3, 4, or 5 resolve.

## Identity and privacy rules

- Resolve by the authenticated stable tuple — workspace ID, user ID, channel ID — never by display-name similarity, and never by how a name is spelled or capitalized in a message.
- Treat a Slack channel's identity as its stable channel ID, not its display name, for exactly the same anti-spoofing reason: a channel can be renamed, and a display name can be typo-matched or impersonated the same way a person's display name can.
- Never echo phone number, email, start date, title, or other unrelated profile fields when the stable IDs plus a minimal label are sufficient to identify the principal in output. State only what the response actually needs.
- Missing or mismatched authority fails closed before any mutation — this applies even when the requester is a known, generally-trusted person, and even when refusing feels unhelpful in the moment.

## Delegated non-human controllers

A delegated identity (for example, a bot or automation account acting as a bounded reviewer/controller under a human's standing authorization) may carry out bounded work within a scope a human principal has already, explicitly granted. A delegated controller is never itself a human authority, and specifically:

- it cannot self-authorize an action that was not already explicitly granted by a human principal;
- it cannot widen the scope of a grant it is operating under;
- it cannot approve a merge;
- it cannot approve a live data mutation.

Any of the above requires the human principal's own action, not the delegated controller acting on the human's behalf by inference.

## Distinct attribution, never collapsed

The following identities must remain distinct from one another in reasoning, logs, and output attribution. They must never be collapsed into a single actor, even when several of them happen to be involved in the same request:

- the authorizing human principal;
- a delegated controller (non-human) acting under that principal's authorization, where one is involved;
- the Claude executor (the runtime/interface actually carrying out the action);
- the GitHub actor (the identity under which any repository action is performed, e.g. a commit author or PR opener);
- any Airtable execution identity (the credential actually used for any Airtable read/write), where Airtable is involved.

Claude is not the human principal merely because Claude performs the action. The GitHub actor is not the authorizing principal merely because the principal's request led to the commit. An Airtable execution identity is not the human principal merely because the principal authorized the write it performs. Collapsing any of these into one identity is exactly the kind of "artifact/activity/commit is not organisational decision" gap that `governance/authority-rules.md` and `providers/claude/tag/access-bundles.md`'s credential-separation rules already guard against — this document applies that same separation to action authorization specifically.

## Current pilot instances

This section records the pilot instances this document currently encodes. Each is a specific, bounded case, not a wider mandate — recording one instance does not authorize this same pattern for any other principal, channel, workspace, or scope without its own equivalent record. **Recording an instance is not the same as declaring it fully authorized: see each instance's "Current status" below.**

### Pilot instance 1: `#struct-system-build` — delegated controller for bounded `dca-ai` repository work

Two Slack messages matter here, and they are not interchangeable:

- `DCA Bot`'s structured, itemized proposal at timestamp `1788459172.331849` — bot-authored, not a human action, and therefore never itself a grant (see "Explicit provider action grant" above). It itemized: an identity-binding reference (`OPR-0003`) for Anja; `DCA Bot`'s delegated-controller scope; draft branch/commit/PR permissions in `dca-ai` (no merge); and a staging-repair authorization framework.
- Anja's own direct reply, "confirmed," at timestamp `1788459407.061009` — a plain peer message from the principal herself, not bot-authored, replying directly to that itemized proposal.

- **Trusted Slack workspace + principal:** Slack workspace `T037US21Q2X`; human principal Slack ID `U099ECG8X2A`, minimal label "Anja Andersen." Resolve by these stable IDs only. Do not resolve this principal by display-name matching, and do not echo phone, email, start date, title, or any other profile field for this principal — the stable ID plus this minimal label is sufficient. This link (link 1) is satisfied for this pilot instance.
- **Exact DCA Operator binding:** Anja has **confirmed directly, at ts `1788459407.061009`**, that `OPR-0003` is her Operator reference. That confirmation alone remains self-attestation, not independent corroboration, and would not by itself satisfy this link. Separately from that confirmation, an independent DCA personnel/authority record exists and has been read directly: the live `Operators` table (base `appMdqKYTMnPmVoVu`, table `tbl0rMfAOKGa6Umi5`), record `recvrhYjRK0biVuhc`, created `2026-07-01` — predating this thread and this pilot instance — carries `operator_id: OPR-0003`, `operator_name: "Anja Andersen"`, and `slack_user_id: U099ECG8X2A` directly on the record. This is exactly the kind of record the "Operator-reference field" rule above requires: one that "exists in DCA personnel/authority sources apart from the principal's own say-so." The earlier finding that "no such independent record exists" was scoped only to a search of `dca-ai` and `dca-architecture`; it did not check the live Operators system of record itself, which is the actual personnel/authority source for this binding. **This link (link 2) is satisfied for this exact tuple** (workspace `T037US21Q2X`, Slack ID `U099ECG8X2A`, `Operators` record `recvrhYjRK0biVuhc`) **going forward**, on the strength of the independent record, not the principal's self-attestation. This is a runtime confirmation from observed system state, not a permanent architectural fact — if the underlying `Operators` record ever changes or is removed, this resolution must be re-checked rather than assumed to still hold.
- **Explicit provider action grant:** Anja's direct reply at ts `1788459407.061009` **does** satisfy this link for this pilot instance: it is a traceable, unambiguous, principal-authored confirmation of a structured, itemized proposal. Its scope is exactly what that proposal itemized — no more: `DCA Bot`'s delegated-controller status; draft branch/commit/PR permissions in `dca-ai` (explicitly excluding merge); and the staging-repair authorization *framework* described below. **This link (link 3) is satisfied for this pilot instance, scoped to those three items only.**
- **Correct channel/bundle capability:** channel `C0BR1M1HGB0` (`#struct-system-build`). Resolve this channel by its stable channel ID, consistent with this document's channel anti-spoofing rule above — not by the display name `#struct-system-build`, which is a convenience label only. Per `access-bundles.md`, this channel is *intended* to be scoped to DCA Shared Sources + DCA System & Structure during System & Structure testing (see "Intended configuration vs. observed deployment" below on why that is a recommendation, not a confirmed deployment fact). Even where the intended/deployed bundle capability is confirmed, it does not by itself satisfy link 2 above or widen link 3's scope.
- **Explicit current-request scope:** now evaluable against the link-3 scope. A request to act as the delegated controller, or to create/update a draft branch, commit, or draft PR in `dca-ai` (no merge), falls within the granted scope. A request for a merge, a request touching `dca-architecture`, or a request for any live data mutation does **not** fall within the granted scope — the latter is addressed specifically below, because the staging-repair framework being confirmed is not the same as a live-mutation approval.

**Delegated controller for this pilot instance:** `DCA Bot` (Slack ID `U09CL1T282D`) acts as a delegated review/controller identity for bounded work under Anja's confirmation above. Per "Delegated non-human controllers" above, `DCA Bot` is explicitly not a human authority for this or any pilot instance: it cannot self-authorize, cannot widen scope beyond what Anja's confirmation itemized, cannot approve a merge, and cannot approve a live data mutation, regardless of how the bounded work is phrased.

### Pilot Airtable credential exception: registered human-owned credential, default-deny with a named exception

Production schema/data mutation remains **denied by default**. This section defines one narrow, explicitly registered exception process for this pilot — it does not create a general allowance, and it does not by itself authorize any specific action.

For this pilot, a registered, human-owned Airtable credential **may** serve as the execution credential for an explicitly authorized, exact-scope action, provided all of the following hold at the same time:

- the credential is documented as a mapped execution identity for a named human Operator — for example in a `Platform_Actor_Roles`-style identity/role mapping record (see below) — rather than being an unregistered, unexpected, or unmapped identity;
- the specific action is separately, explicitly authorized by the human principal, naming the exact base and the exact action (not a general "go ahead" and not an earlier, different grant being replayed);
- links 1, 2, 4, and 5 of the decision chain above independently hold for that specific request.

Airtable's native attribution of a write to the credential holder does not make that credential holder the executor, and does not collapse the authoriser, the executor, and the platform credential identity into one identity — those three roles remain distinct per "Distinct attribution, never collapsed" above, regardless of whose credential technically performs the write. An unregistered, unexpected, or unmapped execution identity remains prohibited outright; this exception never extends to one.

This is a default-deny with a defined exception process, not a blanket permission: absent a live, specific, exact-scope authorization satisfying every bullet above, production schema/data mutation stays denied, exactly as it was before this section existed.

#### Identity/role mapping records (`Platform_Actor_Roles`-style)

A `Platform_Actor_Roles`-style table — referenced here conceptually; none is created by this document or by this amendment — would record identity/role attribution only: which platform identity maps to which human Operator or system executor, and in what role. Such a record grants neither platform access nor action authority by itself; it is evidence for satisfying the credential-registration bullet above, not a substitute for the separate, explicit, exact-scope authorization the same bullet also requires. A future replacement execution identity (for example, a `DCA AI` Airtable identity taking over from a currently registered human-owned credential) is a change to the execution-identity mapping, not a change to this authorization model — the same decision chain and the same default-deny exception process continue to apply to whichever credential is currently registered.

### Staging-repair framework: confirmed process, not a live-mutation authorization

Anja's confirmation covers the staging-repair authorization *framework* `DCA Bot`'s proposal described — the process by which a future gated repair could be approved. Per that proposal's own text, which Anja confirmed as written: exact-record, exact-field repairs "may proceed only after Anja directly approves the exact record IDs, fields and intended values in the Slack thread."

No such record-specific approval currently exists. **Confirming the framework is not the same as authorizing a mutation under it.** Treat this as a distinct, two-stage gate, not a single yes/no:

1. the framework/process for a future gated staging repair — confirmed, ts `1788459407.061009`;
2. authorization for any *specific* mutation under that framework — not yet given; requires a further, separate, record-specific approval (exact record IDs, fields, and intended values) from Anja in the Slack thread, at the time that specific repair is proposed.

Until stage 2 exists for a specific proposed repair, no write is authorized. Do not read stage 1's confirmation as if it were stage 2.

### Current status of pilot instance 1

Applying the decision chain to this pilot instance as currently recorded:

- link 1 (trusted workspace + principal) — satisfied;
- link 2 (exact Operator binding) — **satisfied for this exact tuple**, on the strength of the independent `Operators` record `recvrhYjRK0biVuhc` (see above), not the principal's self-attestation alone;
- link 3 (explicit provider action grant) — **satisfied**, scoped to `DCA Bot`'s delegated-controller status and draft branch/commit/PR work in `dca-ai` (no merge), plus the staging-repair framework as a confirmed process (not a live-mutation grant);
- link 4 (channel/bundle capability) — intended per `access-bundles.md`, not independently confirmed as deployed (see below);
- link 5 (current-request scope) — evaluable against link 3's scope; a bounded `dca-ai` draft-work request falls within it, a merge or live-mutation request does not.

This status is deliberately not a single yes/no:

- **Link 2 being satisfied for this tuple does not itself authorize any Airtable action.** It resolves one link of five; links 3 (a grant naming that specific action) and 5 (current-request scope matching it) still have to hold independently, exactly as before.
- **Link 3, as currently recorded, remains scoped to `DCA Bot`'s delegated-controller role and bounded, no-merge `dca-ai` repository work**, plus the staging-repair framework as a confirmed process. It does not itself name any specific Airtable mutation — a specific Airtable action still needs its own explicit, exact-scope grant under "Pilot Airtable credential exception" above.
- **Independently of link 2 now being satisfied, the staging-repair framework confirmation is still not a live-mutation authorization.** No production write is authorized without the separate, record-specific approval described above ("Staging-repair framework"), and any Airtable action beyond that framework additionally needs the exact-scope grant that "Pilot Airtable credential exception" above requires.

No provider action — and in particular no production data mutation — should be treated as authorized on the strength of link 2 now resolving, or of this pilot instance generally, without also satisfying the separate, specific, exact-scope grant that links 3 and 5 (and, for Airtable actions, the credential exception above) still require case by case.

### Pilot instance 2: `#relationships-workflows` — delegated AI-coordination counterpart role

Two Slack messages matter here, both authored directly by the human principal herself — unlike pilot instance 1, there is no bot-authored itemized proposal being confirmed; the principal states the grant in her own words across two messages in the same thread:

- Anja's message at timestamp `1789576064.655699` — confirmed the canonical calendar's current name (`DCA Shared Calendar`), confirmed that `DCA Bot` is a trusted internal DCA AI counterpart rather than an untrusted or unvetted bot, and asked Claude and `DCA Bot` to "work together and correct each other when either one starts drifting, while respecting your different roles and intervention boundaries."
- Anja's message at timestamp `1789576108.278219` — asked for one coordinated pull request that would, among other things, clarify when either AI configuration should intervene in the other's conversation, define how they exchange corrections and resolve conflicting claims, and ensure genuinely unresolved facts create visible validation work.

- **Trusted Slack workspace + principal:** the same workspace `T037US21Q2X` and human principal Slack ID `U099ECG8X2A` ("Anja Andersen") as pilot instance 1. This link (link 1) is satisfied here for the same reason it is satisfied for instance 1.
- **Exact DCA Operator binding:** this is the same principal tuple already resolved under pilot instance 1 (workspace `T037US21Q2X`, Slack ID `U099ECG8X2A`, `Operators` record `recvrhYjRK0biVuhc`). **This link (link 2) is already satisfied for this tuple going forward**, per the finding recorded under pilot instance 1 above; it is reused for the same principal, not re-derived independently here.
- **Explicit provider action grant:** Anja's own message at ts `1789576064.655699`, in her own words rather than through a bot-authored proposal, states that `DCA Bot` is a trusted internal AI counterpart and asks Claude and `DCA Bot` to coordinate and correct each other in this channel while "respecting your different roles and intervention boundaries." Read together with her follow-up at ts `1789576108.278219` asking for the specific intervention, correction-exchange, and conflict-resolution rules those two AI configurations should follow, this grants **only** a bounded AI-to-AI coordination/correction role for `DCA Bot` in this channel, governed by `governance/ai-coordination.md` — it is not a repository-write grant, not an Airtable-action grant, and not a channel/bundle-capability grant. **This link (link 3) is satisfied for this pilot instance, scoped to that coordination/correction role only.**
- **Correct channel/bundle capability:** channel `C0BH11B5PPE` (`#relationships-workflows`), resolved by its stable channel ID per this document's anti-spoofing rule, not by the display name. **This link is explicitly not established by this record.** Whether this channel carries, or should carry, any access bundle beyond what the coordination/correction role above needs is a separate, open decision that Anja has not yet made. Do not read this pilot instance, `access-bundles.md`, or any combination of the two as having silently expanded this channel's bundle or capability scope — no such expansion is recorded here or anywhere else as of this document's current revision.
- **Explicit current-request scope:** evaluable only against link 3's scope above. A request for `DCA Bot` or Claude to state a correction with its source, defer to the human principal when a conflicting claim persists, or route a genuinely unresolved fact into the validation queue per `governance/ai-coordination.md`, falls within the granted scope. A request for any repository write, any Airtable action, a merge, or any other action requiring its own authorization chain does **not** fall within this instance's scope — it requires its own separate, explicit grant exactly as it would without this pilot instance existing at all.

**Delegated role for this pilot instance:** `DCA Bot` (Slack ID `U09CL1T282D`) acts as a delegated AI-coordination counterpart in this channel, under Anja's confirmation above, subject to `governance/ai-coordination.md` and to "Delegated non-human controllers" above. This is a narrower role than pilot instance 1's delegated-controller grant: it authorizes coordinating and correcting within a live conversation, not repository or data actions. Per "Delegated non-human controllers" above, `DCA Bot` cannot self-authorize an action beyond this role, cannot widen this scope, cannot approve a merge, and cannot approve a live data mutation, regardless of how the bounded work is phrased.

#### Current status of pilot instance 2

Applying the decision chain to this pilot instance as currently recorded:

- link 1 (trusted workspace + principal) — satisfied;
- link 2 (exact Operator binding) — satisfied for this tuple, reusing the finding recorded under pilot instance 1;
- link 3 (explicit provider action grant) — satisfied, scoped only to the bounded AI-coordination/correction role described above;
- link 4 (channel/bundle capability) — **not established**; bundle/capability scope for this channel remains a separate, open decision Anja has not yet made, and this document does not decide it;
- link 5 (current-request scope) — evaluable against link 3's scope; a coordination/correction/validation-routing request per `governance/ai-coordination.md` falls within it, anything else does not.

No provider action beyond the bounded coordination/correction role described above — and in particular no repository write, no Airtable action, and no bundle/capability expansion — should be treated as authorized on the strength of this pilot instance. Each such action still requires its own separate, explicit, exact-scope grant, exactly as "Not granted by this document" and "Explicitly out of scope for now" below already require.

## Not granted by this document

Stating a denial explicitly is safe — a denial restricts, it does not grant. The following are explicitly **not** authorized by anything in this document, regardless of who is asking or how clearly the surrounding request is stated:

- merging a pull request;
- writes to `Dutch-Civilian-Action/dca-architecture`;
- record/table creation, deletion, schema changes, or bulk cleanup in any production base, **except** a specific action that satisfies every bullet of "Pilot Airtable credential exception" above — and even then, only that named action, not production mutation generally;
- canonical production-base writes of any kind, subject to that same narrow exception;
- credential changes;
- access-bundle mutations;
- scope widening of any existing grant;
- Airtable mutation performed through an unregistered, unexpected, or unmapped execution identity, or through any execution identity that cannot be distinguished from the human principal (see "Distinct attribution" above) — this prohibition is not narrowed by the pilot credential exception, which requires a registered, mapped identity and never applies to an unregistered or unmapped one.

None of these is reachable by satisfying the five-link chain above for some *other* action; each requires its own separate, explicit authorization, and several of them (merges, `dca-architecture` writes, credential/access-bundle changes) are not something this pilot authorization model grants at all, however satisfied the chain is.

## Explicitly out of scope for now

This document does not itself grant blanket authorization for production-record repair (for example, exact-record, exact-field corrections in a production base). For pilot instance 1 only, Anja has confirmed the *framework/process* under which such a repair could eventually be approved (see "Staging-repair framework: confirmed process, not a live-mutation authorization" above) — that is a real, distinct step, not nothing. Pilot instance 2 has confirmed no such framework at all. Either way, confirming the framework is not the same as authorizing any specific mutation under it, and it must never be read that way.

A live write is authorized only when, in addition to everything else this document requires, the human principal has given a **further, separate, record-specific approval** — naming the exact record IDs, exact fields, and intended values — at the time that specific repair is proposed. That approval does not currently exist for any repair. Until it does, the correct behavior for a live-write repair request is to resolve identity and scope per this document, state plainly (a) whether a staging-repair framework has been confirmed for this principal/instance and (b) that the record-specific approval it still requires has not been given, and stop before any mutation.

## Intended configuration vs. observed deployment

`access-bundles.md` and other repository configuration documents (including this one) are marked `current-testing` or similar because they describe **intended** provider configuration — what a channel/bundle/credential is meant to carry, and what a test in this repository checks against. Their presence in this repository, however detailed or internally consistent, does not by itself prove that configuration is actually deployed in the live Claude Tag environment right now.

Actual deployed access — which repositories, credentials, plugins, and bundles a given channel's Claude identity can really reach at a given moment — is established by the organisation's managed Claude configuration and by observed runtime behaviour, not by this repository. Where link 4 of the decision chain (correct channel/bundle capability) is being checked for a live action, confirm it against observed behaviour or the organisation's managed configuration, not solely by citing `access-bundles.md`'s intended design. This mirrors the same distinction `governance/authority-rules.md` draws elsewhere between an artifact existing and it being adopted or currently true in practice.

## Relationship to other documents

- `context/capability-access-boundaries.md` — the three-layer separation (Core meaning / capability behaviour / runtime access) this document's fourth question sits across.
- `governance/authority-rules.md` — the organisational-authority rules this document applies specifically to provider action authorization; in particular the rule that activity, artifact creation, and commits are not themselves organisational decisions.
- `providers/claude/tag/access-bundles.md` — the *intended* runtime access-bundle design this document's chain checks against for link 4; per "Intended configuration vs. observed deployment" above, confirming a live action still requires checking observed/deployed access, not only this document's design. This document does not restate or restructure that bundle design, only adds the authorization test that sits on top of it.
- `governance/ai-coordination.md` — the provider-independent rules pilot instance 2's delegated coordination/correction role above operates under: when intervention in another AI configuration's conversation is warranted, how corrections are exchanged, how conflicting claims are resolved, and how genuinely unresolved facts are routed into validation work.
