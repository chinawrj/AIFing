import fs from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";

const artifactToolModule =
  process.env.ARTIFACT_TOOL_MODULE ??
  "/tmp/codex-presentations/aifing-chapter-01-01/tmp/node_modules/@oai/artifact-tool/dist/artifact_tool.mjs";
const { Presentation, PresentationFile } = await import(pathToFileURL(artifactToolModule).href);

const repoRoot = "/Users/rjwang/Documents/AIFing";
const outputPath = path.join(repoRoot, "decks", "chapter-01-01-advanced-context-cache.pptx");
const assetDir = path.join(repoRoot, "docs", "chapter-01-01-advanced", "assets");
const previewDir = "/tmp/codex-presentations/aifing-chapter-01-01/tmp/preview";

const NAVY = "#061a45";
const BLUE = "#004aad";
const PALE = "#eef6ff";
const PALE2 = "#f8fbff";
const BORDER = "#b9d4f6";
const GREEN = "#138a43";
const ORANGE = "#d88a00";
const RED = "#cc2b2b";
const YELLOW = "#fff7df";
const PURPLE = "#6b4aa1";

const slideMeta = [
  {
    title: "1.1 Advanced: Visible Paper and Prompt Cache",
    notes:
      "Frame this as an advanced extension of Lesson 1. The main point is that prompt caching does not break the Paper Model; it explains how repeated paper sections can be processed more efficiently.",
  },
  {
    title: "Every Round Gets the Complete Visible Paper",
    notes:
      "Correct the common misconception that a model call only receives the newest message. In real systems, each round is built from the visible context: instructions, history, files, tool results, and the current user message.",
  },
  {
    title: "Prompt Cache Reuses a Stable Prefix",
    notes:
      "Explain cache as repeated-prefix reuse. Do not say less paper is sent to the model. Say the repeated prefix is still part of the visible paper, but the provider can reuse processing for it.",
  },
  {
    title: "Cache Write vs Cache Read",
    notes:
      "Use Anthropic's terms as the clearest teaching example, while noting provider details differ. Cache write means a reusable prefix is created; cache read means a later call hits that prefix.",
  },
  {
    title: "Stable Prefix, Changing Tail",
    notes:
      "Explain why stable system prompts, tool definitions, and long reference docs are usually better near the beginning, while the current user message and fresh tool results change near the end.",
  },
  {
    title: "Cache Is Not Memory",
    notes:
      "Close by separating cache from memory, retrieval, compaction, and context. If something is not in the visible paper, cache does not make the model know it.",
  },
];

async function writeBlob(filePath, blob) {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, new Uint8Array(await blob.arrayBuffer()));
}

function shape(slide, { left, top, width, height, fill = "white", line = BORDER, radius = "rounded-lg", shadow = undefined }) {
  return slide.shapes.add({
    geometry: "roundRect",
    position: { left, top, width, height },
    fill,
    line: { style: "solid", fill: line, width: 1.1 },
    borderRadius: radius,
    ...(shadow ? { shadow } : {}),
  });
}

function text(slide, value, { left, top, width, height, fontSize = 20, color = NAVY, bold = false, italic = false, align = "left" }) {
  const box = slide.shapes.add({
    geometry: "textbox",
    position: { left, top, width, height },
    fill: "none",
    line: { style: "solid", fill: "none", width: 0 },
  });
  box.text = value;
  box.text.style = { fontSize, color, bold, italic, alignment: align };
  return box;
}

function line(slide, { left, top, width, height = 0, color = BLUE, arrow = false, weight = 2 }) {
  slide.shapes.add({
    geometry: "line",
    position: { left, top, width, height },
    line: { style: "solid", fill: color, width: weight, ...(arrow ? { endArrowType: "triangle" } : {}) },
  });
}

function header(slide, title, subtitle) {
  text(slide, title, { left: 48, top: 28, width: 960, height: 58, fontSize: 38, color: NAVY, bold: true });
  text(slide, subtitle, { left: 220, top: 88, width: 840, height: 30, fontSize: 20, color: BLUE, italic: true, align: "center" });
  line(slide, { left: 48, top: 122, width: 1184, weight: 2 });
}

