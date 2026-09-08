# Model release and AA Coding Index audit — 2026-09-08

This is the reproducible evidence ledger for the refresh performed on **2026-09-08**. Retrieval was cut off at **2026-09-08T07:25:59+02:00** (Europe/Amsterdam).

## Baseline and research window

- **Target branch/remote:** `main` / `https://github.com/jgordijn/agentic-model-release-tracker.git`
- **Base commit and previous data commit:** `7af6654a3b0c2b5524651f53a66fb01d3cbd9fee` — `feat: refresh model releases through 2026-09-03`.
- **Previous dataset baseline:** 124 rows; newest tracked `releaseDate` was `2026-09-03` (`GPT-6 Astra` and `K2 Horizon 375B A23B`).
- **Window:** inclusive `2026-09-04..2026-09-08` in Europe/Amsterdam, with one bounded Artificial Analysis model-catalog discovery pass and one narrowly targeted OpenBMB follow-up after the new creator appeared in that catalog.
- **Result:** one qualifying row added; the dataset now contains 125 rows and its newest release date is `2026-09-07`.

## Scope and score policy

Include base model lines and distinct specialized-base lines relevant to programming or agentic work. Exclude preview-only configurations, mini/nano/lite tiers, application or product features, partner integrations, quantizations, modality-only releases, and pure snapshots or aliases. A family name such as MiniCPM is not treated as a mini-tier sibling when the maker releases a distinct dense base model and documents coding-agent/tool-use scope; the model's SFT, midtrain, pretraining-only base checkpoint, quantized formats, and draft/speculator artifacts remain excluded.

Maker availability/release dates take precedence over Artificial Analysis release dates and registry timestamps. The OpenBMB GitHub README explicitly dates the final MiniCPM5-2B release to September 7; the Hugging Face final-model asset was created on September 6 and is treated as registry timing rather than the maker release date.

Scores are the exact **Artificial Analysis Coding Index** metric, not the Intelligence Index, Agentic Index, Terminal-Bench, SWE-bench, or a maker-reported score. The dashboard stores one decimal. If no exact Coding Index field is independently verifiable, the score remains `null`.

## Provider coverage and decisions

The bounded search pass returned no indexed search results for the configured provider queries or the four missing-lab queries. I therefore pivoted to the configured first-party surfaces, official feeds, official GitHub organizations, official Hugging Face organizations, model catalogs, and the live Artificial Analysis leaderboard. Search snippets were not used as release or score evidence.

### Configured providers

