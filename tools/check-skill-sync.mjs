#!/usr/bin/env node

import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import { join } from "node:path";

const root = process.cwd();
const args = new Set(process.argv.slice(2));
const designOnly = args.has("--design");

const REQUIRED_SHARED_SKILLS = [
  "copy-design-planner",
  "git-delivery-workflow",
  "nuwa-text-refiner",
  "screenshot-intake",
  "slidev-rich-media",
  "popular-web-designs",
  "awesome-design-md",
];

const CODEX_ONLY_SKILLS = [
  "create-vibe-motion",
  "darwin-motion-evolver",
];

const DESIGN_HASHED_PAIRS = [
  "popular-web-designs",
  "awesome-design-md",
];

function projectSkills(dir) {
  return new Set(
    readdirSync(dir, { withFileTypes: true })
      .filter((entry) => entry.isDirectory())
      .filter((entry) => {
        try {
          return statSync(join(dir, entry.name, "SKILL.md")).isFile();
        } catch {
          return false;
        }
      })
      .map((entry) => entry.name),
  );
}

function sha(path) {
  return createHash("sha256").update(readFileSync(path)).digest("hex");
}

function parseJsonArray(output) {
  const start = output.indexOf("[");
  const end = output.lastIndexOf("]");
  if (start === -1 || end === -1 || end <= start) {
    throw new Error("skills:list did not return a JSON array");
  }
  return JSON.parse(output.slice(start, end + 1));
}

const codex = projectSkills(join(root, ".codex", "skills"));
const claude = projectSkills(join(root, ".claude", "skills"));
const missing = [];

for (const name of REQUIRED_SHARED_SKILLS) {
  if (!codex.has(name)) missing.push(`missing Codex skill: ${name}`);
  if (!claude.has(name)) missing.push(`missing Claude skill: ${name}`);
}

if (!designOnly) {
  for (const name of CODEX_ONLY_SKILLS) {
    if (!codex.has(name)) missing.push(`missing Codex-only skill: ${name}`);
  }
}

for (const name of DESIGN_HASHED_PAIRS) {
  const codexPath = join(root, ".codex", "skills", name, "SKILL.md");
  const claudePath = join(root, ".claude", "skills", name, "SKILL.md");
  if (existsSync(codexPath) && existsSync(claudePath) && sha(codexPath) !== sha(claudePath)) {
    missing.push(`design skill mirror differs between Codex and Claude: ${name}`);
  }
}

let lockedExternalSkills = [];
if (!designOnly) {
  const lock = JSON.parse(readFileSync(join(root, "skills-lock.json"), "utf8"));
  lockedExternalSkills = Object.keys(lock.skills ?? {});
  const skillsListResult = spawnSync("npx", ["skills", "list", "--json"], {
    encoding: "utf8",
  });

  if (skillsListResult.status !== 0) {
    console.error(skillsListResult.stderr || skillsListResult.stdout);
    process.exit(skillsListResult.status ?? 1);
  }

  const installed = parseJsonArray(
    `${skillsListResult.stdout ?? ""}\n${skillsListResult.stderr ?? ""}`,
  );
  const installedByName = new Map(installed.map((skill) => [skill.name, skill]));

  for (const name of lockedExternalSkills) {
    const skill = installedByName.get(name);
    if (!skill) {
      missing.push(`locked external skill is not installed: ${name}`);
      continue;
    }

    if (!skill.agents?.includes("Codex")) {
      missing.push(`locked external skill is not available to Codex: ${name}`);
    }

    if (!skill.path?.includes("/.agents/skills/")) {
      missing.push(`locked external skill should be installed through universal .agents/skills: ${name}`);
    }
  }
}

if (missing.length > 0) {
  console.error(missing.join("\n"));
  process.exit(1);
}

if (designOnly) {
  console.log("Design skill sync OK:", DESIGN_HASHED_PAIRS.join(", "));
} else {
  console.log("Skill sync OK:", REQUIRED_SHARED_SKILLS.join(", "));
  console.log("External skills available to Codex:", lockedExternalSkills.join(", "));
}
