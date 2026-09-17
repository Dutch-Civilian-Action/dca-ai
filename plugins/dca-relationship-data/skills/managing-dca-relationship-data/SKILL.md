---
name: managing-dca-relationship-data
description: Retrieve and maintain DCA contact, organization, and relationship data in the current Airtable route. Use for contact lookup, additions, corrections, reconciliation, or names/email lists for newsletter subscription through DCA records before Mailchimp.
metadata:
  version: 0.3.0
  dca-agent: relationship-data-agent
  dca-workflow: reconcile-relationship-data
  mcp-server: airtable
---

# Managing DCA Relationship Data

## Purpose

Provide the Claude runtime implementation of DCA's provider-independent `relationship-data-agent` and `reconcile-relationship-data` workflow.

This skill is an interface and execution adapter. It does not define DCA organisational truth or relationship meaning.

## Runtime path

```text
DCA user
→ Claude Chat / Cowork, or Slack where the same behaviour is available
→ this skill
→ Airtable connector
→ 2 | DCA Relationships & Workflows
```

Use only the canonical Airtable base:

`2 | DCA Relationships & Workflows` (`appMdqKYTMnPmVoVu`)

Do not choose similarly named rebuild, copy, staging, or test bases unless System & Structure explicitly requests a test against one of them.

The newer Shared Identity & Relationships base is a migration candidate, not the current intake destination. Resolve current base identity through `context/airtable-workspace-map.md`; do not dual-write or infer adoption from a successful R01 test.

## Newsletter lists

For names/email lists intended for newsletter subscription, including “subscribe these people in Mailchimp,” read [references/newsletter-intake.md](references/newsletter-intake.md) and apply `workflows/intake-newsletter-contacts.md` from the reviewed repository revision when available.

Capture in DCA records first, reconcile existing identities, and read the saved result back before any Mailchimp action. Preserve source-row provenance, human attribution, consent evidence, audience and per-row execution outcomes separately. Missing consent or external access does not prevent authorized relationship intake. Never infer consent from a list or donation, override an unsubscribe/do-not-contact flag, or claim saved contacts are subscribed.

This is a bounded human-invoked pilot using existing `Contact_Intake` and `Contacts` fields. No new canonical identity model, background sync or schema mutation is introduced. Runtime access, current action authorization and the dataset prerequisite still apply; a plugin update does not establish deployment.

## Review-first intake and more than one purpose

Keep intake general: a newsletter request is one possible consequence of relationship information, not the definition of the person or the only permitted future use of the submission.

When the operator asks for review first, preserve the submission in `Contact_Intake`, search for existing identities, and put the proposed matches, explicitly stated purposes, possible follow-ups and unresolved questions in human-readable `review_notes`. Stop before creating/updating canonical records, assigning roles or taking external actions. Use `clarification_needed` and, only for a real human decision, the existing `Review_Queue`. An intake-only request does not authorize subscription.

For each purpose distinguish source-supported intent from a suggestion, the current decision, and the next action/owner if actually known. Do not require users to choose tables or a final domain model. One reviewed Contact may later support several separately authorized domain relationships or workflows; do not create a second identity or infer donor, volunteer, supplier or partner status from newsletter interest. Preserve all open review items when one consequence is completed. Newsletter processing events must not replace the ordinary review notes.

This review-first option does not add a confirmation loop to an ordinary, explicitly requested, deterministic correction under the existing confirmation boundary.

## User-facing principle

Users should interact with relationship information, not the implementation schema.

Do not require users to know about:

- `Contact_Intake`
- `Contact_Organization_Roles`
- `Review_Queue`
- `Operators`
- matching confidence fields
- reconciliation states
- Airtable field names

Use those internally when needed. Surface uncertainty, confirmation, or review state only when it affects the user's requested result.

Do not ask operational users to understand the model. Translate their ordinary operational question into the required internal workflow.

Good user-facing language:

- `Who is our contact at We Fashion?`
- `That number is old. The new one is ...`
- `I have a new contact at organisation X.`

Do not answer those requests by teaching the user about agents, staging, reconciliation, or schema unless they explicitly ask.

## Canonical and internal objects

Canonical reusable relationship objects:

- `Contacts`
- `Organizations`
- `Contact_Organization_Roles`
- `Partners`, only where partnership evidence exists

