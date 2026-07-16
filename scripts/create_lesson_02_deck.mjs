import fs from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { execFile } from "node:child_process";
import { promisify } from "node:util";

const artifactToolModule =
  process.env.ARTIFACT_TOOL_MODULE ??
  "/tmp/codex-presentations/aifing-lesson-02/tmp/node_modules/@oai/artifact-tool/dist/artifact_tool.mjs";
const { Presentation, PresentationFile } = await import(pathToFileURL(artifactToolModule).href);
const execFileAsync = promisify(execFile);

const repoRoot = "/Users/rjwang/Documents/AIFing";
const outputPath = path.join(repoRoot, "decks", "lesson-02-custom-prompts-at-scale.pptx");
const legacyOutputPath = path.join(repoRoot, "decks", "lesson-02-harness-engineering.pptx");
const assetDir = path.join(repoRoot, "docs", "lesson-02", "assets");
const previewDir = "/tmp/codex-presentations/aifing-lesson-02/tmp/preview";
const assetScale = 1672 / 1280;

const NAVY = "#061a45";
const BLUE = "#004aad";
const LIGHT_BLUE = "#eef6ff";
const PALE = "#f8fbff";
const BORDER = "#b9d4f6";
const GREEN = "#157a3d";
const MINT = "#eefaf2";
const ORANGE = "#d88a00";
const YELLOW = "#fff7df";
const RED = "#cc2b2b";
const RED_PALE = "#fff5f5";
const PURPLE = "#6b4aa1";
const PURPLE_PALE = "#f3edff";
const MID = "#53637a";

const slideMeta = [
  { notes: "Lesson 2 starts where Lesson 1 ended: prompts are written onto a limited paper. This lesson is about scaling prompt-like instructions without crowding the same context." },
  { notes: "Show why copy-pasting custom prompts breaks down. The model still only sees one paper, so duplicated rules compete with the actual task." },
  { notes: "A custom agent packages a stable role and working profile. Treat it as a reusable worker identity, not a longer one-off prompt." },
  { notes: "A subagent is a delegated worker with its own paper. The main thread sends a bounded brief and receives a summary or artifact back." },
  { notes: "Compaction compresses one crowded paper. Subagent decomposition proactively gives weakly coupled branches their own papers before detail is compressed away." },
  { notes: "Subagents work best when local papers can make progress and rejoin through a clear merge artifact. Coupling is a synchronization question, not an automatic ban." },
  { notes: "Skills solve the conditional-loading problem. Keep a method outside the paper until the task actually needs that manual or checklist." },
  { notes: "A skill can be a small capability kit. It can keep workflow instructions, scripts, examples, templates, and references together." },
  { notes: "This slide gives the selection rule: one-off prompt, custom agent, subagent, and skill each solve a different context-loading problem." },
  { notes: "Close with the operating model: prompt engineering writes instructions; context architecture decides where those instructions travel." },
];

async function writeBlob(filePath, blob) {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, new Uint8Array(await blob.arrayBuffer()));
}

async function normalizeLessonAsset(filePath) {
  await execFileAsync("/usr/bin/sips", ["--padToHeightWidth", "941", "1672", "--padColor", "FFFFFF", filePath]);
}

function shape(slide, { left, top, width, height, fill = "white", line = BORDER, radius = "rounded-lg", shadow = undefined }) {
  return slide.shapes.add({
    geometry: "roundRect",
    position: { left, top, width, height },
    fill,
    line: line === "none" ? { style: "solid", fill: "none", width: 0 } : { style: "solid", fill: line, width: 1.15 },
    borderRadius: radius,
    ...(shadow ? { shadow } : {}),
  });
}

