# Chapter 1.1 Advanced Presenter Guide

## Narrative

This chapter extends Lesson 1 from conceptual context to deployment reality. The key move is to keep the Paper Model intact: every model call still receives a current visible paper, while prompt caching optimizes repeated parts of that paper.

## Slide Flow

| Slide | Presenter bridge |
|---|---|
| 1 | "We already know the model reads the paper. Now we look at what happens when a real product sends that paper again and again." |
| 2 | "A round is not just the latest user message. The call is built from the current visible paper." |
| 3 | "Prompt cache does not mean less paper. It means repeated paper sections may be processed through a faster path." |
| 4 | "Cache write is the first useful registration of a repeated prefix. Cache read is a later hit on that prefix." |
| 5 | "Stable content tends to go first because caching usually works best on repeated prefixes." |
| 6 | "Cache is an optimization layer, not memory, retrieval, or compaction." |

## Emphasis For Advanced Learners

- OpenAI and Anthropic expose different caching surfaces, so teach the general mental model first.
- Do not say "the model remembers the cache." Say "the provider reuses processing for repeated input."
- Cached tokens still represent input/context. They are not outside the paper.
- The chapter should create curiosity for Lesson 2, but not explain message builders, cache keys, TTLs, or tracing design in detail.

