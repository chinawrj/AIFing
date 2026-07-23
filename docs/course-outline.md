# AI Training Course Outline

## Overall Narrative: The Paper Model / 递纸条模型

The entire course is built around one core metaphor:

> Interacting with AI is like users, the AI model, and traditional software systems writing on a shared sheet of paper with limited capacity.  
> The model itself only reads the paper and writes back to the paper.  
> The traditional software layer, or Harness, prepares the paper, prints rules on it, recognizes structured content, executes tools, and writes results back onto the paper.

This “paper” maps to key AI concepts:

| Course Concept | Paper Model Mapping |
|---|---|
| Prompt | What the user writes on the paper |
| Response | What the AI writes back on the paper |
| Token | The basic unit used by the model to process paper content |
| Context | Everything currently visible on the paper |
| Context Window | The maximum amount the paper can hold |
| System Prompt | Pre-printed rules on the paper |
| User Instructions | Long-term user preferences attached to the paper |
| Tool Call | A structured request written by AI on the paper |
| Harness / Runtime | Software layer that reads the paper, validates requests, executes tools, and writes results back |
| Tool Result | Result written back to the paper after traditional software executes an external action |
| Agent | A fixed paper template with rules, tools, permissions, and execution loop |
| Subagent | A specialized agent with its own independent paper |
| Workflow | Rules for passing papers across steps, roles, and agents |
| Loop Coding | Write code → run → observe errors → modify → run again |

---

# Lesson 1: AI Fundamentals: Model, Token, Context, and Tools

**Subtitle:** Understanding AI through the Paper Model

## Lesson Goal

This lesson helps learners build a practical engineering mental model:

> An AI model is a token generator based on context. It does not directly touch the outside world. It only reads the current paper and writes the next content.

After this lesson, learners should understand:

- AI company, AI model, AI product, and Harness are different layers.
- The model processes tokens, not human sentences directly.
- Context is everything the model can currently see.
- Context Window is the capacity limit of the paper.
- Long conversations may forget, drift, or lose constraints.
- Compacting exists because the paper can become too full.
- Tools are not directly executed by AI; traditional software parses structured AI output and executes tools.

## 1.1 AI Company, AI Model, AI Tool

### Core idea

Separate the layers:

- **AI Company**: trains, provides, or operates AI models.
- **AI Model / Model Family**: reads context and generates tokens.
- **AI Tool / IDE / Agentic Coding Product**: the product users operate, such as a coding agent or IDE extension.
- **Harness / Runtime**: the software layer inside the product that manages context, tools, permissions, safety, logging, and control flow.

### Suggested explanation

> When we say “I’m using AI,” we are usually not only using a model. We are using a product made of model, context, tools, and traditional software.

Examples:

| Layer | Examples | Do not confuse with |
|---|---|---|
| AI Company / Provider | Anthropic, OpenAI | The model itself |
| Model Family | Claude series, GPT series | The IDE or app |
| AI Tool / IDE / Agent | Claude Code, Codex, opencode | The model family |
| Harness / Runtime | The software layer inside tools/products | The AI company |

### Suggested visual

**AI Layer Map Table**

```text
AI Company / Provider
Model Family
AI Tool / IDE / Agent
Harness / Runtime
```

Side labels:

```text
Model generates tokens.
Tool / IDE provides the user workflow.
Harness manages context, tools, permissions, and execution.
```

---

## 1.2 AI Hello World: You, AI, and a Sheet of Paper

### Core idea

The simplest AI interaction:

1. The user writes a question on the paper.
2. The AI reads the paper.
3. The AI writes a response on the same paper.
4. The user writes another message.
5. The AI reads and writes again.

### Key phrases

> AI does not read your mind. It only sees what is on the paper.

> AI is not directly connected to the world. It first reads and writes tokens on the paper.

### Suggested visual

**User ↔ Paper ↔ AI Model**

```text
User writes on paper
        ↓
Paper / Context
        ↓
AI reads and writes back
```

---

## 1.3 Token: How Text on the Paper Is Processed

### Core idea

- Humans see words, sentences, and formatting.
- Models process token sequences.
- A token can be a word, part of a word, symbol, space, or punctuation.
- Context Window is usually measured in tokens, not pages, characters, or words.

