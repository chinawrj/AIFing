# Lesson 2 Sources

These references support the custom prompt, custom agent, subagent, skill, and compaction terminology used in Lesson 2.

Accessed: 2026-07-16

## OpenAI / Codex

- Codex manual, Subagents: https://learn.chatgpt.com/docs/agent-configuration/subagents
- Codex manual, Skills & Plugins: https://learn.chatgpt.com/docs/skills-and-plugins
- Codex manual, Build skills: https://learn.chatgpt.com/docs/build-skills
- Codex CLI slash commands (`/compact`, `/fork`): https://developers.openai.com/codex/cli/slash-commands
- Codex configuration reference for context and compaction settings: https://learn.chatgpt.com/docs/config-file/config-reference

## Anthropic

- Claude Code subagents: https://docs.anthropic.com/en/docs/claude-code/sub-agents
- Claude Code skills: https://docs.anthropic.com/en/docs/claude-code/skills
- Claude Code hooks: https://docs.anthropic.com/en/docs/claude-code/hooks
- Context windows: https://platform.claude.com/docs/en/build-with-claude/context-windows

## Fact Boundaries Used In The Deck

- A custom prompt is reusable instruction text; a custom agent is the engineering packaging of stable role instructions plus runtime profile and supported settings.
- A subagent is a delegated run with its own context/paper and a return boundary such as a summary, finding list, artifact, or patch.
- Subagents can reduce main-thread context pollution by moving noisy local work into separate agent threads, but they do not enlarge a single model call's context window.
- Subagent workflows consume more total tokens because each subagent performs its own model and tool work.
- In runtimes that support context forking, a subagent can inherit the parent thread's starting history; after the fork, the child context evolves independently.
- Compaction summarizes a long visible conversation to free tokens. It preserves continuity but may compress away exact wording or edge detail.
- Proactive subagent decomposition is usually more controllable than waiting for compaction when the work can be split into parallel, low-coupling, mergeable branches.
- A skill packages reusable workflow instructions and supporting resources for a specific task. Codex-style skills use progressive disclosure: the skill's name and description help selection, while full instructions are loaded when the skill is used.
- A loaded skill still consumes context. The benefit is keeping irrelevant prompt packs out of the paper until they are needed.
- Skills can organize prompts with scripts, examples, templates, references, schemas, or tool guidance, but execution still depends on the current runtime, permissions, sandbox, MCP/app connectors, and approval mode.
