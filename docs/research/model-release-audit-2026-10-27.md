# Model-release audit — 2026-10-27

## Baseline, window, and policy

- **Repository/branch:** `agentic-model-release-tracker`, direct `main` working tree; no worktree and no PR.
- **Remote:** `origin` → `https://github.com/jgordijn/agentic-model-release-tracker.git`.
- **HEAD / `origin/main` before this refresh:** `3034b0b2119ea42b13be0f38add3be871530a3fb` — `feat(data): refresh model releases through 2026-10-25`.
- **Last data commit:** `3034b0b` at `2026-10-25T06:14:59Z`; this is separate from the newest tracked model date.
- **Working-tree baseline:** 162 rows, 162 unique model names; newest tracked `releaseDate` was `2026-10-24` (`Kimi K3.1 Pro`). The pre-existing untracked `screenshots/baseline-local.png` was left untouched. No unrelated tracked changes were present.
- **Research cutoff:** `2026-10-27T07:06:40+01:00` in `Europe/Amsterdam` (`2026-10-27T06:06:40Z`).
- **Effective search window:** inclusive `2026-10-24` through `2026-10-27`, derived from the newest baseline `releaseDate` and the job's Europe/Amsterdam current date. The initial required checklist derived `since 2026-10-24`.
- **Scope:** add only maker-released base model lines or clearly differentiated specialized-base lines relevant to programming or agentic work. Exclude product features, provider integrations, modality-only releases, quantizations, pure snapshots/checkpoints, API aliases, mini/nano/lite/tiny tiers, preview-only configurations, and speed/serving variants.
- **Metric rule:** `codingIndex` is populated only from an exact Artificial Analysis Coding Index row for the exact model/configuration. Intelligence Index, Agentic Index, Coding Agent Index, SWE-bench, Terminal-Bench, maker scores, and other metrics are never substituted for Coding Index. Separate Artificial Analysis Intelligence Index data remains in its own fields only.

## Required checklist and bounded retrieval

- The required first command was run before external research: `node scripts/check-provider-releases.mjs --markdown`. At baseline it derived `since 2026-10-24` and emitted 26 configured providers plus 4 explicit missing labs (30 provider headings).
- One bounded discovery search was run for each configured provider and missing lab: 30 provider/lab searches total. Search results were treated as discovery leads only; no repeated broad sweep was used.
- A direct HTTP pass over the baseline configured primary-source set checked 112 unique URLs: 103 returned HTTP 200, 8 returned HTTP 403, and 1 returned HTTP 404. Exact pages and feeds were fetched separately where an archive was dynamic or blocked.
- Official registries were checked for configured Hugging Face organizations. The in-window leads were grouped by family before applying the scope rules; registry `createdAt` and `lastModified` values were used for discovery and artifact classification, not silently treated as maker announcement dates.
- The Artificial Analysis model page for GPT-6.1 Terra was fetched and identified the exact `max` row and Intelligence Index 48, but exposed no exact Coding Index value. The exact Easy Benchmarks page returned `Model Not Found`. The exact AA and Easy Benchmarks LBS-27B pages returned 404/`Model Not Found`.
- One qualifying official release surface was added to the existing InclusionAI source set: the official `UI-Venus` LBS branch linked by the LBS model card. No new lab outside the configured provider set was discovered.

## Candidate ledger

