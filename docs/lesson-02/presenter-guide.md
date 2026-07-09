# Lesson 2 Presenter Guide

Lesson 2 is ready to run as a 10-slide training deck. Each slide maps to one core Harness Engineering concept from the course outline.

## Audience

Engineering-oriented learners who already understand the Lesson 1 Paper Model: the model reads visible context and writes tokens back.

## Narrative Arc

By the end, learners should understand that real AI products are not just prompts wrapped around a model. The harness/runtime constructs context, injects instructions, exposes tools, validates risk, executes model-proposed actions outside the model, writes observations back, and controls the loop.

## Slide Flow

| Slide | Section | Narrative job | Presenter bridge |
|---|---|---|---|
| 1 | 2.1 Why Harness Is Needed | Move from "model reads paper" to "who prepares and manages the paper." | "Lesson 1 told us what the model can see. Lesson 2 asks who decides what is placed there." |
| 2 | 2.1 Model vs Harness | Separate model responsibilities from runtime responsibilities. | "If we collapse these two layers, we will assign safety and execution decisions to the wrong place." |
| 3 | 2.2 Harness as Paper Manager | Show the turn-by-turn paper management loop. | "The paper is assembled for each call, then updated after the model and tools respond." |
| 4 | 2.3 Core Responsibilities of Harness | Present the runtime control surface. | "Prompt wording is only one piece. The harness owns the rest of the operating system around the model." |
| 5 | 2.4 User Instructions | Explain persistent preferences and their limits. | "Some preferences should follow the user, but persistence is not the same thing as safe storage." |
| 6 | 2.5 Custom Agent | Define a reusable work environment. | "A custom agent is not just a longer prompt; it packages rules, tools, permissions, and boundaries." |
| 7 | 2.6 Skills | Define reusable work manuals loaded when relevant. | "When the same task pattern repeats, turn the method into a skill rather than copying long prompt text." |
| 8 | 2.7 Tools, Skills, Agents, Harness | Resolve vocabulary and boundaries. | "Now we can name the pieces without using 'agent' for everything." |
| 9 | 2.8 Tool Call Lifecycle | Make tool execution precise and safe. | "The key point: the model proposes; execution happens outside the model, with validation and permission." |
| 10 | 2.9-2.10 From Prompt Engineering to Harness Engineering | Synthesize the lesson and bridge to Lesson 2.1 and Lesson 3. | "A prompt controls one message. A harness controls the system that decides what is visible and what can happen." |

## Review Notes

- Keep Lesson 2 focused on a single harness/runtime. Do not expand Custom Agent into subagents or multi-agent workflows; that belongs in Lesson 3.
- Say "the harness manages context budget and visible content," not "the harness increases the model's context window."
- Tool schemas constrain argument shape. They do not replace permissions, policy, human approval, logging, or audit.
- Tool execution may happen in a client harness, host runtime, MCP server, or provider-hosted tool. The important boundary is that the model itself does not execute the external action.
- Tool outputs, retrieved webpages, files, and database results are context data, not higher-priority instructions.
- A model may produce zero, one, or multiple tool calls. A production harness must handle all three.

## Optional Discussion Prompts

1. Which parts of an AI product you use are model behavior, and which parts are harness behavior?
2. Which tool calls in your environment should require human approval?
3. What user preferences are stable enough to become user instructions, and what should remain task-local?
4. Which repeated work pattern in your team would be better represented as a skill?