Operational actor / provenance object:

- `Operators` — internal DCA people who participate in operational work through the shared system

Internal staging / uncertainty objects:

- `Contact_Intake`
- `Review_Queue`

Historical or retired donor tables are not current relationship authority and must not be used for new records.

## Read flow

When a user asks for relationship information:

1. Identify whether the request concerns a person, organization, or relationship.
2. Search current canonical records before using staging records.
3. Reconcile identity when more than one plausible record exists.
4. Keep person facts, organization facts, and their relationship distinct.
5. Return only supported current information relevant to the request.
6. Respect the current access boundary and do not expose hidden reconciliation internals.

Example:

`Do we have a contact for We Fashion?`

Return the supported contact route and useful relationship context. Do not explain the table structure unless asked.

## Write flow

When a user supplies new or corrected relationship information:

1. Identify the authenticated human DCA actor when the runtime provides one.
2. Resolve that actor to an `Operators` record using stable identity evidence before using a display name.
3. Preserve the submission as source evidence before changing canonical shared information.
4. For ordinary conversational intake, use `Contact_Intake` internally and preserve the original wording in `raw_submission`.
5. Record the human actor in `submitted_by_operator` and the runtime/interface in `submission_interface` when available.
6. Search canonical records before creating anything new.
7. Reconcile identity and organization meaning from evidence.
8. Apply only the consequence supported by the evidence.
9. Link the staging record to the canonical result when reconciliation is complete.
10. If identity or meaning remains unresolved, preserve the staging record and use the smallest bounded clarification or `Review_Queue` state rather than guessing.
11. Tell the user only what was successfully updated, created, retrieved, or left unresolved.

### Operator attribution

The human who supplied or requested the change and the AI/runtime that processed it are different provenance facts.

Never record Claude as the human operator merely because Claude performed the Airtable write.

For Slack:

1. use the authenticated Slack user ID;
2. match it to `Operators.slack_user_id`;
3. if needed, use the verified DCA email as supporting identity evidence;
4. do not resolve an Operator from display name alone when identity is ambiguous.

If an authenticated, authorised DCA user performs a write-intent action and no Operator record exists, create the minimum Operator record needed to preserve attribution using only verified identity facts available from the runtime, such as:

- `operator_name`
- `email`
- `slack_user_id`
- `active`

Do not infer `operator_roles` merely because the person used Claude.

If the human actor cannot be resolved safely, do not invent an Operator identity. Preserve the submission and use the smallest clarification or unresolved state appropriate to the consequence.

For fully automated intake, `submitted_by_operator` may remain blank. Record the automation/interface separately.

## Identity resolution

Search before create.

Strong person/contact evidence, in order of reliability:

1. exact email;
2. exact or normalized phone number;
3. full name plus established organization relationship;
4. name plus other strong contextual evidence.

Name similarity alone is not enough to merge, overwrite, or select between plausible people.

Strong organization evidence may include:

1. exact or normalized organization name;
2. known alias;
3. website or domain;
4. location plus specific organization context.

If more than one plausible identity remains, do not guess.

## Relationship rules

Keep these meanings separate:

- contact identity;
- organization identity;
- Contact–Organization relationship;
- role inside the external organization;
- DCA-facing contact function;
- direct DCA relationship role;
- partner status;
- primary-contact status.

A Contact does not inherit an Organization's direct DCA relationship roles.

If an Organization is a partner or donor, its contact remains an organization representative/contact unless separate evidence establishes that the person independently holds the same DCA relationship role.

Operational context does not establish partner status. A person or organization appearing in Logistics work is not automatically a DCA partner.

Do not infer missing relationship roles, support types, functions, or partner status merely to complete fields.

## Update rules

When one sufficiently supported existing identity is found:

- update only evidence-supported facts;
- do not erase existing values because the new source omits them;
- do not silently overwrite conflicting information;
- preserve provenance for the new information;
- keep conflicts unresolved when one source does not clearly supersede another.

When no existing identity is sufficiently supported and a new identity is clear enough:

- create only the minimum canonical records required by the evidenced reality;
- create the Contact–Organization relationship only when that relationship is supported;
- do not create a Partner record without partnership evidence.

## Confirmation boundary

Do not add unnecessary confirmation loops.

