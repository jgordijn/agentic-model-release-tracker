# Model-release audit — 2026-10-09

## Baseline, window, and policy

- **Repository/branch:** `agentic-model-release-tracker`, `main` working tree; direct publication to `origin/main` is explicitly authorized. No worktree and no PR.
- **Remote:** `https://github.com/jgordijn/agentic-model-release-tracker.git`.
- **Baseline HEAD:** `c137662d5fb0043470c1e303c8bfcf8a1bcfdac7` — `feat(data): refresh model releases through 2026-10-05` (2026-10-05).
- **HEAD dataset baseline:** 147 rows; newest tracked `releaseDate` `2026-09-30`. The last data commit and newest release date are separate facts.
- **Carried refresh state at start:** the existing staged, refresh-related change from the 2026-10-08 run contains one verified addition (`Claude Haiku 5.5`), bringing the working dataset to 148 rows with newest `releaseDate` `2026-10-07`. It was not reset or mixed with unrelated work.
- **Current research window:** inclusive `2026-10-07` through `2026-10-09` in Europe/Amsterdam, using the newest `releaseDate` in the working `src/modelData.js` as the incremental baseline. The retained 2026-10-08 audit covers the earlier inclusive `2026-09-30`–`2026-10-08` boundary and is not superseded.
- **Cutoff/retrieval:** 2026-10-09, Europe/Amsterdam.
- **Checklist:** `node scripts/check-provider-releases.mjs --markdown` ran before research and emitted `since 2026-10-07`; it covered 26 configured providers and 4 explicit missing labs.
- **Scope:** include only base model lines or clearly distinct specialized-base lines relevant to programming/agentic work. Exclude product features, provider integrations, preview-only releases/configurations, mini/nano/lite tiers, modality-only releases, quantizations, pure snapshots/checkpoints, aliases, and sibling/family score copying.
- **Score rule:** `codingIndex` is populated only from an exact Artificial Analysis Coding Index row and configuration. Intelligence Index, Agentic Index, Terminal-Bench, SWE-bench, maker scores, and other metrics are not substitutes. Unknown Coding Index values remain `null` without a `scoreSourceUrl`.

## Retrieval method and evidence limits

- The provider checklist was run before external research. Search calls were bounded: the configured discovery searches returned empty/keyless fallback results because the Firecrawl backend failed, so they were not repeated as a broad sweep.
- Official provider/archive pages were fetched directly for the current window. Search snippets and benchmark/catalog leads were treated as discovery only, never as release evidence.
- The prior `docs/research/model-release-audit-2026-10-08.md` is retained as evidence for the 2026-09-30–2026-10-08 coverage and the carried Haiku change. This audit records the incremental 2026-10-07–09 pass separately.
- Direct-fetch limitations: the configured DeepSeek news URL returned a page-not-found response; the configured LongCat blog URL returned a resource-not-found response; the configured Z.ai blog URL was previously 404 and its official release-notes page was used instead. These are evidence limits, not fabricated negative claims.
- Artificial Analysis was checked through the model leaderboard and exact model pages in the carried refresh. The Haiku page exposed an Intelligence Index value (`43`, `max`) but no exact Coding Index field. No Coding Index value was added or changed in this incremental pass.

## Candidate ledger