function titleHeader(slide) {
  text(slide, "1.1 Advanced", { left: 64, top: 36, width: 400, height: 66, fontSize: 56, color: NAVY, bold: true });
  text(slide, "Visible Paper and Prompt Cache", { left: 470, top: 50, width: 720, height: 52, fontSize: 38, color: NAVY, bold: true });
  text(slide, "Cache optimizes repeated input; it does not change what the model can see.", {
    left: 220,
    top: 112,
    width: 840,
    height: 30,
    fontSize: 20,
    color: BLUE,
    italic: true,
    align: "center",
  });
  line(slide, { left: 64, top: 150, width: 1152, weight: 2 });
}

function paper(slide, { left, top, width, height, title, rows, fill = "white", border = BORDER }) {
  shape(slide, { left, top, width, height, fill, line: border, radius: "rounded-lg", shadow: "shadow-sm" });
  text(slide, title, { left: left + 16, top: top + 12, width: width - 32, height: 24, fontSize: 17, color: BLUE, bold: true, align: "center" });
  const rowTop = top + 48;
  const rowH = (height - 62) / rows.length;
  rows.forEach((row, i) => {
    const y = rowTop + i * rowH;
    shape(slide, { left: left + 18, top: y, width: width - 36, height: rowH - 8, fill: row.fill ?? PALE2, line: row.line ?? "#d7e6fb", radius: "rounded-md" });
    text(slide, row.label, { left: left + 30, top: y + 9, width: width - 60, height: rowH - 18, fontSize: row.fontSize ?? 16, color: row.color ?? NAVY, bold: row.bold ?? false, align: "center" });
  });
}

function slide1(presentation) {
  const slide = presentation.slides.add();
  slide.background.fill = "white";
  titleHeader(slide);

  shape(slide, { left: 64, top: 188, width: 348, height: 310, fill: PALE2 });
  text(slide, "What stays true", { left: 92, top: 216, width: 290, height: 34, fontSize: 28, color: BLUE, bold: true, align: "center" });
  const truths = ["The model reads this call's paper", "The visible context still sets the boundary", "The next token is generated from that context"];
  truths.forEach((t, i) => {
    shape(slide, { left: 94, top: 270 + i * 62, width: 286, height: 46, fill: "white" });
    text(slide, t, { left: 112, top: 282 + i * 62, width: 250, height: 24, fontSize: 16, color: NAVY, bold: i === 0, align: "center" });
  });

  shape(slide, { left: 466, top: 188, width: 348, height: 310, fill: PALE });
  text(slide, "What cache adds", { left: 494, top: 216, width: 290, height: 34, fontSize: 28, color: BLUE, bold: true, align: "center" });
  const cache = ["Repeated prefix may be reused", "Processing can be cheaper or faster", "Usage may show cache read/write"];
  cache.forEach((t, i) => {
    shape(slide, { left: 496, top: 270 + i * 62, width: 286, height: 46, fill: "white" });
    text(slide, t, { left: 514, top: 282 + i * 62, width: 250, height: 24, fontSize: 16, color: i === 2 ? GREEN : NAVY, bold: i === 0, align: "center" });
  });

  shape(slide, { left: 868, top: 188, width: 348, height: 310, fill: YELLOW, line: "#f0d891" });
  text(slide, "What cache is not", { left: 896, top: 216, width: 290, height: 34, fontSize: 28, color: BLUE, bold: true, align: "center" });
  const nots = ["Not memory", "Not retrieval", "Not a larger context window"];
  nots.forEach((t, i) => {
    shape(slide, { left: 898, top: 270 + i * 62, width: 286, height: 46, fill: "white", line: "#f0d891" });
    text(slide, t, { left: 916, top: 282 + i * 62, width: 250, height: 24, fontSize: 16, color: RED, bold: true, align: "center" });
  });

  shape(slide, { left: 160, top: 552, width: 960, height: 82, fill: "white", line: BLUE });
  text(slide, "Paper Model", { left: 194, top: 576, width: 240, height: 30, fontSize: 24, color: BLUE, bold: true });
  text(slide, "The paper is still complete. Cache only changes how repeated parts are processed.", { left: 430, top: 576, width: 660, height: 28, fontSize: 21, color: NAVY });
  return slide;
}

