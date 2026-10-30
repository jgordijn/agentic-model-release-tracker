import assert from "node:assert/strict";
import test from "node:test";

import { IMPORTANT_MISSING_LABS, RELEASES } from "../src/modelData.js";

test("release dataset starts in 2022 and spans every year through 2026", () => {
  const years = [...new Set(RELEASES.map((release) => release.releaseDate.slice(0, 4)))].sort();
  assert.deepEqual(years, ["2022", "2023", "2024", "2025", "2026"]);
});

test("every release stores a maker or benchmark source URL", () => {
  for (const release of RELEASES) {
    assert.ok(release.sourceUrl.startsWith("http://") || release.sourceUrl.startsWith("https://"), release.model);
  }
});

test("Intelligence Index data is metric-specific, sourced, and null for unmatched families", () => {
  assert.equal(RELEASES.filter((release) => release.intelligenceIndex !== null).length, 54);
  for (const release of RELEASES) {
    assert.ok(Object.hasOwn(release, "intelligenceIndex"), release.model);
    if (release.intelligenceIndex === null) {
      assert.equal(release.intelligenceIndexSourceUrl, null, release.model);
      assert.equal(release.intelligenceIndexConfiguration, null, release.model);
      continue;
    }
    assert.equal(Number.isFinite(release.intelligenceIndex), true, release.model);
    assert.ok(release.intelligenceIndexSourceUrl.startsWith("https://artificialanalysis.ai/models/"), release.model);
    assert.equal(typeof release.intelligenceIndexConfiguration, "string");
  }

  const expected = {
    "GPT-6 Sol": [48, "max"],
    "Kimi K3.1 Pro": [55, "max"],
    "GPT-6 Luna": [37, "max"],
    "GPT-6 Astra": [53, "max"],
    "Claude Opus 5.5": [58, "max with fallback"],
    "Grok 4.7": [46, "xhigh"],
    "MiniCPM5-2B": [12, "default"],
    "Gemini 4 Argon": [53, "high"],
    "Ling 3.1 Flash": [41, "default"],
    "Ling 3.1 Flash 1019": [29, "default"],
    "Muse Wonder": [52, "max"],
    "Muse Wonder Full": [56, "max"],
    "Muse Spark Open": [39, "xhigh"],
    "Mistral Large 4": [26, "high"],
    "Nemotron 3.5 Super VL": [26, "default"],
    "Nemotron 3.5 Bolt 74B-A9B": [21, "default"],
  };
  for (const [model, [score, configuration]] of Object.entries(expected)) {
    const release = RELEASES.find((item) => item.model === model);
    assert.equal(release?.intelligenceIndex, score, model);
    assert.equal(release?.intelligenceIndexConfiguration, configuration, model);
    assert.ok(release?.intelligenceIndexSourceUrl.startsWith("https://artificialanalysis.ai/models/"), model);
  }
  assert.equal(RELEASES.find((release) => release.model === "GPT-6 Sol")?.codingIndex, null);
  assert.equal(RELEASES.find((release) => release.model === "GPT-5.6 Sol")?.codingIndex, 77.4);
});

test("source URLs do not contain accidental whitespace", () => {
  for (const release of RELEASES) {
    assert.equal(decodeURIComponent(release.sourceUrl), decodeURIComponent(release.sourceUrl).trim(), release.model);
  }
});

test("release model names are unique", () => {
  const models = RELEASES.map((release) => release.model);

  assert.equal(new Set(models).size, models.length);
});

test("October 30 refresh preserves the 165-row HEAD baseline and stays within cutoff", () => {
  assert.equal(RELEASES.length - 1, 165, "baseline row count before the October 30 refresh");
  assert.equal(RELEASES.length, 166);
  assert.equal(new Set(RELEASES.map((release) => release.model)).size, 166);
  assert.equal(Math.max(...RELEASES.map((release) => Date.parse(release.releaseDate))), Date.parse("2026-10-29"));
  assert.ok(RELEASES.every((release) => release.releaseDate <= "2026-10-30"), "no row is later than the research cutoff");
});

test("Ling 3.1 Flash is included as the September 30 InclusionAI agentic model release", () => {
  const ling = RELEASES.find((release) => release.model === "Ling 3.1 Flash");

  assert.ok(ling);
  assert.equal(ling.provider, "InclusionAI");
  assert.equal(ling.group, "Chinese+Other");
  assert.equal(ling.releaseDate, "2026-09-30");
  assert.equal(ling.releaseCategory, "base");
  assert.equal(ling.sourceType, "official");
  assert.deepEqual(ling.focus, ["agentic", "programming"]);
  assert.equal(ling.sourceUrl, "https://x.com/AntLingAGI/status/2105335205741596911");
  assert.deepEqual(ling.aliases, ["Ling-3.1-flash", "ling-3-1-flash", "inclusionai/ling-3.1-flash"]);
  assert.equal(ling.codingIndex, null);
  assert.equal(ling.scoreSourceUrl, undefined);
  assert.match(ling.notes, /2026-10-01/);
  assert.match(ling.notes, /no Coding Index field/i);
});

test("Claude Haiku 5.5 is included as the October 7 Anthropic agentic base release", () => {
  const haiku = RELEASES.find((release) => release.model === "Claude Haiku 5.5");

  assert.ok(haiku);
  assert.equal(haiku.provider, "Anthropic");
  assert.equal(haiku.group, "Frontier labs");
  assert.equal(haiku.releaseDate, "2026-10-07");
  assert.equal(haiku.releaseCategory, "base");
  assert.equal(haiku.sourceType, "official");
  assert.deepEqual(haiku.focus, ["agentic", "programming"]);
  assert.equal(haiku.sourceUrl, "https://www.anthropic.com/claude-haiku-5-5");
  assert.deepEqual(haiku.aliases, ["claude-haiku-5-5"]);
  assert.equal(haiku.codingIndex, null);
  assert.equal(haiku.scoreSourceUrl, undefined);
  assert.equal(haiku.intelligenceIndex, 43);
  assert.equal(haiku.intelligenceIndexConfiguration, "max");
  assert.equal(haiku.intelligenceIndexSourceUrl, "https://artificialanalysis.ai/models/claude-haiku-5-5");
  assert.match(haiku.notes, /subagent on coding work/i);
  assert.match(haiku.notes, /no exact Coding Index field/i);
  assert.match(haiku.notes, /2026-10-08/);
});

test("Agnes 3.0 Qwen is included as the October 10 Agnes agentic specialized-base release", () => {
  const agnes = RELEASES.find((release) => release.model === "Agnes 3.0 Qwen");

  assert.ok(agnes);
  assert.equal(agnes.provider, "Agnes AI");
  assert.equal(agnes.group, "Chinese+Other");
  assert.equal(agnes.releaseDate, "2026-10-10");
  assert.equal(agnes.releaseCategory, "specialized-base");
  assert.equal(agnes.sourceType, "official");
  assert.deepEqual(agnes.focus, ["agentic", "programming"]);
  assert.equal(agnes.sourceUrl, "https://huggingface.co/Agnes-AI/Agnes-3.0-Qwen");
  assert.deepEqual(agnes.aliases, ["agnes-3.0-qwen"]);
  assert.equal(agnes.codingIndex, null);
  assert.equal(agnes.scoreSourceUrl, undefined);
  assert.equal(agnes.intelligenceIndex, null);
  assert.match(agnes.notes, /release date of October 2026/);
  assert.match(agnes.notes, /createdAt marker is 2026-10-10T14:27:15Z/);
  assert.match(agnes.notes, /Qwen3\.8-Flash-Next/);
  assert.match(agnes.notes, /no exact Coding Index row/i);
});