| Candidate | Provider | Official evidence | Scope / score decision |
|---|---|---|---|
| Claude Haiku 5.5 | Anthropic | [Anthropic newsroom](https://www.anthropic.com/news) lists the announcement on 2026-10-07; exact [announcement](https://www.anthropic.com/claude-haiku-5-5). | **Add** in the carried refresh as a base model for subagent coding and browser work. `codingIndex: null`; AA exact page has Intelligence Index 43 at `max`, stored separately. |
| GPT-6 and Intelligent UI for everyone | OpenAI | [Official OpenAI index entry](https://openai.com/index/gpt-6-for-everyone/) dated 2026-10-07. | **Skip:** product/UI announcement and family/product alias; existing GPT-6 model lines remain the dashboard rows. |
| GPT-6.1 Sol Ultrafast on Amazon Bedrock | Amazon / OpenAI | [AWS announcement](https://aws.amazon.com/about-aws/whats-new/2026/10/openai-gpt-sol-ultrafast-amazon/) dated 2026-10-08. | **Skip:** provider integration and inference mode, not a new base model line. |
| Mistral Large 4 Preview | Mistral | [Mistral announcement](https://mistral.ai/news/mistral-large-4/) labels it a public preview and says weights arrive later. | **Skip:** preview-only under the project rule; no row and no score copied. |
| Step 5 Preview | StepFun (missing lab) | [Official Step 5 page](https://www.stepfun.com/step-5-preview) says the preview is available through products and API, while open weights are planned for 2026-10-15. | **Skip:** it is available as a maker-labeled preview, but the explicit refresh policy excludes all preview-only releases/configurations. The page's maker benchmarks are not Artificial Analysis Coding Index values. |
| Celeris-1-decision | Celeris | [Official announcement](https://celeris.ai/celeris-1-decision) dated 2026-10-08 describes a hosted typed-decision API with no open weights or fine-tuning. | **Skip:** decision-specialist API, not a programming/agentic base or specialized coding line. |
| Embed 5 | Cohere (missing lab) | [Official Cohere release note](https://docs.cohere.com/v2/changelog/embed-v5) dated 2026-09-30. | **Skip:** embedding-only family, even though code retrieval is listed. |
| North Mini Code | Cohere (missing lab) | Secondary Artificial Analysis discovery lead only; no qualifying maker release source accepted. | **Skip:** mini tier and secondary-only evidence. |
| MiMo-V2.6 MOPD variants | Xiaomi | [Official Xiaomi MiMo Hugging Face organization](https://huggingface.co/XiaomiMiMo) shows recent MOPD uploads alongside the existing MiMo-V2.6 family. | **Skip:** checkpoint/variant updates, not a new family release; no snapshot or sibling row. |
| Mercury Voice | Inception | [Official Inception blog](https://inceptionlabs.ai/blog) lists the 2026-09-29 Mercury Voice announcement. | **Skip:** voice-only model, outside programming/agentic model scope. |
| All other configured and missing-lab candidates | All listed providers | Official surfaces below were checked for the window; no additional qualifying base or specialized-base programming/agentic release was verified. | **No row.** A missing current leaderboard entry is not treated as deletion or as a score. |

## Configured-provider coverage

Each provider below was covered by the configured primary surfaces and bounded discovery path. The current pass records the direct surface used for the incremental window; the retained 2026-10-08 audit contains the full preceding-window surface notes.

- **OpenAI:** [news](https://openai.com/news/), [index](https://openai.com/index/), [API model docs](https://platform.openai.com/docs/models). The 2026-10-07 GPT-6/UI item and 2026-10-08 AWS Ultrafast item are product/integration changes; no new base line.
- **Anthropic:** [newsroom](https://www.anthropic.com/news), [model docs](https://docs.anthropic.com/en/docs/about-claude/models), and [Haiku 5.5](https://www.anthropic.com/claude-haiku-5-5). Haiku 5.5 is the carried verified addition.
- **Google:** [Gemini model archive](https://blog.google/innovation-and-ai/models-and-research/gemini-models/), [developer news](https://blog.google/innovation-and-ai/technology/developers-tools/), and [Gemini API models](https://ai.google.dev/gemini-api/docs/models). No post-boundary qualifying model; Gemini 4 Argon remains the latest tracked Google line.
- **Meta:** [Meta AI blog](https://ai.meta.com/blog/) and [Meta model organization](https://huggingface.co/meta-models). No qualifying post-boundary release.
- **OpenBMB:** [Hugging Face organization](https://huggingface.co/OpenBMB), [GitHub organization](https://github.com/OpenBMB), and [MiniCPM repository](https://github.com/OpenBMB/MiniCPM). Recent MiniCPM5 activity is an existing family/checkpoint surface, not a new qualifying row.
- **Apodex:** [blog](https://www.apodex.com/blog), [1.1 announcement](https://www.apodex.com/blog/apodex-1.1-scaling-agentic-intelligence-for-complex-work), and [API](https://www.apodex.com/api). No post-boundary model release.
- **xAI:** [news](https://x.ai/news) and [developer model docs](https://docs.x.ai/developers/models). Grok 4.7 remains dated 2026-09-21; later entries are products/integrations.
- **Cursor:** [blog](https://cursor.com/blog). The recent entries are agent/product features or coverage of existing Grok models; no Cursor base model release.
- **Mistral:** [news](https://mistral.ai/news), [model overview](https://docs.mistral.ai/getting-started/models/models_overview/), and [Large 4 announcement](https://mistral.ai/news/mistral-large-4/). Large 4 Preview is explicitly excluded.
- **Alibaba:** [Qwen blog](https://qwen.ai/blog), [legacy Qwen blog](https://qwenlm.github.io/blog), and [QwenCloud models](https://www.qwencloud.com/models). No new family; dated snapshots remain collapsed.
- **Tencent:** [UI-Mate](https://ui-mate.github.io/), [Hugging Face organization](https://huggingface.co/tencent), and [GitHub organization](https://github.com/Tencent). UI-Mate is an existing GUI-agent research/model surface, not a new in-window release.
- **DeepSeek:** configured [API news](https://api-docs.deepseek.com/news/) returned not found; [transparency](https://www.deepseek.com/en/transparency/) was retained from the prior audit. No new verified release; evidence is limited by the broken archive URL.
- **Moonshot.ai:** [platform changelog](https://platform.moonshot.ai/blog/posts/changelog), [company site](https://www.moonshot.ai/), and [Kimi X account](https://x.com/Kimi_Moonshot). No new base line.
- **MiniMax:** [news](https://www.minimax.io/news) and [blog](https://www.minimax.io/blog). Current model list remains M3/M2.7/M2.5; no new qualifying LLM.
- **Z.ai:** configured [blog](https://z.ai/blog) is unavailable; official [release notes](https://docs.z.ai/release-notes/new-released) show the latest listed GLM release as 2026-08-26. No new row.
- **Xiaomi:** [GitHub organization](https://github.com/XiaomiMiMo), [Hugging Face organization](https://huggingface.co/XiaomiMiMo), and [MiMo-V2.6 page](https://mimo.xiaomi.com/mimo-v2-6). Recent uploads are checkpoints/variants.
- **NVIDIA:** [NVIDIA model catalog](https://build.nvidia.com/nvidia) and [Hugging Face organization](https://huggingface.co/nvidia). The 2026-10-06 catalog update is not a qualifying programming/agentic base model release.
- **IFM:** [K2 Horizon](https://ifm.ai/k2/), [press release](https://ifm.ai/k2/press-release/), and [docs](https://docs.ifm.ai/). K2 Horizon remains a 2026-09-03 release.
- **Agnes AI:** [home](https://agnes-ai.com/), [Agnes 3.0 Flash docs](https://www.agnes-ai.com/zh-Hans/docs/agnes-30-flash), [platform](https://platform.agnes-ai.com), and [GitHub](https://github.com/AgnesAI-Labs). No new post-boundary model.
- **InclusionAI:** [model catalog](https://www.inclusion-ai.org/model), [Hugging Face organization](https://huggingface.co/inclusionAI), [LLaDA-UI](https://www.inclusion-ai.org/LLaDA-UI/), [GitHub](https://github.com/inclusionAI), and [Ant Ling X account](https://x.com/AntLingAGI). Ling 3.1 Flash remains the existing 2026-09-30 maker release; no duplicate.
- **Inception:** [blog](https://inceptionlabs.ai/blog), [models](https://inceptionlabs.ai/models), and [docs](https://docs.inceptionlabs.ai/get-started). Mercury Voice is modality-only; Mercury 2.5 remains the latest in-scope line.
- **IBM Granite:** [Granite 4.2 announcement](https://research.ibm.com/blog/introducing-granite-4-2), [IBM Granite](https://www.ibm.com/granite), and [Hugging Face organization](https://huggingface.co/ibm-granite). No post-boundary family release.
- **LongCat:** [home](https://longcat.ai/), configured [blog](https://longcat.ai/blog) (resource-not-found), [Hugging Face](https://huggingface.co/meituan-longcat), and [GitHub](https://github.com/meituan-longcat). No qualifying model verified; archive accessibility is limited.
- **Thinking Machines:** [company site](https://thinkingmachines.ai/), [Inkling announcement](https://huggingface.co/blog/thinkingmachines-inkling), [Hugging Face organization](https://huggingface.co/thinkingmachines), and [GitHub](https://github.com/thinking-machines-lab). Inkling remains 2026-07-15.
- **Arcee AI:** [Trinity](https://arcee.ai/trinity), [Hugging Face organization](https://huggingface.co/arcee-ai), and [model docs](https://docs.arcee.ai/get-started/models-overview). No dated post-boundary release; size variants stay collapsed under project policy.
- **Celeris:** [blog](https://celeris.ai/blog), [Celeris-1](https://celeris.ai/celeris-1), [Magnus](https://celeris.ai/celeris-1-magnus), and [decision model announcement](https://celeris.ai/celeris-1-decision). The new decision API is out of scope.

## Explicitly missing-lab coverage

- **Amazon:** [AWS What's New](https://aws.amazon.com/about-aws/whats-new/), [AWS RSS](https://aws.amazon.com/about-aws/whats-new/recent/feed/), and [Amazon Science RSS](https://www.amazon.science/index.rss). GPT-6.1 Sol Ultrafast and Haiku Bedrock availability are integrations, not new model lines; no Amazon Nova release.
- **Cohere:** [blog](https://cohere.com/blog), [release notes](https://docs.cohere.com/changelog), and [CohereLabs Hugging Face](https://huggingface.co/CohereLabs). Embed 5 is embedding-only; North Mini Code is secondary/mini evidence and is excluded.
- **StepFun:** [homepage](https://www.stepfun.com/), [Step 5 Preview](https://www.stepfun.com/step-5-preview), and [Hugging Face organization](https://huggingface.co/stepfun-ai). Step 5 is available through products/API as a maker-labeled preview; open weights are announced for 2026-10-15, and the preview-only scope rule keeps it out of the dataset.
- **AI21 Labs:** [blog](https://www.ai21.com/blog) and [Studio](https://studio.ai21.com/). October posts concern agent research and product/harness services, not a new Jamba/base model.

## Per-provider retrieval status and unresolved surfaces

The bounded pass has an explicit status for every access-limited surface; a blocked archive is not recorded as proof that no model exists.

| Provider/surface | Retrieval status | Decision for this window |
|---|---|---|
| OpenAI | Raw Node HTTP returned 403 for several older/index URLs, but the official news archive was extractable and listed the 2026-10-07 product item; current scope decision is resolved. | No qualifying new base line. |
| xAI | Raw Node HTTP returned 403 for the news archive, while the official news page was extractable and showed Grok 4.7 as the latest relevant model. | No qualifying new base line. |
| IFM | The official press release was extractable and confirms the 2026-09-03 K2 Horizon release; the configured docs and press URLs returned 403 to the bounded raw HTTP smoke. | No in-window release; docs surface remains an evidence limitation. |
| DeepSeek | The configured API-news archive returned page-not-found; the transparency surface from the retained prior audit was checked, but the archive remains unresolved. | No qualifying release verified; coverage is incomplete for the broken archive. |
| LongCat | The configured blog URL returned a resource-not-found response; the configured HF/GitHub surfaces were retained from the prior audit, but the blog archive remains unresolved. | No qualifying release verified; coverage is incomplete for the broken archive. |
| Z.ai | The configured blog URL returned 404; the official release-notes page was extractable and is the fallback archive. | No qualifying post-boundary GLM release. |
| Artificial Analysis Agnes historical page | `https://artificialanalysis.ai/models/agnes-3-0-flash` returned 404 in the URL smoke. This is an existing metric-provenance URL, not a new release source. | No score edit; the historical score remains explicitly evidence-limited. |

All other configured provider and missing-lab surfaces had either extractable official content in this pass or retained direct evidence in the 2026-10-08 audit. No affected provider was silently treated as fully exhaustive when its named archive remained inaccessible.

## Score, alias, and snapshot record

- **Claude Haiku 5.5:** maker alias `claude-haiku-5-5`; exact AA model URL `https://artificialanalysis.ai/models/claude-haiku-5-5`; Intelligence Index `43`, configuration `max`, retrieved 2026-10-08. No exact AA Coding Index field was independently fetched, so `codingIndex` is `null` and no coding score source is stored.
- **Existing score rows:** no Coding Index or Intelligence Index value was overwritten in the 2026-10-09 pass. No source-parity correction was needed.
- **Integration aliases:** Anthropic API `claude-haiku-5-5` is the stored maker alias. The provider-qualified AWS Bedrock ID `anthropic.claude-haiku-5-5` is documented as an integration alias only and is intentionally not a second dashboard alias/row. AWS Bedrock `GPT-6.1 Sol Ultrafast` and the Anthropic/AWS Haiku availability entries do not create dashboard aliases or rows. The OpenAI GPT-6/UI announcement is not a second GPT-6 family row.
- **Preview benchmark claims:** Step 5 Preview and Mistral Large 4 Preview publish maker/other benchmark claims, but none is an exact Artificial Analysis Coding Index row accepted by this dashboard. Those values remain absent.

## Result and evidence boundary

- The only intended dataset change in the working tree is the carried, verified `Claude Haiku 5.5` addition from the 2026-10-08 refresh: 148 rows, 148 unique model names, newest `releaseDate` `2026-10-07`.
- No additional qualifying model was found in the 2026-10-07–09 incremental pass. Provider source configuration remains unchanged; no qualifying lab outside the checklist was verified.
- The current pass distinguishes direct official page evidence, retained prior-audit evidence, and unaccepted secondary/benchmark discovery leads. Inaccessible archive pages remain explicit limitations rather than proof of absence.

## Verification evidence captured

- `npm test`: **99 passed, 0 failed** after the scope/provenance corrections.
- `git diff --check`: **passed** in the final follow-up review.
- `node scripts/check-provider-releases.mjs --markdown`: **30 provider headings** (26 configured providers plus 4 missing labs), with no duplicates or missing names.
- `node scripts/verify-model-refresh.mjs --cutoff=2026-10-09` invariant output: **148 rows, 148 unique names, newest `2026-10-07`, 26 configured providers, 4 missing labs, 30 checklist headings, 271 URL union, no invariant errors**.
- Bounded HTTP smoke command `node scripts/verify-model-refresh.mjs --cutoff=2026-10-09 --http` initially checked **271 URLs: 250 2xx and 21 known/non-2xx limitations**; the three required new/benchmark URLs returned 2xx in that run. A later retry encountered transient DNS/fetch failures (156 2xx / 115 network-or-HTTP failures), so that retry is recorded as a network limitation rather than treated as a contradictory source result. The official `web_extract` retrievals for the Anthropic announcement and exact Artificial Analysis pages returned page content and are the direct evidence used for the row.
- The first fresh reviewer gate found wording/proof issues; those were corrected in this audit and the prior audit was appended with a dated supersession note. A bounded follow-up reviewer must pass before commit/push.
