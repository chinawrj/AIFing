# Lesson 2 Sources

These references support the Harness / Runtime and tool-use terminology used in Lesson 2.

Accessed: 2026-07-15

## OpenAI

- Codex subagents: https://developers.openai.com/codex/subagents
- Codex subagent concepts: https://developers.openai.com/codex/concepts/subagents
- Codex CLI slash commands (`/compact`, `/fork`): https://developers.openai.com/codex/cli/slash-commands
- Codex sandboxing: https://developers.openai.com/codex/concepts/sandboxing
- Agents SDK orchestration: https://developers.openai.com/api/docs/guides/agents/orchestration
- Function calling: https://developers.openai.com/api/docs/guides/function-calling
- Using tools: https://developers.openai.com/api/docs/guides/tools
- Structured Outputs: https://developers.openai.com/api/docs/guides/structured-outputs
- Conversation state: https://developers.openai.com/api/docs/guides/conversation-state
- Safety in building agents: https://developers.openai.com/api/docs/guides/agent-builder-safety
- Tool Search: https://developers.openai.com/api/docs/guides/tools-tool-search

## Anthropic

- Claude Code subagents: https://docs.anthropic.com/en/docs/claude-code/sub-agents
- Claude Code hooks: https://docs.anthropic.com/en/docs/claude-code/hooks
- Tool use overview: https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview
- How tool use works: https://platform.claude.com/docs/en/agents-and-tools/tool-use/how-tool-use-works
- Define tools: https://platform.claude.com/docs/en/agents-and-tools/tool-use/define-tools
- Context windows: https://platform.claude.com/docs/en/build-with-claude/context-windows

## Model Context Protocol

- MCP specification: https://modelcontextprotocol.io/specification/2025-11-25
- MCP tools: https://modelcontextprotocol.io/specification/2025-11-25/server/tools
- MCP prompts: https://modelcontextprotocol.io/specification/2025-11-25/server/prompts
- MCP resources: https://modelcontextprotocol.io/specification/2025-11-25/server/resources
- MCP lifecycle: https://modelcontextprotocol.io/specification/2025-11-25/basic/lifecycle
- MCP authorization: https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization

## Fact Boundaries Used In The Deck

- The model generates text or structured tool-call requests; external execution is performed outside the model by a client harness, host runtime, MCP server, or provider-hosted tool.
- Tool schemas constrain request shape, but they are not a complete safety boundary.
- Tool definitions and related instructions consume context and input tokens.
- Skills and prompt-like instructions reduce upfront context pressure only when they are selected or loaded on demand; once loaded, they still consume context.
- Subagents can reduce main-thread context pollution by using a separate context for bounded local work, but they do not enlarge a single model call's context window.
- A custom agent/profile is reusable configuration; a subagent is a delegated run or worker using its own context and return boundary.
- In runtimes that support context forking, a subagent can inherit the parent thread's starting history. Its context then evolves independently, so initial context overlap is not the same as continuous shared-state synchronization.
- Compaction and forking solve different problems: compaction reactively summarizes one evolving thread (automatically or on request); forking proactively preserves a shared starting point across separate branches that later need explicit merge or handoff boundaries.
- Conversation state is runtime-managed state, not hidden model memory.
- Retrieved content, files, webpages, and tool results are context data; they should not override higher-priority instructions.
