# Lesson 3 Sources

These references support the agentic workflow, subagent, hook, permission, and loop-coding terminology used in Lesson 3.

Accessed: 2026-07-09

## OpenAI

- Codex subagents: https://developers.openai.com/codex/subagents
- Codex subagent concepts: https://developers.openai.com/codex/concepts/subagents
- Codex agent approvals and security: https://developers.openai.com/codex/agent-approvals-security
- Codex sandboxing: https://developers.openai.com/codex/concepts/sandboxing
- Agents SDK overview: https://developers.openai.com/api/docs/guides/agents
- Agents SDK orchestration: https://developers.openai.com/api/docs/guides/agents/orchestration
- Agents SDK guardrails and approvals: https://developers.openai.com/api/docs/guides/agents/guardrails-approvals
- Agents SDK tools: https://developers.openai.com/api/docs/guides/tools
- Function calling: https://developers.openai.com/api/docs/guides/function-calling
- Safety in building agents: https://developers.openai.com/api/docs/guides/agent-builder-safety
- Conversation state: https://developers.openai.com/api/docs/guides/conversation-state
- Tracing and grading: https://developers.openai.com/api/docs/guides/trace-grading
- Evals: https://developers.openai.com/api/docs/guides/evals

## Anthropic

- Claude Code subagents: https://docs.anthropic.com/en/docs/claude-code/sub-agents
- Claude Code hooks: https://docs.anthropic.com/en/docs/claude-code/hooks
- Claude Code settings and permissions: https://docs.anthropic.com/en/docs/claude-code/settings
- Claude Code common workflows: https://code.claude.com/docs/en/common-workflows
- Tool use overview: https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview
- How tool use works: https://platform.claude.com/docs/en/agents-and-tools/tool-use/how-tool-use-works

## Model Context Protocol

- MCP specification: https://modelcontextprotocol.io/specification/2025-11-25
- MCP tools: https://modelcontextprotocol.io/specification/2025-11-25/server/tools
- MCP lifecycle: https://modelcontextprotocol.io/specification/2025-11-25/basic/lifecycle
- MCP authorization: https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization

## Fact Boundaries Used In The Deck

- Subagents are useful for context isolation, specialization, and parallel review, but they add coordination and integration cost.
- A subagent should be treated as a bounded worker with its own context, not as unrestricted autonomy.
- Tool execution still happens outside the model, through a harness, host runtime, MCP server, or provider-hosted tool.
- Hooks and gates are deterministic workflow control points around model work.
- Loop coding depends on real feedback: commands, test logs, errors, diffs, and review evidence written back into context.
