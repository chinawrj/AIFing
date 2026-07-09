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

# Lesson 2: Harness Engineering: Instructions, Agents, Skills, and Tool Runtime

**Subtitle:** The software layer that turns a model into a usable system

## Lesson Goal

Lesson 1 explains how the model reads and writes the paper. Lesson 2 explains:

> Who prepares the paper? Who prints rules on it? Who controls capacity? Who recognizes tool requests? Who writes tool results back?

Answer:

> Harness / Runtime / Host Application.

Learners should understand:

- Harness is the software control layer around the model.
- Harness manages context, instructions, tools, permissions, and execution loops.
- User instructions, custom agents, and skills are ways to configure the paper and tool environment.
- A good AI application is not just a model choice; it is harness design.

---

## 2.1 Why Harness Is Needed

### Core idea

A model alone only does:

```text
read tokens → generate tokens
```

Real applications also need:

- Context construction
- System rule injection
- User preference management
- Tool definition
- Tool-call parsing
- External execution
- Error handling
- Multi-turn loop control
- Permission, safety, audit, logging
- Compacting and retrieval strategies

### Key phrase

> Model is the token generator. Harness is the operating environment.

### Suggested visual

**Model vs Harness**

```text
Model
- reads context
- generates tokens
```

```text
Harness
- prepares context
- injects instructions
- manages tools
- validates calls
- writes results back
- controls loops
```

---

## 2.2 Harness as Paper Manager

### Core idea

In the Paper Model, Harness:

1. Prepares the paper.
2. Prints system prompts on the paper.
3. Writes the user question onto the paper.
4. Writes available tool definitions onto the paper.
5. Gives the paper to the model.
6. Reads what the model writes.
7. Executes tool calls if valid.
8. Writes tool results back to the paper.
9. Gives the paper back to the model.
10. Drops, summarizes, or retrieves content as needed.

### Suggested visual

**Harness as Paper Manager**

Center:

```text
Harness
```

Around it:

```text
User
Model
Paper / Context
System Prompts
Tools
Memory
Logs
Permissions
```

---

## 2.3 Core Responsibilities of Harness

### Eight responsibilities

1. **Context Construction**
   - Assemble current context.
   - Add user input, history, files, retrieval, and tool results.

2. **Instruction Injection**
   - Add system prompts.
   - Add developer instructions.
   - Add user instructions.
   - Add agent-specific rules.

3. **Tool Definition**
   - Tell the model what tools are available.
   - Define tool names, schemas, and usage rules.

4. **Tool Call Parsing**
   - Recognize structured tool-call output.
   - Distinguish normal text from tool requests.

5. **Validation & Permission**
   - Validate arguments.
   - Check permissions.
   - Require human confirmation when needed.
   - Block dangerous operations.

6. **Execution**
   - Call APIs, databases, file systems, browser, shell, MCP servers, etc.

7. **Observation Writing**
   - Write tool results back into context.
   - Let the model continue based on new information.

8. **Loop Control**
   - Decide whether to call the model again.
   - Decide when to stop.
   - Handle failure, retry, timeout, and cost limits.

### Suggested visual

**Harness Responsibility Wheel**

---

## 2.4 User Instructions

### Core idea

User instructions are long-term preferences that the user wants attached to the paper.

Good use cases:

- Output language preference
- Programming style
- Common tech stack
- Internal terminology
- Common formatting requirements
- Personal workflow preferences

Poor use cases:

- One-time task details
- Sensitive information
- Fast-changing temporary state
- Large project documents

### Key phrase

> User instructions are persistent paper annotations.

### Suggested visual

**Paper with Sticky Notes**

```text
Always answer in Chinese
Prefer TypeScript examples
Use concise explanations
```

---

## 2.5 Custom Agent

### Core idea

A custom agent is a packaged work environment:

> fixed role + fixed instructions + fixed tools + fixed permissions + fixed task boundary

Examples:

- Code Review Agent
- Test Writer Agent
- Security Review Agent
- Data Analysis Agent
- Documentation Agent
- Customer Support Agent

