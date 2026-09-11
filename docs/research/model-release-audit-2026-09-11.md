# Model release and AA Coding Index audit — 2026-09-11

This is the reproducible evidence ledger for the autonomous refresh performed on **2026-09-11**. Retrieval was cut off at **2026-09-11T07:17:40+02:00** (Europe/Amsterdam).

## Baseline and research window

- **Target branch/remote:** `main` / `https://github.com/jgordijn/agentic-model-release-tracker.git`
- **Base commit and previous data commit:** `aa682d8b260005a45a79c0e71e18e17d6ba2a555` — `feat: add MiniCPM5-2B release`.
- **Working-tree baseline:** only the pre-existing untracked `screenshots/baseline-local.png` was present; no unrelated tracked changes were present. The file was left untouched.
- **Previous dataset baseline:** 125 rows; newest tracked `releaseDate` was `2026-09-07` (`MiniCPM5-2B`).
- **Window:** inclusive `2026-09-07..2026-09-11` in Europe/Amsterdam. The `2026-09-07` boundary was rechecked so the existing OpenBMB row would not be duplicated.
- **Result:** two qualifying rows added; the dataset now contains 127 rows and its newest release date is `2026-09-10`.
- **Configured provider coverage:** 18 providers at baseline; Agnes AI was discovered as a qualifying new provider and added to `scripts/provider-release-sources.json`, bringing the checklist to 19 providers.
- **Explicit missing-lab list:** Amazon, Cohere, StepFun, and AI21 Labs; unchanged.

## Scope and score policy

Include base model lines and distinct specialized-base lines relevant to programming or agentic work. Exclude preview-only configurations, mini/nano/lite tiers, application or product features, partner integrations, quantizations, modality-only releases, and pure snapshots or aliases. Provider/API aliases are documented in notes rather than added as duplicate rows.

Maker availability/release evidence takes precedence over Artificial Analysis catalog dates and registry timestamps. When a dedicated official model page only exposes a documentation update marker rather than a separately stated launch timestamp, that limitation is recorded instead of presenting the marker as an unqualified launch announcement.

Scores are the exact **Artificial Analysis Coding Index** metric, not Intelligence Index, Agentic Index, Terminal-Bench, SWE-bench, or a maker-reported score. A score is stored only when the exact model/configuration and Coding Index value are independently visible. Both new rows therefore keep `codingIndex: null`; no sibling score, Intelligence Index value, or maker benchmark is copied into either row.

## Provider coverage and decisions

The bounded discovery pass used one targeted search query per configured provider and one per explicit missing lab. Search results were discovery leads only; no search snippet was used as release evidence. I then fetched the configured official surfaces and relevant official APIs/pages directly. The live Artificial Analysis leaderboard was fetched directly and mechanically inspected for records dated in the window.

### Configured providers

