---
document_type: dca_ai_workflow
status: current-testing
scope: relationship-data-newsletter-intake
workflow: intake-newsletter-contacts
provider_independent: true
---

# Intake Newsletter Contacts

## Bounded requirement

A DCA operator supplies names and email addresses for newsletter subscription. Preserve and reconcile that information in DCA's shared records first. Any subsequent subscription must be derived from the saved, sufficiently reconciled records and recorded consent evidence, with its result written back.

This extends [relationship reconciliation](reconcile-relationship-data.md). It does not settle the wider identity/function model. Current operational routing remains Relationships & Workflows (`appMdqKYTMnPmVoVu`); Shared Identity & Relationships (`appScO2P8fD8yprCW`) remains a candidate. R01 (`appTpzRmniNpMv35Q`) is a separate identity-migration experiment. Neither is a second intake destination.

## Capture and reconcile

1. Resolve the authorized operator, execution surface and permitted destination. Accept the supplied list without asking the operator to classify people or understand the tables.
2. Preserve the original submission, its source/version, row locator and authenticated human attribution. Keep source wording separate from normalized values. Preserve every row, including duplicates and incomplete or conflicting entries.
3. Search the active shared contacts and contact routes before creating identities. A unique email is strong route evidence, not conclusive person identity: shared addresses, conflicting names and multiple matches need review. Do not strip plus suffixes or dots, infer an organisation from a domain, or merge on name alone.
4. Reconcile each clear row into the existing reusable records, creating only the supported minimum. Link the preserved intake to its result and read both back. Do not change an existing confirmed name, route, role or validation state merely because a list supplies a different value.
5. Record subscription intent separately from identity resolution, consent and observed platform status. A saved Contact or an applied intake does not mean subscribed. Incomplete consent does not prevent authorized relationship intake.

Do not manufacture donor, partner, volunteer, organisation-affiliation or function assignments from newsletter interest. An email address alone is not proof that a person consented, owns that address, or prefers email for every DCA purpose.

## Subscription consequence

The first pilot is human-invoked, one bounded batch at a time. No background sync, scheduler or bulk migration is introduced. Before any external action, apply the [dataset prerequisite](../governance/authority-rules.md#dataset-prerequisite-for-operational-automation) to the actual saved batch: reconciled contact/route, preserved source, consent state, target audience, responsible operator and correction process must be established for the rows being used. Missing unrelated historical data does not block that evidenced scope.

The subscription step requires all of the following:

- The operator requested this subscription action, the runtime is permitted to perform it, and the actual account/audience is resolved. A request to capture contacts alone does not authorize external subscription.
- The saved intake is linked to a sufficiently resolved contact and the requested email route. Read those records again immediately before use; do not execute from the original pasted list or a stale plan.
- Evidence supports consent for that address, DCA newsletter purpose and audience. A source-linked operator attestation that these people requested that newsletter can be evidence at its stated scope. A bare list, donor status, or consent to a different service/purpose is insufficient. Preserve missing or approximate dates as such.
- Current suppression and platform state have been checked. DCA `do_not_contact`, a relevant organisation restriction, withdrawn consent, unsubscribe, cleaned/bounced or archived state must not be overridden by this pilot. Unknown or inaccessible state blocks that row's external action.
- Record outcomes and corrections have a named responsible operator. Use the current batch's authenticated requester for follow-up unless an explicit handoff establishes someone else; do not silently assign a new organisation-wide owner.

For an already subscribed address, record the observation without changing its status. For an existing pending confirmation, record pending without resending. For an eligible new subscriber, use only the approved subscription mode supported by the configured tool. A confirmation invitation is also an external action and needs authorization and an appropriate basis; it is not a workaround for missing consent.

Missing Mailchimp access leaves the reconciled records ready for continuation. It does not justify bypassing DCA records, exporting a new parallel master list, claiming success, or widening a channel's access.

## Retry, result and correction

- Distinguish intake identity (source/version + row) from external membership identity (service/account + audience + email route). Replaying an unchanged source row must reuse its intake; another source about the same contact retains its own provenance without creating another person or membership.
- Serialize processing for the same source batch and audience/address. Before retrying, inspect saved outcomes and the live external member. This pilot does not provide a distributed lock or an exactly-once guarantee.
- Record intent durably before an external mutation. A timeout, lost response, or failed result write-back is an unknown outcome until reconciled. Never retry an external mutation blindly or reverse a successful subscription just because the local result write failed.
- Record platform member reference, audience, observed status, check time, execution outcome and error/unknown state separately from consent. A request accepted by a tool is not proof of completed subscription. Read back the affected external result and the saved DCA outcome.
- Report per-row partial results; do not mark a whole batch successful when only some rows completed. Keep personal details and consent evidence in the permitted private/shared record surfaces; channel replies use counts and appropriately restricted record links.
- Preserve corrections and previous evidence. A corrected address requires fresh identity, consent and suppression checks; permission for the old address does not transfer automatically. Before later external use, recheck current platform status so a later unsubscribe is respected. This pilot does not claim continuous reverse synchronization.

## Migration continuity

Keep the current contact ID, intake record ID, source/version/row, audience/member reference and qualified consent/result history together. Later migration must map those records into the adopted identity/contact-route and communication structures without creating a second identity, losing provenance, or replaying a completed subscription.

The broader research remains separately reviewable in [dca-ai #37](https://github.com/Dutch-Civilian-Action/dca-ai/pull/37) and [dca-architecture #9](https://github.com/Dutch-Civilian-Action/dca-architecture/pull/9). Neither PR's merge would by itself adopt the candidate base or validate its whole dataset.

Neither is a technical prerequisite for this current-route pilot. See the [small build/promotion plan and builder prompt](../providers/airtable-omni/newsletter-intake-build.md) for the suggested review order and exact Airtable scope.

## Current implementation

The Claude adapter is the existing [Relationship Data skill](../plugins/dca-relationship-data/skills/managing-dca-relationship-data/SKILL.md), with [pilot field mapping and continuation procedure](../plugins/dca-relationship-data/skills/managing-dca-relationship-data/references/newsletter-intake.md). It reuses existing fields; it does not repair unrelated schema drift or create a subscription data model.

Repository preparation, installed runtime behaviour and successful end-to-end use are separate. Record the tested revision and remaining deployment/access gaps in the PR. Use the [bounded test cases](../tests/providers/claude/newsletter-intake.md) before claiming the pilot works.
