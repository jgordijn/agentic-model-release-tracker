# Model-release audit — 2026-11-01

## Baseline, window, and policy

- **Repository/branch:** `agentic-model-release-tracker`, direct `main` working tree; no worktree and no PR.
- **Remote:** `origin` → `https://github.com/jgordijn/agentic-model-release-tracker.git`.
- **HEAD / `origin/main` before this refresh:** `1080ee09f894b788f79de82a229c0448164b1bef` (`feat(data): add Mistral Large 4 release`). `origin/main` matched HEAD after fetch.
- **Last data commit:** `1080ee0` at `2026-10-30T06:23:16Z`; this is separate from the newest tracked model date.
- **Working-tree baseline:** 166 rows, 166 unique model names; newest tracked `releaseDate` was `2026-10-29` (`Mistral Large 4`). The pre-existing untracked `screenshots/baseline-local.png` was left untouched. No unrelated tracked changes were present at start.
- **Research cutoff:** `2026-11-01T07:04:58+01:00` in `Europe/Amsterdam` (`2026-11-01T06:04:58Z`).
- **Required incremental boundary:** the initial checklist derived `since 2026-10-29`; the primary refresh window is inclusive `2026-10-29` through `2026-11-01`.
- **Correction boundary:** the refresh also rechecked the immediately preceding published audit window because a current Artificial Analysis catalog scan exposed a qualifying Google release dated `2026-10-28` that the October 30 audit omitted. That correction is explicitly recorded below and supersedes the prior no-add decision; the original `model-release-audit-2026-10-30.md` remains unchanged.
- **Scope:** add only maker-released base model lines or clearly differentiated specialized-base lines relevant to programming or agentic work. Exclude product features, provider integrations, modality-only releases, quantizations, pure snapshots/checkpoints, API aliases, mini/nano/lite/tiny tiers, preview-only configurations, and speed/serving variants.
- **Metric rule:** `codingIndex` is populated only from an exact Artificial Analysis Coding Index row for the exact model/configuration. Intelligence Index, Agentic Index, Coding Agent Index, FrontierCode, SWE-bench, Terminal-Bench, maker scores, and other metrics are never substituted for Coding Index. Unknown exact Coding Index values remain `null`. The separate `intelligenceIndex` field is retained only for the exact AA Intelligence Index configuration and source, consistent with the existing dashboard schema.

## Required checklist and bounded retrieval

- The required first command ran before external research: `node scripts/check-provider-releases.mjs --markdown`. It derived `since 2026-10-29` and covered 26 configured providers plus 4 explicit missing labs. The final checklist emits 30 provider/lab headings exactly once, plus the `Explicitly missing labs` section.
- One bounded discovery query was run for each configured provider and missing lab: 30 queries total. Search results were treated as discovery leads only; no repeated broad sweep was used.
- A direct HTTP pass over the 114 unique configured primary-source URLs recorded **105 HTTP 200**, **8 HTTP 403**, and **1 HTTP 404**. The blocked surfaces were OpenAI news/index, xAI news, IFM release pages, and the Z.ai blog; those limitations are not converted into claims of absence.
- Direct official fallbacks were fetched where needed, including OpenAI's developer model catalog, xAI developer release notes, DeepSeek's updates/news surfaces, Mistral's news archive, official Google model announcements, official Hugging Face organization/model cards, and exact provider pages.
- The Artificial Analysis models page and model leaderboard were fetched directly on the cutoff date. Parsing their embedded model records for `2026-10-27` through `2026-11-01` found only `Gemini 4 Carbon` (`2026-10-28`, Google) and the already tracked `Mistral Large 4` (`2026-10-29`, Mistral). No in-window `2026-10-30`/`2026-10-31`/`2026-11-01` model record was present.
- One qualifying correction was verified: **Gemini 4 Carbon**. No new provider or new official discovery surface was found, so `scripts/provider-release-sources.json` remains unchanged.

## Candidate ledger