### Suggested explanation

> The paper contains human-readable text, but the model ultimately reads a token sequence.

More precise version:

> Strictly speaking, AI does not directly process natural-language sentences. It processes token sequences and predicts following tokens.

### Suggested visual

**Text → Tokenization → Token Sequence**

```text
"Explain context window"
        ↓
["Explain", " context", " window"]
        ↓
Model input tokens
```

---

## 1.4 A Single Turn Becomes Model Input

### Core idea

This bridges Token and Context.

```text
User message
  ↓
Written on paper
  ↓
Tokenized
  ↓
Combined with visible context
  ↓
Model reads the current paper
```

### Key points

- Token is not the final destination.
- Tokens become part of the current model input.
- The model does not read only the latest user message.
- It reads the current visible paper as one token sequence.

### Suggested visual

**A Single Turn Becomes Model Input**

```text
User message → paper → tokens → visible context → model input
```

---

## 1.5 System Prompt: Pre-printed Rules on the Paper

### Core idea

The paper is not blank. Before the user writes anything, some rules may already be printed on it.

System prompts may define:

- Role
- Behavior boundaries
- Safety rules
- Output format
- Tool usage rules
- Product style
- Priority constraints

### Key phrase

> The system prompt is like an instruction manual taped to the top of the paper.

### Suggested visual

**Pre-printed Paper**

Top section:

```text
System Instructions
- Be helpful
- Follow safety rules
- Use tools only when needed
```

Below it:

```text
User message
Conversation history
Model response area
```

---

## 1.6 Context: Everything on the Paper That AI Can See

### Core idea

Context is not only the latest user input.

Context may include:

- System prompt
- Developer instructions
- User instructions
- Current user input
- Conversation history
- Uploaded files
- Retrieved information
- Tool call requests
- Tool results
- Intermediate work records, depending on the system

### Key phrase

> What AI can use for the current answer is not determined by what you once said. It is determined by what is still on the paper now.

### Suggested visual

**Segmented Paper**

```text
Pre-printed rules
User instructions
Current user message
Conversation history
Tool outputs
Files / retrieved context
Model response area
```

---

## 1.7 Context Window: The Paper Has Limited Space

### Core idea

- Context Window = the maximum number of tokens the model can see and process at one time.
- It is like the area of the paper.
- It is not long-term memory.
- Longer conversations consume more paper space.
- When the paper is too full, the system must drop, summarize, or select content.

### Key phrase

> Context Window is not memory. It is the working space of the model right now.

### Common misunderstandings

- “I said it earlier, so AI must remember it.”
- “AI should automatically know the whole project history.”
- “If the model forgot something, the model is broken.”

### Suggested visual

**Limited Paper / Bounded Context Window**

A long conversation on the left; a fixed window on the right showing only part of it.

---

## 1.8 Context Overflow: Choose What Stays Visible

### Core idea

When the paper is full, the system may:

- Drop oldest content.
- Keep recent content.
- Select important content.
- Trigger compacting / summarization.
- Retrieve selected external information and place it back on the paper.

### Typical consequences

- Earlier details or constraints may disappear.
- Small details are lost.
- The model repeats questions.
- The task drifts.
- Style becomes inconsistent.

### Key phrase

> Context overflow is not about what was once said. It is about what remains visible for this call.

### Suggested visual

```text
Older content → may leave the visible paper
Selected content → remains visible
Current message → stays in the call
```

---

## 1.9 Compacting / Summarization

### Core idea

When the paper is nearly full, the system may compress earlier content into a summary card and place that summary back onto the paper.

Compacting usually keeps:

- Goal
- Key constraints
- Current progress
- Important facts
- Next step

It may lose:

- Original wording
- Edge details
- Small formatting requirements
- Hidden preferences
- Low-salience early discussion

### Common issues

- AI remembers the big goal but forgets small requirements.
- AI knows you are making a PPT but forgets the style of a specific page.
- AI keeps the conclusion but loses the reasoning.
- AI may summarize the wrong thing as important.

### Practical responses

