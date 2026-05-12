#!/usr/bin/env node

// Workflow Doctor
// Purpose: one command that checks this video-making workspace before motion,
// media, Slidev, Git, Darwin, or render work begins. It reports deterministic
// command evidence as JSON so agents can reuse the same health gate in local
// worktrees, delivery branches, and CI-style smoke checks.
//
// Usage:
//   pnpm run workflow:doctor
//   pnpm run workflow:doctor -- --verify
//
// The default run is fast and non-destructive. The optional --verify mode also
// runs the full lint plus Remotion compositions gate. Keep this script generic:
// add new checks through reusable command definitions instead of embedding
// one-off project task behavior.
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { spawnSync } from "node:child_process";

const run = (command, args, options = {}) => {
  const started = Date.now();
  const result = spawnSync(command, args, {
    encoding: "utf8",
    stdio: "pipe",
    cwd: options.cwd,
    env: process.env,
  });
  return {
    command: [command, ...args].join(" "),
    status: result.status ?? 1,
    ok: result.status === 0,
    duration_ms: Date.now() - started,
    stdout: result.stdout ?? "",
    stderr: result.stderr ?? "",
  };
};

const parseJson = (result) => {
  try {
    return JSON.parse(result.stdout);
  } catch {
    return null;
  }
};

const firstLine = (text) =>
  String(text ?? "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)[0] ?? "";

const countMarkdownFiles = (path) => {
  if (!existsSync(path)) {
    return 0;
  }
  return readdirSync(path).filter((file) => file.endsWith(".md")).length;
};

const readPackageScripts = () => {
  if (!existsSync("package.json")) {
    return {};
  }
  try {
    return JSON.parse(readFileSync("package.json", "utf8")).scripts ?? {};
  } catch {
    return {};
  }
};

const checks = [];

const addCheck = (name, result, details = {}) => {
  checks.push({
    name,
    ok: result.ok,
    command: result.command,
    duration_ms: result.duration_ms,
    ...details,
  });
  return result;
};

const commandExists = (command) => run("sh", ["-lc", `command -v ${command}`]);

const scripts = readPackageScripts();

const gitflow = addCheck("gitflow", run("pnpm", ["run", "gitflow:doctor"]));
const gitflowJson = parseJson(gitflow);
if (gitflowJson) {
  Object.assign(checks.at(-1), {
    branch: gitflowJson.branch,
    clean: gitflowJson.clean,
    local_trace_branch: gitflowJson.local_trace_branch,
    worktrees_ignored: gitflowJson.worktrees_ignored,
    ok: gitflow.ok && gitflowJson.worktrees_ignored === true,
  });
}

const motion = addCheck("motion_stack", run("pnpm", ["run", "motion:stack"]));
const motionJson = parseJson(motion);
if (motionJson) {
  Object.assign(checks.at(-1), {
    app: motionJson.appDir,
    package_manager: motionJson.likelyApp?.packageManager ?? null,
    feature_roots: motionJson.featureRoots ?? [],
  });
}

addCheck("slidev_cli", run("pnpm", ["run", "slidev:help"]), {
  available: Boolean(scripts["slidev:help"]),
});

addCheck("media_cli", run("pnpm", ["run", "media:help"]), {
  available: Boolean(scripts["media:help"]),
});

const ffmpeg = addCheck("ffmpeg", commandExists("ffmpeg"));
Object.assign(checks.at(-1), { path: firstLine(ffmpeg.stdout) || null });

const ffprobe = addCheck("ffprobe", commandExists("ffprobe"));
Object.assign(checks.at(-1), { path: firstLine(ffprobe.stdout) || null });

if (scripts["skills:check-sync"]) {
  addCheck("skills_sync", run("pnpm", ["run", "skills:check-sync"]));
} else {
  checks.push({
    name: "skills_sync",
    ok: null,
    skipped: true,
    reason: "package.json has no skills:check-sync script",
  });
}

const darwinQueue = addCheck("darwin_queue", run("pnpm", ["run", "darwin:queue"]));
const queueJson = parseJson(darwinQueue);
Object.assign(checks.at(-1), {
  candidates: queueJson?.total ?? countMarkdownFiles("evolution/skill-candidates"),
});

if (process.argv.includes("--verify")) {
  addCheck("verify", run("pnpm", ["run", "verify"]));
} else {
  checks.push({
    name: "verify",
    ok: null,
    skipped: true,
    reason: "run with --verify to include the full lint/compositions gate",
  });
}

const failures = checks.filter((check) => check.ok === false);
const warnings = [];

if (gitflowJson && gitflowJson.clean === false) {
  warnings.push("Working tree is dirty; isolate new non-trivial work in .worktrees/ or finish current changes first.");
}

if (!scripts["skills:check-sync"]) {
  warnings.push("skills:check-sync is unavailable in this checkout; project skill mirrors cannot be checked here.");
}

if (!ffmpeg.ok || !ffprobe.ok) {
  warnings.push("ffmpeg/ffprobe are not both available; media polish commands may fail.");
}

const summary = {
  ok: failures.length === 0,
  checked_at: new Date().toISOString(),
  checks,
  warnings,
};

console.log(JSON.stringify(summary, null, 2));
process.exit(failures.length === 0 ? 0 : 1);
