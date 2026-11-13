# Model-release audit — 2026-11-13

## Baseline, window, and policy

- **Repository/branch:** `agentic-model-release-tracker`, direct `main` working tree; no worktree and no PR.
- **Remote:** `origin` → `https://github.com/jgordijn/agentic-model-release-tracker.git`.
- **HEAD / `origin/main` before this refresh:** `e3013fcd6eecc60c4c3150027e79772e3ef5ae03` on both local `main` and `origin/main` after `git fetch origin --prune`.
- **Latest data commit before this refresh:** `e3013fcd6eecc60c4c3150027e79772e3ef5ae03` at `2026-11-12T06:44:27Z` (`feat(data): refresh releases through 2026-11-12`).
- **Working-tree baseline:** 175 rows, 175 unique model names; newest tracked `releaseDate` was `2026-11-11` (`JT-4.1 Flash 236B A21B`). The pre-existing untracked `screenshots/baseline-local.png` was left untouched. No unrelated tracked changes were present at start.
- **Research cutoff:** `2026-11-13` in `Europe/Amsterdam` (the run observed `2026-11-13T07:08:53+01:00` before implementation).
- **Research window:** inclusive `2026-11-11` through `2026-11-13`, using the newest tracked `releaseDate` as the lower boundary. Rows already dated `2026-11-11` were rechecked for duplicates and omissions.
- **Scope:** add only maker-released base model lines or clearly differentiated specialized-base lines relevant to programming or agentic work. Exclude product features, provider integrations, modality-only releases, quantizations, pure snapshots/checkpoints, API aliases, mini/nano/lite tiers, preview-only configurations, and serving/speed variants.
- **Metric rule:** `codingIndex` is populated only from an exact Artificial Analysis Coding Index row for the exact model/configuration. Intelligence Index, Agentic Index, Coding Agent Index, Terminal-Bench, SWE-bench, Agent Arena, maker scores, and other metrics are never substituted for Coding Index. Unknown exact Coding Index values remain `null`. Intelligence Index values are stored separately with their exact representative configuration.

## Required checklist and bounded retrieval

- The required first command ran before external research: `node scripts/check-provider-releases.mjs --markdown`. Its baseline output used `since 2026-11-11` and listed 27 configured providers plus 4 explicit missing labs.
- One bounded discovery query was run for each configured provider and explicit missing lab: **31 targeted queries total**. Search snippets were discovery leads only; no snippet was used as final maker evidence, and no second broad search sweep was launched.
- The live Artificial Analysis model leaderboard was fetched directly at `https://artificialanalysis.ai/leaderboards/models` on `2026-11-13` (`HTTP 200`, 1,800,150 bytes). Its embedded release records in the inclusive window were:
  - `Claude Fable 5.2` — `2026-11-09`, creator Anthropic; already tracked;
  - `Muse Ember` — `2026-11-09`, creator Meta; already tracked;
  - `JT-4.1 Flash 236B A21B` — `2026-11-11`, creator China Mobile; already tracked;
  - `Gemini 4 Hydrogen` — `2026-11-12`, creator Google; new qualifying candidate.
