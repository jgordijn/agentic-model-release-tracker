# Model-release audit — 2026-11-18

## Baseline, window, and policy

- **Repository/branch:** `agentic-model-release-tracker`, direct `main` working tree; no worktree and no PR.
- **Remote:** `origin` → `https://github.com/jgordijn/agentic-model-release-tracker.git`.
- **HEAD / `origin/main` before this refresh:** `b3d7bacd6b9720bad26530433f3834f8f9b8a70b`, `feat(data): correct NVIDIA Sigma release coverage`, committed `2026-11-17T06:26:34Z`.
- **Latest data commit before this refresh:** the same `b3d7bacd6b9720bad26530433f3834f8f9b8a70b`.
- **Working-tree baseline:** 178 rows, 178 unique model names; newest tracked `releaseDate` was `2026-11-16` (`Qwen4 Max`). The pre-existing untracked `screenshots/baseline-local.png` was left untouched. No unrelated tracked changes were present at start.
- **Research cutoff:** `2026-11-18` in `Europe/Amsterdam`; the run started at `2026-11-18T07:00:26+01:00`.
- **Current research window:** inclusive `2026-11-16` through `2026-11-18`, using the newest tracked `releaseDate` as the lower boundary. `Qwen4 Max` was rechecked rather than duplicated.
- **Scope:** add only maker-released base model lines or clearly differentiated specialized-base lines relevant to programming or agentic work. Exclude product features, provider integrations, modality-only releases, quantizations, pure snapshots/checkpoints, API aliases, mini/nano/lite tiers, preview-only configurations, and fine-tuned decision/product artifacts.
- **Metric rule:** `codingIndex` is populated only from an exact Artificial Analysis Coding Index row for the exact model/configuration. Intelligence Index, Coding Agent Index, FrontierCode, Terminal-Bench, SWE-bench, maker scores, and other metrics are never substituted for Coding Index. Unknown exact Coding Index values remain `null`.

## Required checklist and bounded retrieval

- The required pre-edit command ran first: `node scripts/check-provider-releases.mjs --markdown`. With the 2026-11-16 baseline it used `since 2026-11-16` and emitted 31 provider headings: 27 configured providers plus 4 explicit missing labs.
- One bounded configured discovery query was run for each provider/missing lab: 31 targeted web-search queries total. Search snippets were discovery leads only; no snippet was used as final maker evidence and no second broad provider sweep was launched.
- Representative/current primary archive, documentation, registry, and model-card surfaces were directly extracted or probed for every configured provider and explicit missing lab. Blocked, dead, and incomplete surfaces are recorded below as evidence limits rather than converted into claims of absence.
- The live Artificial Analysis model leaderboard was directly fetched with HTTP 200. It visibly lists GPT-6.2 Astra (max, Intelligence Index 62) and GPT-6.2 Sol (max, Intelligence Index 57); no Hy4 flash row was visible. The leaderboard is an Intelligence page and was not used as a Coding Index substitute.
- The exact Artificial Analysis model pages for GPT-6.2 Astra and GPT-6.2 Sol were directly fetched. They expose Intelligence Index values and configurations, but no exact dashboard Coding Index field. The current AA coding route resolves to the Coding Agent Index, which is a different metric and was explicitly rejected. Easy Benchmarks exact pages for both GPT-6.2 models and Hy4 flash returned Model Not Found; the mirror was used only as secondary evidence for unknown scores.

## Provider coverage and decisions

Every configured provider and explicit missing lab below was checked against its configured source set and one bounded configured search query. “No add” means no additional qualifying current-window model was verified. The three additions are the two OpenAI base lines and the distinct Tencent Hy4 Flash base line.

### Configured providers

