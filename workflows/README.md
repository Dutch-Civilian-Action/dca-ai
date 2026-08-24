# Workflows

Provider-independent multi-step AI-supported DCA organisational workflows.

A workflow defines DCA behaviour, evidence boundaries, validation logic, outputs, and failure expectations independently of the AI runtime used to execute it.

Current workflows:

- `maintain-dca-reality.md` — maintain Operational Reality and System & Structure Capability Reality from materially changed evidence.

Provider-specific scheduled tasks, prompts, tool bindings, or runtime configuration belong under `providers/` and must not redefine the workflow itself.