| Provider | Official surfaces checked | Decision through the retrieval cutoff |
|---|---|---|
| OpenAI | [News](https://openai.com/news/), [Index](https://openai.com/index/), [API model docs](https://platform.openai.com/docs/models) | **Skip.** September 6 posts (`An Alien Mind` and the research-acceleration article) are research/company material; no new base or specialized programming/agentic model after GPT-6 Astra was found. |
| Anthropic | [Newsroom](https://www.anthropic.com/news), [model overview](https://docs.anthropic.com/en/docs/about-claude/models) | **Skip.** Claude Fable 5.1 on September 1 remains the newest qualifying model; no September 4–8 model release was found. |
| Google | [Gemini models blog](https://blog.google/innovation-and-ai/models-and-research/gemini-models/), [developer-tools blog](https://blog.google/innovation-and-ai/technology/developers-tools/), [Gemini API model catalog](https://ai.google.dev/gemini-api/docs/models) | **Skip.** The catalog was last updated September 4 but still lists the already tracked Gemini 3.8 Flash and no newer qualifying base line. Image, speech, preview, and other modality/configuration entries remain excluded. |
| Meta | [Hugging Face organization](https://huggingface.co/meta-models), [AI at Meta blog](https://ai.meta.com/blog/) | **Skip.** The official organization still exposes the previously tracked Muse Glimmer line; the blog has no post-cutoff qualifying model release. |
| OpenBMB *(newly discovered provider)* | [Hugging Face organization](https://huggingface.co/OpenBMB), [GitHub organization](https://github.com/OpenBMB), [MiniCPM repository](https://github.com/OpenBMB/MiniCPM), [MiniCPM5-2B model card](https://huggingface.co/openbmb/MiniCPM5-2B) | **Add MiniCPM5-2B.** The maker README records the September 7 release and explicitly describes coding, tool-use, coding-agent, and agentic-task capabilities. The official source set and search queries were added to `scripts/provider-release-sources.json` for future sweeps. |
| Apodex | [Home](https://www.apodex.com/), [release post](https://www.apodex.com/blog/apodex-1.1-scaling-agentic-intelligence-for-complex-work), [API model page](https://www.apodex.com/api) | **Skip.** Apodex 1.1 on August 24 remains the latest qualifying model; no later release was found. |
| xAI | [News](https://x.ai/news), [developer model docs](https://docs.x.ai/developers/models) | **Skip.** September 4 procurement and the September 3 Grok Bot posts are product/agent availability material, not a new base model line. The latest qualifying model remains Grok 4.6 from August 12. |
| Cursor | [Blog](https://cursor.com/blog), including the September 4 customer story and September 2 self-hosted-machines post | **Skip.** Customer stories, self-hosted machines, and cloud-agent changes are product/infrastructure updates; no new Composer model line was found. |
| Mistral | [News](https://mistral.ai/news), [model overview](https://docs.mistral.ai/getting-started/models/models_overview/) | **Skip.** The official catalog and news surface expose existing Mistral lines; no post-cutoff qualifying programming/agentic model release was found. |
| Alibaba | [Qwen blog redirect](https://qwenlm.github.io/blog), [Qwen research/blog](https://qwen.ai/blog), [QwenCloud catalog](https://www.qwencloud.com/models) | **Skip as a new row.** Qwen3.8-Max-0902 is explicitly an upgraded snapshot of the already tracked Qwen3.8-Max family; no new canonical family release was found in the window. |
| Tencent | [UI-Mate site](https://ui-mate.github.io/), [Hugging Face organization](https://huggingface.co/tencent), [GitHub organization](https://github.com/Tencent) | **Skip.** Recent activity is ContextPilot maintenance, EVIE/embedding assets, datasets, and other infrastructure; no new qualifying base or specialized-base model release was found. |
| DeepSeek | [Configured news URL](https://api-docs.deepseek.com/news/) and [Transparency Center](https://www.deepseek.com/en/transparency/) | **Bounded skip.** The configured news URL currently returns a 404, while the official Transparency Center lists V4.0 from April 24 and V3.2 from December 1; no newer model release was exposed by the reachable official surface. |
| Moonshot.ai | [Platform changelog](https://platform.moonshot.ai/blog/posts/changelog), [Moonshot home](https://www.moonshot.ai/), [official Kimi account](https://x.com/Kimi_Moonshot) | **Skip.** The platform changelog is stale relative to the current Kimi site; the site lists Kimi K3 from July 16 and the official account's latest posts are product/workflow updates, not a new model. |
| MiniMax | [News](https://www.minimax.io/news), [research/blog](https://www.minimax.io/blog) | **Skip.** The latest qualifying LLM remains MiniMax M3 from June 1. Later visible material is music, H3 multimodal/video, product, or agent-feature content. |
| Z.ai | [Configured blog](https://z.ai/blog) and [release notes](https://docs.z.ai/release-notes/new-released) | **Skip.** The blog URL returns 404; the reachable release notes end with GLM-5.3-Flash on August 26, already tracked. |
| Xiaomi | [GitHub organization](https://github.com/XiaomiMiMo), [Hugging Face organization](https://huggingface.co/XiaomiMiMo) | **Skip.** September 8 repository activity is maintenance for MiMo-Code and related projects; the official model organization contains existing July MiMo assets and no newer qualifying release. |
| NVIDIA | [NVIDIA model catalog](https://build.nvidia.com/nvidia), [Hugging Face organization](https://huggingface.co/nvidia) | **Skip.** Recent Hugging Face entries include quantized/conversion artifacts such as Qwen3.8-Flash-Next-NVFP4 and DeepSeek V4 NVFP4; these are not new first-party base lines. The catalog has no newer qualifying Nemotron release after the tracked June/August entries. |
| IFM | [K2 Horizon overview](https://ifm.ai/k2/), [press release](https://ifm.ai/k2/press-release/), [docs](https://docs.ifm.ai/) | **Skip.** K2 Horizon was released September 3 and is already the newest IFM row; no later release was found. |

### Explicitly missing labs

| Lab | Official surfaces checked | Decision through the retrieval cutoff |
|---|---|---|
| Amazon | [AWS What's New RSS](https://aws.amazon.com/about-aws/whats-new/recent/feed/), [Amazon Nova](https://aws.amazon.com/ai/generative-ai/nova/), [AWS ML blog](https://aws.amazon.com/blogs/machine-learning/), [Amazon Hugging Face API](https://huggingface.co/api/models?author=amazon&sort=createdAt&direction=-1&limit=100) | **Skip.** September 4 AWS items are Bedrock Knowledge Base connectors/setup features; the Nova page exposes the existing Nova portfolio and services, not a new post-cutoff base model. Registry results are older research/checkpoint artifacts. |
| Cohere | [Changelog](https://docs.cohere.com/changelog), [blog](https://cohere.com/blog), [model docs](https://docs.cohere.com/docs/models), [Hugging Face organization](https://huggingface.co/CohereLabs) | **Skip.** Cohere Parse on August 27 is a document-parsing model/service, not a programming/agentic base line. North Mini Code is a June 9 release outside this window and is excluded by the existing mini-tier rule. Hugging Face's newer visible entries are North Micro Vision, transcription, datasets, or existing checkpoints. |
| StepFun | [StepFun site](https://www.stepfun.com/), [Step 3.7 Flash docs](https://platform.stepfun.com/docs/zh/guides/models/step-3.7-flash), [GitHub organization](https://github.com/stepfun-ai), [Hugging Face organization](https://huggingface.co/stepfun-ai) | **Skip.** The official Step 3.7 Flash page is an existing model line; September 4 GitHub activity is training/infrastructure maintenance and the model registry's newest model assets are from May/June. |
| AI21 Labs | [Blog](https://www.ai21.com/blog/), [latest verifier article](https://www.ai21.com/blog/you-need-a-verifier/), [docs changelog](https://docs.ai21.com/changelog), [Hugging Face organization/API](https://huggingface.co/ai21labs) | **Bounded skip.** The August 19 verifier article is research about an agentic system, not a model release. The reachable changelog's newest model release is Jamba Reasoning 3B from October 2025; registry entries are January/February 2026 Jamba2 assets, with no post-cutoff model. |

## Added release ledger

| Model | Release date | Provider | Category | Coding Index | Maker source | Exact AA row/configuration |
|---|---:|---|---|---:|---|---|
| MiniCPM5-2B | 2026-09-07 | OpenBMB | base | 14.5 | [OpenBMB MiniCPM repository](https://github.com/OpenBMB/MiniCPM) | [AA model identity page](https://artificialanalysis.ai/models/minicpm5-2b) and [live Coding Index leaderboard data](https://artificialanalysis.ai/leaderboards/models); record `MiniCPM5-2B`, reasoning, no effort suffix, raw `codingIndex=14.5005375225413` → `14.5` |

### Selection notes

- **MiniCPM5-2B:** OpenBMB's README changelog explicitly states `[2026.09.07] MiniCPM5-2B is released`. The model card calls it a dense 2B final release for local/on-device use and explicitly lists coding agents, tool-use workflows, and agentic tasks. `MiniCPM5-2B-SFT`, `MiniCPM5-2B-Midtrain`, `MiniCPM5-2B-Base`, GGUF/MLX/GPTQ formats, and `MiniCPM5-2B-DSpark` are checkpoints, quantizations, or inference artifacts, not separate release rows.
- **OpenBMB provider discovery:** OpenBMB was absent from the 17-provider baseline configuration and from the explicit missing-lab list. It was discovered through the live AA model catalog, then verified against the maker's official GitHub/Hugging Face surfaces. The provider source set and bounded search queries are now in `scripts/provider-release-sources.json`.

## Artificial Analysis audit and evidence limits

- The live [Artificial Analysis model leaderboard](https://artificialanalysis.ai/leaderboards/models) was fetched directly on 2026-09-08. Mechanical parsing of the embedded model records found exactly one `releaseDate` in the inclusive `2026-09-04..2026-09-08` window: `MiniCPM5-2B`, creator OpenBMB, release date `2026-09-07`. No records dated September 4, 5, 6, or 8 were present in that fetched catalog.
- The same embedded record contains the exact `codingIndex` field `14.5005375225413`; the dashboard stores the displayed-precision equivalent `14.5`. The model page itself currently renders an Intelligence Index summary and does not display a visible Coding Index value in its extracted content. The row therefore documents that limitation and does not substitute the visible Intelligence score.
- No Easy Benchmarks mirror was needed for this row. No score was inferred from the maker's LiveCodeBench, SWE-bench, Terminal-Bench, or other benchmark claims.
- The direct AA model page says “Released September 2026” but does not supply the maker-day chronology; the maker README's explicit September 7 date takes precedence.
- Search-result calls were bounded and returned no indexed results; direct official surfaces supplied the release evidence. The configured DeepSeek news and Z.ai blog URLs were unreachable/404 at retrieval time, so their decisions rely on complementary official surfaces and are not unlimited completeness claims.
- Dynamic benchmark catalogs and maker pages can change after this cutoff. No coverage claim extends beyond `2026-09-08T07:25:59+02:00`.
