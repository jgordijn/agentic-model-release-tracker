# Model-release audit — 2026-10-13

## Baseline, window, and policy

- **Repository/branch:** `agentic-model-release-tracker`, `main` working tree; direct publication to `origin/main` is explicitly authorized. No worktree and no PR.
- **Remote:** `https://github.com/jgordijn/agentic-model-release-tracker.git`.
- **Last data commit:** `5609bfa357a5e618ca95d346676d1db43ee54fda` — `feat(data): refresh model releases through 2026-10-09` (2026-10-09 05:16:09 UTC). This is recorded separately from the newest model date.
- **HEAD dataset baseline:** 148 rows, 148 unique model names; newest tracked `releaseDate` `2026-10-07` (`Claude Haiku 5.5`).
- **Research window:** inclusive `2026-10-07` through `2026-10-13` in Europe/Amsterdam. The 2026-10-07 boundary was rechecked without duplicating the existing Haiku row.
- **Cutoff/retrieval:** 2026-10-13, Europe/Amsterdam (`2026-10-13T07:00:45+02:00` when the run began).
- **Checklist:** `node scripts/check-provider-releases.mjs --markdown` ran before external research and derived `since 2026-10-07`; it covered 26 configured providers and 4 explicit missing labs (30 headings).
- **Scope:** add only base model lines or clearly distinguished specialized-base lines relevant to programming/agentic work. Exclude product features, provider integrations, preview-only releases/configurations, mini/nano/lite tiers, modality-only releases, quantizations, pure snapshots/checkpoints, aliases, and sibling/family score copying.
- **Score rule:** `codingIndex` is populated only from an exact Artificial Analysis Coding Index row and exact configuration. Intelligence Index, Agentic Index, Terminal-Bench, SWE-bench, maker scores, and other metrics are not substitutes. Unknown Coding Index values remain `null` without a `scoreSourceUrl`.

## Retrieval method and evidence limits

- One bounded discovery search was run for each configured provider and each missing lab. The search backend returned empty or stale results for many queries, so broad searches were not repeated. Narrow follow-ups were limited to exact leads for Agnes AI, NVIDIA, Artificial Analysis, Cohere, and Amazon.
- The generated provider checklist was followed by direct extraction of the configured official archives, model catalogs, documentation, GitHub organizations, and Hugging Face organizations. Search snippets and benchmark/catalog leads were discovery evidence only, not release evidence.
- The live Artificial Analysis model leaderboard was fetched directly. The exact Agnes 3.0 Qwen model URL (`https://artificialanalysis.ai/models/agnes-3-0-qwen`) returned a fetched 404, and no Agnes 3.0 Qwen row was present in the extracted leaderboard. No Coding Index or Intelligence Index value was inferred.
- Agnes's official Hugging Face model-card API metadata reported `createdAt: 2026-10-10T14:27:15.000Z`; the model card itself says `Release date: October 2026`, while the official GitHub landing page was created on 2026-10-12. No day-level maker announcement was found, so 2026-10-10 is stored as an explicitly documented registry-created public-availability fallback, not as a fabricated announcement date.
- Known access limits remain explicit: the configured DeepSeek news archive returned a page-not-found response; the configured LongCat URL `https://longcat.ai/blog/longcat-2.0` returned HTTP 200 with the raw page title `Introducing LongCat-2.0` but its page extractor failed, so raw HTTP plus the extractable official home/Hugging Face/GitHub surfaces were used; the configured Z.ai blog URL returned 404 and the official release-notes page was used as fallback; X pages for Kimi and Ant Ling were anti-bot blocked. These limitations are not treated as proof of absence.

## Candidate ledger

