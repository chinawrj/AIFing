# Chapter 1.1 Advanced Sources

Accessed: 2026-07-09

## Official Documentation

- OpenAI Prompt Caching: https://developers.openai.com/api/docs/guides/prompt-caching
- OpenAI Conversation State: https://developers.openai.com/api/docs/guides/conversation-state
- Anthropic Prompt Caching: https://platform.claude.com/docs/en/build-with-claude/prompt-caching
- Anthropic Messages API: https://platform.claude.com/docs/en/build-with-claude/working-with-messages
- Anthropic Context Windows: https://platform.claude.com/docs/en/build-with-claude/context-windows

## Facts Used In The Deck

- OpenAI prompt caching is automatic for eligible prompts and exposes cache hits through `usage.prompt_tokens_details.cached_tokens`.
- OpenAI recommends placing static or repeated prompt content before dynamic user-specific content.
- Anthropic prompt caching exposes `cache_creation_input_tokens`, `cache_read_input_tokens`, and `input_tokens`.
- Anthropic Messages API is stateless, so applications send the full conversational history for multi-turn conversations.
- Anthropic states that cached prompt prefixes still occupy the context window; caching changes token cost/processing, not whether the tokens count as context.

