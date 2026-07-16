import fs from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";

const artifactToolModule =
  process.env.ARTIFACT_TOOL_MODULE ??
  "/tmp/codex-presentations/aifing-lesson-02/tmp/node_modules/@oai/artifact-tool/dist/artifact_tool.mjs";
const { Presentation, PresentationFile } = await import(pathToFileURL(artifactToolModule).href);

const repoRoot = "/Users/rjwang/Documents/AIFing";
const outputPath = path.join(repoRoot, "decks", "lesson-02-custom-prompts-at-scale.pptx");
const legacyOutputPath = path.join(repoRoot, "decks", "lesson-02-harness-engineering.pptx");
const assetDir = path.join(repoRoot, "docs", "lesson-02", "assets");

const slideMeta = [
  {
    notes:
      "Lesson 2 starts where Lesson 1 ended: prompts are written onto a limited paper. This lesson is about scaling prompt-like instructions without crowding the same context.",
  },
  {
    notes:
      "Show why copy-pasting custom prompts breaks down. The model still only sees one paper, so duplicated rules compete with the actual task.",
  },
  {
    notes:
      "A custom agent packages a stable role and working profile. Treat it as a reusable worker identity, not a longer one-off prompt.",
  },
  {
    notes:
      "A subagent is a delegated worker with its own paper. The main thread sends a bounded brief and receives a summary or artifact back.",
  },
  {
    notes:
      "Compaction compresses one crowded paper. Subagent decomposition proactively gives weakly coupled branches their own papers before detail is compressed away.",
  },
  {
    notes:
      "Subagents work best when local papers can make progress and rejoin through a clear merge artifact. Coupling is a synchronization question, not an automatic ban.",
  },
  {
    notes:
      "Skills solve the conditional-loading problem. Keep a method outside the paper until the task actually needs that manual or checklist.",
  },
  {
    notes:
      "A skill can be a small capability kit. It can keep workflow instructions, scripts, examples, templates, and references together.",
  },
  {
    notes:
      "This slide gives the selection rule: one-off prompt, custom agent, subagent, and skill each solve a different context-loading problem.",
  },
  {
    notes:
      "Close with the operating model: prompt engineering writes instructions; context architecture decides where those instructions travel.",
  },
];

async function main() {
  await fs.mkdir(path.dirname(outputPath), { recursive: true });

  const deck = Presentation.create({ slideSize: { width: 1280, height: 720 } });
  for (const [index, meta] of slideMeta.entries()) {
    const slide = deck.slides.add();
    slide.background.fill = "white";
    const imagePath = path.join(assetDir, `slide-${String(index + 1).padStart(2, "0")}.png`);
    slide.images.add({
      blob: await fs.readFile(imagePath),
      contentType: "image/png",
      alt: `Lesson 2 full-page AI generated infographic slide ${index + 1}`,
      fit: "contain",
      position: { left: 0, top: 0, width: 1280, height: 720 },
    });
    slide.speakerNotes.textFrame.setText(meta.notes);
    slide.speakerNotes.setVisible(true);
  }

  const pptx = await PresentationFile.exportPptx(deck);
  await pptx.save(outputPath);
  await pptx.save(legacyOutputPath);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
