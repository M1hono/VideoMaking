#!/usr/bin/env node
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();

async function loadLocalEnv(filePath) {
    try {
        const content = await readFile(filePath, "utf8");
        for (const line of content.split(/\r?\n/)) {
            const trimmed = line.trim();
            if (!trimmed || trimmed.startsWith("#") || !trimmed.includes("="))
                continue;
            const [rawKey, ...rawValueParts] = trimmed.split("=");
            const key = rawKey.trim();
            if (process.env[key]) continue;
            let value = rawValueParts.join("=").trim();
            if (
                (value.startsWith('"') && value.endsWith('"')) ||
                (value.startsWith("'") && value.endsWith("'"))
            ) {
                value = value.slice(1, -1);
            }
            process.env[key] = value;
        }
    } catch (error) {
        if (error.code !== "ENOENT") throw error;
    }
}

function argValue(name, fallback) {
    const prefix = `--${name}=`;
    const hit = process.argv.find((arg) => arg.startsWith(prefix));
    return hit ? hit.slice(prefix.length) : fallback;
}

function hasFlag(name) {
    return process.argv.includes(`--${name}`);
}

function parseVoiceMix(value) {
    if (!value) return undefined;

    const weights = value
        .split(",")
        .map((item) => {
            const [voiceId, rawWeight] = item.split(":");
            const weight = Number(rawWeight);
            if (!voiceId || !Number.isFinite(weight)) {
                throw new Error(
                    `Invalid --mix item: ${item}. Expected voice_id:weight`
                );
            }
            return { voice_id: voiceId.trim(), weight };
        })
        .filter((item) => item.voice_id);

    if (weights.length === 0 || weights.length > 4) {
        throw new Error("--mix requires 1 to 4 voice_id:weight entries");
    }

    return weights;
}

async function resolveText() {
    const textFile = argValue("text-file");
    if (textFile) {
        return readFile(path.resolve(root, textFile), "utf8");
    }

    return argValue(
        "text",
        "这是一段用于测试视频旁白节奏的默认文本。先确认语速、音色和停顿，再进入正式录制。"
    );
}

await loadLocalEnv(path.join(root, ".env"));
await loadLocalEnv(path.join(root, ".env.local"));

const profile = argValue(
    "profile",
    process.env.MINIMAX_TTS_PROFILE || "cn"
).toLowerCase();
const isAudioProfile = ["audio", "token", "token-plan"].includes(profile);
const isEnProfile = profile === "en" || isAudioProfile;

function profileEnv(name, fallback) {
    if (isAudioProfile) {
        const audioKey = `MINIMAX_AUDIO_${name}`;
        if (process.env[audioKey]) return process.env[audioKey];
    }
    if (isEnProfile) {
        const enKey = `MINIMAX_EN_${name}`;
        if (process.env[enKey]) return process.env[enKey];
    }
    return process.env[`MINIMAX_${name}`] || fallback;
}

const keyEnv = argValue("key-env");
let apiKeySource = keyEnv;
let apiKey = keyEnv ? process.env[keyEnv] : undefined;
if (!apiKey) {
    if (isAudioProfile) {
        apiKeySource = process.env.MINIMAX_AUDIO_KEY
            ? "MINIMAX_AUDIO_KEY"
            : process.env.MINIMAX_TOKEN_API_KEY
              ? "MINIMAX_TOKEN_API_KEY"
              : "MINIMAX_EN_API_KEY";
        apiKey =
            process.env.MINIMAX_AUDIO_KEY ||
            process.env.MINIMAX_TOKEN_API_KEY ||
            process.env.MINIMAX_EN_API_KEY;
    } else if (isEnProfile) {
        apiKeySource = "MINIMAX_EN_API_KEY";
        apiKey = process.env.MINIMAX_EN_API_KEY;
    } else {
        apiKeySource = "MINIMAX_API_KEY";
        apiKey = process.env.MINIMAX_API_KEY;
    }
}
if (!apiKey) {
    console.error(`Missing ${apiKeySource}. Put it in .env or .env.local.`);
    process.exit(1);
}

const text = await resolveText();
const endpoint = argValue(
    "endpoint",
    profileEnv(
        "TTS_ENDPOINT",
        isEnProfile
            ? "https://api.minimax.io/v1/t2a_v2"
            : "https://api.minimaxi.com/v1/t2a_v2"
    )
);
const model = argValue("model", profileEnv("TTS_MODEL", "speech-2.8-hd"));
const voiceId = argValue(
    "voice",
    profileEnv(
        "TTS_VOICE_ID",
        process.env.MINIMAX_TTS_VOICE_ID || "Chinese (Mandarin)_Warm_Girl"
    )
);
const timbreWeights = parseVoiceMix(argValue("mix", profileEnv("TTS_MIX")));
const speed = Number(argValue("speed", profileEnv("TTS_SPEED", "1.12")));
const pitch = Number(argValue("pitch", profileEnv("TTS_PITCH", "0")));
const emotion = argValue("emotion", profileEnv("TTS_EMOTION"));
const languageBoost = argValue(
    "language",
    profileEnv("TTS_LANGUAGE", "Chinese")
);
const outDir = argValue("out-dir", "renders/drafts");
const outName = argValue("out", "minimax-voice.mp3");
const outputPath = path.join(root, outDir, outName);

const payload = {
    model,
    text: text.trim(),
    stream: false,
    language_boost: languageBoost,
    voice_setting: {
        voice_id: voiceId,
        speed,
        vol: Number(profileEnv("TTS_VOLUME", "1")),
        pitch,
        ...(emotion ? { emotion } : {})
    },
    ...(timbreWeights ? { timbre_weights: timbreWeights } : {}),
    audio_setting: {
        sample_rate: Number(profileEnv("TTS_SAMPLE_RATE", "32000")),
        bitrate: Number(profileEnv("TTS_BITRATE", "128000")),
        format: "mp3",
        channel: 1
    },
    subtitle_enable: !hasFlag("no-subtitle"),
    output_format: "hex"
};

const response = await fetch(endpoint, {
    method: "POST",
    headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
});

const bodyText = await response.text();
let body;
try {
    body = JSON.parse(bodyText);
} catch (error) {
    console.error(
        JSON.stringify({
            http_status: response.status,
            parse_error: error.message
        })
    );
    process.exit(1);
}

const baseResp = body.base_resp || {};
const summary = {
    http_status: response.status,
    status_code: baseResp.status_code,
    status_msg: baseResp.status_msg,
    trace_id: body.trace_id,
    profile,
    endpoint,
    api_key_source: apiKeySource,
    voice_id: voiceId,
    timbre_weights: timbreWeights,
    model,
    speed,
    pitch,
    emotion,
    language_boost: languageBoost,
    text_characters: text.trim().length,
    extra_info: body.extra_info
        ? {
              audio_length: body.extra_info.audio_length,
              audio_size: body.extra_info.audio_size,
              usage_characters: body.extra_info.usage_characters,
              audio_format: body.extra_info.audio_format,
              audio_sample_rate: body.extra_info.audio_sample_rate
          }
        : undefined,
    has_audio: Boolean(body.data?.audio),
    has_subtitle: Boolean(body.data?.subtitle_file)
};

console.log(JSON.stringify(summary, null, 2));

if (!body.data?.audio) {
    process.exit(response.ok && baseResp.status_code === 0 ? 0 : 1);
}

await mkdir(path.dirname(outputPath), { recursive: true });
await writeFile(outputPath, Buffer.from(body.data.audio, "hex"));
console.log(`saved=${path.relative(root, outputPath)}`);
