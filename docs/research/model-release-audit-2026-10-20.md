# Model-release audit — 2026-10-20

## Baseline, window, and policy

- **Repository/branch:** `agentic-model-release-tracker`, `main` working tree; direct publication to `origin/main` is explicitly authorized. No worktree and no PR.
- **Remote:** `origin` → `https://github.com/jgordijn/agentic-model-release-tracker.git`.
- **HEAD / `origin/main` before this refresh:** `59cdebe61b26623f9573334320333012adfe62de` — `feat(data): refresh model releases through 2026-10-18` (`2026-10-18T05:14:03Z`). This was the latest commit changing `src/modelData.js` and `origin/main` matched HEAD after fetch.
- **Working-tree baseline:** 156 rows, 156 unique model names; newest tracked `releaseDate` `2026-10-16` (`Dory 1.0 4B`). The only pre-existing working-tree change was the untracked `screenshots/baseline-local.png`; it was left untouched. No unrelated tracked changes were present.
- **Research cutoff:** `2026-10-20T07:05:36+02:00` in `Europe/Amsterdam` (`2026-10-20T05:05:36Z`).
- **Effective research window:** inclusive `2026-10-16` through `2026-10-20`. The `2026-10-16` boundary was rechecked without duplicating Dory 1.0 4B. Three qualifying releases were verified after the baseline: DeepSeek V4.1 Flash 1017 on October 17, MiniMax M3.1 Flash on October 19, and Mercury 3 on October 19. No qualifying maker release dated October 18 or October 20 was verified.
- **Scope:** add only maker-released base model lines or clearly differentiated specialized-base lines relevant to programming or agentic work. Exclude product features, provider integrations, modality-only releases, quantizations, pure snapshots/checkpoints, API aliases, mini/nano/lite tiers, and preview-only configurations. A named, materially improved dated model update is eligible only when the maker exposes it as a distinct live model/card rather than a packaging-only snapshot.
- **Score rule:** `codingIndex` is populated only from an exact Artificial Analysis Coding Index row for the exact model/configuration. Intelligence Index, Agentic Index, Terminal-Bench, SWE-bench, DeepSWE, maker scores, and other metrics are not substitutes. Unknown exact Coding Index values remain `null` without `scoreSourceUrl`; the separate `intelligenceIndex` field remains metric-specific.

## Required checklist and bounded retrieval

- The required pre-research command was run before edits: `node scripts/check-provider-releases.mjs --markdown`. It derived `since 2026-10-16` from the 156-row baseline and emitted 26 configured providers plus 4 explicit missing labs.
- One bounded discovery query was run for each configured provider and each explicit missing lab: 30 provider/lab queries total. Search results were used only as discovery leads; no second broad sweep was run. Narrow exact follow-ups were limited to DeepSeek V4.1 Flash 1017, MiniMax M3.1 Flash, and Mercury 3 after direct surfaces exposed those candidates.
- A direct primary-surface pass fetched the 99 URLs in the pre-refresh provider configuration: 93 returned 2xx, 5 returned 403, and 1 returned 404; no network failures occurred. The three newly discovered exact official release pages were then fetched separately and returned usable official content: DeepSeek `news261017`, MiniMax `minimax-m31f`, and Inception `introducing-mercury-3`.
- The provider configuration now registers those three exact release pages for future sweeps. The provider count remains 26 and the explicit missing-lab list remains unchanged at 4.
- Official registry/API discovery was used as a bounded follow-up: Hugging Face organization model lists and GitHub organization repository lists were checked for in-window creations. The only additional model-family lead was DeepSeek V4.1 Flash 1017. Other in-window registry activity was packaging, checkpoints, harnesses, datasets, modality-only models, or repository updates.
- Artificial Analysis's live model leaderboard was fetched directly (`HTTP 200`). It exposed the exact `DeepSeek V4.1 Flash 1017 (max)` row and no exact Coding Index field. The exact MiniMax model page was fetched and exposed Intelligence Index 43 but no Coding Index field. Candidate Mercury 3 model slugs checked on Artificial Analysis returned 404 and no leaderboard row was found. No mirror-derived Coding Index value or user screenshot was used.

## Candidate ledger