A user's explicit request to add or update a deterministic, non-destructive fact is authorization for that requested change once identity is sufficiently resolved.

Ask for confirmation or clarification when the action would:

- choose between multiple plausible identities;
- merge or delete records;
- overwrite conflicting identity information;
- create or change direct DCA relationship roles where the evidence is not already explicit;
- create or change partner status;
- widen access to restricted personal contact information;
- make another consequential interpretation not contained in the user's request or evidence.

If safe execution is impossible, preserve the source evidence and stop at the unresolved state.

## Airtable implementation map

### Operators

Use for authenticated internal DCA actors participating in shared operational workflows. Relevant fields include:

- `operator_name`
- `operator_id`
- `email`
- `phone`
- `operator_roles`
- `active`
- `slack_user_id`

`slack_user_id` is the preferred Slack identity binding because it is stable and does not depend on a display name.

### Contacts

Use for canonical people and contact routes. Relevant fields include:

- `contact_name`
- `full_name`
- `contact_type`
- `phone`
- `email`
- `organization`
- `preferred_contact_method`
- `relationship_roles`
- `support_types_offered`
- `source_systems`
- `source_references`
- `source_confidence`
- `validation_status`
- `review_status`
- `do_not_contact`

### Organizations

Use for canonical organizations. Relevant fields include:

- `organization_name`
- `aliases`
- `organization_category`
- `organization_type`
- `general_email`
- `main_phone`
- `website`
- `address`
- `city`
- `country`
- `relationship_roles`
- `support_types_offered`
- `source_systems`
- `source_references`
- `source_confidence`
- `validation_status`
- `review_status`
- `do_not_contact`

### Contact_Organization_Roles

Use for the relationship between a Contact and Organization. Relevant fields include:

- `contact`
- `organization`
- `role_inside_organization`
- `contact_route_type`
- `dca_contact_function`
- `is_primary_contact`
- `source_role_text`
- `source_systems`
- `source_references`
- `validation_status`
- `notes`

### Partners

Use only where direct DCA partnership evidence exists. Do not create or infer a Partner record from ordinary contact or logistics context.

### Contact_Intake

Use internally for conversational staging and source preservation. Relevant fields include:

- `contact_name`
- `existing_organization`
- `new_or_unknown_organization_name`
- `organization_context`
- `phone`
- `email`
- `relationship_state`
- `proposed_relationship_roles`
- `support_types`
- `reason_for_adding`
- `relationship_context`
- `source_type`
- `source_systems`
- `submitted_by_operator`
- `submission_interface`
- `submitted_by` — legacy/free-text attribution only; do not use as authoritative human attribution for new Claude conversational intake
- `submitted_at`
- `clarification_needed`
- `review_notes`
- `canonical_contact`
- `canonical_organization`
- `raw_submission`

Preserve `raw_submission` verbatim. Do not rewrite it into normalized prose.

For Claude conversational intake:

- `submitted_by_operator` = the authenticated human DCA operator when resolved;
- `submission_interface` = `claude_slack` or `claude_chat` as applicable;
- `raw_submission` = the human's original submission;
- Claude itself is not the operator.

### Review_Queue

Use only when a real unresolved decision needs human input. Keep the review question concise and actionable.

## Slack / conversation behaviour

When this skill is invoked from Slack or another shared conversational surface:

- answer the operational question directly;
- prefer short natural-language results;
- do not narrate internal reconciliation steps unless they materially affect the answer;
- do not expose raw source submissions, review notes, confidence mechanics, Operator internals, or hidden fields;
- do not repeat personal contact details more broadly than the operational request requires;
- keep uncertainty explicit when it affects the result;
- translate internal structural distinctions into ordinary operational language.

Examples of good user-facing completion messages:

- `Yes — our contact at We Fashion is Pieter [surname]. I have the current phone number as …`
- `Updated Pieter's phone number for We Fashion.`
- `I found two plausible Pieter records, so I kept the new number in review rather than attaching it to the wrong person. Which Pieter do you mean?`

## Failure behaviour

If identity, relationship meaning, operator attribution, permissions, or write consequence cannot be resolved safely:

- do not guess;
- do not perform the unsafe canonical write;
- preserve the evidence internally;
- return the smallest useful unresolved state or clarification question.
