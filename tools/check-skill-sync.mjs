#!/usr/bin/env node

import { readdirSync, statSync } from "node:fs";
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

if (missing.length > 0) {
  console.error(missing.join("\n"));
  process.exit(1);
}

console.log("Skill sync OK:", REQUIRED_SHARED_SKILLS.join(", "));
