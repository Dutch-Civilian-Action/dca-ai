# Skills

Bounded, repeatable DCA capabilities that AI can perform.

A skill should define a clear trigger or input, rules, procedure, expected output, and boundaries. Organisational knowledge itself is not a skill; skills apply canonical DCA knowledge and rules to a task.

## Current skills

Current provider-independent skills:

- `dca-document-authoring/` — constructs professional native DCA documents and collaborative text canvases while preserving semantic hierarchy, source authority, standalone-reader context, source-guide usability, visual treatment boundaries, and document QA.
- `dca-output-routing/` — selects the correct output family, native destination—including established collaborative text canvases—construction capability, and useful derivatives before artifact creation begins.

Current skills belong directly under `/skills/` and should remain provider-independent wherever practical.

Provider-specific packaging or configuration belongs under the relevant `/providers/<runtime>/` area and must not redefine the skill itself.

## Legacy

`legacy/` contains historical skills preserved for reference only.

Legacy skills are not active DCA AI capabilities and must not be loaded by Claude, ChatGPT, Airtable Omni, or another runtime as current skills unless they are explicitly re-audited and replaced under current DCA authority.
