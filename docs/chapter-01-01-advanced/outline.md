# Chapter 1.1 Advanced: Visible Paper and Prompt Cache

## Audience

Advanced learners who already understand the Lesson 1 Paper Model and want a deployment-grade mental model for repeated model calls, prompt/input caching, and cache write/read metrics.

## Goal

Learners should understand that every model call is still made from the current visible paper/context. Prompt caching can make repeated prefixes cheaper or faster to process, but it does not create memory, enlarge the context window, or let the model use content that is not in the current request.

## Boundary

This chapter stays inside the Lesson 1 mental model:

- It explains what the model sees on each round.
- It explains prompt cache as repeated input reuse.
- It lightly names cache write/read metrics.

It intentionally does not cover:

- Harness message-builder implementation details. Leave that to Lesson 2.
- Provider-specific cache key design, TTL tuning, headers, and tracing. Leave that to Lesson 2.
- Multi-agent cache sharing, workflow partitioning, and loop-coding context strategy. Leave that to Lesson 3.

## Slide Plan

| Slide | Title | Job |
|---|---|---|
| 1 | 1.1 Advanced: Visible Paper and Prompt Cache | Frame the advanced topic and connect it back to the Paper Model |
| 2 | Every Round Gets the Complete Visible Paper | Correct the misconception that only the new user message is sent |
| 3 | Prompt Cache Reuses a Stable Prefix | Explain cache as reuse of repeated input prefix, not hidden memory |
| 4 | Cache Write vs Cache Read | Distinguish first-time cache creation from later cache hit/read |
| 5 | Stable Prefix, Changing Tail | Explain why stable content belongs earlier and dynamic content later |
| 6 | Cache Is Not Memory | Separate context, prompt cache, compacting, retrieval, and memory |

## Core Phrases

- "Every round still has a full visible paper."
- "Cache can reuse repeated paper sections, but it does not remove them from the paper."
- "Cache write/read changes processing and billing signals, not what the model is allowed to see."
- "If content is not in the visible paper, cache does not make the model know it."

