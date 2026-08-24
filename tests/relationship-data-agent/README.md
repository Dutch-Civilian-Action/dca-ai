# Relationship Data Agent Tests

This directory contains provider-independent and provider-specific validation cases for the DCA Relationship Data Agent.

## Current test target

Initial testing is performed in Airtable Omni against:

`2 | DCA Relationships & Workflows`

The purpose of these tests is to validate reconciliation behaviour before adding another interface such as Slack.

## Test responsibilities

Tests should verify that the agent can correctly:

- retrieve existing relationship data;
- match an existing Contact by strong identity evidence;
- match an existing Organization without creating spelling or abbreviation duplicates;
- create a new Contact only when identity is sufficiently clear;
- create a new Organization only when identity is sufficiently clear;
- connect a Contact to an Organization through the existing relationship structure;
- preserve `raw_submission` and intake provenance;
- avoid assigning Organization relationship roles to Contacts;
- avoid inferring partner status merely from Logistics context;
- stop and request clarification when more than one plausible identity exists;
- preserve conflicting information without silent overwrite;
- require confirmation before canonical writes during the initial Omni testing phase;
- respect restricted contact-data visibility.

## Ownership boundary

Concrete reconciliation cases and live Omni test execution may evolve independently of the canonical agent definition.

Test results must not redefine DCA relationship structure. If testing exposes a structural ambiguity, it should be resolved in the appropriate canonical DCA architecture or operational source before the agent definition is changed.

Slack integration remains out of scope until the core reconciliation behaviour is validated.
