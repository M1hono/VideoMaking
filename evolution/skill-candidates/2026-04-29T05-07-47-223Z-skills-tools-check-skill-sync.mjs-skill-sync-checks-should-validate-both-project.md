# Skill Evolution Candidate

- Target: tools/check-skill-sync.mjs
- Domain: skills
- Status: candidate
- Source: development-session
- Trigger: -
- Evidence: Extended skills:check-sync to parse skills-lock.json and skills:list, then verified huashu-nuwa and all perspective skills report Codex support.
- Promote to: tools/check-skill-sync.mjs
- Created: 2026-04-29T05:07:47.224Z

## Lesson

Skill sync checks should validate both project-maintained Claude/Codex pairs and locked external universal skills with Codex support, so external Nuwa/persona skills cannot drift into Claude-only installs.

## Suggested Darwin Round

1. Baseline score the target:
   `pnpm run darwin:score -- tools/check-skill-sync.mjs`
2. Improve one weak dimension using this candidate.
3. Verify with command output, rendered evidence, or user feedback.
4. Re-score and log:
   `pnpm run darwin:log -- --target tools/check-skill-sync.mjs --old <score> --new <score> --status keep --dimension learning_capture --note "Promoted skills-tools-check-skill-sync.mjs-skill-sync-checks-should-validate-both-project"`
