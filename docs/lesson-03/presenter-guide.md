# Lesson 3 Presenter Guide

Lesson 3 is an 11-slide training deck. It builds on Lesson 1's Paper Model and Lesson 2's custom prompt / subagent / skill framing.

## Audience

Engineering-oriented learners who already understand that the model reads visible context and that the harness/runtime manages instructions, tools, permissions, execution, and observations.

## Narrative Arc

By the end, learners should understand that systematic subagent orchestration is mainly a question of **who holds the plan**. For small or novel work, the main AI can form an ad hoc team. For repeated work, prepared custom agent files make worker roles stable. For large, repeatable, or quality-sensitive work, a workflow script should own the loop, branching, verification, and stopping rules.

## Slide Flow

| Slide | Section | Narrative job | Presenter bridge |
|---|---|---|---|
| 1 | Overview | Introduce the three orchestration levels. | "Once a task needs multiple papers, the key question is who decides how those papers are assigned and merged." |
| 2 | Why Orchestration | Explain context noise, compaction risk, and merge confusion. | "Complexity is not just more work; it is unmanaged intermediate state." |
| 3 | Way 1 | Show AI-led temporary team formation. | "This is the default, flexible mode: ask the AI to split the work and run subagents." |
| 4 | Ad Hoc Team Gates | Add the quality discipline needed for AI-invented teams. | "Fast teams still need a bounded brief, evidence, a return format, and a merge gate." |
| 5 | Way 2 | Define prepared custom agent files. | "When the same worker profile is useful repeatedly, write it down as an agent file." |
| 6 | Teammate-Style Collaboration | Separate ordinary subagents from teammate-style communication. | "Some harnesses let peer sessions share tasks and messages, but that increases coordination cost." |
| 7 | Way 3 | Show workflow script orchestration using JavaScript syntax anchors. | "A workflow moves the plan into code; intermediate state lives in variables instead of the main chat context." |
| 8 | Workflow Gates | Distinguish schema validation from independent verification. | "A clean JSON verdict only proves shape. The verifier must still check evidence independently." |
| 9 | Compaction Strategy | Compare reactive compaction with proactive subagent split. | "Compaction is passive compression; planned subagents are active decomposition." |
| 10 | Goodhart's Law | Explain proxy targets and unintended optimization. | "The checklist can become the target, and then the real goal gets lost." |
| 11 | Workflow Quality Control | Show workflow as mitigation for Goodhart side effects. | "Use multiple signals, separate worker and judge, and script stopping rules around the real outcome." |

## Review Notes

- Keep the throughline centered on the Paper Model: each subagent has a local paper, and the main paper should receive bounded evidence rather than raw noise.
- Way 1 should be presented as the broadest pattern: any subagent-capable tool can let the AI decide a temporary split, but quality depends on the brief and merge gate.
- Way 2 is about reuse and stability: custom agent files package a worker profile. They do not automatically solve merge quality.
- Teammate-style communication is a harness feature, not a universal subagent property. Ordinary subagents report back to the caller; agent teams can use shared tasks and direct messages where supported.
- Way 3 is the most systematic mode. In Claude Code dynamic workflows, the script can use `meta`, `agent()`, `parallel()`, `pipeline()`, `schema`, script variables, and branching.
- A `schema` is a format gate. It checks fields and types. It is not proof that the answer is true.
- A verifier is a semantic gate. It should independently read files, run tests, and check evidence rather than trusting the worker's self-report.
- Treat `unverified` as its own state. It should not silently count as `pass` or as a definitive `fail`.
- Explain Goodhart's Law as proxy-target failure: if the custom agent file over-emphasizes a rubric, the agent may optimize the rubric rather than the real outcome.
- Workflow mitigates Goodhart risk by keeping the real goal visible, using multiple signals, separating worker and judge, and making stop/retry rules explicit.

## Optional Discussion Prompts

1. Which tasks in your work are fine for an AI-led temporary subagent team?
2. Which repeated tasks deserve a prepared custom agent file?
3. Which tasks are big or risky enough that the orchestration itself should be scripted?
4. What proxy metric could accidentally become the target in your AI workflow?
5. What should count as `unverified` rather than `pass` in your team's review process?