- Restate key constraints.
- Ask AI to periodically output a task-state summary.
- Put stable rules in instructions.
- Split large tasks into smaller tasks.
- Use structured specs, tables, and checklists.
- Do not bury important information deep inside long conversations.

### Suggested visual

```text
Long conversation → Compacting → Summary card → Model
```

Summary card:

```text
Goal
Key constraints
Current progress
Important facts
Next step
```

---

## 1.10 Instruction Hierarchy

### Core idea

Not all paper content has equal priority.

Instruction authority:

```text
System instructions
Developer instructions
User instructions
```

### Key points

- AI does not simply obey the last sentence.
- Higher-priority instructions may override lower-priority ones.
- User messages, conversation history, files, retrieved notes, and tool outputs are context data.
- Context data can inform the answer, but it should not override higher-priority instructions.

### Suggested visual

**Authority vs Data**

```text
Instruction authority:
System > Developer > User
```

```text
Context data:
User message
Conversation history
Files / retrieved notes
Tool outputs
```

---

## 1.11 Tool Use: AI Writes the Request, Harness Executes

### Core idea

Do not explain tools as “AI directly calls tools.”

More accurate explanation:

> AI writes a structured tool-call request on the paper. Traditional software / Harness reads the paper, recognizes the structured request, validates it, executes the real action, and writes the result back to the paper.

### Weather example

User writes:

```text
What is the weather today in Shanghai?
```

AI writes a structured request:

```json
{
  "tool": "get_weather",
  "arguments": {
    "location": "Shanghai"
  }
}
```

Harness:

1. Parses JSON.
2. Checks whether the tool exists.
3. Validates parameters.
4. Checks permissions and safety policy.
5. Calls the real weather API.
6. Writes the result back to the paper.

Tool result:

```json
{
  "tool_result": {
    "location": "Shanghai",
    "weather": "cloudy",
    "temperature": "28°C"
  }
}
```

AI then reads the result and writes:

```text
Shanghai is cloudy today, around 28°C.
```

### Key phrase

> AI proposes. Harness validates and executes.

### Suggested visual

```text
User writes question
        ↓
Paper / Context
        ↓
Model writes structured tool request
        ↓
Harness parses paper
        ↓
External API / DB / Browser / Shell
        ↓
Harness writes result back
        ↓
Model reads result and answers
```

---

## 1.12 Minimal AI System Architecture

### Core idea

```text
User
 ↓
Product UI
 ↓
Harness / Runtime
 ↓
Context / Paper
 ↓
Model
 ↓
Tokens
```

Connected external systems:

```text
Tools / APIs / Files / DB
```

Correct arrows:

```text
Model ↔ Context
Harness ↔ Tools
Harness ↔ Context
```

Avoid drawing:

```text
Model ↔ Tools
```

That would imply the model directly accesses external systems.

---

## Lesson 1 Advanced Add-on: 1.1 Visible Paper and Prompt Cache

This is a separate advanced-audience PPT/chapter that extends the Lesson 1 Paper Model without moving into Lesson 2/3 implementation detail. It keeps the user-requested `1.1` advanced naming, but is presented as an add-on after the core Lesson 1 sequence to avoid colliding with the base `1.1 AI Company, AI Model, AI Tool` section.

Advanced learners should understand:

- Each model call is still constructed from the current visible paper/context.
- Prompt cache can reuse repeated input prefixes, but it does not create memory or enlarge the context window.
- Cache write/read metrics describe processing and billing signals, not a different visibility rule for the model.
- Stable content usually belongs earlier in the paper; changing per-turn content belongs later.

Deliverables:

- [Advanced outline](chapter-01-01-advanced/outline.md)
- [Advanced presenter guide](chapter-01-01-advanced/presenter-guide.md)
- [Advanced sources](chapter-01-01-advanced/sources.md)
- [Advanced PowerPoint deck](../decks/chapter-01-01-advanced-context-cache.pptx)

---

# Lesson 2: Custom Prompts at Scale: Custom Agents, Subagents, and Skills

**Subtitle:** Reuse, split, and load prompt-like instructions without crowding one paper

## Lesson Goal

Lesson 1 explains how the model reads the current paper. Lesson 2 explains how to scale the prompts we put on that paper:

> Do not paste every useful instruction into every task. Package stable roles, split low-coupling work into separate papers, and load conditional methods only when needed.

Learners should understand:

- Custom prompts are useful, but copy-pasting them everywhere creates token cost, drift, maintenance burden, and compaction pressure.
- A custom agent is a stable custom prompt packaged as a reusable worker profile with role, rules, tools, permissions, boundaries, and quality bar where supported.
- A subagent is a delegated run with its own paper/context and a return boundary such as a summary, finding list, artifact, or patch.
- Subagents do not enlarge a single context window; they reduce main-thread context pollution by moving bounded local work onto separate papers.
- Compaction is reactive compression of one growing paper. Subagent decomposition is proactive context architecture when branches are weakly coupled and mergeable.
- A skill is a dynamically loaded prompt/manual pack for a focused task or workflow.
- A skill can organize instructions together with scripts, examples, templates, references, schemas, or tool guidance.

---

## 2.1 Custom Prompts at Scale

### Core idea

Lesson 1 introduced the paper model: the model reads what is visible on the paper. Lesson 2 starts from a practical problem:

> If every useful custom prompt is always written on the same paper, the paper becomes crowded before the task itself is done.

The three scaling moves are:

| Move | Paper Model Meaning | Use When |
|---|---|---|
| Custom agent | Stable prompt becomes a reusable worker profile | The same role repeats |
| Subagent | A branch gets its own paper | Work can split and later merge |
| Skill | A method loads only when relevant | The prompt may or may not be needed |

---

## 2.2 Copy-Pasted Custom Prompts Break the Paper

### Core idea

Custom prompts fail at scale when they are copied into every task.

Problems:

- **Token cost:** unused rules still consume attention.
- **Prompt drift:** different copies evolve differently.
- **Maintenance:** no clear owner for the latest version.
- **Compaction risk:** long instruction blocks push real task details out sooner.

Key question:

> Which prompts should be packaged, which should be split, and which should load later?

---

## 2.3 Custom Agent

### Core idea

When the role and constraints are stable, turn the custom prompt into a custom agent.

In Paper Model language:

> A custom agent is a reusable paper template plus runtime profile.

It may define:

- Role
- Rules
- Tools
- Access / permissions
- Task boundary
- Stop condition
- Quality bar
- Model or reasoning settings where supported
- Skills configuration where supported

Important boundary:

> A custom agent is a profile. It becomes a subagent only when the runtime starts a separate delegated run.

---

## 2.4 Subagent

### Core idea

A subagent gives a bounded branch its own working paper.

Useful subagent pattern:

```text
Main paper
  shared goal, constraints, starting context
      ↓
Subagent paper A: research
Subagent paper B: design
Subagent paper C: QA
      ↓
Summaries, artifacts, findings, patches
```

Subagents help because the main thread does not need to carry every exploration note, log, test output, or local scratch detail. The main paper receives only the distilled result.

Boundary:

> A subagent does not enlarge any single model call's context window. It moves local work onto another paper.

---

## 2.5 Reactive Compaction vs Proactive Split

### Core idea

Compaction and subagents solve different context problems.

| Mechanism | What Happens | Tradeoff |
|---|---|---|
| Compaction | One crowded paper is summarized to free space | Keeps continuity, but may compress away exact detail |
| Subagent split | Work is planned across multiple papers before the main paper fills | Preserves local detail, but needs a merge boundary |

Recommended wording:

> For parallel, low-coupling, mergeable work, proactive subagent decomposition is usually more controllable than waiting for compaction.

Also say:

> A subagent branch can still compact later. These are complementary mechanisms, not opposites.

---

## 2.6 Good Subagent Tasks Have Clean Merge Boundaries

### Use subagents when the task is:

- **Independent:** a branch can progress without constant cross-talk.
- **Bounded:** input, output, and stop condition are clear.
- **Parallel:** multiple branches can run at the same time.
- **Mergeable:** the result can return as findings, an artifact, a patch, or a summary.

### Be careful when:

- Every step depends on the same fast-changing source of truth.
- The task is so small that coordination costs more than execution.
- There is no clear artifact or summary format for merging.