function text(slide, value, { left, top, width, height, fontSize = 18, color = NAVY, bold = false, italic = false, align = "left" }) {
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

function line(slide, { left, top, width, height = 0, color = BLUE, weight = 2, arrow = false, dash = undefined }) {
  const position = { left, top, width, height };
  if (position.width < 0) {
    position.left += position.width;
    position.width = Math.abs(position.width);
  }
  if (position.height < 0) {
    position.top += position.height;
    position.height = Math.abs(position.height);
  }
  slide.shapes.add({
    geometry: "line",
    position,
    line: {
      style: "solid",
      fill: color,
      width: weight,
      ...(arrow ? { endArrowType: "triangle" } : {}),
      ...(dash ? { dash } : {}),
    },
  });
}

function bulbIcon(slide, left, top, size = 40, color = BLUE) {
  shape(slide, { left, top, width: size, height: size, fill: "white", line: "white", radius: "rounded-full" });
  shape(slide, { left: left + size * 0.31, top: top + size * 0.2, width: size * 0.38, height: size * 0.38, fill: "none", line: color, radius: "rounded-full" });
  line(slide, { left: left + size * 0.5, top: top + size * 0.56, width: 0, height: size * 0.12, color, weight: 2 });
  line(slide, { left: left + size * 0.38, top: top + size * 0.72, width: size * 0.24, color, weight: 2 });
  line(slide, { left: left + size * 0.4, top: top + size * 0.82, width: size * 0.2, color, weight: 2 });
  line(slide, { left: left + size * 0.18, top: top + size * 0.36, width: size * 0.08, color, weight: 1.5 });
  line(slide, { left: left + size * 0.74, top: top + size * 0.36, width: size * 0.08, color, weight: 1.5 });
}

function brainIcon(slide, left, top, size = 46, color = BLUE) {
  shape(slide, { left, top, width: size, height: size, fill: color, line: color, radius: "rounded-full" });
  shape(slide, { left: left + size * 0.22, top: top + size * 0.2, width: size * 0.32, height: size * 0.32, fill: "none", line: "white", radius: "rounded-full" });
  shape(slide, { left: left + size * 0.44, top: top + size * 0.2, width: size * 0.32, height: size * 0.32, fill: "none", line: "white", radius: "rounded-full" });
  line(slide, { left: left + size * 0.26, top: top + size * 0.52, width: size * 0.5, color: "white", weight: 2 });
  line(slide, { left: left + size * 0.5, top: top + size * 0.28, width: 0, height: size * 0.38, color: "white", weight: 2 });
  line(slide, { left: left + size * 0.38, top: top + size * 0.66, width: size * 0.24, height: size * 0.12, color: "white", weight: 2 });
}

function badge(slide, value, { left, top, color = BLUE, size = 38 }) {
  shape(slide, { left, top, width: size, height: size, fill: color, line: color, radius: "rounded-full" });
  text(slide, value, { left: left + size * 0.28, top: top + size * 0.22, width: size * 0.44, height: size * 0.44, fontSize: size * 0.42, color: "white", bold: true, align: "center" });
}

function docIcon(slide, left, top, size = 64) {
  shape(slide, { left, top, width: size, height: size, fill: "white", line: BLUE, radius: "rounded-md", shadow: "shadow-sm" });
  line(slide, { left: left + size * 0.22, top: top + size * 0.36, width: size * 0.48, color: BLUE, weight: 3 });
  line(slide, { left: left + size * 0.22, top: top + size * 0.54, width: size * 0.48, color: BLUE, weight: 3 });
  line(slide, { left: left + size * 0.22, top: top + size * 0.72, width: size * 0.34, color: BLUE, weight: 3 });
}

function header(slide, title, subtitle) {
  docIcon(slide, 42, 28, 68);
  const fs = title.length > 56 ? 34 : title.length > 44 ? 38 : 44;
  text(slide, title, { left: 132, top: 36, width: 1040, height: 56, fontSize: fs, color: NAVY, bold: true });
  line(slide, { left: 132, top: 104, width: 1080, color: BLUE, weight: 2 });
  shape(slide, { left: 128, top: 100, width: 8, height: 8, fill: BLUE, line: BLUE, radius: "rounded-full" });
  shape(slide, { left: 1208, top: 100, width: 8, height: 8, fill: BLUE, line: BLUE, radius: "rounded-full" });
  text(slide, subtitle, { left: 246, top: 120, width: 770, height: 28, fontSize: 20, color: BLUE, italic: true, align: "center" });
}

function paper(slide, { left, top, width, height, title = "Paper", fill = "white", lineColor = BORDER, titleColor = BLUE }) {
  shape(slide, { left, top, width, height, fill, line: lineColor, radius: "rounded-lg", shadow: "shadow-sm" });
  line(slide, { left: left + 44, top: top + 12, width: 0, height: height - 24, color: "#ffb5b5", weight: 1 });
  for (let y = top + 54; y < top + height - 18; y += 30) {
    line(slide, { left: left + 16, top: y, width: width - 32, color: "#dbe8f6", weight: 1 });
  }
  const compact = width < 170;
  text(slide, title, {
    left: left + (compact ? 14 : 58),
    top: top + (compact ? 18 : 18),
    width: width - (compact ? 28 : 82),
    height: compact ? 22 : 28,
    fontSize: width < 120 ? (title.length > 5 ? 10 : 13) : compact ? 16 : 23,
    color: titleColor,
    bold: true,
    align: "center",
  });
}

function userFigure(slide, left, top, scale = 1) {
  shape(slide, { left: left + 28 * scale, top, width: 54 * scale, height: 54 * scale, fill: "#dbeafe", line: BLUE, radius: "rounded-full" });
  shape(slide, { left: left + 38 * scale, top: top + 14 * scale, width: 34 * scale, height: 34 * scale, fill: BLUE, line: BLUE, radius: "rounded-full" });
  shape(slide, { left: left + 6 * scale, top: top + 58 * scale, width: 100 * scale, height: 76 * scale, fill: LIGHT_BLUE, line: BLUE, radius: "rounded-lg" });
  text(slide, "User", { left: left + 20 * scale, top: top + 80 * scale, width: 72 * scale, height: 22 * scale, fontSize: 18 * scale, color: BLUE, bold: true, align: "center" });
}

function writerScene(slide, left, top, scale = 1) {
  line(slide, { left: left + 4 * scale, top: top + 4 * scale, width: 70 * scale, color: "#dbe8f6", weight: 3 });
  line(slide, { left: left + 4 * scale, top: top + 4 * scale, width: 0, height: 86 * scale, color: "#dbe8f6", weight: 3 });
  line(slide, { left: left + 42 * scale, top: top + 4 * scale, width: 0, height: 66 * scale, color: "#dbe8f6", weight: 3 });
  shape(slide, { left: left + 8 * scale, top: top + 94 * scale, width: 170 * scale, height: 16 * scale, fill: "#e7effa", line: "#e7effa", radius: "rounded-md" });
  shape(slide, { left: left + 44 * scale, top: top + 28 * scale, width: 46 * scale, height: 48 * scale, fill: "#f6c8a5", line: "#d9a07a", radius: "rounded-full" });
  shape(slide, { left: left + 38 * scale, top: top + 22 * scale, width: 56 * scale, height: 26 * scale, fill: NAVY, line: NAVY, radius: "rounded-full" });
  shape(slide, { left: left + 28 * scale, top: top + 76 * scale, width: 92 * scale, height: 82 * scale, fill: NAVY, line: BLUE, radius: "rounded-lg" });
  shape(slide, { left: left + 58 * scale, top: top + 84 * scale, width: 34 * scale, height: 58 * scale, fill: "white", line: "white", radius: "rounded-md" });
  shape(slide, { left: left + 60 * scale, top: top + 132 * scale, width: 96 * scale, height: 44 * scale, fill: "white", line: BORDER, radius: "rounded-md", shadow: "shadow-sm" });
  for (let i = 0; i < 3; i++) {
    line(slide, { left: left + 72 * scale, top: top + (146 + i * 9) * scale, width: 58 * scale, color: "#cfe0f4", weight: 1 });
  }
  line(slide, { left: left + 96 * scale, top: top + 132 * scale, width: 24 * scale, height: 28 * scale, color: NAVY, weight: 2 });
  shape(slide, { left: left + 38 * scale, top: top + 184 * scale, width: 108 * scale, height: 38 * scale, fill: BLUE, line: BLUE, radius: "rounded-md" });
  text(slide, "User", { left: left + 58 * scale, top: top + 194 * scale, width: 70 * scale, height: 16 * scale, fontSize: 18 * scale, color: "white", bold: true, align: "center" });
  text(slide, "writes on the paper", { left: left + 34 * scale, top: top + 230 * scale, width: 130 * scale, height: 22 * scale, fontSize: 13 * scale, color: NAVY, italic: true, align: "center" });
}

function robotFigure(slide, left, top, scale = 1, label = "AI Model") {
  shape(slide, { left, top, width: 132 * scale, height: 132 * scale, fill: "#dbeafe", line: "none", radius: "rounded-full" });
  shape(slide, { left: left + 28 * scale, top: top + 28 * scale, width: 76 * scale, height: 62 * scale, fill: "white", line: BLUE, radius: "rounded-lg", shadow: "shadow-sm" });
  shape(slide, { left: left + 42 * scale, top: top + 44 * scale, width: 48 * scale, height: 24 * scale, fill: NAVY, line: NAVY, radius: "rounded-md" });
  shape(slide, { left: left + 52 * scale, top: top + 51 * scale, width: 8 * scale, height: 8 * scale, fill: "#5bc0ff", line: "#5bc0ff", radius: "rounded-full" });
  shape(slide, { left: left + 73 * scale, top: top + 51 * scale, width: 8 * scale, height: 8 * scale, fill: "#5bc0ff", line: "#5bc0ff", radius: "rounded-full" });
  shape(slide, { left: left + 48 * scale, top: top + 92 * scale, width: 40 * scale, height: 22 * scale, fill: NAVY, line: NAVY, radius: "rounded-md" });
  shape(slide, { left: left + 18 * scale, top: top + 116 * scale, width: 96 * scale, height: 34 * scale, fill: "white", line: BLUE, radius: "rounded-lg", shadow: "shadow-sm" });
  shape(slide, { left: left + 5 * scale, top: top + 160 * scale, width: 122 * scale, height: 36 * scale, fill: BLUE, line: BLUE, radius: "rounded-md" });
  text(slide, label, { left: left + 12 * scale, top: top + 168 * scale, width: 108 * scale, height: 18 * scale, fontSize: 16 * scale, color: "white", bold: true, align: "center" });
}

function miniIcon(slide, kind, left, top, color = BLUE) {
  shape(slide, { left, top, width: 44, height: 44, fill: color, line: color, radius: "rounded-full" });
  const label = { package: "PKG", split: "3x", skill: "SK", paper: "P", warn: "!", bot: "AI", folder: "DIR", merge: "IN", load: "LD", pen: "PEN" }[kind] ?? "i";
  text(slide, label, { left: left + 2, top: top + 13, width: 40, height: 16, fontSize: label.length > 3 ? 8 : label.length > 2 ? 9 : 16, color: "white", bold: true, align: "center" });
}

function keyPanel(slide, items, { title = "Key idea", left = 996, top = 178, width = 242, height = 370, color = BLUE } = {}) {
  shape(slide, { left, top, width, height, fill: "white", line: color, radius: "rounded-lg", shadow: "shadow-sm" });
  shape(slide, { left, top, width, height: 64, fill: color, line: color, radius: "rounded-lg" });
  bulbIcon(slide, left + 22, top + 12, 40, color);
  text(slide, title, { left: left + 76, top: top + 18, width: width - 92, height: 26, fontSize: 26, color: "white", bold: true });
  items.forEach((item, i) => {
    const rowTop = top + 86 + i * 68;
    badge(slide, String(i + 1), { left: left + 24, top: rowTop, color, size: 36 });
    text(slide, item, { left: left + 72, top: rowTop + 3, width: width - 94, height: 42, fontSize: 16, color: NAVY });
    if (i < items.length - 1) line(slide, { left: left + 24, top: rowTop + 56, width: width - 48, color: "#d7e6fb", weight: 1 });
  });
}

function mentalModel(slide, textValue, { label = "Mental model", color = BLUE } = {}) {
  shape(slide, { left: 54, top: 610, width: 880, height: 82, fill: PALE, line: color, radius: "rounded-lg", shadow: "shadow-sm" });
  brainIcon(slide, 84, 628, 46, color);
  text(slide, label, { left: 154, top: 634, width: 190, height: 28, fontSize: 24, color, bold: true });
  line(slide, { left: 350, top: 628, width: 0, height: 48, color, weight: 1 });
  text(slide, textValue, { left: 380, top: 630, width: 510, height: 42, fontSize: 18, color: NAVY });
}

function tag(slide, label, { left, top, width = 136, color = BLUE, fill = LIGHT_BLUE, icon = "paper" }) {
  shape(slide, { left, top, width, height: 54, fill, line: color, radius: "rounded-lg", shadow: "shadow-sm" });
  miniIcon(slide, icon, left + 7, top + 5, color);
  text(slide, label, { left: left + 54, top: top + 13, width: width - 60, height: 28, fontSize: width < 130 ? 12 : 14, color: NAVY, bold: true, align: "center" });
}

function addPromptBlock(slide, { left, top, width, height, title, body = "", color = BLUE, fill = LIGHT_BLUE }) {
  shape(slide, { left, top, width, height, fill, line: color, radius: "rounded-md", shadow: "shadow-sm" });
  miniIcon(slide, title.toLowerCase().includes("tool") ? "pen" : title.toLowerCase().includes("format") ? "paper" : "load", left + 10, top + 8, color);
  text(slide, title, { left: left + 62, top: top + 12, width: width - 76, height: 18, fontSize: 15, color, bold: true });
  if (body) {
    text(slide, body, { left: left + 62, top: top + 34, width: width - 76, height: height - 38, fontSize: 13, color: NAVY });
  }
}

function slide1(p) {
  const slide = p.slides.add();
  slide.background.fill = "white";
  header(slide, "Custom Prompts at Scale", "Reuse, split, and load prompts without crowding one shared paper.");

  writerScene(slide, 50, 214, 0.9);
  paper(slide, { left: 318, top: 180, width: 390, height: 360, title: "Crowded prompt paper", lineColor: BLUE });
  ["System prompt", "User prompt", "Custom rules", "Tool result", "Task detail"].forEach((label, i) => {
    addPromptBlock(slide, { left: 378, top: 250 + i * 50, width: 250, height: 36, title: label, color: i === 4 ? RED : BLUE, fill: i === 4 ? RED_PALE : LIGHT_BLUE });
  });
  robotFigure(slide, 740, 245, 0.92, "AI Model");
  line(slide, { left: 224, top: 350, width: 78, arrow: true, weight: 4 });
  line(slide, { left: 716, top: 350, width: 46, arrow: true, weight: 4 });

  tag(slide, "Custom agent", { left: 320, top: 526, width: 158, color: GREEN, fill: MINT, icon: "package" });
  tag(slide, "Subagent", { left: 494, top: 526, width: 144, color: ORANGE, fill: YELLOW, icon: "split" });
  tag(slide, "Skill", { left: 654, top: 526, width: 128, color: PURPLE, fill: PURPLE_PALE, icon: "skill" });

  keyPanel(slide, ["Package stable rules", "Split work onto papers", "Load methods on demand"], { height: 330 });
  mentalModel(slide, "Prompt scaling is not writing more text. It is deciding which paper gets which instructions.");
  return slide;
}

function slide2(p) {
  const slide = p.slides.add();
  slide.background.fill = "white";
  header(slide, "Copy-Pasted Prompts Break the Paper", "Every copied rule competes with the actual task for visible space.");

  userFigure(slide, 54, 238, 0.95);
  paper(slide, { left: 286, top: 174, width: 376, height: 370, title: "One overloaded paper", lineColor: RED });
  ["Role rules", "Review checklist", "Output format", "Edge cases"].forEach((label, i) => {
    addPromptBlock(slide, { left: 350, top: 246 + i * 56, width: 232, height: 40, title: label, color: [RED, ORANGE, BLUE, PURPLE][i], fill: [RED_PALE, YELLOW, LIGHT_BLUE, PURPLE_PALE][i] });
  });
  shape(slide, { left: 596, top: 460, width: 112, height: 40, fill: RED_PALE, line: RED, radius: "rounded-md" });
  text(slide, "Task detail", { left: 610, top: 470, width: 84, height: 16, fontSize: 15, color: RED, bold: true, align: "center" });
  line(slide, { left: 620, top: 482, width: 52, height: 36, color: RED, arrow: true, dash: "dash" });
  robotFigure(slide, 720, 256, 0.84, "AI reads");

  keyPanel(slide, ["Unused rules cost tokens", "Copies drift over time", "Task details get pushed out", "Compaction arrives sooner"], { height: 392, color: RED });
  mentalModel(slide, "The model is not ignoring you. The useful task space is being crowded by copied instructions.", { color: RED });
  return slide;
}

function slide3(p) {
  const slide = p.slides.add();
  slide.background.fill = "white";
  header(slide, "Custom Agent: A Reusable Worker Profile", "Stable roles should enter as a prepared worker, not copied prompt text.");

  addPromptBlock(slide, { left: 88, top: 220, width: 230, height: 88, title: "Review prompt", body: "Find bugs\nCheck tests\nReport findings", color: BLUE, fill: LIGHT_BLUE });
  addPromptBlock(slide, { left: 118, top: 332, width: 210, height: 72, title: "Format rules", body: "Findings first", color: ORANGE, fill: YELLOW });
  line(slide, { left: 350, top: 338, width: 110, arrow: true, weight: 4, color: GREEN });
  tag(slide, "Package", { left: 368, top: 270, width: 126, color: GREEN, fill: MINT, icon: "package" });

  robotFigure(slide, 500, 230, 1.0, "Reviewer agent");
  shape(slide, { left: 670, top: 200, width: 278, height: 280, fill: MINT, line: GREEN, radius: "rounded-lg", shadow: "shadow-sm" });
  text(slide, "Agent clipboard", { left: 704, top: 222, width: 210, height: 34, fontSize: 22, color: GREEN, bold: true, align: "center" });
  [["Role", "reviewer"], ["Rules", "find risks"], ["Tools", "repo + tests"], ["Access", "bounded"], ["Quality", "verify"]].forEach(([a, b], i) => {
    shape(slide, { left: 704, top: 274 + i * 38, width: 210, height: 28, fill: "white", line: "#b8dec8", radius: "rounded-md" });
    text(slide, a, { left: 720, top: 280 + i * 38, width: 72, height: 14, fontSize: 14, color: GREEN, bold: true });
    text(slide, b, { left: 804, top: 280 + i * 38, width: 90, height: 14, fontSize: 14, color: NAVY });
  });

  keyPanel(slide, ["Stable role", "Fixed constraints", "Permission boundary", "Repeatable quality bar"], { height: 392, color: GREEN });
  mentalModel(slide, "A custom agent is a prepared worker profile. It carries the same job rules each time.", { color: GREEN });
  return slide;
}

function slide4(p) {
  const slide = p.slides.add();
  slide.background.fill = "white";
  header(slide, "Subagent: Give a Branch Its Own Paper", "The main worker sends bounded local tasks to separate papers.");

  userFigure(slide, 44, 248, 0.86);
  robotFigure(slide, 180, 244, 0.78, "Main agent");
  paper(slide, { left: 330, top: 214, width: 220, height: 210, title: "Main paper", lineColor: BLUE });
  text(slide, "Goal\nconstraints\nshared brief", { left: 388, top: 294, width: 108, height: 72, fontSize: 17, color: NAVY, align: "center" });
  const branches = [
    [600, 166, "Research", "facts", GREEN, MINT],
    [746, 294, "Design", "slides", PURPLE, PURPLE_PALE],
    [600, 430, "QA", "issues", ORANGE, YELLOW],
  ];
  branches.forEach(([x, y, title, body, color, fill], i) => {
    robotFigure(slide, x - 34, y - 18, 0.36, "");
    paper(slide, { left: x + 48, top: y, width: 154, height: 112, title, fill, lineColor: color, titleColor: color });
    text(slide, body, { left: x + 88, top: y + 62, width: 74, height: 20, fontSize: 15, color: NAVY, align: "center" });
    line(slide, { left: 552, top: 318, width: x - 560, height: y + 54 - 318, color, arrow: true, weight: 2 });
  });
  shape(slide, { left: 820, top: 524, width: 150, height: 42, fill: LIGHT_BLUE, line: BLUE, radius: "rounded-md" });
  text(slide, "summary\nartifact", { left: 846, top: 532, width: 98, height: 24, fontSize: 13, color: BLUE, bold: true, align: "center" });

  keyPanel(slide, ["Each worker has a paper", "Only necessary context travels", "Local detail stays local", "Return a boundary result"], { height: 392, color: BLUE });
  mentalModel(slide, "A subagent does not enlarge one paper. It gives a branch its own paper.", { color: BLUE });
  return slide;
}

function slide5(p) {
  const slide = p.slides.add();
  slide.background.fill = "white";
  header(slide, "Proactive Split Beats Waiting for Compaction", "Plan separate papers before one paper becomes overloaded.");

  shape(slide, { left: 70, top: 190, width: 410, height: 300, fill: RED_PALE, line: RED, radius: "rounded-lg", shadow: "shadow-sm" });
  text(slide, "Reactive compaction", { left: 126, top: 216, width: 300, height: 28, fontSize: 26, color: RED, bold: true, align: "center" });
  paper(slide, { left: 118, top: 274, width: 140, height: 132, title: "Full", lineColor: RED });
  text(slide, "logs\nnotes\nerrors", { left: 156, top: 328, width: 60, height: 50, fontSize: 13, color: NAVY, align: "center" });
  line(slide, { left: 276, top: 342, width: 52, arrow: true, weight: 3, color: RED });
  shape(slide, { left: 346, top: 296, width: 92, height: 82, fill: "white", line: RED, radius: "rounded-md" });
  text(slide, "summary", { left: 352, top: 318, width: 80, height: 16, fontSize: 11, color: RED, bold: true, align: "center" });
  text(slide, "detail\nfades", { left: 360, top: 344, width: 64, height: 26, fontSize: 12, color: NAVY, align: "center" });

  shape(slide, { left: 520, top: 190, width: 430, height: 300, fill: MINT, line: GREEN, radius: "rounded-lg", shadow: "shadow-sm" });
  text(slide, "Proactive split", { left: 584, top: 216, width: 300, height: 28, fontSize: 26, color: GREEN, bold: true, align: "center" });
  ["A", "B", "C"].forEach((name, i) => {
    robotFigure(slide, 548 + i * 124, 276, 0.32, "");
    paper(slide, { left: 588 + i * 124, top: 284, width: 90, height: 90, title: `Task ${name}`, fill: "white", lineColor: GREEN, titleColor: GREEN });
  });
  text(slide, "local detail stays intact", { left: 606, top: 414, width: 260, height: 22, fontSize: 18, color: GREEN, bold: true, align: "center" });

  keyPanel(slide, ["Compaction keeps continuity", "Split preserves local detail", "Merge through checkpoints"], { height: 330, color: ORANGE });
  mentalModel(slide, "If one person needs many scratch papers, use multiple workers with one paper each.", { color: ORANGE });
  return slide;
}

function slide6(p) {
  const slide = p.slides.add();
  slide.background.fill = "white";
  header(slide, "Good Subagent Tasks Have Merge Boundaries", "Split where each paper can finish before it needs fresh shared state.");

  paper(slide, { left: 86, top: 222, width: 190, height: 178, title: "Shared brief", lineColor: BLUE });
  const tasks = [["Research", GREEN, MINT], ["Design", PURPLE, PURPLE_PALE], ["QA", ORANGE, YELLOW]];
  tasks.forEach(([name, color], i) => {
    const x = 366 + i * 178;
    line(slide, { left: 282, top: 292 + i * 16, width: x - 292, height: 0, color, arrow: true, weight: 2 });
  });
  line(slide, { left: 438, top: 430, width: 356, height: 0, color: BLUE, weight: 2 });
  tasks.forEach(([name, color, fill], i) => {
    const x = 366 + i * 178;
    robotFigure(slide, x + 34, 150, 0.28, "");
    paper(slide, { left: x, top: 210, width: 144, height: 122, title: name, fill, lineColor: color, titleColor: color });
    miniIcon(slide, i === 0 ? "paper" : i === 1 ? "split" : "warn", x + 50, 348, color);
    line(slide, { left: x + 72, top: 392, width: 0, height: 38, color, weight: 2 });
  });
  shape(slide, { left: 490, top: 454, width: 286, height: 58, fill: LIGHT_BLUE, line: BLUE, radius: "rounded-lg" });
  text(slide, "Merged artifact", { left: 516, top: 474, width: 232, height: 22, fontSize: 18, color: BLUE, bold: true, align: "center" });
  line(slide, { left: 634, top: 430, width: 0, height: 22, color: BLUE, arrow: true });

  keyPanel(slide, ["Independent branch", "Clear input and output", "Easy merge artifact"], { height: 330, color: BLUE });
  mentalModel(slide, "Subagents work best when each paper can finish before it needs fresh shared state.", { color: BLUE });
  return slide;
}

function slide7(p) {
  const slide = p.slides.add();
  slide.background.fill = "white";
  header(slide, "Skill: Load the Prompt Only When Needed", "A skill keeps conditional methods outside the paper until they apply.");

  userFigure(slide, 64, 258, 0.74);
  paper(slide, { left: 240, top: 206, width: 230, height: 228, title: "Current paper", lineColor: BLUE });
  text(slide, "Task:\nImprove deck\n\nMaybe:\nPPT QA?\nDocs lookup?", { left: 296, top: 276, width: 118, height: 104, fontSize: 16, color: NAVY, align: "center" });
  shape(slide, { left: 542, top: 196, width: 226, height: 246, fill: PURPLE_PALE, line: PURPLE, radius: "rounded-lg", shadow: "shadow-sm" });
  miniIcon(slide, "folder", 632, 222, PURPLE);
  text(slide, "Skill registry", { left: 574, top: 276, width: 162, height: 28, fontSize: 24, color: PURPLE, bold: true, align: "center" });
  [["slides", "loaded"], ["docs", "loaded"], ["pdf", "outside"], ["image", "later"]].forEach(([name, state], i) => {
    shape(slide, { left: 584, top: 322 + i * 26, width: 142, height: 20, fill: "white", line: "#d7c7ef", radius: "rounded-md" });
    text(slide, name, { left: 598, top: 326 + i * 26, width: 54, height: 10, fontSize: 11, color: PURPLE, bold: state === "loaded" });
    text(slide, state, { left: 660, top: 326 + i * 26, width: 52, height: 10, fontSize: 10, color: state === "loaded" ? GREEN : MID, align: "right" });
  });
  paper(slide, { left: 812, top: 228, width: 158, height: 180, title: "Loaded", fill: MINT, lineColor: GREEN, titleColor: GREEN });
  text(slide, "relevant\nmanuals\nonly", { left: 844, top: 304, width: 96, height: 54, fontSize: 15, color: NAVY, align: "center" });
  line(slide, { left: 482, top: 320, width: 50, arrow: true, weight: 4, color: PURPLE });
  line(slide, { left: 776, top: 320, width: 42, arrow: true, weight: 4, color: PURPLE });

  keyPanel(slide, ["Only relevant materials load", "Unused skills stay outside", "Skills are just-in-time manuals"], { height: 330, color: PURPLE });
  mentalModel(slide, "A skill is a manual pack placed onto the paper only when the task needs it.", { color: PURPLE });
  return slide;
}

function slide8(p) {
  const slide = p.slides.add();
  slide.background.fill = "white";
  header(slide, "Skill Bundles Prompts with Tools and Examples", "A reusable capability is a small kit, not just a prompt.");

  paper(slide, { left: 82, top: 238, width: 210, height: 190, title: "Prompt only", lineColor: BLUE });
  text(slide, "steps\nformat\nchecklist", { left: 132, top: 314, width: 110, height: 58, fontSize: 17, color: NAVY, align: "center" });
  line(slide, { left: 320, top: 334, width: 80, arrow: true, weight: 4, color: GREEN });
  shape(slide, { left: 432, top: 190, width: 440, height: 300, fill: MINT, line: GREEN, radius: "rounded-lg", shadow: "shadow-sm" });
  miniIcon(slide, "folder", 626, 214, GREEN);
  text(slide, "Skill folder kit", { left: 536, top: 266, width: 232, height: 28, fontSize: 27, color: GREEN, bold: true, align: "center" });
  [["SKILL.md", "workflow rules", GREEN], ["scripts/", "repeatable operations", BLUE], ["examples/", "good outputs", PURPLE], ["templates/", "starting frames", ORANGE]].forEach(([name, body, color], i) => {
    miniIcon(slide, i === 1 ? "pen" : i === 2 ? "paper" : i === 3 ? "package" : "load", 486, 318 + i * 38, color);
    shape(slide, { left: 540, top: 322 + i * 38, width: 278, height: 28, fill: "white", line: "#b8dec8", radius: "rounded-md" });
    text(slide, name, { left: 556, top: 328 + i * 38, width: 84, height: 12, fontSize: 13, color, bold: true });
    text(slide, body, { left: 656, top: 328 + i * 38, width: 132, height: 12, fontSize: 13, color: NAVY });
  });
  robotFigure(slide, 854, 304, 0.42, "");
  line(slide, { left: 820, top: 356, width: 40, arrow: true, weight: 3, color: GREEN });

  keyPanel(slide, ["Prompt plus resources", "Scripts stay with method", "Examples make quality repeatable"], { height: 330, color: GREEN });
  mentalModel(slide, "A skill is a small kit that places the right materials onto the paper when needed.", { color: GREEN });
  return slide;
}

function slide9(p) {
  const slide = p.slides.add();
  slide.background.fill = "white";
  header(slide, "Choose the Right Prompt-Scaling Pattern", "Each object solves a different loading problem.");

  const cards = [
    ["Write", "current paper", BLUE, LIGHT_BLUE, "pen"],
    ["Package", "agent paper", GREEN, MINT, "package"],
    ["Split", "branch papers", ORANGE, YELLOW, "split"],
    ["Load", "skill paper", PURPLE, PURPLE_PALE, "skill"],
  ];
  cards.forEach(([title, body, color, fill, icon], i) => {
    const x = 96 + i * 216;
    miniIcon(slide, icon, x + 58, 204, color);
    paper(slide, { left: x, top: 262, width: 166, height: 152, title, fill, lineColor: color, titleColor: color });
    text(slide, body, { left: x + 28, top: 334, width: 110, height: 34, fontSize: 15, color: NAVY, bold: true, align: "center" });
    if (i === 2) {
      paper(slide, { left: x + 18, top: 424, width: 56, height: 54, title: "A", fill: "white", lineColor: color, titleColor: color });
      paper(slide, { left: x + 92, top: 424, width: 56, height: 54, title: "B", fill: "white", lineColor: color, titleColor: color });
    }
    if (i < cards.length - 1) line(slide, { left: x + 174, top: 338, width: 34, arrow: true, weight: 2, color: MID });
  });

  keyPanel(slide, ["Stable role -> agent", "Independent branch -> subagent", "Conditional method -> skill"], { height: 330, color: BLUE });
  mentalModel(slide, "Do not put every reusable idea in the same place. Match the object to the loading problem.", { color: BLUE });
  return slide;
}

function slide10(p) {
  const slide = p.slides.add();
  slide.background.fill = "white";
  header(slide, "Takeaway: Design How Instructions Travel", "Prompt engineering writes instructions; context architecture routes them.");

  userFigure(slide, 68, 260, 0.76);
  const route = [
    ["Write", BLUE, "pen"],
    ["Package", GREEN, "package"],
    ["Split", ORANGE, "split"],
    ["Load", PURPLE, "load"],
    ["Workflow", RED, "merge"],
  ];
  route.forEach(([label, color, icon], i) => {
    const x = 248 + i * 132;
    miniIcon(slide, icon, x + 34, 248, color);
    paper(slide, { left: x, top: 310, width: 112, height: 104, title: label, fill: "white", lineColor: color, titleColor: color });
    if (i < route.length - 1) line(slide, { left: x + 116, top: 362, width: 20, arrow: true, weight: 2, color: MID });
  });
  robotFigure(slide, 870, 286, 0.52, "Workflow");
  shape(slide, { left: 348, top: 478, width: 220, height: 52, fill: YELLOW, line: ORANGE, radius: "rounded-md" });
  text(slide, "Lesson 2.1\nruntime contracts", { left: 366, top: 488, width: 184, height: 34, fontSize: 15, color: ORANGE, bold: true, align: "center" });
  shape(slide, { left: 608, top: 478, width: 220, height: 52, fill: LIGHT_BLUE, line: BLUE, radius: "rounded-md" });
  text(slide, "Lesson 3: workflows", { left: 628, top: 494, width: 180, height: 16, fontSize: 15, color: BLUE, bold: true, align: "center" });

  keyPanel(slide, ["Prompts are instructions", "Context has limited space", "Architecture decides travel"], { height: 330, color: BLUE });
  mentalModel(slide, "Prompt engineering writes instructions; context architecture decides where they travel.", { color: BLUE });
  return slide;
}

const builders = [slide1, slide2, slide3, slide4, slide5, slide6, slide7, slide8, slide9, slide10];

async function main() {
  await fs.mkdir(path.dirname(outputPath), { recursive: true });
  await fs.mkdir(assetDir, { recursive: true });
  await fs.mkdir(previewDir, { recursive: true });

  const designPresentation = Presentation.create({ slideSize: { width: 1280, height: 720 } });
  builders.forEach((build, index) => {
    const slide = build(designPresentation);
    slide.speakerNotes.textFrame.setText(slideMeta[index].notes);
    slide.speakerNotes.setVisible(true);
  });

  for (const [index, slide] of designPresentation.slides.items.entries()) {
    const stem = `slide-${String(index + 1).padStart(2, "0")}`;
    await writeBlob(path.join(previewDir, `${stem}.png`), await designPresentation.export({ slide, format: "png", scale: 1 }));
    await writeBlob(path.join(assetDir, `${stem}.png`), await designPresentation.export({ slide, format: "png", scale: assetScale }));
    await normalizeLessonAsset(path.join(assetDir, `${stem}.png`));
    const layout = await slide.export({ format: "layout" });
    await fs.writeFile(path.join(previewDir, `${stem}.layout.json`), await layout.text());
  }

  await writeBlob(path.join(previewDir, "lesson-02-montage.webp"), await designPresentation.export({ format: "webp", montage: true, scale: 1 }));

  const deliveryPresentation = Presentation.create({ slideSize: { width: 1280, height: 720 } });
  for (const [index, meta] of slideMeta.entries()) {
    const slide = deliveryPresentation.slides.add();
    slide.background.fill = "white";
    const imagePath = path.join(assetDir, `slide-${String(index + 1).padStart(2, "0")}.png`);
    slide.images.add({
      blob: await fs.readFile(imagePath),
      contentType: "image/png",
      alt: `Lesson 2 slide ${index + 1}`,
      fit: "contain",
      position: { left: 0, top: 0, width: 1280, height: 720 },
    });
    slide.speakerNotes.textFrame.setText(meta.notes);
    slide.speakerNotes.setVisible(true);
  }

  const pptx = await PresentationFile.exportPptx(deliveryPresentation);
  await pptx.save(outputPath);
  await pptx.save(legacyOutputPath);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
