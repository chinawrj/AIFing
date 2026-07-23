# Lesson 3 Sources

These references support the subagent, agent team, dynamic workflow, structured output, verification, and Goodhart's Law concepts used in Lesson 3.

Accessed: 2026-07-23

## Anthropic / Claude Code

- Claude Code subagents: https://code.claude.com/docs/en/sub-agents
- Claude Code agent teams: https://code.claude.com/docs/en/agent-teams
- Claude Code dynamic workflows: https://code.claude.com/docs/en/workflows
- Claude Code Agent SDK structured outputs: https://code.claude.com/docs/en/agent-sdk/structured-outputs
- Claude Code Agent SDK TypeScript Workflow tool: https://code.claude.com/docs/en/agent-sdk/typescript#workflow
- Official `harden-scan` workflow example: https://github.com/anthropics/claude-plugins-official/blob/main/plugins/code-modernization/workflows/harden-scan.js

## Goodhart's Law

- David Manheim and Scott Garrabrant, "Categorizing Variants of Goodhart's Law": https://arxiv.org/abs/1803.04585

## Fact Boundaries Used In The Deck

- Subagents are specialized workers with their own context window and can preserve the main context by returning summaries or artifacts instead of raw exploration output.
- Ordinary subagents report results back to the caller. Agent teams are a separate Claude Code feature where independent teammate sessions can share tasks and communicate directly; the feature is experimental and disabled by default.
- Dynamic workflows move orchestration into JavaScript. The workflow script holds loop state, branching, and intermediate results; the main conversation receives the consolidated output.
- Claude Code workflow scripts can use `meta`, `agent()`, `parallel()`, `pipeline()`, `phase()`, `log()`, global `args`, and the `Workflow` tool's `script`, `name`, `scriptPath`, `args`, and `resumeFromRunId` fields.
- `schema` or structured output validation is a format gate. It can require fields, types, and enums, but it does not prove the result is semantically correct.
- A verifier agent is a semantic gate. It should independently read evidence, run checks, and return an explicit verdict.
- A verifier that cannot complete verification should produce or be treated as `unverified`; it should not silently become `pass`.
- Goodhart's Law is used here as a proxy-target failure pattern: pressure to optimize a measure or rubric can make the measure less reliable as evidence of the real goal.
- Workflow mitigates custom-agent Goodhart risk by preserving the real goal, using multiple signals, separating worker and judge, and scripting retry/stop rules.