Important nuance:

> Strong coupling is not an automatic ban. The real test is synchronization frequency and merge clarity.

---

## 2.7 Skill

### Core idea

Sometimes you do not know upfront whether a prompt, checklist, or method will be needed.

In Paper Model language:

> A skill is a prompt/manual pack that stays outside the paper until the task matches it.

Use a skill for:

- A workflow that repeats.
- A checklist that is too long to keep always loaded.
- A format or template that applies only in some cases.
- A task-specific method, such as creating presentations, reviewing docs, or preparing a release.

Boundary:

> A loaded skill still consumes context. The benefit is keeping irrelevant skills out until needed.

---

## 2.8 Skill Folder

### Core idea

A skill can be more than one prompt. It can organize the method as a small reusable capability.

A practical skill folder may include:

```text
SKILL.md       when to use it and workflow rules
scripts/       repeatable operations
examples/      good outputs and patterns
templates/     starting documents or deck frames
references/    detailed guidance loaded as needed
```

Design rule:

> Keep prompts, scripts, examples, and references together so the method stays coherent.

Execution boundary:

> A skill can package scripts and guidance, but execution still depends on the runtime, sandbox, approvals, and available tools.

---

## 2.9 Choose the Right Prompt-Scaling Pattern

| Object | Trigger | Lives As | Use For |
|---|---|---|---|
| One-off prompt | This task only | Current paper | Temporary details |
| Custom agent | Stable role | Reusable profile | Recurring worker behavior |
| Subagent | Independent branch | Separate paper | Local detail outside the main context |
| Skill | Conditional method | Just-in-time pack | A method that may or may not be needed |

Shortcut:

> Stable role -> custom agent. Independent branch -> subagent. Conditional method -> skill.

---

## 2.10 Prompt Loading Strategy

### Core idea

> Prompt engineering writes instructions. Context architecture decides how instructions travel.

The progression:

```text
Write one-off prompt
  ↓
Package stable roles as custom agents
  ↓
Split branch work into subagent papers
  ↓
Load conditional methods as skills
  ↓
Orchestrate multiple papers in Lesson 3
```

Lesson boundary:

- Lesson 2.1 covers advanced runtime objects and contracts.
- Lesson 3 covers systematic subagent orchestration, workflow gates, compaction strategy, and Goodhart risk control.

---

## Lesson 2 Deliverables

- [Lesson 2 assets](lesson-02/README.md)
- [Lesson 2 presenter guide](lesson-02/presenter-guide.md)
- [Lesson 2 sources](lesson-02/sources.md)
- [Lesson 2 PowerPoint deck](../decks/lesson-02-custom-prompts-at-scale.pptx)
- [Lesson 2 legacy-compatible deck filename](../decks/lesson-02-harness-engineering.pptx)

---

## Lesson 2 Advanced Add-on: 2.1 Harness Objects and Runtime Contracts

This is a separate advanced-audience PPT/chapter that extends Lesson 2 without
moving into Lesson 3 workflow orchestration.

Advanced learners should understand:

- Harness engineering is runtime object management, not only prompt writing.
- The visible paper is assembled from instructions, tools, skills, permissions,
  agent profiles, observations, and selected state.
- A tool is an executable contract: name, schema, permission, executor, result
  shape, and failure path.
- Skills, tools, agent profiles, permissions, and observations solve different
  runtime problems.
- Clear object boundaries keep the paper cleaner, safer, more auditable, and
  easier to debug.

Deliverables:

- [Advanced outline](lesson-02-01-advanced/outline.md)
- [Advanced presenter guide](lesson-02-01-advanced/presenter-guide.md)
- [Advanced sources](lesson-02-01-advanced/sources.md)
- [Advanced PowerPoint deck](../decks/lesson-02-01-advanced-harness-objects.pptx)

---

# Lesson 3: Systematic Subagent Orchestration

**Subtitle:** From longer prompts to managed multi-paper work

## Lesson Goal

Lesson 3 builds on the first two lessons:

- The model reads and writes paper.
- Harness manages paper, tools, and execution.
- Lesson 2 showed how custom prompts become reusable agents and skills.

Now the question is:

> When a task needs several papers, who decides which paper works next, what each paper may see, and which result is allowed to continue?

Learners should understand:

- Three ways to call subagents systematically: AI-led temporary team, prepared custom agent files, and script-orchestrated workflow.
- Subagents are not only prompt reuse; they also give bounded work its own paper.
- Workflow scripts move planning authority from the main AI into deterministic JavaScript control flow.
- `schema` checks output shape, verifier agents check truth, and workflow branches decide what happens next.
- Proactive subagent split usually beats reactive compacting when the task can be divided into weakly coupled papers.
- Workflow gates can reduce Goodhart side effects caused by over-optimizing custom agent behavior.

---

## 3.1 Why Orchestration Exists

### Core idea

A complex task can exceed one paper because it mixes:

- requirements;
- research notes;
- implementation details;
- tool results;
- failed attempts;
- review findings;
- final synthesis.

Reactive compacting compresses the current paper after it is already crowded. Orchestration is proactive: split the problem into smaller papers before local context becomes the bottleneck.

### Paper Model explanation

> A hard math or physics problem may need several scratch papers. The better strategy is not always to keep erasing one page; assign each weakly coupled subproblem its own page and collect only the useful result.

### Suggested visuals

**Systematic Subagent Orchestration**
**Complex Tasks Need Managed Papers**

---

## 3.2 Way 1: Let AI Form the Team

### Core idea

The user gives a goal and asks the main AI to organize subagents as needed.

This is the most universal pattern:

- no prepared custom agent files are required;
- the main AI chooses roles at runtime;
- works in any tool that supports subagents;
- useful for review, research, comparison, and cleanup tasks.

### Required gates

Ad hoc teams are fast, but they need explicit quality controls:

- short brief for each subagent;
- evidence requirements;
- fixed return format;
- main-agent merge gate;
- human checkpoint for ambiguous or high-risk results.

### Paper Model explanation

> The main paper acts like the exam sheet. Temporary subagent papers solve bounded subproblems, then return concise evidence instead of dumping the whole scratch process back.

### Suggested visuals

**Let AI Form the Team**
**Ad Hoc Teams Are Fast, But Need Gates**

---

## 3.3 Way 2: Main AI Calls Prepared Agent Files

### Core idea

Prepared custom agent files package stable roles so the main AI can call known workers:

```text
security-reviewer.md
api-designer.md
test-writer.md
docs-editor.md
```

The main AI still holds the plan, but each worker has a reusable role profile, tool boundary, and output habit.

### When this is better than ad hoc teams

- The same role is used repeatedly.
- The team needs consistent standards.
- Permissions should be scoped by role.
- Reviews must follow a known checklist.
- Different subagents should use different models or effort levels.

Some harnesses also support teammate-style communication between agents. Treat that as bounded coordination, not unlimited shared memory: the course idea remains that each worker has its own paper and returns controlled information.

### Suggested visuals

**Main AI Calls Prepared Agent Files**
**Prepared Agents Can Work Like Teammates**

---

## 3.4 Way 3: A Script Holds the Plan

### Core idea

Dynamic workflow moves orchestration into JavaScript:

```js
export const meta = {
  name: 'build-and-check',
  description: 'Generate and independently verify results',
  phases: [
    { title: 'Build', detail: 'Create candidates' },
    { title: 'Verify', detail: 'Check evidence' },
  ],
}
```

The script can call:

- `agent(prompt, options)` to launch a subagent;
- `parallel(() => agent(...))` for fan-out plus a barrier;
- `pipeline(items, build, verify)` for item-by-item staged flow;
- `phase()` and `log()` for progress display;
- global `args` for workflow inputs;
- `resumeFromRunId` to reuse unchanged completed agent calls.

Important distinction:

> `phases` group progress in the UI. They are not execution barriers and not validation gates.

### Paper Model explanation

> In ad hoc mode, the main AI is the coordinator. In workflow mode, the script is the director. Each subagent follows the script like an actor following a scene order.

### Suggested visual

**A Script Holds the Plan**

---

## 3.5 Workflow Gates: Format, Truth, Branch

### Core idea

There is no built-in magic field like `result.passed`. A reliable gate is built from three layers:

1. `schema` defines what the result must look like.
2. An independent verifier agent checks whether the result is true.
3. JavaScript branches on `pass`, `fail`, or `unverified`.

Example structure:

```js
const verdict = await agent('Independently verify this result', {
  label: 'verifier',
  phase: 'Verify',
  schema: VERDICT,
})

if (!verdict || verdict.status === 'unverified') {
  return { status: 'unverified', candidate }
}

if (verdict.status === 'fail') {
  return { status: 'fail', candidate, verdict }
}

return { status: 'pass', candidate, verdict }
```

Teaching distinction:

- `schema` is a format gate: fields, types, enum values.
- verifier is a semantic gate: evidence, tests, source checks.
- branch logic is the control gate: what the workflow permits next.

If verification does not return a verdict, classify the result as `unverified`. Do not silently treat it as pass.

### Suggested visual

**Workflow Gates Need Two Checks**

---

## 3.6 Compaction Strategy: Reactive vs Proactive

### Core idea

When one person needs multiple papers:

```text
Paper 1 -> compact -> Paper 2 -> compact -> Paper 3
```

the work depends on compressed handoffs. Important detail may be lost.

For weakly coupled work, a stronger pattern is:

```text
Main paper
  ├── Research paper
  ├── Build paper
  ├── Test paper
  └── Review paper
```

Each subagent should be scoped so it can finish before local compaction becomes necessary. The main paper collects bounded results and evidence.

### Key phrase

> Compacting is passive compression. Subagent split is active task design.

### Suggested visual

**Multiple Papers Beat Reactive Compaction**

---

## 3.7 Goodhart's Law and Custom Agent Side Effects

### Core idea

Goodhart's Law says that when a measure becomes a target, it stops being a good measure.

In AI agent design, the risk is:

```text
Intent: produce high-quality work
Proxy target: always follow the custom agent checklist
Failure mode: optimized-looking output that misses the real task
```

Custom agent files can create this problem when they over-specify style, role behavior, or scoring rules. The agent may optimize the visible target instead of the human intent.

### Controls

- Separate worker and verifier roles.
- Require evidence, not self-confidence.
- Use schema for structure, not for truth.
- Add `unverified` as an explicit outcome.
- Use workflow branches to stop, retry, or escalate instead of accepting polished output.
- Keep human checkpoints for ambiguous business judgment.

### Suggested visuals

**Goodhart's Law: Proxy Targets Can Backfire**
**Workflow Keeps Agents Honest**

---

## 3.8 From Longer Prompt to Better Organization

### Core idea

Progression:

```text
Longer prompt
  ↓
Reusable custom agent
  ↓
Scoped subagent paper
  ↓
Prepared agent team
  ↓
Workflow script
  ↓
Verified result
```

### Key phrase

> For complex work, the main design question is not "how do I write a longer prompt?" It is "who holds the plan, which paper owns each subproblem, and what gate lets the result move forward?"

---

## Lesson 3 Deliverables

- [Lesson 3 assets](lesson-03/README.md)
- [Lesson 3 presenter guide](lesson-03/presenter-guide.md)
- [Lesson 3 sources](lesson-03/sources.md)
- [Lesson 3 PowerPoint deck](../decks/lesson-03-agentic-workflows.pptx)

---

# Course Navigation

```text
Lesson 1: Model
Understand how AI reads and writes the paper.
Token / Context / Context Window / Compacting / Tools

        ↓

Lesson 2: Custom Prompts at Scale
Understand how to reuse, split, and dynamically load prompt-like instructions.
Custom Agent / Subagent / Skill / Prompt Loading Strategy

        ↓

Lesson 3: Systematic Subagent Orchestration
Understand who holds the plan, how papers split, and which gates let results continue.
AI-led Team / Prepared Agent Files / Workflow Script / Verification Gates / Goodhart Risk
```

---

# Suggested PPT Image List

## Lesson 1 Images

1. **User + AI + Paper**
   - Minimal interaction model.
   - Opening visual.

2. **Text to Tokens**
   - How text is split into tokens.

3. **A Single Turn Becomes Model Input**
   - User message becomes part of the current model input.

