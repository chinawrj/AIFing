# Lesson 3 Presenter Guide

Lesson 3 is ready to run as a 10-slide training deck. It builds on Lesson 1's Paper Model and Lesson 2's custom prompt scaling strategy.

## Audience

Engineering-oriented learners who understand that the model reads visible context and that the harness/runtime manages instructions, tools, permissions, and execution.

## Narrative Arc

By the end, learners should understand that complex AI engineering work should not be handled by one long prompt on one overloaded paper. It should be split into clearer local contexts, specialized subagents, stable workflow steps, deterministic gates, human boundaries, and feedback loops.

## Slide Flow

| Slide | Section | Narrative job | Presenter bridge |
|---|---|---|---|
| 1 | Lesson 3 Overview | Move from model and harness to multi-paper work. | "Once the task is larger than one clean paper, we need isolation, roles, steps, and feedback loops." |
| 2 | 3.1 Limits of a Single Agent | Show why one paper becomes polluted in complex work. | "The failure mode is often not model intelligence; it is noisy context and mixed responsibilities." |
| 3 | 3.2 Subagent | Define subagent as local task plus independent paper. | "A subagent is useful because its messy work does not have to live on the main paper." |
| 4 | 3.3 When to Use Subagents | Give the delegation decision rule. | "Delegation has a cost. Use it only when isolation, specialization, or parallelism pays for that cost." |
| 5 | 3.4 Workflow | Define workflow as stable paper handoff between steps. | "A workflow is not asking AI to keep going; it is a process with artifacts and gates." |
| 6 | 3.5 / 3.10 Gates and Hooks | Explain workflow contracts and deterministic control points. | "Prompts request behavior, but hooks and gates make the surrounding system enforce it." |
| 7 | 3.6 Teammate Mode | Contrast Q&A with goal-oriented collaboration. | "A teammate keeps track of goals, plan, evidence, progress, and next steps." |
| 8 | 3.7 Collaboration Boundaries | Make autonomy bounded and auditable. | "Better AI collaboration is not unlimited autonomy; it is explicit permission design." |
| 9 | 3.8 / 3.9 Loop Coding | Explain coding as evidence-driven iteration. | "Do not let AI guess. Run, observe, write logs back, then repair based on real feedback." |
| 10 | 3.11 / 3.12 End-to-End Example | Synthesize main agent, subagents, workflow, tools, gates, and report. | "Now all pieces fit together: the system is designed, bounded, measured, and verified." |

## Review Notes

- Keep Lesson 3 focused on multi-paper collaboration and feedback loops. Do not re-teach tool schemas or single-harness object contracts from Lesson 2 / 2.1.
- A subagent should be described as a bounded worker with independent context, not as fully autonomous software.
- The model still does not execute external systems directly. The harness, host runtime, MCP server, or provider-hosted tool performs execution and writes observations back.
- Workflow gates should include both automated checks and human confirmation for risky side effects.
- Loop coding should be explained as write-run-observe-repair, not one-shot code generation.
- Hooks are deterministic control points around model work; they should not be presented as model reasoning.

## Optional Discussion Prompts

1. What part of your current AI coding workflow creates the most context pollution?
2. Which tasks in your team would benefit from read-only research or review subagents?
3. What actions should require human approval before an AI teammate performs them?
4. What tests, logs, or build steps should be written back into context during loop coding?
