import fs from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";

const artifactToolModule =
  process.env.ARTIFACT_TOOL_MODULE ??
  "/tmp/codex-presentations/aifing-lesson-01/tmp/node_modules/@oai/artifact-tool/dist/artifact_tool.mjs";
const { Presentation, PresentationFile } = await import(
  pathToFileURL(artifactToolModule).href
);

const repoRoot = "/Users/rjwang/Documents/AIFing";
const outputPath = path.join(repoRoot, "decks", "lesson-01-ai-fundamentals.pptx");
const previewDir = "/tmp/codex-presentations/aifing-lesson-01/tmp/preview";

const BLUE = "#004aad";
const NAVY = "#061a45";
const LIGHT_BLUE = "#eef6ff";
const BORDER = "#b9d4f6";
const GREEN = "#157a3d";
const YELLOW = "#fff7df";

const slides = [
  {
    kind: "native-overview",
    file: "01-ai-company-model-product.png",
    title: "AI Basics: Company, Model, Tool",
    notes:
      "Start by separating the layers. Anthropic and OpenAI are providers, Claude and GPT are model families, and Claude Code, Codex, and opencode are coding products or agents around models. Next, zoom into what the model itself can actually see and do through the Paper Model.",
  },
  {
    file: "02-ai-paper-interaction.png",
    title: "AI Hello World",
    notes:
      "Introduce the paper model. AI does not read minds or directly touch the world; it reads what is on the shared paper and writes back to that paper.",
  },
  {
    file: "03-tokenization.png",
    title: "Token",
    notes:
      "Shift from the human view to the model view. Humans see words and formatting; the model receives token sequences and predicts following tokens.",
  },
  {
    file: "04-single-turn-model-input.png",
    title: "A Single Turn Becomes Model Input",
    notes:
      "Bridge token and context. A latest user message is not isolated; it is combined with the visible context before the model reads it.",
  },
  {
    file: "05-system-prompt.png",
    title: "System Prompt",
    notes:
      "Explain that the paper is not blank. System prompts are pre-printed rules that shape role, boundaries, style, output format, and tool behavior.",
  },
  {
    file: "06-context-everything-visible.png",
    title: "Context",
    notes:
      "Define context as everything currently visible to the model: instructions, user input, history, files, retrieved information, and tool results.",
  },
  {
    file: "07-context-window.png",
    title: "Context Window",
    notes:
      "Correct the memory misconception. Context window is current working space, not long-term memory. Longer conversations consume more of the paper.",
  },
  {
    file: "08-context-overflow.png",
    title: "Context Overflow",
    notes:
      "Show the consequence of limited space. When the paper is full, systems may drop, keep, summarize, or retrieve content. This explains many drift and forgetting failures.",
  },
  {
    file: "09-compacting-summarization.png",
    title: "Compacting / Summarization",
    notes:
      "Make compacting concrete. It preserves high-level state but can lose exact wording, edge details, and formatting constraints.",
  },
  {
    file: "10-instruction-hierarchy.png",
    title: "Instruction Hierarchy",
    notes:
      "Pivot toward system design. Visible text still has priority levels; a model does not simply obey the last sentence it sees.",
  },
  {
    file: "11-tool-use.png",
    title: "Tool Use",
    notes:
      "Emphasize the engineering distinction. The model writes a structured request; the harness parses, validates, checks permissions, executes, and writes results back.",
  },
  {
    file: "12-minimal-ai-system-architecture.png",
    title: "Minimal AI System Architecture",
    notes:
      "Synthesize the lesson. Correct architecture is model with context, harness with context and tools, and no direct model-to-tools connection.",
  },
];

async function writeBlob(filePath, blob) {
  await fs.writeFile(filePath, new Uint8Array(await blob.arrayBuffer()));
}

function addShape(slide, { left, top, width, height, fill = "white", line = BORDER, radius = "rounded-lg", shadow = undefined }) {
  return slide.shapes.add({
    geometry: "roundRect",
    position: { left, top, width, height },
    fill,
    line: { style: "solid", fill: line, width: 1.2 },
    borderRadius: radius,
    ...(shadow ? { shadow } : {}),
  });
}

function addText(slide, text, { left, top, width, height, fontSize = 20, color = NAVY, bold = false, italic = false, align = "left" }) {
  const box = slide.shapes.add({
    geometry: "textbox",
    position: { left, top, width, height },
    fill: "none",
    line: { style: "solid", fill: "none", width: 0 },
  });
  box.text = text;
  box.text.style = { fontSize, color, bold, italic, alignment: align };
  return box;
}