| Candidate | Provider | Maker/public date | Decision | Evidence and reason |
|---|---|---:|---|---|
| DeepSeek V4.1 Flash 1017 | DeepSeek | 2026-10-17 | **Add** | Official [DeepSeek release page](https://api-docs.deepseek.com/news/news261017) says the model is live on the website, app, and API and links the dedicated [Hugging Face model card](https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash-1017). The card calls it a minor update with materially improved reasoning, coding, and agentic-task performance. It is not treated as a packaging-only snapshot or alias because the maker exposes a distinct live model/card and documents substantive behavior changes. Exact AA Intelligence page is tracked separately; exact AA Coding Index remains unknown. |
| MiniMax M3.1 Flash | MiniMax | 2026-10-19 | **Add** | Official [MiniMax announcement](https://www.minimax.io/blog/minimax-m31f) says the model is officially rolled out for agentic tasks, coding, computer use, and cybersecurity and is available through the MiniMax API, M Plan, and MiniMax Code. It is a distinct Flash model line, not a mini/nano/lite tier or product-only row. Exact AA Coding Index remains unknown. |
| Mercury 3 | Inception | 2026-10-19 | **Add** | Official [Inception announcement](https://inceptionlabs.ai/blog/introducing-mercury-3) introduces a live flagship diffusion LLM for browser-use agents, real-time search agents, data engineering, and other agentic applications, available through the API and OpenRouter. Exact AA Coding Index remains unknown. |
| DeepSeek V4.1 Flash 1017 packaging / API aliases | DeepSeek | 2026-10-17 | **Skip duplicate** | The dedicated 1017 model is one release row; prompt/API aliases and weight formats are not separate rows. |
| MiniMax M3.1 Flash maker benchmarks | MiniMax | 2026-10-19 | **Do not store as Coding Index** | DeepSWE, AutomationBench, OSWorld, Agents' Last Exam, and the maker's other benchmark figures are not Artificial Analysis Coding Index values. |
| Mercury Voice / Mercury Decide | Inception | 2026-10-19 | **Skip** | The Mercury 3 announcement identifies Voice as a voice-specialized product and Decide as a decision/classification model; neither is a programming/agentic base line for this dashboard. |
| InclusionAI Ming 3.0 audio models | InclusionAI | 2026-10-19 | **Skip** | Official GitHub/Hugging Face activity exposed TTS/ASR/audio releases. They are modality-only and explicitly excluded. |
| Agnes-Video-2.0-MoE | Agnes AI | 2026-10-19 | **Skip** | Official Hugging Face activity exposed an audio-video generation model; modality-only. |
| Tencent DSpine / Hy4 preview activity | Tencent | 2026-10-16–18 | **Skip** | Official HF/GitHub surfaces expose a checkpoint/variant and a preview-only family; neither is a new qualifying programming/agentic base line. |
| NVIDIA packaging and updated Nemotron cards | NVIDIA | 2026-10-16–20 | **Skip duplicate** | Dory formats and Nemotron card updates are packaging or existing-family activity; no new qualifying family beyond the tracked Dory/Nemotron rows. |
| LongCat-DeepResearch | LongCat | current activity | **Skip** | Official LongCat surfaces describe a research system/harness whose model improvements are intended for a future general-purpose release; it is not a new general programming/agentic base row. |
| AI21 partner post-training on Nemotron | AI21 Labs | 2026-10-15 | **Skip** | Official Studio page links a partner/post-training announcement, not an AI21 base model release; it is before the window and is a partner/integration item. |
| Cohere North 2 / Embed 5 / North Small Translate | Cohere | current / 2026-09 | **Skip** | Official Cohere blog/changelog show a platform update, embeddings, translation, and other specialized modality/task models; no in-window programming/agentic base line. |
| Step-5-Preview | StepFun | current | **Skip** | Official StepFun homepage and HF card explicitly label it Preview; preview-only rows are excluded. |
| Amazon Priming hybrid model zoo | Amazon | 2026-10-12 | **Skip** | Official Amazon Science RSS exposes a research/model zoo item before the window, not a named Nova base model release. |
| All other candidates | All remaining configured providers and missing labs | — | **No additional qualifying row verified** | Each provider/lab received one bounded discovery query plus a direct check of configured official surfaces. Evidence limits are recorded below; absence from a current benchmark catalog was not interpreted as deletion or a score decision. |

## Added rows and exact metric provenance

### DeepSeek V4.1 Flash 1017

- **Canonical display name:** `DeepSeek V4.1 Flash 1017`; aliases checked: `DeepSeek-V4.1-Flash-1017` and `deepseek-v4.1-flash-1017`.
- **Maker source:** [DeepSeek-V4.1-Flash-1017: Wish-Driven Programming Made Real](https://api-docs.deepseek.com/news/news261017).
- **Supporting official source:** [DeepSeek AI Hugging Face card](https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash-1017), whose registry `createdAt` was fetched as `2026-10-17T02:40:38Z`.
- **Scope evidence:** the maker says the update is live on the website, app, and API and documents improved coding, agentic tasks, faster completion, shorter outputs, tool use, and a dedicated open-weight card. The distinct model/card and substantive update are why this is not collapsed as a pure snapshot or alias.
- **Artificial Analysis:** exact model page [DeepSeek V4.1 Flash 1017 (max)](https://artificialanalysis.ai/models/deepseek-v4-1-flash-1017) returned Intelligence Index `45`; the direct leaderboard row showed the same `max` identity but no Coding Index field. The historical [Coding Index dataset](https://easy-benchmarks.com/benchmarks/artificial_analysis_coding_index) did not expose a verified exact 1017 Coding row. No maker DeepSWE, Terminal-Bench, or other score was substituted.
- **Stored values:** `codingIndex: null`; `intelligenceIndex: 45`; `intelligenceIndexConfiguration: "max"`; no `scoreSourceUrl`.

### MiniMax M3.1 Flash

- **Canonical display name:** `MiniMax M3.1 Flash`; aliases checked: `MiniMax-M3.1-Flash` and `minimax-m3.1-flash`.
- **Maker source:** [MiniMax M3.1 Flash: Redefining Agent Performance and Cost](https://www.minimax.io/blog/minimax-m31f), listed by the official blog as `2026-10-19` and stating “Today, we officially roll out MiniMax M3.1 Flash.”
- **Scope evidence:** the maker explicitly positions the model for agentic tasks, coding, Computer Use, and cybersecurity, with API and coding-product availability. “Flash” is the named model line, not a disallowed mini/nano/lite tier.
- **Artificial Analysis:** exact model page [MiniMax-M3.1-Flash](https://artificialanalysis.ai/models/minimax-m3-1-flash) returned Intelligence Index `43` for the reasoning version and no exact Coding Index field. The page's Intelligence score is stored separately; MiniMax DeepSWE, AutomationBench, OSWorld, and other maker values are not substitutes.
- **Stored values:** `codingIndex: null`; `intelligenceIndex: 43`; `intelligenceIndexConfiguration: "reasoning"`; no `scoreSourceUrl`.

### Mercury 3

- **Canonical display name:** `Mercury 3`; alias checked: `mercury-3`.
- **Maker source:** [Diffusion at Scale: Introducing Mercury 3](https://inceptionlabs.ai/blog/introducing-mercury-3), dated `2026-10-19` on the official page.
- **Scope evidence:** Inception describes a live flagship LLM for browser-use agents, real-time search agents, data engineering, and other agentic applications, with API/OpenRouter availability. It is a distinct model line; Mercury Voice and Mercury Decide are separately scoped products.
- **Artificial Analysis:** candidate slugs `mercury-3`, `mercury-3-0`, and `inception-mercury-3` returned 404; no exact leaderboard row was found. No Coding Index or Intelligence Index value was inferred from Inception's benchmark claims.
- **Stored values:** `codingIndex: null`; `intelligenceIndex: null`; no score source fields.

## Configured-provider coverage

Every configured provider was checked against its configured official surfaces and one bounded discovery path for the inclusive window. The three exact official release surfaces used for additions are now registered in `scripts/provider-release-sources.json`.

- **OpenAI:** checked [news](https://openai.com/news/), [index](https://openai.com/index/), and [API models](https://platform.openai.com/docs/models). No new qualifying model after October 16; search results were stale or existing-family material.
- **Anthropic:** checked [newsroom](https://www.anthropic.com/news) and [model docs](https://docs.anthropic.com/en/docs/about-claude/models). The newest qualifying model remains Claude Haiku 5.5 on October 7; October 18 was a public-benefit announcement.
- **Google:** checked [Gemini archive](https://blog.google/innovation-and-ai/models-and-research/gemini-models/), [developer news](https://blog.google/innovation-and-ai/technology/developers-tools/), and [API model catalog](https://ai.google.dev/gemini-api/docs/models). The catalog was updated October 19 but showed existing Gemini 4 Argon and Gemini 3.8 families; no new qualifying line.
- **Meta:** checked [HF organization](https://huggingface.co/meta-models), [Meta AI blog](https://ai.meta.com/blog/), [Meta AI](https://www.meta.com/ai/), [Muse Wonder](https://research.meta.ai/blog/muse-wonder), [developer catalog](https://developer.meta.com/ai/), and [Muse Spark Open](https://dev.meta.ai/models/muse-spark-open). No new model after the existing October 15 row.
- **OpenBMB:** checked [HF organization](https://huggingface.co/OpenBMB), [GitHub organization](https://github.com/OpenBMB), and [MiniCPM repository](https://github.com/OpenBMB/MiniCPM). Recent activity was MiniCPM-V packaging/datasets; no new qualifying family.
- **Apodex:** checked [home](https://www.apodex.com/), [Apodex 1.1](https://www.apodex.com/blog/apodex-1.1-scaling-agentic-intelligence-for-complex-work), and [API](https://www.apodex.com/api). No new model after August 24.
- **xAI:** checked [news](https://x.ai/news) and [developer models](https://docs.x.ai/developers/models). October 14 was voice-only; no new qualifying model after October 16.
- **Cursor:** checked [Cursor blog](https://cursor.com/blog). October 16 Cloud Agent Canvases and Environment Improvements is product functionality, not a model line.
- **Mistral:** checked [news](https://mistral.ai/news) and [model overview](https://docs.mistral.ai/getting-started/models/models_overview/). No new in-window qualifying model; Large 4 remains an October 6 preview/out-of-window.
- **Alibaba:** checked [legacy Qwen blog](https://qwenlm.github.io/blog), [Qwen blog](https://qwen.ai/blog), and [QwenCloud models](https://www.qwencloud.com/models). No new in-window family; later activity was existing-family/snapshot material.
- **Tencent:** checked [UI-Mate](https://ui-mate.github.io/), [HF organization](https://huggingface.co/tencent), [GitHub organization](https://github.com/Tencent), [Hy-Memory card](https://huggingface.co/tencent/Hy-Memory-30B-A3B), and [Hy-Memory repository](https://github.com/Tencent-Hunyuan/Hy-Memory). DSpine and Hy4 preview activity were excluded.
- **DeepSeek:** checked [API news index](https://api-docs.deepseek.com/news/), [exact October 17 release](https://api-docs.deepseek.com/news/news261017), [HF organization/card](https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash-1017), and [transparency center](https://www.deepseek.com/en/transparency/). Added DeepSeek V4.1 Flash 1017; the generic news index is currently a not-found page but the exact official release page is live.
- **Moonshot.ai:** checked [platform changelog](https://platform.moonshot.ai/blog/posts/changelog), [company site](https://www.moonshot.ai/), and [Kimi account](https://x.com/Kimi_Moonshot). No new Kimi line.
- **MiniMax:** checked [news](https://www.minimax.io/news), [blog](https://www.minimax.io/blog), [M3.1 Flash announcement](https://www.minimax.io/blog/minimax-m31f), and the exact [AA model page](https://artificialanalysis.ai/models/minimax-m3-1-flash). Added MiniMax M3.1 Flash; speech, video, image, and product-only items were excluded.
- **Z.ai:** checked [blog](https://z.ai/blog) and [release notes](https://docs.z.ai/release-notes/new-released). The blog returns 404 and release notes stop at August 26; no new model verified.
- **Xiaomi:** checked [GitHub organization](https://github.com/XiaomiMiMo), [HF organization](https://huggingface.co/XiaomiMiMo), and [MiMo-V2.6](https://mimo.xiaomi.com/mimo-v2-6). October activity was dataset/agent/repository work and existing-family updates; no new model line.
- **NVIDIA:** checked [Build catalog](https://build.nvidia.com/nvidia), [HF organization](https://huggingface.co/nvidia), and the tracked [Dory card](https://huggingface.co/nvidia/NVIDIA-Nemotron-Labs-Dory1.0-4B-BF16). No new qualifying family beyond Dory; packaging and retrieval/speech models were excluded.
- **IFM:** checked [K2 home](https://ifm.ai/k2/), [press release](https://ifm.ai/k2/press-release/), and [docs](https://docs.ifm.ai/). No new release verified; access limitations are not treated as absence proof.
- **Agnes AI:** checked [home](https://agnes-ai.com/), [docs](https://www.agnes-ai.com/zh-Hans/docs/agnes-30-flash), [platform](https://platform.agnes-ai.com), [GitHub](https://github.com/AgnesAI-Labs), [HF organization](https://huggingface.co/Agnes-AI), and recent cards. October activity was Agnes Video 2.0 and research/harness work; modality-only and harness items were excluded.
- **InclusionAI:** checked [HF organization](https://huggingface.co/inclusionAI), [model catalog](https://www.inclusion-ai.org/model), [LLaDA-UI](https://www.inclusion-ai.org/LLaDA-UI/), [GitHub](https://github.com/inclusionAI), and [Ant Ling](https://x.com/AntLingAGI). October activity was Ming audio/TTS/ASR and existing Ling updates; no new programming/agentic base line.
- **Inception:** checked [home](https://inceptionlabs.ai/), [Mercury 2.5](https://inceptionlabs.ai/blog/introducing-mercury-2-5), [Mercury 3](https://inceptionlabs.ai/blog/introducing-mercury-3), [models](https://inceptionlabs.ai/models), and [docs](https://docs.inceptionlabs.ai/get-started). Added Mercury 3; Voice and Decide were excluded as specialized non-programming products.
- **IBM Granite:** checked [Granite 4.2 announcement](https://research.ibm.com/blog/introducing-granite-4-2), [Granite site](https://www.ibm.com/granite), and [HF organization](https://huggingface.co/ibm-granite). October page activity was related research/site metadata; Granite 4.2 remains the tracked family.
- **LongCat:** checked [home](https://longcat.ai/), [LongCat 2.0](https://longcat.ai/blog/longcat-2.0), [HF organization](https://huggingface.co/meituan-longcat), and [GitHub](https://github.com/meituan-longcat). LongCat-DeepResearch is a research system/harness, not a new general base line.
- **Thinking Machines:** checked [company site](https://thinkingmachines.ai/), [Inkling article](https://huggingface.co/blog/thinkingmachines-inkling), [HF organization](https://huggingface.co/thinkingmachines), and [GitHub](https://github.com/thinking-machines-lab). No new model.
- **Arcee AI:** checked [home](https://arcee.ai/), [Trinity](https://arcee.ai/trinity), [HF organization](https://huggingface.co/arcee-ai), and [model docs](https://docs.arcee.ai/get-started/models-overview). October activity was the `nac` agent harness and documentation updates, not a new model.
- **Celeris:** checked [home](https://celeris.ai/), [Celeris-1](https://celeris.ai/celeris-1), [Magnus](https://celeris.ai/celeris-1-magnus), and [blog](https://celeris.ai/blog). No new qualifying model after the October 8 decision-specialized release.

## Explicitly missing-lab coverage

- **Amazon:** checked [AWS What's New](https://aws.amazon.com/about-aws/whats-new/) and [Amazon Science RSS](https://www.amazon.science/index.rss). RSS was current through October 12 and exposed Priming research/model artifacts outside the window; no Nova or other qualifying base model.
- **Cohere:** checked [blog](https://cohere.com/blog), [release notes](https://docs.cohere.com/changelog), and [HF organization](https://huggingface.co/CohereLabs). October posts were enterprise/product material; Embed 5, North Small Translate, Parse, and North Mini Code are outside the window or out of programming/agentic base scope.
- **StepFun:** checked [homepage](https://www.stepfun.com/) and [HF organization](https://huggingface.co/stepfun-ai). Step-5-Preview remains explicitly preview-only; no addition.
- **AI21 Labs:** checked [blog](https://www.ai21.com/blog) and [Studio](https://studio.ai21.com/). The blog was anti-bot limited; Studio exposed an October 15 partner/post-training item and coding-agent research, not a new AI21 base model. This remains an evidence limit, not an absence proof.

## Evidence limits and source-parity record

- The bounded search backend returned empty results for most provider-specific queries; it was not repeated broadly. Direct official pages, RSS, HF registries, GitHub organization APIs, and exact model pages were used for follow-up discovery.
- Some configured surfaces are dynamic, blocked, stale, or not-found: the generic DeepSeek news index and Z.ai blog return 404/not-found content; AI21's blog is anti-bot limited; Xiaomi's model page is not extractable; IFM surfaces may be access-limited; LongCat's direct blog was not extractable. These are recorded limits, not negative release proofs.
- Artificial Analysis was used for exact metric discovery only. The two scored dashboard fields added in this refresh are **Intelligence Index** values stored separately from `codingIndex`; no Coding Index value was added. The exact Coding Index remains unknown for all three new rows.
- No mirror-derived Coding Index values, user screenshots, maker benchmark values, or undated cached values were used.
- The live AA leaderboard and exact model pages use configuration-specific rows. DeepSeek's exact row is `(max)` and MiniMax's exact page is the reasoning version; these configurations are recorded in the separate Intelligence Index provenance and were not used to manufacture Coding Index values.

## Result and pre-publication verification

- **Rows added:** 3 — `DeepSeek V4.1 Flash 1017`, `MiniMax M3.1 Flash`, and `Mercury 3`.
- **Provider checklist change:** DeepSeek, MiniMax, and Inception gained exact official release URLs; provider count remains 26 and missing labs remain Amazon, Cohere, StepFun, and AI21 Labs.
- **Expected final dataset:** 159 rows, 159 unique model names; newest maker `releaseDate` `2026-10-19`.
- **Cache key:** `20261020a` in `index.html`, the `src/app.js` model-data import, and the `src/app.js` dashboard-logic import.
- **Coding scores added:** none; all three exact Artificial Analysis Coding Index values remain unknown.
- **Separate Intelligence scores added:** DeepSeek V4.1 Flash 1017 = `45` (`max`); MiniMax M3.1 Flash = `43` (`reasoning`). These are not Coding Index substitutions.
- **Verification:** `npm test` — 104 passed, 0 failed; `git diff --check` passed; `node scripts/verify-model-refresh.mjs --cutoff=2026-10-20` — 159 rows, 159 unique models, newest `2026-10-19`, 26 configured providers, 4 missing labs, 30 checklist headings, 294 URL union, no invariant errors.
- **Bounded HTTP smoke/source check:** `node scripts/verify-model-refresh.mjs --cutoff=2026-10-20 --http` checked 294 URLs; 274 returned 2xx and 20 returned known/non-2xx limitations; no invariant errors. The limitations were the existing OpenAI/xAI/IFM access blocks, the existing Agnes 3.0 Flash AA 404, and the existing Z.ai blog 404. The three new maker URLs and both exact AA Intelligence URLs returned 2xx.
- **Initial read-only critical review:** an independent fresh-context reviewer found no data, scope, provenance, score, provider-config, cache-key, test, or unrelated-change defect. It initially marked the ledger **FAIL** only because this verification section had not yet recorded the HTTP result and review status.
- **Review finding fixed:** this ledger now records the bounded HTTP result and the initial review limitation; no code or data change was required for the finding. A bounded fresh-context follow-up review is required before publication.
- **Follow-up read-only critical review:** **PASS** in a fresh context after the ledger correction; no critical, important, or repository-level minor blocker remained. A reviewer recheck observed the known HTTP endpoint split vary by one URL (`275/19` on one recheck versus the canonical run's `274/20`, followed by transient network-wide failures on a later retry); this is external status volatility, not a data or publication blocker. The canonical recorded smoke result is the completed parent run above.
- **Remaining publication gate:** focused commit, direct push to `origin/main`, Actions Pages run verification, and live cache-busted asset/UI verification.
