# Model release and AA Coding Index audit — 2026-09-03 late refresh

This is the reproducible evidence ledger for the late refresh performed on **2026-09-03**. Retrieval was cut off at **2026-09-03T23:00:19+02:00** (Europe/Amsterdam).

## Baseline and research window

- **Target branch/remote:** `main` / `https://github.com/jgordijn/agentic-model-release-tracker.git`
- **Base commit:** `adf6cfd4d87ce5d6acba6589a755edfbc9ee7ff9` — previous `main` after the 2026-09-03 morning refresh and audit-count correction.
- **Previous data commit:** `b6b48b8ccb66e562a37ca1493f132162016a8735` — `Refresh model releases through 2026-09-03`.
- **Previous dataset baseline:** 121 rows; newest tracked `releaseDate` was `2026-09-02` (`Gemini 3.8 Flash` and `Muse Spark 1.3`).
- **Window:** inclusive `2026-09-03`, with a bounded recheck of the 2026-09-02 Google launch for the separately named Cyber variant and a live Artificial Analysis leaderboard discovery pass.
- **Result:** three rows added; the dataset now contains 124 rows and its newest release date is `2026-09-03`.

## Scope and score policy

Include base model lines and distinct specialized-base lines relevant to programming or agentic work. Exclude preview-only configurations, mini/nano/lite tiers, application or product features, partner integrations, quantizations, and modality-only releases. Maker availability/release dates take precedence over benchmark listing dates and registry timestamps. A family with multiple size or effort variants is represented only where the repository policy and evidence support a canonical row; scores are never copied from a sibling variant.

Scores are the exact **Artificial Analysis Coding Index** metric, not the Intelligence Index, Agentic Index, Terminal-Bench, or a maker-reported benchmark. The dashboard stores one decimal. For the two scored additions below, the raw embedded `codingIndex` value and exact effort/variant identity were retained in this ledger and the row notes. If no exact Coding Index row exists, the dashboard keeps the score `null`.

## Provider coverage and decisions

The provider checklist was run before the refresh. The configuration now contains 17 providers, including the newly discovered IFM source set. The four explicit missing labs remain separate and unchanged.