A custom agent often defines:

- Role
- Goal
- Input format
- Output format
- Available tools
- Forbidden behavior
- Quality standard
- Stop condition
- Human-confirmation condition

### Prompt vs Custom Agent

Prompt:

```text
A temporary request written on the paper.
```

Custom Agent:

```text
A reusable paper template plus tool environment plus behavior rules.
```

### Suggested visual

**Generic AI vs Custom Agent**

---

## 2.6 Skills

### Core idea

When a task pattern repeats, do not paste the same long prompt every time. Turn it into a reusable skill.

A skill may include:

- Steps
- Checklist
- Output template
- Examples
- Reference files
- Tool usage guidance
- Project conventions

Paper Model explanation:

> A skill is like a reusable manual. When needed, the Harness or Agent places the relevant instructions onto the paper.

### Example

```text
Skill: Generate API Client
- Read OpenAPI spec
- Generate typed client
- Add tests
- Run typecheck
- Update docs
```

### Suggested visual

**Skill Library**

```text
/debug
/code-review
/write-tests
/generate-docs
/deploy-checklist
```

---

## 2.7 Tools, Skills, Agents, Harness

| Concept | Essence | Paper Model Explanation | Example |
|---|---|---|---|
| Tool | External executable capability | AI writes request, Harness executes | Weather, read file, run tests |
| Skill | Reusable work instruction | Manual placed onto the paper when needed | Code review checklist |
| Agent | Specialized work unit | Fixed paper template, rules, and tool permissions | Security reviewer |
| Harness | Operating environment | Manages paper, tools, execution, results | IDE agent runtime |

### Suggested visual

**Tool vs Skill vs Agent vs Harness**

---

## 2.8 Tool Call Lifecycle

### Core flow

```text
1. Harness tells model available tools
2. User asks a question
3. Model writes structured tool request
4. Harness parses request
5. Harness validates schema and permission
6. Harness executes real tool
7. Tool returns result
8. Harness writes result into context
9. Model reads result
10. Model writes final response
```

### Failure paths

Harness may reject execution when:

- Tool does not exist.
- Parameters are invalid.
- Permission is missing.
- Human confirmation is required.
- Safety policy blocks it.
- External service fails.
- Result is too large.
- Cost exceeds limit.

### Suggested visual

```text
Proposed → Parsed → Validated → Executed → Observed → Answered
                   ↓
                Rejected
```

---

## 2.9 Harness Engineering in Practice

### Minimal implementation components

- Message builder
- System prompt manager
- Tool registry
- Tool schema
- Tool executor
- Permission layer
- Context manager
- Conversation state
- Logging / tracing
- Error handling
- Evaluation cases

### Engineering suggestions

- Keep tools small and clear.
- Use strict parameter schemas.
- Return structured tool results.
- Do not let the model directly decide high-risk operations.
- Use human approval for risky operations.
- Design compacting strategy for long-context tasks.
- Keep tool-call logs auditable.

### Suggested visual

**Production Harness Checklist**

---

## 2.10 From Prompt Engineering to Harness Engineering

### Core idea

> Beginner AI users optimize prompts. Advanced AI engineers design harnesses.

Alternative phrase:

> Prompt controls one message. Harness controls the whole interaction system.

### Suggested visual

```text
Prompt
  ↓
Prompt Template
  ↓
Custom Agent
  ↓
Harness
  ↓
Workflow System
```

---

## Lesson 2 Deliverables

- [Lesson 2 assets](lesson-02/README.md)
- [Lesson 2 presenter guide](lesson-02/presenter-guide.md)
- [Lesson 2 sources](lesson-02/sources.md)
- [Lesson 2 PowerPoint deck](../decks/lesson-02-harness-engineering.pptx)

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

# Lesson 3: Agentic Workflows: Subagents, Teammates, and Loop Coding

**Subtitle:** From single-turn Q&A to engineering-grade AI collaboration

## Lesson Goal

Lesson 3 builds on the first two lessons:

- The model reads and writes paper.
- Harness manages paper, tools, and execution.

