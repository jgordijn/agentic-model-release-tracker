# Agentic Model Release Tracker

Static dashboard for tracking agentic and programming-relevant model releases.

## Updating model releases

Run the provider checklist generator before adding new releases:

```bash
node scripts/check-provider-releases.mjs --markdown > /tmp/model-release-check.md
```

Useful options:

```bash
node scripts/check-provider-releases.mjs --since 2026-06-01
node scripts/check-provider-releases.mjs --provider Anthropic --markdown
```

The script reads `src/modelData.js` and defaults `--since` to the latest tracked `releaseDate`. Provider source lists live in `scripts/provider-release-sources.json`, so adding a provider is just adding another object with:

- `name`
- `group`
- `primarySources`
- `searchQueries`
- `includeSignals`
- `excludeSignals`

Update rules:

1. Check every provider in `scripts/provider-release-sources.json`.
2. Prefer primary maker sources for `sourceUrl`.
3. Use secondary sources only when the maker confirms availability somewhere non-extractable, and mark the row with `sourceType: "secondary"`.
4. Add rows only for base model lines or distinct specialized base lines relevant to agentic/programming work.
5. Do not add preview-only configs, mini/nano/lite tiers, app features, partner integrations, or modality-only releases unless they are directly relevant to programming/agentic workflows.
6. If Artificial Analysis Coding Index has a score, add `codingIndex` and `scoreSourceUrl`.
7. Run tests before pushing:

```bash
npm test
```
