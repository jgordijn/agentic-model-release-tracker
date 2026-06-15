#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const configPath = path.join(import.meta.dirname, "provider-release-sources.json");
const modelDataPath = path.join(root, "src", "modelData.js");

function parseArgs(argv) {
  const args = { since: null, provider: null, markdown: false };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--since") args.since = argv[++index];
    else if (arg === "--provider") args.provider = argv[++index];
    else if (arg === "--markdown") args.markdown = true;
    else if (arg === "--help" || arg === "-h") {
      printHelp();
      process.exit(0);
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }
  return args;
}

function printHelp() {
  console.log(`Usage: node scripts/check-provider-releases.mjs [--since YYYY-MM-DD] [--provider NAME] [--markdown]\n\nPrints a repeatable provider-by-provider checklist for finding new model releases.\n\nOptions:\n  --since      Override the date to search from. Defaults to the latest releaseDate in src/modelData.js.\n  --provider   Limit output to one provider name, case-insensitive.\n  --markdown   Print a markdown checklist suitable for an issue, PR, or notes file.\n`);
}

function loadJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function latestReleaseDate() {
  const source = fs.readFileSync(modelDataPath, "utf8");
  const dates = [...source.matchAll(/releaseDate: "(\d{4}-\d{2}-\d{2})"/g)].map((match) => match[1]);
  return dates.sort().at(-1);
}

function expandSince(value, since) {
  return value.replaceAll("{since}", since);
}

function providerMatches(provider, filter) {
  return !filter || provider.name.toLowerCase() === filter.toLowerCase();
}

function printProvider(provider, since, markdown) {
  const heading = markdown ? `## ${provider.name}` : `\n=== ${provider.name} (${provider.group}) ===`;
  console.log(heading);
  if (markdown) {
    console.log(`- Group: ${provider.group}`);
    console.log("- Primary sources:");
    for (const source of provider.primarySources) console.log(`  - ${source}`);
    console.log("- Search queries:");
    for (const query of provider.searchQueries) console.log(`  - \`${expandSince(query, since)}\``);
    console.log(`- Include signals: ${provider.includeSignals.join(", ")}`);
    console.log(`- Exclude signals: ${provider.excludeSignals.join(", ")}`);
    console.log("- Findings:");
    console.log("  - [ ] Checked primary sources");
    console.log("  - [ ] Checked search queries");
    console.log("  - [ ] Confirmed whether each candidate is a base/specialized model release rather than a feature, preview-only config, mini/nano/lite tier, app feature, or provider integration");
    console.log("  - [ ] Added release rows with sourceUrl and scoreSourceUrl when AA Coding Index has a score");
  } else {
    console.log(`Group: ${provider.group}`);
    console.log("Primary sources:");
    for (const source of provider.primarySources) console.log(`  - ${source}`);
    console.log("Search queries:");
    for (const query of provider.searchQueries) console.log(`  - ${expandSince(query, since)}`);
    console.log(`Include signals: ${provider.includeSignals.join(", ")}`);
    console.log(`Exclude signals: ${provider.excludeSignals.join(", ")}`);
  }
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  const config = loadJson(configPath);
  const since = args.since ?? latestReleaseDate() ?? config.since;
  const providers = config.providers.filter((provider) => providerMatches(provider, args.provider));

  if (providers.length === 0) {
    throw new Error(`No provider matched ${args.provider}`);
  }

  if (args.markdown) {
    console.log(`# Model release check since ${since}`);
    console.log("");
    console.log("Use this checklist to update `src/modelData.js`. Prefer primary maker sources; use secondary sources only when the maker confirms availability somewhere non-extractable, and mark `sourceType: \"secondary\"`.");
    console.log("");
  } else {
    console.log(`Model release check since ${since}`);
    console.log("Add providers or sources in scripts/provider-release-sources.json.");
  }

  for (const provider of providers) printProvider(provider, since, args.markdown);
}

try {
  main();
} catch (error) {
  console.error(error.message);
  process.exit(1);
}