Now the question is:

> When a task is too large, complex, or noisy for one paper, how do we split work across agents, workflows, teammates, and feedback loops?

Learners should understand:

- Why subagents are useful.
- How subagents reduce context pollution and improve specialization.
- How workflows turn AI work into stable processes.
- How teammate mode differs from chatbot mode.
- Why loop coding is feedback-driven iteration, not one-shot generation.

---

## 3.1 Limits of a Single Agent

### Core idea

One agent handling everything may cause:

- Context pollution.
- Mixed task goals.
- Too many tool records.
- Search, reading, debugging, and coding interfering with each other.
- One role trying to act as architect, implementer, tester, and security reviewer.
- Important details lost during compacting.

### Paper Model explanation

> A single agent is like everyone writing everything on the same sheet of paper: logs, plans, code snippets, errors, requirements, and test outputs all mix together.

### Suggested visual

**Single Agent Context Pollution**

```text
search logs
code snippets
errors
plans
requirements
test outputs
```

Side labels:

```text
Hard to focus
Hard to preserve constraints
Hard to scale
```

---

## 3.2 Subagent: Give a Local Task Its Own Paper

### Core idea

A subagent is a specialized assistant with an independent context.

> The main agent gives a local task to a specialized subagent. The subagent works on its own paper and returns only a summary to the main paper.

### Key value

- **Context isolation**: noisy research and logs do not pollute the main context.
- **Specialization**: different subagents can have different roles, rules, and tools.
- **Parallelization**: independent tasks can run in parallel.
- **Permission control**: different subagents can have different permissions.
- **Cost control**: simple tasks can use lighter models; complex tasks can use stronger models.

### Suggested visual

**Main Agent + Subagents**

```text
Main Agent
   ├── Research Subagent
   ├── Code Review Subagent
   ├── Test Writer Subagent
   └── Security Subagent
```

Each subagent has its own small paper, and returns a summary.

---

## 3.3 When to Use Subagents

### Use subagents for:

1. **Large reading / search**
   - Search a codebase.
   - Read documentation.
   - Compare multiple options.

2. **Parallel reviews**
   - Security review.
   - Performance review.
   - Maintainability review.
   - Test coverage review.

3. **Specialized roles**
   - Database migration reviewer.
   - API design reviewer.
   - Accessibility checker.
   - DevOps deployment checker.

4. **Risk isolation**
   - Read-only subagent.
   - No file write access.
   - Restricted directory access.
   - Safe command-only execution.

### Avoid subagents when:

- The task is very small.
- Shared context must be continuous.
- Subtasks are tightly coupled.
- Merging results costs more than the split saves.
- The main agent can finish the task simply.

### Suggested visual

**When to Use Subagents**

```text
Use Subagent
- noisy research
- specialized review
- parallel checks
- isolated permissions

Stay Main Agent
- small task
- tightly coupled task
- simple edit
```

---

## 3.4 Workflow: Passing Papers Through Stable Steps

### Core idea

Workflow means splitting AI work into stable steps with defined input, output, owner, and gates.

Example software workflow:

```text
Requirement
  ↓
Clarify
  ↓
Plan
  ↓
Implement
  ↓
Test
  ↓
Review
  ↓
Fix
  ↓
Document
```

### Paper Model explanation

> Workflow is a rule for passing papers across steps. Each step writes a clear artifact onto the paper, then passes it forward.

### Suggested visual

**AI Coding Workflow Pipeline**

```text
Spec → Plan → Implement → Run → Verify → Review → Merge
```

---

## 3.5 Workflow Design Principles

A good AI workflow has:

1. **Clear goal per step**
   - Not “finish everything.”
   - Instead: “produce the design plan first.”

2. **Clear input per step**
   - Requirement doc.
   - Code scope.
   - Error logs.
   - Test result.

3. **Clear output per step**
   - Plan.
   - Diff.
   - Test result.
   - Review report.

4. **Gates between steps**
   - Human confirmation.
   - Automated tests.
   - Lint.
   - Typecheck.
   - Policy gate.