- The AA leaderboard is an Intelligence Index leaderboard and was used for release discovery plus configuration-specific Intelligence evidence only. It was not used as Coding Index evidence.
- Direct official extraction verified the new Google release through the [model announcement](https://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-gemini-4-hydrogen/), the [developer announcement](https://blog.google/innovation-and-ai/technology/developers-tools/build-with-gemini-4-hydrogen/), and the [Gemini API model catalog](https://ai.google.dev/gemini-api/docs/models). All three identify `gemini-4-hydrogen`; the announcement pages are dated November 12, 2026.
- No qualifying lab outside the existing provider checklist was found, so `scripts/provider-release-sources.json` did not need a provider addition.

## Provider coverage and decisions

Every configured provider and explicit missing lab below was checked with its configured primary source set and one bounded configured discovery query. “No add” means no new qualifying model was verified in the window; it does not claim that blocked pages contain no unindexed release.

### Configured providers

- **OpenAI — no add.** Checked [news](https://openai.com/news/), [index](https://openai.com/index/), and [API model docs](https://platform.openai.com/docs/models). The accessible news listing's November 9–11 items were company, product, marketplace, or safety material. Search leads for GPT-6 Astra and GPT-6.1 Sol are September releases already tracked. OpenAI's archive and several model pages return 403 to the smoke client; no absence claim was based on those blocked responses.
- **Anthropic — no add.** Checked [newsroom](https://www.anthropic.com/news), the [Fable/Mythos 5.2 announcement](https://www.anthropic.com/claude-fable-and-mythos-5-2), and [model docs](https://docs.anthropic.com/en/docs/about-claude/models). The newsroom's latest model item remains Fable/Mythos 5.2, already tracked from November 9. The Opus 4.8 search lead is an older May 2026 AA catalog release and is outside the window.
- **Google — add one.** Checked the [Gemini model archive](https://blog.google/innovation-and-ai/models-and-research/gemini-models/), [developer-tools archive](https://blog.google/innovation-and-ai/technology/developers-tools/), [Gemini API catalog](https://ai.google.dev/gemini-api/docs/models), and the exact Hydrogen announcement/developer pages listed above. `Gemini 4 Hydrogen` is a distinct generally available base model for everyday coding and agentic workflows, dated 2026-11-12. Existing Gemini 4 Carbon is not duplicated.
- **Meta — no add.** Checked [AI at Meta](https://ai.meta.com/blog/), [Meta developer AI](https://developer.meta.com/ai/), [Muse Ember research release](https://research.meta.ai/blog/muse-ember), [Muse Ember developer page](https://dev.meta.ai/models/muse-ember), and the [Meta Hugging Face organization](https://huggingface.co/meta-models). Muse Glimmer's official model card dates it to August 2026; recent organization activity is packaging, datasets, or multimodal work. Muse Ember was already tracked from November 9. Meta Coding Agent Index-AA and Terminal-Bench claims remain rejected as different metrics.
- **OpenBMB — no add.** Checked the [Hugging Face organization](https://huggingface.co/OpenBMB), [GitHub organization](https://github.com/OpenBMB), and [MiniCPM repository](https://github.com/OpenBMB/MiniCPM). MiniCPM5-1B is dated May 2026; recent OCR, vision, speech, GGUF, and dataset activity is outside the base programming/agentic scope or is packaging.
- **Apodex — no add.** Checked [blog](https://www.apodex.com/blog), [Apodex 1.1 announcement](https://www.apodex.com/blog/apodex-1.1-scaling-agentic-intelligence-for-complex-work), and [API catalog](https://www.apodex.com/api). The latest model line remains Apodex 1.1 from August 24; Deep Research, Discovery, and Mini offerings are product or size variants.
- **xAI — no add; access limitation recorded.** Checked [news](https://x.ai/news) and [developer model docs](https://docs.x.ai/developers/models). The accessible archive ends its recent model sequence at Grok 4.7 on September 21; November entries are Grok Bot/product material. The configured news page returned 403 to the smoke client, so no absence claim was inferred from that response.
- **Cursor — no add.** Checked the [Cursor blog](https://cursor.com/blog). November 10 Projects multiplayer, November 6 Voice Chat, and the October Agent SDK are product/integration features, not Cursor-owned base or specialized-base model releases.
- **Mistral — no add.** Checked [Mistral news](https://mistral.ai/news) and [model overview](https://docs.mistral.ai/getting-started/models/models_overview/). Le Chonk/Mistral Large 4 is already tracked from October 29. Voxtral 3 and Timestral are speech/forecasting modality lines; no in-window qualifying programming/agentic base model was verified.
- **Alibaba — no add; catalog access limitation recorded.** Checked the [Qwen legacy blog](https://qwenlm.github.io/blog), [Qwen blog](https://qwen.ai/blog), and [Qwen Cloud models](https://www.qwencloud.com/models). The Qwen web blog extraction contained no dated release listing; the Qwen Cloud catalog was dynamically/network inaccessible to the smoke client. No new family-level release was verified; preview, dated snapshot, service, image, video, and partner entries remain excluded.
- **Tencent — no add.** Checked [UI-Mate](https://ui-mate.github.io/), [Tencent Hugging Face](https://huggingface.co/tencent), [Tencent GitHub](https://github.com/Tencent), [Hy-Memory card](https://huggingface.co/tencent/Hy-Memory-30B-A3B), [Hy-Memory repository](https://github.com/Tencent-Hunyuan/Hy-Memory), [Hunyuan product page](https://cloud.tencent.com/product/hunyuan), and [TokenHub model list](https://cloud.tencent.com/document/product/1823/130051). UI-Mate is an existing GUI-agent research/weight surface; Hy4 is already tracked from November 3. No newer qualifying base line was found.
- **China Mobile — no add.** Checked [China Mobile news](https://www.10086.cn/aboutus/news/), the configured [Jiutian announcement](https://www.10086.cn/aboutus/news/groupnews/index_detail_56169.html), [Jiutian portal](https://jiutian.10086.cn/), [help-center surface](https://jiutian.10086.cn/portal/common-helpcenter#/document/1181?platformCode=DMX_TYZX), and the exact [ModelScope registry page](https://www.modelscope.cn/models/ChinaMobile/JT-4.1-Flash-236B-A21B). The November 11 JT row was already present and was rechecked; no later model was found. The Jiutian/ModelScope surfaces were intermittently blocked or network-failed in the smoke run but were independently used in the prior row's provenance.
- **DeepSeek — no add.** Checked [API news](https://api-docs.deepseek.com/news/), [V4.1 Flash 1017 announcement](https://api-docs.deepseek.com/news/news261017), and [transparency](https://www.deepseek.com/en/transparency/). Current docs describe `deepseek-flash` aliases, retirement routing, and DeepSeek Harness preview; no new model family was verified.
- **Moonshot.ai — no add.** Checked the [platform changelog](https://platform.moonshot.ai/blog/posts/changelog), [Moonshot home](https://www.moonshot.ai/), [Kimi blog](https://www.kimi.ai/blog/), [K3.1 Pro announcement](https://www.kimi.ai/blog/kimi-k3-1-pro), and [Kimi model docs](https://platform.kimi.ai/docs/models). Kimi K3.1 Pro is already tracked from October 24; the platform changelog is stale and no later qualifying model was verified. Highspeed remains a serving alias.
- **MiniMax — no add.** Checked [news](https://www.minimax.io/news), [research/blog](https://www.minimax.io/blog), and [M3.1 Flash announcement](https://www.minimax.io/blog/minimax-m31f). M3.1 Flash is already tracked from October 19; H3/H3 Image, speech, music, and Mini App entries are modality or product lines. Several MiniMax endpoints failed in the concurrent smoke run, so no absence claim relies on those failures.
- **Z.ai — no add; unresolved archive surface.** Checked [blog](https://z.ai/blog) and [release notes](https://docs.z.ai/release-notes/new-released). The blog returned 404; accessible release notes stop at previously tracked GLM releases. No in-window qualifying GLM model was verified, and the inaccessible blog is retained as an evidence limitation rather than proof of absence.
- **Xiaomi — no add.** Checked the [Xiaomi MiMo GitHub organization](https://github.com/XiaomiMiMo), [Hugging Face organization](https://huggingface.co/XiaomiMiMo), and [MiMo-V2.6 page](https://mimo.xiaomi.com/mimo-v2-6). The November 12 GitHub activity is MiMo-Code harness work; no new model family was found. MiMo-V2.5/V2.6 model, checkpoint, quantized, and serving variants remain covered by existing decisions.
- **NVIDIA — no add.** Checked [NVIDIA Build models](https://build.nvidia.com/nvidia), [NVIDIA Hugging Face](https://huggingface.co/nvidia), and the configured Nemotron/Dory model cards. The Build catalog's recent model updates predate the window; current Nemotron 3.5 entries are existing early-access/packaging or modality variants. No new qualifying base line was verified.
- **IFM — no add; access limitation recorded.** Checked [K2](https://ifm.ai/k2/), [K2 press release](https://ifm.ai/k2/press-release/), [docs](https://docs.ifm.ai/), [Jais](https://ifm.ai/jais/), [Jais 3 press release](https://ifm.ai/jais3/press-release/), [Jais 3 technical page](https://ifm.ai/blog/jais3/), [Jais docs](https://docs.ifm.ai/#/jais-3), and the [Jais Hugging Face collection](https://huggingface.co/collections/IFM/jais-3). K2 Horizon and Jais 3 are already represented; the IFM pages returned 403 in the smoke client. No later qualifying family was verified through accessible evidence.
- **Agnes AI — no add; access limitation recorded.** Checked [home](https://agnes-ai.com/), [Agnes 3.0 Flash docs](https://www.agnes-ai.com/zh-Hans/docs/agnes-30-flash), [Agnes 2.5 Pro Theta docs](https://www.agnes-ai.com/zh-Hans/docs/agnes-25-pro-theta), [platform](https://platform.agnes-ai.com), [GitHub](https://github.com/AgnesAI-Labs), and [Hugging Face](https://huggingface.co/Agnes-AI). Agnes 2.5 Pro Theta was already tracked from November 9; recent cards are older or modality-specific. The home page could not be scraped in this run, so no absence claim relies on that surface.
- **InclusionAI — no add.** Checked [Hugging Face](https://huggingface.co/inclusionAI), [model index](https://www.inclusion-ai.org/model), [LLaDA-UI](https://www.inclusion-ai.org/LLaDA-UI/), [GitHub](https://github.com/inclusionAI), [Ant Ling X account](https://x.com/AntLingAGI), and the configured Ling/LBS model cards. Recent SingVL, LemonDecider, ZoomGain, audio, GUI, and dataset activity is modality, decision, research, or existing-family work. Ling 3.1 Flash remains the latest qualifying tracked family.
- **Inception — no add.** Checked [home](https://inceptionlabs.ai/), [Mercury 2.5](https://inceptionlabs.ai/blog/introducing-mercury-2-5), [Mercury 3](https://inceptionlabs.ai/blog/introducing-mercury-3), [models](https://inceptionlabs.ai/models), and [docs](https://docs.inceptionlabs.ai/get-started). Mercury 3 is already tracked from October 19; Mercury Voice and Mercury Decide are not new general programming-model lines.
- **IBM Granite — no add.** Checked [Granite 4.2 announcement](https://research.ibm.com/blog/introducing-granite-4-2), [Granite site](https://www.ibm.com/granite), and [Hugging Face](https://huggingface.co/ibm-granite). Granite 4.2 is already tracked from August; recent speech, switch, and document artifacts are outside scope.
- **LongCat — no add.** Checked [LongCat home](https://longcat.ai/), [LongCat 2.0](https://longcat.ai/blog/longcat-2.0), [LongCat 2.5](https://longcat.ai/blog/longcat-2.5), [Hugging Face](https://huggingface.co/meituan-longcat), and [GitHub](https://github.com/meituan-longcat). LongCat 2.5 is already tracked from November 1; LongCat-Next/research and quantized packaging are not new qualifying rows.
- **Thinking Machines — no add.** Checked [home](https://thinkingmachines.ai/), [Inkling 2 Small](https://thinkingmachines.ai/news/inkling-2-small/), [Hugging Face article](https://huggingface.co/blog/thinkingmachines-inkling), [Hugging Face organization](https://huggingface.co/thinkingmachines), and [GitHub](https://github.com/thinking-machines-lab). Inkling 2 Small is already tracked from November 5; no later model release was verified.
- **Arcee AI — no add.** Checked [home](https://arcee.ai/), [Trinity](https://arcee.ai/trinity), [Hugging Face](https://huggingface.co/arcee-ai), and [model docs](https://docs.arcee.ai/get-started/models-overview). The latest official model surface remains Trinity; Nac is a harness and preview/mini/nano variants are excluded.
- **Celeris — no add.** Checked [home](https://celeris.ai/), [Celeris-1](https://celeris.ai/celeris-1), [Celeris-1 Magnus](https://celeris.ai/celeris-1-magnus), and [blog](https://celeris.ai/blog). Celeris-1.1 Decision is dated November 5, outside the window, and is a decision model rather than a general programming/agentic base line.

### Explicitly missing labs

- **Amazon — no add; remains missing.** Checked [AWS What's New](https://aws.amazon.com/about-aws/whats-new/) and [Amazon Science RSS](https://www.amazon.science/index.rss). November 12 AWS entries include a DevOps Agent integration, not a Nova model release; no qualifying Amazon base model was verified.
- **Cohere — no add; remains missing.** Checked [Cohere blog](https://cohere.com/blog), [release notes](https://docs.cohere.com/changelog), and [CohereLabs Hugging Face](https://huggingface.co/CohereLabs). Recent Rerank/Embed/Parse, North, translation, and coding-agent research items are retrieval, platform, or research material rather than a new programming/agentic base model.
- **StepFun — skip; remains missing.** Checked [StepFun](https://www.stepfun.com/) and [Hugging Face](https://huggingface.co/stepfun-ai). Step 5 Preview is explicitly labeled preview-only; its weights and format variants are excluded by policy. No other in-window qualifying model was verified.
- **AI21 Labs — no add; remains missing.** Checked [AI21 blog](https://www.ai21.com/blog) and [Studio](https://studio.ai21.com/). November 5 Teel is an execution library/harness, and the other recent entries are post-training case studies, benchmarks, or research; no new Jamba/base model was verified.

## Candidate ledger

| Candidate | Provider | Maker/source evidence | Scope decision | Exact score evidence |
|---|---|---|---|---|
| **Gemini 4 Hydrogen** | Google | [Official announcement](https://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-gemini-4-hydrogen/) dated 2026-11-12; [developer announcement](https://blog.google/innovation-and-ai/technology/developers-tools/build-with-gemini-4-hydrogen/) and [API catalog](https://ai.google.dev/gemini-api/docs/models) confirm `gemini-4-hydrogen`. | **Add** as one `base` row with focus `["agentic", "programming"]`. It is a distinct generally available model line; no preview, size, speed, modality-only, or alias row is duplicated. | `codingIndex: null`. The exact [AA high model page](https://artificialanalysis.ai/models/gemini-4-hydrogen-high) reports the stored Intelligence Index configuration and no exact Coding Index field. The direct AA leaderboard exposes high = displayed Intelligence Index 51 and xhigh = 54; repository convention selects `high` for the separate Intelligence Index field. [Easy Benchmarks exact page](https://easy-benchmarks.com/models/gemini-4-hydrogen) returns Model Not Found. No maker or non-Coding metric was substituted. |
| **Claude Fable 5.2 / Mythos 5.2** | Anthropic | [Official announcement](https://www.anthropic.com/claude-fable-and-mythos-5-2), 2026-11-09, already tracked. | **Recheck only; no duplicate.** Fable/Mythos are the same underlying model and remain one row. | No exact AA Coding Index field; existing `codingIndex: null` retained. |
| **Muse Ember** | Meta | [Official research release](https://research.meta.ai/blog/muse-ember), 2026-11-09, already tracked; developer identity page checked. | **Recheck only; no duplicate.** | Meta Coding Agent Index-AA and Terminal-Bench are rejected as different metrics; `codingIndex: null` retained. |
| **JT-4.1 Flash 236B A21B** | China Mobile | Exact [ModelScope page](https://www.modelscope.cn/models/ChinaMobile/JT-4.1-Flash-236B-A21B) and official Jiutian announcement, already tracked from 2026-11-11. | **Recheck only; no duplicate.** | The July 9 mirror value 52.4 is an older snapshot/alias and is not copied to the November row; `codingIndex: null` retained. |
| **OpenAI GPT-6 Astra / GPT-6.1 Sol** | OpenAI | Official pages discovered by the bounded query are dated September and are already represented. | **Skip duplicate/outside window.** | No new Coding Index lookup. |
| **Muse Glimmer 30B** | Meta | Official Hugging Face card says model release August 2026. | **Skip outside window.** | No Coding Index lookup. |
| **MiniCPM5-1B and recent MiniCPM artifacts** | OpenBMB | Official GitHub/Hugging Face surfaces date MiniCPM5-1B to May; OCR/Vision/GGUF activity is recent. | **Skip outside window or modality/packaging scope.** | No Coding Index lookup. |
| **Cursor Projects multiplayer / Agent SDK / Voice Chat** | Cursor | Official Cursor pages date these entries November 6–10. | **Skip product features and integrations.** | No Coding Index lookup. |
| **Celeris-1.1 Decision** | Celeris | Official Celeris home/blog identifies it as a November 5 decision model. | **Skip outside window and decision-product scope.** | No Coding Index lookup. |
| **Step 5 Preview** | StepFun | Official StepFun site explicitly labels it Preview. | **Skip preview-only and format/weight variants.** | No Coding Index lookup. |
| **Cohere Rerank 5 / Embed / Parse / North** | Cohere | Official Cohere blog and model navigation identify retrieval, parsing, translation, and platform lines. | **Skip retrieval/platform/modality scope.** | No Coding Index lookup. |
| **AI21 Teel** | AI21 Labs | Official AI21 blog dates Teel to November 5 and describes an execution library. | **Skip harness/library, not a model line.** | No Coding Index lookup. |

## Exact score and configuration audit

- **Rows added:** 1 (`Gemini 4 Hydrogen`); no existing row was duplicated.
- **Rows with changed existing Coding Index:** none.
- **New Coding Index:** none. The exact AA page has no exact Coding Index field, and the exact Easy Benchmarks page is Model Not Found. `codingIndex` remains `null`.
- **Separate Intelligence Index:** `Gemini 4 Hydrogen` = **51**, configuration **high**, exact AA model URL `https://artificialanalysis.ai/models/gemini-4-hydrogen-high`. The generic release page is an xhigh view; the same live AA release exposes **54** for xhigh, which was not copied because the repository's recent Gemini 4 rows use the high representative configuration.
- **Metric separation:** Google's Terminal-Bench 4.1, Agent Arena, MKA, and other announcement metrics are not Artificial Analysis Coding Index values and were not stored as `codingIndex`.
- **Alias policy:** `gemini-4-hydrogen` is retained as the only row alias. Effort labels are configurations, not extra release rows.
- **Mirror policy:** Easy Benchmarks was checked as a secondary extraction source but returned Model Not Found. No mirror-derived value is claimed or stored.

## Evidence limits

- Search retrieval was bounded to one configured query per provider/missing lab (31 total), plus direct exact-page recovery for the AA-discovered Google release. Repeated broad sweeps were not used.
- The AA leaderboard and model page are dynamic. The leaderboard was fetched directly and parsed for release identity and effort-specific Intelligence rows. The page is not a direct Coding Index source.
- A pre-fix bounded URL smoke checked 337 URLs with **298 returned 2xx / 39 non-2xx**. Subsequent post-fix runs checked 337 URLs with **280/57** and, in the final parent verification, **276 returned 2xx / 61 non-2xx/network results**; every run reported no invariant errors and exited successfully. The final required Google maker URL and exact AA Hydrogen high URL passed. The volatile totals reflect concurrent network blocking, not a data change. OpenAI, IFM, xAI, Z.ai, Jiutian, MiniMax, Qwen Cloud, Meta, and several other configured surfaces were blocked, stale, or intermittently network-failed to the smoke client. Those failures are recorded as evidence limits, not as proof of absence.
- Some configured sites are dynamic or inaccessible to extraction (`Z.ai` blog 404, Agnes home scrape failure, IFM 403, X pages blocked). Decisions were limited to evidence actually retrieved from alternate official surfaces, direct model pages, official registries, and the live AA catalog.
- No new provider was discovered outside the existing 27-provider checklist; the provider config therefore remains unchanged.

## Verification at edit stage

- **Expected final dataset:** 176 rows, 176 unique model names; newest `releaseDate` `2026-11-12`.
- **Cache key:** `20261113a` in `index.html`, the `src/app.js` model-data import, and the `src/app.js` dashboard-logic import.
- **Intended tracked paths:** `src/modelData.js`, `index.html`, `src/app.js`, `scripts/verify-model-refresh.mjs`, `tests/modelData.test.js`, `tests/staticAssets.test.js`, and this ledger. The pre-existing untracked screenshot remains untouched and uncommitted.
- **Tests:** `npm test` — **118 passed, 0 failed**.
- **Diff hygiene:** `git diff --check` passed before this ledger was added.
- **Dataset/checklist invariants:** `node scripts/verify-model-refresh.mjs --cutoff=2026-11-13` confirmed **176 rows**, **176 unique models**, newest `2026-11-12`, **27 configured providers**, **4 missing labs**, **31 checklist headings**, **337 URL union**, valid ISO dates, valid source URLs/categories, score-source invariants, and **no invariant errors**.
- **Bounded HTTP smoke/source check:** the final parent `node scripts/verify-model-refresh.mjs --cutoff=2026-11-13 --http` checked **337 URLs**: **276 returned 2xx** and **61 returned non-2xx/network results**, with **no invariant errors**. The required new Google announcement and exact AA high model URL passed. Prior runs were 298/39 and 280/57; the difference is documented network volatility.

## Appendix A — configured provider primary-source set

The provider checklist source set was unchanged in this refresh. Each entry below was part of the bounded source/checklist inventory; the decision for each provider is recorded above.

### OpenAI (Frontier labs)

- https://openai.com/news/
- https://openai.com/index/
- https://platform.openai.com/docs/models
- Bounded discovery queries: 2

### Anthropic (Frontier labs)

- https://www.anthropic.com/news
- https://www.anthropic.com/claude-fable-and-mythos-5-2
- https://docs.anthropic.com/en/docs/about-claude/models
- Bounded discovery queries: 3

### Google (Frontier labs)

- https://blog.google/innovation-and-ai/models-and-research/gemini-models/
- https://blog.google/innovation-and-ai/technology/developers-tools/
- https://ai.google.dev/gemini-api/docs/models
- Bounded discovery queries: 2

### Meta (Chinese+Other)

- https://huggingface.co/meta-models
- https://ai.meta.com/blog/
- https://www.meta.com/ai/
- https://research.meta.ai/blog/muse-wonder
- https://research.meta.ai/blog/muse-ember
- https://developer.meta.com/ai/
- https://dev.meta.ai/models/muse-wonder
- https://dev.meta.ai/models/muse-spark-open
- https://dev.meta.ai/models/muse-ember
- Bounded discovery queries: 9

### OpenBMB (Chinese+Other)

- https://huggingface.co/OpenBMB
- https://github.com/OpenBMB
- https://github.com/OpenBMB/MiniCPM
- Bounded discovery queries: 3

### Apodex (Chinese+Other)

- https://www.apodex.com/
- https://www.apodex.com/blog/apodex-1.1-scaling-agentic-intelligence-for-complex-work
- https://www.apodex.com/api
- Bounded discovery queries: 2

### xAI (Chinese+Other)

- https://x.ai/news
- https://docs.x.ai/developers/models
- Bounded discovery queries: 2

### Cursor (Chinese+Other)

- https://cursor.com/blog
- Bounded discovery queries: 2

### Mistral (Chinese+Other)

- https://mistral.ai/news
- https://docs.mistral.ai/getting-started/models/models_overview/
- Bounded discovery queries: 2

### Alibaba (Chinese+Other)

- https://qwenlm.github.io/blog
- https://qwen.ai/blog
- https://www.qwencloud.com/models
- Bounded discovery queries: 3

### Tencent (Chinese+Other)

- https://ui-mate.github.io/
- https://huggingface.co/tencent
- https://github.com/Tencent
- https://huggingface.co/tencent/Hy-Memory-30B-A3B
- https://github.com/Tencent-Hunyuan/Hy-Memory
- https://cloud.tencent.com/product/hunyuan
- https://cloud.tencent.com/document/product/1823/130051
- Bounded discovery queries: 7

### China Mobile (Chinese+Other)

- https://www.10086.cn/aboutus/news/
- https://www.10086.cn/aboutus/news/groupnews/index_detail_56169.html
- https://jiutian.10086.cn/
- https://jiutian.10086.cn/portal/common-helpcenter#/document/1181?platformCode=DMX_TYZX
- https://www.modelscope.cn/models/ChinaMobile/JT-4.1-Flash-236B-A21B
- Bounded discovery queries: 4

### DeepSeek (Chinese+Other)

- https://api-docs.deepseek.com/news/
- https://api-docs.deepseek.com/news/news261017
- https://www.deepseek.com/en/transparency/
- Bounded discovery queries: 2

### Moonshot.ai (Chinese+Other)

- https://platform.moonshot.ai/blog/posts/changelog
- https://www.moonshot.ai/
- https://x.com/Kimi_Moonshot
- https://www.kimi.ai/blog/
- https://www.kimi.ai/blog/kimi-k3-1-pro
- https://platform.kimi.ai/docs/models
- https://platform.kimi.ai/docs/guide/kimi-k3-1-pro-quickstart
- Bounded discovery queries: 5

### MiniMax (Chinese+Other)

- https://www.minimax.io/news
- https://www.minimax.io/blog
- https://www.minimax.io/blog/minimax-m31f
- Bounded discovery queries: 2

### Z.ai (Chinese+Other)

- https://z.ai/blog
- https://docs.z.ai/release-notes/new-released
- Bounded discovery queries: 2

### Xiaomi (Chinese+Other)

- https://github.com/XiaomiMiMo
- https://huggingface.co/XiaomiMiMo
- https://mimo.xiaomi.com/mimo-v2-6
- Bounded discovery queries: 3

### NVIDIA (Chinese+Other)

- https://build.nvidia.com/nvidia
- https://huggingface.co/nvidia
- https://huggingface.co/nvidia/NVIDIA-Nemotron-3.5-Super-VL-120B-A12B-BF16
- https://huggingface.co/nvidia/NVIDIA-Nemotron-3.5-Bolt-74B-A9B-BF16
- https://huggingface.co/nvidia/NVIDIA-Nemotron-Labs-Dory1.0-4B-BF16
- Bounded discovery queries: 4

### IFM (Chinese+Other)

- https://ifm.ai/k2/
- https://ifm.ai/k2/press-release/
- https://docs.ifm.ai/
- https://ifm.ai/jais/
- https://ifm.ai/jais3/press-release/
- https://ifm.ai/blog/jais3/
- https://docs.ifm.ai/#/jais-3
- https://huggingface.co/collections/IFM/jais-3
- Bounded discovery queries: 5

### Agnes AI (Chinese+Other)

- https://agnes-ai.com/
- https://www.agnes-ai.com/zh-Hans/docs/agnes-30-flash
- https://www.agnes-ai.com/zh-Hans/docs/agnes-25-pro-theta
- https://platform.agnes-ai.com
- https://github.com/AgnesAI-Labs
- https://github.com/AgnesAI-Labs/Agnes-3.0-Qwen
- https://huggingface.co/Agnes-AI
- https://huggingface.co/Agnes-AI/Agnes-3.0-Qwen
- Bounded discovery queries: 6

### InclusionAI (Chinese+Other)

- https://huggingface.co/inclusionAI
- https://huggingface.co/inclusionAI/Ling-3.0-flash-VL
- https://www.inclusion-ai.org/model
- https://www.inclusion-ai.org/LLaDA-UI/
- https://github.com/inclusionAI
- https://x.com/AntLingAGI
- https://huggingface.co/inclusionAI/Ling-3.0-flash-Sante
- https://huggingface.co/inclusionAI/LBS-27B
- https://github.com/inclusionAI/UI-Venus/tree/LBS
- Bounded discovery queries: 7

### Inception (Chinese+Other)

- https://inceptionlabs.ai/
- https://inceptionlabs.ai/blog/introducing-mercury-2-5
- https://inceptionlabs.ai/blog/introducing-mercury-3
- https://inceptionlabs.ai/models
- https://docs.inceptionlabs.ai/get-started
- Bounded discovery queries: 2

### IBM Granite (Chinese+Other)

- https://research.ibm.com/blog/introducing-granite-4-2
- https://www.ibm.com/granite
- https://huggingface.co/ibm-granite
- Bounded discovery queries: 2

### LongCat (Chinese+Other)

- https://longcat.ai/
- https://longcat.ai/blog/longcat-2.0
- https://longcat.ai/blog/longcat-2.5
- https://huggingface.co/meituan-longcat
- https://github.com/meituan-longcat
- Bounded discovery queries: 4

### Thinking Machines (Chinese+Other)

- https://thinkingmachines.ai/
- https://thinkingmachines.ai/news/inkling-2-small/
- https://huggingface.co/blog/thinkingmachines-inkling
- https://huggingface.co/thinkingmachines
- https://github.com/thinking-machines-lab
- Bounded discovery queries: 4

### Arcee AI (Chinese+Other)

- https://arcee.ai/
- https://arcee.ai/trinity
- https://huggingface.co/arcee-ai
- https://docs.arcee.ai/get-started/models-overview
- Bounded discovery queries: 3

### Celeris (Chinese+Other)

- https://celeris.ai/
- https://celeris.ai/celeris-1
- https://celeris.ai/celeris-1-magnus
- https://celeris.ai/blog
- Bounded discovery queries: 2

### Amazon (Missing labs)

- https://aws.amazon.com/about-aws/whats-new/
- https://www.amazon.science/index.rss
- Bounded discovery queries: 2

### Cohere (Missing labs)

- https://cohere.com/blog
- https://docs.cohere.com/changelog
- https://huggingface.co/CohereLabs
- Bounded discovery queries: 3

### StepFun (Missing labs)

- https://www.stepfun.com/
- https://huggingface.co/stepfun-ai
- Bounded discovery queries: 2

### AI21 Labs (Missing labs)

- https://www.ai21.com/blog
- https://studio.ai21.com/
- Bounded discovery queries: 2