function slide2(presentation) {
  const slide = presentation.slides.add();
  slide.background.fill = "white";
  header(slide, "Every Round Gets the Complete Visible Paper", "A new turn does not replace the paper; it is added to the paper for this call.");

  const rows = [
    { label: "System rules", fill: "#e8f1ff", bold: true },
    { label: "Conversation history", fill: "#eefaf2" },
    { label: "Files / tool results", fill: "#fff7df" },
    { label: "Current message", fill: "#f3edff", bold: true },
  ];
  paper(slide, { left: 76, top: 178, width: 270, height: 330, title: "Round 1 call", rows });
  paper(slide, { left: 506, top: 178, width: 270, height: 330, title: "Round 2 call", rows: [...rows, { label: "New assistant output", fill: "#eef6ff" }] });
  paper(slide, { left: 936, top: 178, width: 270, height: 330, title: "Round 3 call", rows: [...rows, { label: "More history added", fill: "#eef6ff" }] });
  line(slide, { left: 360, top: 340, width: 120, arrow: true, color: BLUE, weight: 4 });
  line(slide, { left: 790, top: 340, width: 120, arrow: true, color: BLUE, weight: 4 });

  shape(slide, { left: 132, top: 560, width: 1016, height: 72, fill: PALE2, line: BLUE });
  text(slide, "Key idea", { left: 168, top: 581, width: 130, height: 28, fontSize: 23, color: BLUE, bold: true });
  text(slide, "Every call is built from the current visible paper: stable rules, selected history, tool results, files, and the latest user message.", { left: 318, top: 579, width: 790, height: 34, fontSize: 19, color: NAVY });
  return slide;
}

function slide3(presentation) {
  const slide = presentation.slides.add();
  slide.background.fill = "white";
  header(slide, "Prompt Cache Reuses a Stable Prefix", "The repeated top of the paper can be processed through a cached path.");

  paper(slide, {
    left: 105,
    top: 180,
    width: 430,
    height: 350,
    title: "This call's visible paper",
    rows: [
      { label: "Cached prefix: system prompt", fill: "#e8f1ff", bold: true, color: BLUE },
      { label: "Cached prefix: tool definitions", fill: "#e8f1ff", bold: true, color: BLUE },
      { label: "Cached prefix: long reference docs", fill: "#e8f1ff", bold: true, color: BLUE },
      { label: "New tail: latest user message", fill: "#fff7df", bold: true, color: ORANGE },
      { label: "New tail: fresh tool result", fill: "#fff7df", color: ORANGE },
    ],
  });

  line(slide, { left: 570, top: 340, width: 120, arrow: true, color: GREEN, weight: 4 });
  shape(slide, { left: 720, top: 184, width: 420, height: 126, fill: PALE, line: GREEN });
  text(slide, "Cache read path", { left: 748, top: 210, width: 360, height: 30, fontSize: 26, color: GREEN, bold: true, align: "center" });
  text(slide, "Repeated prefix is reused by the provider.", { left: 760, top: 252, width: 340, height: 28, fontSize: 18, color: NAVY, align: "center" });

  shape(slide, { left: 720, top: 368, width: 420, height: 126, fill: YELLOW, line: "#f0d891" });
  text(slide, "Normal input path", { left: 748, top: 394, width: 360, height: 30, fontSize: 26, color: ORANGE, bold: true, align: "center" });
  text(slide, "Changing tail is processed for this request.", { left: 760, top: 436, width: 340, height: 28, fontSize: 18, color: NAVY, align: "center" });

  shape(slide, { left: 126, top: 572, width: 1028, height: 64, fill: "white", line: BLUE });
  text(slide, "Do not say: less paper was sent.", { left: 168, top: 592, width: 390, height: 24, fontSize: 20, color: RED, bold: true });
  text(slide, "Say: repeated paper sections were reused, while still counting as context.", { left: 558, top: 592, width: 560, height: 24, fontSize: 20, color: NAVY });
  return slide;
}

