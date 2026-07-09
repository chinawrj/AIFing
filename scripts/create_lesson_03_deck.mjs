import fs from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";

const artifactToolModule =
  process.env.ARTIFACT_TOOL_MODULE ??
  "/tmp/codex-presentations/aifing-lesson-03/tmp/node_modules/@oai/artifact-tool/dist/artifact_tool.mjs";
const { Presentation, PresentationFile } = await import(pathToFileURL(artifactToolModule).href);

const repoRoot = "/Users/rjwang/Documents/AIFing";
const outputPath = path.join(repoRoot, "decks", "lesson-03-agentic-workflows.pptx");
const assetDir = path.join(repoRoot, "docs", "lesson-03", "assets");
const previewDir = "/tmp/codex-presentations/aifing-lesson-03/tmp/preview";

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
    notes:
      "Open by connecting the three lessons. Lesson 1 explained the model and paper. Lesson 2 explained the harness that manages one paper. Lesson 3 explains how complex work uses multiple papers, roles, steps, and feedback loops.",
  },
  {
    notes:
      "Make the pain concrete. A single agent can do a lot, but large tasks create context pollution, mixed goals, long tool logs, and noisy compacting. This creates the need for isolation and workflow.",
  },
  {
    notes:
      "Define subagent through the paper model. A subagent has its own working paper. It handles a local task and returns only the useful summary or artifact to the main paper.",
  },
  {
    notes:
      "Give the decision rule. Use subagents when the split reduces noise, enables specialization, or permits safe parallel work. Do not split tiny or tightly coupled tasks.",
  },
  {
    notes:
      "Define workflow as a stable process with input, output, owner, and gate. It is not just asking the model to continue. It is a rule for passing papers across steps.",
  },
  {
    notes:
      "Explain that each workflow step needs a contract and control points. Hooks and gates are deterministic places where the harness enforces actions such as formatting, tests, approvals, and logs.",
  },
  {
    notes:
      "Contrast chatbot mode and teammate mode. A teammate maintains goals, plans, risks, progress, evidence, and next steps on the paper, instead of only answering isolated questions.",
  },
  {
    notes:
      "Put autonomy limits in engineering terms. Good collaboration defines allowed actions, approval-required actions, forbidden actions, evidence standards, and stop conditions.",
  },
  {
    notes:
      "Teach loop coding as feedback-driven iteration. The model should not guess in isolation. The harness runs commands, writes logs back, and the agent repairs based on evidence.",
  },
  {
    notes:
      "Close with an end-to-end example. Show how main agent, subagents, human gates, harness tools, tests, hooks, and final reporting fit together without pretending the model directly executes systems.",
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
  text(slide, "Lesson 3", { left: 64, top: 44, width: 260, height: 54, fontSize: 50, color: BLUE, bold: true });
  text(slide, "Agentic Workflows", { left: 326, top: 46, width: 710, height: 54, fontSize: 50, color: NAVY, bold: true });
  text(slide, "Subagents, Teammates, and Loop Coding", {
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

  const cards = [
    ["Lesson 1", "Model reads and writes the paper.", BLUE, PALE2],
    ["Lesson 2", "Harness manages one paper and its tools.", GREEN, PALE],
    ["Lesson 3", "Complex work uses multiple papers, roles, steps, and loops.", ORANGE, YELLOW],
  ];
  cards.forEach(([title, body, color, fill], i) => {
    miniCard(slide, { left: 98 + i * 394, top: 224, width: 300, height: 240, title, body, color, fill });
    if (i < 2) line(slide, { left: 412 + i * 394, top: 346, width: 72, arrow: true, weight: 4 });
  });

  shape(slide, { left: 144, top: 570, width: 992, height: 70, fill: "white", line: BLUE });
  text(slide, "Core idea", { left: 184, top: 591, width: 142, height: 24, fontSize: 22, color: BLUE, bold: true });
  text(slide, "Do not just write longer prompts. Split context, roles, steps, and feedback loops deliberately.", {
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
  header(slide, "One Agent Can Overload One Paper", "Large tasks mix logs, plans, code, errors, requirements, and tests.");

  shape(slide, { left: 430, top: 164, width: 420, height: 376, fill: "white", line: BLUE, shadow: "shadow-sm" });
  text(slide, "Single Agent Paper", { left: 500, top: 194, width: 280, height: 30, fontSize: 28, color: BLUE, bold: true, align: "center" });
  const scraps = [
    ["search logs", 488, 254, BLUE],
    ["plans", 660, 246, GREEN],
    ["code snippets", 544, 314, ORANGE],
    ["test output", 660, 342, PURPLE],
    ["requirements", 496, 400, RED],
    ["errors", 678, 438, RED],
  ];
  scraps.forEach(([label, left, top, color], i) => {
    shape(slide, { left, top, width: 128, height: 42, fill: i % 2 ? PALE : YELLOW, line: color, radius: "rounded-md" });
    text(slide, label, { left: left + 12, top: top + 11, width: 104, height: 18, fontSize: 16, color, bold: true, align: "center" });
  });

  const risks = [
    ["Context pollution", "irrelevant detail competes with signal"],
    ["Mixed goals", "architect, coder, tester, reviewer in one role"],
    ["Noisy tool traces", "long logs crowd out constraints"],
    ["Compacting loss", "important edges may be summarized away"],
  ];
  risks.forEach(([title, body], i) => {
    const left = i < 2 ? 74 : 908;
    const top = 182 + (i % 2) * 170;
    shape(slide, { left, top, width: 280, height: 126, fill: PALE2, line: BORDER });
    text(slide, title, { left: left + 24, top: top + 24, width: 232, height: 24, fontSize: 21, color: i % 2 ? ORANGE : BLUE, bold: true, align: "center" });
    text(slide, body, { left: left + 28, top: top + 62, width: 224, height: 34, fontSize: 16, color: NAVY, align: "center" });
  });

  shape(slide, { left: 190, top: 598, width: 900, height: 48, fill: YELLOW, line: "#f0d891" });
  text(slide, "Signal", { left: 226, top: 612, width: 90, height: 22, fontSize: 19, color: ORANGE, bold: true });
  text(slide, "When one paper gets noisy, create cleaner papers for local work.", {
    left: 336,
    top: 612,
    width: 700,
    height: 22,
    fontSize: 18,
    color: NAVY,
  });
  return slide;
}

function slide3(presentation) {
  const slide = presentation.slides.add();
  slide.background.fill = "white";
  header(slide, "A Subagent Gives a Local Task Its Own Paper", "The main agent delegates noisy work and receives a compact result.");

  shape(slide, { left: 72, top: 250, width: 260, height: 170, fill: PALE, line: BLUE });
  text(slide, "Main Agent", { left: 116, top: 282, width: 172, height: 28, fontSize: 25, color: BLUE, bold: true, align: "center" });
  text(slide, "goal, constraints,\nfinal integration", { left: 118, top: 334, width: 168, height: 46, fontSize: 17, color: NAVY, align: "center" });

  const subs = [
    [510, 164, "Research", "read docs and code"],
    [510, 316, "Test", "find coverage gaps"],
    [510, 468, "Review", "check risk and maintainability"],
  ];
  subs.forEach(([left, top, title, body], i) => {
    shape(slide, { left, top, width: 258, height: 108, fill: i === 1 ? YELLOW : PALE2, line: i === 1 ? "#f0d891" : BORDER });
    text(slide, `${title} Subagent`, { left: left + 20, top: top + 18, width: 218, height: 22, fontSize: 20, color: i === 1 ? ORANGE : GREEN, bold: true, align: "center" });
    text(slide, body, { left: left + 30, top: top + 54, width: 198, height: 18, fontSize: 16, color: NAVY, align: "center" });
    line(slide, { left: 348, top: 335, width: 140, height: top - 284, arrow: true, color: BLUE });
  });

  shape(slide, { left: 930, top: 252, width: 260, height: 166, fill: PALE2, line: PURPLE });
  text(slide, "Returned Summary", { left: 958, top: 284, width: 204, height: 26, fontSize: 24, color: PURPLE, bold: true, align: "center" });
  text(slide, "findings, files,\nrisks, recommended\nnext step", { left: 980, top: 334, width: 160, height: 66, fontSize: 17, color: NAVY, align: "center" });
  subs.forEach(([, top], i) => {
    line(slide, { left: 784, top: top + 54, width: 126, height: 335 - (top + 54), arrow: true, color: i === 1 ? ORANGE : GREEN });
  });

  shape(slide, { left: 160, top: 612, width: 960, height: 42, fill: PALE2, line: BLUE });
  text(slide, "A subagent is not magic autonomy; it is context isolation plus a bounded task.", {
    left: 220,
    top: 623,
    width: 840,
    height: 18,
    fontSize: 17,
    color: NAVY,
    bold: true,
    align: "center",
  });
  return slide;
}

function slide4(presentation) {
  const slide = presentation.slides.add();
  slide.background.fill = "white";
  header(slide, "Use Subagents When the Split Reduces Friction", "Delegation should make the task clearer, safer, or faster.");

  shape(slide, { left: 84, top: 164, width: 500, height: 364, fill: PALE2, line: GREEN });
  text(slide, "Good fit", { left: 154, top: 198, width: 360, height: 32, fontSize: 30, color: GREEN, bold: true, align: "center" });
  ["Large reading or search", "Parallel review", "Specialized expertise", "Read-only risk isolation"].forEach((item, i) => {
    shape(slide, { left: 138, top: 258 + i * 56, width: 392, height: 38, fill: "white", line: "#b8dec8", radius: "rounded-md" });
    text(slide, item, { left: 160, top: 268 + i * 56, width: 348, height: 18, fontSize: 17, color: NAVY, align: "center" });
  });

  shape(slide, { left: 696, top: 164, width: 500, height: 364, fill: "#fff5f5", line: "#f0b5b5" });
  text(slide, "Stay main agent", { left: 766, top: 198, width: 360, height: 32, fontSize: 30, color: RED, bold: true, align: "center" });
  ["Tiny task", "Tightly coupled edit", "Shared context must be continuous", "Merge cost exceeds value"].forEach((item, i) => {
    shape(slide, { left: 750, top: 258 + i * 56, width: 392, height: 38, fill: "white", line: "#f0b5b5", radius: "rounded-md" });
    text(slide, item, { left: 772, top: 268 + i * 56, width: 348, height: 18, fontSize: 17, color: NAVY, align: "center" });
  });

  shape(slide, { left: 174, top: 590, width: 932, height: 58, fill: YELLOW, line: "#f0d891" });
  text(slide, "Decision rule", { left: 214, top: 608, width: 160, height: 22, fontSize: 20, color: ORANGE, bold: true });
  text(slide, "Split work only when isolation, specialization, or parallelism beats coordination cost.", {
    left: 394,
    top: 608,
    width: 660,
    height: 22,
    fontSize: 18,
    color: NAVY,
  });
  return slide;
}

function slide5(presentation) {
  const slide = presentation.slides.add();
  slide.background.fill = "white";
  header(slide, "Workflow Means Passing Papers Through Stable Steps", "Each step should have a defined input, action, output, owner, and gate.");

  const steps = [
    ["Spec", "requirement"],
    ["Plan", "scope and risks"],
    ["Implement", "diff"],
    ["Test", "evidence"],
    ["Review", "findings"],
    ["Fix", "resolved issues"],
    ["Document", "final notes"],
  ];
  steps.forEach(([title, body], i) => {
    const x = 54 + i * 174;
    shape(slide, { left: x, top: 220, width: 138, height: 126, fill: i % 2 ? PALE : PALE2, line: i === 3 ? GREEN : BORDER });
    badge(slide, String(i + 1), { left: x + 48, top: 242, color: i === 3 ? GREEN : BLUE });
    text(slide, title, { left: x + 14, top: 296, width: 110, height: 22, fontSize: 19, color: i === 3 ? GREEN : BLUE, bold: true, align: "center" });
    text(slide, body, { left: x + 14, top: 322, width: 110, height: 18, fontSize: 16, color: NAVY, align: "center" });
    if (i < steps.length - 1) line(slide, { left: x + 144, top: 282, width: 24, arrow: true, weight: 2 });
  });

  shape(slide, { left: 154, top: 438, width: 972, height: 86, fill: YELLOW, line: "#f0d891" });
  text(slide, "Workflow contract", { left: 198, top: 462, width: 220, height: 26, fontSize: 22, color: ORANGE, bold: true });
  text(slide, "A workflow is not 'AI keeps going.' It is a repeatable rule for what artifact each step must produce before the next step starts.", {
    left: 438,
    top: 458,
    width: 640,
    height: 42,
    fontSize: 18,
    color: NAVY,
  });

  shape(slide, { left: 246, top: 598, width: 788, height: 42, fill: PALE2, line: BLUE });
  text(slide, "Stable steps make AI work inspectable instead of conversationally blurry.", {
    left: 290,
    top: 609,
    width: 700,
    height: 18,
    fontSize: 17,
    color: NAVY,
    bold: true,
    align: "center",
  });
  return slide;
}

function slide6(presentation) {
  const slide = presentation.slides.add();
  slide.background.fill = "white";
  header(slide, "Gates and Hooks Keep Workflow Deterministic", "The harness enforces control points around model-generated work.");

  const contract = ["Input", "Action", "Output", "Gate"];
  contract.forEach((item, i) => {
    const x = 112 + i * 170;
    shape(slide, { left: x, top: 174, width: 132, height: 84, fill: PALE2, line: BLUE });
    text(slide, item, { left: x + 18, top: 202, width: 96, height: 24, fontSize: 22, color: BLUE, bold: true, align: "center" });
    if (i < contract.length - 1) line(slide, { left: x + 140, top: 216, width: 22, arrow: true });
  });

  shape(slide, { left: 760, top: 160, width: 360, height: 126, fill: YELLOW, line: "#f0d891" });
  text(slide, "Fallback", { left: 826, top: 190, width: 230, height: 28, fontSize: 26, color: ORANGE, bold: true, align: "center" });
  text(slide, "re-plan, reduce scope, ask human, or stop", { left: 812, top: 232, width: 256, height: 22, fontSize: 17, color: NAVY, align: "center" });

  const hooks = [
    ["Before tool use", "approval or policy check"],
    ["After file edit", "format and lint"],
    ["After test run", "write logs to context"],
    ["On error", "retry or ask"],
    ["On compact", "preserve key constraints"],
    ["On finish", "summary and evidence"],
  ];
  hooks.forEach(([title, body], i) => {
    const left = 96 + (i % 3) * 366;
    const top = 350 + Math.floor(i / 3) * 100;
    shape(slide, { left, top, width: 310, height: 72, fill: i % 2 ? PALE : PALE2, line: BORDER });
    text(slide, title, { left: left + 20, top: top + 12, width: 270, height: 20, fontSize: 18, color: i % 2 ? GREEN : BLUE, bold: true, align: "center" });
    text(slide, body, { left: left + 24, top: top + 40, width: 262, height: 16, fontSize: 16, color: NAVY, align: "center" });
  });

  shape(slide, { left: 174, top: 608, width: 932, height: 44, fill: "white", line: BLUE });
  text(slide, "Prompt asks. Hook enforces. Gate decides whether the workflow may move forward.", {
    left: 220,
    top: 620,
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
  header(slide, "Teammate Mode Is More Than Q&A", "A teammate maintains goals, plans, evidence, and next steps.");

  shape(slide, { left: 88, top: 168, width: 470, height: 382, fill: PALE2, line: BLUE });
  text(slide, "Chatbot mode", { left: 160, top: 204, width: 326, height: 34, fontSize: 32, color: BLUE, bold: true, align: "center" });
  ["Q -> A", "Q -> A", "Q -> A"].forEach((item, i) => {
    shape(slide, { left: 190, top: 282 + i * 64, width: 266, height: 42, fill: "white", line: BORDER, radius: "rounded-md" });
    text(slide, item, { left: 220, top: 292 + i * 64, width: 206, height: 18, fontSize: 18, color: NAVY, bold: true, align: "center" });
  });

  shape(slide, { left: 722, top: 168, width: 470, height: 382, fill: PALE, line: GREEN });
  text(slide, "Teammate mode", { left: 794, top: 204, width: 326, height: 34, fontSize: 32, color: GREEN, bold: true, align: "center" });
  ["Goal", "Plan", "Execute", "Verify", "Report", "Iterate"].forEach((item, i) => {
    const left = 792 + (i % 2) * 170;
    const top = 276 + Math.floor(i / 2) * 66;
    shape(slide, { left, top, width: 130, height: 42, fill: "white", line: "#b8dec8", radius: "rounded-md" });
    text(slide, item, { left: left + 14, top: top + 10, width: 102, height: 18, fontSize: 17, color: GREEN, bold: true, align: "center" });
  });

  shape(slide, { left: 158, top: 608, width: 964, height: 42, fill: YELLOW, line: "#f0d891" });
  text(slide, "A teammate continuously maintains the paper, instead of only answering the latest prompt.", {
    left: 214,
    top: 619,
    width: 852,
    height: 18,
    fontSize: 17,
    color: NAVY,
    bold: true,
    align: "center",
  });
  return slide;
}

function slide8(presentation) {
  const slide = presentation.slides.add();
  slide.background.fill = "white";
  header(slide, "AI Collaboration Needs Explicit Boundaries", "Autonomy should be scoped by file access, commands, risk, evidence, and stop rules.");

  const cols = [
    ["Allowed", GREEN, "#eefaf2", ["Inspect code", "Propose plan", "Edit scoped files", "Run approved tests"]],
    ["Needs approval", ORANGE, YELLOW, ["Delete files", "Change architecture", "Modify production config", "Access sensitive data"]],
    ["Forbidden", RED, "#fff5f5", ["Touch secrets", "Run destructive commands", "Ignore failing tests", "Invent evidence"]],
  ];
  cols.forEach(([title, color, fill, items], i) => {
    const left = 66 + i * 406;
    shape(slide, { left, top: 170, width: 344, height: 362, fill, line: color });
    text(slide, title, { left: left + 54, top: 204, width: 236, height: 32, fontSize: 30, color, bold: true, align: "center" });
    items.forEach((item, j) => {
      shape(slide, { left: left + 42, top: 272 + j * 54, width: 260, height: 36, fill: "white", line: color, radius: "rounded-md" });
      text(slide, item, { left: left + 62, top: 281 + j * 54, width: 220, height: 18, fontSize: 16, color: NAVY, align: "center" });
    });
  });

  shape(slide, { left: 162, top: 592, width: 956, height: 58, fill: PALE2, line: BLUE });
  text(slide, "Boundary rule", { left: 204, top: 610, width: 170, height: 22, fontSize: 20, color: BLUE, bold: true });
  text(slide, "The more side effects an action has, the more the harness needs permission, audit, and human control.", {
    left: 394,
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
  header(slide, "Loop Coding Is Feedback-Driven Iteration", "AI coding is not Prompt -> Code; it is Plan -> Edit -> Run -> Observe -> Fix -> Verify.");

  const steps = [
    ["Plan", BLUE],
    ["Edit", GREEN],
    ["Run", ORANGE],
    ["Observe", PURPLE],
    ["Fix", RED],
    ["Verify", GREEN],
  ];
  const positions = [
    [246, 172],
    [504, 172],
    [762, 172],
    [762, 398],
    [504, 398],
    [246, 398],
  ];
  steps.forEach(([title, color], i) => {
    const [left, top] = positions[i];
    shape(slide, { left, top, width: 170, height: 96, fill: i % 2 ? PALE : PALE2, line: color });
    badge(slide, String(i + 1), { left: left + 64, top: top + 14, color });
    text(slide, title, { left: left + 24, top: top + 62, width: 122, height: 20, fontSize: 19, color, bold: true, align: "center" });
  });
  line(slide, { left: 424, top: 220, width: 70, arrow: true, weight: 3 });
  line(slide, { left: 682, top: 220, width: 70, arrow: true, weight: 3 });
  line(slide, { left: 847, top: 278, width: 0, height: 110, arrow: true, weight: 3 });
  line(slide, { left: 762, top: 446, width: -70, arrow: true, weight: 3 });
  line(slide, { left: 504, top: 446, width: -70, arrow: true, weight: 3 });
  line(slide, { left: 331, top: 398, width: 0, height: -110, arrow: true, weight: 3, dash: "dash" });

  shape(slide, { left: 130, top: 596, width: 1020, height: 54, fill: YELLOW, line: "#f0d891" });
  text(slide, "Harness role", { left: 170, top: 612, width: 150, height: 22, fontSize: 20, color: ORANGE, bold: true });
  text(slide, "Run commands, capture logs, write observations back, and keep the agent grounded in real feedback.", {
    left: 340,
    top: 612,
    width: 760,
    height: 22,
    fontSize: 18,
    color: NAVY,
  });
  return slide;
}

function slide10(presentation) {
  const slide = presentation.slides.add();
  slide.background.fill = "white";
  header(slide, "End-to-End Agentic Code Change", "A complex task combines main context, subagent context, harness tools, gates, and final evidence.");

  const steps = [
    ["1", "Main agent\nreads requirement", BLUE],
    ["2", "Research subagent\nfinds relevant files", GREEN],
    ["3", "Plan and\nhuman gate", ORANGE],
    ["4", "Implementation\nedits scoped files", PURPLE],
    ["5", "Tests run\nlogs return", RED],
    ["6", "Review subagent\nchecks diff", GREEN],
    ["7", "Final report\nsummarizes evidence", BLUE],
  ];
  steps.forEach(([num, label, color], i) => {
    const x = 54 + i * 174;
    shape(slide, { left: x, top: 198, width: 138, height: 132, fill: i % 2 ? PALE : PALE2, line: color });
    badge(slide, num, { left: x + 48, top: 218, color });
    text(slide, label, { left: x + 12, top: 274, width: 114, height: 42, fontSize: 16, color: NAVY, bold: i === 2, align: "center" });
    if (i < steps.length - 1) line(slide, { left: x + 144, top: 264, width: 24, arrow: true, weight: 2 });
  });

  const lanes = [
    ["Main paper", "goal, plan, final decisions", BLUE, 108],
    ["Subagent papers", "research logs, review notes, local evidence", GREEN, 386],
    ["Harness layer", "tools, tests, approvals, hooks, traces", ORANGE, 664],
  ];
  lanes.forEach(([title, body, color, left]) => {
    shape(slide, { left, top: 426, width: 240, height: 94, fill: "white", line: color });
    text(slide, title, { left: left + 20, top: 448, width: 200, height: 22, fontSize: 19, color, bold: true, align: "center" });
    text(slide, body, { left: left + 24, top: 480, width: 192, height: 28, fontSize: 16, color: NAVY, align: "center" });
  });

  shape(slide, { left: 942, top: 426, width: 230, height: 94, fill: YELLOW, line: "#f0d891" });
  text(slide, "Human control", { left: 972, top: 448, width: 170, height: 22, fontSize: 19, color: ORANGE, bold: true, align: "center" });
  text(slide, "approval at scope, risk, and merge points", { left: 980, top: 480, width: 154, height: 30, fontSize: 16, color: NAVY, align: "center" });

  shape(slide, { left: 150, top: 608, width: 980, height: 44, fill: PALE2, line: BLUE });
  text(slide, "Engineering-grade AI collaboration is designed, bounded, measured, and verified.", {
    left: 210,
    top: 620,
    width: 860,
    height: 18,
    fontSize: 17,
    color: NAVY,
    bold: true,
    align: "center",
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
    path.join(previewDir, "lesson-03-montage.webp"),
    await presentation.export({ format: "webp", montage: true, scale: 1 })
  );

  const pptx = await PresentationFile.exportPptx(presentation);
  await pptx.save(outputPath);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
