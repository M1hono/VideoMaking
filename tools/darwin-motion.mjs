#!/usr/bin/env node
import { existsSync, mkdirSync, readFileSync, writeFileSync, appendFileSync } from "node:fs";
import { dirname, resolve } from "node:path";

const args = process.argv.slice(2);
const RESULTS_PATH = "evolution/results.tsv";
const HEADERS = "timestamp\ttarget\told_score\tnew_score\tstatus\tdimension\tnote\teval_mode\n";

const help = `Usage:
  pnpm run darwin:init
  pnpm run darwin:score -- <target-path>
  pnpm run darwin:log -- --target <path> --old <score> --new <score> --status keep|revert|baseline --dimension <name> --note "..." [--eval-mode dry_run|full_test]
  pnpm run darwin:report

Scores are heuristic. Use them to guide a focused improvement round, then pair them with real verification evidence.`;

const ensureEvolutionDirs = () => {
  for (const dir of [
    "evolution",
    "evolution/experiments",
    "evolution/patterns",
    "evolution/reports",
    "evolution/test-prompts",
  ]) {
    mkdirSync(dir, { recursive: true });
  }
  if (!existsSync(RESULTS_PATH)) {
    writeFileSync(RESULTS_PATH, HEADERS);
  }
};

const parseOptions = (values) => {
  const positional = [];
  const options = {};
  for (let index = 0; index < values.length; index += 1) {
    const value = values[index];
    if (value === "--") {
      continue;
    }
    if (!value.startsWith("--")) {
      positional.push(value);
      continue;
    }
    const key = value.slice(2);
    const next = values[index + 1];
    if (!next || next.startsWith("--")) {
      options[key] = true;
      continue;
    }
    options[key] = next;
    index += 1;
  }
  return { positional, options };
};

const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

const hasAny = (text, patterns) => patterns.some((pattern) => pattern.test(text));

const scoreDimension = (text, checks) => {
  const hits = checks.filter((patterns) => hasAny(text, patterns)).length;
  return clamp(Math.round((hits / checks.length) * 10), 0, 10);
};

const scoreTarget = (targetPath) => {
  const absPath = resolve(targetPath);
  if (!existsSync(absPath)) {
    throw new Error(`Target not found: ${targetPath}`);
  }
  const text = readFileSync(absPath, "utf8");
  const lower = text.toLowerCase();

  const dimensions = [
    {
      name: "trigger_and_purpose",
      weight: 10,
      score: scoreDimension(lower, [
        [/description|purpose|mission|目标|用途/],
        [/use when|when to use|触发|适用/],
        [/motion|video|render|animation|remotion|skill|workflow|视频|动效/],
      ]),
    },
    {
      name: "workflow_specificity",
      weight: 15,
      score: scoreDimension(lower, [
        [/\b1\.|\b2\.|\bstep|phase|workflow|流程|步骤/],
        [/input|output|path|command|run|执行|输出|输入/],
        [/pnpm|node|ffmpeg|remotion|git|script|命令/],
      ]),
    },
    {
      name: "motion_video_coverage",
      weight: 15,
      score: scoreDimension(lower, [
        [/remotion|gsap|three|manim|lottie|rive|d3|pixi|canvas|shader/],
        [/asset|snippet|segment|render|media|caption|audio|素材|片段|成品/],
        [/3d|kinetic|typography|data|product|explainer|social|music|brand|字幕/],
      ]),
    },
    {
      name: "determinism_and_safety",
      weight: 15,
      score: scoreDimension(lower, [
        [/deterministic|frame|seed|pure|可复现|确定性/],
        [/avoid|do not|never|ignored|gitignore|不要|避免/],
        [/revert|rollback|dry.?run|verify|safe|回滚|验证/],
      ]),
    },
    {
      name: "reuse_and_parameters",
      weight: 15,
      score: scoreDimension(lower, [
        [/parameter|config|preset|template|props|defaults|参数|预设/],
        [/reuse|reusable|snippet|pattern|library|复用|片段|模式/],
        [/folder|directory|assets|refs|segments|renders|目录/],
      ]),
    },
    {
      name: "verification_strength",
      weight: 15,
      score: scoreDimension(lower, [
        [/verify|test|smoke|lint|score|rubric|校验|测试|评分/],
        [/pnpm run|ffprobe|ffmpeg|remotion:compositions|media:/],
        [/evidence|report|result|log|results.tsv|证据|报告/],
      ]),
    },
    {
      name: "project_fit",
      weight: 10,
      score: scoreDimension(lower, [
        [/vibe-motion-app|create-vibe-motion|shared\/features|projectregistry/],
        [/pnpm|packageManager|AGENTS|\.codex|skill/],
        [/assets\/|snippets\/|segments\/|renders\/|evolution\//],
      ]),
    },
    {
      name: "learning_capture",
      weight: 5,
      score: scoreDimension(lower, [
        [/evolution|darwin|learn|pattern|instinct|进化|学习/],
        [/results.tsv|experiments|patterns|reports|test-prompts/],
      ]),
    },
  ];

  const total = dimensions.reduce(
    (sum, dimension) => sum + (dimension.score * dimension.weight) / 10,
    0
  );
  const weakest = [...dimensions].sort((a, b) => a.score - b.score || b.weight - a.weight)[0];
  return { target: targetPath, total: Number(total.toFixed(1)), weakest, dimensions };
};

const escapeTsv = (value) => String(value ?? "").replace(/\t/g, " ").replace(/\n/g, " ");

const command = args[0];

try {
  if (!command || command === "help" || command === "--help" || command === "-h") {
    console.log(help);
    process.exit(0);
  }

  const { positional, options } = parseOptions(args.slice(1));

  if (command === "init") {
    ensureEvolutionDirs();
    console.log(`Initialized ${RESULTS_PATH}`);
    process.exit(0);
  }

  if (command === "score") {
    ensureEvolutionDirs();
    const target = positional[0];
    if (!target) {
      throw new Error("Missing target path.");
    }
    const result = scoreTarget(target);
    console.log(JSON.stringify(result, null, 2));
    process.exit(0);
  }

  if (command === "log") {
    ensureEvolutionDirs();
    const target = options.target;
    if (!target) {
      throw new Error("Missing --target.");
    }
    const line = [
      new Date().toISOString(),
      target,
      options.old ?? "-",
      options.new ?? "-",
      options.status ?? "baseline",
      options.dimension ?? "-",
      options.note ?? "",
      options["eval-mode"] ?? options.eval_mode ?? "dry_run",
    ]
      .map(escapeTsv)
      .join("\t");
    appendFileSync(RESULTS_PATH, `${line}\n`);
    console.log(`Logged Darwin result for ${target}`);
    process.exit(0);
  }

  if (command === "report") {
    ensureEvolutionDirs();
    const rows = readFileSync(RESULTS_PATH, "utf8").trim().split("\n");
    const data = rows.slice(1).filter(Boolean);
    const summary = data.reduce(
      (acc, row) => {
        const cols = row.split("\t");
        const status = cols[4] || "unknown";
        acc.total += 1;
        acc.status[status] = (acc.status[status] ?? 0) + 1;
        return acc;
      },
      { total: 0, status: {} }
    );
    mkdirSync(dirname("evolution/reports/latest.json"), { recursive: true });
    writeFileSync("evolution/reports/latest.json", JSON.stringify(summary, null, 2));
    console.log(JSON.stringify(summary, null, 2));
    process.exit(0);
  }

  throw new Error(`Unknown command: ${command}`);
} catch (error) {
  console.error(error.message);
  console.error("");
  console.error(help);
  process.exit(1);
}