function slide4(presentation) {
  const slide = presentation.slides.add();
  slide.background.fill = "white";
  header(slide, "Cache Write vs Cache Read", "Write creates reusable prefix processing; read hits it later.");

  const colLeft = 92;
  const colTop = 174;
  const colW = 510;
  const colH = 350;
  shape(slide, { left: colLeft, top: colTop, width: colW, height: colH, fill: PALE2, line: GREEN });
  shape(slide, { left: 678, top: colTop, width: colW, height: colH, fill: PALE, line: BLUE });
  text(slide, "Cache Write", { left: colLeft + 32, top: colTop + 28, width: 440, height: 36, fontSize: 30, color: GREEN, bold: true, align: "center" });
  text(slide, "Cache Read", { left: 710, top: colTop + 28, width: 440, height: 36, fontSize: 30, color: BLUE, bold: true, align: "center" });

  const leftItems = [
    ["When", "First eligible repeated prefix is processed"],
    ["Paper metaphor", "The repeated top of the paper gets indexed"],
    ["Effect", "May create cache_creation_input_tokens"],
    ["Does not change", "The model still receives visible context"],
  ];
  const rightItems = [
    ["When", "Later call repeats the same cached prefix"],
    ["Paper metaphor", "The indexed top of the paper is reused"],
    ["Effect", "May create cache_read_input_tokens"],
    ["Does not change", "Cached tokens still represent context"],
  ];
  [leftItems, rightItems].forEach((items, side) => {
    const x = side === 0 ? colLeft + 28 : 706;
    items.forEach(([k, v], i) => {
      const y = colTop + 88 + i * 58;
      text(slide, k, { left: x, top: y, width: 110, height: 24, fontSize: 16, color: side === 0 ? GREEN : BLUE, bold: true });
      text(slide, v, { left: x + 116, top: y - 2, width: 330, height: 34, fontSize: 16, color: NAVY });
    });
  });

  shape(slide, { left: 150, top: 570, width: 980, height: 64, fill: YELLOW, line: "#f0d891" });
  text(slide, "Provider detail", { left: 190, top: 590, width: 180, height: 24, fontSize: 20, color: ORANGE, bold: true });
  text(slide, "Anthropic exposes write/read token fields. OpenAI exposes cached_tokens for cache hits.", { left: 384, top: 590, width: 700, height: 24, fontSize: 19, color: NAVY });
  return slide;
}

function slide5(presentation) {
  const slide = presentation.slides.add();
  slide.background.fill = "white";
  header(slide, "Stable Prefix, Changing Tail", "Put repeated content first; let changing content live later.");

  paper(slide, {
    left: 160,
    top: 164,
    width: 430,
    height: 400,
    title: "Good cache shape",
    rows: [
      { label: "Stable: system instructions", fill: "#e8f1ff", bold: true, color: BLUE },
      { label: "Stable: tool definitions", fill: "#e8f1ff", bold: true, color: BLUE },
      { label: "Stable: reference docs", fill: "#e8f1ff", bold: true, color: BLUE },
      { label: "Changing: conversation tail", fill: "#fff7df", color: ORANGE },
      { label: "Changing: current message", fill: "#fff7df", bold: true, color: ORANGE },
    ],
  });
  text(slide, "Cached prefix", { left: 620, top: 230, width: 180, height: 28, fontSize: 24, color: GREEN, bold: true });
  line(slide, { left: 595, top: 260, width: 150, arrow: true, color: GREEN, weight: 4 });
  text(slide, "Changing tail", { left: 620, top: 430, width: 190, height: 28, fontSize: 24, color: ORANGE, bold: true });
  line(slide, { left: 595, top: 458, width: 150, arrow: true, color: ORANGE, weight: 4 });

  shape(slide, { left: 820, top: 186, width: 320, height: 156, fill: PALE2, line: GREEN });
  text(slide, "Good candidates", { left: 850, top: 210, width: 260, height: 28, fontSize: 24, color: GREEN, bold: true, align: "center" });
  text(slide, "System prompt\nTool schemas\nLong static docs\nStable examples", { left: 868, top: 252, width: 224, height: 72, fontSize: 16, color: NAVY, align: "center" });

  shape(slide, { left: 820, top: 390, width: 320, height: 156, fill: YELLOW, line: "#f0d891" });
  text(slide, "Poor candidates", { left: 850, top: 414, width: 260, height: 28, fontSize: 24, color: ORANGE, bold: true, align: "center" });
  text(slide, "Latest user question\nFast-changing results\nOne-off private details", { left: 868, top: 458, width: 224, height: 66, fontSize: 16, color: NAVY, align: "center" });

  shape(slide, { left: 124, top: 600, width: 1032, height: 52, fill: "white", line: BLUE });
  text(slide, "The ordering trick is a cache topic. How the harness builds that order belongs in Lesson 2.", { left: 170, top: 615, width: 940, height: 22, fontSize: 18, color: NAVY, align: "center" });
  return slide;
}

