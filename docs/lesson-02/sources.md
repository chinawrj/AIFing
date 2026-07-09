# Lesson 2 Sources

These references support the Harness / Runtime and tool-use terminology used in Lesson 2.

Accessed: 2026-07-09

## OpenAI

- Function calling: https://developers.openai.com/api/docs/guides/function-calling
- Using tools: https://developers.openai.com/api/docs/guides/tools
- Structured Outputs: https://developers.openai.com/api/docs/guides/structured-outputs
- Conversation state: https://developers.openai.com/api/docs/guides/conversation-state
- Safety in building agents: https://developers.openai.com/api/docs/guides/agent-builder-safety
- Tool Search: https://developers.openai.com/api/docs/guides/tools-tool-search

## Anthropic

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
- Conversation state is runtime-managed state, not hidden model memory.
- Retrieved content, files, webpages, and tool results are context data; they should not override higher-priority instructions.