4. **System Prompt: Rules at the Top of the Paper**
   - The paper is not blank; pre-printed rules guide the model.

5. **Paper Sections / Context Composition**
   - Context includes system prompt, user message, history, and tool outputs.

6. **Context Window as Limited Paper**
   - The paper has limited capacity.

7. **Context Overflow**
   - Older content falls out of the window.

8. **Compacting / Summarization**
   - Long conversation is compressed into a summary card.

9. **Instruction Hierarchy**
   - Different paper content has different priority.

10. **Tool Use: Model Writes, Harness Executes**
   - AI writes the tool request; Harness executes and writes the result back.

11. **Minimal AI System Architecture**
   - Summary of model, context, Harness, and tools.

---

## Lesson 2 Images

1. **Custom Prompts at Scale**
   - Lesson 1 paper becomes prompt reuse, isolation, and just-in-time loading.

2. **Copy-Pasted Custom Prompts Break the Paper**
   - Repeated rules create token cost, prompt drift, maintenance, and compaction pressure.

3. **Custom Agent as Packaged Custom Prompt**
   - Stable roles and constraints become a reusable worker profile.

4. **Subagent as Separate Paper**
   - A delegated branch gets its own local context and returns a summary or artifact.

5. **Compaction vs Proactive Split**
   - Reactive compression of one paper versus planned multi-paper decomposition.

6. **Good Subagent Merge Boundaries**
   - Independent, bounded, parallel, mergeable work is the best subagent target.

7. **Skill as Just-in-Time Prompt Pack**
   - Load the relevant manual only when the task needs it.

8. **Skill Folder**
   - Prompts, scripts, examples, templates, and references stay together.

9. **Prompt-Scaling Decision Matrix**
   - One-off prompt, custom agent, subagent, and skill each solve a different loading problem.

10. **Prompt Loading Strategy**
    - Write, package, split, load, then orchestrate in Lesson 3.

---

## Lesson 3 Images

1. **Systematic Subagent Orchestration**
   - Overview of the three ways to organize subagents.

2. **Complex Tasks Need Managed Papers**
   - One overloaded paper creates context noise, compaction risk, and merge confusion.

3. **Let AI Form the Team**
   - The main AI creates temporary subagent roles at runtime.

4. **Ad Hoc Teams Are Fast, But Need Gates**
   - Brief, evidence, return format, merge gate, and human checkpoint.

5. **Main AI Calls Prepared Agent Files**
   - Stable worker profiles package custom prompts, tools, and output habits.

6. **Prepared Agents Can Work Like Teammates**
   - Bounded communication can help coordination while preserving scoped papers.

7. **A Script Holds the Plan**
   - Dynamic workflow JavaScript orchestrates `agent()`, `parallel()`, `pipeline()`, `args`, and phases.

8. **Workflow Gates Need Two Checks**
   - `schema` validates format; verifier validates truth; branch logic decides pass/fail/unverified.

9. **Multiple Papers Beat Reactive Compaction**
   - Proactive split avoids depending on repeated compressed handoffs.

10. **Goodhart's Law: Proxy Targets Can Backfire**
   - A custom agent can optimize a proxy target while missing the human intent.

11. **Workflow Keeps Agents Honest**
   - Worker/verifier separation and explicit gates reduce polished but wrong results.

---

# Recommended Course Titles

## Lesson 1

**AI Fundamentals: Model, Token, Context, and Tools**  
Chinese subtitle: 从递纸条理解 AI 如何工作

## Lesson 2

**Custom Prompts at Scale: Custom Agents, Subagents, and Skills**
Chinese subtitle: 复用、拆分、按需加载提示词

## Lesson 3

**Systematic Subagent Orchestration: Teams, Agent Files, and Workflow Gates**
Chinese subtitle: 从更长提示词走向多纸张编排

---

# Final Course Logic

> Lesson 1 helps learners understand that AI is not magic. It reads and writes limited context.  
> Lesson 2 helps learners understand how custom prompts scale through custom agents, subagents, and skills.
> Lesson 3 helps learners understand that complex engineering work needs planned subagent orchestration, verification gates, and Goodhart-aware controls instead of merely longer prompts.
