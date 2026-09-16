# Model release and AA Coding Index audit — 2026-09-16

This is the reproducible evidence ledger for the autonomous refresh performed on **2026-09-16**. Research retrieval was cut off at **2026-09-16T07:19:43+02:00** (Europe/Amsterdam). The refresh was performed directly on `main`; no pull request is used for this project.

## Baseline and research window

- **Target branch/remote:** `main` / `https://github.com/jgordijn/agentic-model-release-tracker.git`
- **Base commit and previous dashboard/data commit:** `aa46576681153291fa84de194d81d0ef3bce3298` — `feat: refresh model releases through 2026-09-10`
- **Working-tree baseline:** only the pre-existing untracked `screenshots/baseline-local.png` was present. No unrelated tracked changes were present, and the untracked file was left untouched.
- **Previous dataset baseline:** 127 rows; newest tracked `releaseDate` was `2026-09-10` (`DeepSeek V4.1 Flash`).
- **Previous provider coverage:** 19 configured providers; explicit missing labs were Amazon, Cohere, StepFun, and AI21 Labs.
- **Window:** inclusive `2026-09-10..2026-09-16` in Europe/Amsterdam. A bounded backfill was also performed for a previously skipped candidate whose maker release was independently verified as `2026-09-04`.
- **Result:** one qualifying specialized-base row was backfilled (`Ling-3.0-flash-VL`), and the newly discovered qualifying provider `InclusionAI` was added to `scripts/provider-release-sources.json`. The dataset now contains 128 rows and still has newest tracked `releaseDate` `2026-09-10`.

## Scope and score policy

Include base model lines and clearly distinguished specialized-base lines relevant to programming or agentic work. Exclude preview-only configurations, mini/nano/lite tiers, product features, partner integrations, quantizations, modality-only releases, and pure snapshots or aliases. Maker availability/release evidence takes precedence over Artificial Analysis catalog dates and registry timestamps.

Scores are the exact **Artificial Analysis Coding Index** metric for the exact model and effort/configuration. Intelligence Index, Agentic Index, Terminal-Bench, SWE-bench, other maker benchmarks, and sibling/family scores are not substitutes. If the exact Coding Index row cannot be verified, the dashboard stores `codingIndex: null` and does not add a `scoreSourceUrl` merely because another metric is available.

## Research method and bounded source coverage

The repository checklist was run first with `node scripts/check-provider-releases.mjs --markdown`. I then used one bounded discovery query per configured provider and per explicit missing lab, followed by direct fetches of the configured official pages, feeds, registries, and exact model pages. Search-result snippets were treated as discovery leads only. The live Artificial Analysis leaderboard was fetched directly and mechanically inspected for model records in the window; the raw response was HTTP 200, 2,581,635 bytes, and contained 651 parsed catalog records.

## Provider coverage and decisions

The post-refresh checklist contains 20 configured providers. Every configured provider and every explicit missing lab was given an add, skip, or bounded-unresolved decision.

### Configured providers

