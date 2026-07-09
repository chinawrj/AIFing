# Lesson 2 Advanced Add-on (2.1): Harness Objects and Runtime Contracts

## Audience

Advanced learners who already understand the Lesson 1 Paper Model and the
Lesson 2 basics of harness, tools, skills, agents, and runtime control.

## Goal

Learners should understand that harness engineering is not about writing a
longer prompt. It is about managing runtime objects with explicit contracts:
instructions, tools, skills, agent profiles, permissions, observations, and
evaluation signals.

## Boundary

This chapter stays inside a single harness or single agent runtime.

It covers:

- Runtime objects that the harness can declare, select, render, validate, and observe.
- Tool contracts: name, schema, permissions, executor, result shape, and failure handling.
- The difference between skill, tool, agent profile, permission, and observation.
- Why clear object boundaries keep the paper clean and the system auditable.

It intentionally does not cover:

- Subagents with independent papers.
- Multi-step workflow orchestration.
- Loop coding and iterative repair cycles.
- Multi-agent collaboration and task handoff.
- Provider-specific tracing fields, cache TTLs, or product configuration details.

## Slide Plan

| Slide | Title | Job |
|---|---|---|
| 1 | 2.1 Advanced: Harness Objects and Runtime Contracts | Frame the topic as a shift from prompt text to managed runtime objects |
| 2 | The Paper Is Built From Runtime Objects | Show that the visible paper comes from many selected objects, not one prompt |
| 3 | Object Lifecycle: Declare, Select, Render, Validate | Explain the lifecycle of a harness object before it reaches the paper |
| 4 | A Tool Is an Executable Contract | Define the tool contract and separate model proposal from harness execution |
| 5 | Skill, Tool, Agent Profile: Different Objects | Clarify object boundaries and avoid overloaded vocabulary |
| 6 | Object Boundaries Keep the Paper Clean | Close with maintainability, auditability, and Lesson 3 boundary |

## Core Phrases

- "Prompt controls text. Harness objects control what enters the paper."
- "A tool is not just a capability; it is an executable contract."
- "Skills guide work, tools perform actions, and agent profiles define a working environment."
- "Clear object boundaries make the harness debuggable, auditable, and safer."
