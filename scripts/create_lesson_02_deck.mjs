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
const GRAY = "#f2f5f9";
const MID = "#53637a";

const slideMeta = [
  {
    notes:
      "Open by connecting directly to Lesson 1. Lesson 1 taught that the model reads one visible paper. Lesson 2 asks how we scale the prompts that prepare that paper without pasting every rule into every turn.",
  },
  {
    notes:
      "Make the pain concrete. Custom prompts work, but repeated copying creates token cost, drift, duplication, and maintenance problems. This sets up the need for packaging, splitting, and dynamic loading.",
  },
  {
    notes:
      "Define a custom agent as the reusable package for stable role instructions. It is a custom prompt plus a runtime profile: role, rules, tools, permissions, boundaries, and quality bar.",
  },
  {
    notes:
      "Introduce subagents as separate working papers. A subagent may start from a shared task brief or forked context, then keeps its own local detail and returns a summary or artifact.",
  },
  {
    notes:
      "Contrast compaction with planned decomposition. Compaction compresses one evolving paper when it gets too full. Subagent decomposition proactively assigns separate papers to weakly coupled branches.",
  },
  {
    notes:
      "Give the audience the operating rule. Subagents work best when tasks have clear boundaries, can run independently for a while, and can merge through a summary, file, finding list, or checkpoint.",
  },
  {
    notes:
      "Define a skill as a just-in-time prompt/manual pack. Use it when you cannot know up front whether a specific checklist, template, or method will be needed in this task.",
  },
  {
    notes:
      "Show that a skill is more than a prompt. It can sit beside scripts, templates, examples, schemas, and references so a repeated capability is organized as a small tool kit.",
  },
  {
    notes:
      "Summarize the selection logic. Stable role goes into a custom agent. Independent branch goes to a subagent. Conditional method goes into a skill. One-off detail stays in the current prompt.",
  },
  {
    notes:
      "Close the loop. Lesson 2 is about scaling custom prompts by packaging, isolating, and loading them just in time. Lesson 2.1 goes deeper into runtime objects; Lesson 3 handles multi-agent workflows.",
  },
];

