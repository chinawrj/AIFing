import fs from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";

const artifactToolModule =
  process.env.ARTIFACT_TOOL_MODULE ??
  "/tmp/codex-presentations/aifing-lesson-02-01/tmp/node_modules/@oai/artifact-tool/dist/artifact_tool.mjs";
const { Presentation, PresentationFile } = await import(pathToFileURL(artifactToolModule).href);

const repoRoot = "/Users/rjwang/Documents/AIFing";
const outputPath = path.join(repoRoot, "decks", "lesson-02-01-advanced-harness-objects.pptx");
const assetDir = path.join(repoRoot, "docs", "lesson-02-01-advanced", "assets");
const previewDir = "/tmp/codex-presentations/aifing-lesson-02-01/tmp/preview";

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
      "Frame this as Lesson 2's advanced add-on. The point is that a harness manages runtime objects and contracts, not just one long prompt string.",
  },
  {
    notes:
      "Show that the current visible paper is assembled from many runtime objects. Each object has a different owner, risk profile, and rendering rule.",
  },
  {
    notes:
      "Explain the lifecycle of a harness object. A production runtime should know where an object came from, why it was selected, how it is rendered, and how it is validated.",
  },
  {
    notes:
      "Use tools as the clearest example of a runtime contract. The model proposes a structured request, but the harness validates, checks permission, executes, and writes the result back.",
  },
  {
    notes:
      "Separate vocabulary. A skill guides work, a tool performs an action, an agent profile defines the work environment, permissions control risk, and observations record what happened.",
  },
  {
    notes:
      "Close by emphasizing that object boundaries are practical: they keep the paper clean, reduce prompt pollution, make failures debuggable, and prepare learners for Lesson 3 without entering workflow orchestration.",
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

function titleHeader(slide) {
  text(slide, "2.1 Advanced", { left: 64, top: 36, width: 390, height: 66, fontSize: 56, color: NAVY, bold: true });
  text(slide, "Harness Objects and Runtime Contracts", { left: 450, top: 50, width: 760, height: 52, fontSize: 36, color: NAVY, bold: true });
  text(slide, "Prompt text becomes manageable only when the runtime objects around it are explicit.", {
    left: 190,
    top: 112,
    width: 900,
    height: 30,
    fontSize: 20,
    color: BLUE,
    italic: true,
    align: "center",
  });
  line(slide, { left: 64, top: 150, width: 1152, weight: 2 });
}

function labeledCard(slide, { left, top, width, height, title, body, fill = PALE2, lineColor = BORDER, titleColor = BLUE }) {
  shape(slide, { left, top, width, height, fill, line: lineColor, radius: "rounded-lg", shadow: "shadow-sm" });
  text(slide, title, { left: left + 18, top: top + 18, width: width - 36, height: 30, fontSize: 24, color: titleColor, bold: true, align: "center" });
  text(slide, body, { left: left + 28, top: top + 66, width: width - 56, height: height - 82, fontSize: 17, color: NAVY, align: "center" });
}

function smallObject(slide, { left, top, width, title, body, fill, color }) {
  shape(slide, { left, top, width, height: 58, fill, line: "#d7e6fb", radius: "rounded-md" });
  text(slide, title, { left: left + 14, top: top + 9, width: width - 28, height: 20, fontSize: 15, color, bold: true, align: "center" });
  text(slide, body, { left: left + 14, top: top + 31, width: width - 28, height: 18, fontSize: 13, color: NAVY, align: "center" });
}

function slide1(presentation) {
  const slide = presentation.slides.add();
  slide.background.fill = "white";
  titleHeader(slide);

  labeledCard(slide, {
    left: 64,
    top: 194,
    width: 348,
    height: 300,
    title: "What stays true",
    body: "The model still reads the paper.\nThe harness still prepares it.\nTools are still executed outside the model.",
    fill: PALE2,
  });
  labeledCard(slide, {
    left: 466,
    top: 194,
    width: 348,
    height: 300,
    title: "What objects add",
    body: "Instructions, tools, skills, permissions, profiles, and observations become manageable runtime objects.",
    fill: PALE,
  });
  labeledCard(slide, {
    left: 868,
    top: 194,
    width: 348,
    height: 300,
    title: "What this is not",
    body: "Not a longer prompt.\nNot a workflow engine.\nNot a subagent system.",
    fill: YELLOW,
    lineColor: "#f0d891",
    titleColor: ORANGE,
  });

  shape(slide, { left: 150, top: 560, width: 980, height: 72, fill: "white", line: BLUE });
  text(slide, "Core idea", { left: 190, top: 581, width: 150, height: 28, fontSize: 23, color: BLUE, bold: true });
  text(slide, "Prompt controls text. Harness objects control what enters the paper and what can execute.", {
    left: 356,
    top: 579,
    width: 720,
    height: 32,
    fontSize: 21,
    color: NAVY,
  });
  return slide;
}

function slide2(presentation) {
  const slide = presentation.slides.add();
  slide.background.fill = "white";
  header(slide, "The Paper Is Built From Runtime Objects", "The visible context is assembled, not simply typed as one prompt.");

  shape(slide, { left: 470, top: 174, width: 340, height: 360, fill: "white", line: BLUE, radius: "rounded-lg", shadow: "shadow-sm" });
  text(slide, "Visible Paper", { left: 520, top: 198, width: 240, height: 30, fontSize: 28, color: BLUE, bold: true, align: "center" });
  const paperRows = [
    ["System / developer rules", "#e8f1ff", BLUE],
    ["Selected user preferences", "#eefaf2", GREEN],
    ["Skill instructions", "#fff7df", ORANGE],
    ["Tool definitions", "#f3edff", PURPLE],
    ["Current task + observations", "#f8fbff", NAVY],
  ];
  paperRows.forEach(([label, fill, color], i) => {
    shape(slide, { left: 510, top: 248 + i * 48, width: 260, height: 34, fill, line: "#d7e6fb", radius: "rounded-md" });
    text(slide, label, { left: 526, top: 256 + i * 48, width: 228, height: 18, fontSize: 15, color, bold: i < 4, align: "center" });
  });

  const objects = [
    [72, 174, "Instruction objects", "roles, boundaries", PALE, BLUE],
    [72, 288, "Skill objects", "reusable manuals", YELLOW, ORANGE],
    [72, 402, "Permission objects", "allow, deny, approve", "#f7eefc", PURPLE],
    [884, 174, "Tool objects", "schema + executor", "#eefaf2", GREEN],
    [884, 288, "Agent profile", "role + tools + limits", PALE2, BLUE],
    [884, 402, "Observation records", "results, errors, logs", "#fff5f5", RED],
  ];
  objects.forEach(([left, top, title, body, fill, color]) => {
    smallObject(slide, { left, top, width: 300, title, body, fill, color });
    const startX = left < 400 ? left + 310 : left - 20;
    const arrowWidth = left < 400 ? 70 : -70;
    line(slide, { left: startX, top: top + 29, width: arrowWidth, color, arrow: true, weight: 2 });
  });

  shape(slide, { left: 174, top: 586, width: 932, height: 58, fill: PALE2, line: BLUE });
  text(slide, "Harness job", { left: 210, top: 604, width: 150, height: 24, fontSize: 21, color: BLUE, bold: true });
  text(slide, "Select, order, render, and constrain the objects that become this call's paper.", {
    left: 378,
    top: 604,
    width: 690,
    height: 24,
    fontSize: 19,
    color: NAVY,
  });
  return slide;
}

function slide3(presentation) {
  const slide = presentation.slides.add();
  slide.background.fill = "white";
  header(slide, "Object Lifecycle: Declare, Select, Render, Validate", "A harness object should be traceable before it reaches the model.");

  const steps = [
    ["Declare", "registry/config\nversion, owner, scope", BLUE],
    ["Select", "task fit\npolicy and budget", GREEN],
    ["Render", "text/schema\nplaced on paper", ORANGE],
    ["Validate", "schema, priority\npermission checks", PURPLE],
    ["Observe", "logs, metrics\neval cases", RED],
  ];
  steps.forEach(([title, body, color], i) => {
    const x = 74 + i * 236;
    shape(slide, { left: x, top: 198, width: 184, height: 190, fill: i % 2 ? PALE : PALE2, line: color });
    shape(slide, { left: x + 65, top: 222, width: 54, height: 54, fill: color, line: color, radius: "rounded-full" });
    text(slide, String(i + 1), { left: x + 84, top: 236, width: 16, height: 18, fontSize: 18, color: "white", bold: true, align: "center" });
    text(slide, title, { left: x + 18, top: 292, width: 148, height: 28, fontSize: 24, color, bold: true, align: "center" });
    text(slide, body, { left: x + 20, top: 330, width: 144, height: 42, fontSize: 15, color: NAVY, align: "center" });
    if (i < steps.length - 1) {
      line(slide, { left: x + 190, top: 292, width: 40, color: BLUE, arrow: true, weight: 2 });
    }
  });

  shape(slide, { left: 150, top: 462, width: 980, height: 92, fill: YELLOW, line: "#f0d891" });
  text(slide, "Advanced question", { left: 190, top: 486, width: 230, height: 28, fontSize: 22, color: ORANGE, bold: true });
  text(slide, "For every object on the paper, can you explain where it came from, why it was selected, and what can override it?", {
    left: 430,
    top: 483,
    width: 650,
    height: 40,
    fontSize: 20,
    color: NAVY,
  });

  shape(slide, { left: 236, top: 602, width: 808, height: 48, fill: PALE2, line: BLUE });
  text(slide, "If you cannot trace an object, you cannot reliably debug the answer.", {
    left: 270,
    top: 616,
    width: 740,
    height: 22,
    fontSize: 20,
    color: NAVY,
    bold: true,
    align: "center",
  });
  return slide;
}

function slide4(presentation) {
  const slide = presentation.slides.add();
  slide.background.fill = "white";
  header(slide, "A Tool Is an Executable Contract", "The model proposes a request; the harness enforces the contract.");

  shape(slide, { left: 78, top: 178, width: 302, height: 330, fill: PALE2, line: BLUE });
  text(slide, "Model proposal", { left: 112, top: 206, width: 234, height: 30, fontSize: 26, color: BLUE, bold: true, align: "center" });
  text(slide, "{\n  \"tool\": \"read_file\",\n  \"path\": \"...\"\n}", { left: 124, top: 270, width: 210, height: 120, fontSize: 22, color: GREEN, bold: true, align: "center" });
  text(slide, "Structured request\nwritten on the paper", { left: 114, top: 418, width: 230, height: 48, fontSize: 17, color: NAVY, align: "center" });

  line(slide, { left: 404, top: 342, width: 104, color: BLUE, arrow: true, weight: 4 });

  shape(slide, { left: 532, top: 154, width: 360, height: 404, fill: "white", line: GREEN });
  text(slide, "Tool contract", { left: 590, top: 182, width: 244, height: 32, fontSize: 28, color: GREEN, bold: true, align: "center" });
  const fields = [
    ["Name", "stable callable identity"],
    ["Schema", "valid argument shape"],
    ["Permission", "who may run it"],
    ["Executor", "real code/API called"],
    ["Result shape", "what comes back"],
    ["Failure path", "reject, retry, ask"],
  ];
  fields.forEach(([k, v], i) => {
    const y = 238 + i * 44;
    text(slide, k, { left: 574, top: y, width: 118, height: 22, fontSize: 16, color: GREEN, bold: true });
    text(slide, v, { left: 700, top: y, width: 150, height: 22, fontSize: 15, color: NAVY });
  });

  line(slide, { left: 914, top: 342, width: 104, color: BLUE, arrow: true, weight: 4 });

  shape(slide, { left: 1042, top: 178, width: 160, height: 330, fill: YELLOW, line: "#f0d891" });
  text(slide, "Harness\nruns it", { left: 1064, top: 220, width: 116, height: 60, fontSize: 24, color: ORANGE, bold: true, align: "center" });
  text(slide, "Validate\nCheck risk\nRun tool\nWrite result", { left: 1066, top: 318, width: 112, height: 100, fontSize: 17, color: NAVY, align: "center" });

  shape(slide, { left: 142, top: 596, width: 996, height: 58, fill: PALE, line: BLUE });
  text(slide, "Safety point", { left: 178, top: 613, width: 160, height: 24, fontSize: 21, color: BLUE, bold: true });
  text(slide, "Schema constrains shape. Permission and policy decide whether to run.", {
    left: 354,
    top: 612,
    width: 740,
    height: 28,
    fontSize: 19,
    color: NAVY,
  });
  return slide;
}

function slide5(presentation) {
  const slide = presentation.slides.add();
  slide.background.fill = "white";
  header(slide, "Skill, Tool, Agent Profile: Different Objects", "Do not overload one word for different runtime responsibilities.");

  const headers = ["Object", "What it controls", "Paper Model meaning", "Typical failure"];
  const colX = [70, 250, 550, 890];
  const colW = [150, 260, 300, 300];
  shape(slide, { left: 64, top: 160, width: 1152, height: 46, fill: BLUE, line: BLUE });
  headers.forEach((h, i) => text(slide, h, { left: colX[i] + 10, top: 173, width: colW[i] - 20, height: 22, fontSize: 16, color: "white", bold: true, align: i === 0 ? "center" : "left" }));
  const rows = [
    ["Skill", "How to work", "Reusable manual added when relevant", "Too vague or always loaded"],
    ["Tool", "What can execute", "Callable contract outside the model", "Schema without permission"],
    ["Agent profile", "Work environment", "Role, tools, limits, stop condition", "Confused with subagent"],
    ["Permission", "What may happen", "Risk gate before side effects", "Model decides risk alone"],
    ["Observation", "What happened", "Tool result, error, trace, eval signal", "Untrusted data treated as rules"],
  ];
  rows.forEach((row, r) => {
    const top = 208 + r * 72;
    shape(slide, { left: 64, top, width: 1152, height: 66, fill: r % 2 ? PALE : PALE2, line: BORDER, radius: "rounded-md" });
    row.forEach((v, i) => text(slide, v, { left: colX[i] + 10, top: top + 16, width: colW[i] - 20, height: 34, fontSize: 16, color: i === 0 ? BLUE : NAVY, bold: i === 0, align: i === 0 ? "center" : "left" }));
  });

  shape(slide, { left: 154, top: 594, width: 972, height: 64, fill: YELLOW, line: "#f0d891" });
  text(slide, "Rule of thumb", { left: 190, top: 614, width: 190, height: 24, fontSize: 21, color: ORANGE, bold: true });
  text(slide, "Skill guides work. Tool performs action. Agent profile defines the environment.", {
    left: 400,
    top: 612,
    width: 680,
    height: 28,
    fontSize: 19,
    color: NAVY,
  });
  return slide;
}

function slide6(presentation) {
  const slide = presentation.slides.add();
  slide.background.fill = "white";
  header(slide, "Object Boundaries Keep the Paper Clean", "Clear contracts make the harness maintainable, safer, and easier to debug.");

  shape(slide, { left: 80, top: 176, width: 500, height: 336, fill: "#fff5f5", line: "#f0b5b5" });
  text(slide, "Bad boundaries", { left: 120, top: 204, width: 420, height: 32, fontSize: 28, color: RED, bold: true, align: "center" });
  const bad = ["Repeated rules everywhere", "Tool outputs treated as instructions", "Permissions hidden in prompts", "No trace of object selection"];
  bad.forEach((item, i) => {
    shape(slide, { left: 128, top: 260 + i * 52, width: 404, height: 38, fill: "white", line: "#f0b5b5", radius: "rounded-md" });
    text(slide, item, { left: 150, top: 270 + i * 52, width: 360, height: 18, fontSize: 16, color: NAVY, align: "center" });
  });

  shape(slide, { left: 700, top: 176, width: 500, height: 336, fill: "#eefaf2", line: "#b8dec8" });
  text(slide, "Good boundaries", { left: 740, top: 204, width: 420, height: 32, fontSize: 28, color: GREEN, bold: true, align: "center" });
  const good = ["Objects have owners and versions", "Data stays separate from authority", "Risk gates are explicit", "Logs show what entered the paper"];
  good.forEach((item, i) => {
    shape(slide, { left: 748, top: 260 + i * 52, width: 404, height: 38, fill: "white", line: "#b8dec8", radius: "rounded-md" });
    text(slide, item, { left: 770, top: 270 + i * 52, width: 360, height: 18, fontSize: 16, color: NAVY, align: "center" });
  });

  shape(slide, { left: 128, top: 566, width: 1024, height: 74, fill: PALE2, line: BLUE });
  text(slide, "Lesson boundary", { left: 164, top: 586, width: 190, height: 28, fontSize: 22, color: BLUE, bold: true });
  text(slide, "Lesson 2.1 covers one harness runtime. Lesson 3 covers subagents, workflows, and multi-step collaboration.", {
    left: 374,
    top: 586,
    width: 728,
    height: 32,
    fontSize: 20,
    color: NAVY,
  });
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

  await writeBlob(
    path.join(previewDir, "lesson-02-01-montage.webp"),
    await presentation.export({ format: "webp", montage: true, scale: 1 })
  );

  const pptx = await PresentationFile.exportPptx(presentation);
  await pptx.save(outputPath);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
