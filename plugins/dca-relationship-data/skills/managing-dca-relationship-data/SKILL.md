---
name: managing-dca-relationship-data
description: Retrieve and maintain DCA contact, organization, and relationship data in the canonical Airtable base. Use for contact lookup, additions, corrections, or reconciliation.
metadata:
  version: 0.2.1
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

`2 | DCA Relationships & Workflows`

Do not choose similarly named rebuild, copy, staging, or test bases unless System & Structure explicitly requests a test against one of them.

## Direct retrieval routing

For ordinary read requests about contacts, organisations, partners, or relationship context, use the canonical Airtable base as the first and normally sufficient source.

Do not begin by checking Claude shared memory, Slack history, Drive, GitHub, or other sources. Consult another source only when:

- the canonical relationship data does not contain enough information to answer;
- conflicting evidence genuinely requires reconciliation;
- the user explicitly asks for provenance, verification, history, or a cross-source check.

For a question that combines contact information with partner or logistics context, retrieve the supported contact and partner/goods context from the canonical base in the same operational read path where available.

Do not narrate this routing to the user. The user-facing result should be the supported operational information, not a description of memory checks, agents, skills, Airtable, tools, searches, schemas, todos, or internal confirmation steps.

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

Do not answer those requests by teaching the user about agents, staging, reconciliation, schema, tools, memory, or routing unless they explicitly ask.

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

1. Identify whether the request concerns a person, organization, partner, or relationship.
2. Query current canonical relationship records directly.
3. Reconcile identity when more than one plausible record exists.
4. Keep person facts, organization facts, partner facts, and their relationships distinct.
5. Return only supported current information relevant to the request.
6. Respect the current access boundary and do not expose hidden reconciliation or execution internals.
7. If the canonical base is insufficient, say only what is missing or uncertain unless a broader source check is actually needed.

Example:

`Do we have a contact for We Fashion?`

Return the supported contact route and useful relationship context. Do not explain the table structure or execution path unless asked.

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
- for ordinary reads, go to the canonical relationship base first rather than checking shared memory;
- prefer short natural-language results;
- do not narrate source selection, tool use, searches, routing, agents, skills, schemas, todos, or internal reconciliation steps unless they materially affect the answer;
- do not expose raw source submissions, review notes, confidence mechanics, Operator internals, or hidden fields;
- do not repeat personal contact details more broadly than the operational request requires;
- keep uncertainty explicit when it affects the result;
- translate internal structural distinctions into ordinary operational language.

Examples of good user-facing completion messages:

- `Yes — our contact at We Fashion is Pieter [surname]. I have the current phone number as …`
- `Help4Ukraine is an active logistics partner. Our recorded contacts are Paul, Natalia Leshan, Johan, and Leo Shmaryan. They are recorded as providing animal supplies, baby products, hygiene products, and food.`
- `Updated Pieter's phone number for We Fashion.`
- `I found two plausible Pieter records, so I kept the new number in review rather than attaching it to the wrong person. Which Pieter do you mean?`

## Failure behaviour

If identity, relationship meaning, operator attribution, permissions, or write consequence cannot be resolved safely:

- do not guess;
- do not perform the unsafe canonical write;
- preserve the evidence internally;
- return the smallest useful unresolved state or clarification question;
- do not replace a simple missing-data answer with an explanation of internal systems or execution paths.
