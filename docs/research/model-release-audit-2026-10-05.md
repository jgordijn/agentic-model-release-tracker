# Agentic model release audit — 2026-10-05

## Boundary and working-tree safety

- **Repository:** `jgordijn/agentic-model-release-tracker`
- **Target branch:** `main`; direct publication is intentional. No worktree was used.
- **Remote:** `origin` → `https://github.com/jgordijn/agentic-model-release-tracker.git`
- **HEAD / `origin/main` before this refresh:** `645f4dc902e3c474ee87c72c57773310bb8f21ee` (`feat(data): add Gemini 4 Argon release`, 2026-10-01T05:24:36Z).
- **Working-tree baseline:** 146 unique rows; newest tracked `releaseDate` `2026-09-30`.
- **Working-tree safety:** the only pre-existing change was the untracked `screenshots/baseline-local.png`; it was left untouched. No unrelated tracked changes were present.
- **Research cutoff:** 2026-10-05 in `Europe/Amsterdam`.
- **Effective search window:** inclusive from the latest tracked `releaseDate` (`2026-09-30`) through the cutoff (`2026-10-05`). The maker-date boundary remains inclusive even when the newest added row shares the prior newest date.
- **Checklist command:** `node scripts/check-provider-releases.mjs --markdown` was run before external research. It reported `since 2026-09-30`, 26 configured providers, and four explicit missing labs.
- **Search budget:** one bounded discovery query per configured provider and missing lab, followed only by narrow exact follow-ups for the Artificial Analysis catalog lead and the InclusionAI model source. No repeated broad sweep was used.

## Inclusion and score policy

Only maker-released base model lines or clearly differentiated specialized-base lines relevant to programming or agentic work are included. Product features, partner integrations, API aliases, preview-only configurations, modality-only models, quantizations, packaging/checkpoints, serving modes, pure snapshots, and harnesses are excluded or collapsed into an existing family row.

`codingIndex` is populated only from an exact Artificial Analysis **Coding Index** row for the exact model and configuration. Intelligence Index, Agentic Index, GDPval, FrontierSWE, DeepSWE, SWE-bench, Terminal-Bench, maker benchmarks, and other coding metrics are not substitutes. Unknown exact Coding Index values remain `null` and have no `scoreSourceUrl`.

The separate `intelligenceIndex` field remains a distinct dashboard metric. Its values and configurations never populate `codingIndex`.

## Added row

