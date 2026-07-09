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
      "Open Lesson 2 by connecting back to Lesson 1. A model reads and writes tokens, but a real product needs an operating environment around it. That operating environment is the harness.",
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
      "Define custom agent narrowly. In this lesson, an agent means a reusable work environment in one runtime: role, rules, tools, permissions, task boundary, quality standard, and stop condition. Do not expand into subagents yet.",
  },
  {
    notes:
      "Define skills as reusable manuals. A skill guides how work should be done. It is not itself an executable tool. It should be loaded when relevant, not pasted into every interaction by default.",
  },
  {
    notes:
      "Resolve vocabulary. Tool, skill, agent, and harness solve different problems. This slide prevents learners from using one word for all AI product behavior.",
  },
  {
    notes:
      "Make the tool lifecycle precise. The model proposes a structured tool call. Execution happens outside the model, by a client harness, host runtime, MCP server, or provider-hosted tool. Schema constrains shape; permission and policy decide whether to run.",
  },
  {
    notes:
      "Close with the shift from prompt engineering to harness engineering. A prompt controls a message. A harness controls the interaction system. This prepares the audience for the advanced 2.1 add-on and Lesson 3 workflows.",
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
  text(slide, body, { left: left + 24, top: top + 52, width: width - 48, height: height - 62, fontSize: 15, color: NAVY, align: "center" });
}

