#!/usr/bin/env node
import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { spawnSync } from "node:child_process";

const args = process.argv.slice(2);

const help = `Usage:
  pnpm run gitflow:doctor
  pnpm run gitflow:list
  pnpm run gitflow:start -- <area> <slug> [--base main] [--from origin/main]
  pnpm run gitflow:checkpoint -- --all "message"
  pnpm run gitflow:ready -- [--base main] [--no-verify]
  pnpm run gitflow:promote -- <feature|fix|docs|chore|motion|media|skill> <slug>
  pnpm run gitflow:publish -- [--base main] --yes

Local branches named wip/* or exp/* are trace branches and must not be pushed. Publish only clean delivery branches after verification.`;

const localPrefixes = ["wip/", "exp/"];
const protectedBranches = ["main", "master"];
const deliveryKinds = new Set(["feature", "fix", "docs", "chore", "motion", "media", "skill"]);

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

const fail = (message) => {
  console.error(message);
  console.error("");
  console.error(help);
  process.exit(1);
};

const run = (command, commandArgs, options = {}) => {
  const result = spawnSync(command, commandArgs, {
    encoding: "utf8",
    stdio: options.inherit ? "inherit" : "pipe",
    cwd: options.cwd,
  });

  if (options.allowFailure) {
    return result;
  }

  if (result.status !== 0) {
    const output = [result.stdout, result.stderr].filter(Boolean).join("").trim();
    throw new Error(output || `${command} ${commandArgs.join(" ")} failed`);
  }

  return result;
};

const git = (commandArgs, options = {}) => run("git", commandArgs, options);

const gitOutput = (commandArgs, options = {}) => git(commandArgs, options).stdout.trim();

const repoRoot = () => gitOutput(["rev-parse", "--show-toplevel"]);

const branchName = () => gitOutput(["branch", "--show-current"]);

const statusShort = () => gitOutput(["status", "--short"]);

const isDirty = () => statusShort().length > 0;

const isLocalTraceBranch = (branch) => localPrefixes.some((prefix) => branch.startsWith(prefix));

const isProtectedBranch = (branch) => protectedBranches.includes(branch);