| Provider | Official surfaces checked | Decision through the retrieval cutoff |
|---|---|---|
| OpenAI | [News](https://openai.com/news/), [Index](https://openai.com/index/), [API model catalog](https://platform.openai.com/docs/models) | **Skip.** September 11 storage engineering and September 10 Agents API, GPT-Live, and other product posts are features/infrastructure. GPT-6 Astra from September 9 is already tracked; no newer qualifying base line was found. |
| Anthropic | [Newsroom](https://www.anthropic.com/news), [model overview](https://docs.anthropic.com/en/docs/about-claude/models) | **Skip.** The newest qualifying model remains Claude Fable 5.1 from September 1. The September 10 threat-intelligence report is not a model release. |
| Google | [Gemini models](https://blog.google/innovation-and-ai/models-and-research/gemini-models/), [developer-tools blog](https://blog.google/innovation-and-ai/technology/developers-tools/), [Gemini API model catalog](https://ai.google.dev/gemini-api/docs/models) | **Skip.** The API catalog was updated September 15 but still identifies Gemini 3.8 Flash as the current qualifying line already tracked. Live/audio, speech, image, preview, and other modality-only entries are excluded. |
| Meta | [Hugging Face organization](https://huggingface.co/meta-models), [AI at Meta blog](https://ai.meta.com/blog/) | **Skip.** No post-boundary qualifying model release was exposed. Recent activity concerns existing Muse assets and non-model work. |
| OpenBMB | [Hugging Face organization](https://huggingface.co/OpenBMB), [GitHub organization](https://github.com/OpenBMB), [MiniCPM repository](https://github.com/OpenBMB/MiniCPM) | **Skip as a new row.** MiniCPM5-2B from September 7 is already tracked. September 11–16 activity is repository, demo, dataset, and quantized/checkpoint activity, not a new base model line. |
| Apodex | [Home](https://www.apodex.com/), [Apodex 1.1 post](https://www.apodex.com/blog/apodex-1.1-scaling-agentic-intelligence-for-complex-work), [core model/API page](https://www.apodex.com/api) | **Skip.** Apodex 1.1 from August 24 remains the latest qualifying model. Current page content and publication metadata do not establish a later model release. |
| xAI | [News](https://x.ai/news), [developer model docs](https://docs.x.ai/developers/models) | **Skip.** The September news items are Grok Bot/product and enterprise updates. The model docs still present Grok 4.6 as the flagship coding/agent model; no newer base line was found. |
| Cursor | [Blog](https://cursor.com/blog) | **Skip.** Projects and cloud/self-hosted agent updates are product/infrastructure features. No new Composer model line was found. |
| Mistral | [News](https://mistral.ai/news), [news RSS](https://mistral.ai/news/rss), [model catalog](https://mistral.ai/models), [model docs](https://docs.mistral.ai/getting-started/models/models_overview/) | **Skip.** The latest RSS item at the boundary is a Cloudera partnership; other current items are partnerships, product content, or existing model lines. No later qualifying model release was found. |
| Alibaba | [Qwen legacy blog](https://qwenlm.github.io/blog), [Qwen research](https://qwen.ai/blog), [QwenCloud model marketplace](https://www.qwencloud.com/models) | **Skip as a new row.** Qwen3.8-Max-0902 is explicitly an upgraded dated snapshot of the existing Qwen3.8-Max family. Qwen3.8-Flash and the other current catalog entries are already tracked or are modality/product lines. |
| Tencent | [UI-Mate](https://ui-mate.github.io/), [Hugging Face organization](https://huggingface.co/tencent), [GitHub organization](https://github.com/Tencent) | **Skip.** Recent activity includes repository maintenance, speech/retrieval assets, datasets, and existing UI-Mate/ContextPilot work; no new qualifying base or specialized-base release was found. |
| DeepSeek | [API updates](https://api-docs.deepseek.com/updates), [September 10 release](https://api-docs.deepseek.com/news/news260910), [Transparency Center](https://www.deepseek.com/en/transparency/) | **Skip as a new row.** DeepSeek V4.1 Flash was officially released September 10 and is already tracked. No later qualifying DeepSeek model was found. The documented `deepseek-flash` name remains an alias, not another row. |
| Moonshot.ai | [Platform changelog](https://platform.moonshot.ai/blog/posts/changelog), [Moonshot home](https://www.moonshot.ai/), [official Kimi account](https://x.com/Kimi_Moonshot) | **Skip.** Kimi K3 from July remains the latest qualifying release. No later model release was exposed by the reachable sources; the X surface is bot-constrained. |
| MiniMax | [News](https://www.minimax.io/news), [research/blog](https://www.minimax.io/blog) | **Skip.** MiniMax M3 from June 1 remains the latest relevant LLM. Current speech/music/product entries are out of scope. |
| Z.ai | [Release notes](https://docs.z.ai/release-notes/new-released), [model documentation](https://docs.z.ai/guides/llm/glm-5.3) | **Skip.** The release-note page ends with the already tracked GLM-5.3-Flash from August 26; no later qualifying line was found. |
| Xiaomi | [GitHub organization](https://github.com/XiaomiMiMo), [Hugging Face organization](https://huggingface.co/XiaomiMiMo) | **Skip.** September 15 MiMo-Code activity is repository/tooling maintenance, not a new model release. |
| NVIDIA | [NVIDIA model catalog](https://build.nvidia.com/nvidia), [NVIDIA Hugging Face organization](https://huggingface.co/nvidia), [official model registry API](https://huggingface.co/api/models?author=nvidia&sort=createdAt&direction=-1&limit=100) | **Skip.** September activity consists of vision/depth assets, math SFT/RL checkpoints, datasets, and conversions/quantizations. These are modality-only, training artifacts, datasets, or derivative assets rather than a new qualifying first-party base line. |
| IFM | [K2 Horizon overview](https://ifm.ai/k2/), [press release](https://ifm.ai/k2/press-release/), [documentation](https://docs.ifm.ai/) | **Skip.** K2 Horizon from September 3 remains the latest IFM release. No later model was found. |
| Agnes AI | [Agnes 3.0 Flash docs](https://www.agnes-ai.com/zh-Hans/docs/agnes-30-flash), [API platform](https://platform.agnes-ai.com), [official GitHub organization](https://github.com/AgnesAI-Labs) | **Skip as a new row.** Agnes 3.0 Flash is already tracked using the official documentation marker from September 8. The `Agnes-3.0-Flash` GitHub repository updated September 15 is explicitly a Preview landing/repository asset, not a new canonical release. |
| InclusionAI *(newly discovered provider)* | [Hugging Face organization](https://huggingface.co/inclusionAI), [Ling-3.0-flash-VL card](https://huggingface.co/inclusionAI/Ling-3.0-flash-VL), [official model index](https://www.inclusion-ai.org/model), [GitHub organization](https://github.com/inclusionAI), [Ant Ling account](https://x.com/AntLingAGI) | **Add provider coverage and backfill `Ling-3.0-flash-VL`.** The official Ant Ling post states “Today, we are releasing Ling-3.0-flash-VL” and the linked official card describes visual-agent capabilities and frontend coding. The maker post timestamp is September 4, so this is a bounded correction of the prior audit's incorrect modality-only classification, not a new post-September-10 release. The official source set and `{since}` queries were added to `provider-release-sources.json`. |

### Explicitly missing labs

| Lab | Official surfaces checked | Decision through the retrieval cutoff |
|---|---|---|
| Amazon | [Amazon Science](https://amazon.science/), [Amazon Science RSS](https://www.amazon.science/index.rss), [AWS What's New](https://aws.amazon.com/about-aws/whats-new/), [AWS News Blog](https://aws.amazon.com/blogs/aws/) | **Skip.** September material includes research, infrastructure, and the September 14 GPT-6 Astra-on-Bedrock availability roundup. That is a partner/integration announcement, not a new Amazon base model. |
| Cohere | [Cohere blog](https://cohere.com/blog), [North Small Translate post](https://cohere.com/blog/north-small-translate), [Cohere changelog](https://docs.cohere.com/changelog), [model overview](https://www.cohere.com/models-overview), [North Mini Code docs](https://docs.cohere.com/v2/docs/north-mini-code-1.0) | **Skip in this window.** North Small Translate on September 11 is purpose-built machine translation and is out of scope. North Mini Code is a genuine agentic-coding model from June 9, but its explicit Mini tier is excluded and its release predates this refresh window. North Micro Vision is modality-specific. |
| StepFun | [StepFun site](https://www.stepfun.com/), [Step 3.7 Flash announcement](https://static.stepfun.com/blog/step-3.7-flash/), [Step 3.7 Flash docs](https://platform.stepfun.com/docs/zh/guides/models/step-3.7-flash), [official GitHub model card](https://github.com/stepfun-ai/Step-3.7-Flash), [official Hugging Face card](https://huggingface.co/stepfun-ai/Step-3.7-Flash) | **Skip.** Step 3.7 Flash is a qualifying model but the maker announcement is dated May 29, outside this window. No later qualifying model release was found. |
| AI21 Labs | [AI21 blog](https://www.ai21.com/blog), [AI21 Studio](https://studio.ai21.com/) | **Bounded unresolved.** No in-window qualifying model appeared in the single search pass, while the blog and Studio surfaces were bot-constrained. This ledger does not claim unlimited completeness for AI21 beyond the fetched evidence. |

## Added/backfilled release ledger

| Model | Maker release date | Provider | Category | Coding Index | Maker source | Exact AA row/configuration |
|---|---:|---|---|---:|---|---|
| Ling-3.0-flash-VL | 2026-09-04 | InclusionAI / Ant Ling | specialized-base | unknown | [official Ant Ling release post](https://x.com/AntLingAGI/status/2095935971556782372); [official Hugging Face card](https://huggingface.co/inclusionAI/Ling-3.0-flash-VL) | [AA model page](https://artificialanalysis.ai/models/ling-3-0-flash-vl); catalog row `Ling-3.0-flash-VL`, reasoning, no effort suffix, catalog `releaseDate=2026-09-10`; no exact Coding Index field |

### Backfill and scope decision

- The official Ant Ling post's direct HTTP payload identifies tweet `2095935971556782372`, says the model is being released, and carries `created_at_ms=1788545050000` (`2026-09-04T18:04:10Z`). The official Hugging Face card independently identifies the model as a 124B native multimodal model that integrates vision into understanding, reasoning, acting, verification, and agentic workflows; the official release post explicitly mentions visual-agent capabilities and frontend coding.
- This is a distinct specialized-base model with its own multimodal architecture and weights, not a product feature, quantization, preview-only configuration, alias, or modality-only release. The prior `2026-09-11` audit's “modality-only” skip was therefore corrected.
- Artificial Analysis lists the same model in its catalog with `releaseDate=2026-09-10`. That is retained as benchmark-catalog evidence only; maker availability (`2026-09-04`) controls the dashboard date.

## Artificial Analysis audit, aliases, and score provenance

- The live [Artificial Analysis model leaderboard](https://artificialanalysis.ai/leaderboards/models) was fetched directly. Mechanical parsing found these inclusive-window catalog records: existing `DeepSeek V4.1 Flash` (`2026-09-10`), existing `Agnes 3.0 Flash` (`2026-09-11`), and `Ling-3.0-flash-VL` (`2026-09-10`). No other catalog record in `2026-09-10..2026-09-16` was found.
- The exact [Ling AA model page](https://artificialanalysis.ai/models/ling-3-0-flash-vl) was fetched directly over HTTP 200. Its raw HTML contained no `codingIndex` field and no visible “Coding Index” value; it exposed Intelligence Index content instead. The live AA leaderboard likewise exposed no exact Coding Index field for Ling. The new row therefore keeps `codingIndex: null` and has no `scoreSourceUrl`.
- The [Easy Benchmarks Coding Index mirror](https://easy-benchmarks.com/benchmarks/artificial_analysis_coding_index) was fetched as a secondary cross-check. It is not the Artificial Analysis website; no Ling model page was present there, and no mirror value was promoted to the dataset. Existing score rows were not rewritten because a comparable authoritative direct AA Coding Index snapshot/configuration was not exposed by this fetch.
- The official model card reports an Artificial Analysis **Intelligence Index** value and other benchmark results. Those values were deliberately not converted into a Coding Index. The maker's `Ling-3.0-flash` base relationship is recorded by the model card context, but `Ling-3.0-flash-VL` is independently released and is not collapsed into the base row.
- Other aliases/snapshots checked during the sweep remain excluded: DeepSeek's `deepseek-flash` is an API alias for the already tracked V4.1 Flash; Qwen3.8-Max-0902 is an upgraded dated snapshot of Qwen3.8-Max; NVIDIA and OpenBMB derivative assets are quantizations/checkpoints rather than new families.

## Evidence limits

- Search was deliberately bounded to one targeted query per configured provider and missing lab, with only narrow exact follow-up retrieval for the AA-discovered InclusionAI candidate. Empty search results were not treated as proof of non-existence; direct official pages, feeds, registries, and the official X payload were used where available.
- X's normal extraction path was anti-bot constrained, but the official account page was fetched directly over HTTP and the release text, tweet ID, and timestamp were mechanically present in the response. This is direct fetched source evidence, not a search snippet.
- AI21 and the official Kimi X surface remained bot-constrained. Dynamic provider catalogs, registries, and Artificial Analysis can change after the cutoff; this ledger does not claim coverage beyond `2026-09-16T07:19:43+02:00`.
- Registry `createdAt`/`lastModified`, page-wide update markers, asset timestamps, and AA catalog release dates were used for discovery or comparison only. They were not silently substituted for maker release dates.
