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

const slideMeta = [
  {
    notes:
      "Open by connecting back to the Paper Model. Lesson 3 is about deciding who holds the plan when a task needs more than one clean paper: the main AI, prepared agent files, or a workflow script.",
  },
  {
    notes:
      "Frame the problem before presenting options. Complex tasks create context noise, compaction risk, and merge confusion. The plan needs an owner, otherwise the work becomes a pile of unmanaged paper.",
  },
  {
    notes:
      "Way 1 is the most universal subagent pattern. The user asks for a goal, the main AI invents a temporary team, each subagent works on a scoped paper, and summaries return to the main paper.",
  },
  {
    notes:
      "Clarify the operating discipline for ad hoc teams. Because the AI invents the team on demand, the brief, evidence expectations, return format, and merge gate matter even more.",
  },
  {
    notes:
      "Way 2 uses prepared custom agent files. These files package role, tools, rules, model choice, and a return contract so the same worker profile can be reused across tasks or projects.",
  },
  {
    notes:
      "Introduce teammate-style collaboration as an optional harness capability, not a universal subagent property. Ordinary subagents report back to the caller; agent teams can use independent sessions, shared tasks, and direct messages when the harness supports that mode.",
  },
  {
    notes:
      "Way 3 moves orchestration into JavaScript. In Claude Code dynamic workflows, a script can use meta, agent(), schema, and status-branching patterns so intermediate results live in script variables rather than flooding the main context.",
  },
  {
    notes:
      "Separate two different gates. A schema is a format gate: it checks shape, fields, and enums. A verifier is a truth gate: it independently reads files, runs checks, and judges evidence. Unverified must not silently become pass.",
  },
  {
    notes:
      "Connect back to compaction. Reactive compaction compresses a crowded paper after the fact. Proactive subagent splitting assigns weakly coupled parts to separate local papers and asks each to return a bounded result before local compaction becomes necessary.",
  },
  {
    notes:
      "Introduce Goodhart's Law in the AI training context. A custom agent file or rubric can accidentally turn a proxy into the target: the agent optimizes the checklist while missing the real quality goal.",
  },
  {
    notes:
      "Close by explaining how workflows reduce Goodhart risk. The workflow can keep the real goal explicit, use multiple signals, separate worker and judge roles, and script stopping conditions before the final artifact returns to the main paper.",
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
      alt: `Lesson 3 full-page AI generated infographic slide ${index + 1}`,
      fit: "contain",
      position: { left: 0, top: 0, width: 1280, height: 720 },
    });
    slide.speakerNotes.textFrame.setText(meta.notes);
    slide.speakerNotes.setVisible(true);
  }

  const pptx = await PresentationFile.exportPptx(deck);
  await pptx.save(outputPath);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