| Candidate | Provider | Official evidence | Scope / score decision |
|---|---|---|---|
| Claude Haiku 5.5 | Anthropic | Existing official announcement dated 2026-10-07: [Anthropic announcement](https://www.anthropic.com/claude-haiku-5-5); [newsroom](https://www.anthropic.com/news). | **Keep existing row; no duplicate.** It is already the inclusive boundary row. Coding Index remains `null`; AA Intelligence Index `43` at `max` is stored separately. |
| Agnes 3.0 Qwen | Agnes AI | [Official Hugging Face model card and weights](https://huggingface.co/Agnes-AI/Agnes-3.0-Qwen); [official GitHub landing page](https://github.com/AgnesAI-Labs/Agnes-3.0-Qwen). The card describes agentic coding, tool use, 1M context, multimodal reasoning, and the Qwen3.8-Flash-Next upstream base. | **Add** as a distinct `specialized-base` line with release date `2026-10-10` from the earliest official HF registry-created marker, explicitly documented as fallback provenance. `codingIndex: null`; the exact AA model URL returned 404 and no exact AA Coding Index row was found. |
| OpenAI GPT-6 and Intelligent UI | OpenAI [official index](https://openai.com/index/gpt-6-for-everyone/) dated 2026-10-07. | **Skip:** product/UI announcement and family/product alias; existing GPT-6 model lines remain the dashboard rows. |
| GPT-6.1 Sol Ultrafast on Amazon Bedrock | Amazon/OpenAI [AWS announcement](https://aws.amazon.com/about-aws/whats-new/2026/10/openai-gpt-sol-ultrafast-amazon/) and AWS RSS. | **Skip:** provider integration and inference mode, not a new base model line. |
| Mistral Large 4 Preview | Mistral [official announcement](https://mistral.ai/news/mistral-large-4/) dated 2026-10-06. | **Skip:** maker-labeled public preview; the project excludes preview-only rows even though the model is coding/agentic and appears in the AA catalog. No score copied. |
| Step 5 Preview | StepFun [official model page](https://www.stepfun.com/step-5-preview). | **Skip:** available through products/API as a maker-labeled preview; open weights are announced for 2026-10-15. Preview-only scope rule applies. Maker benchmark figures are not AA Coding Index values. |
| LongCat-2.5-Preview | LongCat [official home](https://longcat.ai/). | **Skip:** the official page labels the current model `LongCat-2.5-Preview`; preview-only scope rule excludes it, and no day-level release date was exposed. |
| North 2 | Cohere [official announcement](https://cohere.com/blog/introducing-north-2) dated 2026-10-05. | **Skip:** agentic enterprise platform/harness, explicitly model-agnostic; not a new base or specialized-base model line. |
| Embed 5 | Cohere [official release note](https://docs.cohere.com/v2/changelog/embed-v5) dated 2026-09-30. | **Skip:** embedding-only family, even though code retrieval is listed. |
| North Small Translate | Cohere [official release note](https://docs.cohere.com/v2/changelog/north-small-translate-1-0) dated 2026-09-09. | **Skip:** translation-only modality/task model outside programming/agentic generation scope. |
| North Mini Code | Cohere [official model overview](https://cohere.com/models-overview) and [CohereLabs model card](https://huggingface.co/CohereLabs/North-Mini-Code-1.0). | **Skip:** June 2026 mini tier and outside the current window; the project excludes mini tiers even though it is coding-focused. |
| Nova/Bedrock model entries | Amazon [AWS What's New](https://aws.amazon.com/about-aws/whats-new/), [AWS RSS](https://aws.amazon.com/about-aws/whats-new/recent/feed/), and [Amazon Science RSS](https://www.amazon.science/index.rss). | **Skip:** current-window Bedrock announcements are integrations; Nova 2.5 Sonic is a voice model and therefore modality-only for this dashboard. No new Amazon Nova base programming/agentic line was verified. |
| MiMo-V2.6 MOPD/RL variants | Xiaomi [Hugging Face organization](https://huggingface.co/XiaomiMiMo), [GitHub organization](https://github.com/XiaomiMiMo), and [MiMo page](https://mimo.xiaomi.com/mimo-v2-6). | **Skip:** checkpoint, RL, MOPD, and serving variants of an existing family; no new family row or sibling score. |
| NVIDIA Nemotron-3.5-Lightning NVFP4-DSpark | NVIDIA [official Hugging Face model card](https://huggingface.co/nvidia/NVIDIA-Nemotron-3.5-Lightning-30B-A3B-NVFP4-DSpark). | **Skip:** speculative-decoding/quantized deployment checkpoint for an existing target model; the card gives a release date of 2026-08-11 and explicitly says it is not a standalone target model checkpoint. |
| Mercury Voice | Inception [official blog](https://inceptionlabs.ai/blog/introducing-mercury-voice) dated 2026-09-29. | **Skip:** voice-only model, outside programming/agentic base-model scope. |
| All other configured and missing-lab candidates | Official surfaces listed below plus the direct Artificial Analysis leaderboard. | **No additional row verified.** A missing current leaderboard entry is not treated as deletion or as a score/age decision. |

## Configured-provider coverage

Every configured provider was checked against its configured primary surfaces and one bounded discovery path for the inclusive window.

- **OpenAI:** [news](https://openai.com/news/), [index](https://openai.com/index/), [API model docs](https://platform.openai.com/docs/models). The current entries are product, safety, partnership, or existing GPT-6 family material; no new qualifying base line.
- **Anthropic:** [newsroom](https://www.anthropic.com/news), [model docs](https://docs.anthropic.com/en/docs/about-claude/models), and [Haiku 5.5](https://www.anthropic.com/claude-haiku-5-5). Haiku remains the only in-window qualifying row and is already tracked.
- **Google:** [Gemini archive](https://blog.google/innovation-and-ai/models-and-research/gemini-models/), [developer news](https://blog.google/innovation-and-ai/technology/developers-tools/), and [Gemini API models](https://ai.google.dev/gemini-api/docs/models). The API page was last updated 2026-10-09 but exposes existing Gemini 3.8/older lines; no post-boundary qualifying release.
- **Meta:** [Meta AI blog](https://ai.meta.com/blog/) and [Meta model organization](https://huggingface.co/meta-models). Recent activity is existing Muse artifacts; no new model family after the boundary.
- **OpenBMB:** [Hugging Face](https://huggingface.co/OpenBMB), [GitHub organization](https://github.com/OpenBMB), and [MiniCPM repository](https://github.com/OpenBMB/MiniCPM). Recent repository activity is existing MiniCPM5/checkpoint work, not a new qualifying family.
- **Apodex:** [blog](https://www.apodex.com/blog), [1.1 announcement](https://www.apodex.com/blog/apodex-1.1-scaling-agentic-intelligence-for-complex-work), and [API](https://www.apodex.com/api). Current model catalog remains Apodex 1.1/1.1 Mini and research services; no new qualifying release.
- **xAI:** [news](https://x.ai/news) and [developer model docs](https://docs.x.ai/developers/models). The 2026-10-12 X Subscription is a product update; Grok 4.7 remains the latest model line.
- **Cursor:** [blog](https://cursor.com/blog) and [model docs](https://cursor.com/docs/models). The 2026-10-06 remote-control item is a product feature before the current boundary; no Cursor base model release.
- **Mistral:** [news](https://mistral.ai/news), [model overview](https://docs.mistral.ai/getting-started/models/models_overview/), and [Large 4](https://mistral.ai/news/mistral-large-4/). Large 4 is explicitly a preview and is excluded.
- **Alibaba:** [Qwen blog](https://qwen.ai/blog), [legacy blog](https://qwenlm.github.io/blog), and [QwenCloud models](https://www.qwencloud.com/models). Qwen3.8-Max-0902 remains an explicitly labeled upgraded snapshot; no new family.
- **Tencent:** [UI-Mate](https://ui-mate.github.io/), [Hugging Face](https://huggingface.co/tencent), and [GitHub](https://github.com/Tencent). Recent HF entries are document/vision/speech artifacts; UI-Mate remains the existing GUI-agent line.
- **DeepSeek:** configured [API news](https://api-docs.deepseek.com/news/) returned page-not-found; [transparency center](https://www.deepseek.com/en/transparency/) lists V4.0 (2026-04-24) and V3.2 (2025-12-01). No in-window verified release; the broken news archive remains an evidence limit.
- **Moonshot.ai:** [platform changelog](https://platform.moonshot.ai/blog/posts/changelog), [company site](https://www.moonshot.ai/), and [Kimi account](https://x.com/Kimi_Moonshot). Kimi K3 is dated 2026-07-16; no new base line.
- **MiniMax:** [news](https://www.minimax.io/news) and [blog](https://www.minimax.io/blog). Current model navigation lists M3/M2.7/M2.5; recent posts are M3, H3, or modality-only products; no new qualifying LLM.
- **Z.ai:** configured [blog](https://z.ai/blog) returned 404; official [release notes](https://docs.z.ai/release-notes/new-released) list GLM-5.3-Flash on 2026-08-26 as the latest release. No in-window GLM release.
- **Xiaomi:** [GitHub organization](https://github.com/XiaomiMiMo), [Hugging Face](https://huggingface.co/XiaomiMiMo), and [MiMo-V2.6](https://mimo.xiaomi.com/mimo-v2-6). Four-day-old MOPD/RL uploads are variants/checkpoints of the tracked MiMo-V2.6 family.
- **NVIDIA:** [NVIDIA model catalog](https://build.nvidia.com/nvidia) and [Hugging Face organization](https://huggingface.co/nvidia). The current catalog is dominated by tabular, vision, robotics, ASR, and maintenance entries; the recent Nemotron Lightning DSpark card is a quantized speculative module with an August release date.
- **IFM:** [K2 Horizon](https://ifm.ai/k2/), [press release](https://ifm.ai/k2/press-release/), and [docs](https://docs.ifm.ai/). K2 Horizon remains a 2026-09-03 release; no new family.
- **Agnes AI:** [home](https://agnes-ai.com/), [existing Agnes 3.0 Flash docs](https://www.agnes-ai.com/zh-Hans/docs/agnes-30-flash), [platform](https://platform.agnes-ai.com), [GitHub organization](https://github.com/AgnesAI-Labs), [new GitHub landing page](https://github.com/AgnesAI-Labs/Agnes-3.0-Qwen), [Hugging Face organization](https://huggingface.co/Agnes-AI), and [new Hugging Face model card](https://huggingface.co/Agnes-AI/Agnes-3.0-Qwen). **Added Agnes 3.0 Qwen.** The exact HF registry marker is retained as fallback release-date evidence; AA has no exact row.
- **InclusionAI:** [model catalog](https://www.inclusion-ai.org/model), [Ling 3.0 Flash VL model page](https://huggingface.co/inclusionAI/Ling-3.0-flash-VL), [Hugging Face organization](https://huggingface.co/inclusionAI), [LLaDA-UI](https://www.inclusion-ai.org/LLaDA-UI/), [GitHub](https://github.com/inclusionAI), and [Ant Ling account](https://x.com/AntLingAGI). Recent updates are existing Ling artifacts, datasets, or repositories; no duplicate/new in-window base line.
- **Inception:** [home](https://inceptionlabs.ai/), [blog](https://inceptionlabs.ai/blog), [Mercury 2.5 announcement](https://inceptionlabs.ai/blog/introducing-mercury-2-5), [models](https://inceptionlabs.ai/models), and [docs](https://docs.inceptionlabs.ai/get-started). Mercury Voice is voice-only; Mercury 2.5 remains the latest qualifying model.
- **IBM Granite:** [Granite 4.2 announcement](https://research.ibm.com/blog/introducing-granite-4-2), [IBM Granite](https://www.ibm.com/granite), and [Hugging Face](https://huggingface.co/ibm-granite). Granite 4.2 remains dated 2026-08-25; recent speech/time-series activity is not a new programming/agentic base line.
- **LongCat:** [home](https://longcat.ai/), configured [LongCat-2.0 page](https://longcat.ai/blog/longcat-2.0) (raw HTTP 200; extractor failed), [Hugging Face](https://huggingface.co/meituan-longcat), and [GitHub](https://github.com/meituan-longcat). The home page exposes LongCat-2.5-Preview, which is excluded as preview-only; LongCat-2.0 remains the 2026-06-29 release and no dated qualifying post-boundary non-preview model was verified.
- **Thinking Machines:** [company site](https://thinkingmachines.ai/), [Inkling announcement](https://huggingface.co/blog/thinkingmachines-inkling), [Hugging Face](https://huggingface.co/thinkingmachines), and [GitHub](https://github.com/thinking-machines-lab). Inkling remains dated 2026-07-15; later activity is infrastructure/repository maintenance.
- **Arcee AI:** [home](https://arcee.ai/), [Trinity](https://arcee.ai/trinity), [Hugging Face](https://huggingface.co/arcee-ai), and [model docs](https://docs.arcee.ai/get-started/models-overview). Trinity variants remain a collapsed existing family; no post-boundary dated release.
- **Celeris:** [home](https://celeris.ai/), [Celeris-1](https://celeris.ai/celeris-1), [Magnus](https://celeris.ai/celeris-1-magnus), and [blog](https://celeris.ai/blog). No qualifying post-boundary release; hosted decision API material remains out of scope.

## Explicitly missing-lab coverage

- **Amazon:** [AWS What's New](https://aws.amazon.com/about-aws/whats-new/), [AWS RSS](https://aws.amazon.com/about-aws/whats-new/recent/feed/), and [Amazon Science RSS](https://www.amazon.science/index.rss). The October feed contains Bedrock availability/integration announcements (including GPT-6.1 Sol, Haiku 5.5, and voice/other services) and no new Amazon Nova base programming/agentic model. Amazon Science's 2026-10-12 item is architecture research, not a model release.
- **Cohere:** [blog](https://cohere.com/blog), [North 2](https://cohere.com/blog/introducing-north-2), [release notes](https://docs.cohere.com/changelog), [models overview](https://cohere.com/models-overview), and [CohereLabs Hugging Face](https://huggingface.co/CohereLabs). North 2 is a model-agnostic platform/harness; Embed 5 is embedding-only; North Small Translate is translation-only; North Mini Code is a June mini tier. No qualifying in-window base model.
- **StepFun:** [homepage](https://www.stepfun.com/), [Step 5 Preview](https://www.stepfun.com/step-5-preview), and [Hugging Face](https://huggingface.co/stepfun-ai). Step 5 Preview is available via product/API, but the official page says open weights arrive 2026-10-15; preview-only scope rule keeps it out.
- **AI21 Labs:** [blog](https://www.ai21.com/blog) and [Studio](https://studio.ai21.com/). October entries concern agent research and enterprise gateway/harness services, not a new Jamba or other qualifying model line.

## Per-provider retrieval status and unresolved surfaces

| Provider/surface | Retrieval status | Decision for this window |
|---|---|---|
| DeepSeek API news | Configured URL fetched as page-not-found. | No new release claimed; coverage remains limited by the broken archive. |
| LongCat blog | Configured `https://longcat.ai/blog/longcat-2.0` returned HTTP 200 with raw title `Introducing LongCat-2.0`, but the page extractor failed; home/HF/GitHub were available. | LongCat-2.5-Preview is explicitly skipped; LongCat-2.0 is pre-window and no dated non-preview row claimed. |
| Z.ai blog | Configured URL fetched as 404; official release-notes fallback was extractable. | No post-boundary GLM release. |
| Kimi X and Ant Ling X | Anti-bot blocked. | Decisions use accessible official company/HF/GitHub surfaces and retained prior source evidence; no new row inferred from absence. |
| Artificial Analysis Agnes model page | Exact candidate URL returned 404. | No Intelligence/Coding score stored; no sibling score copied. |

## Score, alias, and snapshot record

- **Agnes 3.0 Qwen:** exact maker alias `agnes-3.0-qwen`; upstream `Qwen/Qwen3.8-Flash-Next` is lineage, not a dashboard alias or second row. Exact AA URL `https://artificialanalysis.ai/models/agnes-3-0-qwen` returned 404. The AA leaderboard exposed no Agnes row. The model card's Terminal-Bench, IFBench, and other self-reported values are not Coding Index values. `codingIndex: null`, no `scoreSourceUrl`, and no Intelligence Index value.
- **Existing scored rows:** no Coding Index or Intelligence Index value was overwritten in this refresh. No score-parity correction was needed for an existing row.
- **Existing Haiku overlap:** `claude-haiku-5-5` remains the maker alias for the existing 2026-10-07 row; AWS Bedrock and Claude Platform on AWS identifiers are integrations, not dashboard aliases or rows.
- **Preview/metric exclusions:** Step 5 Preview, Mistral Large 4 Preview, and any maker/AA benchmark claims remain absent because preview-only rows and non-Coding metrics are outside the dataset policy.

## Result and evidence boundary

- One intended dataset addition: `Agnes 3.0 Qwen`; final dataset target is 149 rows, 149 unique model names, newest `releaseDate` `2026-10-10`.
- One provider checklist expansion: Agnes AI now includes the exact official GitHub/Hugging Face discovery surfaces and bounded queries used to find the new release.
- One cache-key refresh: `20261013a` in `index.html` and both module imports in `src/app.js`.
- No other qualifying model, score, provider, or alias was added or changed.
- The refresh distinguishes direct official page evidence, registry fallback metadata, benchmark discovery, and inaccessible-source limitations. No claim of direct AA score verification is made for Agnes 3.0 Qwen.

## Verification evidence captured

- `npm test`: **100 passed, 0 failed** (Node test coverage run; 100 total tests).
- `git diff --check`: **passed**.
- `node scripts/verify-model-refresh.mjs --cutoff=2026-10-13`: **149 rows, 149 unique names, newest `2026-10-10`, 26 configured providers, 4 missing labs, 30 checklist headings, 274 URL union, no invariant errors**.
- Final `node scripts/check-provider-releases.mjs --markdown`: **30 headings** (26 configured providers plus 4 missing labs), derived from the new latest release date `2026-10-10`. The pre-research checklist used the required `2026-10-07` boundary.
- Bounded HTTP smoke `node scripts/verify-model-refresh.mjs --cutoff=2026-10-13 --http`: **274 URLs checked; 264 returned 2xx and 10 returned known/non-2xx limitations; no invariant errors**. Required Haiku, Artificial Analysis model, and Artificial Analysis leaderboard URLs passed in the smoke run.
- Direct new-row/source smoke: `https://huggingface.co/Agnes-AI/Agnes-3.0-Qwen` **200**, `https://github.com/AgnesAI-Labs/Agnes-3.0-Qwen` **200**, `https://artificialanalysis.ai/leaderboards/models` **200**, and the exact candidate AA URL `https://artificialanalysis.ai/models/agnes-3-0-qwen` **404**. The 404 is recorded as the reason the new row has no AA score; it is not treated as a source failure for the maker release.
- The remaining 10 non-2xx smoke results are retained as evidence limits for existing/inaccessible source or benchmark URLs; no value was inferred from them.
- The first fresh-context critical review found one important evidence mismatch: the LongCat ledger line used the wrong generic URL/status. The audit was corrected to the configured `https://longcat.ai/blog/longcat-2.0` URL and raw HTTP result, and the exact Agnes HF, InclusionAI, and Inception surfaces were added to the coverage record.
- A bounded fresh-context follow-up review after that correction returned **PASS** with no critical, important, or minor findings. The reviewer was read-only and made no repository changes.