| Candidate / lead | Provider | Maker/public date | Decision | Evidence and reason |
|---|---|---:|---|---|
| **GPT-6.1 Terra** | OpenAI | 2026-10-26 | **Add** | OpenAI's [release page](https://openai.com/index/introducing-gpt-6-1-terra/) describes a new API model for computer use, visual reasoning, coding, and agentic work. OpenAI's [news index](https://openai.com/news/) and the AWS [official RSS announcement](https://aws.amazon.com/about-aws/whats-new/2026/10/openai-gpt-6-1-terra-on-amazon-bedrock/) date the availability October 26. The AWS Bedrock entry is availability corroboration, not an Amazon model release. |
| **LBS-27B** | InclusionAI | 2026-10-26 fallback | **Add** | The official [Hugging Face model card](https://huggingface.co/inclusionAI/LBS-27B) describes an agentic vision-language model for GUI grounding and adaptive zoom-in, and links the official [UI-Venus LBS project](https://github.com/inclusionAI/UI-Venus/tree/LBS). No day-level maker announcement was found; the official HF API `createdAt` marker is `2026-10-26T05:36:52Z`, used as the public-availability fallback. This is a specialized GUI-agent line, consistent with existing UI-agent rows, not a modality-only generation model. |
| `Mistral Large 4` / ML4 | Mistral | 2026-10-06 | **Skip outside window / preview-only** | Mistral's [announcement](https://www.mistral.ai/news/mistral-large-4/) and [model page](https://docs.mistral.ai/models/mistral-large-4-0) call it a public preview dated October 6. It is outside the window and preview-only under the explicit scope rule; no row is added. |
| `OpenAI GPT-6.1 Terra on Amazon Bedrock` | Amazon | 2026-10-26 | **Skip integration** | AWS's [What's New RSS](https://aws.amazon.com/about-aws/whats-new/recent/feed/) announces hosted availability of OpenAI GPT-6.1 Terra. This is a provider integration of the OpenAI row, not an Amazon base-model release; Amazon remains an explicit missing lab. |
| `Claude Opus 5.5` current-page lead | Anthropic | exact page: 2026-09-22 | **Skip duplicate / outside window** | The exact [maker page](https://www.anthropic.com/claude-opus-5-5) dates the already tracked row September 22. No second October row is created from the newsroom/catalog surface. |
| `Gemma 4` | Google | 2026-04-02 | **Skip outside window** | Google's [official announcement](https://blog.google/innovation-and-ai/technology/developers-tools/gemma-4/) is outside the window; the October API changelog item was storage behavior, not a new qualifying model line. |
| `LBS-27B` related GUI/visual scores | InclusionAI | 2026-10-26 | **Score unknown** | ScreenSpot-Pro, OS-World-G, PerceptionBench, and other model-card scores are not Artificial Analysis Coding Index. Exact AA returned 404, so no sibling, Intelligence Index, or maker score is copied. |
| Other registry/archive leads | All providers | — | **Skip or unresolved as detailed below** | Each configured provider and missing lab received one bounded search and direct official-surface check. Blocked surfaces are recorded as evidence limits, not as proof of absence. |

## Added rows and exact metric provenance

### GPT-6.1 Terra

- **Canonical display name:** `GPT-6.1 Terra`.
- **Provider/group/category:** `OpenAI` / `Frontier labs` / `base`.
- **Stored release date:** `2026-10-26`, based on OpenAI's dated news index and the official AWS availability announcement; the maker page says the model is available starting with the announcement.
- **Maker source:** [Introducing GPT-6.1 Terra](https://openai.com/index/introducing-gpt-6-1-terra/).
- **Additional official surfaces:** [OpenAI news index](https://openai.com/news/), [OpenAI model docs](https://platform.openai.com/docs/models), and AWS's [GPT-6.1 Terra Bedrock announcement](https://aws.amazon.com/about-aws/whats-new/2026/10/openai-gpt-6-1-terra-on-amazon-bedrock/).
- **Aliases checked:** `GPT-6.1 Terra`, `gpt-6.1-terra`, and the AWS/OpenAI hosted naming. No separate Terra speed or provider row is created.
- **Scope evidence:** OpenAI describes computer use, visual reasoning, software engineering, Terminal-Bench work, Codex, and API availability. It is a distinct named model line, not a product-only feature or partner integration.
- **Separate Intelligence Index evidence:** the exact [Artificial Analysis model page](https://artificialanalysis.ai/models/gpt-6-1-terra) was fetched successfully and identifies `GPT-6.1 Terra (max)` with Intelligence Index `48`. The repository stores that in `intelligenceIndex: 48`, configuration `max`, and the exact AA model URL; it is not used as Coding Index.
- **Artificial Analysis Coding Index audit:** the exact AA page exposes Intelligence Index and other evaluation references, not an exact Coding Index field/value for GPT-6.1 Terra. The exact [Easy Benchmarks model page](https://easy-benchmarks.com/models/gpt-6-1-terra) returned `Model Not Found`. OpenAI's Terminal-Bench, Agents' Last Exam, OSWorld, and other scores are not AA Coding Index substitutes.
- **Stored Coding Index:** `codingIndex: null`; no `scoreSourceUrl`, configuration, mirror-derived score, or maker benchmark substitution.

### LBS-27B

- **Canonical display name:** `LBS-27B`.
- **Provider/group/category:** `InclusionAI` / `Chinese+Other` / `specialized-base`.
- **Stored release date:** `2026-10-26`, using the official Hugging Face API `createdAt` fallback `2026-10-26T05:36:52Z`; no day-level maker announcement was found. The linked UI-Venus LBS branch has an initial training-recipe/project commit dated `2026-10-20`, while the HF timestamp marks public checkpoint availability and controls the dashboard date.
- **Maker source:** [official Hugging Face model card](https://huggingface.co/inclusionAI/LBS-27B).
- **Additional official surface:** [InclusionAI UI-Venus LBS branch](https://github.com/inclusionAI/UI-Venus/tree/LBS).
- **Aliases checked:** `LBS-27B` and `inclusionAI/LBS-27B`; Qwen3.8-27B is documented as the upstream base, not a duplicate dashboard row.
- **Scope evidence:** the card and project describe GUI grounding, agentic zoom-in, multi-step observation, and transfer to general visual question answering. It is treated as a distinct specialized agentic line, consistent with existing `UI-Mate` and `LLaDA-UI` rows; it is not a video/audio generation model, quantization, or serving alias.
- **Artificial Analysis Coding Index audit:** `https://artificialanalysis.ai/models/lbs-27b` returned 404; `https://easy-benchmarks.com/models/lbs-27b` returned `Model Not Found`. No exact Coding Index row/configuration was independently verified.
- **Stored Coding Index:** `codingIndex: null`; ScreenSpot-Pro, OS-World-G, PerceptionBench, HR-Bench, and other model-card metrics were not substituted.

## Configured-provider coverage

Each configured provider's official source set was checked. “No add” means no additional qualifying in-window row beyond the two additions above was verified after applying the scope rules.

- **OpenAI:** checked [news](https://openai.com/news/), [index](https://openai.com/index/), [API model docs](https://platform.openai.com/docs/models), the exact [GPT-6.1 Terra page](https://openai.com/index/introducing-gpt-6-1-terra/), and AWS's [Bedrock availability feed](https://aws.amazon.com/about-aws/whats-new/recent/feed/). **Add GPT-6.1 Terra.** The Node smoke saw OpenAI archive URLs as HTTP 403, while the exact official page was independently extracted through the web retriever; the limitation is retained.
- **Anthropic:** checked [newsroom](https://www.anthropic.com/news) and [Claude model docs](https://docs.anthropic.com/en/docs/about-claude/models), plus the exact [Opus 5.5 page](https://www.anthropic.com/claude-opus-5-5). The exact model page dates Opus 5.5 September 22 and no later base line was verified. **No add.**
- **Google:** checked the [Gemini model archive](https://blog.google/innovation-and-ai/models-and-research/gemini-models/), [developer-tools archive](https://blog.google/innovation-and-ai/technology/developers-tools/), [Gemini API model docs](https://ai.google.dev/gemini-api/docs/models), and [API changelog](https://ai.google.dev/gemini-api/docs/changelog). Gemma 4 is April 2; October 26 was an API storage update. **No add.**
- **Meta:** checked [Meta HF organization](https://huggingface.co/meta-models), [AI blog](https://ai.meta.com/blog/), [Meta AI](https://www.meta.com/ai/), [research Muse Wonder](https://research.meta.ai/blog/muse-wonder), [developer catalog](https://developer.meta.com/ai/), [Muse Wonder developer page](https://dev.meta.ai/models/muse-wonder), and [Muse Spark Open developer page](https://dev.meta.ai/models/muse-spark-open). October registry activity was existing-family maintenance or packaging. **No add.**
- **OpenBMB:** checked [HF organization](https://huggingface.co/OpenBMB), [GitHub organization](https://github.com/OpenBMB), and [MiniCPM repository](https://github.com/OpenBMB/MiniCPM). Recent activity was multimodal/on-device, RAG, speech, datasets, or product infrastructure. **No add.**
- **Apodex:** checked [home](https://www.apodex.com/), [Apodex 1.1 announcement](https://www.apodex.com/blog/apodex-1.1-scaling-agentic-intelligence-for-complex-work), and [API catalog](https://www.apodex.com/api). No later maker-dated base line was verified. **No add.**
- **xAI:** checked [news](https://x.ai/news) and [developer model docs](https://docs.x.ai/developers/models). The news archive was HTTP 403 in direct smoke; no later base model was independently verified through accessible official surfaces. **Unresolved evidence limit; no add.**
- **Cursor:** checked [Cursor blog](https://cursor.com/blog). October items were product/infrastructure updates; no new Cursor-owned model line. **No add.**
- **Mistral:** checked [news](https://mistral.ai/news), [news RSS](https://www.mistral.ai/news/rss), and [model overview](https://docs.mistral.ai/getting-started/models/models_overview/), including exact Mistral Large 4 pages. ML4 is an October 6 public preview outside the window and preview-only. Voxtral 3 is audio and Timestral is forecasting. **No add.**
- **Alibaba:** checked [legacy Qwen blog](https://qwenlm.github.io/blog), [Qwen blog](https://qwen.ai/blog), and [Qwen Cloud models](https://www.qwencloud.com/models). Current leads were existing families, dated snapshots, or aliases. **No add.**
- **Tencent:** checked [UI-Mate](https://ui-mate.github.io/), [HF organization](https://huggingface.co/tencent), [GitHub organization](https://github.com/Tencent), [Hy-Memory card](https://huggingface.co/tencent/Hy-Memory-30B-A3B), and [Hy-Memory repository](https://github.com/Tencent-Hunyuan/Hy-Memory). WeVisOne-VL is image perception/OCR/localization, Hy-SimulMT is translation, and later activity is packaging. **No add.**
- **DeepSeek:** checked [API news archive](https://api-docs.deepseek.com/news/), exact [October 17 release](https://api-docs.deepseek.com/news/news261017), and [transparency center](https://www.deepseek.com/en/transparency/). No release after the already tracked October 17 row. **No add.**
- **Moonshot.ai:** checked [platform changelog](https://platform.moonshot.ai/blog/posts/changelog), [company site](https://www.moonshot.ai/), [official Kimi account](https://x.com/Kimi_Moonshot), [Kimi research index](https://www.kimi.ai/blog/), [K3.1 Pro announcement](https://www.kimi.ai/blog/kimi-k3-1-pro), [API model list](https://platform.kimi.ai/docs/models), and [K3.1 Pro quickstart](https://platform.kimi.ai/docs/guide/kimi-k3-1-pro-quickstart). Kimi K3.1 Pro is already the October 24 boundary row; no later row was verified. **No additional add.**
- **MiniMax:** checked [news](https://www.minimax.io/news), [research/blog](https://www.minimax.io/blog), and [M3.1 Flash announcement](https://www.minimax.io/blog/minimax-m31f). MiniMax Code Mini App is a product/plugin feature and M3.1 Flash is already tracked. **No add.**
- **Z.ai:** checked [blog](https://z.ai/blog) and [release notes](https://docs.z.ai/release-notes/new-released). The blog/API path was not extractable and release notes showed no later qualifying model. **Unresolved access limit; no add.**
- **Xiaomi:** checked [GitHub organization](https://github.com/XiaomiMiMo), [HF organization](https://huggingface.co/XiaomiMiMo), and [MiMo-V2.6 page](https://mimo.xiaomi.com/mimo-v2-6). Activity was existing-family maintenance, code harness, RL, or datasets; no new maker-dated model. **No add.**
- **NVIDIA:** checked [NVIDIA Build](https://build.nvidia.com/nvidia), [HF organization](https://huggingface.co/nvidia), and exact [Nemotron Super VL](https://huggingface.co/nvidia/NVIDIA-Nemotron-3.5-Super-VL-120B-A12B-BF16), [Nemotron Bolt](https://huggingface.co/nvidia/NVIDIA-Nemotron-3.5-Bolt-74B-A9B-BF16), and [Dory](https://huggingface.co/nvidia/NVIDIA-Nemotron-Labs-Dory1.0-4B-BF16) cards. Dory formats and registry updates are packaging; no new family release. **No add.**
- **IFM:** checked [K2](https://ifm.ai/k2/), [K2 press release](https://ifm.ai/k2/press-release/), [docs](https://docs.ifm.ai/), [Jais](https://ifm.ai/jais/), [Jais 3 press release](https://ifm.ai/jais3/press-release/), [Jais 3 blog](https://ifm.ai/blog/jais3/), [Jais 3 docs](https://docs.ifm.ai/#/jais-3), and [Jais 3 HF collection](https://huggingface.co/collections/IFM/jais-3). Jais 3 is an existing October 15 correction; no later IFM row. Direct Node smoke saw IFM 403s, so this remains an evidence limitation. **No additional add.**
- **Agnes AI:** checked [home](https://agnes-ai.com/), [Flash docs](https://www.agnes-ai.com/zh-Hans/docs/agnes-30-flash), [platform](https://platform.agnes-ai.com), [GitHub organization](https://github.com/AgnesAI-Labs), [Agnes 3.0 Qwen repository](https://github.com/AgnesAI-Labs/Agnes-3.0-Qwen), [HF organization](https://huggingface.co/Agnes-AI), and [Qwen card](https://huggingface.co/Agnes-AI/Agnes-3.0-Qwen). October activity was harness/video/audio work. **No add.**
- **InclusionAI:** checked [HF organization](https://huggingface.co/inclusionAI), [LBS card](https://huggingface.co/inclusionAI/LBS-27B), [UI-Venus LBS project](https://github.com/inclusionAI/UI-Venus/tree/LBS), [model catalog](https://www.inclusion-ai.org/model), [LLaDA-UI](https://www.inclusion-ai.org/LLaDA-UI/), [GitHub organization](https://github.com/inclusionAI), [official account](https://x.com/AntLingAGI), and [Ling Sante card](https://huggingface.co/inclusionAI/Ling-3.0-flash-Sante). Safety probes, realtime/audio, packaging, and dated Ling variants were excluded. **Add LBS-27B; the new UI-Venus source/query are registered in the checklist.**
- **Inception:** checked [home](https://inceptionlabs.ai/), [Mercury 2.5](https://inceptionlabs.ai/blog/introducing-mercury-2-5), [Mercury 3](https://inceptionlabs.ai/blog/introducing-mercury-3), [models](https://inceptionlabs.ai/models), and [docs](https://docs.inceptionlabs.ai/get-started). Mercury 3 is already the October 19 boundary row. **No add.**
- **IBM Granite:** checked [Granite 4.2 announcement](https://research.ibm.com/blog/introducing-granite-4-2), [Granite](https://www.ibm.com/granite), and [HF organization](https://huggingface.co/ibm-granite). Speech and packaging activity is out of scope; no later general/agentic base line. **No add.**
- **LongCat:** checked [home](https://longcat.ai/), [LongCat 2.0](https://longcat.ai/blog/longcat-2.0), [HF organization](https://huggingface.co/meituan-longcat), and [GitHub organization](https://github.com/meituan-longcat). LongCat preview/harness activity is excluded. **No add.**
- **Thinking Machines:** checked [company site](https://thinkingmachines.ai/), [Inkling article](https://huggingface.co/blog/thinkingmachines-inkling), [HF organization](https://huggingface.co/thinkingmachines), and [GitHub organization](https://github.com/thinking-machines-lab). October activity was Tinker infrastructure and packaging. **No add.**
- **Arcee AI:** checked [home](https://arcee.ai/), [Trinity](https://arcee.ai/trinity), [HF organization](https://huggingface.co/arcee-ai), and [model docs](https://docs.arcee.ai/get-started/models-overview). No later qualifying model family. **No add.**
- **Celeris:** checked [home](https://celeris.ai/), [Celeris-1](https://celeris.ai/celeris-1), [Celeris-1 Magnus](https://celeris.ai/celeris-1-magnus), and [blog](https://celeris.ai/blog). No later programming/agentic base line. **No add.**

## Explicitly missing-lab coverage

- **Amazon:** checked [AWS What's New](https://aws.amazon.com/about-aws/whats-new/) and [Amazon Science RSS](https://www.amazon.science/index.rss). The October 26 AWS item is OpenAI GPT-6.1 Terra on Bedrock, a provider integration; no Amazon Nova base release. **Skip/no add; remains missing.**
- **Cohere:** checked [blog](https://cohere.com/blog), [release notes](https://docs.cohere.com/changelog), and [HF organization](https://huggingface.co/CohereLabs). Rerank 5, Embed 5, North, translation, retrieval, and Model Vault activity are out of scope. **Skip/no add; remains missing.**
- **StepFun:** checked [official site](https://www.stepfun.com/) and [HF organization](https://huggingface.co/stepfun-ai). Step 5 remains Preview and no later qualifying base line was verified. **Skip/no add; remains missing.**
- **AI21 Labs:** checked [AI21 blog](https://www.ai21.com/blog) and [AI21 Studio](https://studio.ai21.com/). October posts concern research/evaluation and partnerships, not a new AI21 base model; blog extraction is partially antibot-limited. **Skip/no add; remains missing.**

## Score, alias, and snapshot decisions

- **Rows added this pass:** two, `GPT-6.1 Terra` and `LBS-27B`, both dated `2026-10-26`.
- **Changed existing Coding Index scores:** none. No historical Coding Index was refreshed from another snapshot or effort configuration.
- **New row Coding Index values:** both unknown. No exact AA Coding Index row/configuration was independently verified for either new model. No Intelligence Index, Terminal-Bench, Agents' Last Exam, GUI-grounding, or maker score was substituted for Coding Index.
- **New row separate Intelligence Index:** GPT-6.1 Terra = `48`, representative `max` configuration, source `https://artificialanalysis.ai/models/gpt-6-1-terra`, fetched 2026-10-27. This is stored only in the separate Intelligence Index fields.
- **Aliases/configurations:** GPT-6.1 Terra uses `gpt-6.1-terra`; LBS uses `LBS-27B` and `inclusionAI/LBS-27B`. No speed, provider, quantized, or dated snapshot variants are separate rows.
- **Family decisions:** Mistral Large 4 remains excluded as an October 6 public preview outside the window; Amazon's Bedrock listing is an integration; InclusionAI LBS-27B is distinct from its Qwen3.8 upstream base because the official card identifies a separate post-trained agentic GUI model.

## Provider checklist/configuration feedback

- `scripts/provider-release-sources.json` now registers the official LBS HF card and UI-Venus LBS branch under InclusionAI, plus a targeted `{since}` query.
- The configured set remains **26 providers** and the explicit missing-lab set remains **Amazon, Cohere, StepFun, and AI21 Labs**.
- The final checker emitted **30 provider headings exactly once**. The provider-deck test asserts the new InclusionAI source/query coverage.

## Evidence limits

- Search retrieval was bounded to one discovery query per configured provider/missing lab (30 total), followed only by narrow exact-page and registry follow-ups. Search snippets were not used as final release evidence.
- Artificial Analysis is dynamic and metric-specific. The GPT-6.1 Terra page was fetched, but only its `max` Intelligence Index was exposed. The exact LBS page returned 404. Easy Benchmarks was treated as a secondary mirror/absence check and not as direct Artificial Analysis evidence.
- Direct HTTP smoke is volatile and the totals are point-in-time observations. An earlier bounded run recorded 309 URLs with 278 returning 2xx and 31 non-2xx/network limitations; the final verification run recorded 283 2xx and 26 non-2xx/network limitations. Known limitations were the existing Agnes AA 404, OpenAI archive/help 403s, IFM 403s, xAI 403, X pages, and Z.ai network failures. The exact official GPT-6.1 Terra page was independently retrieved through the web extractor despite the Node smoke's OpenAI 403.
- HF `createdAt`/`lastModified` timestamps were used for registry discovery only, except for the explicitly documented LBS checkpoint fallback. The GPT-6.1 Terra date is controlled by OpenAI/AWS dated release evidence; LBS uses the official HF `createdAt` fallback because no day-level maker announcement was found.
- No claim is made that blocked provider archives were fully extractable; blocked surfaces are recorded as unresolved evidence limits rather than silently converted into absence.

## Verification at edit stage

- **Expected final dataset:** 164 rows, 164 unique model names; newest `releaseDate` is `2026-10-26`.
- **Cache key:** `20261027a` in `index.html`, the `src/app.js` model-data import, and the `src/app.js` dashboard-logic import.
- **Tracked paths intended for publication:** `src/modelData.js`, `scripts/provider-release-sources.json`, `index.html`, `src/app.js`, `tests/modelData.test.js`, `tests/staticAssets.test.js`, and this ledger. The untracked screenshot remains untouched and uncommitted.
- **Tests:** `npm test` — **109 passed, 0 failed**.
- **Diff hygiene:** `git diff --check` — **passed**.
- **Provider checklist/invariants:** `node scripts/verify-model-refresh.mjs --cutoff=2026-10-27` — **164 rows**, **164 unique models**, newest `2026-10-26`, **26 configured providers**, **4 missing labs**, **30 checklist headings**, **309 URL union**, no invariant errors. The final checker derives `since 2026-10-26` from the post-refresh dataset; the required baseline checklist derived `since 2026-10-24` before research.
- **Bounded HTTP smoke/source check:** `node scripts/verify-model-refresh.mjs --cutoff=2026-10-27 --http` — **309 URLs checked, 283 returned 2xx, 26 non-2xx/network limitations, no invariant errors**. These are point-in-time endpoint results.
- **Critical review/publication status:** the initial read-only critical review found no critical or important findings; the bounded fresh-context follow-up review after the date/cache/configuration fixes returned **PASS** with no critical or important findings. The publication gate is open; direct commit/push and Pages/live verification are the subsequent handoff steps for this snapshot.