5. **Fallback strategy**
   - Re-plan.
   - Reduce scope.
   - Ask a human.
   - Roll back.

### Suggested visual

**Workflow Contract**

Each node includes:

```text
Input
Action
Output
Gate
```

---

## 3.6 Teammate: AI Is Not a Button

### Core idea

Chatbot:

```text
Q → A
Q → A
Q → A
```

Teammate:

```text
Goal
Plan
Execute
Verify
Report
Iterate
```

A teammate:

- Understands goals.
- Breaks tasks into steps.
- Explains plans.
- Requests confirmation at key points.
- Reads project context.
- Uses tools.
- Reports progress.
- Fixes based on tests and errors.
- Produces deliverables.

### Paper Model explanation

> A teammate does not only answer on the paper. It continuously maintains the paper: goals, plan, risks, next steps, and tool observations.

### Suggested visual

**Chatbot vs Teammate**

---

## 3.7 Collaboration Boundaries

### Core idea

An AI teammate is not full autonomy.

It needs boundaries:

- Which files can be modified.
- Which commands can run.
- Which actions need confirmation.
- Which conclusions require evidence.
- Which tasks must remain human decisions.
- When to stop instead of retrying blindly.

### Suggested engineering rules

```text
AI can:
- inspect code
- propose plan
- edit scoped files
- run tests
- summarize changes
```

```text
AI must ask before:
- deleting files
- changing architecture
- modifying production config
- running destructive commands
- touching secrets
```

### Suggested visual

**Autonomy Boundaries**

```text
Allowed automatically
Needs approval
Forbidden
```

---

## 3.8 Loop Coding

### Core idea

AI coding should not be understood as:

```text
Prompt → Code
```

It should be understood as:

```text
Prompt → Code → Run → Observe → Fix → Run again → Verify
```

### Paper Model explanation

Each loop:

1. AI writes a code-change plan on the paper.
2. Harness / tools execute file changes.
3. Harness runs tests or commands.
4. Error logs are written back to the paper.
5. AI reads the error logs.
6. AI modifies the code.
7. The loop runs again.

### Key phrase

> AI coding is not one-shot generation. It is feedback-driven iteration.

### Suggested visual

**Loop Coding Cycle**

```text
Plan
  ↓
Edit
  ↓
Run
  ↓
Observe
  ↓
Fix
  ↓
Verify
  ↺
```

---

## 3.9 Loop Coding Engineering Practice

Recommended flow:

1. **Let AI read the project first**
   - Understand directory structure.
   - Find relevant files.
   - Do not modify immediately.

2. **Ask AI to write a plan first**
   - Which files will change.
   - Why they will change.
   - What risks exist.
   - How to verify.

3. **Small-step editing**
   - One local goal per step.
   - Avoid broad refactoring.

4. **Automated verification**
   - Run tests.
   - Typecheck.
   - Lint.
   - Build.
   - Smoke test.

5. **Write errors back into context**
   - Do not just say “it failed.”
   - Provide logs, commands, and environment information.

6. **Loop-based repair**
   - Let AI fix based on real errors.
   - Do not let AI guess.

7. **Final review**
   - Diff summary.
   - Risk list.
   - Test evidence.
   - Follow-up tasks.

### Suggested visual

**Practical Loop Coding Checklist**

---

## 3.10 Hooks / Automation Control Points

### Core idea

Hooks are deterministic automation points in the AI workflow.

### Course explanation

> Prompt asks the model to do something. Hook makes the software system ensure something happens.

Examples:

- Automatically format code after file edits.
- Intercept dangerous commands.
- Write failed test logs back into context.
- Re-inject key context after compacting.
- Generate summary at task completion.

### Suggested visual

**Hook Points in Loop**

```text
Before Tool Use
After File Edit
After Test Run
On Error
On Compact
On Finish
```

---

## 3.11 End-to-End Example: AI Code Change

### Task

```text
Add an API endpoint to an existing project, with tests and documentation.
```

### Workflow