- **OpenAI — add two.** Checked `https://openai.com/news/`, `https://openai.com/index/`, `https://platform.openai.com/docs/models`, and the exact announcement [Introducing GPT-6.2 Astra and Sol](https://openai.com/index/introducing-gpt-6-2-astra-sol/). The official archive dates the announcement November 17, 2026 and the article documents distinct `gpt-6.2-astra` and `gpt-6.2-sol` API models for coding and multistep agentic work. `Astra for Law` is a configuration/product specialization, not a second row; Ultrafast is a serving configuration, not a second row.
- **Anthropic — no add.** Checked `https://www.anthropic.com/news` and the exact [Fable/Mythos 5.2 announcement](https://www.anthropic.com/claude-fable-and-mythos-5-2). Although the newsroom hero currently displays November 18, the exact announcement and archive listing are dated November 9, 2026; `Claude Fable 5.2` is already tracked. Fable and Mythos are explicitly the same underlying model, so no duplicate Mythos row is added.
- **Google — no add.** Checked the Gemini model archive and API model catalog. Both still lead with the already tracked Gemini 4 Hydrogen/Carbon/Argon family; no later qualifying Gemini/Gemma base line was verified.
- **Meta — no add.** Checked the Meta AI blog, developer/model surfaces, and official Hugging Face organization. The blog’s latest model announcement remains Muse Spark 1.1 from July; current activity did not expose a post-cutoff qualifying base line.
- **OpenBMB — no add.** Checked the official MiniCPM repository/Hugging Face surfaces. Current repository material concerns the already tracked MiniCPM5 family, demos, and packaging; no post-cutoff programming/agentic base release was verified.
- **Apodex — no add.** Checked the official blog and model/API surfaces. Apodex 1.1 remains the latest qualifying line; Mini, Deep Research, benchmark, and product material remain outside the row policy.
- **xAI — no add.** Checked [xAI News](https://x.ai/news) and model documentation. November 16 material is Grok Bot accounting/product content; the latest qualifying model release remains Grok 4.7 from September 21. Product bots and integrations are excluded.
- **Cursor — no add.** Checked the Cursor blog. November 10/13 entries are product/security updates; no Composer model release was found in the window.
- **Mistral — no add.** Checked the Mistral news archive and model documentation. Current archive material is Studio/product or the already tracked Le Chonk/Mistral Large 4 line; no later qualifying base model was verified.
- **Alibaba — no add beyond Qwen4 Max.** Checked Qwen blog and Qwen Cloud. Qwen Cloud confirms the existing Qwen4-Max coding/agentic line; no later qualifying model appeared. Qwen3.8-Flash is an older existing family in the project and not a new current-window release.
- **Tencent — add one.** Checked UI-Mate, Tencent/Hunyuan GitHub and Hugging Face surfaces, the new official [Hy4 flash model card](https://huggingface.co/tencent/Hy4-flash), [Hy4 flash repository](https://github.com/Tencent-Hunyuan/Hy4-flash), [ModelScope card](https://modelscope.cn/models/Tencent-Hunyuan/Hy4-flash), and the [TokenHub model list](https://cloud.tencent.com/document/product/1823/130051). The official card exposes `Hy4 flash`, `Hy4 flash-FP8`, and pretrained `Hy4 flash-base`; the registry createdAt marker is November 17 and TokenHub’s page was updated November 17. The model introduces distinct hybrid-attention, LatentMoE, and Engram architecture compared with Hy4 and is a new base line. FP8/instruct/base artifacts are collapsed into one row; `hy4-preview` remains excluded. The exact Hy4 flash sources and two bounded queries were added to `provider-release-sources.json` for future coverage.
- **China Mobile — no add; registry evidence limited.** Checked the China Mobile news surface, Jiutian/model documentation, and ModelScope. No post-cutoff qualifying model release was verified; the existing JT-4.1 line remains current.
- **DeepSeek — no add.** Checked DeepSeek API documentation/news surfaces. Current docs describe the existing `DeepSeek-V4.1-Flash-1017` service alias and DeepSeek Harness developer preview; these are not a new model family release.
- **Moonshot.ai — no add; some surfaces limited.** Checked the accessible Kimi platform changelog and configured Kimi surfaces. No current-window model release was verified; speed variants and aliases remain collapsed under their existing family rows.
- **MiniMax — no add.** Checked MiniMax news/model navigation. M3.1 Flash is already tracked; H3, image, speech, music, and MiniMax Code entries are modality/product/harness material and excluded.
- **Z.ai — no add.** The configured blog returned 404, but the official [release notes](https://docs.z.ai/release-notes/new-released) are accessible and end with GLM-5.3-Flash on August 26 and GLM-5.3 on August 18. No later qualifying model was verified.
- **Xiaomi — no add.** Checked the Xiaomi MiMo GitHub/Hugging Face organization and model site. November 17 activity is MiMo-Code/harness activity; no new base model was verified.
- **NVIDIA — no add; quantization skipped.** Checked NVIDIA’s official Hugging Face organization and model surfaces. `Qwen3.8-Flash-Next-NVFP4-QAD` was created November 17, but it is a NVIDIA ModelOpt/QAD packaging/quantization artifact of an existing Qwen family, not a new maker base line.
- **IFM — no add.** Checked the K2/Jais official pages and registry. Existing K2 Horizon and Jais 3 families remain the latest qualifying lines; no post-cutoff release was verified.
- **Agnes AI — no add.** The official registry shows Agnes 2.5 Pro Theta created November 15, before the inclusive window’s new-release boundary and already tracked. No later qualifying model was verified.
- **InclusionAI — no add; modality-only skip.** The official registry shows `invoker-render-1.0` created November 16, but it is a video-to-video/rendering model and fails the programming/agentic base-model scope. No later qualifying language/agent model was verified.
- **Inception — no add.** Checked the official blog and model surfaces. Mercury 3 from October 19 remains the latest qualifying base line; Mercury Voice and Mercury Decide are excluded modality/decision products.
- **IBM Granite — no add.** Checked IBM Research’s blog and Granite/Hugging Face surfaces. November 17 research material is hardware/sensing rather than a Granite model release; no later qualifying line was verified.
- **LongCat — no add; archive limited.** The configured LongCat blog route returned a resource-not-found response; no post-cutoff qualifying model surfaced through the accessible registry/repository paths or bounded query. This remains a named evidence limit.
- **Thinking Machines — no add; format variant skipped.** The official Inkling 2 Small announcement is dated November 5. `Inkling-2-Small-MXFP8` registry activity around November 17 is a format/quantization variant of the existing row, not a new release.
- **Arcee AI — no add.** Checked Arcee’s model page, Trinity page, docs, and Hugging Face organization. Recent activity concerns existing Trinity variants, including preview/size/format variants; no new qualifying family release was verified.
- **Celeris — no add.** Checked the official Celeris pages and blog. The latest model-related announcement is Celeris-1.1 Decision from November 5; decision/serving material is outside the current window and base-model row policy.

### Explicitly missing labs

- **Amazon — no add; remains missing.** Checked AWS What’s New and Amazon Science RSS. November 17 entries are AWS services, agents, and infrastructure announcements, not a new Nova/base model.
- **Cohere — no add; remains missing.** Checked Cohere’s blog, release notes, and CohereLabs registry. Recent material is Embed/Rerank, North/Model Vault serving, retrieval, or other integration/modality scope; no new general programming/agentic base model was verified.
- **StepFun — skip; remains missing.** Checked StepFun’s official site and Hugging Face organization. `Step-5-Preview` and its BF16/NVFP4 artifacts are explicitly preview-only; no eligible release was found.
- **AI21 Labs — unresolved/no add; remains missing.** The official blog was anti-bot blocked by the extractor, while Studio exposed a post-training service and older October research rather than a verifiable current Jamba/base-model release. This is incomplete coverage, not proof of absence.

## Candidate ledger

| Candidate | Provider | Release date | Maker/source evidence | Scope decision | Exact score evidence |
|---|---|---:|---|---|---|
| **GPT-6.2 Astra** | OpenAI | 2026-11-17 | [OpenAI announcement](https://openai.com/index/introducing-gpt-6-2-astra-sol/) and [API model catalog](https://platform.openai.com/docs/models) identify a new `gpt-6.2-astra` model for complex work, coding, and agents. | **Add** one `base` row. `Astra for Law` and Ultrafast are configurations, not separate releases. | `codingIndex: null`; exact [AA model page](https://artificialanalysis.ai/models/gpt-6-2-astra) retrieved 2026-11-18 reports Intelligence Index **62**, `max`, separately stored. No Coding Index field; [Easy Benchmarks exact page](https://easy-benchmarks.com/models/gpt-6-2-astra) returned Model Not Found. |
| **GPT-6.2 Sol** | OpenAI | 2026-11-17 | Same official OpenAI announcement and API catalog identify a distinct `gpt-6.2-sol` base model for coding and multistep agentic workflows. | **Add** one `base` row. Ultrafast is not a model row. | `codingIndex: null`; exact [AA model page](https://artificialanalysis.ai/models/gpt-6-2-sol) retrieved 2026-11-18 reports Intelligence Index **57**, `max`, separately stored. No Coding Index field; [Easy Benchmarks exact page](https://easy-benchmarks.com/models/gpt-6-2-sol) returned Model Not Found. |
| **Hy4 flash / FP8 / base artifacts** | Tencent | 2026-11-17 | Official [Hugging Face card](https://huggingface.co/tencent/Hy4-flash), [GitHub repository](https://github.com/Tencent-Hunyuan/Hy4-flash), [ModelScope card](https://modelscope.cn/models/Tencent-Hunyuan/Hy4-flash), and [TokenHub list](https://cloud.tencent.com/document/product/1823/130051). | **Add one** `base` row named `Tencent Hy4 Flash`; collapse instruct, FP8, and pretrained-base artifacts. Do not add `hy4-preview`. | `codingIndex: null`; no Hy4 flash row on the fetched AA leaderboard, checked AA candidate URL returned 404, and [Easy Benchmarks exact page](https://easy-benchmarks.com/models/hy4-flash) returned Model Not Found. No Intelligence Index was substituted. |
| **Claude Fable/Mythos 5.2** | Anthropic | 2026-11-09 | Exact maker announcement and archive listing are dated November 9, despite the current newsroom hero banner saying November 18. | **Retain existing row; no duplicate.** Anthropic says Fable and Mythos are the same underlying model. | Existing Intelligence Index 65/max retained; no exact Coding Index field. |
| **Qwen4 Max** | Alibaba | 2026-11-16 | Existing [Qwen announcement](https://qwen.ai/blog?id=qwen4-max), Qwen Cloud page, and AA catalog rechecked. | **Retain existing row; no duplicate.** | Existing Intelligence Index 43/default retained; no exact Coding Index field. |
| **NVIDIA Qwen3.8-Flash-Next-NVFP4-QAD** | NVIDIA | 2026-11-17 registry marker | Official NVIDIA Hugging Face registry entry is ModelOpt/QAD packaging for an existing Qwen family. | **Skip quantization/package artifact.** | No Coding Index lookup; no sibling score copied. |
| **Inkling-2-Small-MXFP8** | Thinking Machines | 2026-11-17 activity marker | Official registry update is an MXFP8 format variant of the already tracked Inkling 2 Small. | **Skip quantization/format variant.** | No Coding Index lookup. |
| **InclusionAI invoker-render-1.0** | InclusionAI | 2026-11-16 registry marker | Official registry labels it video-to-video/rendering. | **Skip modality-only release.** | No Coding Index lookup. |
| **All other configured providers and missing labs** | Various | — | Each configured source set, bounded query, and direct archive/registry check is summarized above. | **No additional qualifying model verified**, with AI21 explicitly unresolved because of anti-bot access. | Existing scores unchanged; unknowns remain unknown. |

## Exact score and configuration audit

- **Rows added:** 3 (`GPT-6.2 Astra`, `GPT-6.2 Sol`, `Tencent Hy4 Flash`).
- **Rows with changed existing Coding Index:** none.
- **New Coding Index values:** none. All three additions retain `codingIndex: null` because no exact AA Coding Index row/configuration was independently verifiable.
- **New Intelligence Index values:** GPT-6.2 Astra **62**, `max`, exact AA model URL; GPT-6.2 Sol **57**, `max`, exact AA model URL. These are stored in `intelligenceIndex` fields and never copied into `codingIndex`.
- **AA metric separation:** the live AA pages and leaderboard expose the Intelligence Index. The currently accessible AA Coding route exposes the **Coding Agent Index**, not the dashboard’s historical Coding Index, so no Coding Agent/FrontierCode/Terminal-Bench value was used.
- **Mirror policy:** Easy Benchmarks was used only for exact-page Model Not Found checks. No mirror value was described as directly verified from Artificial Analysis, and no mirror score was stored.
- **Alias/variant policy:** GPT API IDs are aliases for their canonical named rows; Astra for Law and Ultrafast are configurations. `Hy4 flash`, `hy4-flash`, `tencent/Hy4-flash`, `Hy4 flash-FP8`, `tencent/Hy4-flash-FP8`, `Hy4 flash-base`, and the corresponding ModelScope IDs are one family row; `hy4-preview` is excluded.

## Evidence limits

- Search retrieval was bounded to one configured query per provider/missing lab (31 total), plus only narrow exact-candidate and score follow-ups.
- Direct extraction limitations include Tencent’s official research page returning EdgeOne HTTP 567 while its official HF/GitHub/ModelScope/docs surfaces were accessible; the Z.ai blog and LongCat blog routes were unavailable but alternate official docs/registry evidence was checked; Agnes’s homepage was blocked; DeepSeek’s old news index route returned 404 while current docs were accessible; and the AI21 blog was anti-bot blocked.
- Registry timestamps were used only as public-availability fallback evidence when no dated maker announcement was available. They were not treated as release dates for quantizations, checkpoints, or aliases.
- The AA leaderboard is dynamic and primarily exposes Intelligence Index rows. The retrieved AA pages did not expose the exact historical Coding Index for the three additions. User-provided visual evidence was not used; all score claims above are from fetched pages.
- No qualifying provider outside the existing 27-provider checklist was discovered. Tencent’s exact Hy4 flash surfaces were added to the existing provider checklist because the qualifying release was found on a source path not previously listed.

## Verification at edit stage

- **Expected final dataset:** 181 rows, 181 unique model names; newest `releaseDate` `2026-11-17`.
- **Cache key:** `20261118a` in `index.html`, the `src/app.js` model-data import, and the `src/app.js` dashboard-logic import.
- **Intended tracked paths:** `src/modelData.js`, `scripts/provider-release-sources.json`, `index.html`, `src/app.js`, `scripts/verify-model-refresh.mjs`, `tests/modelData.test.js`, `tests/staticAssets.test.js`, and this ledger. The pre-existing untracked screenshot remains untouched and uncommitted.
- **Tests:** `npm test` — **121 passed, 0 failed**.
- **Diff hygiene:** `git diff --check` passed.
- **Provider checklist:** `node scripts/check-provider-releases.mjs --markdown` emitted **31 provider headings** plus the `Explicitly missing labs` section marker; the output includes all 27 configured providers and 4 missing labs. The post-edit default boundary is `since 2026-11-17` because the new dataset newest date is November 17.
- **Dataset/checklist invariants:** `node scripts/verify-model-refresh.mjs --cutoff=2026-11-18` confirmed **181 rows**, **181 unique models**, newest `2026-11-17`, **27 configured providers**, **4 missing labs**, **31 checklist headings**, URL union **346**, and no invariant errors.
- **Bounded HTTP smoke/source check:** `node scripts/verify-model-refresh.mjs --cutoff=2026-11-18 --http` checked **346 URLs**: **277 returned 2xx** and **69 returned non-2xx/network results**, with **no invariant errors**. The three new required candidate URLs (the two exact AA model pages and the Tencent Hy4 flash card) passed. Non-2xx results are documented upstream limitations: historical AA 404s, OpenAI/IFM WAF 403s, X/Twitter and several provider network failures, stale/dead mirror URLs, and registry access errors; the smoke is a point-in-time reachability check, not a claim that every historical source remains live.