function slide1(presentation) {
  const slide = presentation.slides.add();
  slide.background.fill = "white";
  text(slide, "Lesson 2", { left: 64, top: 44, width: 260, height: 54, fontSize: 50, color: BLUE, bold: true });
  text(slide, "Harness Engineering", { left: 326, top: 46, width: 710, height: 54, fontSize: 48, color: NAVY, bold: true });
  text(slide, "Instructions, Agents, Skills, and Tool Runtime", {
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
    body: "The harness prepares the paper, exposes tools, checks permission, runs actions, and writes results back.",
    fill: PALE,
  });
  line(slide, { left: 900, top: 348, width: 110, arrow: true, weight: 4 });
  miniCard(slide, {
    left: 1030,
    top: 218,
    width: 170,
    height: 260,
    title: "Next",
    body: "Advanced objects and multi-step workflows.",
    fill: YELLOW,
    color: ORANGE,
  });

  shape(slide, { left: 144, top: 570, width: 992, height: 70, fill: "white", line: BLUE });
  text(slide, "Core idea", { left: 184, top: 591, width: 142, height: 24, fontSize: 22, color: BLUE, bold: true });
  text(slide, "A model is the token generator. The harness is the operating environment around it.", {
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
    text(slide, row, { left: 536, top: 265 + i * 44, width: 208, height: 16, fontSize: 15, color: NAVY, align: "center", bold: i < 3 });
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
    text(slide, body, { left: left + 76, top: top + 50, width: 190, height: 20, fontSize: 15, color: NAVY });
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
    text(slide, body, { left: left + 78, top: top + 46, width: 390, height: 18, fontSize: 15, color: NAVY });
  });

  shape(slide, { left: 174, top: 604, width: 932, height: 50, fill: YELLOW, line: "#f0d891" });
  text(slide, "Engineering test", { left: 208, top: 618, width: 190, height: 22, fontSize: 19, color: ORANGE, bold: true });
  text(slide, "Can you explain who decided what entered the paper and what was allowed to execute?", {
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
  text(slide, "If it changes by task, put it in the task. If it is sensitive, do not store it as an instruction.", {
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
  header(slide, "A Custom Agent Is a Reusable Work Environment", "It packages rules, tools, limits, and quality standards for a task type.");

  shape(slide, { left: 104, top: 176, width: 360, height: 390, fill: PALE2, line: BLUE });
  text(slide, "Prompt", { left: 176, top: 214, width: 216, height: 34, fontSize: 32, color: BLUE, bold: true, align: "center" });
  text(slide, "A temporary request written on the current paper.", {
    left: 150,
    top: 286,
    width: 268,
    height: 58,
    fontSize: 22,
    color: NAVY,
    align: "center",
  });
  text(slide, "Good for one task.", { left: 162, top: 430, width: 244, height: 24, fontSize: 20, color: BLUE, bold: true, align: "center" });

  line(slide, { left: 488, top: 370, width: 102, arrow: true, weight: 4 });

  shape(slide, { left: 616, top: 150, width: 560, height: 444, fill: PALE, line: GREEN });
  text(slide, "Custom Agent", { left: 720, top: 184, width: 352, height: 36, fontSize: 34, color: GREEN, bold: true, align: "center" });
  const parts = [
    ["Role", "what this agent is for"],
    ["Instructions", "standing rules and style"],
    ["Tools", "what can be called"],
    ["Permissions", "what needs approval"],
    ["Task boundary", "what it should refuse or stop"],
    ["Quality standard", "how done is judged"],
  ];
  parts.forEach(([k, v], i) => {
    const left = 662 + (i % 2) * 246;
    const top = 252 + Math.floor(i / 2) * 76;
    shape(slide, { left, top, width: 218, height: 54, fill: "white", line: "#b8dec8", radius: "rounded-md" });
    text(slide, k, { left: left + 18, top: top + 8, width: 182, height: 18, fontSize: 16, color: GREEN, bold: true, align: "center" });
    text(slide, v, { left: left + 18, top: top + 29, width: 182, height: 16, fontSize: 13, color: NAVY, align: "center" });
  });

  shape(slide, { left: 176, top: 622, width: 928, height: 42, fill: YELLOW, line: "#f0d891" });
  text(slide, "Lesson boundary: this is one runtime profile, not a Lesson 3 subagent workflow.", {
    left: 220,
    top: 633,
    width: 840,
    height: 18,
    fontSize: 17,
    color: NAVY,
    bold: true,
    align: "center",
  });
  return slide;
}

function slide7(presentation) {
  const slide = presentation.slides.add();
  slide.background.fill = "white";
  header(slide, "A Skill Is a Reusable Manual Loaded When Relevant", "It teaches the runtime how to do a repeated task pattern.");

  shape(slide, { left: 74, top: 170, width: 354, height: 370, fill: PALE2, line: BLUE });
  text(slide, "Repeated task", { left: 124, top: 206, width: 254, height: 30, fontSize: 28, color: BLUE, bold: true, align: "center" });
  ["Debug an error", "Review a PR", "Write tests", "Generate docs"].forEach((item, i) => {
    shape(slide, { left: 126, top: 270 + i * 48, width: 250, height: 34, fill: "white", line: BORDER, radius: "rounded-md" });
    text(slide, item, { left: 150, top: 278 + i * 48, width: 202, height: 18, fontSize: 16, color: NAVY, align: "center" });
  });

  line(slide, { left: 454, top: 354, width: 92, arrow: true, weight: 4 });

  shape(slide, { left: 572, top: 148, width: 330, height: 414, fill: YELLOW, line: "#f0d891" });
  text(slide, "Skill", { left: 630, top: 184, width: 214, height: 36, fontSize: 34, color: ORANGE, bold: true, align: "center" });
  ["Steps", "Checklist", "Output template", "Examples", "Tool guidance", "Project conventions"].forEach((item, i) => {
    text(slide, `- ${item}`, { left: 650, top: 250 + i * 42, width: 210, height: 20, fontSize: 18, color: NAVY });
  });

  line(slide, { left: 928, top: 354, width: 92, arrow: true, weight: 4 });

  shape(slide, { left: 1046, top: 170, width: 160, height: 370, fill: PALE, line: GREEN });
  text(slide, "Paper", { left: 1082, top: 210, width: 90, height: 30, fontSize: 28, color: GREEN, bold: true, align: "center" });
  text(slide, "Only the relevant manual should be placed into the current context.", {
    left: 1074,
    top: 294,
    width: 104,
    height: 120,
    fontSize: 18,
    color: NAVY,
    align: "center",
  });

  shape(slide, { left: 174, top: 604, width: 932, height: 50, fill: PALE2, line: BLUE });
  text(slide, "Practical point", { left: 210, top: 618, width: 180, height: 22, fontSize: 19, color: BLUE, bold: true });
  text(slide, "Skills reduce repeated prompt copying, but always-loaded skills still consume context.", {
    left: 410,
    top: 618,
    width: 650,
    height: 22,
    fontSize: 18,
    color: NAVY,
  });
  return slide;
}

function slide8(presentation) {
  const slide = presentation.slides.add();
  slide.background.fill = "white";
  header(slide, "Tool, Skill, Agent, and Harness Are Different", "Use the right word for the right runtime responsibility.");

  const headers = ["Concept", "Essence", "Paper Model meaning", "Example"];
  const colX = [70, 230, 510, 870];
  const colW = [136, 248, 326, 320];
  shape(slide, { left: 58, top: 162, width: 1164, height: 46, fill: BLUE, line: BLUE });
  headers.forEach((h, i) => {
    text(slide, h, { left: colX[i] + 8, top: 175, width: colW[i] - 16, height: 20, fontSize: 16, color: "white", bold: true, align: i === 0 ? "center" : "left" });
  });
  const rows = [
    ["Tool", "External executable capability", "Model proposes; runtime executes", "read file, weather, run tests"],
    ["Skill", "Reusable work instruction", "Manual placed on paper when relevant", "code review checklist"],
    ["Agent", "Packaged work environment", "Fixed role, tools, limits, standards", "security reviewer"],
    ["Harness", "Operating environment", "Manages paper, execution, results", "IDE agent runtime"],
  ];
  rows.forEach((row, r) => {
    const top = 210 + r * 86;
    shape(slide, { left: 58, top, width: 1164, height: 76, fill: r % 2 ? PALE : PALE2, line: BORDER, radius: "rounded-md" });
    row.forEach((v, i) => {
      text(slide, v, { left: colX[i] + 8, top: top + 19, width: colW[i] - 16, height: 32, fontSize: 16, color: i === 0 ? BLUE : NAVY, bold: i === 0, align: i === 0 ? "center" : "left" });
    });
  });

  shape(slide, { left: 160, top: 592, width: 960, height: 58, fill: YELLOW, line: "#f0d891" });
  text(slide, "Common mistake", { left: 198, top: 610, width: 190, height: 22, fontSize: 19, color: ORANGE, bold: true });
  text(slide, "Calling every AI product feature an agent hides the actual engineering boundary.", {
    left: 408,
    top: 610,
    width: 670,
    height: 22,
    fontSize: 18,
    color: NAVY,
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
    shape(slide, { left: x, top: 190, width: 160, height: 150, fill: i % 2 ? PALE : PALE2, line: color });
    badge(slide, String(i + 1), { left: x + 59, top: 212, color });
    text(slide, title, { left: x + 18, top: 266, width: 124, height: 24, fontSize: 19, color, bold: true, align: "center" });
    text(slide, body, { left: x + 20, top: 296, width: 120, height: 36, fontSize: 14, color: NAVY, align: "center" });
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
  header(slide, "Harness Engineering Turns Prompts Into Systems", "A prompt controls one message. A harness controls the interaction system.");

  const ladder = [
    ["Prompt", "single request"],
    ["Prompt template", "repeatable wording"],
    ["Custom agent", "fixed role and tool environment"],
    ["Harness", "context, tools, permission, loop"],
    ["Workflow system", "multi-step and multi-agent orchestration"],
  ];
  ladder.forEach(([title, body], i) => {
    const width = 260 + i * 115;
    const left = 510 - i * 56;
    const top = 166 + i * 70;
    shape(slide, { left, top, width, height: 52, fill: i === 3 ? PALE : PALE2, line: i === 3 ? BLUE : BORDER, radius: "rounded-md" });
    text(slide, title, { left: left + 24, top: top + 8, width: 230, height: 18, fontSize: 17, color: i === 3 ? BLUE : NAVY, bold: true });
    text(slide, body, { left: left + 280, top: top + 10, width: Math.max(180, width - 310), height: 18, fontSize: 15, color: NAVY });
  });

  shape(slide, { left: 82, top: 530, width: 504, height: 92, fill: YELLOW, line: "#f0d891" });
  text(slide, "Lesson 2.1", { left: 124, top: 554, width: 150, height: 24, fontSize: 21, color: ORANGE, bold: true });
  text(slide, "Advanced add-on: runtime objects and executable contracts.", {
    left: 292,
    top: 554,
    width: 250,
    height: 40,
    fontSize: 17,
    color: NAVY,
  });

  shape(slide, { left: 694, top: 530, width: 504, height: 92, fill: PALE, line: GREEN });
  text(slide, "Lesson 3", { left: 736, top: 554, width: 130, height: 24, fontSize: 21, color: GREEN, bold: true });
  text(slide, "Next step: subagents, workflows, teammates, and loop coding.", {
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