| Provider | Official surfaces checked | Decision through the retrieval cutoff |
|---|---|---|
| OpenAI | [News](https://openai.com/news/), [Index](https://openai.com/index/), [API model docs](https://platform.openai.com/docs/models) → [developers model docs](https://developers.openai.com/api/docs/models) | **Skip.** The bounded search pass returned only already tracked/older OpenAI release pages. The reachable model documentation did not expose a newer qualifying programming/agentic line after GPT-6 Astra. OpenAI news/index pages returned HTTP 403 to the direct fetch, so this is a bounded skip with that access limitation recorded. |
| Anthropic | [Newsroom](https://www.anthropic.com/news), [model overview](https://docs.anthropic.com/en/docs/about-claude/models) | **Skip.** The newsroom's newest qualifying model remains Claude Fable 5.1 from September 1. September 10's threat-intelligence report and the other September material are not new model releases. |
| Google | [Gemini models blog](https://blog.google/innovation-and-ai/models-and-research/gemini-models/), [developer-tools blog](https://blog.google/innovation-and-ai/technology/developers-tools/), [Gemini API model catalog](https://ai.google.dev/gemini-api/docs/models) | **Skip.** The API catalog says Gemini 3.8 Flash is available, which is already tracked. New preview, audio, image, speech, and other modality entries are excluded; no newer qualifying base or specialized coding/agent line was found. |
| Meta | [Hugging Face organization](https://huggingface.co/meta-models), [AI at Meta blog](https://ai.meta.com/blog/) | **Skip.** No post-boundary qualifying model release was exposed by the official organization or blog. Existing Muse lines remain the latest relevant Meta rows. |
| OpenBMB | [Hugging Face organization](https://huggingface.co/OpenBMB), [GitHub organization](https://github.com/OpenBMB), [MiniCPM repository](https://github.com/OpenBMB/MiniCPM) | **Skip as a new row.** MiniCPM5-2B on September 7 is already tracked. September 8–10 activity is the Demo Space, dataset releases, and GGUF/GPTQ/MLX/Midtrain artifacts for the same model; these are not new base model lines. |
| Apodex | [Home](https://www.apodex.com/), [release post](https://www.apodex.com/blog/apodex-1.1-scaling-agentic-intelligence-for-complex-work), [API page](https://www.apodex.com/api) | **Skip.** Apodex 1.1 remains the latest qualifying model. September 9–10 Framer publication/optimization metadata is page delivery metadata, not a new model release. |
| xAI | [News](https://x.ai/news), [developer model docs](https://docs.x.ai/developers/models) | **Skip.** The reachable model documentation still presents Grok 4.6 as the flagship coding/agent model and is last updated August 21. The xAI news page returned HTTP 403 and the bounded search pass found no later qualifying model. |
| Cursor | [Blog](https://cursor.com/blog) | **Skip.** September 10 Projects and September 2 self-hosted-machines entries are product/infrastructure features. No new Composer model line was found. |
| Mistral | [News](https://mistral.ai/news), [model overview](https://docs.mistral.ai/getting-started/models/models_overview/) | **Skip.** The official news and model catalog expose existing Mistral lines; no post-boundary qualifying programming/agentic model release was found. |
| Alibaba | [Qwen blog](https://qwen.ai/blog), [legacy Qwen blog](https://qwenlm.github.io/blog), [QwenCloud catalog](https://www.qwencloud.com/models) | **Skip as a new row.** QwenCloud explicitly describes Qwen3.8-Max-0902 as an upgraded snapshot of the already tracked Qwen3.8-Max family. Qwen3.8-Flash is already tracked. No new canonical family release was found. |
| Tencent | [UI-Mate](https://ui-mate.github.io/), [Hugging Face organization](https://huggingface.co/tencent), [GitHub organization](https://github.com/Tencent) | **Skip.** Recent activity is infrastructure, datasets, and maintenance around existing agent/GUI work; no new qualifying base or specialized-base release was found. |
| DeepSeek | [September 10 release](https://api-docs.deepseek.com/news/news260910), [change log](https://api-docs.deepseek.com/updates), [Transparency Center](https://www.deepseek.com/en/transparency/), official [V4.1-Flash model card](https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash) | **Add DeepSeek V4.1 Flash.** The official change log says DeepSeek officially released the model on September 10, made it live on the API, and documents the production alias `deepseek-flash`. It is a distinct text/vision model with agent/coding relevance; the alias is not a second row. |
| Moonshot.ai | [Platform changelog](https://platform.moonshot.ai/blog/posts/changelog), [Moonshot home](https://www.moonshot.ai/), [official Kimi account](https://x.com/Kimi_Moonshot) | **Skip.** Kimi K3 remains the latest qualifying release. No later model release was found in the official surfaces or bounded search pass. |
| MiniMax | [News](https://www.minimax.io/news), [research/blog](https://www.minimax.io/blog) | **Skip.** The official research index still shows M3 from June 1 as the latest relevant LLM. H3 is a previously tracked multimodal line and later speech/music/product entries are out of scope. |
| Z.ai | [Release notes](https://docs.z.ai/release-notes/new-released), [model docs](https://z.ai/model-api) | **Skip.** The release-note page ends with GLM-5.3-Flash on August 26, already tracked; no later qualifying model was found. |
| Xiaomi | [GitHub organization](https://github.com/XiaomiMiMo), [Hugging Face organization](https://huggingface.co/XiaomiMiMo) | **Skip.** September 10 activity is MiMo-Code repository maintenance and related tooling, not a new model release. |
| NVIDIA | [NVIDIA model catalog](https://build.nvidia.com/nvidia), [Hugging Face organization](https://huggingface.co/nvidia) | **Skip.** The window contains speech/media models, Nemotron math SFT/RL checkpoints, datasets, conversion/quantization assets, and platform entries. These are modality-only, training artifacts, datasets, or conversions rather than a new qualifying first-party base line. |
| IFM | [K2 Horizon overview](https://ifm.ai/k2/), [press release](https://ifm.ai/k2/press-release/), [docs](https://docs.ifm.ai/) | **Skip.** K2 Horizon from September 3 remains the latest IFM row. All three IFM pages were Cloudflare-blocked to the direct fetch in this run; no later lead appeared in the bounded search pass. |
| Agnes AI *(newly discovered provider)* | [Agnes AI site](https://agnes-ai.com/), [Agnes 3.0 Flash official docs](https://www.agnes-ai.com/zh-Hans/docs/agnes-30-flash), [API platform](https://platform.agnes-ai.com), [official GitHub organization](https://github.com/AgnesAI-Labs) | **Add Agnes 3.0 Flash.** The official model documentation describes a new text model for agent programming, tool orchestration, long-task context, and end-to-end delivery. Its JSON-LD `dateModified` is September 8; because the page does not state a separate launch timestamp, that marker is used as the earliest maker documentation/availability date and the limitation is preserved in the row notes. The official source set and bounded search queries were added to `scripts/provider-release-sources.json`. |

### Explicitly missing labs

| Lab | Official surfaces checked | Decision through the retrieval cutoff |
|---|---|---|
| Amazon | [AWS What's New RSS](https://aws.amazon.com/about-aws/whats-new/recent/feed/), [Amazon Nova](https://aws.amazon.com/ai/generative-ai/nova/), [AWS ML blog](https://aws.amazon.com/blogs/machine-learning/), [Amazon Hugging Face API](https://huggingface.co/api/models?author=amazon&sort=createdAt&direction=-1&limit=100) | **Skip.** September 8–10 items are SageMaker/Bedrock infrastructure and product features; no new Amazon Nova or other qualifying base model was found. |
| Cohere | [Changelog](https://docs.cohere.com/changelog), [blog](https://cohere.com/blog), [model docs](https://docs.cohere.com/docs/models), [Cohere Labs organization](https://huggingface.co/CohereLabs) | **Skip.** North Small Translate 1.0 on September 9 is a machine-translation model, and North Micro Vision is modality-specific; neither is a programming/agentic base line. |
| StepFun | [StepFun site](https://www.stepfun.com/), [Step 3.7 Flash docs](https://platform.stepfun.com/docs/zh/guides/models/step-3.7-flash), [GitHub organization](https://github.com/stepfun-ai), [Hugging Face organization](https://huggingface.co/stepfun-ai) | **Skip.** The window shows existing Step 3.7/GGUF activity and papers, not a new qualifying model family. |
| AI21 Labs | [Blog](https://www.ai21.com/blog/), [docs changelog](https://docs.ai21.com/changelog), [Hugging Face organization](https://huggingface.co/ai21labs) | **Bounded skip.** No post-boundary qualifying model was exposed by the reachable official surfaces or the bounded search pass. |

## Added release ledger

| Model | Maker release/availability date | Provider | Category | Coding Index | Maker source | Exact AA row/configuration |
|---|---:|---|---|---:|---|---|
| Agnes 3.0 Flash | 2026-09-08* | Agnes AI / Sapiens AI | base | unknown | [official Agnes 3.0 Flash docs](https://www.agnes-ai.com/zh-Hans/docs/agnes-30-flash) | [AA model page](https://artificialanalysis.ai/models/agnes-3-0-flash); catalog row `Agnes 3.0 Flash`, reasoning, no effort suffix, catalog `releaseDate=2026-09-11`; no exact Coding Index field in the fetched pages |
| DeepSeek V4.1 Flash | 2026-09-10 | DeepSeek | base | unknown | [official DeepSeek release](https://api-docs.deepseek.com/news/news260910) | [AA model page](https://artificialanalysis.ai/models/deepseek-v4-1-flash); catalog row `DeepSeek V4.1 Flash (Reasoning, Max Effort)`, `releaseDate=2026-09-10`; no exact Coding Index field in the fetched pages |

\* The Agnes date is the official documentation page's JSON-LD `dateModified` marker (`2026-09-08T07:30:32.100Z`), used as the earliest maker documentation/availability marker because the page does not state a separate launch timestamp. The Artificial Analysis catalog date is kept as catalog evidence, not silently substituted for the maker date.

## Artificial Analysis audit, aliases, and exclusions

- The live [Artificial Analysis model leaderboard](https://artificialanalysis.ai/leaderboards/models) was fetched directly during this refresh. The embedded catalog records in the inclusive window were: existing `MiniCPM5-2B` (OpenBMB, September 7); `DeepSeek V4.1 Flash` (DeepSeek, September 10); `Ling-3.0-flash-VL` (InclusionAI, September 10); and `Agnes 3.0 Flash` (Sapiens AI, September 11).
- `Ling-3.0-flash-VL` is a modality-only vision-language line. It was explicitly skipped; it did not qualify as a new programming/agentic base row, and no maker source for a qualifying broader line was found in the bounded pass. InclusionAI was therefore not added to the provider checklist.
- The AA model pages for both new rows returned HTTP 200, but their fetched HTML contained no `codingIndex` field or visible exact Coding Index value. The leaderboard HTML likewise exposed no exact Coding Index field for these records at this retrieval point. The dashboard therefore stores `null` for both scores.
- DeepSeek's official `deepseek-flash` API name is an alias for V4.1 Flash, not a separate release. No alias row was added.
- The AA page's metric content and the maker pages contain other benchmark/Intelligence data, including Terminal-Bench and other maker claims. None was converted into Coding Index. No Easy Benchmarks mirror was needed for either new row.
- Existing scored rows were not rewritten from this fetch: the current AA HTML did not expose a comparable Coding Index field for a safe whole-dataset score-parity refresh. Existing score/configuration provenance remains as documented by prior dated ledgers; this run claims no score snapshot refresh beyond the two new unknowns.
- Explicitly skipped discovery leads included OpenBMB quantized/checkpoint/demo artifacts, Cohere North Small Translate 1.0 and North Micro Vision, NVIDIA Nemotron math SFT/RL and media/speech assets, Qwen3.8-Max-0902 (an upgraded snapshot), Cursor Projects/self-hosted machines, Anthropic threat/security reports, Amazon SageMaker/Bedrock features, and Apodex page publication metadata.

## Evidence limits

- Search results were bounded to one targeted pass per configured provider and missing lab, with only narrow exact follow-up searches for the two AA-discovered candidates. Empty search results were not treated as proof of non-existence; configured official pages, registries, feeds, and APIs were fetched directly.
- OpenAI news/index, xAI news, and all IFM pages were blocked (HTTP 403/Cloudflare) by direct fetch during this run. Complementary official model documentation and bounded discovery results were used; those providers are not claimed exhaustive beyond the retrieval cutoff.
- Dynamic provider pages and the Artificial Analysis catalog can change after this cutoff. This ledger does not claim coverage after `2026-09-11T07:17:40+02:00`.
- Registry `lastModified`/`createdAt`, page-wide `updatedAt`, Framer publication metadata, and benchmark catalog release dates were used for discovery or cross-checking only. They were not silently treated as maker release dates except for Agnes's explicitly documented official-doc marker, which is flagged above.
