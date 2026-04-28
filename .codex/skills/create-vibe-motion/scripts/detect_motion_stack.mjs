#!/usr/bin/env node
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative, resolve } from "node:path";

const root = resolve(process.argv[2] ?? process.cwd());
const ignoreDirs = new Set([".git", "node_modules", "dist", "build", "out"]);
const maxDepth = 4;

const packageJsonPaths = [];
const scaffoldMarkers = [];
const featureRoots = [];

const walk = (dir, depth = 0) => {
  if (depth > maxDepth) {
    return;
  }

  let entries = [];
  try {
    entries = readdirSync(dir, { withFileTypes: true });
  } catch {
    return;
  }

  for (const entry of entries) {
    if (entry.isDirectory()) {
      if (ignoreDirs.has(entry.name)) {
        continue;
      }
      const path = join(dir, entry.name);
      const rel = relative(root, path);
      if (entry.name === "features" && rel.includes("shared")) {
        featureRoots.push(rel);
      }
      walk(path, depth + 1);
      continue;
    }

    if (!entry.isFile()) {
      continue;
    }

    const path = join(dir, entry.name);
    const rel = relative(root, path);
    if (entry.name === "package.json") {
      packageJsonPaths.push(rel);
    }
    if (rel.endsWith("shared/scaffold/README.md")) {
      scaffoldMarkers.push(rel);
    }
  }
};

const readJson = (path) => {
  try {
    return JSON.parse(readFileSync(path, "utf8"));
  } catch {
    return null;
  }
};

walk(root);

const packages = packageJsonPaths
  .map((relPath) => {
    const absPath = join(root, relPath);
    const pkg = readJson(absPath);
    if (!pkg) {
      return null;
    }

    const deps = {
      ...(pkg.dependencies ?? {}),
      ...(pkg.devDependencies ?? {}),
      ...(pkg.peerDependencies ?? {}),
    };

    const has = (name) => Object.prototype.hasOwnProperty.call(deps, name);
    const scripts = Object.keys(pkg.scripts ?? {});

    return {
      path: relPath,
      name: pkg.name ?? null,
      packageManager: pkg.packageManager ?? null,
      scripts,
      engines: {
        remotion: has("remotion") || has("@remotion/cli"),
        react: has("react"),
        vite: has("vite"),
        gsap: has("gsap"),
        three: has("three"),
        reactThreeFiber: has("@react-three/fiber"),
        motion: has("motion") || has("framer-motion"),
        lottie: has("lottie-web") || has("@lottiefiles/dotlottie-web"),
        rive: Object.keys(deps).some((name) => name.startsWith("@rive-app/")),
        d3: has("d3") || Object.keys(deps).some((name) => name.startsWith("d3-")),
        pixi: has("pixi.js"),
      },
    };
  })
  .filter(Boolean);

const likelyApp =
  packages.find((pkg) => pkg.name === "vibe-motion-app") ??
  packages.find((pkg) => pkg.engines.remotion) ??
  packages[0] ??
  null;

const appDir = likelyApp ? relative(root, resolve(root, likelyApp.path, "..")) || "." : null;
const pnpmLock = appDir ? join(root, appDir, "pnpm-lock.yaml") : join(root, "pnpm-lock.yaml");

const result = {
  root,
  likelyApp,
  appDir,
  packageJsonPaths,
  scaffoldMarkers,
  featureRoots,
  packageManagerHints: {
    pnpmLock: existsSync(pnpmLock),
    nodeModules:
      appDir && existsSync(join(root, appDir, "node_modules"))
        ? statSync(join(root, appDir, "node_modules")).isDirectory()
        : false,
  },
};

console.log(JSON.stringify(result, null, 2));