const slugify = (value) =>
  String(value ?? "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9._/-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/\/+/g, "/");

const pathSlug = (branch) => branch.replace(/[^a-zA-Z0-9._-]+/g, "-");

const refExists = (ref) => git(["rev-parse", "--verify", "--quiet", ref], { allowFailure: true }).status === 0;

const ignored = (path) => git(["check-ignore", "-q", path], { allowFailure: true }).status === 0;

const worktreesIgnored = () => ignored(".worktrees/") || ignored(".worktrees/example");

const assertInsideRepo = () => {
  git(["rev-parse", "--is-inside-work-tree"]);
};

const baseRef = (base) => {
  if (refExists(base)) {
    return base;
  }
  const originRef = `origin/${base}`;
  if (refExists(originRef)) {
    return originRef;
  }
  fail(`Base ref not found: ${base}. Run git fetch or pass --base with an existing ref.`);
};

const assertClean = () => {
  const status = statusShort();
  if (status) {
    fail(`Working tree is not clean:\n${status}`);
  }
};

const assertNotProtected = (branch) => {
  if (isProtectedBranch(branch)) {
    fail(`Refusing this operation on protected branch: ${branch}`);
  }
};

const assertBaseAncestor = (base) => {
  const checkedBase = baseRef(base);
  const result = git(["merge-base", "--is-ancestor", checkedBase, "HEAD"], { allowFailure: true });
  if (result.status !== 0) {
    fail(`Branch is not based on ${checkedBase}. Rebase or merge ${checkedBase} before delivery.`);
  }
  return checkedBase;
};

const runVerify = (options) => {
  if (options["no-verify"] || options.verify === "false") {
    console.log("Verification skipped by option.");
    return;
  }
  run("pnpm", ["run", "verify"], { inherit: true });
};

const printDoctor = () => {
  const root = repoRoot();
  const branch = branchName();
  const status = statusShort();
  const remote = git(["remote", "-v"], { allowFailure: true }).stdout.trim() || "(none)";
  const upstream = git(["rev-parse", "--abbrev-ref", "--symbolic-full-name", "@{u}"], {
    allowFailure: true,
  }).stdout.trim();
  const ignoredWorktrees = worktreesIgnored();

  console.log(JSON.stringify(
    {
      root,
      branch,
      protected_branch: isProtectedBranch(branch),
      local_trace_branch: isLocalTraceBranch(branch),
      clean: status.length === 0,
      worktrees_ignored: ignoredWorktrees,
      upstream: upstream || null,
      remotes: remote.split("\n"),
    },
    null,
    2
  ));
};

const listWork = () => {
  console.log("Worktrees:");
  run("git", ["worktree", "list"], { inherit: true });

  console.log("\nLocal trace branches:");
  run("git", ["for-each-ref", "--format=%(refname:short)", "refs/heads/wip", "refs/heads/exp"], {
    inherit: true,
  });

  console.log("\nDelivery branches:");
  run("git", [
    "for-each-ref",
    "--format=%(refname:short)",
    ...[...deliveryKinds].map((kind) => `refs/heads/${kind}`),
  ], { inherit: true });
};

const startWorktree = (positional, options) => {
  const [areaValue, slugValue] = positional;
  const area = slugify(areaValue);
  const slug = slugify(slugValue);
  if (!area || !slug) {
    fail("Missing area or slug. Example: pnpm run gitflow:start -- docs git-development-workflow");
  }
  if (!worktreesIgnored()) {
    fail(".worktrees/ is not ignored. Add it to .gitignore before creating project-local worktrees.");
  }

  const branch = area === "experiment" || area === "exp" ? `exp/${slug}` : `wip/${area}/${slug}`;
  if (refExists(`refs/heads/${branch}`)) {
    fail(`Branch already exists: ${branch}`);
  }

  const base = options.from ? String(options.from) : baseRef(String(options.base ?? "main"));
  const path = `.worktrees/${pathSlug(branch)}`;
  if (existsSync(resolve(path))) {
    fail(`Worktree path already exists: ${path}`);
  }

  run("git", ["worktree", "add", path, "-b", branch, base], { inherit: true });
  console.log("");
  console.log(`Worktree ready: ${path}`);
  console.log(`Branch: ${branch}`);
  console.log("Next:");
  console.log(`  cd ${path}`);
  console.log("  pnpm install");
  console.log("  pnpm run verify");
};

const checkpoint = (positional, options) => {
  const branch = branchName();
  assertNotProtected(branch);
  if (!isLocalTraceBranch(branch) && !options["allow-delivery-branch"]) {
    fail(`Checkpoint commits are intended for wip/* or exp/* branches, not ${branch}.`);
  }

  const message = positional.join(" ").trim();
  if (!message) {
    fail("Missing checkpoint message.");
  }
  if (!isDirty()) {
    console.log("No changes to checkpoint.");
    return;
  }
  if (!options.all) {
    fail("Review and stage changes yourself, or pass --all after inspecting git diff.");
  }

  run("git", ["add", "-A"], { inherit: true });
  run("git", ["commit", "-m", `chore(checkpoint): ${message}`], { inherit: true });
};

const ready = (options) => {
  const branch = branchName();
  assertNotProtected(branch);
  assertClean();
  const checkedBase = assertBaseAncestor(String(options.base ?? "main"));
  runVerify(options);

  console.log("");
  console.log("Ready gate passed.");
  console.log(`Branch: ${branch}`);
  console.log(`Base: ${checkedBase}`);
  if (isLocalTraceBranch(branch)) {
    console.log("This is still a local trace branch. Promote it before publishing.");
  }
};

const promote = (positional) => {
  const [kindValue, slugValue] = positional;
  const kind = slugify(kindValue);
  const slug = slugify(slugValue);
  if (!deliveryKinds.has(kind)) {
    fail(`Invalid delivery branch kind: ${kindValue}`);
  }
  if (!slug) {
    fail("Missing delivery slug.");
  }

  const branch = branchName();
  assertNotProtected(branch);
  assertClean();
  if (!isLocalTraceBranch(branch)) {
    fail(`Promote from wip/* or exp/* only. Current branch: ${branch}`);
  }

  const nextBranch = `${kind}/${slug}`;
  if (refExists(`refs/heads/${nextBranch}`)) {
    fail(`Branch already exists: ${nextBranch}`);
  }
  run("git", ["branch", "-m", nextBranch], { inherit: true });
  console.log(`Promoted ${branch} -> ${nextBranch}`);
  console.log("Run pnpm run gitflow:ready before publishing.");
};

const publish = (options) => {
  const branch = branchName();
  assertNotProtected(branch);
  if (isLocalTraceBranch(branch)) {
    fail(`Refusing to push local trace branch: ${branch}`);
  }
  ready(options);
  if (!options.yes) {
    fail("Publish is gated. Re-run with --yes to push after reviewing the ready output.");
  }
  run("git", ["push", "-u", "origin", branch], { inherit: true });
};

const command = args[0];

try {
  assertInsideRepo();

  if (!command || command === "help" || command === "--help" || command === "-h") {
    console.log(help);
    process.exit(0);
  }

  const { positional, options } = parseOptions(args.slice(1));

  switch (command) {
    case "doctor":
      printDoctor();
      break;
    case "list":
      listWork();
      break;
    case "start":
      startWorktree(positional, options);
      break;
    case "checkpoint":
      checkpoint(positional, options);
      break;
    case "ready":
      ready(options);
      break;
    case "promote":
      promote(positional);
      break;
    case "publish":
      publish(options);
      break;
    default:
      fail(`Unknown command: ${command}`);
  }
} catch (error) {
  fail(error.message);
}
