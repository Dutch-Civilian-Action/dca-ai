# ChatGPT

ChatGPT is currently used by DCA System & Structure as a development and live-testing environment for AI-supported architecture work, reconstruction, reconciliation, workflow design, testing, capability monitoring, and related System & Structure work.

This directory contains ChatGPT-specific implementation notes only. Canonical DCA organisational meaning, methods, workflows, and tests remain provider-independent.

## Current model guidance

- [ChatGPT Model Usage](model-selection.md) — proposed model and effort recommendations, escalation guidance and evaluation boundaries; does not change configured runtime defaults.

## Current implementation records

- `dca-reality-watch.md` — ChatGPT implementation of maintained-reality processing, including the scheduled evidence/recovery sweep and its validation-triggered entry path.
- `dca-validation-queue-monitor.md` — hourly condition-watch implementation that observes live validation-state transitions and hands newly sufficiently established candidates into canonical maintained-reality reconciliation.

- `meeting-actions-to-asana.md` — dedicated meeting-workflow runner for authorised notes review, item confirmation and Asana capture; the validation monitor separately checks test validation.

## Current role

ChatGPT may currently be used to:

- build and correct architecture;
- reconstruct and reconcile DCA reality;
- design and execute workflow tests;
- run early operational versions of validated workflows;
- compare evidence and prepare validation;
- monitor validation state and invoke maintained-reality handoffs;
- monitor System & Structure Capability Reality;
- help refine provider-independent DCA AI specifications.

Use of ChatGPT does not make ChatGPT part of DCA organisational architecture.

## Runtime openness

A workflow may remain on ChatGPT, move to Claude, or move to another suitable runtime later.

Runtime selection is an implementation decision based on source access, reliability, testing, maintainability, cost, governance, and operational fit.

DCA should not require a provider migration merely to create provider separation.

## Required authority inputs

Any ChatGPT implementation must apply:

- `../../governance/authority-rules.md`;
- `../../context/current-authority.md`;
- the relevant provider-independent workflow or skill;
- current canonical DCA architecture referenced by those files.

Provider-specific prompts, trigger mechanics, scheduled-task definitions, polling cadences, and tool bindings may adapt execution syntax, but they must not redefine DCA organisational authority or workflow meaning.