```text
1. Main agent reads requirement
2. Research subagent explores relevant files
3. Main agent creates implementation plan
4. Human confirms scope
5. Implementation agent edits code
6. Test agent writes tests
7. Harness runs tests
8. Error logs return to context
9. AI fixes failures
10. Review subagent reviews diff
11. Main agent summarizes final result
```

### Teaching points

- Which content stays on the main paper.
- Which content stays on subagent papers.
- Which actions are written by the model.
- Which actions are executed by Harness.
- Which steps require human confirmation.
- Which verification should be automated.

### Suggested visual

**End-to-End Agentic Coding System**

---

## 3.12 From Q&A to Engineering-Grade AI Collaboration

### Core idea

Evolution:

```text
Chatbot
  ↓
Single Agent
  ↓
Custom Agent
  ↓
Subagents
  ↓
Workflow
  ↓
AI Teammate
  ↓
Loop Coding System
```

### Key phrase

> When tasks become complex, do not just write longer prompts. Design better context isolation, tool boundaries, execution workflows, and feedback loops.

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

Lesson 2: Harness
Understand who manages the paper, pre-prints rules, parses tool calls, and executes external actions.
Instructions / Custom Agent / Skills / Tool Runtime

        ↓

Lesson 3: Agentic Workflow
Understand how to use multiple papers, roles, steps, and loops for complex work.
Subagent / Workflow / Teammate / Loop Coding
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

1. **Model vs Harness**
   - Model generates tokens; Harness manages environment.

2. **Harness as Paper Manager**
   - Harness prepares paper, injects rules, reads tool calls, writes results.

3. **Harness Responsibility Wheel**
   - Context, instructions, tools, validation, execution, observation, loop, logging.

4. **User Instructions as Sticky Notes**
   - Long-term preferences attached to the paper.

5. **Custom Agent Template**
   - Role, goal, tools, permissions, output format.

6. **Skill Library**
   - Reusable skill cards.

7. **Tool Call Lifecycle**
   - Proposed → Parsed → Validated → Executed → Observed → Answered.

8. **Tool / Skill / Agent / Harness Comparison**
   - Four-way comparison.

9. **From Prompt Engineering to Harness Engineering**
   - Course summary visual.

---

## Lesson 3 Images

1. **Single Agent Context Pollution**
   - One paper overloaded with logs, plans, code, errors, and tests.

2. **Main Agent + Subagents**
   - Main agent delegates tasks to specialized subagents.

3. **Subagent Context Isolation**
   - Subagent uses an independent paper and returns summary.

4. **When to Use Subagents**
   - Good and bad use cases.

5. **Workflow Pipeline**
   - Spec → Plan → Implement → Test → Review → Fix → Document.

6. **Workflow Contract**
   - Each step has Input / Action / Output / Gate.

7. **Chatbot vs Teammate**
   - Q&A mode vs collaboration mode.

8. **Autonomy Boundaries**
   - Allowed automatically / Needs approval / Forbidden.

9. **Loop Coding Cycle**
   - Plan → Edit → Run → Observe → Fix → Verify.

10. **End-to-End Agentic Coding System**
   - Main agent, subagents, tools, tests, review, human checkpoint.

---

# Recommended Course Titles

## Lesson 1

**AI Fundamentals: Model, Token, Context, and Tools**  
Chinese subtitle: 从递纸条理解 AI 如何工作

## Lesson 2

**Harness Engineering: Instructions, Agents, Skills, and Tool Runtime**  
Chinese subtitle: 让模型变成可用系统的软件层

## Lesson 3

**Agentic Workflows: Subagents, Teammates, and Loop Coding**  
Chinese subtitle: 从单次问答走向工程化 AI 协作

---

# Final Course Logic

> Lesson 1 helps learners understand that AI is not magic. It reads and writes limited context.  
> Lesson 2 helps learners understand that real AI products need Harness to manage context, tools, and execution.  
> Lesson 3 helps learners understand that complex engineering work needs subagents, workflows, teammates, and loops instead of merely longer prompts.
