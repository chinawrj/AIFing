import fs from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { execFile } from "node:child_process";
import { promisify } from "node:util";

const artifactToolModule =
  process.env.ARTIFACT_TOOL_MODULE ??
  "/tmp/codex-presentations/aifing-lesson-01/tmp/node_modules/@oai/artifact-tool/dist/artifact_tool.mjs";
const { Presentation, PresentationFile } = await import(
  pathToFileURL(artifactToolModule).href
);
const execFileAsync = promisify(execFile);

const repoRoot = "/Users/rjwang/Documents/AIFing";
const outputPath = path.join(repoRoot, "decks", "lesson-01-ai-fundamentals.pptx");
const previewDir = "/tmp/codex-presentations/aifing-lesson-01/tmp/preview";
const assetScale = 1672 / 1280;

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
    kind: "native-overflow",
    file: "08-context-overflow.png",
    title: "Context Overflow",
    notes:
      "Show the consequence of limited space. When the paper is full, the system chooses what remains visible for this call. Older messages may be dropped, summarized, selected, or retrieved back into the paper.",
  },
  {
    file: "09-compacting-summarization.png",
    title: "Compacting / Summarization",
    notes:
      "Make compacting concrete. It preserves high-level state but can lose exact wording, edge details, and formatting constraints.",
  },
  {
    kind: "native-hierarchy",
    file: "10-instruction-hierarchy.png",
    title: "Instruction Hierarchy",
    notes:
      "Pivot toward system design. Separate instruction authority from context data. Data such as tool outputs and retrieved notes can inform the answer, but they do not override higher-priority instructions.",
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

async function normalizeLessonAsset(filePath) {
  await execFileAsync("/usr/bin/sips", [
    "--padToHeightWidth",
    "941",
    "1672",
    "--padColor",
    "FFFFFF",
    filePath,
  ]);
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

function addLine(slide, { left, top, width, height = 0, color = BLUE, weight = 2, arrow = false, dash = undefined }) {
  slide.shapes.add({
    geometry: "line",
    position: { left, top, width, height },
    line: {
      style: "solid",
      fill: color,
      width: weight,
      ...(arrow ? { endArrowType: "triangle" } : {}),
      ...(dash ? { dash } : {}),
    },
  });
}

function addHeader(slide, title, subtitle) {
  addText(slide, title, {
    left: 48,
    top: 28,
    width: 1060,
    height: 58,
    fontSize: 42,
    color: NAVY,
    bold: true,
  });
  addText(slide, subtitle, {
    left: 220,
    top: 88,
    width: 840,
    height: 30,
    fontSize: 20,
    color: BLUE,
    italic: true,
    align: "center",
  });
  addLine(slide, { left: 48, top: 122, width: 1184 });
}

function addBulletRow(slide, { icon, title, body, left, top, width, height = 78, iconColor = BLUE, fill = "white", line = BORDER }) {
  addShape(slide, { left, top, width, height, fill, line, radius: "rounded-lg" });
  addShape(slide, { left: left + 16, top: top + 12, width: 34, height: 34, fill: iconColor, line: iconColor, radius: "rounded-full" });
  addText(slide, icon, { left: left + 26, top: top + 18, width: 14, height: 18, fontSize: 15, color: "white", bold: true, align: "center" });
  addText(slide, title, { left: left + 66, top: top + 9, width: width - 82, height: 22, fontSize: 17, color: iconColor, bold: true });
  addText(slide, body, { left: left + 66, top: top + 31, width: width - 82, height: 18, fontSize: 14, color: NAVY });
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

function addContextOverflowSlide(presentation) {
  const slide = presentation.slides.add();
  slide.background.fill = "white";
  addHeader(
    slide,
    "Context Overflow: Choose What Stays Visible",
    "When the paper is full, the next call only uses the selected visible content."
  );

  addShape(slide, { left: 58, top: 170, width: 250, height: 330, fill: "#fff5f5", line: "#f0b5b5" });
  addText(slide, "Older content", { left: 90, top: 198, width: 186, height: 30, fontSize: 24, color: "#cc2b2b", bold: true, align: "center" });
  ["User message", "AI response", "Tool result", "Old constraint"].forEach((label, i) => {
    addShape(slide, { left: 92, top: 250 + i * 54, width: 180, height: 40, fill: "white", line: "#f0b5b5", radius: "rounded-md" });
    addText(slide, label, { left: 108, top: 260 + i * 54, width: 148, height: 20, fontSize: 15, color: NAVY, bold: i === 3, align: "center" });
  });
  addText(slide, "May leave the visible paper", { left: 100, top: 444, width: 164, height: 46, fontSize: 18, color: "#cc2b2b", bold: true, align: "center" });

  addShape(slide, { left: 364, top: 164, width: 560, height: 328, fill: "#fbfdff", line: BORDER, radius: "rounded-lg", shadow: "shadow-sm" });
  addText(slide, "Visible paper for this call", { left: 430, top: 190, width: 428, height: 30, fontSize: 24, color: BLUE, bold: true, align: "center" });
  addShape(slide, { left: 408, top: 238, width: 472, height: 190, fill: "white", line: BLUE, radius: "rounded-lg" });
  addLine(slide, { left: 408, top: 238, width: 472, color: BLUE, weight: 2, dash: "dash" });
  const visibleRows = [
    ["System / developer instructions", "#e8f1ff", BLUE],
    ["Selected useful history", "#eefaf2", GREEN],
    ["Current user message", "#fff7df", "#d88a00"],
    ["Tool result included for this answer", "#f3edff", "#6b4aa1"],
  ];
  visibleRows.forEach(([label, fill, color], i) => {
    addShape(slide, { left: 438, top: 258 + i * 40, width: 412, height: 30, fill, line: "#d7e6fb", radius: "rounded-md" });
    addText(slide, label, { left: 456, top: 264 + i * 40, width: 376, height: 18, fontSize: 15, color, bold: i === 0 || i === 2, align: "center" });
  });
  addText(slide, "The model can use only what remains here.", {
    left: 430,
    top: 446,
    width: 428,
    height: 24,
    fontSize: 18,
    color: NAVY,
    bold: true,
    align: "center",
  });

  addShape(slide, { left: 980, top: 170, width: 242, height: 330, fill: LIGHT_BLUE, line: BLUE });
  addText(slide, "Common effects", { left: 1010, top: 198, width: 182, height: 30, fontSize: 24, color: BLUE, bold: true, align: "center" });
  [
    "Early details",
    "Lost constraints",
    "Task drift",
    "Style changes",
  ].forEach((label, i) => {
    addShape(slide, { left: 1000, top: 304 + i * 48, width: 202, height: 36, fill: "white", line: "#d7e6fb", radius: "rounded-md" });
    addText(slide, label, { left: 1018, top: 312 + i * 48, width: 166, height: 18, fontSize: 15, color: NAVY, bold: i === 1, align: "center" });
  });

  addShape(slide, { left: 92, top: 536, width: 1096, height: 88, fill: "white", line: BORDER, radius: "rounded-lg" });
  addText(slide, "System choices", { left: 118, top: 566, width: 230, height: 28, fontSize: 22, color: BLUE, bold: true });
  [
    ["Drop oldest", "Remove low-value old turns"],
    ["Keep important", "Retain selected facts"],
    ["Summarize", "Compress older content"],
    ["Retrieve", "Add selected notes back"],
  ].forEach(([title, body], i) => {
    const x = 360 + i * 202;
    addText(slide, title, { left: x, top: 552, width: 170, height: 24, fontSize: 18, color: i === 0 ? "#cc2b2b" : GREEN, bold: true, align: "center" });
    addText(slide, body, { left: x, top: 582, width: 170, height: 22, fontSize: 15, color: NAVY, align: "center" });
    if (i > 0) addLine(slide, { left: x - 18, top: 552, width: 0, height: 52, color: "#d7e6fb", weight: 1 });
  });

  addShape(slide, { left: 180, top: 650, width: 920, height: 46, fill: LIGHT_BLUE, line: BLUE, radius: "rounded-lg" });
  addText(slide, "Mental model", { left: 220, top: 662, width: 180, height: 22, fontSize: 20, color: BLUE, bold: true });
  addText(slide, "What AI can use is what is still visible on the paper now.", { left: 410, top: 662, width: 640, height: 22, fontSize: 19, color: NAVY });

  slide.speakerNotes.textFrame.setText(slides[7].notes);
  slide.speakerNotes.setVisible(true);
  return slide;
}

function addInstructionHierarchySlide(presentation) {
  const slide = presentation.slides.add();
  slide.background.fill = "white";
  addHeader(
    slide,
    "Instruction Hierarchy: Authority Is Not Data",
    "Higher-priority instructions guide how lower-priority content is used."
  );

  addShape(slide, { left: 76, top: 176, width: 500, height: 366, fill: "#f8fbff", line: BLUE });
  addText(slide, "Instruction authority", { left: 120, top: 204, width: 412, height: 32, fontSize: 28, color: BLUE, bold: true, align: "center" });
  addText(slide, "These can tell the model what to do.", { left: 132, top: 244, width: 388, height: 24, fontSize: 17, color: NAVY, align: "center" });
  const authority = [
    ["1", "System instructions", "Highest-priority rules"],
    ["2", "Developer instructions", "Product and runtime rules"],
    ["3", "User instructions", "User request and preferences"],
  ];
  authority.forEach(([n, title, body], i) => {
    const y = 296 + i * 72;
    addShape(slide, { left: 128 + i * 24, top: y, width: 344, height: 54, fill: i === 0 ? "#e8f1ff" : i === 1 ? "#eefaf2" : "#fff7df", line: BORDER, radius: "rounded-md" });
    addShape(slide, { left: 150 + i * 24, top: y + 10, width: 34, height: 34, fill: BLUE, line: BLUE, radius: "rounded-full" });
    addText(slide, n, { left: 160 + i * 24, top: y + 17, width: 14, height: 18, fontSize: 15, color: "white", bold: true, align: "center" });
    addText(slide, title, { left: 198 + i * 24, top: y + 9, width: 240, height: 22, fontSize: 17, color: NAVY, bold: true });
    addText(slide, body, { left: 198 + i * 24, top: y + 32, width: 240, height: 18, fontSize: 14, color: NAVY });
  });

  addShape(slide, { left: 704, top: 176, width: 500, height: 366, fill: "#fbfdff", line: BORDER });
  addText(slide, "Context data", { left: 748, top: 204, width: 412, height: 32, fontSize: 28, color: GREEN, bold: true, align: "center" });
  addText(slide, "These can inform the answer.", { left: 760, top: 244, width: 388, height: 24, fontSize: 17, color: NAVY, align: "center" });
  [
    ["User message", "Question or task content"],
    ["Conversation history", "Earlier visible messages"],
    ["Files / retrieved notes", "External information added to paper"],
    ["Tool outputs", "Observed results from tools"],
  ].forEach(([title, body], i) => {
    const y = 286 + i * 58;
    addBulletRow(slide, {
      icon: "i",
      title,
      body,
      left: 760,
      top: y,
      width: 388,
      height: 50,
      iconColor: GREEN,
      fill: i % 2 ? "#eefaf2" : "white",
      line: "#b8dec8",
    });
  });

  addLine(slide, { left: 610, top: 342, width: 60, color: BLUE, weight: 3, arrow: true });
  addText(slide, "guides\nuse of", { left: 600, top: 374, width: 78, height: 42, fontSize: 16, color: BLUE, bold: true, align: "center" });

  addShape(slide, { left: 96, top: 584, width: 1088, height: 72, fill: YELLOW, line: "#f0d891", radius: "rounded-lg" });
  addText(slide, "Safety rule", { left: 132, top: 606, width: 160, height: 28, fontSize: 22, color: "#d88a00", bold: true });
  addText(slide, "Data can be useful evidence, but it must not override higher-priority instructions.", {
    left: 310,
    top: 606,
    width: 810,
    height: 28,
    fontSize: 22,
    color: NAVY,
  });

  slide.speakerNotes.textFrame.setText(slides[9].notes);
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
    if (item.kind?.startsWith("native-")) {
      const slide =
        item.kind === "native-overview"
          ? addOverviewSlide(presentation)
          : item.kind === "native-overflow"
            ? addContextOverflowSlide(presentation)
            : addInstructionHierarchySlide(presentation);
      const png = await presentation.export({ slide, format: "png", scale: assetScale });
      const assetPath = path.join(repoRoot, "docs", "lesson-01", "assets", item.file);
      await writeBlob(assetPath, png);
      await normalizeLessonAsset(assetPath);
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