| Candidate / lead | Provider | Maker/catalog date | Decision | Evidence and reason |
|---|---|---:|---|---|
| **Gemini 4 Carbon** | Google | 2026-10-28 | **Add correction** | Google's official [announcement](https://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-gemini-4-carbon/) is dated October 28 and explicitly describes coding, long-horizon agentic engineering, and cybersecurity work. The current AA [model page](https://artificialanalysis.ai/models/gemini-4-carbon) and embedded [leaderboard](https://artificialanalysis.ai/leaderboards/models) identify the exact `high` row and release date. This supersedes the October 30 audit's Google no-add decision, which relied on an accessible catalog/archive pass that did not surface the exact Carbon announcement.
| **Gemini 4 Carbon Coding Index** | Google | AA retrieval 2026-11-01 | **Coding score unknown** | The exact AA page and leaderboard HTML exposed no `codingIndex` field for Carbon. The exact [Easy Benchmarks model URL](https://easy-benchmarks.com/models/gemini-4-carbon) and the high-variant URL returned Model Not Found. Google's SEC-bench, CWE-bench, Terminal-Bench, DeepSWE, and other claims are not the dashboard's historical Coding Index. |
| **Gemini 4 Carbon Intelligence Index** | Google | AA retrieval 2026-11-01 | **Store separately** | The exact AA page reports **59** for `Gemini 4 Carbon (High)`. The dataset stores `intelligenceIndex: 59`, configuration `high`, and `https://artificialanalysis.ai/models/gemini-4-carbon`; this is not copied into `codingIndex`.
| Mistral Large 4 | Mistral | 2026-10-29 | **Skip duplicate** | The exact maker release and AA catalog record were already added in the October 30 refresh. No second row or score change is made.
| Gemini 4 Argon current/Carbon follow-up surfaces | Google | 2026-10-28 | **Collapse to Carbon row** | The Carbon announcement and AA high row identify one named model family. No effort/configuration row is added separately; Argon remains its existing row.
| Qwen3.8-Max-0902 and Qwen Cloud catalog entries | Alibaba | catalog/snapshot activity through 2026-10-31 | **Skip snapshot/alias** | The official Qwen Cloud page describes `Qwen3.8-Max-0902` as an upgraded snapshot of the already tracked Qwen3.8-Max family. No new maker-dated family release was verified.
| LongCat-2.5-Preview | LongCat | current homepage; no maker date exposed | **Skip preview-only** | LongCat's official homepage advertises a preview line. The project policy explicitly excludes preview-only configurations; LongCat-2.0 remains the tracked base family.
| NVIDIA Nemotron Halloween / Voice Agent project | NVIDIA | 2026-10-30 | **Skip project/integration** | The official Hugging Face article is a MonsterHouse project using existing Nemotron Speech, Bolt, TTS, and Audio2Face components. It is not a new base model release.
| NVIDIA Nemotron 3.5 Transcribe | NVIDIA | 2026-10-28 | **Skip modality-only speech** | The official article and card describe an ASR/diarization/translation/audio-QA checkpoint. Speech-only scope is excluded.
| InclusionAI ZwZ2-4B/9B/27B | InclusionAI | HF/GitHub activity 2026-10-31 | **Skip modality-only visual perception** | The official cards and project describe `Zooming without Zooming v2`, an image-text-to-text visual-perception model based on Qwen; its paper and card focus on multimodal perception, not a programming/agentic base line under this dashboard's strict scope.
| Tencent Hy-Nomas / WeVisCut / Youtu-Parsing-Omni / Hy-SimulMT | Tencent | registry activity 2026-10-28–31 | **Skip modality/translation/video/packaging** | Official cards identify world generation, video editing, omni parsing, and speech translation. These are outside the tracker scope; no new general programming/agentic base line was found.
| Cohere Oct 29–30 blog items | Cohere | 2026-10-29–30 | **Skip company/product content** | The official blog's current items are a financial-research tutorial, company commitment, and sovereign-AI commentary. Tiny Aya, translation, speech, and retrieval artifacts are excluded.
| OpenAI catalog/release-note activity | OpenAI | 2026-10-29–11-01 | **No verified add** | The official developer model catalog and accessible release-note fallback show existing GPT-6.1 family entries and product/API changes, not a newer qualifying base model. OpenAI news/index remained HTTP 403.
| Anthropic newsroom/docs activity | Anthropic | 2026-10-29–11-01 | **No add** | Official newsroom and model docs continue to list the tracked Claude 5.5 family; no newer model line was verified.
| Meta Muse/Llama registry activity | Meta | 2026-10-29–11-01 | **No add** | Official Meta/Hugging Face/developer surfaces show existing Muse lines, packaging, and maintenance only.
| OpenBMB MiniCPM-V 4.7, OCR, Trident artifacts | OpenBMB | 2026-10-29–31 | **Skip modality/packaging** | Official HF/GitHub activity is vision, OCR, merged checkpoints, and packaging; no new programming/agentic base line.
| Apodex current catalog | Apodex | no later maker date | **No add** | Configured home, API, and Apodex 1.1 announcement checked; 1.1 remains latest qualifying line.
| xAI moderation and release notes | xAI | 2026-10-27; no later model | **Skip API feature** | Official developer notes show custom moderation controls, not a model release. xAI news remained HTTP 403; no later qualifying model was verified through the official fallback.
| Cursor security notice / Agent SDK | Cursor | 2026-10-20/29 | **Skip product/security** | The configured blog shows a security notice and Agent SDK, not a Cursor-owned model line. Existing Composer history is unchanged.
| DeepSeek current news/updates | DeepSeek | no later than 2026-10-17 | **No add** | Official news, updates, and transparency surfaces confirm the already tracked V4.1 Flash 1017; no later qualifying family release.
| Moonshot/Kimi current activity | Moonshot.ai | no later than 2026-10-24 | **No add** | Official Kimi research index, announcement, API docs, changelog, and account checked; Kimi K3.1 Pro remains latest.
| MiniMax current archive | MiniMax | 2026-10-29–11-01 activity | **No add** | Official blog/news list M3.1 Flash as the latest qualifying LLM; MiniMax Code Mini App is a product feature and H3/Music/Speech entries are outside scope.
| Z.ai release notes/blog | Z.ai | no verified in-window model date | **Unresolved/no add** | Official release notes were checked; the configured blog returned 404. No later qualifying GLM release was verified, and the access limit is retained.
| Xiaomi MiMo registry updates | Xiaomi | maintenance through 2026-10-31 | **Skip maintenance/serving variants** | Official GitHub/HF/MiMo surfaces show existing-family artifacts; no new maker-dated family release.
| IFM/K2/Jais surfaces | IFM | no later verified date | **Unresolved/no add** | Official docs/HF collection were reachable and the IFM release pages returned 403. Jais 3 is already tracked; no later qualifying line was verified.
| Agnes AI docs/registry | Agnes AI | docs activity through 2026-11-01 | **No add** | Official docs, platform, GitHub, and HF surfaces show Agnes 3.0 Flash/Qwen and harness activity; no new qualifying base line.
| InclusionAI Ling/Sante/LBS surfaces | InclusionAI | activity through 2026-11-01 | **No add beyond ZwZ2 skip** | Official HF, GitHub, model catalog, UI-Venus, and account surfaces show existing tracked rows, packaging, perception projects, and harness activity only.
| Inception Mercury surfaces | Inception | no later than 2026-10-19 | **No add** | Official home, models, docs, and Mercury 2.5/3 announcements checked; Mercury 3 remains latest.
| IBM Granite surfaces | IBM Granite | existing Granite 4.2; speech updates through 2026-11-01 | **No add** | Official IBM Research, HF, and GitHub surfaces confirm Granite 4.2 language models are already tracked. New speech, embedding, switch, and time-series activity is outside scope.
| Thinking Machines Inkling surfaces | Thinking Machines | no later model date | **No add** | Official company site, HF, GitHub, and Inkling article checked; only existing Inkling and infrastructure activity.
| Arcee Trinity surfaces | Arcee AI | no later model date | **No add** | Official home, Trinity page, HF organization, and docs checked; no newer qualifying family.
| Celeris current pages | Celeris | latest model decision page 2026-10-08 | **No add/outside window** | Official Celeris pages show Celeris-1 Magnus and the later decision model, both before the current boundary; no later programming/agentic base line.

## Explicitly missing-lab coverage

- **Amazon** — checked configured AWS What's New and Amazon Science RSS. No Nova base-model release in the window; hosted third-party availability would be an integration. **Skip/no add; remains missing.**
- **Cohere** — checked Cohere blog, changelog, and CohereLabs HF. Recent activity is company content, tiny/translation/speech/retrieval material, or datasets. **Skip/no add; remains missing.**
- **StepFun** — checked StepFun and StepFun HF. No later qualifying base line; preview material remains excluded. **Skip/no add; remains missing.**
- **AI21 Labs** — checked AI21 blog and Studio. No dated in-window AI21 base-model release was verified. **Skip/no add; remains missing.**

## Added row and exact metric provenance

### Gemini 4 Carbon

- **Canonical display name:** `Gemini 4 Carbon`.
- **Provider/group/category:** `Google` / `Frontier labs` / `base`.
- **Stored release date:** `2026-10-28`, from Google's official announcement. The current AA catalog independently lists the same maker date; the maker date controls the dashboard.
- **Maker source:** [Gemini 4 Carbon: our next frontier model](https://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-gemini-4-carbon/).
- **Aliases checked:** `gemini-4-carbon`, `Gemini 4 Carbon (high)`, and the exact AA slug `gemini-4-carbon`. The high effort row is not a separate release.
- **Scope evidence:** Google describes coding, long-horizon agentic engineering, full-stack development, and cybersecurity use. The named frontier model is tracked as a base line, even though rollout begins with trusted cyber defenders through Fairwind; this follows the existing Gemini 4 Argon policy. It is not a preview-only configuration, product feature, provider integration, quantization, or API alias.
- **Artificial Analysis audit:** the exact [AA model page](https://artificialanalysis.ai/models/gemini-4-carbon) and [model leaderboard](https://artificialanalysis.ai/leaderboards/models) were fetched on 2026-11-01. The embedded record is `Gemini 4 Carbon (high)`, release date `2026-10-28`; the model page reports **Intelligence Index 59**. The exact fetched HTML contained no `codingIndex` field for Carbon.
- **Stored Coding Index:** `codingIndex: null`; no `scoreSourceUrl`, no mirror-derived score, no effort configuration, and no maker benchmark substitution. Exact Easy Benchmarks model URLs returned Model Not Found.
- **Separate Intelligence Index:** `59`, representative configuration `high`, source `https://artificialanalysis.ai/models/gemini-4-carbon`, retrieved 2026-11-01.
- **Correction status:** this row explicitly supersedes the October 30 audit's Google no-add decision. The previous audit snapshot is preserved; this ledger records the omission and the evidence that fixed it.

## Score, alias, snapshot, and provider-config decisions

- **Rows added this pass:** one correction, `Gemini 4 Carbon`, dated `2026-10-28`.
- **Changed existing Coding Index scores:** none. No historical Coding Index was refreshed from another snapshot or effort configuration.
- **New row Coding Index:** unknown. The exact AA model/leaderboard identity and `high` configuration were verified, but the requested Coding Index field was not exposed and the mirror had no exact model page.
- **Source-parity classification:** Google maker release and AA catalog both identify October 28; the maker announcement controls the row date. AA Intelligence Index 59 is a separate metric. The missing Coding Index is a metric/evidence limitation, not a zero score.
- **Provider checklist/configuration:** unchanged. Google was already configured with its official Gemini archive, developer-tools archive, model docs, and search queries; no new lab or unlisted discovery surface was needed.
- **Final configured set:** 26 providers; explicit missing labs remain Amazon, Cohere, StepFun, and AI21 Labs; checklist headings remain 30.

## Evidence limits

- Search retrieval was bounded to one configured discovery query per provider/missing lab (30 total), followed by narrow exact-page, registry, and benchmark-parity retrieval. Search snippets were not used as final release evidence.
- Artificial Analysis is dynamic and metric-specific. The exact Carbon model page and leaderboard were fetched directly. Their visible/embedded record supports the `high` identity and Intelligence Index 59, but not a historical Coding Index value.
- Easy Benchmarks was treated as a secondary mirror only. The exact Carbon model URLs returned Model Not Found; no mirror value was stored or described as directly verified from AA.
- Direct primary-source status limits were: 8 HTTP 403 responses (OpenAI news/index, xAI news, IFM release pages) and 1 HTTP 404 (Z.ai blog) in the 114-URL configured-source pass. Alternate official pages were used where available; blocked pages are not converted into absence claims.
- Official HF/GitHub `createdAt`, `updated`, and registry activity markers were used for discovery and classification only. They did not override a maker announcement date.
- No claim is made that every blocked archive was fully extractable. The configured provider ledger is complete, and unresolved access limits are explicitly recorded.

## Verification at edit stage

- **Expected final dataset:** 167 rows, 167 unique model names; newest `releaseDate` remains `2026-10-29`; correction row `Gemini 4 Carbon` is dated `2026-10-28`.
- **Cache key:** `20261101a` in `index.html`, the `src/app.js` model-data import, and the `src/app.js` dashboard-logic import.
- **Tracked paths intended for publication:** `src/modelData.js`, `scripts/verify-model-refresh.mjs`, `index.html`, `src/app.js`, `tests/modelData.test.js`, `tests/staticAssets.test.js`, and this ledger. The untracked screenshot remains untouched and uncommitted.
- **Tests:** `npm test` — **112 passed, 0 failed**.
- **Diff hygiene:** `git diff --check` — passed.
- **Dataset/checklist invariants:** `node scripts/verify-model-refresh.mjs --cutoff=2026-11-01` — **167 rows**, **167 unique models**, newest `2026-10-29`, **26 configured providers**, **4 missing labs**, **30 checklist headings**, **315 URL union**, no invariant errors.
- **Bounded HTTP smoke/source check:** `node scripts/verify-model-refresh.mjs --cutoff=2026-11-01 --http` checked **315 URLs**; **281 returned 2xx** and **34 returned non-2xx/network results**, with no invariant errors. The required smoke URLs passed. The new Google maker URL, exact Carbon AA model URL, and AA leaderboard all returned HTTP 200; the Easy Benchmarks Carbon URL returned a Model Not Found page and was not used as score evidence. The non-2xx set consisted of known OpenAI/xAI/IFM/Z.ai access blocks, the existing Agnes AA 404, two transient AA model-page timeouts, and X/social fetch failures. An independent reviewer replay observed **276 2xx / 39 non-2xx** against the same URL union; this point-in-time difference is endpoint/network volatility, not a dataset or invariant change.
- **Critical review/publication status:** independent fresh-context read-only review **PASS**. It found no critical or important findings; minor notes were pre-existing non-monotonic historical ordering and expected smoke-count volatility. No publication has occurred yet.
