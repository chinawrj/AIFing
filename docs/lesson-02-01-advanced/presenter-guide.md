# Lesson 2 Advanced Add-on (2.1) Presenter Guide

## Narrative

This advanced chapter extends Lesson 2 from "what the harness does" to "what
the harness manages." The central idea is that a production harness is a runtime
object manager, not a single prompt string.

## Slide Flow

| Slide | Presenter bridge |
|---|---|
| 1 | "Lesson 2 introduced the harness as the operating environment. Now we look at the objects it manages." |
| 2 | "The paper is assembled from many sources. Each source has a different owner and risk profile." |
| 3 | "Before an object reaches the model, the harness should know where it came from, why it was selected, and how it was validated." |
| 4 | "Tool use is the clearest example of a runtime contract: the model proposes, but the harness validates and executes." |
| 5 | "Skill, tool, and agent profile are often mixed together. They solve different problems." |
| 6 | "The purpose of object boundaries is not complexity. It is cleaner paper, safer execution, and easier debugging." |

## Emphasis For Advanced Learners

- Keep this chapter inside one harness/runtime. Do not turn it into subagent or workflow orchestration.
- Use "object" in the runtime-design sense, not as an object-oriented programming lecture.
- Tool schemas constrain the request shape, but the harness still owns permissions, execution, and result handling.
- Observability is a harness responsibility: logs, traces, eval cases, and failure records help improve runtime behavior.
