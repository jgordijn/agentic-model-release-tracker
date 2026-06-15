import assert from "node:assert/strict";
import test from "node:test";

import { RELEASES } from "../src/modelData.js";

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
    "Grok Code Fast 1",
  ]);
  assert.equal(RELEASES.find((release) => release.model === "Grok 4")?.codingIndex, 40.5);
  assert.equal(RELEASES.find((release) => release.model === "Grok 4.20")?.codingIndex, 42.2);
});

test("dataset does not include preview, mini, nano, spark, air, plus, lite, or speciale config rows as standalone releases", () => {
  for (const release of RELEASES) {
    if (release.model === "Grok Code Fast 1") continue;
    assert.doesNotMatch(release.model, /\b(Preview|mini|nano|Spark|Air|Plus|Lite|Speciale)\b/i, release.model);
  }
});

test("MiniMax M3 is tracked as the latest MiniMax base release", () => {
  const m3 = RELEASES.find((release) => release.model === "MiniMax M3");

  assert.equal(m3?.provider, "MiniMax");
  assert.equal(m3?.releaseDate, "2026-06-01");
  assert.equal(m3?.codingIndex, null);
  assert.match(m3?.sourceUrl, /minimax-m3/);
});

test("known February 5 2026 coding frontier releases are correct", () => {
  assert.equal(RELEASES.find((release) => release.model === "Claude Opus 4.6")?.releaseDate, "2026-02-05");
  assert.equal(RELEASES.find((release) => release.model === "GPT-5.3-Codex")?.releaseDate, "2026-02-05");
});

test("frontier labs include pre-2025 releases for the requested chart range", () => {
  const frontierBefore2025 = RELEASES.filter(
    (release) => release.group === "Frontier labs" && release.releaseDate < "2025-01-01",
  );

  assert.ok(frontierBefore2025.length >= 10);
});
