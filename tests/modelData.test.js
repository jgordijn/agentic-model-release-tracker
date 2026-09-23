import assert from "node:assert/strict";
import test from "node:test";

import { IMPORTANT_MISSING_LABS, RELEASES } from "../src/modelData.js";

test("release dataset starts in 2022 and spans every year through 2026", () => {
  const years = [...new Set(RELEASES.map((release) => release.releaseDate.slice(0, 4)))].sort();
  assert.deepEqual(years, ["2022", "2023", "2024", "2025", "2026"]);
});

test("every release stores a maker or benchmark source URL", () => {
  for (const release of RELEASES) {
    assert.match(release.sourceUrl, /^https?:\/\//, release.model);
  }
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

test("September 23 refresh preserves the 130-row baseline, adds three unique rows, and stays within cutoff", () => {
  assert.equal(RELEASES.length - 3, 130, "baseline row count before the September 21-22 refresh");
  assert.equal(RELEASES.length, 133);
  assert.equal(new Set(RELEASES.map((release) => release.model)).size, 133);
  assert.equal(Math.max(...RELEASES.map((release) => Date.parse(release.releaseDate))), Date.parse("2026-09-22"));
  assert.ok(RELEASES.every((release) => release.releaseDate <= "2026-09-23"), "no row is later than the research cutoff");
});

test("every scored release stores a valid score source URL", () => {
  for (const release of RELEASES) {
    if (release.codingIndex === null) continue;

    assert.equal(Number.isFinite(release.codingIndex), true, release.model);
    assert.match(release.scoreSourceUrl, /^https?:\/\//, release.model);
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
  const canonicalNamesContainingTierWords = new Set(["Grok Code Fast 1", "Muse Spark 1.3"]);

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
  assert.equal(RELEASES.filter((release) => release.provider === "Agnes AI").length, 1);
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