| Provider | Official surfaces checked | Decision through the retrieval cutoff |
|---|---|---|
| OpenAI | [News](https://openai.com/news/), [GPT-6 Astra safety overview](https://openai.com/index/safety-overview-gpt-6-astra/), [API model catalog](https://platform.openai.com/api/docs/models) | **Add GPT-6 Astra.** The official safety overview explicitly says “Today, we are releasing GPT-6 Astra” on September 3; other Astra effort rows are configurations, not separate releases. Daybreak and other security/company posts are not model releases. |
| Anthropic | [Newsroom](https://www.anthropic.com/news), [model overview](https://docs.anthropic.com/en/docs/about-claude/models) | **Skip.** The latest qualifying model remains Claude Fable 5.1 on September 1; no later model release was found. |
| Google | [Gemini models blog](https://blog.google/innovation-and-ai/models-and-research/gemini-models/), [3.8 Flash/Cyber launch](https://blog.google/innovation-and-ai/models-and-research/gemini-models/3-8-flash-and-3-8-flash-cyber/), [API changelog](https://ai.google.dev/gemini-api/docs/changelog), [model catalog](https://ai.google.dev/gemini-api/docs/models) | **Add Gemini 3.8 Flash Cyber.** Google names it as the second distinct model variant in the September 2 launch, for autonomous vulnerability discovery and automated patching through the Fairwind Program. The September 3 changelog item is Lyria music preview and is excluded. |
| Meta | [Meta Research](https://research.meta.ai/), [AI at Meta blog](https://ai.meta.com/blog/) | **Skip.** Muse Spark 1.3 from September 2 is already tracked; no later qualifying model was found. |
| Apodex | [Home](https://www.apodex.com/), [blog](https://www.apodex.com/blog/apodex-1.1-scaling-agentic-intelligence-for-complex-work), [API](https://www.apodex.com/api) | **Skip.** Apodex 1.1 is already tracked; no later qualifying model was found. |
| xAI | [News](https://x.ai/news), [release notes](https://docs.x.ai/docs/release-notes) | **Skip.** The September 3 item is Designing Grok Bot, a persistent-agent product/design post; no new base model line was released. |
| Cursor | [Blog](https://cursor.com/blog), [changelog](https://cursor.com/changelog) | **Skip.** September 2 self-hosted machines and other recent entries are product/cloud-agent changes, not a new Composer model line. |
| Mistral | [News](https://mistral.ai/news), [model overview](https://docs.mistral.ai/getting-started/models/models_overview/) | **Skip.** No post-cutoff qualifying programming/agentic model release was found. |
| Alibaba | [QwenCloud models](https://www.qwencloud.com/models), [Qwen blog](https://qwen.ai/blog), [official registry lead](https://www.qwencloud.com/models/qwen3.8-max-0902) | **Skip as a new row.** Qwen3.8-Max-0902 is described as an upgraded snapshot/alias of the tracked Qwen3.8-Max family, not a new canonical family release. |
| Tencent | [GitHub organization](https://github.com/Tencent), [GitHub repository API](https://api.github.com/orgs/Tencent/repos?per_page=100&sort=updated&direction=desc), [Hugging Face organization](https://huggingface.co/tencent) | **Skip.** September 3 repository activity concerns ContextPilot maintenance, BrowserSkill, WeMM-Embedding, and agent/tool infrastructure; no new qualifying base model line was found. |
| DeepSeek | [API news](https://api-docs.deepseek.com/news/), [model/API documentation](https://api-docs.deepseek.com/news/) | **Skip.** The current documentation lists the already tracked V4 Flash/Pro lines and the experimental vision variant; no new post-cutoff qualifying base release was found. |
| Moonshot.ai | [Announcement feed](https://forum.moonshot.ai/c/announcement/5.json), [QwenCloud Kimi listing](https://www.qwencloud.com/models/kimi-k3), [official registry lead](https://huggingface.co/api/models?author=moonshotai&sort=createdAt&direction=-1&limit=100) | **Skip.** The latest qualifying announcement remains Kimi K3 on July 22; no later model release was found. |
| MiniMax | [News](https://www.minimax.io/news), [research/blog](https://www.minimax.io/blog) | **Skip.** The latest items are financial news, music, and the already tracked M3/H3 lines; no new qualifying programming/agentic LLM was found. |
| Z.ai | [Release notes](https://docs.z.ai/release-notes/new-released), [model documentation](https://z.ai/model-api) | **Skip.** GLM-5.3-Flash on August 26 is already tracked; no later qualifying line was found. |
| Xiaomi | [GitHub organization](https://github.com/XiaomiMiMo), [official registry](https://huggingface.co/XiaomiMiMo) | **Skip.** September 3 repository activity is maintenance for MiMo-Code and related tooling; no new model release was found. |
| NVIDIA | [NVIDIA model catalog](https://build.nvidia.com/nvidia), [official registry](https://huggingface.co/nvidia) | **Skip.** Recent catalog/registry entries are existing Nemotron and conversion/optimization assets; no newer first-party base line was found. |
| IFM *(new provider)* | [K2 Horizon overview](https://ifm.ai/k2/), [press release](https://ifm.ai/k2/press-release/), [IFM docs](https://docs.ifm.ai/), [Hugging Face collection](https://huggingface.co/collections/IFM/k2-horizon) | **Add K2 Horizon 375B A23B.** IFM’s September 3 press release introduces a six-model, fully open K2 Horizon fleet. The exact AA-scored 375B-A23B flagship identity is retained rather than copying its score to the five smaller siblings. |
| Amazon *(explicitly missing lab)* | [AWS What's New RSS](https://aws.amazon.com/about-aws/whats-new/recent/feed/), [Amazon Nova](https://aws.amazon.com/ai/generative-ai/nova/), [official registry](https://huggingface.co/api/models?author=amazon&sort=createdAt&direction=-1&limit=100) | **Skip.** AWS feed entries are service, partner, or Bedrock announcements; no new Amazon Nova base model was found. |
| Cohere *(explicitly missing lab)* | [Cohere changelog](https://docs.cohere.com/changelog), [Cohere blog](https://cohere.com/blog), [model overview](https://docs.cohere.com/docs/models) | **Skip in this window.** North Mini Code is a real agentic-coding release from June 9, outside the current window and excluded by the repository’s explicit mini-tier rule. Parse on August 27 is a document-parsing service/model, not a programming/agentic base line. |
| StepFun *(explicitly missing lab)* | [StepFun site](https://www.stepfun.com/), [GitHub organization API](https://api.github.com/orgs/stepfun-ai/repos?per_page=100&sort=updated&direction=desc), [official registry](https://huggingface.co/api/models?author=stepfun-ai&sort=createdAt&direction=-1&limit=100) | **Skip.** No post-cutoff qualifying model release was found; recent activity is maintenance or older Step model lines. |
| AI21 Labs *(explicitly missing lab)* | [AI21 blog](https://www.ai21.com/blog/), [docs changelog](https://docs.ai21.com/changelog), [official registry](https://huggingface.co/api/models?author=ai21labs&sort=createdAt&direction=-1&limit=100) | **Bounded skip.** No post-cutoff qualifying model was found. The public surfaces expose research and changelog material but do not provide a newer in-scope model release in this window. |

## Added release ledger

| Model | Release date | Provider | Category | Coding Index | Maker source | Exact AA row/configuration |
|---|---:|---|---|---:|---|---|
| Gemini 3.8 Flash Cyber | 2026-09-02 | Google | specialized-base | unknown | [Google launch](https://blog.google/innovation-and-ai/models-and-research/gemini-models/3-8-flash-and-3-8-flash-cyber/) | No exact `gemini-3-8-flash-cyber` row was present in the live AA leaderboard; the guessed AA model URL returned 404. No score was inferred from Gemini 3.8 Flash. |
| GPT-6 Astra | 2026-09-03 | OpenAI | base | 76.9 | [OpenAI safety overview](https://openai.com/index/safety-overview-gpt-6-astra/) | [GPT-6 Astra](https://artificialanalysis.ai/models/gpt-6-astra), `max`, raw `76.9433173810514`; the leaderboard also exposes high/medium/low/xhigh/non-reasoning configurations, which are not separate releases. |
| K2 Horizon 375B A23B | 2026-09-03 | IFM | base | 61.5 | [IFM press release](https://ifm.ai/k2/press-release/) | [K2 Horizon 375B A23B](https://artificialanalysis.ai/models/k2-horizon-375b-a23b), no effort suffix, raw `61.5203218199473`; smaller K2 Horizon sizes are not scored/copy-filled. |

## Selection and exclusion notes

- **GPT-6 Astra:** OpenAI’s September 3 safety overview explicitly states that GPT-6 Astra is being released and broadly deployed. The AA leaderboard has six effort/configuration rows for the same release family; the dashboard follows the existing representative max configuration convention and stores the rounded Coding Index value. The AA model page’s visible summary is the Intelligence Index, so no Intelligence value was substituted for Coding Index.
- **Gemini 3.8 Flash Cyber:** Google’s maker launch explicitly names Cyber as a distinct second variant and describes autonomous vulnerability discovery and automated patching. It qualifies as a specialized base line under the tracker’s programming/agentic scope even though access is limited to trusted defenders. AA had no exact row, so the score remains unknown.
- **K2 Horizon:** IFM’s maker release names six sizes from 0.9B through 375B and states that they share architecture, training methodology, interfaces, and tooling. The row uses the exact benchmarked flagship identity because the only discovered AA score is for `K2 Horizon 375B A23B`; the score is not presented as a score for every fleet member.
- **Google Lyria 3.5:** The September 3 API changelog release is two public-preview music-generation models and is excluded as preview/modality-only.
- **Cohere North Mini Code:** The official June 9 source confirms a strong agentic-coding model, but its release is outside this refresh window and its explicit Mini tier conflicts with the repository’s mini-tier exclusion. It remains documented as a skip rather than silently lost.
- **Qwen3.8-Max-0902:** The official QwenCloud page calls it an upgraded snapshot of the existing family, so no duplicate canonical row is added.

## Artificial Analysis audit and evidence limits

- The live Artificial Analysis model leaderboard was fetched directly on 2026-09-03 and parsed for exact model identity, release date, creator, effort/configuration, and the embedded `codingIndex` field. Seven records had `releaseDate` `2026-09-03`: six GPT-6 Astra configurations and K2 Horizon 375B A23B. The dashboard keeps one canonical row for each release family/identity according to the project rules.
- The dashboard stores one decimal: `76.9433173810514 → 76.9` for GPT-6 Astra max and `61.5203218199473 → 61.5` for K2 Horizon 375B A23B. These are embedded leaderboard values; the exact model pages may default to other visible metrics, so they are not described as visible Intelligence values.
- The exact AA URL for Gemini 3.8 Flash Cyber was tested and returned 404, and no exact Cyber slug was present in the fetched leaderboard data. The unknown score is intentional.
- Search-result snippets were discovery hints only. Direct maker pages, official documentation, GitHub/Hugging Face public registries, and the live AA page supplied the load-bearing evidence.
- Many provider-specific search queries returned no indexed results, so the research pivoted to the configured first-party pages and public APIs. The coverage claim ends at the retrieval cutoff above; it does not claim knowledge of releases published afterward.