test("Meta Muse Wonder models are included as distinct October 12 agentic coding base lines", () => {
  const expected = {
    "Muse Wonder": {
      aliases: ["muse-wonder-1.0"],
      intelligenceIndex: 52,
      sourceUrl: "https://research.meta.ai/blog/muse-wonder",
      intelligenceIndexSourceUrl: "https://artificialanalysis.ai/models/muse-wonder",
    },
    "Muse Wonder Full": {
      aliases: ["muse-wonder-full-1.0"],
      intelligenceIndex: 56,
      sourceUrl: "https://research.meta.ai/blog/muse-wonder",
      intelligenceIndexSourceUrl: "https://artificialanalysis.ai/models/muse-wonder-full",
    },
  };

  for (const [model, fields] of Object.entries(expected)) {
    const release = RELEASES.find((item) => item.model === model);

    assert.ok(release, model);
    assert.equal(release.provider, "Meta", model);
    assert.equal(release.group, "Chinese+Other", model);
    assert.equal(release.releaseDate, "2026-10-12", model);
    assert.equal(release.releaseCategory, "base", model);
    assert.equal(release.sourceType, "official", model);
    assert.deepEqual(release.focus, ["agentic", "programming"], model);
    assert.deepEqual(release.aliases, fields.aliases, model);
    assert.equal(release.codingIndex, null, model);
    assert.equal(release.scoreSourceUrl, undefined, model);
    assert.equal(release.intelligenceIndex, fields.intelligenceIndex, model);
    assert.equal(release.intelligenceIndexConfiguration, "max", model);
    assert.equal(release.sourceUrl, fields.sourceUrl, model);
    assert.equal(release.intelligenceIndexSourceUrl, fields.intelligenceIndexSourceUrl, model);
    assert.match(release.notes, /Coding Index field/i, model);
    assert.match(release.notes, /named Muse Wonder series|distinct/i, model);
  }
});

test("October 16 refresh adds Muse Spark Open and NVIDIA Nemotron base lines with metric-specific provenance", () => {
  const expected = {
    "Muse Spark Open": {
      provider: "Meta",
      releaseCategory: "base",
      sourceUrl: "https://dev.meta.ai/models/muse-spark-open",
      aliases: ["muse-spark-open", "meta-models/Muse-Spark-Open-816B-A42B"],
      intelligenceIndex: 39,
      intelligenceIndexConfiguration: "xhigh",
      intelligenceIndexSourceUrl: "https://artificialanalysis.ai/models/muse-spark-open",
    },
    "Nemotron 3.5 Super VL": {
      provider: "NVIDIA",
      releaseCategory: "base",
      sourceUrl: "https://huggingface.co/nvidia/NVIDIA-Nemotron-3.5-Super-VL-120B-A12B-BF16",
      aliases: ["nemotron-3.5-super-vl", "NVIDIA-Nemotron-3.5-Super-VL-120B-A12B-BF16"],
      intelligenceIndex: 26,
      intelligenceIndexConfiguration: "default",
      intelligenceIndexSourceUrl: "https://artificialanalysis.ai/models/nemotron-3-5-super-vl",
    },
    "Nemotron 3.5 Bolt 74B-A9B": {
      provider: "NVIDIA",
      releaseCategory: "specialized-base",
      sourceUrl: "https://huggingface.co/nvidia/NVIDIA-Nemotron-3.5-Bolt-74B-A9B-BF16",
      aliases: ["nemotron-3-5-bolt-74b-a9b", "NVIDIA-Nemotron-3.5-Bolt-74B-A9B-BF16"],
      intelligenceIndex: 21,
      intelligenceIndexConfiguration: "default",
      intelligenceIndexSourceUrl: "https://artificialanalysis.ai/models/nemotron-3-5-bolt-74b-a9b",
    },
  };

  for (const [model, fields] of Object.entries(expected)) {
    const release = RELEASES.find((item) => item.model === model);

    assert.ok(release, model);
    assert.equal(release.group, "Chinese+Other", model);
    assert.equal(release.releaseDate, "2026-10-15", model);
    assert.equal(release.sourceType, "official", model);
    assert.deepEqual(release.focus, ["agentic", "programming"], model);
    assert.equal(release.codingIndex, null, model);
    assert.equal(release.scoreSourceUrl, undefined, model);
    assert.match(release.notes, /no Coding Index field/i, model);
    for (const [field, value] of Object.entries(fields)) assert.deepEqual(release[field], value, `${model}: ${field}`);
  }

  const superModel = RELEASES.find((item) => item.model === "Nemotron 3.5 Super VL");
  const bolt = RELEASES.find((item) => item.model === "Nemotron 3.5 Bolt 74B-A9B");
  assert.match(superModel.notes, /NVFP4.*quantized deployment package/i);
  assert.match(bolt.notes, /24GB IQ2, GGUF, and LiLiCorr artifacts.*packaging/i);
});

test("October 18 refresh adds Tencent Hy-Memory and NVIDIA Dory with scope and score evidence limits", () => {
  const expected = {
    "Hy-Memory 30B-A3B": {
      provider: "Tencent",
      releaseDate: "2026-10-15",
      releaseCategory: "specialized-base",
      sourceUrl: "https://huggingface.co/tencent/Hy-Memory-30B-A3B",
      aliases: ["Hy-Memory-30B-A3B", "tencent/Hy-Memory-30B-A3B", "hy-memory"],
    },
    "Dory 1.0 4B": {
      provider: "NVIDIA",
      releaseDate: "2026-10-16",
      releaseCategory: "base",
      sourceUrl: "https://huggingface.co/nvidia/NVIDIA-Nemotron-Labs-Dory1.0-4B-BF16",
      aliases: ["Dory1.0-4B", "NVIDIA-Nemotron-Labs-Dory1.0-4B-BF16", "nvidia/NVIDIA-Nemotron-Labs-Dory1.0-4B-BF16"],
    },
  };

  for (const [model, fields] of Object.entries(expected)) {
    const release = RELEASES.find((item) => item.model === model);

    assert.ok(release, model);
    assert.equal(release.group, "Chinese+Other", model);
    assert.equal(release.sourceType, "official", model);
    assert.deepEqual(release.focus, ["agentic", "programming"], model);
    assert.equal(release.codingIndex, null, model);
    assert.equal(release.scoreSourceUrl, undefined, model);
    assert.equal(release.intelligenceIndex, null, model);
    for (const [field, value] of Object.entries(fields)) assert.deepEqual(release[field], value, `${model}: ${field}`);
  }

  const memory = RELEASES.find((item) => item.model === "Hy-Memory 30B-A3B");
  const dory = RELEASES.find((item) => item.model === "Dory 1.0 4B");
  assert.match(memory.notes, /Chat, Working, and Coding scenarios/);
  assert.match(memory.notes, /createdAt marker is 2026-10-15T09:52:00Z/);
  assert.match(memory.notes, /no exact Hy-Memory row/);
  assert.match(dory.notes, /Coding & Agentic evaluations/);
  assert.match(dory.notes, /MXFP8, NVFP4, and Q5_K_M/);
  assert.match(dory.notes, /candidate URL returned 404/);
  assert.match(dory.notes, /internal AA v4\.3\.2 estimate/);
});

test("OpenAI GPT-6 Sol and Luna are included as September 22 coding-agent releases", () => {
  for (const model of ["GPT-6 Sol", "GPT-6 Luna"]) {
    const rows = RELEASES.filter((release) => release.model === model);
    assert.equal(rows.length, 1, model);
    assert.equal(rows[0].provider, "OpenAI");
    assert.equal(rows[0].releaseDate, "2026-09-22");
    assert.equal(rows[0].codingIndex, null);
    assert.equal(rows[0].sourceUrl, "https://openai.com/index/introducing-gpt-6-sol-and-luna/");
    assert.deepEqual(rows[0].focus, ["agentic", "programming"]);
  }
});