function addOverviewSlide(presentation) {
  const slide = presentation.slides.add();
  slide.background.fill = "white";

  addText(slide, "AI Basics: Company, Model, Tool", {
    left: 48,
    top: 32,
    width: 820,
    height: 58,
    fontSize: 44,
    color: NAVY,
    bold: true,
  });
  addText(slide, "Separate the layers before you reason about AI systems.", {
    left: 292,
    top: 92,
    width: 700,
    height: 32,
    fontSize: 22,
    color: BLUE,
    italic: true,
    align: "center",
  });
  slide.shapes.add({
    geometry: "line",
    position: { left: 48, top: 124, width: 1184, height: 0 },
    line: { style: "solid", fill: BLUE, width: 2 },
  });

  const headers = ["Layer", "What it is", "Examples", "Paper Model role", "Do not confuse with"];
  const colX = [48, 178, 418, 675, 965];
  const colW = [116, 226, 242, 276, 267];
  const headerTop = 154;
  const rowTop = 198;
  const rowH = 88;

  addShape(slide, { left: 48, top: headerTop, width: 1184, height: 48, fill: BLUE, line: BLUE, radius: "rounded-lg" });
  for (let i = 0; i < headers.length; i++) {
    addText(slide, headers[i], {
      left: colX[i] + 10,
      top: headerTop + 12,
      width: colW[i] - 20,
      height: 26,
      fontSize: 16,
      color: "white",
      bold: true,
      align: i === 0 ? "center" : "left",
    });
  }

  const rows = [
    {
      layer: "AI Company\nProvider",
      what: "Trains, provides,\nor operates model\nfamilies.",
      examples: "Anthropic\nOpenAI",
      role: "Supplies models and\nproduct surfaces.",
      avoid: "Not the model itself.",
      fill: "#f8fbff",
    },
    {
      layer: "Model family",
      what: "Reads context and\ngenerates tokens.",
      examples: "Claude series\nGPT series",
      role: "The token generator\ninside the paper loop.",
      avoid: "Not the IDE or app.",
      fill: "#eef6ff",
    },
    {
      layer: "AI Tool / IDE\nAgent",
      what: "Wraps models with\ncodebase context,\nediting, shell, and UI.",
      examples: "Claude Code\nCodex\nopencode",
      role: "Builds the paper,\nasks the model,\nthen applies changes.",
      avoid: "Not a model family.",
      fill: "#f8fbff",
    },
    {
      layer: "Harness /\nRuntime",
      what: "Manages instructions,\ntools, permissions,\nand tool results.",
      examples: "Inside coding agents\nand AI products",
      role: "Executes tools and\nwrites results back\nto the paper.",
      avoid: "Not the AI company.",
      fill: "#eef6ff",
    },
  ];

  rows.forEach((row, r) => {
    const top = rowTop + r * rowH;
    addShape(slide, { left: 48, top, width: 1184, height: rowH - 4, fill: row.fill, line: BORDER, radius: "rounded-md" });
    const vals = [row.layer, row.what, row.examples, row.role, row.avoid];
    for (let i = 0; i < vals.length; i++) {
      const textColor = i === 2 ? GREEN : NAVY;
      addText(slide, vals[i], {
        left: colX[i] + 10,
        top: top + 12,
        width: colW[i] - 20,
        height: rowH - 24,
        fontSize: i === 0 ? 16 : 15,
        color: textColor,
        bold: i === 0 || i === 2,
        align: i === 0 ? "center" : "left",
      });
    }
    for (let i = 1; i < colX.length; i++) {
      slide.shapes.add({
        geometry: "line",
        position: { left: colX[i] - 6, top: top + 8, width: 0, height: rowH - 20 },
        line: { style: "solid", fill: "#d7e6fb", width: 1 },
      });
    }
  });

  addShape(slide, { left: 48, top: 570, width: 1184, height: 94, fill: YELLOW, line: "#f0d891", radius: "rounded-lg", shadow: "shadow-sm" });
  addText(slide, "Example stacks", {
    left: 72,
    top: 592,
    width: 180,
    height: 32,
    fontSize: 22,
    color: BLUE,
    bold: true,
  });
  addText(slide, "Anthropic → Claude series → Claude Code", {
    left: 270,
    top: 584,
    width: 390,
    height: 26,
    fontSize: 17,
    color: NAVY,
    bold: true,
  });
  addText(slide, "OpenAI → GPT series → Codex", {
    left: 270,
    top: 620,
    width: 360,
    height: 26,
    fontSize: 17,
    color: NAVY,
    bold: true,
  });
  addText(slide, "opencode is an open-source coding agent that can connect to multiple providers/models.", {
    left: 690,
    top: 592,
    width: 470,
    height: 48,
    fontSize: 17,
    color: NAVY,
  });

  slide.speakerNotes.textFrame.setText(slides[0].notes);
  slide.speakerNotes.setVisible(true);
  return slide;
}

async function main() {
  await fs.mkdir(path.dirname(outputPath), { recursive: true });
  await fs.mkdir(previewDir, { recursive: true });

  const presentation = Presentation.create({
    slideSize: { width: 1280, height: 720 },
  });

  for (const item of slides) {
    if (item.kind === "native-overview") {
      const slide = addOverviewSlide(presentation);
      const png = await presentation.export({ slide, format: "png", scale: 1 });
      await writeBlob(path.join(repoRoot, "docs", "lesson-01", "assets", item.file), png);
      continue;
    }

    const slide = presentation.slides.add();
    slide.background.fill = "white";
    const imagePath = path.join(repoRoot, "docs", "lesson-01", "assets", item.file);
    const imageBytes = await fs.readFile(imagePath);
    slide.images.add({
      blob: imageBytes,
      contentType: "image/png",
      alt: item.title,
      fit: "contain",
      position: { left: 0, top: 0, width: 1280, height: 720 },
    });
    slide.speakerNotes.textFrame.setText(item.notes);
    slide.speakerNotes.setVisible(true);
  }

  for (const [index, slide] of presentation.slides.items.entries()) {
    const stem = `slide-${String(index + 1).padStart(2, "0")}`;
    await writeBlob(path.join(previewDir, `${stem}.png`), await presentation.export({ slide, format: "png", scale: 1 }));
    const layout = await slide.export({ format: "layout" });
    await fs.writeFile(path.join(previewDir, `${stem}.layout.json`), await layout.text());
  }

  await writeBlob(path.join(previewDir, "lesson-01-montage.webp"), await presentation.export({
    format: "webp",
    montage: true,
    scale: 1,
  }));

  const pptx = await PresentationFile.exportPptx(presentation);
  await pptx.save(outputPath);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
