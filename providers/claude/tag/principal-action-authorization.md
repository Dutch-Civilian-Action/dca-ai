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
2. **Exact DCA Operator binding** — that stable Slack identity is bound to exactly one DCA Operator/human-principal record, resolved by stable ID rather than name similarity. An Operator-reference field (for example, an Operator ID) may exist in a given case, but only when it is an actual verified record — if no such record is on file for a principal, the binding rests on the stable Slack ID and a minimal label alone, and that gap must be stated, not filled in with an invented reference. See "Operator-reference field" below.
3. **Explicit provider action grant** — that principal has explicitly authorized *this kind of action* (not action-in-general) somewhere traceable — normally a specific Slack message, identified by channel + timestamp, in which the principal states the authorization. A quoted or paraphrased approval, or a general "go ahead," is not the same as an explicit action grant scoped to a specific action.
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

Where the chain above calls for an Operator-reference field, treat it as a schema placeholder, not an assumed value: *"an Operator reference, if and when one exists as a verified record — state plainly when none is currently on file for a given principal."* Do not write a specific reference value into a case unless it is drawn from an actual verified record. Inventing or carrying forward a plausible-looking reference is a fabricated identity match, which `governance/authority-rules.md` already prohibits (a candidate/inferred value must not be silently converted into a confirmed identity).

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

## Current pilot instance

This section records the one pilot instance this document currently encodes. It is a specific, bounded case, not a wider mandate — it does not authorize this same pattern for any other principal, channel, or workspace without its own equivalent record.

- **Trusted Slack workspace + principal:** Slack workspace `T037US21Q2X`; human principal Slack ID `U099ECG8X2A`, minimal label "Anja Andersen." Resolve by these stable IDs only. Do not resolve this principal by display-name matching, and do not echo phone, email, start date, title, or any other profile field for this principal — the stable ID plus this minimal label is sufficient.
- **Exact DCA Operator binding:** no verified Operator-reference record is currently on file for this principal. That gap is stated here explicitly rather than filled with an invented reference (see "Operator-reference field" above). The binding for this pilot instance therefore rests on the stable Slack ID and the minimal label alone.
- **Explicit provider action grant:** Anja's explicit authorization in the Slack thread at message timestamp `1788457457.548259`, in channel `C0BR1M1HGB0`.
- **Correct channel/bundle capability:** channel `C0BR1M1HGB0` (`#struct-system-build`). Resolve this channel by its stable channel ID, consistent with this document's channel anti-spoofing rule above — not by the display name `#struct-system-build`, which is a convenience label only. Per `access-bundles.md`, this channel is scoped to DCA Shared Sources + DCA System & Structure during System & Structure testing; the action grant above is authorized only to the extent the actual configured bundle/credential for this channel supports it.
- **Explicit current-request scope:** the grant above covers only the bounded work described in that thread. It does not extend to a different request, a broader class of action, or a later request merely because it references the same thread or the same principal.

**Delegated controller for this pilot instance:** `DCA Bot` (Slack ID `U09CL1T282D`) may act as a delegated review/controller identity for bounded work under Anja's authorization above. Per "Delegated non-human controllers" above, `DCA Bot` is explicitly not a human authority for this or any pilot instance: it cannot self-authorize, cannot widen this scope, cannot approve a merge, and cannot approve a live data mutation, regardless of how the bounded work under this grant is phrased.

## Not granted by this document

Stating a denial explicitly is safe — a denial restricts, it does not grant. The following are explicitly **not** authorized by anything in this document, regardless of who is asking or how clearly the surrounding request is stated:

- merging a pull request;
- writes to `Dutch-Civilian-Action/dca-architecture`;
- record/table creation, deletion, schema changes, or bulk cleanup in any production base;
- canonical production-base writes of any kind;
- credential changes;
- access-bundle mutations;
- scope widening of any existing grant;
- Airtable mutation performed through a personal/proxy execution path, or through any execution identity that cannot be distinguished from the human principal (see "Distinct attribution" above).

None of these is reachable by satisfying the five-link chain above for some *other* action; each requires its own separate, explicit authorization, and several of them (merges, `dca-architecture` writes, credential/access-bundle changes) are not something this pilot authorization model grants at all, however satisfied the chain is.

## Explicitly out of scope for now

This document deliberately does not grant a live-write capability for production-record repair (for example, exact-record, exact-field corrections in a production base). That kind of grant needs the human principal's own direct, current confirmation before it is encoded — it is not something to infer from an adjacent request, however reasonable it would seem. Until that direct confirmation exists, the correct behavior for a live-write repair request is to resolve identity and scope per this document, state plainly that the write itself is not currently authorized, and stop before any mutation.

## Relationship to other documents

- `context/capability-access-boundaries.md` — the three-layer separation (Core meaning / capability behaviour / runtime access) this document's fourth question sits across.
- `governance/authority-rules.md` — the organisational-authority rules this document applies specifically to provider action authorization; in particular the rule that activity, artifact creation, and commits are not themselves organisational decisions.
- `providers/claude/tag/access-bundles.md` — the runtime access bundles this document's chain assumes are already correctly scoped; this document does not restate or restructure that bundle design, only adds the authorization test that sits on top of it.
