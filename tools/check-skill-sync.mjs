#!/usr/bin/env node

import { readdirSync, statSync } from "node:fs";
import { readFileSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { join } from "node:path";

const REQUIRED_SHARED_SKILLS = [
  "copy-design-planner",
  "git-delivery-workflow",
  "nuwa-text-refiner",
  "screenshot-intake",
  "slidev-rich-media",
];

function projectSkills(root) {
  return new Set(
    readdirSync(root, { withFileTypes: true })
      .filter((entry) => entry.isDirectory())
      .filter((entry) => {
        try {
          return statSync(join(root, entry.name, "SKILL.md")).isFile();
        } catch {
          return false;
        }
      })
      .map((entry) => entry.name),
  );
}

const codex = projectSkills(".codex/skills");
const claude = projectSkills(".claude/skills");

const missing = [];
for (const name of REQUIRED_SHARED_SKILLS) {
  if (!codex.has(name)) missing.push(`missing Codex skill: ${name}`);
  if (!claude.has(name)) missing.push(`missing Claude skill: ${name}`);
}

function parseJsonArray(output) {
  const start = output.indexOf("[");
  const end = output.lastIndexOf("]");
  if (start === -1 || end === -1 || end <= start) {
    throw new Error("skills:list did not return a JSON array");
  }
  return JSON.parse(output.slice(start, end + 1));
}

const lock = JSON.parse(readFileSync("skills-lock.json", "utf8"));
const lockedExternalSkills = Object.keys(lock.skills ?? {});
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

if (missing.length > 0) {
  console.error(missing.join("\n"));
  process.exit(1);
}

console.log("Skill sync OK:", REQUIRED_SHARED_SKILLS.join(", "));
console.log("External skills available to Codex:", lockedExternalSkills.join(", "));
