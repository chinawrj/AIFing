# Lesson 2 Assets

Lesson 2: **Custom Prompts at Scale: Custom Agents, Subagents, and Skills**

这些图片服务于课程第二部分，用来解释如何把 Lesson 1 中的 custom prompts 规模化：稳定角色打包成 custom agents，低耦合任务拆给 subagents，不确定是否需要的 prompt 做成按需加载的 skills。

## Training Deliverables

- [PowerPoint deck](../../decks/lesson-02-custom-prompts-at-scale.pptx)
- [Legacy-compatible deck filename](../../decks/lesson-02-harness-engineering.pptx)
- [Presenter guide](presenter-guide.md)
- [Sources](sources.md)

## Visual Index

| File | Course Section | Purpose |
|---|---|---|
| `assets/slide-01.png` | 2.1 Custom Prompts at Scale | 从 Lesson 1 的一张 paper 过渡到 prompt 复用、隔离、按需加载 |
| `assets/slide-02.png` | 2.2 Copy-Paste Problem | 说明把所有 custom prompts 塞进一张 paper 会造成 context 压力 |
| `assets/slide-03.png` | 2.3 Custom Agent | 解释 custom agent 是稳定 custom prompt 的工程化复用形态 |
| `assets/slide-04.png` | 2.4 Subagent | 解释 subagent 是带有独立 paper 的 delegated run |
| `assets/slide-05.png` | 2.5 Compaction vs Proactive Split | 对比 reactive compaction 和 proactive multi-paper split |
| `assets/slide-06.png` | 2.6 Merge Boundaries | 说明什么任务适合交给 subagents，什么任务需要更谨慎 |
| `assets/slide-07.png` | 2.7 Skill | 解释 skill 是按需加载的 prompt/manual pack |
| `assets/slide-08.png` | 2.8 Skill Folder | 说明 skill 可以和 scripts、examples、templates、references 组织在一起 |
| `assets/slide-09.png` | 2.9 Selection Rule | 对比 one-off prompt、custom agent、subagent、skill 的使用场景 |
| `assets/slide-10.png` | 2.10 Prompt Loading Strategy | 收束到 prompt loading strategy，并引出 Lesson 2.1 和 Lesson 3 |

## Images

### 2.1 Custom Prompts at Scale

![Custom Prompts at Scale](assets/slide-01.png)

### 2.2 Copy-Paste Problem

![Copy-Paste Problem](assets/slide-02.png)

### 2.3 Custom Agent

![Custom Agent](assets/slide-03.png)

### 2.4 Subagent

![Subagent](assets/slide-04.png)

### 2.5 Compaction vs Proactive Split

![Compaction vs Proactive Split](assets/slide-05.png)

### 2.6 Merge Boundaries

![Merge Boundaries](assets/slide-06.png)

### 2.7 Skill

![Skill](assets/slide-07.png)

### 2.8 Skill Folder

![Skill Folder](assets/slide-08.png)

### 2.9 Selection Rule

![Selection Rule](assets/slide-09.png)

### 2.10 Prompt Loading Strategy

![Prompt Loading Strategy](assets/slide-10.png)
