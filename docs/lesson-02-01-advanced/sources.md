# Lesson 2 Advanced Add-on (2.1) Sources: Harness / Runtime

Accessed: 2026-07-09

## Official Documentation

- OpenAI Using Tools: https://developers.openai.com/api/docs/guides/tools
- OpenAI Function Calling: https://developers.openai.com/api/docs/guides/function-calling
- OpenAI Structured Outputs: https://developers.openai.com/api/docs/guides/structured-outputs
- OpenAI Conversation State: https://developers.openai.com/api/docs/guides/conversation-state
- OpenAI Safety In Building Agents: https://developers.openai.com/api/docs/guides/agent-builder-safety
- OpenAI Trace Grading: https://developers.openai.com/api/docs/guides/trace-grading
- OpenAI Working With Evals: https://developers.openai.com/api/docs/guides/evals
- Anthropic Tool Use: https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview
- Anthropic How Tool Use Works: https://platform.claude.com/docs/en/agents-and-tools/tool-use/how-tool-use-works
- Model Context Protocol Specification: https://modelcontextprotocol.io/specification/2025-06-18
- Model Context Protocol Tools: https://modelcontextprotocol.io/specification/2025-06-18/server/tools
- Model Context Protocol Prompts: https://modelcontextprotocol.io/specification/2025-06-18/server/prompts
- Model Context Protocol Resources: https://modelcontextprotocol.io/specification/2025-06-18/server/resources

## Facts Used In The Deck

- Real applications need a harness to construct input, inject instructions, expose tools, parse tool calls, execute external actions, write tool results back, and handle permissions, errors, and logs.
- Tool/function definitions commonly include a name, description, and parameter schema that guide structured model tool requests.
- Tool calling is a multi-step flow: the model receives available tools, emits a structured tool request, application or harness code executes it, tool output is returned, and the model continues or answers.
- Structured Outputs and strict schema modes help constrain output shape, but schema conformance is not the same as business permission, safety, or execution approval.
- Tool outputs, webpages, files, and retrieved content should be treated as context data. They can inform the answer, but should not override higher-priority instructions.
- Tool definitions and schemas are part of model input and can consume context budget, so large or excessive tool catalogs can hurt cost, context, and tool selection quality.
- Tool strategy can be controlled by runtime policy, such as allowing no tool, automatic selection, mandatory tool use, a specific tool, or a restricted subset.
- A model may return zero, one, or multiple tool calls; harness logic should not assume exactly one call.
- Prompt injection is untrusted text or data attempting to override instructions. It can enter through files, webpages, retrieved content, or tool results.
- High-risk operations need harness-level controls such as allowlists, sandboxing, human approval, policy checks, and audit logs.
- Observability should include model calls, tool calls, decisions, failures, latency, token usage, permission denials, traces, and eval cases.
- MCP defines standard concepts such as tools, prompts, resources, lifecycle management, authorization, logging, and capability negotiation for connecting LLM applications to external context and capabilities.

## High-Risk Simplifications To Avoid

- Do not say the model executes a tool. The model proposes a structured request; the harness or client executes.
- Do not say a schema is enough for safety. Schema validation is only one layer; permissions and policy checks are separate.
- Do not say JSON mode is the same as schema reliability. Valid JSON can still be semantically wrong or fail business validation.
- Do not merge skills, tools, and agent profiles into one concept.
- Do not treat tool output as trusted instruction text.
- Do not say prompt cache or state pointers are hidden model memory.
- Do not assume more tools always improves capability. Tool definitions consume context and can increase mis-selection risk.
- Do not only protect write actions. Sensitive reads can also leak data.
- Do not turn this chapter into subagent or workflow orchestration. That belongs in Lesson 3.
