#!/usr/bin/env node
import { existsSync, mkdirSync } from "node:fs";
import { basename, dirname, extname, join, resolve } from "node:path";
import { spawnSync } from "node:child_process";

const args = process.argv.slice(2);

const help = `Usage:
  pnpm run media:inspect -- <input>
  pnpm run media:trim -- <input> <output> --start 00:00:01 --end 00:00:04
  pnpm run media:mp4 -- <input> <output> [--crf 18]
  pnpm run media:gif -- <input> <output.gif> [--fps 18] [--width 720]
  pnpm run media:frames -- <input> <output-dir> [--fps 1]
  pnpm run media:still -- <input> <output.png> [--time 00:00:01]
  pnpm run media:thumbs -- <input> <output.png> [--cols 4] [--rows 3] [--width 1280]

Outputs are intended for local polish. Commit final media only when it is intentionally small enough for git.`;

const fail = (message) => {
  console.error(message);
  console.error("");
  console.error(help);
  process.exit(1);
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

const requireTool = (name) => {
  const result = spawnSync("which", [name], { encoding: "utf8" });
  if (result.status !== 0) {
    fail(`Missing required tool: ${name}`);
  }
};

const ensureInput = (path) => {
  if (!path || !existsSync(path)) {
    fail(`Input file not found: ${path ?? "(missing)"}`);
  }
};

const ensureParent = (path) => {
  const parent = dirname(resolve(path));
  mkdirSync(parent, { recursive: true });
};

const run = (command, commandArgs) => {
  console.log([command, ...commandArgs].join(" "));
  const result = spawnSync(command, commandArgs, { stdio: "inherit" });
  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
};

const parsePositiveNumber = (value, fallback) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
};

const command = args[0];
if (!command || command === "help" || command === "--help" || command === "-h") {
  console.log(help);
  process.exit(0);
}

const { positional, options } = parseOptions(args.slice(1));

switch (command) {
  case "inspect": {
    const [input] = positional;
    requireTool("ffprobe");
    ensureInput(input);
    run("ffprobe", [
      "-hide_banner",
      "-show_format",
      "-show_streams",
      "-print_format",
      "json",
      input,
    ]);
    break;
  }

  case "trim": {
    const [input, output] = positional;
    requireTool("ffmpeg");
    ensureInput(input);
    if (!output) {
      fail("Missing output path for trim.");
    }
    ensureParent(output);

    const start = String(options.start ?? "00:00:00");
    const end = options.end ? ["-to", String(options.end)] : [];
    run("ffmpeg", [
      "-hide_banner",
      "-y",
      "-ss",
      start,
      ...end,
      "-i",
      input,
      "-map",
      "0",
      "-c",
      "copy",
      output,
    ]);
    break;
  }

  case "mp4": {
    const [input, output] = positional;
    requireTool("ffmpeg");
    ensureInput(input);
    if (!output) {
      fail("Missing output path for mp4.");
    }
    ensureParent(output);
    const crf = String(parsePositiveNumber(options.crf, 18));
    run("ffmpeg", [
      "-hide_banner",
      "-y",
      "-i",
      input,
      "-c:v",
      "libx264",
      "-preset",
      "slow",
      "-crf",
      crf,
      "-pix_fmt",
      "yuv420p",
      "-movflags",
      "+faststart",
      "-c:a",
      "aac",
      "-b:a",
      "192k",
      output,
    ]);
    break;
  }

  case "gif": {
    const [input, output] = positional;
    requireTool("ffmpeg");
    ensureInput(input);
    if (!output) {
      fail("Missing output path for gif.");
    }
    ensureParent(output);
    const fps = parsePositiveNumber(options.fps, 18);
    const width = parsePositiveNumber(options.width, 720);
    const palette = join(dirname(resolve(output)), `${basename(output, extname(output))}.palette.png`);
    const filter = `fps=${fps},scale=${width}:-1:flags=lanczos`;
    run("ffmpeg", [
      "-hide_banner",
      "-y",
      "-i",
      input,
      "-vf",
      `${filter},palettegen`,
      "-frames:v",
      "1",
      "-update",
      "1",
      palette,
    ]);
    run("ffmpeg", [
      "-hide_banner",
      "-y",
      "-i",
      input,
      "-i",
      palette,
      "-lavfi",
      `${filter} [x]; [x][1:v] paletteuse=dither=bayer:bayer_scale=3`,
      output,
    ]);
    break;
  }

  case "frames": {
    const [input, outputDir] = positional;
    requireTool("ffmpeg");
    ensureInput(input);
    if (!outputDir) {
      fail("Missing output directory for frames.");
    }
    mkdirSync(outputDir, { recursive: true });
    const fps = parsePositiveNumber(options.fps, 1);
    run("ffmpeg", [
      "-hide_banner",
      "-y",
      "-i",
      input,
      "-vf",
      `fps=${fps}`,
      join(outputDir, "frame_%04d.png"),
    ]);
    break;
  }

  case "still": {
    const [input, output] = positional;
    requireTool("ffmpeg");
    ensureInput(input);
    if (!output) {
      fail("Missing output path for still.");
    }
    ensureParent(output);
    const time = String(options.time ?? "00:00:01");
    run("ffmpeg", [
      "-hide_banner",
      "-y",
      "-ss",
      time,
      "-i",
      input,
      "-frames:v",
      "1",
      "-update",
      "1",
      output,
    ]);
    break;
  }

  case "thumbs": {
    const [input, output] = positional;
    requireTool("ffmpeg");
    ensureInput(input);
    if (!output) {
      fail("Missing output path for thumbs.");
    }
    ensureParent(output);
    const cols = Math.max(1, Math.round(parsePositiveNumber(options.cols, 4)));
    const rows = Math.max(1, Math.round(parsePositiveNumber(options.rows, 3)));
    const width = Math.round(parsePositiveNumber(options.width, 1280));
    run("ffmpeg", [
      "-hide_banner",
      "-y",
      "-i",
      input,
      "-vf",
      `select=not(mod(n\\,30)),scale=${Math.floor(width / cols)}:-1,tile=${cols}x${rows}`,
      "-frames:v",
      "1",
      output,
    ]);
    break;
  }

  default:
    fail(`Unknown command: ${command}`);
}
