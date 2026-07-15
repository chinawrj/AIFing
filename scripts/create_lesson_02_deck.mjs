import fs from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";

const artifactToolModule =
  process.env.ARTIFACT_TOOL_MODULE ??
  "/tmp/codex-presentations/aifing-lesson-02/tmp/node_modules/@oai/artifact-tool/dist/artifact_tool.mjs";
const { Presentation, PresentationFile } = await import(pathToFileURL(artifactToolModule).href);

const repoRoot = "/Users/rjwang/Documents/AIFing";
const outputPath = path.join(repoRoot, "decks", "lesson-02-harness-engineering.pptx");
const assetDir = path.join(repoRoot, "docs", "lesson-02", "assets");
const previewDir = "/tmp/codex-presentations/aifing-lesson-02/tmp/preview";

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
const GRAY = "#f2f5f9";

const slideMeta = [
  {
    notes:
      "Open Lesson 2 by connecting back to Lesson 1. A model reads and writes tokens, but a real product needs a harness to decide which instructions, tools, skills, and agent profiles enter the current paper.",
  },
  {
    notes:
      "Separate the model from the harness. The model generates tokens from visible context. The harness decides what context to assemble, which tools are available, what permissions apply, and what happens after the model writes a structured request.",
  },
  {
    notes:
      "Use the paper model. The harness prepares the paper, puts rules and tool definitions on it, sends it to the model, reads the model output, executes valid tool calls outside the model, and writes results back onto the paper.",
  },
  {
    notes:
      "Treat responsibilities as a control surface. The harness is not just prompt glue. It is the layer that builds context, injects instructions, exposes tools, parses calls, validates risk, executes, records observations, and controls the loop.",
  },
  {
    notes:
      "Explain user instructions as persistent preferences. They are useful for stable defaults, but should not hold secrets, large project documents, or fast-changing one-time task details.",
  },
  {
    notes:
      "Frame a custom agent as a packaged custom prompt plus runtime profile. It is still one work environment unless the runtime starts it as a separate subagent run.",
  },
  {
    notes:
      "Define skills as dynamically loaded custom prompt packs. They are useful because not every possible checklist, example, and convention should be loaded into every context window.",
  },
  {
    notes:
      "Resolve prompt-loading strategies. One-off prompts, user instructions, skills, custom agent profiles, and subagents all extend the paper in different ways and with different context costs. A forked subagent may inherit the shared starting paper, but its paper evolves independently after the fork.",
  },
  {
    notes:
      "Make the tool lifecycle precise. The model proposes a structured tool call. Execution happens outside the model, by a client harness, host runtime, MCP server, or provider-hosted tool. Schema constrains shape; permission and policy decide whether to run.",
  },
  {
    notes:
      "Close with the shift from writing longer prompts to designing how prompts and prompt-like objects are loaded. Skills protect the current context by loading only when relevant; subagents protect the main context by using a separate paper and returning a summary.",
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

function line(slide, { left, top, width, height = 0, color = BLUE, arrow = false, weight = 2, dash = undefined }) {
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

function header(slide, title, subtitle) {
  text(slide, title, { left: 48, top: 28, width: 1080, height: 58, fontSize: 38, color: NAVY, bold: true });
  text(slide, subtitle, { left: 220, top: 88, width: 840, height: 30, fontSize: 20, color: BLUE, italic: true, align: "center" });
  line(slide, { left: 48, top: 122, width: 1184, weight: 2 });
}

function badge(slide, value, { left, top, color = BLUE }) {
  shape(slide, { left, top, width: 42, height: 42, fill: color, line: color, radius: "rounded-full" });
  text(slide, value, { left: left + 12, top: top + 10, width: 18, height: 18, fontSize: 18, color: "white", bold: true, align: "center" });
}

function miniCard(slide, { left, top, width, height, title, body, fill = PALE2, color = BLUE }) {
  shape(slide, { left, top, width, height, fill, line: BORDER, radius: "rounded-lg", shadow: "shadow-sm" });
  text(slide, title, { left: left + 18, top: top + 16, width: width - 36, height: 24, fontSize: 20, color, bold: true, align: "center" });
  text(slide, body, { left: left + 24, top: top + 52, width: width - 48, height: height - 62, fontSize: 16, color: NAVY, align: "center" });
}

function slide1(presentation) {
  const slide = presentation.slides.add();
  slide.background.fill = "white";
  text(slide, "Lesson 2", { left: 64, top: 44, width: 260, height: 54, fontSize: 50, color: BLUE, bold: true });
  text(slide, "Harness Engineering", { left: 326, top: 46, width: 710, height: 54, fontSize: 48, color: NAVY, bold: true });
  text(slide, "Custom prompts, skills, subagent bridge, and tool runtime", {
    left: 250,
    top: 116,
    width: 780,
    height: 30,
    fontSize: 22,
    color: BLUE,
    italic: true,
    align: "center",
  });
  line(slide, { left: 64, top: 158, width: 1152, weight: 2 });

  miniCard(slide, {
    left: 90,
    top: 218,
    width: 320,
    height: 260,
    title: "Lesson 1",
    body: "The model reads the paper and writes tokens back onto it.",
    fill: PALE2,
  });
  line(slide, { left: 430, top: 348, width: 110, arrow: true, weight: 4 });
  miniCard(slide, {
    left: 560,
    top: 198,
    width: 320,
    height: 300,
    title: "Lesson 2",
    body: "The harness decides which prompts, skills, tools, and runtime profiles enter the current paper.",
    fill: PALE,
  });
  line(slide, { left: 900, top: 348, width: 110, arrow: true, weight: 4 });
  miniCard(slide, {
    left: 1030,
    top: 218,
    width: 170,
    height: 260,
    title: "Next",
    body: "Subagents, workflows, and loop coding.",
    fill: YELLOW,
    color: ORANGE,
  });

  shape(slide, { left: 144, top: 570, width: 992, height: 70, fill: "white", line: BLUE });
  text(slide, "Core idea", { left: 184, top: 591, width: 142, height: 24, fontSize: 22, color: BLUE, bold: true });
  text(slide, "Lesson 2 loads the right instruction objects instead of one giant prompt.", {
    left: 350,
    top: 590,
    width: 740,
    height: 28,
    fontSize: 20,
    color: NAVY,
  });
  return slide;
}

function slide2(presentation) {
  const slide = presentation.slides.add();
  slide.background.fill = "white";
  header(slide, "Model and Harness Solve Different Jobs", "Do not ask the model to own responsibilities that belong in runtime software.");

  shape(slide, { left: 86, top: 178, width: 480, height: 348, fill: PALE2, line: BLUE });
  text(slide, "Model", { left: 176, top: 210, width: 300, height: 36, fontSize: 34, color: BLUE, bold: true, align: "center" });
  ["Reads visible context", "Generates tokens", "May propose tool calls", "Does not directly touch external systems"].forEach((item, i) => {
    badge(slide, String(i + 1), { left: 128, top: 282 + i * 48, color: BLUE });
    text(slide, item, { left: 188, top: 291 + i * 48, width: 320, height: 20, fontSize: 18, color: NAVY });
  });

  shape(slide, { left: 714, top: 178, width: 480, height: 348, fill: PALE, line: GREEN });
  text(slide, "Harness", { left: 804, top: 210, width: 300, height: 36, fontSize: 34, color: GREEN, bold: true, align: "center" });
  ["Builds context for this turn", "Injects instructions and tools", "Validates permissions and risk", "Executes outside the model and writes back"].forEach((item, i) => {
    badge(slide, String(i + 1), { left: 756, top: 282 + i * 48, color: GREEN });
    text(slide, item, { left: 816, top: 291 + i * 48, width: 330, height: 20, fontSize: 18, color: NAVY });
  });

  line(slide, { left: 586, top: 350, width: 108, arrow: true, weight: 4 });
  text(slide, "context\nand calls", { left: 592, top: 286, width: 96, height: 46, fontSize: 17, color: BLUE, align: "center" });
  text(slide, "results\nand logs", { left: 592, top: 378, width: 96, height: 46, fontSize: 17, color: GREEN, align: "center" });

  shape(slide, { left: 154, top: 588, width: 972, height: 52, fill: YELLOW, line: "#f0d891" });
  text(slide, "Boundary", { left: 196, top: 604, width: 130, height: 22, fontSize: 20, color: ORANGE, bold: true });
  text(slide, "The harness manages context budget; it does not enlarge the model's context window.", {
    left: 346,
    top: 604,
    width: 720,
    height: 22,
    fontSize: 18,
    color: NAVY,
  });
  return slide;
}

function slide3(presentation) {
  const slide = presentation.slides.add();
  slide.background.fill = "white";
  header(slide, "The Harness Manages the Paper for Each Turn", "It assembles what the model sees and records what happens next.");

  shape(slide, { left: 462, top: 178, width: 356, height: 330, fill: "white", line: BLUE, shadow: "shadow-sm" });
  text(slide, "Paper / Context", { left: 520, top: 206, width: 240, height: 30, fontSize: 28, color: BLUE, bold: true, align: "center" });
  const rows = ["System rules", "User message", "Tool definitions", "Conversation state", "Tool results"];
  rows.forEach((row, i) => {
    shape(slide, { left: 516, top: 258 + i * 44, width: 248, height: 30, fill: i % 2 ? PALE : PALE2, line: "#d7e6fb", radius: "rounded-md" });
    text(slide, row, { left: 536, top: 265 + i * 44, width: 208, height: 16, fontSize: 16, color: NAVY, align: "center", bold: i < 3 });
  });

  const nodes = [
    [72, 188, "1", "Prepare", "Build this turn's paper", BLUE],
    [72, 390, "6", "Observe", "Write results and errors back", PURPLE],
    [890, 188, "3", "Model reads", "Generate text or tool call", GREEN],
    [890, 390, "5", "Execute", "Run valid actions outside model", ORANGE],
    [408, 564, "2", "Render", "Place rules, tools, state", BLUE],
    [674, 564, "4", "Validate", "Check schema, policy, permission", RED],
  ];
  nodes.forEach(([left, top, num, title, body, color]) => {
    shape(slide, { left, top, width: 300, height: 96, fill: "white", line: color });
    badge(slide, num, { left: left + 18, top: top + 26, color });
    text(slide, title, { left: left + 76, top: top + 20, width: 188, height: 24, fontSize: 21, color, bold: true });
    text(slide, body, { left: left + 76, top: top + 50, width: 190, height: 20, fontSize: 16, color: NAVY });
  });
  line(slide, { left: 376, top: 238, width: 74, arrow: true });
  line(slide, { left: 820, top: 238, width: 58, arrow: true });
  line(slide, { left: 1040, top: 294, width: 0, height: 84, arrow: true, color: GREEN });
  line(slide, { left: 890, top: 438, width: -58, arrow: true, color: ORANGE });
  line(slide, { left: 450, top: 438, width: -74, arrow: true, color: PURPLE });
  return slide;
}

function slide4(presentation) {
  const slide = presentation.slides.add();
  slide.background.fill = "white";
  header(slide, "Harness Responsibilities Form the Control Surface", "A useful AI product needs runtime controls, not just a better prompt.");

  const items = [
    ["Context construction", "history, files, retrieval, results", BLUE],
    ["Instruction injection", "system, developer, user, agent", GREEN],
    ["Tool definition", "names, descriptions, schemas", ORANGE],
    ["Tool-call parsing", "distinguish text from requests", PURPLE],
    ["Validation and permission", "schema, policy, approval", RED],
    ["Execution", "APIs, files, browser, shell, MCP", GREEN],
    ["Observation writing", "results, errors, traces", BLUE],
    ["Loop control", "retry, stop, timeout, cost", ORANGE],
  ];
  items.forEach(([title, body, color], i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const left = 78 + col * 586;
    const top = 162 + row * 104;
    shape(slide, { left, top, width: 538, height: 82, fill: row % 2 ? PALE : PALE2, line: BORDER });
    badge(slide, String(i + 1), { left: left + 18, top: top + 20, color });
    text(slide, title, { left: left + 78, top: top + 16, width: 390, height: 24, fontSize: 20, color, bold: true });
    text(slide, body, { left: left + 78, top: top + 46, width: 390, height: 18, fontSize: 16, color: NAVY });
  });

  shape(slide, { left: 174, top: 604, width: 932, height: 50, fill: YELLOW, line: "#f0d891" });
  text(slide, "Engineering test", { left: 208, top: 618, width: 190, height: 22, fontSize: 19, color: ORANGE, bold: true });
  text(slide, "Can you trace who chose the context and who authorized execution?", {
    left: 414,
    top: 618,
    width: 650,
    height: 22,
    fontSize: 18,
    color: NAVY,
  });
  return slide;
}

function slide5(presentation) {
  const slide = presentation.slides.add();
  slide.background.fill = "white";
  header(slide, "User Instructions Are Persistent Paper Annotations", "Use them for stable preferences, not as a private memory drawer.");

  shape(slide, { left: 84, top: 172, width: 500, height: 350, fill: PALE2, line: BLUE });
  text(slide, "Good uses", { left: 154, top: 204, width: 360, height: 32, fontSize: 30, color: BLUE, bold: true, align: "center" });
  ["Language preference", "Common tech stack", "Output format defaults", "Personal workflow style"].forEach((item, i) => {
    shape(slide, { left: 138, top: 260 + i * 52, width: 392, height: 36, fill: "white", line: BORDER, radius: "rounded-md" });
    text(slide, item, { left: 160, top: 269 + i * 52, width: 348, height: 18, fontSize: 17, color: NAVY, align: "center" });
  });

  shape(slide, { left: 696, top: 172, width: 500, height: 350, fill: "#fff5f5", line: "#f0b5b5" });
  text(slide, "Poor uses", { left: 766, top: 204, width: 360, height: 32, fontSize: 30, color: RED, bold: true, align: "center" });
  ["Sensitive information", "One-time task details", "Fast-changing project state", "Large documents"].forEach((item, i) => {
    shape(slide, { left: 750, top: 260 + i * 52, width: 392, height: 36, fill: "white", line: "#f0b5b5", radius: "rounded-md" });
    text(slide, item, { left: 772, top: 269 + i * 52, width: 348, height: 18, fontSize: 17, color: NAVY, align: "center" });
  });

  shape(slide, { left: 174, top: 586, width: 932, height: 62, fill: YELLOW, line: "#f0d891" });
  text(slide, "Rule", { left: 214, top: 604, width: 80, height: 24, fontSize: 21, color: ORANGE, bold: true });
  text(slide, "Task-specific details stay in the task. Sensitive data stays out.", {
    left: 318,
    top: 604,
    width: 740,
    height: 24,
    fontSize: 19,
    color: NAVY,
  });
  return slide;
}

function slide6(presentation) {
  const slide = presentation.slides.add();
  slide.background.fill = "white";
  header(slide, "A Custom Agent Packages a Custom Prompt", "It turns repeated instructions into a reusable runtime profile.");

  const stages = [
    ["One-off prompt", "temporary task request", BLUE, PALE2],
    ["Prompt template", "repeatable wording", ORANGE, YELLOW],
    ["Custom agent", "packaged role, rules,\ntools, permissions", GREEN, PALE],
  ];
  stages.forEach(([title, body, color, fill], i) => {
    const left = 90 + i * 392;
    const top = i === 2 ? 174 : 214;
    const height = i === 2 ? 330 : 190;
    shape(slide, { left, top, width: 300, height, fill, line: color });
    text(slide, title, { left: left + 28, top: top + 28, width: 244, height: 30, fontSize: 26, color, bold: true, align: "center" });
    text(slide, body, { left: left + 36, top: top + 82, width: 228, height: 62, fontSize: 19, color: NAVY, align: "center" });
    if (i < stages.length - 1) line(slide, { left: left + 318, top: 320, width: 58, arrow: true, weight: 4 });
  });

  const parts = ["Role", "Rules", "Tools", "Access", "Boundary", "Stop"];
  parts.forEach((k, i) => {
    const left = 892 + (i % 2) * 126;
    const top = 354 + Math.floor(i / 2) * 50;
    shape(slide, { left, top, width: 112, height: 38, fill: "white", line: "#b8dec8", radius: "rounded-md" });
    text(slide, k, { left: left + 6, top: top + 10, width: 100, height: 18, fontSize: 16, color: GREEN, bold: true, align: "center" });
  });

  shape(slide, { left: 142, top: 606, width: 996, height: 52, fill: YELLOW, line: "#f0d891" });
  text(slide, "Boundary", { left: 178, top: 622, width: 126, height: 22, fontSize: 20, color: ORANGE, bold: true });
  text(slide, "A profile becomes a subagent only when the runtime starts a separate run.", {
    left: 324,
    top: 622,
    width: 760,
    height: 22,
    fontSize: 18,
    color: NAVY,
  });
  return slide;
}

function slide7(presentation) {
  const slide = presentation.slides.add();
  slide.background.fill = "white";
  header(slide, "A Skill Is a Dynamic Custom Prompt Pack", "Load the relevant manual only when the task needs it.");

  shape(slide, { left: 68, top: 172, width: 330, height: 350, fill: "#fff5f5", line: "#f0b5b5" });
  text(slide, "Bad loading", { left: 112, top: 206, width: 242, height: 30, fontSize: 28, color: RED, bold: true, align: "center" });
  ["Debug checklist", "Review checklist", "Docs template", "Deploy rules", "API conventions"].forEach((item, i) => {
    shape(slide, { left: 112, top: 262 + i * 46, width: 242, height: 30, fill: "white", line: "#f0b5b5", radius: "rounded-md" });
    text(slide, item, { left: 132, top: 269 + i * 46, width: 202, height: 16, fontSize: 16, color: NAVY, align: "center" });
  });
  text(slide, "Everything is pasted into every turn.", { left: 108, top: 474, width: 250, height: 24, fontSize: 17, color: RED, bold: true, align: "center" });

  line(slide, { left: 426, top: 348, width: 84, arrow: true, weight: 4 });

  shape(slide, { left: 540, top: 154, width: 286, height: 386, fill: YELLOW, line: "#f0d891" });
  text(slide, "Skill registry", { left: 586, top: 188, width: 194, height: 30, fontSize: 28, color: ORANGE, bold: true, align: "center" });
  ["detect task", "select skill", "render instructions", "include examples", "keep unused skills out"].forEach((item, i) => {
    text(slide, `${i + 1}. ${item}`, { left: 604, top: 258 + i * 42, width: 178, height: 20, fontSize: 17, color: NAVY });
  });

  line(slide, { left: 856, top: 348, width: 84, arrow: true, weight: 4 });

  shape(slide, { left: 970, top: 172, width: 242, height: 350, fill: PALE, line: GREEN });
  text(slide, "Current paper", { left: 1004, top: 206, width: 174, height: 30, fontSize: 26, color: GREEN, bold: true, align: "center" });
  text(slide, "Only the skill needed for this task enters the context window.", {
    left: 1004,
    top: 288,
    width: 174,
    height: 92,
    fontSize: 20,
    color: NAVY,
    align: "center",
  });
  text(slide, "Unused prompts stay outside.", { left: 1000, top: 430, width: 182, height: 44, fontSize: 18, color: GREEN, bold: true, align: "center" });

  shape(slide, { left: 142, top: 604, width: 996, height: 50, fill: PALE2, line: BLUE });
  text(slide, "Context budget", { left: 178, top: 618, width: 180, height: 22, fontSize: 19, color: BLUE, bold: true });
  text(slide, "A skill saves attention by loading just-in-time. If always loaded, it still spends tokens.", {
    left: 378,
    top: 618,
    width: 710,
    height: 22,
    fontSize: 18,
    color: NAVY,
  });
  return slide;
}

function slide8(presentation) {
  const slide = presentation.slides.add();
  slide.background.fill = "white";
  header(slide, "Prompt Extensions Load Context in Different Ways", "The harness decides what stays global, loads on demand, or gets its own paper.");

  const headers = ["Object", "What it extends", "Loading strategy", "Context effect"];
  const colX = [66, 232, 502, 842];
  const colW = [140, 240, 300, 336];
  shape(slide, { left: 58, top: 162, width: 1164, height: 46, fill: BLUE, line: BLUE });
  headers.forEach((h, i) => {
    text(slide, h, { left: colX[i] + 8, top: 175, width: colW[i] - 16, height: 20, fontSize: 16, color: "white", bold: true, align: i === 0 ? "center" : "left" });
  });
  const rows = [
    ["Prompt", "one task request", "written now", "uses current paper"],
    ["User instruction", "stable preference", "attached persistently", "always costs attention when included"],
    ["Skill", "reusable method", "loaded when relevant", "keeps unused prompts outside"],
    ["Custom agent", "role + rules + tools", "selected as a profile", "packages repeated work setup"],
    ["Subagent bridge", "local task context", "fork or fresh run", "copies shared start, then diverges"],
  ];
  rows.forEach((row, r) => {
    const top = 210 + r * 70;
    shape(slide, { left: 58, top, width: 1164, height: 62, fill: r % 2 ? PALE : PALE2, line: BORDER, radius: "rounded-md" });
    row.forEach((v, i) => {
      text(slide, v, { left: colX[i] + 8, top: top + 16, width: colW[i] - 16, height: 28, fontSize: 16, color: i === 0 ? BLUE : NAVY, bold: i === 0, align: i === 0 ? "center" : "left" });
    });
  });

  shape(slide, { left: 142, top: 572, width: 996, height: 92, fill: YELLOW, line: "#f0d891" });
  text(slide, "Context architecture", { left: 178, top: 588, width: 210, height: 22, fontSize: 19, color: ORANGE, bold: true });
  text(slide, "Compaction reacts: compress one paper as it nears its limit.", {
    left: 408,
    top: 584,
    width: 690,
    height: 24,
    fontSize: 18,
    color: NAVY,
  });
  text(slide, "Proactive fork: copy the shared start, then assign one paper per branch.", {
    left: 408,
    top: 620,
    width: 690,
    height: 24,
    fontSize: 17,
    color: NAVY,
    bold: true,
  });
  return slide;
}

function slide9(presentation) {
  const slide = presentation.slides.add();
  slide.background.fill = "white";
  header(slide, "Tool Calls Are Proposed by the Model and Executed Outside It", "Schema shapes the request; permission and policy decide whether it may run.");

  const steps = [
    ["Proposed", "model writes\nstructured request", BLUE],
    ["Parsed", "runtime reads\nthe request", GREEN],
    ["Validated", "schema, policy,\npermission", ORANGE],
    ["Executed", "tool/API runs\noutside model", PURPLE],
    ["Observed", "result written\nback to paper", GREEN],
    ["Answered", "model uses result\nfor response", BLUE],
  ];
  steps.forEach(([title, body, color], i) => {
    const x = 58 + i * 202;
    shape(slide, { left: x, top: 190, width: 160, height: 172, fill: i % 2 ? PALE : PALE2, line: color });
    badge(slide, String(i + 1), { left: x + 59, top: 212, color });
    text(slide, title, { left: x + 18, top: 266, width: 124, height: 24, fontSize: 19, color, bold: true, align: "center" });
    text(slide, body, { left: x + 20, top: 296, width: 120, height: 54, fontSize: 16, color: NAVY, align: "center" });
    if (i < steps.length - 1) line(slide, { left: x + 166, top: 265, width: 30, arrow: true, weight: 2 });
  });

  shape(slide, { left: 92, top: 408, width: 496, height: 146, fill: "#fff5f5", line: "#f0b5b5" });
  text(slide, "Possible rejections", { left: 132, top: 430, width: 416, height: 24, fontSize: 22, color: RED, bold: true, align: "center" });
  text(slide, "Unknown tool, invalid parameters, missing permission, human approval required, external service failed, result too large.", {
    left: 140,
    top: 476,
    width: 400,
    height: 46,
    fontSize: 17,
    color: NAVY,
    align: "center",
  });

  shape(slide, { left: 692, top: 408, width: 496, height: 146, fill: YELLOW, line: "#f0d891" });
  text(slide, "Precise wording", { left: 732, top: 430, width: 416, height: 24, fontSize: 22, color: ORANGE, bold: true, align: "center" });
  text(slide, "Execution may happen in a client harness, host runtime, MCP server, or provider-hosted tool, but not inside the model.", {
    left: 740,
    top: 474,
    width: 400,
    height: 50,
    fontSize: 17,
    color: NAVY,
    align: "center",
  });

  shape(slide, { left: 172, top: 606, width: 936, height: 42, fill: PALE2, line: BLUE });
  text(slide, "A model may produce zero, one, or multiple tool calls. The harness must handle all three.", {
    left: 220,
    top: 617,
    width: 840,
    height: 18,
    fontSize: 17,
    color: NAVY,
    bold: true,
    align: "center",
  });
  return slide;
}

function slide10(presentation) {
  const slide = presentation.slides.add();
  slide.background.fill = "white";
  header(slide, "Harness Engineering Turns Prompts Into Loading Strategy", "A prompt controls one message. The harness controls which prompts enter which paper.");

  const ladder = [
    ["Prompt", "one request"],
    ["User instructions", "stable prefs"],
    ["Skill", "dynamic prompt pack"],
    ["Custom agent", "profile with role, tools, limits"],
    ["Subagent", "local task on separate paper"],
    ["Workflow", "orchestrated multi-step system"],
  ];
  ladder.forEach(([title, body], i) => {
    const width = 276 + i * 84;
    const left = 508 - i * 42;
    const top = 144 + i * 60;
    const highlight = i === 2 || i === 4;
    shape(slide, { left, top, width, height: 48, fill: highlight ? PALE : PALE2, line: highlight ? BLUE : BORDER, radius: "rounded-md" });
    const bodyOffset = i === 0 ? 150 : 190;
    text(slide, title, { left: left + 22, top: top + 7, width: bodyOffset - 34, height: 18, fontSize: 16, color: highlight ? BLUE : NAVY, bold: true });
    text(slide, body, { left: left + bodyOffset, top: top + 8, width: width - bodyOffset - 20, height: 18, fontSize: 16, color: NAVY });
  });

  shape(slide, { left: 82, top: 540, width: 504, height: 92, fill: YELLOW, line: "#f0d891" });
  text(slide, "Lesson 2.1", { left: 124, top: 554, width: 150, height: 24, fontSize: 21, color: ORANGE, bold: true });
  text(slide, "Advanced add-on: runtime objects and executable contracts.", {
    left: 292,
    top: 554,
    width: 250,
    height: 40,
    fontSize: 17,
    color: NAVY,
  });

  shape(slide, { left: 694, top: 540, width: 504, height: 92, fill: PALE, line: GREEN });
  text(slide, "Lesson 3", { left: 736, top: 554, width: 130, height: 24, fontSize: 21, color: GREEN, bold: true });
  text(slide, "Next step: subagent workflows, teammates, and loop coding.", {
    left: 884,
    top: 554,
    width: 270,
    height: 40,
    fontSize: 17,
    color: NAVY,
  });

  return slide;
}

const builders = [slide1, slide2, slide3, slide4, slide5, slide6, slide7, slide8, slide9, slide10];

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

  await writeBlob(
    path.join(previewDir, "lesson-02-montage.webp"),
    await presentation.export({ format: "webp", montage: true, scale: 1 })
  );

  const pptx = await PresentationFile.exportPptx(presentation);
  await pptx.save(outputPath);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