function slide6(presentation) {
  const slide = presentation.slides.add();
  slide.background.fill = "white";
  header(slide, "Cache Is Not Memory", "Five context mechanisms solve different problems.");

  const headers = ["Mechanism", "What it does", "Paper Model meaning", "Not the same as"];
  const colX = [64, 238, 560, 912];
  const colW = [148, 286, 326, 280];
  shape(slide, { left: 64, top: 160, width: 1152, height: 46, fill: BLUE, line: BLUE });
  headers.forEach((h, i) => text(slide, h, { left: colX[i] + 10, top: 173, width: colW[i] - 20, height: 22, fontSize: 16, color: "white", bold: true, align: i === 0 ? "center" : "left" }));
  const rows = [
    ["Context", "Visible input for this call", "The paper the model reads now", "Training data"],
    ["Prompt cache", "Reuses repeated input prefix", "Same paper, faster repeated top", "Memory"],
    ["Compacting", "Summarizes old content", "Smaller replacement paper section", "Exact history"],
    ["Retrieval", "Fetches external information", "Adds selected notes to paper", "Always-on knowledge"],
    ["Memory", "Stores durable facts/preferences", "Can be written back onto paper", "Current context"],
  ];
  rows.forEach((row, r) => {
    const top = 208 + r * 72;
    shape(slide, { left: 64, top, width: 1152, height: 66, fill: r % 2 ? PALE : PALE2, line: BORDER, radius: "rounded-md" });
    row.forEach((v, i) => text(slide, v, { left: colX[i] + 10, top: top + 16, width: colW[i] - 20, height: 34, fontSize: 16, color: i === 0 ? BLUE : NAVY, bold: i === 0, align: i === 0 ? "center" : "left" }));
  });
  shape(slide, { left: 126, top: 594, width: 1028, height: 64, fill: YELLOW, line: "#f0d891" });
  text(slide, "Final rule", { left: 164, top: 614, width: 140, height: 24, fontSize: 21, color: ORANGE, bold: true });
  text(slide, "If it is not on the visible paper, cache does not make the model know it.", { left: 320, top: 614, width: 780, height: 24, fontSize: 21, color: NAVY });
  return slide;
}

const builders = [slide1, slide2, slide3, slide4, slide5, slide6];

async function main() {
  await fs.mkdir(path.dirname(outputPath), { recursive: true });
  await fs.mkdir(assetDir, { recursive: true });
  await fs.mkdir(previewDir, { recursive: true });

  const presentation = Presentation.create({ slideSize: { width: 1280, height: 720 } });

  builders.forEach((build, index) => {
    const slide = build(presentation);
    slide.speakerNotes.textFrame.setText(slideMeta[index].notes);
    slide.speakerNotes.setVisible(true);
  });

  for (const [index, slide] of presentation.slides.items.entries()) {
    const stem = `slide-${String(index + 1).padStart(2, "0")}`;
    const png = await presentation.export({ slide, format: "png", scale: 1 });
    await writeBlob(path.join(previewDir, `${stem}.png`), png);
    await writeBlob(path.join(assetDir, `${stem}.png`), png);
    const layout = await slide.export({ format: "layout" });
    await fs.writeFile(path.join(previewDir, `${stem}.layout.json`), await layout.text());
  }

  await writeBlob(path.join(previewDir, "chapter-01-01-montage.webp"), await presentation.export({ format: "webp", montage: true, scale: 1 }));

  const pptx = await PresentationFile.exportPptx(presentation);
  await pptx.save(outputPath);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
