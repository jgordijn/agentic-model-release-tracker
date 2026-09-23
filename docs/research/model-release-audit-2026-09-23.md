# Agentic model release audit — 2026-09-23

## Boundary and baseline

- **Repository:** `jgordijn/agentic-model-release-tracker`
- **Target branch:** `main`; direct refresh is intentional. No worktree used.
- **Remote:** `origin` → `https://github.com/jgordijn/agentic-model-release-tracker.git`
- **Last data/update commit before this refresh:** `8246ba9` (`feat: refresh model releases through 2026-09-18`, 2026-09-18).
- **Newest tracked `releaseDate` before this refresh:** `2026-09-10`.
- **Rows before this refresh:** 130.
- **Research window:** inclusive from `2026-09-10` through `2026-09-23` in `Europe/Amsterdam`.
- **Current-date cutoff:** `2026-09-23`.
- **Working-tree safety:** the pre-refresh tree had only the known untracked `screenshots/baseline-local.png`; it was left untouched. No unrelated tracked changes were present.
- **Checklist command:** `node scripts/check-provider-releases.mjs --markdown` was run before research. Its pre-edit output used `since 2026-09-10` and covered all configured providers. After the rows were added, the generator correctly reports the new latest baseline `2026-09-22`.

## Inclusion and score policy

Only maker-released base model lines or clearly differentiated specialized-base lines relevant to programming or agentic work are included. Preview-only configurations, mini/nano/lite tiers, product features, partner integrations, modality-only models, quantizations, serving modes, and pure API aliases are excluded or collapsed into an existing family row.

`codingIndex` is populated only for an exact Artificial Analysis **Coding Index** row and exact model/configuration. Intelligence Index, Agentic Index, Terminal-Bench, SWE-bench, CursorBench, DeepSWE, maker scores, and other coding benchmarks are not substitutes. Unknown exact scores remain `null`.

## Added rows

### Grok 4.7 — xAI