| Model | Provider | Maker date | Category | Coding Index | Intelligence Index | Decision and provenance |
|---|---|---:|---|---:|---:|---|
| Ling 3.1 Flash | InclusionAI | 2026-09-30 | base | unknown | 41 (`default`) | **Add.** The official [Ant Ling announcement](https://x.com/AntLingAGI/status/2105335205741596911), posted 2026-09-30, introduces a distinct 560B-total/25B-active reasoning model for coding, tool use, long-horizon work, and agentic workflows, and offers a public Novita/Vercel trial. The official follow-up on 2026-10-02 confirms the model is live on OpenRouter. |

### Score and configuration provenance

- The live [Artificial Analysis model leaderboard](https://artificialanalysis.ai/leaderboards/models), retrieved 2026-10-05, contains the exact catalog identity `Ling 3.1 Flash`, slug `ling-3-1-flash`, creator `InclusionAI`, and catalog `releaseDate=2026-10-01`. This is benchmark/catalog discovery evidence, not the maker-date authority.
- The exact [Artificial Analysis Ling 3.1 Flash model page](https://artificialanalysis.ai/models/ling-3-1-flash), retrieved 2026-10-05, resolves successfully and reports **Intelligence Index 41** for the reasoning page. It exposes no Coding Index field. The dashboard stores that separate Intelligence Index value with configuration `default` and keeps `codingIndex: null`.
- The [OpenRouter model page](https://openrouter.ai/inclusionai/ling-3.1-flash), retrieved 2026-10-05, is secondary availability evidence and reports `Released Oct 2, 2026`; its displayed Artificial Analysis Intelligence Index is 41.1. That secondary 41.1 value is not copied into the dataset, and OpenRouter is not described as the authoritative maker source.
- The exact [Easy Benchmarks model page](https://easy-benchmarks.com/models/ling-3-1-flash), retrieved 2026-10-05, returned `Model Not Found`; no mirror Coding Index value was inferred.
- No exact AA Coding Index row was independently verified. The row therefore has no `scoreSourceUrl`; maker-reported GDPval-AA/FrontierSWE/HealthBench values and the Intelligence Index are not Coding Index substitutes.
- The maker/API spelling `Ling-3.1-flash`, AA display name `Ling 3.1 Flash`, and OpenRouter slug `inclusionai/ling-3.1-flash` are aliases for this one canonical dashboard row. The planned future open-source weights are not a second release, and no Ling 3.0 sibling score was copied.

## Configured provider ledger

Every provider object in `scripts/provider-release-sources.json` was checked through its configured official surfaces and one bounded discovery query. “Skip” means no additional maker-dated in-window base/specialized-base row was verified; it does not mean the provider had no activity.

- **OpenAI** — checked [news](https://openai.com/news/), [index](https://openai.com/index/), and the [official model catalog](https://platform.openai.com/docs/models). The news/index surfaces returned HTTP 403 in the direct pass; the model catalog remained accessible and no later qualifying model was verified. **Skip; bounded access limitation recorded.**
- **Anthropic** — checked [newsroom](https://www.anthropic.com/news) and the [Claude model overview](https://docs.anthropic.com/en/docs/about-claude/models). The newest qualifying lines remain Fable 5.1, Opus 5.5, and Sonnet 5.5 from September; no later qualifying model. **Skip.**
- **Google** — checked the [Gemini archive](https://blog.google/innovation-and-ai/models-and-research/gemini-models/), [developer-tools archive](https://blog.google/innovation-and-ai/technology/developers-tools/), and [Gemini API model docs](https://ai.google.dev/gemini-api/docs/models). Gemini 4 Argon on 2026-09-30 is already tracked; the API page's 2026-10-01 update exposed existing families/configurations, not a new maker line. **Skip.**
- **Meta** — checked the [official Meta AI blog](https://ai.meta.com/blog/) and [Meta model organization](https://huggingface.co/meta-models). Muse Spark 1.1 is dated July 9 and later entries are research/product or media-model activity. **Skip.**
- **OpenBMB** — checked [Hugging Face](https://huggingface.co/OpenBMB), the [GitHub organization](https://github.com/OpenBMB), and [MiniCPM](https://github.com/OpenBMB/MiniCPM). Recent PilotDeck/UltraRAG activity is a platform/RAG system and VoxCPM2 is speech; no new qualifying base line. **Skip.**
- **Apodex** — checked [home](https://www.apodex.com/), [Apodex 1.1 announcement](https://www.apodex.com/blog/apodex-1.1-scaling-agentic-intelligence-for-complex-work), and [API catalog](https://www.apodex.com/api). October page activity was product/workbench or research content, not a new base model. **Skip.**
- **xAI** — checked [news](https://x.ai/news) and [developer model docs](https://docs.x.ai/developers/models). News returned HTTP 403 and accessible docs/search evidence showed no release after Grok 4.7. **Skip; archive access limitation recorded.**
- **Cursor** — checked the [Cursor blog](https://cursor.com/blog). Recent entries cover Git hosting, acquisition, cloud agents, router, and research; Composer 2.5 remains the latest tracked Cursor model line. **Skip; integrations/features are not separate model releases.**
- **Mistral** — checked [news](https://mistral.ai/news) and the [model overview](https://docs.mistral.ai/getting-started/models/models_overview/). No maker-dated qualifying model after the existing Mistral Medium 3.5/Leanstral 1.5 lines was verified. **Skip.**
- **Alibaba** — checked the [legacy Qwen blog](https://qwenlm.github.io/blog), [Qwen blog](https://qwen.ai/blog), and [Qwen Cloud models](https://www.qwencloud.com/models). No verifiable in-window base line; current Qwen entries are existing families, service/catalog updates, or snapshots. **Skip; Qwen web catalog extraction is sparse.**
- **Tencent** — checked [UI-Mate](https://ui-mate.github.io/), [Hugging Face](https://huggingface.co/tencent), and [GitHub](https://github.com/Tencent). Recent LoopForge, BrowserSkill, WorkBuddy, and other repository activity is harness/infrastructure work; no new base or specialized-base model. **Skip.**
- **DeepSeek** — checked the [API news archive](https://api-docs.deepseek.com/news/) and [transparency center](https://www.deepseek.com/en/transparency/). V4.1 Flash is dated 2026-09-10, outside this refresh window; no later model release. **Skip.**
- **Moonshot.ai** — checked the [platform changelog](https://platform.moonshot.ai/blog/posts/changelog), [Moonshot home](https://www.moonshot.ai/), and [official Kimi account](https://x.com/Kimi_Moonshot). No maker-dated in-window model line was verified. **Skip; changelog extraction was rate-limited after the direct HTTP pass.**
- **MiniMax** — checked [news](https://www.minimax.io/news) and [research/blog](https://www.minimax.io/blog). The latest qualifying base model remains MiniMax M3 from 2026-06-01; current October material is financial/research/product content. **Skip.**
- **Z.ai** — checked [release notes](https://docs.z.ai/release-notes/new-released) and [blog](https://z.ai/blog). Release notes list existing GLM lines; the blog returned HTTP 404. No in-window qualifying model. **Skip; blog access limitation recorded.**
- **Xiaomi** — checked the [GitHub organization](https://github.com/XiaomiMiMo), [Hugging Face organization](https://huggingface.co/XiaomiMiMo), and [MiMo-V2.6 page](https://mimo.xiaomi.com/mimo-v2-6). MiMo-Code activity is a coding harness; no later base model. **Skip.**
- **NVIDIA** — checked [NVIDIA Build](https://build.nvidia.com/nvidia) and [Hugging Face](https://huggingface.co/nvidia). October activity includes PixelUMM/image-video and other modality, safety, retrieval, dataset, or quantized artifacts; no new qualifying general programming/agentic base line. **Skip.**
- **IFM** — checked [K2 page](https://ifm.ai/k2/), [press release](https://ifm.ai/k2/press-release/), and [docs](https://docs.ifm.ai/); all three returned HTTP 403. The bounded search confirmed the existing 2026-09-03 K2 Horizon release but no later candidate. **Unresolved provider-surface limitation; no add.**
- **Agnes AI** — checked [home](https://agnes-ai.com/), [Agnes 3.0 Flash docs](https://www.agnes-ai.com/zh-Hans/docs/agnes-30-flash), [platform](https://platform.agnes-ai.com), and [GitHub](https://github.com/AgnesAI-Labs). Recent Agnes Harness and self-improvement reports are harness/research artifacts; no new base model. **Skip.**
- **InclusionAI** — checked the official [model index](https://www.inclusion-ai.org/model/), [Hugging Face organization](https://huggingface.co/inclusionAI), [Ling-3.0-flash-VL card](https://huggingface.co/inclusionAI/Ling-3.0-flash-VL), [LLaDA-UI project](https://www.inclusion-ai.org/LLaDA-UI/), [GitHub organization](https://github.com/inclusionAI), and official [Ant Ling X account](https://x.com/AntLingAGI). Added **Ling 3.1 Flash** from the official 2026-09-30 announcement and 2026-10-02 availability follow-up. Existing Ling/Ring/Ming updates, infrastructure, and future open-source plans were not duplicated.
- **Inception** — checked [home](https://inceptionlabs.ai/), [models](https://inceptionlabs.ai/models), [Mercury 2.5 announcement](https://inceptionlabs.ai/blog/introducing-mercury-2-5), and [docs](https://docs.inceptionlabs.ai/get-started). October page metadata and later blog content did not identify a new qualifying model; Mercury 2.5 remains current. **Skip.**
- **IBM Granite** — checked [Granite 4.2 announcement](https://research.ibm.com/blog/introducing-granite-4-2), [Granite](https://www.ibm.com/granite), and [Hugging Face](https://huggingface.co/ibm-granite). October activity is Granite Speech/forecasting or existing Granite 4.2 artifacts; speech and forecasting are outside scope. **Skip.**
- **LongCat** — checked [home](https://longcat.ai/), [LongCat 2.0 announcement](https://longcat.ai/blog/longcat-2.0), [Hugging Face](https://huggingface.co/meituan-longcat), and [GitHub](https://github.com/meituan-longcat). LongCat-DeepResearch is a research system/harness, not a new released base model. **Skip.**
- **Thinking Machines** — checked [company site](https://thinkingmachines.ai/), [Inkling article](https://huggingface.co/blog/thinkingmachines-inkling), [Hugging Face organization](https://huggingface.co/thinkingmachines), and [GitHub organization](https://github.com/thinking-machines-lab). Tinker/cookbook updates are training infrastructure; no new model. **Skip.**
- **Arcee AI** — checked [home](https://arcee.ai/), [Trinity page](https://arcee.ai/trinity), [Hugging Face](https://huggingface.co/arcee-ai), and [model docs](https://docs.arcee.ai/get-started/models-overview). `nac` is a harness; no new Trinity model. **Skip.**
- **Celeris** — checked [home](https://celeris.ai/), [Celeris-1](https://celeris.ai/celeris-1), [Magnus](https://celeris.ai/celeris-1-magnus), and [blog](https://celeris.ai/blog). No later qualifying model. **Skip.**

## Explicitly missing-lab ledger

- **Amazon** — checked [AWS What's New](https://aws.amazon.com/about-aws/whats-new/) and [Amazon Science RSS](https://www.amazon.science/index.rss). No qualifying in-window coding/agentic base or specialized-base release; remains missing. **Skip.**
- **Cohere** — checked [blog](https://cohere.com/blog), [release notes](https://docs.cohere.com/changelog), and [Hugging Face](https://huggingface.co/CohereLabs). North Small Translate and embedding/translation artifacts are outside scope; no new agentic-coding base line. **Skip.**
- **StepFun** — checked [official site](https://www.stepfun.com/) and [Hugging Face](https://huggingface.co/stepfun-ai). No qualifying in-window model; Step 3.7 Flash predates the window. **Skip.**
- **AI21 Labs** — checked [blog](https://www.ai21.com/blog) and [Studio](https://studio.ai21.com/). The latest model/research material predates the window and no qualifying new base line was verified. **Skip.**

## Provider checklist/configuration

- No new provider was discovered. InclusionAI was already configured with the official model index, Hugging Face, GitHub, and Ant Ling source set, including the official X surface used for Ling 3.1 Flash.
- `scripts/provider-release-sources.json` remains unchanged: 26 configured providers plus four explicit missing labs.
- The provider-checklist regression test continues to assert that every configured provider and missing lab is emitted exactly once.

## Retrieval and evidence limits

- The direct official-surface pass requested all **86 unique configured primary URLs**. It returned **79 HTTP 200**, **6 HTTP 403**, and **1 HTTP 404** responses. The 403 responses were OpenAI's two archive pages, xAI's archive, and IFM's three pages; the 404 was Z.ai's blog. These limits are recorded above and were not converted into unsupported “no activity” claims.
- Official GitHub/Hugging Face organization activity was used for discovery and scope triage. Recent repositories/models were grouped as model releases, harnesses, infrastructure, datasets, modality-only artifacts, speech, quantizations, or snapshots before decisions.
- The Artificial Analysis leaderboard was fetched directly at 2.42 MB and exposed one in-window catalog family: `Ling 3.1 Flash` with `releaseDate=2026-10-01` and creator `InclusionAI`. It was used to discover the exact alias and benchmark page, not to replace the maker source.
- Dynamic benchmark data can change after this snapshot. The exact AA model page was independently fetched, the Intelligence Index metric was kept separate, and the absence of a Coding Index was preserved as unknown. The mirror page was unavailable, so no mirror-derived Coding value was used.
- Search results were treated only as discovery leads. The load-bearing release evidence for the added row is the fetched official Ant Ling X announcement/follow-up; the OpenRouter page is secondary availability evidence.
- No sibling, family, effort, API alias, dated snapshot, quantization, or other benchmark score was copied to the new row.

## Expected refresh result

- **HEAD baseline:** 146 rows; newest maker date 2026-09-30.
- **Rows added:** 1 (`Ling 3.1 Flash`).
- **Expected post-refresh:** 147 unique rows; newest maker date remains 2026-09-30.
- **Coding scores added:** none; Ling 3.1 Flash has no independently verified exact AA Coding Index.
- **Separate Intelligence Index addition:** Ling 3.1 Flash = 41, `default`, exact AA model page.
- **Cache key:** `20261005a` in `index.html`, `src/app.js`, and the static asset regression test.
