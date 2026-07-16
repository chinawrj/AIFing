# Project Instructions

This repository is an AI training course built around the Paper Model.

## Deck Visual Standard

For learner-facing PowerPoint decks in this project, the default slide format is:

- Each slide is a complete 16:9 AI-generated PNG infographic.
- The PPTX should embed that PNG as one full-page image per slide.
- Do not rebuild lesson slides as programmatic PowerPoint shape diagrams unless the user explicitly asks for an editable/developer version.
- Do not mix generated illustration fragments with PPT text layers for the final learner-facing deck unless the user explicitly asks for that hybrid approach.

Lesson 1 is the style reference. New lesson slides should match its visual grammar:

- white background
- large dark navy title
- top-left document icon
- thin blue divider line
- central paper/context visual
- right-side `Key idea` panel
- bottom `Mental model` bar
- polished user/AI/paper/tool illustrations with soft shadows

## PNG Generation Workflow

When creating or improving a deck:

1. Generate full-page slide PNGs with the image generation model.
2. Use the existing lesson outline and current slide image as content references.
3. Use Lesson 1 slide images as the style reference.
4. Save final slide PNGs under `docs/<lesson>/assets/slide-XX.png`.
5. Build the PPTX by placing each PNG full-page on a blank slide.
6. Preserve speaker notes in the deck generation script.

The final PPTX should pass this structural check:

- each slide has exactly one picture
- each slide has zero PowerPoint text nodes

This means all learner-visible text is part of the slide PNG itself.

## Text QA

Full-page AI image generation can introduce text errors. Treat text QA as a hard gate:

- Provide exact slide text in the image generation prompt.
- Inspect generated PNGs visually before accepting them.
- Regenerate any slide with misspelled, garbled, missing, duplicated, or low-readability text.
- Do not ship a slide with known visible text errors.

## Concept Integrity

The visual style should never weaken the course idea. Paper/context remains the main metaphor.

For Lesson 2 specifically:

- custom prompts are instructions written onto paper/context
- custom agents package stable worker profiles
- subagents get their own scoped papers
- skills dynamically load method/resource prompts only when needed
- complex tasks may need multiple papers, like solving a hard math or physics problem on several scratch papers
- reactive compaction passes compressed state between papers
- proactive subagent split keeps local papers intact and lets the main paper collect bounded results

Avoid overstating that subagents can never compact. The safer teaching point is:

> Scope each subagent so it can finish before local compaction becomes necessary.