async function writeBlob(filePath, blob) {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
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

function addText(slide, value, { left, top, width, height, fontSize = 20, color = NAVY, bold = false, italic = false, align = "left" }) {
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

function addHeader(slide, title, subtitle, number) {
  addShape(slide, { left: 48, top: 34, width: 52, height: 52, fill: BLUE, line: BLUE, radius: "rounded-md", shadow: "shadow-sm" });
  addText(slide, String(number), { left: 64, top: 45, width: 20, height: 28, fontSize: 26, color: "white", bold: true, align: "center" });
  const titleFont = title.length > 54 ? 34 : title.length > 44 ? 36 : 40;
  addText(slide, title, { left: 126, top: 34, width: 1080, height: 54, fontSize: titleFont, color: NAVY, bold: true });
  addText(slide, subtitle, { left: 126, top: 92, width: 1020, height: 30, fontSize: 20, color: BLUE });
  addLine(slide, { left: 48, top: 130, width: 1184, weight: 2 });
}

function addBadge(slide, value, { left, top, color = BLUE, size = 40 }) {
  addShape(slide, { left, top, width: size, height: size, fill: color, line: color, radius: "rounded-full" });
  addText(slide, value, { left: left + size * 0.3, top: top + size * 0.23, width: size * 0.4, height: size * 0.4, fontSize: size * 0.42, color: "white", bold: true, align: "center" });
}

function addPaper(slide, { left, top, width, height, title = "Paper", fill = "white", line = BORDER }) {
  addShape(slide, { left, top, width, height, fill, line, radius: "rounded-lg", shadow: "shadow-sm" });
  addLine(slide, { left: left + 46, top: top + 10, width: 0, height: height - 20, color: "#ffb5b5", weight: 1 });
  for (let y = top + 58; y < top + height - 20; y += 32) {
    addLine(slide, { left: left + 16, top: y, width: width - 32, color: "#dbe8f6", weight: 1 });
  }
  addText(slide, title, { left: left + 70, top: top + 20, width: width - 100, height: 28, fontSize: 24, color: BLUE, bold: true, align: "center" });
}

function addPromptBlock(slide, { left, top, width, height, title, body, color = BLUE, fill = PALE }) {
  addShape(slide, { left, top, width, height, fill, line: color, radius: "rounded-md" });
  addText(slide, title, { left: left + 16, top: top + 10, width: width - 32, height: 22, fontSize: 17, color, bold: true, align: "center" });
  addText(slide, body, { left: left + 18, top: top + 38, width: width - 36, height: height - 44, fontSize: 14, color: NAVY, align: "center" });
}

function addFooterCallout(slide, { label, text, fill = YELLOW, line = "#f0d891", color = ORANGE }) {
  addShape(slide, { left: 68, top: 606, width: 1144, height: 66, fill, line, radius: "rounded-lg", shadow: "shadow-sm" });
  addText(slide, label, { left: 104, top: 626, width: 190, height: 24, fontSize: 22, color, bold: true });
  addText(slide, text, { left: 320, top: 624, width: 840, height: 28, fontSize: 21, color: NAVY });
}

function slide1(presentation) {
  const slide = presentation.slides.add();
  slide.background.fill = "white";
  addText(slide, "Lesson 2", { left: 62, top: 42, width: 230, height: 54, fontSize: 48, color: BLUE, bold: true });
  addText(slide, "Custom Prompts at Scale", { left: 302, top: 42, width: 850, height: 54, fontSize: 48, color: NAVY, bold: true });
  addText(slide, "Reuse, split, and load prompt-like instructions without crowding one paper.", {
    left: 220,
    top: 112,
    width: 840,
    height: 32,
    fontSize: 22,
    color: BLUE,
    italic: true,
    align: "center",
  });
  addLine(slide, { left: 62, top: 156, width: 1156, weight: 2 });

  addPaper(slide, { left: 82, top: 218, width: 274, height: 250, title: "Lesson 1 paper" });
  addText(slide, "User prompt\nSystem prompt\nContext\nTool result", { left: 140, top: 288, width: 164, height: 116, fontSize: 22, color: NAVY, align: "center" });

  addLine(slide, { left: 382, top: 344, width: 96, arrow: true, weight: 4 });
  addText(slide, "scale the\nprompts", { left: 382, top: 282, width: 96, height: 46, fontSize: 18, color: BLUE, bold: true, align: "center" });

  const cards = [
    ["Custom agent", "Package stable roles", GREEN, MINT],
    ["Subagent", "Give a branch its own paper", BLUE, LIGHT_BLUE],
    ["Skill", "Load a method only when needed", PURPLE, PURPLE_PALE],
  ];
  cards.forEach(([title, body, color, fill], i) => {
    const left = 514 + i * 224;
    addShape(slide, { left, top: 202, width: 190, height: 286, fill, line: color, radius: "rounded-lg", shadow: "shadow-sm" });
    addBadge(slide, String(i + 1), { left: left + 72, top: 230, color, size: 44 });
    addText(slide, title, { left: left + 18, top: 292, width: 154, height: 28, fontSize: 22, color, bold: true, align: "center" });
    addText(slide, body, { left: left + 20, top: 344, width: 150, height: 70, fontSize: 18, color: NAVY, align: "center" });
  });

  addFooterCallout(slide, {
    label: "Core idea",
    text: "Lesson 2 is not more prompting. It is prompt reuse, isolation, and just-in-time loading.",
  });
  return slide;
}

function slide2(presentation) {
  const slide = presentation.slides.add();
  slide.background.fill = "white";
  addHeader(slide, "Copy-Pasted Custom Prompts Break the Paper", "A good prompt becomes a problem when every task carries every rule.", 1);

  addPaper(slide, { left: 70, top: 178, width: 418, height: 348, title: "One crowded paper", line: RED });
  [
    ["Role rules", "You are a senior reviewer...", RED, RED_PALE],
    ["Checklist", "Check docs, tests, security...", ORANGE, YELLOW],
    ["Format rules", "Use table, cite files, no fluff...", BLUE, LIGHT_BLUE],
    ["Edge cases", "If API changes, compare versions...", PURPLE, PURPLE_PALE],
  ].forEach(([title, body, color, fill], i) => {
    addPromptBlock(slide, { left: 130, top: 246 + i * 58, width: 286, height: 46, title, body, color, fill });
  });

  addLine(slide, { left: 518, top: 346, width: 80, arrow: true, weight: 4, color: RED });

  const problems = [
    ["Token cost", "Every unused rule still consumes attention."],
    ["Prompt drift", "Copies change in different places."],
    ["Maintenance", "No clear owner for the latest version."],
    ["Compaction risk", "Long prompts push real task detail out sooner."],
  ];
  problems.forEach(([title, body], i) => {
    const left = 632 + (i % 2) * 280;
    const top = 210 + Math.floor(i / 2) * 142;
    addShape(slide, { left, top, width: 246, height: 106, fill: i % 2 ? PALE : LIGHT_BLUE, line: BORDER, radius: "rounded-lg" });
    addBadge(slide, String(i + 1), { left: left + 18, top: top + 32, color: RED, size: 38 });
    addText(slide, title, { left: left + 70, top: top + 24, width: 146, height: 24, fontSize: 21, color: RED, bold: true });
    addText(slide, body, { left: left + 70, top: top + 54, width: 152, height: 34, fontSize: 15, color: NAVY });
  });

  addFooterCallout(slide, {
    label: "Question",
    text: "Which prompts should be packaged, which should be split, and which should load later?",
    fill: LIGHT_BLUE,
    line: BLUE,
    color: BLUE,
  });
  return slide;
}

function slide3(presentation) {
  const slide = presentation.slides.add();
  slide.background.fill = "white";
  addHeader(slide, "Custom Agent: Package a Stable Custom Prompt", "Use a reusable worker profile when the role and rules are predictable.", 2);

  addShape(slide, { left: 78, top: 188, width: 284, height: 296, fill: PALE, line: BLUE, radius: "rounded-lg", shadow: "shadow-sm" });
  addText(slide, "Custom prompt", { left: 112, top: 220, width: 216, height: 30, fontSize: 26, color: BLUE, bold: true, align: "center" });
  addText(slide, "\"Act as a reviewer.\nCheck correctness.\nFind test gaps.\nReturn findings first.\"", {
    left: 112,
    top: 292,
    width: 216,
    height: 116,
    fontSize: 20,
    color: NAVY,
    align: "center",
  });

  addLine(slide, { left: 392, top: 336, width: 90, arrow: true, weight: 4 });
  addText(slide, "stabilize\nand package", { left: 386, top: 270, width: 104, height: 46, fontSize: 17, color: BLUE, bold: true, align: "center" });

  addShape(slide, { left: 514, top: 156, width: 636, height: 370, fill: LIGHT_BLUE, line: GREEN, radius: "rounded-lg", shadow: "shadow-sm" });
  addText(slide, "Custom agent profile", { left: 614, top: 188, width: 436, height: 34, fontSize: 30, color: GREEN, bold: true, align: "center" });
  const parts = [
    ["Role", "what job this worker owns"],
    ["Rules", "standing instructions and standards"],
    ["Tools", "allowed capabilities"],
    ["Access", "permissions and sandbox"],
    ["Boundary", "what not to change"],
    ["Quality bar", "how to verify and report"],
  ];
  parts.forEach(([title, body], i) => {
    const left = 572 + (i % 2) * 274;
    const top = 252 + Math.floor(i / 2) * 74;
    addShape(slide, { left, top, width: 236, height: 54, fill: "white", line: "#b8dec8", radius: "rounded-md" });
    addText(slide, title, { left: left + 16, top: top + 8, width: 78, height: 18, fontSize: 16, color: GREEN, bold: true });
    addText(slide, body, { left: left + 96, top: top + 8, width: 120, height: 34, fontSize: 14, color: NAVY });
  });

  addFooterCallout(slide, {
    label: "Use when",
    text: "The same role and constraints recur often enough that copy-paste should become configuration.",
    fill: MINT,
    line: GREEN,
    color: GREEN,
  });
  return slide;
}

function slide4(presentation) {
  const slide = presentation.slides.add();
  slide.background.fill = "white";
  addHeader(slide, "Subagent: Give a Branch Its Own Paper", "A subagent is a delegated run with a separate working context.", 3);

  addPaper(slide, { left: 88, top: 202, width: 280, height: 260, title: "Main paper", line: BLUE });
  addText(slide, "Goal\nConstraints\nShared brief", { left: 150, top: 292, width: 154, height: 88, fontSize: 22, color: NAVY, align: "center" });

  const branches = [
    [558, 164, "Research paper", "Facts and sources", GREEN, MINT],
    [850, 272, "Design paper", "Slide structure", PURPLE, PURPLE_PALE],
    [558, 414, "QA paper", "Review findings", ORANGE, YELLOW],
  ];
  branches.forEach(([left, top, title, body, color, fill], i) => {
    const elbowX = i === 1 ? 804 : 512;
    addLine(slide, { left: 388, top: 326, width: elbowX - 388, color, weight: 3 });
    if (top + 70 >= 326) {
      addLine(slide, { left: elbowX, top: 326, width: 0, height: top + 70 - 326, color, weight: 3 });
    } else {
      addLine(slide, { left: elbowX, top: top + 70, width: 0, height: 326 - (top + 70), color, weight: 3 });
    }
    addLine(slide, { left: elbowX, top: top + 70, width: left - elbowX, color, arrow: true, weight: 3 });
    addPaper(slide, { left, top, width: 246, height: 156, title, fill, line: color });
    addText(slide, body, { left: left + 54, top: top + 78, width: 140, height: 40, fontSize: 18, color: NAVY, align: "center" });
    addBadge(slide, String(i + 1), { left: left + 98, top: top - 18, color, size: 38 });
  });

  addShape(slide, { left: 920, top: 500, width: 230, height: 70, fill: PALE, line: BLUE, radius: "rounded-lg" });
  addText(slide, "Return boundary", { left: 946, top: 512, width: 178, height: 22, fontSize: 19, color: BLUE, bold: true, align: "center" });
  addText(slide, "summary or artifact", { left: 960, top: 540, width: 150, height: 18, fontSize: 16, color: NAVY, align: "center" });

  addFooterCallout(slide, {
    label: "Key point",
    text: "A subagent does not enlarge one context window; it moves local work onto another paper.",
    fill: LIGHT_BLUE,
    line: BLUE,
    color: BLUE,
  });
  return slide;
}

function slide5(presentation) {
  const slide = presentation.slides.add();
  slide.background.fill = "white";
  addHeader(slide, "Subagents Avoid Waiting for Compaction", "Plan separate papers before one paper becomes overloaded.", 4);

  addShape(slide, { left: 70, top: 174, width: 522, height: 356, fill: RED_PALE, line: "#f0b5b5", radius: "rounded-lg", shadow: "shadow-sm" });
  addText(slide, "Reactive compaction", { left: 142, top: 204, width: 378, height: 32, fontSize: 30, color: RED, bold: true, align: "center" });
  addShape(slide, { left: 138, top: 272, width: 176, height: 142, fill: "white", line: RED, radius: "rounded-lg" });
  addText(slide, "Full paper", { left: 162, top: 298, width: 128, height: 24, fontSize: 22, color: RED, bold: true, align: "center" });
  addText(slide, "many turns\nlogs\nnotes\nfiles\nerrors", { left: 170, top: 334, width: 112, height: 70, fontSize: 15, color: NAVY, align: "center" });
  addLine(slide, { left: 334, top: 348, width: 84, arrow: true, weight: 4, color: RED });
  addShape(slide, { left: 430, top: 292, width: 138, height: 110, fill: "white", line: RED, radius: "rounded-lg" });
  addText(slide, "Summary", { left: 448, top: 316, width: 102, height: 22, fontSize: 17, color: RED, bold: true, align: "center" });
  addText(slide, "detail is\ncompressed", { left: 450, top: 354, width: 98, height: 36, fontSize: 13, color: NAVY, align: "center" });
  addText(slide, "Keeps continuity, but may lose exact wording or edge detail.", { left: 130, top: 462, width: 402, height: 42, fontSize: 18, color: NAVY, align: "center" });

  addShape(slide, { left: 688, top: 174, width: 522, height: 356, fill: MINT, line: GREEN, radius: "rounded-lg", shadow: "shadow-sm" });
  addText(slide, "Proactive split", { left: 760, top: 204, width: 378, height: 32, fontSize: 30, color: GREEN, bold: true, align: "center" });
  ["Task A", "Task B", "Task C"].forEach((label, i) => {
    const left = 746 + i * 144;
    addShape(slide, { left, top: 276, width: 132, height: 118, fill: "white", line: GREEN, radius: "rounded-lg" });
    addText(slide, label, { left: left + 16, top: 306, width: 100, height: 24, fontSize: 22, color: GREEN, bold: true, align: "center" });
    addText(slide, "local\ndetail", { left: left + 28, top: 348, width: 76, height: 34, fontSize: 15, color: NAVY, align: "center" });
  });
  addText(slide, "Each branch keeps local detail.", { left: 770, top: 440, width: 358, height: 24, fontSize: 20, color: NAVY, bold: true, align: "center" });
  addText(slide, "Merge through summaries, files, or checkpoints.", { left: 770, top: 474, width: 358, height: 22, fontSize: 18, color: GREEN, align: "center" });

  addFooterCallout(slide, {
    label: "Principle",
    text: "If one person needs many scratch papers, use multiple workers with one paper each.",
    fill: YELLOW,
    line: "#f0d891",
    color: ORANGE,
  });
  return slide;
}

function slide6(presentation) {
  const slide = presentation.slides.add();
  slide.background.fill = "white";
  addHeader(slide, "Good Subagent Tasks Have Clean Merge Boundaries", "Split where branches can work before they need fresh shared state.", 5);

  const good = [
    ["Independent", "Can progress without constant cross-talk."],
    ["Bounded", "Clear input, output, and stop condition."],
    ["Parallel", "Multiple branches can run at the same time."],
    ["Mergeable", "Returns findings, artifact, patch, or summary."],
  ];
  addShape(slide, { left: 70, top: 172, width: 540, height: 338, fill: LIGHT_BLUE, line: BLUE, radius: "rounded-lg", shadow: "shadow-sm" });
  addText(slide, "Good split", { left: 160, top: 204, width: 360, height: 32, fontSize: 30, color: BLUE, bold: true, align: "center" });
  good.forEach(([title, body], i) => {
    const top = 264 + i * 56;
    addBadge(slide, String(i + 1), { left: 126, top: top + 2, color: BLUE, size: 34 });
    addText(slide, title, { left: 176, top, width: 146, height: 22, fontSize: 19, color: BLUE, bold: true });
    addText(slide, body, { left: 330, top: top + 1, width: 218, height: 36, fontSize: 15, color: NAVY });
  });

  addShape(slide, { left: 700, top: 172, width: 510, height: 338, fill: RED_PALE, line: "#f0b5b5", radius: "rounded-lg", shadow: "shadow-sm" });
  addText(slide, "Harder split", { left: 790, top: 204, width: 330, height: 32, fontSize: 30, color: RED, bold: true, align: "center" });
  [
    ["One changing source of truth", "Every branch needs the latest state."],
    ["Tiny tasks", "Coordination costs more than execution."],
    ["Unclear merge output", "No obvious artifact to return."],
  ].forEach(([title, body], i) => {
    const top = 282 + i * 70;
    addText(slide, title, { left: 762, top, width: 360, height: 22, fontSize: 20, color: RED, bold: true });
    addText(slide, body, { left: 762, top: top + 28, width: 370, height: 22, fontSize: 17, color: NAVY });
    addLine(slide, { left: 736, top: top + 10, width: 12, color: RED, weight: 4 });
  });

  addFooterCallout(slide, {
    label: "Not a ban",
    text: "Strong coupling is not automatic failure. The real test is sync frequency and merge clarity.",
    fill: PALE,
    line: BORDER,
    color: BLUE,
  });
  return slide;
}

function slide7(presentation) {
  const slide = presentation.slides.add();
  slide.background.fill = "white";
  addHeader(slide, "Skill: Load the Prompt Only When the Task Needs It", "Use skills for methods that may or may not apply in a complex run.", 6);

  addPaper(slide, { left: 76, top: 196, width: 300, height: 272, title: "Current paper", line: BLUE });
  addText(slide, "Task:\nImprove Lesson 2\n\nUnknown:\nWill we need\nPPT QA?\nDocs lookup?\nImage workflow?", {
    left: 140,
    top: 266,
    width: 170,
    height: 156,
    fontSize: 18,
    color: NAVY,
    align: "center",
  });

  addLine(slide, { left: 410, top: 336, width: 92, arrow: true, weight: 4, color: PURPLE });

  addShape(slide, { left: 530, top: 170, width: 270, height: 330, fill: PURPLE_PALE, line: PURPLE, radius: "rounded-lg", shadow: "shadow-sm" });
  addText(slide, "Skill registry", { left: 570, top: 202, width: 190, height: 30, fontSize: 27, color: PURPLE, bold: true, align: "center" });
  [
    ["presentations", "loaded"],
    ["openai-docs", "loaded"],
    ["pdf", "outside"],
    ["spreadsheets", "outside"],
    ["imagegen", "only if needed"],
  ].forEach(([name, state], i) => {
    const active = state === "loaded";
    addShape(slide, { left: 570, top: 260 + i * 42, width: 190, height: 30, fill: active ? "white" : "#fbf8ff", line: active ? PURPLE : "#d7c7ef", radius: "rounded-md" });
    addText(slide, name, { left: 586, top: 266 + i * 42, width: 104, height: 16, fontSize: 15, color: active ? PURPLE : MID, bold: active });
    addText(slide, state, { left: 694, top: 266 + i * 42, width: 52, height: 16, fontSize: 13, color: active ? GREEN : MID, align: "right" });
  });

  addLine(slide, { left: 830, top: 336, width: 92, arrow: true, weight: 4, color: PURPLE });

  addPaper(slide, { left: 954, top: 196, width: 250, height: 272, title: "Loaded paper", line: GREEN, fill: MINT });
  addText(slide, "Only relevant\nmanuals,\nchecklists,\nand examples\nenter now.", {
    left: 1006,
    top: 296,
    width: 146,
    height: 116,
    fontSize: 21,
    color: NAVY,
    align: "center",
  });

  addFooterCallout(slide, {
    label: "Use when",
    text: "You cannot know upfront which prompt pack, checklist, or reference will be useful.",
    fill: PURPLE_PALE,
    line: PURPLE,
    color: PURPLE,
  });
  return slide;
}

function slide8(presentation) {
  const slide = presentation.slides.add();
  slide.background.fill = "white";
  addHeader(slide, "Skill Bundles Prompts, Scripts, and Examples", "A reusable capability is often a small folder, not a single prompt.", 7);

  addShape(slide, { left: 86, top: 174, width: 354, height: 356, fill: PALE, line: BLUE, radius: "rounded-lg", shadow: "shadow-sm" });
  addText(slide, "Prompt only", { left: 142, top: 210, width: 240, height: 30, fontSize: 28, color: BLUE, bold: true, align: "center" });
  addPromptBlock(slide, {
    left: 136,
    top: 292,
    width: 254,
    height: 116,
    title: "custom prompt",
    body: "Follow these steps...\nUse this format...\nCheck these cases...",
    color: BLUE,
    fill: LIGHT_BLUE,
  });
  addText(slide, "Good for simple reuse.", { left: 144, top: 452, width: 236, height: 24, fontSize: 19, color: NAVY, align: "center" });

  addLine(slide, { left: 468, top: 350, width: 74, arrow: true, weight: 4, color: GREEN });

  addShape(slide, { left: 572, top: 154, width: 626, height: 396, fill: MINT, line: GREEN, radius: "rounded-lg", shadow: "shadow-sm" });
  addText(slide, "Skill folder", { left: 720, top: 188, width: 330, height: 34, fontSize: 32, color: GREEN, bold: true, align: "center" });
  const files = [
    ["SKILL.md", "when to use it and workflow rules", GREEN],
    ["scripts/", "repeatable operations", BLUE],
    ["examples/", "good outputs and patterns", PURPLE],
    ["templates/", "starting documents or deck frames", ORANGE],
    ["references/", "detailed guidance loaded as needed", RED],
  ];
  files.forEach(([name, body, color], i) => {
    const top = 252 + i * 52;
    addShape(slide, { left: 642, top, width: 478, height: 38, fill: "white", line: "#b8dec8", radius: "rounded-md" });
    addText(slide, name, { left: 660, top: top + 8, width: 126, height: 18, fontSize: 16, color, bold: true });
    addText(slide, body, { left: 800, top: top + 8, width: 292, height: 18, fontSize: 16, color: NAVY });
  });

  addFooterCallout(slide, {
    label: "Design rule",
    text: "Keep prompts, scripts, examples, and references together.",
    fill: MINT,
    line: GREEN,
    color: GREEN,
  });
  return slide;
}

function slide9(presentation) {
  const slide = presentation.slides.add();
  slide.background.fill = "white";
  addHeader(slide, "Choose the Right Prompt-Scaling Pattern", "Do not put every reusable idea into the same object.", 8);

  const columns = [
    ["One-off prompt", "This task only", "Current paper", "Use for temporary details.", BLUE, LIGHT_BLUE],
    ["Custom agent", "Stable role", "Reusable profile", "Use for recurring worker behavior.", GREEN, MINT],
    ["Subagent", "Independent branch", "Separate paper", "Use when local detail should stay outside main context.", ORANGE, YELLOW],
    ["Skill", "Conditional method", "Just-in-time pack", "Use when the method may or may not be needed.", PURPLE, PURPLE_PALE],
  ];
  columns.forEach(([title, trigger, where, use, color, fill], i) => {
    const left = 60 + i * 304;
    addShape(slide, { left, top: 170, width: 268, height: 360, fill, line: color, radius: "rounded-lg", shadow: "shadow-sm" });
    addText(slide, title, { left: left + 18, top: 202, width: 232, height: 30, fontSize: 22, color, bold: true, align: "center" });
    addLine(slide, { left: left + 38, top: 250, width: 192, color, weight: 2 });
    addText(slide, "Trigger", { left: left + 34, top: 278, width: 200, height: 20, fontSize: 16, color, bold: true, align: "center" });
    addText(slide, trigger, { left: left + 34, top: 306, width: 200, height: 36, fontSize: 17, color: NAVY, align: "center" });
    addText(slide, "Lives as", { left: left + 34, top: 358, width: 200, height: 20, fontSize: 16, color, bold: true, align: "center" });
    addText(slide, where, { left: left + 34, top: 386, width: 200, height: 36, fontSize: 17, color: NAVY, align: "center" });
    addText(slide, use, { left: left + 32, top: 454, width: 204, height: 48, fontSize: 15, color: NAVY, bold: true, align: "center" });
  });

  addFooterCallout(slide, {
    label: "Shortcut",
    text: "Stable role -> agent. Independent branch -> subagent. Conditional method -> skill.",
    fill: PALE,
    line: BORDER,
    color: BLUE,
  });
  return slide;
}

function slide10(presentation) {
  const slide = presentation.slides.add();
  slide.background.fill = "white";
  addHeader(slide, "Takeaway: Design Prompt Loading", "The question is not only what to write, but where and when to load it.", 9);

  addShape(slide, { left: 82, top: 176, width: 1116, height: 316, fill: PALE, line: BORDER, radius: "rounded-lg", shadow: "shadow-sm" });
  const ladder = [
    ["Write", "one-off task prompt", BLUE],
    ["Package", "custom agent for stable roles", GREEN],
    ["Split", "subagent papers for local branches", ORANGE],
    ["Load", "skill packs when relevant", PURPLE],
    ["Workflow", "Lesson 3 orchestration", RED],
  ];
  ladder.forEach(([verb, body, color], i) => {
    const left = 120 + i * 210;
    addShape(slide, { left, top: 240, width: 168, height: 138, fill: "white", line: color, radius: "rounded-lg" });
    addBadge(slide, String(i + 1), { left: left + 64, top: 218, color, size: 40 });
    addText(slide, verb, { left: left + 20, top: 272, width: 128, height: 26, fontSize: 22, color, bold: true, align: "center" });
    addText(slide, body, { left: left + 18, top: 314, width: 132, height: 42, fontSize: 16, color: NAVY, align: "center" });
    if (i < ladder.length - 1) addLine(slide, { left: left + 174, top: 310, width: 34, arrow: true, weight: 2, color: MID });
  });

  addShape(slide, { left: 126, top: 526, width: 456, height: 74, fill: YELLOW, line: "#f0d891", radius: "rounded-lg" });
  addText(slide, "Lesson 2.1", { left: 166, top: 544, width: 130, height: 24, fontSize: 21, color: ORANGE, bold: true });
  addText(slide, "Advanced runtime objects and contracts.", { left: 310, top: 546, width: 230, height: 22, fontSize: 17, color: NAVY });

  addShape(slide, { left: 698, top: 526, width: 456, height: 74, fill: LIGHT_BLUE, line: BLUE, radius: "rounded-lg" });
  addText(slide, "Lesson 3", { left: 738, top: 544, width: 108, height: 24, fontSize: 21, color: BLUE, bold: true });
  addText(slide, "Multiple papers become an agentic workflow.", { left: 862, top: 546, width: 248, height: 22, fontSize: 17, color: NAVY });

  addFooterCallout(slide, {
    label: "Final model",
    text: "Prompt engineering writes instructions; context architecture decides how they travel.",
    fill: LIGHT_BLUE,
    line: BLUE,
    color: BLUE,
  });
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
    const png = await designPresentation.export({ slide, format: "png", scale: 1 });
    await writeBlob(path.join(previewDir, `${stem}.png`), png);
    await writeBlob(path.join(assetDir, `${stem}.png`), await designPresentation.export({ slide, format: "png", scale: assetScale }));
    await normalizeLessonAsset(path.join(assetDir, `${stem}.png`));
    const layout = await slide.export({ format: "layout" });
    await fs.writeFile(path.join(previewDir, `${stem}.layout.json`), await layout.text());
  }

  await writeBlob(
    path.join(previewDir, "lesson-02-montage.webp"),
    await designPresentation.export({ format: "webp", montage: true, scale: 1 })
  );

  const deliveryPresentation = Presentation.create({ slideSize: { width: 1280, height: 720 } });
  for (const [index, meta] of slideMeta.entries()) {
    const slide = deliveryPresentation.slides.add();
    slide.background.fill = "white";
    const imagePath = path.join(assetDir, `slide-${String(index + 1).padStart(2, "0")}.png`);
    const imageBytes = await fs.readFile(imagePath);
    slide.images.add({
      blob: imageBytes,
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
