# Lesson 2 Presenter Guide

Lesson 2 is ready to run as a 10-slide training deck. It follows Lesson 1's Paper Model and focuses on scaling custom prompts through custom agents, subagents, and skills.

## Audience

Engineering-oriented learners who already understand Lesson 1: the model reads the current paper, custom prompts are instructions written onto that paper, and the paper has limited capacity.

## Narrative Arc

By the end, learners should understand that prompt engineering does not scale by pasting more instructions into one context window. Stable roles become custom agents, low-coupling branches can run as subagents on separate papers, and conditional methods become skills that load only when relevant.

## Slide Flow

| Slide | Section | Narrative job | Presenter bridge |
|---|---|---|---|
| 1 | Custom Prompts at Scale | Reconnect Lesson 1's paper to prompt reuse, isolation, and dynamic loading. | "Lesson 1 taught what the model sees. Lesson 2 asks how we stop every useful prompt from crowding the same paper." |
| 2 | Copy-Paste Problem | Show why repeated custom prompts create token cost, drift, maintenance, and compaction pressure. | "A custom prompt is useful once. Copying every custom prompt into every task becomes context pollution." |
| 3 | Custom Agent | Define custom agent as a packaged custom prompt plus runtime profile. | "When the role is stable, stop copying the prompt and turn it into a reusable worker profile." |
| 4 | Subagent | Introduce a subagent as a delegated run with its own paper. | "Once a worker has its own paper, local detail no longer has to live in the main thread." |
| 5 | Compaction vs Proactive Split | Contrast reactive compaction with planned multi-paper decomposition. | "Compaction compresses after the paper gets crowded. Subagents let us plan separate papers before that point." |
| 6 | Merge Boundaries | Explain when subagents help and where coordination costs appear. | "The question is not whether a task shares context. The question is how often branches must synchronize and how clearly they can merge." |
| 7 | Skill | Define skill as a just-in-time prompt/manual pack. | "Some prompts are not stable roles. They are methods we may need only if a situation appears." |
| 8 | Skill Folder | Show skill as an organized capability: prompt plus scripts, examples, templates, and references. | "The prompt is the entry point; the method often needs supporting assets and scripts nearby." |
| 9 | Selection Rule | Give a decision matrix for one-off prompt, custom agent, subagent, and skill. | "Use the object that matches the loading problem." |
| 10 | Prompt Loading Strategy | Close with the core Lesson 2 model and bridge to Lesson 2.1 / Lesson 3. | "Prompt engineering writes instructions; context architecture decides how instructions travel." |

## Review Notes

- Do not say subagents enlarge a single model call's context window. They move bounded local work onto separate papers.
- Do not say skills are free context. A skill saves upfront context only when it is loaded on demand; once loaded, it still consumes tokens.
- A custom agent is not merely a prompt. It is a reusable profile built around instructions and runtime settings such as tools, permissions, sandbox, model, or skills where supported.
- A subagent is not automatically better for every task. It helps most when branches are independent enough to work before frequent synchronization.
- Compaction and subagents are complementary. A subagent branch can still compact if it becomes long.
- In environments that support context forking, a subagent can start from the shared parent context, then diverges as it works.
- Lesson 2 introduces subagents as a context architecture tool. Lesson 3 should carry the heavier workflow orchestration, handoff, teammate, and loop-coding material.
- Tool call lifecycle, schemas, permissions, and runtime contracts belong mainly in Lesson 2.1.

## Optional Discussion Prompts

1. Which custom prompt in your workflow is repeated often enough to become a custom agent?
2. Which task could be split into weakly coupled branches with separate papers?
3. What artifact would let those branches merge cleanly?
4. Which checklist or method should become a skill instead of a permanent instruction?
5. Which scripts, examples, or templates should live beside that skill?