- **Decision:** add; base model.
- **Maker date/source:** `2026-09-21`, [xAI announcement](https://x.ai/news/grok-4-7). The fetched announcement describes coding and long-running tasks; the official developer model docs separately document agentic tool calling and API availability.
- **Dashboard row:** `releaseDate: 2026-09-21`, `codingIndex: null`, `focus: ["agentic", "programming"]`.
- **Artificial Analysis lookup:** exact family URL [Grok 4.7](https://artificialanalysis.ai/models/grok-4-7); the fetched live catalog exposed `grok-4-7` (xhigh) and `grok-4-7-high` (high) identity/configuration rows but no exact Coding Index field on the model/leaderboard HTML.
- **Mirror check:** [Easy Benchmarks AA Coding Index snapshot](https://easy-benchmarks.com/benchmarks/artificial_analysis_coding_index), retrieved 2026-09-23, had no Grok 4.7 row. The mirror was treated as secondary evidence, not as direct AA verification.
- **Why unknown:** no exact Coding Index value was independently verifiable; xAI's CursorBench/DeepSWE figures and AA Intelligence Index were deliberately not substituted.

### Claude Opus 5.5 — Anthropic

- **Decision:** add; base model.
- **Maker date/source:** `2026-09-22`, [Anthropic announcement](https://www.anthropic.com/claude-opus-5-5). The fetched canonical announcement is dated September 22, 2026 and explicitly describes long-running coding, codebase migrations, agentic coding, tool use, and availability on the Claude Platform and cloud platforms.
- **Dashboard row:** `releaseDate: 2026-09-22`, `codingIndex: null`, `focus: ["agentic", "programming"]`.
- **Artificial Analysis lookup:** exact family URL [Claude Opus 5.5](https://artificialanalysis.ai/models/claude-opus-5-5); the fetched live catalog exposed Adaptive Reasoning Max, Xhigh, and High Effort identities. No exact Coding Index field was exposed in the fetched model/leaderboard HTML.
- **Mirror check:** [Easy Benchmarks AA Coding Index snapshot](https://easy-benchmarks.com/benchmarks/artificial_analysis_coding_index), retrieved 2026-09-23, had no Opus 5.5 row. The mirror was treated as secondary evidence, not as direct AA verification.
- **Why unknown:** Anthropic's Terminal-Bench/FrontierCode values and AA Intelligence Index were not accepted as Coding Index values.

### MiMo-V2.6-Pro — Xiaomi

- **Decision:** add; base model, following the existing Xiaomi policy that tracks the Pro family line and collapses non-Pro/modality variants.
- **Maker date/source:** `2026-09-22`, [Xiaomi MiMo-V2.6 announcement](https://mimo.xiaomi.com/mimo-v2-6). The fetched article is dated September 22, 2026 and says MiMo-V2.6-Pro and MiMo-V2.6-Flash are released/open-sourced and available in MiMo Code/API/Desktop; it describes coding, long-horizon software engineering, tool use, and agentic workflows. The [official Pro RL model card](https://huggingface.co/XiaomiMiMo/MiMo-V2.6-Pro-RL) maps the open checkpoint to the production family and documents coding/agent behavior.
- **Dashboard row:** `releaseDate: 2026-09-22`, `codingIndex: null`, `focus: ["agentic", "programming"]`.
- **Artificial Analysis lookup:** exact family URL [MiMo-V2.6-Pro](https://artificialanalysis.ai/models/mimo-v2-6-pro); the fetched live page exposed the production family as the unsuffixed `MiMo-V2.6-Pro` entry with no effort suffix and showed family/catalog release date `2026-09-21`, one day earlier than Xiaomi's explicit maker publication/release date `2026-09-22`. The dashboard intentionally uses the maker's public availability date, not the benchmark catalog date. The page exposed Intelligence Index content, but no exact Coding Index field. The open checkpoint alias `XiaomiMiMo/MiMo-V2.6-Pro-RL` was recorded in this ledger only; it is not a second dashboard row.
- **Mirror check:** [Easy Benchmarks AA Coding Index snapshot](https://easy-benchmarks.com/benchmarks/artificial_analysis_coding_index), retrieved 2026-09-23, had no MiMo-V2.6-Pro row. The mirror was treated as secondary evidence, not as direct AA verification.
- **Why unknown:** Xiaomi's DeepSWE/Terminal Bench values and AA Intelligence Index were not accepted as Coding Index values. `MiMo-V2.6-Flash` is the non-Pro family variant and `MiMo-V2.6-Pro-UltraSpeed` is a serving mode, so neither is a separate row.

## Configured provider ledger

The following is the complete configured provider set from `scripts/provider-release-sources.json`. Each provider received one bounded discovery pass plus direct checks of the listed official surfaces. “No add” is an explicit skip decision for the window, not an assertion that the provider has no other models.

- **OpenAI** — checked `https://openai.com/news/`, `https://openai.com/index/`, and `https://platform.openai.com/docs/models` (redirected to the official developer model docs). News/index returned HTTP 403 to the direct fetch; the developer model catalog was checked. **Decision:** no new maker-dated in-window base line verified; existing GPT-6 Astra remains the tracked row. **Evidence limit:** OpenAI news/index could not be independently extracted in this run.
- **Anthropic** — checked `https://www.anthropic.com/news` and `https://docs.anthropic.com/en/docs/about-claude/models` (redirected to the official Claude model overview), plus the exact Opus 5.5 announcement. **Decision:** add Claude Opus 5.5; Fable 5.1's later AA catalog configuration date is not a new maker release.
- **Google** — checked the Gemini model archive, developer model docs, and developer-tools blog. **Decision:** no new qualifying maker release after the existing 2026-09-10 boundary; current Gemini 3.8 and modality-only/other variants were already represented or excluded.
- **Meta** — checked the official Meta AI blog and `https://huggingface.co/meta-models`. **Decision:** no in-window qualifying base/specialized-base release; later registry activity did not establish a new programming/agentic family.
- **OpenBMB** — checked `https://huggingface.co/OpenBMB`, the OpenBMB GitHub organization, and `https://github.com/OpenBMB/MiniCPM`. **Decision:** no release after MiniCPM5-2B (2026-09-07); checkpoint/quantization artifacts remain collapsed/excluded.
- **Apodex** — checked the homepage, API page, and Apodex 1.1 announcement. **Decision:** no new in-window release; Apodex 1.1 (2026-08-24) remains the qualifying row and Apodex 1.1 Mini remains excluded.
- **xAI** — checked `https://x.ai/news` (HTTP 403 direct fetch), the official developer model docs, and the exact Grok 4.7 announcement. **Decision:** add Grok 4.7. The exact AA effort rows are not separate dashboard releases.
- **Cursor** — checked `https://cursor.com/blog`. **Decision:** no new Cursor-owned model line; the Grok 4.7 article is an xAI maker release and Cursor availability is an integration, not a second Cursor row.
- **Mistral** — checked `https://mistral.ai/news` and the official model overview. **Decision:** no in-window qualifying programming/agentic base line. Robostral Navigate (2026-07-08) is outside the window and embodied-navigation-specific; Leanstral 1.5 (2026-07-02) is already outside the window.
- **Alibaba** — checked Qwen's official blog, legacy Qwen blog, and QwenCloud model catalog. **Decision:** no new maker-dated qualifying release after 2026-09-10; benchmark/dated snapshot aliases are not new families.
- **Tencent** — checked UI-Mate, the official Hugging Face organization, and Tencent GitHub. **Decision:** no new qualifying programming/agentic base line. WeVisDoc and related September registry entries are document/vision or research artifacts and are excluded.
- **DeepSeek** — checked the official API news archive and transparency page. **Decision:** no release after the already tracked DeepSeek V4.1 Flash on 2026-09-10.
- **Moonshot.ai** — checked the platform changelog (redirected to the Kimi platform), Moonshot homepage, and official Kimi account. **Decision:** no new maker-dated qualifying release; Kimi K3 and Kimi K2.7 Code remain the latest tracked lines.
- **MiniMax** — checked MiniMax news and blog. **Decision:** no new release in the window; M3 (2026-06-01) remains the latest qualifying base line. M2.7 (2026-03-18) is outside the window.
- **Z.ai** — checked the official blog (HTTP 404) and release-notes page. **Decision:** no new qualifying release. GLM-4.7-Flash is explicitly dated 2026-01-19 in the official release notes and is a lightweight/free-tier model, so the Artificial Analysis 2026-09-18 catalog date is not a maker release and it is not added.
- **Xiaomi** — checked the official GitHub organization, Hugging Face organization, and the newly discovered official MiMo-V2.6 announcement. **Decision:** add MiMo-V2.6-Pro. The official announcement surface was added to `provider-release-sources.json` for future sweeps.
- **NVIDIA** — checked NVIDIA Build and the official Hugging Face organization. **Decision:** no new qualifying base/specialized-base line. September GLM/DeepSeek NVFP4 assets are quantizations/packaging of other families and are excluded.
- **IFM** — checked the K2 pages and docs. The K2 pages returned HTTP 403 to direct fetches. **Decision:** no new maker release verifiable; existing K2 Horizon 375B A23B remains tracked. This provider is retained as a bounded evidence limitation, not silently marked complete beyond the accessible evidence.
- **Agnes AI** — checked the homepage, model docs, platform, and GitHub organization. **Decision:** no qualifying release after Agnes 3.0 Flash (2026-09-08); no new model was verified in the window.
- **InclusionAI** — checked the official model catalog, LLaDA-UI project page, GitHub, Hugging Face, and official Ant Ling account. **Decision:** no new qualifying programming/agentic base line after the existing backfills. Realtime-Venus and Ming-Image entries are audio/video or image modality releases and are excluded.

## Explicit missing-lab ledger

These labs remain in `IMPORTANT_MISSING_LABS` and were checked separately as required by the project.

- **Amazon** — checked AWS What's New (redirected to the official AWS new page) and Amazon Science RSS. **Decision:** no qualifying in-window base or specialized coding/agentic model release verified; remain missing.
- **Cohere** — checked Cohere blog, Cohere docs changelog, and the official Hugging Face organization. **Decision:** no qualifying in-window release; vision/tiny/translation artifacts are outside scope or outside the window; remain missing.
- **StepFun** — checked the official StepFun site and `stepfun-ai` official Hugging Face organization. **Decision:** no qualifying release after the existing Step-3.7-Flash line; remain missing.
- **AI21 Labs** — checked AI21 blog and Studio redirect. **Decision:** no qualifying in-window programming/agentic base release verified; remain missing.

## Benchmark and provenance notes

- Retrieval date for all live benchmark/mirror checks: `2026-09-23`.
- The live [Artificial Analysis model leaderboard](https://artificialanalysis.ai/leaderboards/models) and exact model pages for Grok 4.7, Claude Opus 5.5, and MiMo-V2.6-Pro were fetched successfully. Their current HTML exposed model identity, release/configuration information, and Intelligence Index material, but not an exact Coding Index field for these new rows.
- The linked [Artificial Analysis coding-capability URL](https://artificialanalysis.ai/models/capabilities/coding) returned HTTP 404 during this run. A 404 was not treated as evidence for a score.
- The [Easy Benchmarks mirror](https://easy-benchmarks.com/benchmarks/artificial_analysis_coding_index) was fetched successfully and showed the current snapshot/top rows, but none of the three new families. It is secondary extraction evidence only; no mirror value was described as directly verified from Artificial Analysis.
- No scores were changed on older rows in this refresh. The new rows deliberately have `codingIndex: null` and no `scoreSourceUrl` because exact metric/configuration evidence was unavailable.
- AA aliases/configurations checked: Grok 4.7 xhigh/high; Claude Opus 5.5 Adaptive Reasoning Max/Xhigh/High; MiMo-V2.6-Pro production family and `XiaomiMiMo/MiMo-V2.6-Pro-RL` open checkpoint. These configuration rows are benchmark identities, not separate maker release rows.
- The updated source config adds `https://mimo.xiaomi.com/mimo-v2-6` and a matching bounded query under existing Xiaomi coverage; no new lab outside the checklist was found.

## Expected refresh result

- Added: 3 rows (`Grok 4.7`, `Claude Opus 5.5`, `MiMo-V2.6-Pro`).
- New row count: 133.
- Newest tracked release date: `2026-09-22`.
- Scores added: 0; all three exact Coding Index values remain unknown.

## Follow-up correction — 2026-09-23

A post-publication review found two qualifying OpenAI model releases omitted from the original provider sweep. The original OpenAI “no add” decision above is superseded for these two rows.

- **GPT-6 Sol — add, base model; release date `2026-09-22`.** OpenAI's [official announcement](https://openai.com/index/introducing-gpt-6-sol-and-luna/) appears in its news archive dated September 22, identifies API model `gpt-6-sol`, and explicitly describes coding-agent/Codex work and coding benchmarks. The [OpenAI model catalog](https://platform.openai.com/docs/models) describes GPT-6 Sol as built for complex coding and agentic workflows. The exact [Artificial Analysis family page](https://artificialanalysis.ai/models/gpt-6-sol) exposes Intelligence Index material, not an exact Coding Index value; the fetched Easy Benchmarks Coding Index snapshot did not provide a verified exact row. Keep `codingIndex: null`; FrontierCode/DeepSWE and Intelligence Index values are not substitutes.
- **GPT-6 Luna — add, base model; release date `2026-09-22`.** Same dated OpenAI announcement identifies API model `gpt-6-luna`, describes coding-agent/Codex use and coding results, and its availability section says the API models are available. The exact [Artificial Analysis family page](https://artificialanalysis.ai/models/gpt-6-luna) exposes Intelligence Index material, not an exact Coding Index value; the fetched Easy Benchmarks Coding Index snapshot did not provide a verified exact row. Keep `codingIndex: null`; DeepSWE and Intelligence Index values are not substitutes.
- **Result:** two additional unique rows; dataset total is now 135 (130 pre-refresh rows + the original three rows + these two corrections). Newest date remains `2026-09-22`; both new rows use the shared OpenAI announcement URL and focus `agentic` / `programming`.
- **Cause/evidence limit:** OpenAI news/index extraction was initially blocked and the model docs were checked, but the separate dated announcement was missed. A later direct extraction of the official news archive surfaced the September 22 item. This correction does not claim that OpenAI was absent from the provider checklist; it corrects the earlier candidate decision.

- Skips/unresolved: provider-level decisions and explicit candidate exclusions are recorded above; OpenAI, xAI, Z.ai, and IFM had direct-fetch access limitations documented rather than hidden.
