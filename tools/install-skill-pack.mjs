#!/usr/bin/env node

import { spawnSync } from "node:child_process";

const perspectivePack = [
  ["paul-graham-skill", "创业/写作/产品/人生哲学"],
  ["zhang-yiming-skill", "产品/组织/全球化/人才"],
  ["karpathy-skill", "AI/工程/教育/开源"],
  ["ilya-sutskever-skill", "AI安全/scaling/研究品味"],
  ["mrbeast-skill", "内容创造/YouTube方法论"],
  ["trump-skill", "谈判/权力/传播/行为预判"],
  ["steve-jobs-skill", "产品/设计/战略"],
  ["elon-musk-skill", "工程/成本/第一性原理"],
  ["munger-skill", "投资/多元思维/逆向思考"],
  ["feynman-skill", "学习/教学/科学思维"],
  ["naval-skill", "财富/杠杆/人生哲学"],
  ["taleb-skill", "风险/反脆弱/不确定性"],
];

const optionalEducationPack = [
  ["zhangxuefeng-skill", "教育/职业规划/阶层流动"],
];

const command = process.argv[2] ?? "help";
const includeOptional = process.argv.includes("--include-optional");

function runSkillsAdd(source, args = []) {
  const result = spawnSync("npx", ["skills", "add", source, "--yes", ...args], {
    stdio: "inherit",
  });

  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

function installPack(pack) {
  for (const [repo, domain] of pack) {
    console.log(`\n== installing ${repo} (${domain}) ==`);
    runSkillsAdd(`alchaincyf/${repo}`);
  }
}

if (command === "personas") {
  installPack(perspectivePack);
  if (includeOptional) {
    installPack(optionalEducationPack);
  }
} else if (command === "darwin-global") {
  runSkillsAdd("alchaincyf/darwin-skill", ["--global"]);
} else if (command === "all") {
  runSkillsAdd("alchaincyf/darwin-skill", ["--global"]);
  installPack(perspectivePack);
  if (includeOptional) {
    installPack(optionalEducationPack);
  }
} else {
  console.log(`Usage:
  pnpm run skills:add:darwin:global
  pnpm run skills:add:personas
  node tools/install-skill-pack.mjs personas --include-optional

Default persona pack excludes narrow education/career-planning personas such as zhangxuefeng-skill.`);
}