test("every scored release stores a valid score source URL", () => {
  for (const release of RELEASES) {
    if (release.codingIndex === null) continue;

    assert.equal(Number.isFinite(release.codingIndex), true, release.model);
    assert.match(release.scoreSourceUrl, /^https?:\/\//, release.model);
    if (release.scoreSourceType === "secondary-mirror") {
      assert.equal(release.scoreConfiguration, "no effort suffix", release.model);
      assert.match(release.scoreSourceUrl, /^https:\/\/easy-benchmarks\.com\/models\//, release.model);
      assert.match(release.scoreAuthorityUrl, /^https:\/\/artificialanalysis\.ai\/models\//, release.model);
    }
  }
});

test("every release is classified as a base model or distinct specialized base line", () => {
  for (const release of RELEASES) {
    assert.ok(["base", "specialized-base"].includes(release.releaseCategory), release.model);
  }
});

test("Qwen rows are family-level and do not include size or distilled variants", () => {
  const qwenRows = RELEASES.filter((release) => release.provider === "Alibaba");

  for (const release of qwenRows) {
    assert.doesNotMatch(release.model, /\b\d+(?:\.\d+)?B\b|A\d+B|Distill/i, release.model);
  }
});

test("Gemini tier models are tracked as separate model lines", () => {
  const geminiModels = new Set(RELEASES.filter((release) => release.provider === "Google").map((release) => release.model));

  assert.ok(geminiModels.has("Gemini 1.5 Pro"));
  assert.ok(geminiModels.has("Gemini 1.5 Flash"));
  assert.ok(geminiModels.has("Gemini 2.0 Flash"));
  assert.ok(geminiModels.has("Gemini 2.5 Pro"));
  assert.ok(geminiModels.has("Gemini 2.5 Flash"));
  assert.ok(geminiModels.has("Gemini 3 Pro"));
  assert.ok(geminiModels.has("Gemini 3 Flash"));
  assert.ok(geminiModels.has("Gemini 3.5 Flash"));
  assert.ok(!geminiModels.has("Gemini 3"));
  assert.ok(!geminiModels.has("Gemini 3.5"));
  assert.ok(!geminiModels.has("Gemini 3.5 Pro"));
});

test("xAI releases cover base Grok generations and distinct coding lines", () => {
  const grokModels = new Set(RELEASES.filter((release) => release.provider === "xAI").map((release) => release.model));

  assert.deepEqual([...grokModels].sort(), [
    "Grok 1",
    "Grok 1.5",
    "Grok 2",
    "Grok 3",
    "Grok 4",
    "Grok 4 Fast",
    "Grok 4.1",
    "Grok 4.1 Fast",
    "Grok 4.20",
    "Grok 4.3",
    "Grok 4.5",
    "Grok 4.6",
    "Grok 4.7",
    "Grok Build 0.1",
    "Grok Code Fast 1",
  ]);
  assert.equal(RELEASES.find((release) => release.model === "Grok 4")?.codingIndex, 40.5);
  assert.equal(RELEASES.find((release) => release.model === "Grok 4.20")?.codingIndex, 42.2);
});

test("dataset does not include preview, mini, nano, spark, air, plus, lite, or speciale config rows as standalone releases", () => {
  const canonicalNamesContainingTierWords = new Set(["Grok Code Fast 1", "Muse Spark 1.3", "Muse Spark Open"]);

  for (const release of RELEASES) {
    if (canonicalNamesContainingTierWords.has(release.model)) continue;
    assert.doesNotMatch(release.model, /\b(Preview|mini|nano|Spark|Air|Plus|Lite|Speciale)\b/i, release.model);
  }
});

test("August 2026 preview, safety, and modality-only candidates remain excluded", () => {
  const models = new Set(RELEASES.map((release) => release.model));

  for (const excluded of [
    "HY4.0-Preview",
    "Hunyuan HY4.0 Preview",
    "DeepSeek V4 Flash Vision",
    "Qwen3.8-Flash-Next",
    "Shieldstral",
    "MiniMax Music 3.0",
    "Imagine Image 2.0",
  ]) {
    assert.equal(models.has(excluded), false, excluded);
  }
});

test("MiniMax M3 is tracked as the latest MiniMax base release", () => {
  const m3 = RELEASES.find((release) => release.model === "MiniMax M3");

  assert.equal(m3?.provider, "MiniMax");
  assert.equal(m3?.releaseDate, "2026-06-01");
  assert.equal(m3?.codingIndex, 58.6);
  assert.equal(m3?.scoreSourceUrl, "https://artificialanalysis.ai/models/minimax-m3");
  assert.match(m3?.sourceUrl, /minimax-m3/);
});

test("known February 5 2026 coding frontier releases are correct", () => {
  assert.equal(RELEASES.find((release) => release.model === "Claude Opus 4.6")?.releaseDate, "2026-02-05");
  assert.equal(RELEASES.find((release) => release.model === "GPT-5.3-Codex")?.releaseDate, "2026-02-05");
});

test("Claude Fable 5 carries the available Artificial Analysis coding score", () => {
  const fable = RELEASES.find((release) => release.model === "Claude Fable 5");

  assert.equal(fable?.codingIndex, 76.5);
  assert.match(fable?.scoreSourceUrl, /artificial_analysis_coding_index/);
});

test("July-August 2026 release refresh records verified scores and unknowns", () => {
  const expected = new Map([
    ["Leanstral 1.5", ["2026-07-02", null]],
    ["GPT-5.6 Sol", ["2026-07-09", 77.4]],
    ["GPT-5.6 Terra", ["2026-07-09", 76.7]],
    ["GPT-5.6 Luna", ["2026-07-09", 71.4]],
    ["Qwen3.7-Flash", ["2026-07-15", null]],
    ["Grok 4.5", ["2026-07-16", 72.4]],
    ["Gemini 3.6 Flash", ["2026-07-21", 69.2]],
    ["Gemini 3.5 Flash Cyber", ["2026-07-21", null]],
    ["Kimi K3", ["2026-07-22", 76.2]],
    ["Claude Opus 5", ["2026-07-24", 78.0]],
    ["DeepSeek V4 Flash", ["2026-07-31", 69.1]],
    ["Qwen3.8-Max", ["2026-08-02", 71.8]],
    ["Muse-Glimmer-30B", ["2026-08-09", 49.0]],
    ["Grok 4.6", ["2026-08-12", 76.8]],
    ["Gemini 3.7 Flash", ["2026-08-13", 76.1]],
    ["DeepSeek-V4-Pro-0813", ["2026-08-13", null]],
    ["NVIDIA-Nemotron-Labs-Teacher-Competition-Coding", ["2026-08-14", null]],
    ["UI-Mate", ["2026-08-16", null]],
    ["GLM-5.3", ["2026-08-18", 74.8]],
    ["GLM-5.3-Flash", ["2026-08-26", 71.5]],
    ["Qwen3.8-Flash", ["2026-08-26", 73.1]],
  ]);

  for (const [model, [releaseDate, codingIndex]] of expected) {
    const release = RELEASES.find((item) => item.model === model);

    assert.ok(release, model);
    assert.equal(release.releaseDate, releaseDate, model);
    assert.equal(release.codingIndex, codingIndex, model);
    assert.match(release.sourceUrl, /^https?:\/\//, model);
    if (codingIndex !== null) assert.match(release.scoreSourceUrl, /^https?:\/\//, model);
  }
});

test("new August 2026 rows preserve exact provider, category, and maker provenance", () => {
  const expected = {
    "Muse-Glimmer-30B": ["Meta", "base", "https://huggingface.co/meta-models/Muse-Glimmer-30B"],
    "Grok 4.6": ["xAI", "base", "https://x.ai/news/grok-4-6"],
    "Gemini 3.7 Flash": [
      "Google",
      "base",
      "https://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-gemini-3-7-flash/",
    ],
    "DeepSeek-V4-Pro-0813": ["DeepSeek", "base", "https://api-docs.deepseek.com/news/news260813"],
    "NVIDIA-Nemotron-Labs-Teacher-Competition-Coding": [
      "NVIDIA",
      "specialized-base",
      "https://huggingface.co/nvidia/NVIDIA-Nemotron-Labs-Teacher-Competition-Coding",
    ],
    "UI-Mate": ["Tencent", "specialized-base", "https://ui-mate.github.io/"],
    "GLM-5.3": ["Z.ai", "base", "https://docs.z.ai/guides/llm/glm-5.3"],
    "GLM-5.3-Flash": ["Z.ai", "base", "https://docs.z.ai/guides/vlm/glm-5.3-flash"],
    "Qwen3.8-Flash": ["Alibaba", "base", "https://www.qwencloud.com/models/qwen3.8-flash"],
  };

  for (const [model, [provider, releaseCategory, sourceUrl]] of Object.entries(expected)) {
    const releases = RELEASES.filter((release) => release.model === model);

    assert.equal(releases.length, 1, model);
    assert.equal(releases[0].provider, provider, model);
    assert.equal(releases[0].releaseCategory, releaseCategory, model);
    assert.equal(releases[0].sourceUrl, sourceUrl, model);
    assert.equal(releases[0].sourceType, "official", model);
  }
});

test("included Meta and Tencent providers are no longer marked missing", () => {
  assert.equal(IMPORTANT_MISSING_LABS.includes("Meta"), false);
  assert.equal(IMPORTANT_MISSING_LABS.includes("Tencent"), false);
});

test("the explicitly missing lab list remains unchanged", () => {
  assert.deepEqual(IMPORTANT_MISSING_LABS, ["Amazon", "Cohere", "StepFun", "AI21 Labs"]);
});

test("IFM is tracked as a newly discovered provider rather than a missing lab", () => {
  assert.equal(IMPORTANT_MISSING_LABS.includes("IFM"), false);
  assert.equal(RELEASES.find((release) => release.provider === "IFM")?.model, "K2 Horizon 375B A23B");
});

test("September 3 refresh records the five verified release decisions", () => {
  const expected = {
    "Apodex 1.1": {
      provider: "Apodex",
      group: "Chinese+Other",
      releaseDate: "2026-08-24",
      codingIndex: 60.8,
      releaseCategory: "base",
      sourceUrl: "https://www.apodex.com/blog/apodex-1.1-scaling-agentic-intelligence-for-complex-work",
      scoreSourceUrl: "https://artificialanalysis.ai/models/apodex-1-1",
    },
    ContextPilot: {
      provider: "Tencent",
      group: "Chinese+Other",
      releaseDate: "2026-08-30",
      codingIndex: null,
      releaseCategory: "specialized-base",
      sourceUrl: "https://github.com/Tencent/ContextPilot",
      scoreSourceUrl: undefined,
    },
    "Claude Fable 5.1": {
      provider: "Anthropic",
      group: "Frontier labs",
      releaseDate: "2026-09-01",
      codingIndex: 81.6,
      releaseCategory: "base",
      sourceUrl: "https://www.anthropic.com/claude-fable-and-mythos-5-1",
      scoreSourceUrl: "https://artificialanalysis.ai/models/claude-fable-5-1",
    },
    "Gemini 3.8 Flash": {
      provider: "Google",
      group: "Frontier labs",
      releaseDate: "2026-09-02",
      codingIndex: 76.3,
      releaseCategory: "base",
      sourceUrl: "https://ai.google.dev/gemini-api/docs/changelog",
      scoreSourceUrl: "https://artificialanalysis.ai/models/gemini-3-8-flash",
    },
    "Muse Spark 1.3": {
      provider: "Meta",
      group: "Chinese+Other",
      releaseDate: "2026-09-02",
      codingIndex: 76.5,
      releaseCategory: "base",
      sourceUrl: "https://research.meta.ai/blog/introducing-muse-spark-1-3",
      scoreSourceUrl: "https://artificialanalysis.ai/models/muse-spark-1-3-xhigh",
    },
  };

  for (const [model, fields] of Object.entries(expected)) {
    const rows = RELEASES.filter((release) => release.model === model);

    assert.equal(rows.length, 1, model);
    assert.equal(rows[0].sourceType, "official", model);
    for (const [field, value] of Object.entries(fields)) assert.equal(rows[0][field], value, `${model}: ${field}`);
  }
});

test("late September 3 refresh records Astra, Cyber, and K2 Horizon decisions", () => {
  const expected = {
    "Gemini 3.8 Flash Cyber": {
      provider: "Google",
      group: "Frontier labs",
      releaseDate: "2026-09-02",
      codingIndex: null,
      releaseCategory: "specialized-base",
      sourceUrl: "https://blog.google/innovation-and-ai/models-and-research/gemini-models/3-8-flash-and-3-8-flash-cyber/",
    },
    "GPT-6 Astra": {
      provider: "OpenAI",
      group: "Frontier labs",
      releaseDate: "2026-09-03",
      codingIndex: 76.9,
      releaseCategory: "base",
      sourceUrl: "https://openai.com/index/safety-overview-gpt-6-astra/",
      scoreSourceUrl: "https://artificialanalysis.ai/models/gpt-6-astra",
    },
    "K2 Horizon 375B A23B": {
      provider: "IFM",
      group: "Chinese+Other",
      releaseDate: "2026-09-03",
      codingIndex: 61.5,
      releaseCategory: "base",
      sourceUrl: "https://ifm.ai/k2/press-release/",
      scoreSourceUrl: "https://artificialanalysis.ai/models/k2-horizon-375b-a23b",
    },
  };

  for (const [model, fields] of Object.entries(expected)) {
    const rows = RELEASES.filter((release) => release.model === model);

    assert.equal(rows.length, 1, model);
    assert.equal(rows[0].sourceType, "official", model);
    for (const [field, value] of Object.entries(fields)) assert.equal(rows[0][field], value, `${model}: ${field}`);
  }
});

test("late September 3 AA scores retain exact configurations and evidence limits", () => {
  const astra = RELEASES.find((item) => item.model === "GPT-6 Astra");
  const k2 = RELEASES.find((item) => item.model === "K2 Horizon 375B A23B");
  const cyber = RELEASES.find((item) => item.model === "Gemini 3.8 Flash Cyber");

  assert.match(astra?.notes, /GPT-6 Astra \(max\)/);
  assert.match(astra?.notes, /76\.9433173810514/);
  assert.match(astra?.notes, /other effort\/configuration rows are not separate releases/);
  assert.match(k2?.notes, /375B-A23B identity/);
  assert.match(k2?.notes, /61\.5203218199473/);
  assert.match(cyber?.notes, /no exact Coding Index row/i);
  assert.equal(cyber?.scoreSourceUrl, undefined);
});

test("September 3 AA scores retain exact configurations and retrieval provenance", () => {
  const expected = {
    "Apodex 1.1": [60.8, "Apodex 1.1 (no effort suffix)"],
    "Claude Fable 5.1": [81.6, "Claude Fable 5.1 (Adaptive Reasoning, Max Effort, Default Fallback)"],
    "Gemini 3.8 Flash": [76.3, "Gemini 3.8 Flash (high)"],
    "Muse Spark 1.3": [76.5, "Muse Spark 1.3 (xhigh)"],
  };

  for (const [model, [codingIndex, configuration]] of Object.entries(expected)) {
    const release = RELEASES.find((item) => item.model === model);

    assert.equal(release?.codingIndex, codingIndex, model);
    assert.ok(release?.notes.includes(configuration), model);
    assert.ok(release?.notes.includes("2026-09-03"), model);
  }
});

test("September 3 family variants and excluded candidates are not duplicated", () => {
  const models = new Set(RELEASES.map((release) => release.model));
  const contextPilot = RELEASES.find((release) => release.model === "ContextPilot");

  assert.match(contextPilot?.notes, /8B, 14B, and E4B/);
  assert.match(contextPilot?.notes, /2026-09-03/);
  assert.match(contextPilot?.notes, /no exact AA Coding Index row/i);

  for (const excluded of [
    "Apodex 1.1 Mini",
    "ContextPilot-8B",
    "ContextPilot-14B",
    "ContextPilot-E4B",
    "Claude Mythos 5.1",
    "Gemini Omni Flash",
    "Gemini 3.5 Transcribe",
    "Gemini 3.5 Transcribe Live",
    "Muse Spark 1.3 (max)",
    "Qwen3.8-Max-0902",
  ]) {
    assert.equal(models.has(excluded), false, excluded);
  }
});

test("GPT-5.6 variant scores use exact Artificial Analysis max model rows", () => {
  const expected = {
    "GPT-5.6 Sol": [77.4, "https://artificialanalysis.ai/models/gpt-5-6-sol"],
    "GPT-5.6 Terra": [76.7, "https://artificialanalysis.ai/models/gpt-5-6-terra"],
    "GPT-5.6 Luna": [71.4, "https://artificialanalysis.ai/models/gpt-5-6-luna"],
  };

  for (const [model, [codingIndex, scoreSourceUrl]] of Object.entries(expected)) {
    const release = RELEASES.find((item) => item.model === model);

    assert.equal(release?.codingIndex, codingIndex, model);
    assert.equal(release?.scoreSourceUrl, scoreSourceUrl, model);
    assert.match(release?.notes, /max configuration/, model);
    assert.match(release?.notes, /2026-08-30/, model);
  }
});

test("refreshed AA Coding Index rows use the direct leaderboard and name the exact configuration", () => {
  const expected = {
    "Kimi K2.5": [46.8, "Kimi K2.5 (Reasoning)", "kimi-k2-5"],
    "MiniMax M2.7": [52.6, "MiniMax-M2.7 reasoning", "minimax-m2-7"],
    "GPT-5.4": [71.1, "GPT-5.4 (xhigh)", "gpt-5-4"],
    "GLM-5.1": [55.8, "GLM-5.1 (Reasoning)", "glm-5-1"],
    "Kimi K2.6": [61.8, "Kimi K2.6 reasoning", "kimi-k2-6"],
    "MiMo-V2.5-Pro": [60.2, "MiMo-V2.5-Pro reasoning", "mimo-v2-5-pro"],
    "Qwen3.7-Max": [66.0, "Qwen3.7 Max reasoning", "qwen3-7-max"],
    "MiniMax M3": [58.6, "MiniMax-M3 reasoning", "minimax-m3"],
    "NVIDIA Nemotron 3 Ultra 550B-A55B": [49.3, "Nemotron 3 Ultra 550B A55B (Reasoning)", "nvidia-nemotron-3-ultra-550b-a55b"],
    DiffusionGemma: [19.7, "DiffusionGemma 26B A4B reasoning", "diffusiongemma-26b-a4b"],
    "Qwen3.8-Max": [71.8, "Qwen3.8 Max reasoning", "qwen3-8-max"],
    "Muse-Glimmer-30B": [49.0, "Muse Glimmer (high)", "muse-glimmer"],
    "Grok 4.6": [76.8, "Grok 4.6 (high)", "grok-4-6"],
    "Gemini 3.7 Flash": [76.1, "Gemini 3.7 Flash (high)", "gemini-3-7-flash"],
    "GLM-5.3": [74.8, "GLM-5.3 (max)", "glm-5-3"],
    "GLM-5.3-Flash": [71.5, "GLM-5.3-Flash reasoning", "glm-5-3-flash"],
    "Qwen3.8-Flash": [73.1, "Qwen3.8-Flash-Next reasoning", "qwen3-8-flash-next"],
  };

  for (const [model, [codingIndex, configuration, scoreSlug]] of Object.entries(expected)) {
    const release = RELEASES.find((item) => item.model === model);

    assert.equal(release?.codingIndex, codingIndex, model);
    assert.equal(release?.scoreSourceUrl, `https://artificialanalysis.ai/models/${scoreSlug}`, model);
    assert.ok(release?.notes.includes(configuration), model);
    assert.ok(release?.notes.includes("2026-08-30"), model);
  }
});

test("Mistral Medium 3.5 carries the Artificial Analysis coding score", () => {
  const medium = RELEASES.find((release) => release.model === "Mistral Medium 3.5");

  assert.equal(medium?.provider, "Mistral");
  assert.equal(medium?.codingIndex, 46.9);
  assert.match(medium?.scoreSourceUrl, /artificial_analysis_coding_index/);
});

test("Cursor Composer model history is represented without AA scores", () => {
  const composerRows = RELEASES.filter((release) => release.provider === "Cursor");

  assert.deepEqual(
    composerRows.map((release) => [release.model, release.releaseDate, release.codingIndex]),
    [
      ["Composer 1", "2025-10-29", null],
      ["Composer 1.5", "2026-02-09", null],
      ["Composer 2", "2026-03-19", null],
      ["Composer 2.5", "2026-05-18", null],
    ],
  );
  assert.ok(composerRows.every((release) => release.releaseCategory === "specialized-base"));
});

test("frontier labs include pre-2025 releases for the requested chart range", () => {
  const frontierBefore2025 = RELEASES.filter(
    (release) => release.group === "Frontier labs" && release.releaseDate < "2025-01-01",
  );

  assert.ok(frontierBefore2025.length >= 10);
});

test("September 7 2026 OpenBMB release preserves scope, provenance, and exact AA evidence", () => {
  const release = RELEASES.find((item) => item.model === "MiniCPM5-2B");

  assert.ok(release);
  assert.equal(release.provider, "OpenBMB");
  assert.equal(release.group, "Chinese+Other");
  assert.equal(release.releaseDate, "2026-09-07");
  assert.equal(release.releaseCategory, "base");
  assert.equal(release.sourceType, "official");
  assert.equal(release.codingIndex, 14.5);
  assert.equal(release.sourceUrl, "https://github.com/OpenBMB/MiniCPM");
  assert.equal(release.scoreSourceUrl, "https://artificialanalysis.ai/leaderboards/models");
  assert.match(release.notes, /coding agents, tool-use workflows, and agentic tasks/);
  assert.match(release.notes, /reasoning, no effort suffix/);
  assert.match(release.notes, /14\.5005375225413/);
  assert.match(release.notes, /not an Intelligence Index substitution/);
});

test("OpenBMB is covered as a configured provider rather than an explicit missing lab", () => {
  assert.equal(IMPORTANT_MISSING_LABS.includes("OpenBMB"), false);
  assert.equal(RELEASES.filter((release) => release.provider === "OpenBMB").length, 1);
});

test("September 8 2026 Agnes AI release preserves scope, maker-date limitation, and unknown AA score", () => {
  const release = RELEASES.find((item) => item.model === "Agnes 3.0 Flash");

  assert.ok(release);
  assert.equal(release.provider, "Agnes AI");
  assert.equal(release.group, "Chinese+Other");
  assert.equal(release.releaseDate, "2026-09-08");
  assert.equal(release.releaseCategory, "base");
  assert.equal(release.sourceType, "official");
  assert.equal(release.codingIndex, null);
  assert.equal(release.sourceUrl, "https://www.agnes-ai.com/zh-Hans/docs/agnes-30-flash");
  assert.match(release.notes, /agent programming, tool-driven tasks/);
  assert.match(release.notes, /2026-09-08T07:30:32\.100Z/);
  assert.match(release.notes, /Agnes 3\.0 Flash \(reasoning, no effort suffix\)/);
  assert.match(release.notes, /score remains unknown/);
});

test("September 10 2026 DeepSeek release preserves official alias mapping and unknown AA score", () => {
  const release = RELEASES.find((item) => item.model === "DeepSeek V4.1 Flash");

  assert.ok(release);
  assert.equal(release.provider, "DeepSeek");
  assert.equal(release.group, "Chinese+Other");
  assert.equal(release.releaseDate, "2026-09-10");
  assert.equal(release.releaseCategory, "base");
  assert.equal(release.sourceType, "official");
  assert.equal(release.codingIndex, null);
  assert.equal(release.sourceUrl, "https://api-docs.deepseek.com/news/news260910");
  assert.match(release.notes, /deepseek-flash/);
  assert.match(release.notes, /Reasoning, Max Effort/);
  assert.match(release.notes, /maker Terminal-Bench\/other benchmark claims are not substitutes/);
  assert.match(release.notes, /score remains unknown/);
});

test("September 18 refresh preserves InclusionAI backfills, scope, and score evidence limits", () => {
  const expected = {
    "Ling-3.0-flash-Fin": {
      releaseDate: "2026-09-03",
      releaseCategory: "specialized-base",
      focus: ["agentic"],
      sourceUrl: "https://huggingface.co/inclusionAI/Ling-3.0-flash-Fin",
    },
    "LLaDA-UI": {
      releaseDate: "2026-09-09",
      releaseCategory: "specialized-base",
      focus: ["agentic"],
      sourceUrl: "https://www.inclusion-ai.org/LLaDA-UI/",
    },
  };

  for (const [model, fields] of Object.entries(expected)) {
    const release = RELEASES.find((item) => item.model === model);

    assert.ok(release, model);
    assert.equal(release.provider, "InclusionAI", model);
    assert.equal(release.group, "Chinese+Other", model);
    assert.equal(release.sourceType, "official", model);
    assert.equal(release.codingIndex, null, model);
    assert.equal(release.scoreSourceUrl, undefined, model);
    for (const [field, value] of Object.entries(fields)) assert.deepEqual(release[field], value, `${model}: ${field}`);
  }

  const finance = RELEASES.find((item) => item.model === "Ling-3.0-flash-Fin");
  const llada = RELEASES.find((item) => item.model === "LLaDA-UI");
  assert.match(finance.notes, /weights.*next week/i);
  assert.match(finance.notes, /createdAt marker is 2026-09-03T06:09:53Z/);
  assert.match(finance.notes, /no Coding Index field/i);
  assert.match(llada.notes, /2026-09-09T05:53:39Z/);
  assert.match(llada.notes, /direct candidate URL returned 404/);
  assert.match(llada.notes, /backfill one day before/);
});

test("September 4 2026 InclusionAI release preserves backfilled agentic scope and unknown AA score", () => {
  const release = RELEASES.find((item) => item.model === "Ling-3.0-flash-VL");

  assert.ok(release);
  assert.equal(release.provider, "InclusionAI");
  assert.equal(release.group, "Chinese+Other");
  assert.equal(release.releaseDate, "2026-09-04");
  assert.equal(release.releaseCategory, "specialized-base");
  assert.equal(release.sourceType, "official");
  assert.equal(release.codingIndex, null);
  assert.equal(release.sourceUrl, "https://x.com/AntLingAGI/status/2095935971556782372");
  assert.match(release.notes, /visual-agent capabilities/);
  assert.match(release.notes, /frontend coding/);
  assert.match(release.notes, /modality-only skip/);
  assert.match(release.notes, /no exact Coding Index field/);
});

test("Agnes AI is covered as a configured provider rather than an explicit missing lab", () => {
  assert.equal(IMPORTANT_MISSING_LABS.includes("Agnes AI"), false);
  assert.equal(RELEASES.filter((release) => release.provider === "Agnes AI").length, 2);
  assert.ok(RELEASES.some((release) => release.model === "Agnes 3.0 Qwen"));
});

test("September 21-22 refresh adds only verified base releases with unknown exact AA Coding scores", () => {
  const expected = {
    "Grok 4.7": {
      provider: "xAI",
      releaseDate: "2026-09-21",
      releaseCategory: "base",
      sourceUrl: "https://x.ai/news/grok-4-7",
      focus: ["agentic", "programming"],
    },
    "Claude Opus 5.5": {
      provider: "Anthropic",
      releaseDate: "2026-09-22",
      releaseCategory: "base",
      sourceUrl: "https://www.anthropic.com/claude-opus-5-5",
      focus: ["agentic", "programming"],
    },
    "MiMo-V2.6-Pro": {
      provider: "Xiaomi",
      releaseDate: "2026-09-22",
      releaseCategory: "base",
      sourceUrl: "https://mimo.xiaomi.com/mimo-v2-6",
      focus: ["agentic", "programming"],
    },
  };

  for (const [model, fields] of Object.entries(expected)) {
    const rows = RELEASES.filter((release) => release.model === model);

    assert.equal(rows.length, 1, model);
    const release = rows[0];
    assert.equal(release.sourceType, "official", model);
    assert.equal(release.codingIndex, null, model);
    assert.equal(release.scoreSourceUrl, undefined, model);
    for (const [field, value] of Object.entries(fields)) assert.deepEqual(release[field], value, `${model}: ${field}`);
    assert.match(release.notes, /no exact Coding Index field/);
    assert.match(release.notes, /Easy Benchmarks mirror snapshot retrieved 2026-09-23/);
    assert.match(release.notes, /score remains unknown/);
  }
});

test("September 21-22 scope decisions exclude Xiaomi serving and non-Pro variants", () => {
  const models = new Set(RELEASES.map((release) => release.model));

  for (const excluded of ["MiMo-V2.6-Flash", "MiMo-V2.6-Pro-UltraSpeed", "Grok 4.7 (high)", "Grok 4.7 (xhigh)"]) {
    assert.equal(models.has(excluded), false, excluded);
  }
});

test("continued September 29-October 1 refresh preserves new provider scope and score provenance", () => {
  const expected = {
    "Trinity-Large-Thinking": ["Arcee AI", "2026-04-01", "specialized-base", null],
    "LongCat 2.0": ["LongCat", "2026-06-29", "base", 45.3],
    Inkling: ["Thinking Machines", "2026-07-15", "base", null],
    "Granite 4.2 3B": ["IBM Granite", "2026-08-25", "base", 17.5],
    "Granite 4.2 8B": ["IBM Granite", "2026-08-25", "base", 22.4],
    "Granite 4.2 30B": ["IBM Granite", "2026-08-25", "base", 29.9],
    "Celeris-1 Magnus": ["Celeris", "2026-08-31", "specialized-base", null],
    "Mercury 2.5": ["Inception", "2026-09-08", "base", null],
    "Claude Sonnet 5.5": ["Anthropic", "2026-09-28", "base", null],
    "GPT-6.1 Sol": ["OpenAI", "2026-09-29", "base", null],
    "Gemini 4 Argon": ["Google", "2026-09-30", "base", null],
  };

  for (const [model, [provider, releaseDate, releaseCategory, codingIndex]] of Object.entries(expected)) {
    const release = RELEASES.find((item) => item.model === model);

    assert.ok(release, model);
    assert.equal(release.provider, provider, model);
    assert.equal(release.releaseDate, releaseDate, model);
    assert.equal(release.releaseCategory, releaseCategory, model);
    assert.equal(release.sourceType, "official", model);
    assert.equal(release.codingIndex, codingIndex, model);
    assert.match(release.sourceUrl, /^https?:\/\//, model);
    if (codingIndex === null) {
      assert.equal(release.scoreSourceUrl, undefined, model);
      assert.match(release.notes, /score remains unknown|no exact Coding Index|codingIndex remains null/i, model);
    } else {
      assert.match(release.scoreSourceUrl, /^https:\/\/easy-benchmarks\.com\/models\//, model);
      assert.match(release.scoreAuthorityUrl, /^https:\/\/artificialanalysis\.ai\/models\//, model);
      assert.equal(release.scoreConfiguration, "no effort suffix", model);
      assert.equal(release.scoreSourceType, "secondary-mirror", model);
      assert.match(release.notes, /Easy Benchmarks.*secondary extraction evidence/i, model);
    }
  }

  const gpt = RELEASES.find((item) => item.model === "GPT-6.1 Sol");
  assert.equal(gpt?.intelligenceIndex, 52);
  assert.equal(gpt?.intelligenceIndexConfiguration, "max");
  assert.equal(gpt?.intelligenceIndexSourceUrl, "https://artificialanalysis.ai/models/gpt-6-1-sol");
  assert.match(gpt?.notes, /2026-09-29/);
  assert.match(gpt?.notes, /effort configurations are not separate release rows/);

  const argon = RELEASES.find((item) => item.model === "Gemini 4 Argon");
  assert.equal(argon?.intelligenceIndex, 53);
  assert.equal(argon?.intelligenceIndexConfiguration, "high");
  assert.equal(argon?.intelligenceIndexSourceUrl, "https://artificialanalysis.ai/models/gemini-4-argon");
  assert.equal(argon?.sourceUrl, "https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-4-argon/");
  assert.match(argon?.notes, /Fairwind Program/);
  assert.match(argon?.notes, /Coding n\/a/);
  assert.match(argon?.notes, /high effort configuration is not a separate release row/);
});

test("October 20 refresh adds the verified DeepSeek, MiniMax, and Inception model lines", () => {
  const expected = {
    "DeepSeek V4.1 Flash 1017": {
      provider: "DeepSeek",
      releaseDate: "2026-10-17",
      sourceUrl: "https://api-docs.deepseek.com/news/news261017",
      aliases: ["DeepSeek-V4.1-Flash-1017", "deepseek-v4.1-flash-1017"],
      intelligenceIndex: 45,
      intelligenceIndexConfiguration: "max",
      intelligenceIndexSourceUrl: "https://artificialanalysis.ai/models/deepseek-v4-1-flash-1017",
    },
    "MiniMax M3.1 Flash": {
      provider: "MiniMax",
      releaseDate: "2026-10-19",
      sourceUrl: "https://www.minimax.io/blog/minimax-m31f",
      aliases: ["MiniMax-M3.1-Flash", "minimax-m3.1-flash"],
      intelligenceIndex: 43,
      intelligenceIndexConfiguration: "reasoning",
      intelligenceIndexSourceUrl: "https://artificialanalysis.ai/models/minimax-m3-1-flash",
    },
    "Mercury 3": {
      provider: "Inception",
      releaseDate: "2026-10-19",
      sourceUrl: "https://inceptionlabs.ai/blog/introducing-mercury-3",
      aliases: ["mercury-3"],
      intelligenceIndex: null,
      intelligenceIndexConfiguration: null,
      intelligenceIndexSourceUrl: null,
    },
  };

  for (const [model, fields] of Object.entries(expected)) {
    const release = RELEASES.find((item) => item.model === model);

    assert.ok(release, model);
    assert.equal(release.group, "Chinese+Other", model);
    assert.equal(release.releaseCategory, "base", model);
    assert.equal(release.sourceType, "official", model);
    assert.deepEqual(release.focus, ["agentic", "programming"], model);
    assert.equal(release.codingIndex, null, model);
    assert.equal(release.scoreSourceUrl, undefined, model);
    for (const [field, value] of Object.entries(fields)) assert.deepEqual(release[field], value, `${model}: ${field}`);
  }

  assert.match(RELEASES.find((item) => item.model === "DeepSeek V4.1 Flash 1017").notes, /substantive minor model update.*pure snapshot/i);
  assert.match(RELEASES.find((item) => item.model === "MiniMax M3.1 Flash").notes, /distinct model line.*no exact Coding Index/i);
  assert.match(RELEASES.find((item) => item.model === "Mercury 3").notes, /live flagship.*no exact Artificial Analysis Mercury 3 model/i);
});

test("October 23 refresh adds Ling Sante as an official specialized agentic base line with unknown Coding Index", () => {
  const sante = RELEASES.find((release) => release.model === "Ling-3.0-flash-Sante");

  assert.ok(sante);
  assert.equal(sante.provider, "InclusionAI");
  assert.equal(sante.group, "Chinese+Other");
  assert.equal(sante.releaseDate, "2026-10-19");
  assert.equal(sante.releaseCategory, "specialized-base");
  assert.equal(sante.sourceType, "official");
  assert.deepEqual(sante.focus, ["agentic"]);
  assert.equal(sante.sourceUrl, "https://huggingface.co/inclusionAI/Ling-3.0-flash-Sante");
  assert.deepEqual(sante.aliases, ["Ling-3.0-flash-Sante", "ling-3-0-flash-sante", "inclusionAI/Ling-3.0-flash-Sante"]);
  assert.equal(sante.codingIndex, null);
  assert.equal(sante.scoreSourceUrl, undefined);
  assert.equal(sante.intelligenceIndex, null);
  assert.match(sante.notes, /healthcare-specialized model.*tool-assisted workflows.*multi-agent collaboration/i);
  assert.match(sante.notes, /createdAt marker is 2026-10-19T17:30:04Z/);
  assert.match(sante.notes, /candidate pages returned 404/i);
  assert.match(sante.notes, /codingIndex remains null/i);
});

test("October 24 correction adds Jais 3 after the prior IFM access-limited omission", () => {
  const jais = RELEASES.find((release) => release.model === "Jais 3");

  assert.ok(jais);
  assert.equal(jais.provider, "IFM");
  assert.equal(jais.group, "Chinese+Other");
  assert.equal(jais.releaseDate, "2026-10-15");
  assert.equal(jais.releaseCategory, "specialized-base");
  assert.equal(jais.sourceType, "official");
  assert.deepEqual(jais.focus, ["agentic", "programming"]);
  assert.equal(jais.sourceUrl, "https://ifm.ai/jais3/press-release/");
  assert.deepEqual(jais.aliases, ["Jais-3", "IFM/Jais-3-375B-A23B", "inception42/Jais-3-375B-A23B"]);
  assert.equal(jais.codingIndex, null);
  assert.equal(jais.scoreSourceUrl, undefined);
  assert.equal(jais.intelligenceIndex, null);
  assert.match(jais.notes, /2026-10-15 press release/);
  assert.match(jais.notes, /Arabic-specialized foundation-model family.*tool use.*agentic workflows.*coding/i);
  assert.match(jais.notes, /six size variants.*collapsed into one family row/i);
  assert.match(jais.notes, /candidate model URL returned 404/i);
  assert.match(jais.notes, /earlier no-add decision.*superseded/i);

  const models = new Set(RELEASES.map((release) => release.model));
  for (const excluded of [
    "Jais 3 0.9B",
    "Jais 3 3.7B",
    "Jais 3 7B",
    "Jais 3 32B",
    "Jais 3 36B-A4B",
    "Jais 3 375B-A23B",
    "Jais Speech",
    "Jais-ASR",
  ]) assert.equal(models.has(excluded), false, excluded);
});

test("October 25 refresh adds Kimi K3.1 Pro as the Moonshot agentic coding base release", () => {
  const kimi = RELEASES.find((release) => release.model === "Kimi K3.1 Pro");

  assert.ok(kimi);
  assert.equal(kimi.provider, "Moonshot.ai");
  assert.equal(kimi.group, "Chinese+Other");
  assert.equal(kimi.releaseDate, "2026-10-24");
  assert.equal(kimi.releaseCategory, "base");
  assert.equal(kimi.sourceType, "official");
  assert.deepEqual(kimi.focus, ["agentic", "programming"]);
  assert.equal(kimi.sourceUrl, "https://www.kimi.ai/blog/kimi-k3-1-pro");
  assert.deepEqual(kimi.aliases, ["kimi-k3.1-pro", "kimi-k3.1-pro-highspeed"]);
  assert.equal(kimi.codingIndex, null);
  assert.equal(kimi.scoreSourceUrl, undefined);
  assert.equal(kimi.intelligenceIndex, 55);
  assert.equal(kimi.intelligenceIndexConfiguration, "max");
  assert.equal(kimi.intelligenceIndexSourceUrl, "https://artificialanalysis.ai/models/kimi-k3-1-pro");
  assert.match(kimi.notes, /first K3\.1 model.*coding and agentic-capability improvements/i);
  assert.match(kimi.notes, /Highspeed.*same model's speed variant.*rather than a separate release row/i);
  assert.match(kimi.notes, /no exact Coding Index field/i);
  assert.match(kimi.notes, /Easy Benchmarks.*Model Not Found/i);
});

test("October 27 refresh adds GPT-6.1 Terra with separate Intelligence Index provenance", () => {
  const terra = RELEASES.find((release) => release.model === "GPT-6.1 Terra");

  assert.ok(terra);
  assert.equal(terra.provider, "OpenAI");
  assert.equal(terra.group, "Frontier labs");
  assert.equal(terra.releaseDate, "2026-10-26");
  assert.equal(terra.releaseCategory, "base");
  assert.equal(terra.sourceType, "official");
  assert.deepEqual(terra.focus, ["agentic", "programming"]);
  assert.equal(terra.sourceUrl, "https://openai.com/index/introducing-gpt-6-1-terra/");
  assert.deepEqual(terra.aliases, ["gpt-6.1-terra"]);
  assert.equal(terra.codingIndex, null);
  assert.equal(terra.scoreSourceUrl, undefined);
  assert.equal(terra.intelligenceIndex, 48);
  assert.equal(terra.intelligenceIndexConfiguration, "max");
  assert.equal(terra.intelligenceIndexSourceUrl, "https://artificialanalysis.ai/models/gpt-6-1-terra");
  assert.match(terra.notes, /2026-10-26 release/);
  assert.match(terra.notes, /no exact Coding Index field/i);
  assert.match(terra.notes, /Model Not Found/i);
});

test("October 27 refresh adds InclusionAI LBS-27B as an agentic specialized-base line with unknown Coding Index", () => {
  const lbs = RELEASES.find((release) => release.model === "LBS-27B");

  assert.ok(lbs);
  assert.equal(lbs.provider, "InclusionAI");
  assert.equal(lbs.group, "Chinese+Other");
  assert.equal(lbs.releaseDate, "2026-10-26");
  assert.equal(lbs.releaseCategory, "specialized-base");
  assert.equal(lbs.sourceType, "official");
  assert.deepEqual(lbs.focus, ["agentic"]);
  assert.equal(lbs.sourceUrl, "https://huggingface.co/inclusionAI/LBS-27B");
  assert.deepEqual(lbs.aliases, ["LBS-27B", "inclusionAI/LBS-27B"]);
  assert.equal(lbs.codingIndex, null);
  assert.equal(lbs.scoreSourceUrl, undefined);
  assert.equal(lbs.intelligenceIndex, null);
  assert.match(lbs.notes, /agentic vision-language model.*GUI grounding/i);
  assert.match(lbs.notes, /UI-Venus LBS project/);
  assert.match(lbs.notes, /training-recipe\/project commit dated 2026-10-20/);
  assert.match(lbs.notes, /createdAt marker is 2026-10-26T05:36:52Z/);
  assert.match(lbs.notes, /Artificial Analysis returned 404/i);
  assert.match(lbs.notes, /codingIndex remains null/i);
});

test("October 28 refresh adds Ling 3.1 Flash 1019 as a substantive InclusionAI agentic model update", () => {
  const ling = RELEASES.find((release) => release.model === "Ling 3.1 Flash 1019");

  assert.ok(ling);
  assert.equal(ling.provider, "InclusionAI");
  assert.equal(ling.group, "Chinese+Other");
  assert.equal(ling.releaseDate, "2026-10-27");
  assert.equal(ling.releaseCategory, "base");
  assert.equal(ling.sourceType, "official");
  assert.deepEqual(ling.focus, ["agentic", "programming"]);
  assert.equal(ling.sourceUrl, "https://x.com/AntLingAGI/status/2115062200687878157");
  assert.deepEqual(ling.aliases, ["Ling-3.1-flash-1019", "ling-3-1-flash-1019", "inclusionAI/Ling-3.1-flash-1019"]);
  assert.equal(ling.codingIndex, null);
  assert.equal(ling.scoreSourceUrl, undefined);
  assert.equal(ling.intelligenceIndex, 29);
  assert.equal(ling.intelligenceIndexConfiguration, "default");
  assert.equal(ling.intelligenceIndexSourceUrl, "https://artificialanalysis.ai/models/ling-3-1-flash-1019");
  assert.match(ling.notes, /upgraded version.*post-training improvements.*agentic/i);
  assert.match(ling.notes, /not a pure snapshot/i);
  assert.match(ling.notes, /2026-10-22.*introduces/i);
  assert.match(ling.notes, /2026-10-27.*now open source/i);
  assert.match(ling.notes, /createdAt marker is 2026-10-27T05:46:51Z/);
  assert.match(ling.notes, /catalog releaseDate 2026-10-22/);
  assert.match(ling.notes, /no Coding Index field/i);
  assert.match(ling.notes, /Model Not Found/i);
});

test("October 30 refresh adds Mistral Large 4 after the open-weight release", () => {
  const mistral = RELEASES.find((release) => release.model === "Mistral Large 4");

  assert.ok(mistral);
  assert.equal(mistral.provider, "Mistral");
  assert.equal(mistral.group, "Chinese+Other");
  assert.equal(mistral.releaseDate, "2026-10-29");
  assert.equal(mistral.releaseCategory, "base");
  assert.equal(mistral.sourceType, "official");
  assert.deepEqual(mistral.focus, ["agentic", "programming"]);
  assert.equal(mistral.sourceUrl, "https://mistral.ai/news/mistral-large-4-oss/");
  assert.deepEqual(mistral.aliases, ["mistral-large-4", "mistral-large-4-0", "mistralai/Mistral-Large-4-1T-A52B", "Le Chonk"]);
  assert.equal(mistral.codingIndex, null);
  assert.equal(mistral.scoreSourceUrl, undefined);
  assert.equal(mistral.intelligenceIndex, 26);
  assert.equal(mistral.intelligenceIndexConfiguration, "high");
  assert.equal(mistral.intelligenceIndexSourceUrl, "https://artificialanalysis.ai/models/mistral-large-4");
  assert.match(mistral.notes, /2026-10-29 release.*open weights/i);
  assert.match(mistral.notes, /2026-10-06 public-preview/i);
  assert.match(mistral.notes, /substantive base-model release/i);
  assert.match(mistral.notes, /Intelligence Index 26.*stored separately/i);
  assert.match(mistral.notes, /Coding Agent Index.*not substituted/i);
  assert.match(mistral.notes, /no exact dashboard Coding Index field/i);
});
