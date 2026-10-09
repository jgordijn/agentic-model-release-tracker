#!/usr/bin/env node
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import fs from "node:fs/promises";
import path from "node:path";
import { DATA_SOURCES, IMPORTANT_MISSING_LABS, RELEASES } from "../src/modelData.js";

const root = path.resolve(import.meta.dirname, "..");
const args = new Set(process.argv.slice(2));
const cutoffArgument = process.argv.find((argument) => argument.startsWith("--cutoff="));
const cutoff = cutoffArgument?.slice("--cutoff=".length) ?? new Date().toISOString().slice(0, 10);
const runHttp = args.has("--http");
const config = JSON.parse(await fs.readFile(path.join(root, "scripts/provider-release-sources.json"), "utf8"));
const errors = [];
const expect = (condition, message) => {
  if (!condition) errors.push(message);
};
const httpUrl = (value) => typeof value === "string" && /^https?:\/\/[^\s]+$/.test(value);

assert.match(cutoff, /^\d{4}-\d{2}-\d{2}$/);
const models = RELEASES.map((release) => release.model);
expect(new Set(models).size === models.length, "model names are not unique");
for (const release of RELEASES) {
  expect(/^\d{4}-\d{2}-\d{2}$/.test(release.releaseDate), `${release.model}: invalid date shape`);
  expect(!Number.isNaN(Date.parse(release.releaseDate)), `${release.model}: invalid date value`);
  expect(release.releaseDate <= cutoff, `${release.model}: release after cutoff`);
  expect(httpUrl(release.sourceUrl), `${release.model}: invalid sourceUrl`);
  expect(["base", "specialized-base"].includes(release.releaseCategory), `${release.model}: invalid category`);
  expect(Array.isArray(release.focus) && release.focus.length > 0, `${release.model}: missing focus`);
  expect(release.codingIndex === null || Number.isFinite(release.codingIndex), `${release.model}: invalid codingIndex`);
  if (release.codingIndex !== null) expect(httpUrl(release.scoreSourceUrl), `${release.model}: scored row lacks scoreSourceUrl`);
  expect(release.intelligenceIndex === null || Number.isFinite(release.intelligenceIndex), `${release.model}: invalid intelligenceIndex`);
  if (release.intelligenceIndex === null) {
    expect(release.intelligenceIndexConfiguration === null, `${release.model}: null intelligence score has configuration`);
    expect(release.intelligenceIndexSourceUrl === null, `${release.model}: null intelligence score has source`);
  } else {
    expect(typeof release.intelligenceIndexConfiguration === "string", `${release.model}: intelligence score lacks configuration`);
    expect(httpUrl(release.intelligenceIndexSourceUrl), `${release.model}: intelligence score lacks source`);
  }
}

const configuredNames = config.providers.map((entry) => entry.name);
const missingNames = (config.missingLabs ?? []).map((entry) => entry.name);
expect(new Set([...configuredNames, ...missingNames]).size === configuredNames.length + missingNames.length, "provider names are duplicated");
expect(configuredNames.length === 26, `expected 26 configured providers, got ${configuredNames.length}`);
expect(missingNames.length === 4, `expected 4 missing labs, got ${missingNames.length}`);
expect(JSON.stringify(missingNames) === JSON.stringify(IMPORTANT_MISSING_LABS), "missing lab list differs from dataset");
for (const entry of [...config.providers, ...(config.missingLabs ?? [])]) {
  expect(entry.primarySources.length > 0, `${entry.name}: no primary sources`);
  expect(entry.searchQueries.length > 0 && entry.searchQueries.every((query) => query.includes("{since}")), `${entry.name}: invalid search queries`);
}
const checker = execFileSync(process.execPath, [path.join(root, "scripts/check-provider-releases.mjs"), "--markdown"], { encoding: "utf8" });
const headings = checker.match(/^## (?!Explicitly missing labs$).+/gm) ?? [];
expect(headings.length === configuredNames.length + missingNames.length, `checklist headings ${headings.length} != ${configuredNames.length + missingNames.length}`);
for (const name of [...configuredNames, ...missingNames]) expect(checker.includes(`## ${name}\n`), `checklist missing ${name}`);

const urls = new Set();
for (const release of RELEASES) {
  urls.add(release.sourceUrl);
  if (release.scoreSourceUrl) urls.add(release.scoreSourceUrl);
  if (release.intelligenceIndexSourceUrl) urls.add(release.intelligenceIndexSourceUrl);
}
for (const source of DATA_SOURCES) urls.add(source.url);
for (const entry of [...config.providers, ...(config.missingLabs ?? [])]) {
  for (const url of entry.primarySources) urls.add(url);
}
const urlList = [...urls].filter(httpUrl).sort();
const MAX_URLS = 300;
expect(urlList.length <= MAX_URLS, `URL smoke budget exceeded: ${urlList.length} > ${MAX_URLS}`);

const smokeResults = [];
if (runHttp) {
  const smokeUrls = urlList.slice(0, MAX_URLS);
  let cursor = 0;
  async function worker() {
    while (true) {
      const index = cursor++;
      if (index >= smokeUrls.length) return;
      const url = smokeUrls[index];
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 7000);
      try {
        const response = await fetch(url, {
          headers: { "user-agent": "agentic-model-release-tracker-refresh" },
          redirect: "follow",
          signal: controller.signal,
        });
        try { await response.body?.cancel(); } catch {}
        smokeResults.push({ url, status: response.status, finalUrl: response.url });
      } catch (error) {
        smokeResults.push({ url, status: null, error: error.name === "AbortError" ? "timeout" : error.message });
      } finally {
        clearTimeout(timer);
      }
    }
  }
  await Promise.all(Array.from({ length: 8 }, () => worker()));
  for (const required of [
    "https://www.anthropic.com/claude-haiku-5-5",
    "https://artificialanalysis.ai/models/claude-haiku-5-5",
    "https://artificialanalysis.ai/leaderboards/models",
  ]) {
    const result = smokeResults.find((entry) => entry.url === required);
    if (!result) errors.push(`required URL was not checked: ${required}`);
    else if (result.status === null) errors.push(`required URL network failure: ${required} (${result.error})`);
    else expect(result.status >= 200 && result.status < 300, `required URL failed: ${required} (${result.status})`);
  }
}

const smokeOk = smokeResults.filter((result) => result.status >= 200 && result.status < 300);
const smokeNon2xx = smokeResults.filter((result) => !(result.status >= 200 && result.status < 300));
console.log(JSON.stringify({
  cutoff,
  rows: RELEASES.length,
  uniqueModels: new Set(models).size,
  newestReleaseDate: RELEASES.reduce((latest, release) => (release.releaseDate > latest ? release.releaseDate : latest), ""),
  configuredProviders: configuredNames.length,
  missingLabs: missingNames.length,
  checklistHeadings: headings.length,
  urlUnion: urlList.length,
  httpSmoke: runHttp ? { checked: smokeResults.length, ok: smokeOk.length, non2xx: smokeNon2xx.length, failures: smokeNon2xx } : null,
  invariantErrors: errors,
}, null, 2));
if (errors.length > 0) process.exit(1);
