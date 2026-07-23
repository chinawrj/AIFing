# AI Training Course

这是一个围绕 **Paper Model / 递纸条模型** 构建的 AI 学习课程仓库。

课程核心比喻：

> 与 AI 互动，就像用户、AI 模型和传统软件系统在一张容量有限的共享纸上写内容。

## Repository Structure

```text
.
├── docs/
│   ├── course-outline.md
│   ├── chapter-01-01-advanced/
│   │   ├── outline.md
│   │   ├── presenter-guide.md
│   │   └── assets/
│   │       ├── slide-01.png
│   │       └── ...
│   ├── lesson-01/
│   │   ├── README.md
│   │   ├── presenter-guide.md
│   │   └── assets/
│   │       ├── 01-ai-company-model-product.png
│   │       ├── ...
│   │       └── 12-minimal-ai-system-architecture.png
│   ├── lesson-02/
│   │   ├── README.md
│   │   ├── presenter-guide.md
│   │   └── assets/
│   │       ├── slide-01.png
│   │       └── ...
│   ├── lesson-02-01-advanced/
│       ├── outline.md
│       ├── presenter-guide.md
│       └── assets/
│           ├── slide-01.png
│           └── ...
│   └── lesson-03/
│       ├── README.md
│       ├── presenter-guide.md
│       └── assets/
│           ├── slide-01.png
│           └── ...
├── decks/
│   ├── chapter-01-01-advanced-context-cache.pptx
│   ├── lesson-03-agentic-workflows.pptx
│   ├── lesson-02-custom-prompts-at-scale.pptx
│   ├── lesson-02-harness-engineering.pptx
│   ├── lesson-02-01-advanced-harness-objects.pptx
│   └── lesson-01-ai-fundamentals.pptx
└── README.md
```

## Content

- [Course outline](docs/course-outline.md)
- [Project agent instructions](AGENTS.md)
- [Lesson 1 assets](docs/lesson-01/README.md)
- [Lesson 1 presenter guide](docs/lesson-01/presenter-guide.md)
- [Lesson 1 PowerPoint deck](decks/lesson-01-ai-fundamentals.pptx)
- [Lesson 1 Advanced Add-on outline](docs/chapter-01-01-advanced/outline.md)
- [Lesson 1 Advanced Add-on presenter guide](docs/chapter-01-01-advanced/presenter-guide.md)
- [Lesson 1 Advanced Add-on PowerPoint deck](decks/chapter-01-01-advanced-context-cache.pptx)
- [Lesson 2 assets](docs/lesson-02/README.md)
- [Lesson 2 presenter guide](docs/lesson-02/presenter-guide.md)
- [Lesson 2 sources](docs/lesson-02/sources.md)
- [Lesson 2 PowerPoint deck](decks/lesson-02-custom-prompts-at-scale.pptx)
- [Lesson 2 legacy-compatible deck filename](decks/lesson-02-harness-engineering.pptx)
- [Lesson 2 Advanced Add-on outline](docs/lesson-02-01-advanced/outline.md)
- [Lesson 2 Advanced Add-on presenter guide](docs/lesson-02-01-advanced/presenter-guide.md)
- [Lesson 2 Advanced Add-on PowerPoint deck](decks/lesson-02-01-advanced-harness-objects.pptx)
- [Lesson 3 assets](docs/lesson-03/README.md)
- [Lesson 3 presenter guide](docs/lesson-03/presenter-guide.md)
- [Lesson 3 sources](docs/lesson-03/sources.md)
- [Lesson 3 PowerPoint deck](decks/lesson-03-agentic-workflows.pptx)

## Current Status

- Lesson 1 outline is drafted.
- Twelve visual assets for Lesson 1 have been added.
- Lesson 1 has a 12-slide PowerPoint deck for training delivery.
- Lesson 1 has a presenter guide with slide flow and transition notes.
- Lesson 1 Advanced Add-on (`1.1`) adds a 6-slide deck on visible paper, prompt cache, cache write/read, and stable-prefix design.
- Lesson 2 has a 10-slide PowerPoint deck on scaling custom prompts through custom agents, subagents, and skills.
- Lesson 2 Advanced Add-on (`2.1`) adds a 6-slide deck on harness objects and runtime contracts.
- Lesson 3 has an 11-slide PowerPoint deck on systematic subagent orchestration, workflow gates, compaction strategy, and Goodhart risk control.
- Later lessons can follow the same directory pattern under `docs/lesson-04/`, `docs/lesson-05/`, etc.

## License

Course materials in `docs/`, `decks/`, and visual assets are licensed under
[CC BY-SA 4.0](LICENSE-CONTENT). This is the Wikipedia-style open knowledge
license: free to share and adapt, with attribution and the same license for
adapted versions.

Code in `scripts/` is licensed under the [MIT License](LICENSE-CODE).
