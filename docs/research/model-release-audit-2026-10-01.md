# Agentic model release audit — 2026-10-01

## Boundary and working-tree safety

- **Repository:** `jgordijn/agentic-model-release-tracker`
- **Target branch:** `main`; direct publication is intentional. No worktree was used.
- **Remote:** `origin` → `https://github.com/jgordijn/agentic-model-release-tracker.git`
- **HEAD / `origin/main` before this refresh:** `80dcf7ca393c55010da92bb0a788ddfa5ccf592f` (`feat: refresh model releases through 2026-09-30`, 2026-09-30T05:40:50Z).
- **HEAD baseline:** 145 unique rows; newest tracked `releaseDate` `2026-09-29`.
- **Working-tree safety:** the only pre-existing untracked path was `screenshots/baseline-local.png`; it was left untouched. No tracked unrelated changes were present.
- **Research cutoff:** 2026-10-01 in `Europe/Amsterdam`.
- **Effective search window:** inclusive from the latest tracked `releaseDate` (`2026-09-29`) through the cutoff (`2026-10-01`).
- **Checklist command:** `node scripts/check-provider-releases.mjs --markdown` was run before external research. It reported `since 2026-09-29`, 26 configured providers, and four explicit missing labs.
- **Search budget:** one bounded discovery query per configured provider and missing lab, with one narrow follow-up for the OpenAI surface; no repeated broad sweep was used. Direct official pages, official registries, and exact model pages were used for verification.

## Inclusion and score policy

Only maker-released base model lines or clearly differentiated specialized-base lines relevant to programming or agentic work are included. Product features, partner integrations, API aliases, preview-only configurations, modality-only models, quantizations, packaging/checkpoints, serving modes, pure snapshots, and harnesses are excluded or collapsed into an existing family row.

`codingIndex` is populated only from an exact Artificial Analysis **Coding Index** row for the exact model and configuration. Intelligence Index, Agentic Index, SWE-bench, DeepSWE, SciCode, Terminal-Bench, CursorBench, maker scores, and other coding benchmarks are not substitutes. Unknown exact Coding Index values remain `null` and have no `scoreSourceUrl`.

The separate `intelligenceIndex` field remains a distinct dashboard metric. Its values and configurations never populate `codingIndex`.

## Added row

| Model | Provider | Maker date | Category | Coding Index | Intelligence Index | Decision and provenance |
|---|---|---:|---|---:|---:|---|
| Gemini 4 Argon | Google | 2026-09-30 | base | unknown | 53 (`high`) | **Add.** [Google's announcement](https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-4-argon/) describes a distinct frontier model for real-world software engineering, enterprise knowledge work, and cyber defense. Initial access is rolling out to trusted cyber defenders through the Fairwind Program while Google gradually expands access and gathers feedback before wider availability; this follows the repository's existing inclusion of the distinct Gemini 3.8 Flash Cyber line under the same program. |

### Score and configuration provenance

- The exact [Artificial Analysis Gemini 4 Argon model page](https://artificialanalysis.ai/models/gemini-4-argon), retrieved 2026-10-01, identifies the `Gemini 4 Argon (High)` configuration and reports **Intelligence Index 53**. The dataset stores this separately as `intelligenceIndex: 53`, `intelligenceIndexConfiguration: "high"`, and `intelligenceIndexSourceUrl` pointing to that exact model page.
- The [Artificial Analysis model leaderboard](https://artificialanalysis.ai/leaderboards/models), retrieved 2026-10-01, exposes `Gemini 4 Argon (high)` as a distinct leaderboard row with Intelligence Index 53; no Coding Index value is exposed there.
- The [Easy Benchmarks Gemini 4 Argon snapshot](https://easy-benchmarks.com/models/gemini-4-argon), retrieved 2026-10-01, reports Coding `n/a` and Intelligence Index 52.6. It is a secondary mirror/snapshot, not the Artificial Analysis website. It was used only to confirm the absence of a Coding Index score; no mirror value was copied into `codingIndex`.
- `codingIndex` remains `null`; no score source is stored for it. DeepSWE, SciCode, Intelligence Index, and other non-Coding metrics are not substitutes.
- `high` is an Artificial Analysis effort/configuration label, not a second release row. No API alias or sibling configuration was added.

## Configured provider ledger

Every provider object in `scripts/provider-release-sources.json` was checked through its configured official surfaces and one bounded discovery query. “No qualifying add” means no additional maker-dated base/specialized-base row was verified for the cutoff; it does not mean the provider had no activity.

- **OpenAI** — checked [news](https://openai.com/news/), [index](https://openai.com/index/), and the [official developer model catalog](https://developers.openai.com/api/docs/models). The catalog still exposes GPT-6.1 Sol; no later qualifying model was verified. News/index returned HTTP 403 in the direct pass, so no unsupported later release is claimed.
- **Anthropic** — checked [newsroom](https://www.anthropic.com/news) and the [Claude model overview](https://docs.anthropic.com/en/docs/about-claude/models). The overview still lists Fable 5.1, Opus 5.5, and Sonnet 5.5; no later qualifying release was found. A later/coming model is not added without a released maker line.
- **Google** — checked the [Gemini model archive](https://blog.google/innovation-and-ai/models-and-research/gemini-models/), [developer-tools archive](https://blog.google/innovation-and-ai/technology/developers-tools/), and [Gemini API models](https://ai.google.dev/gemini-api/docs/models). **Added Gemini 4 Argon** from the exact official announcement dated 2026-09-30. Gemini API documentation was updated on the cutoff date but only showed existing Gemini 3.8 Flash and existing modality/configuration lines.
- **Meta** — checked the [Meta AI blog](https://ai.meta.com/blog/) and [official Hugging Face organization](https://huggingface.co/meta-models). No new in-window programming/agentic base line; existing Muse artifacts were outside the window or packaging variants.
- **OpenBMB** — checked [Hugging Face](https://huggingface.co/OpenBMB), [GitHub organization](https://github.com/OpenBMB), and the [MiniCPM repository](https://github.com/OpenBMB/MiniCPM). Registry/repository updates were to MiniCPM5 artifacts, agent frameworks, or other existing projects; SFT, midtrain, base, quantized, GGUF, MLX, GPTQ, and DSpark artifacts are not new model rows.
- **Apodex** — checked [homepage](https://www.apodex.com/), [Apodex 1.1 announcement](https://www.apodex.com/blog/apodex-1.1-scaling-agentic-intelligence-for-complex-work), and [API catalog](https://www.apodex.com/api). No new qualifying line; Mini/product/integration activity remains excluded.
- **xAI** — checked [developer model docs](https://docs.x.ai/developers/models) and [news archive](https://x.ai/news). The docs still feature existing Grok 4.7; the archive returned HTTP 403 and the bounded search returned no new evidence. No later release is claimed; this remains an access limitation.
- **Cursor** — checked the [Cursor blog](https://cursor.com/blog). No Cursor-owned model release; integrations and model availability in the editor are not separate maker rows.
- **Mistral** — checked [news](https://mistral.ai/news) and the [model overview](https://docs.mistral.ai/getting-started/models/models_overview/). The catalog still lists existing Mistral Medium 3.5 and other prior lines; no new in-window qualifying model.
- **Alibaba** — checked [Qwen legacy blog](https://qwenlm.github.io/blog), [Qwen blog](https://qwen.ai/blog), and [Qwen Cloud model catalog](https://www.qwencloud.com/models). Qwen3.8-Max-0902 is explicitly an upgraded snapshot of an existing family and is not a new family row; no other in-window qualifying release.
- **Tencent** — checked [UI-Mate](https://ui-mate.github.io/), [Hugging Face](https://huggingface.co/tencent), and [GitHub](https://github.com/Tencent). Repository activity was framework/UI/infrastructure work; no new programming/agentic base model was verified.
- **DeepSeek** — checked the [API news archive](https://api-docs.deepseek.com/news/) and [transparency center](https://www.deepseek.com/en/transparency/). The transparency center lists existing V4.0/V3.2 releases; no release after the existing V4.1 Flash row.
- **Moonshot.ai** — checked the [platform changelog](https://platform.moonshot.ai/blog/posts/changelog), [Moonshot homepage](https://www.moonshot.ai/), and [official Kimi account](https://x.com/Kimi_Moonshot). The accessible changelog is stale and contains no in-window release; no new maker-dated qualifying line was verified.
- **MiniMax** — checked [news](https://www.minimax.io/news), [research/blog](https://www.minimax.io/blog), and the [model release notes](https://platform.minimax.io/docs/release-notes/models). The latest qualifying M3 release remains 2026-06-01; no later coding/agentic base model.
- **Z.ai** — checked [release notes](https://docs.z.ai/release-notes/new-released) and [blog](https://z.ai/blog). Release notes stop at GLM-5.3 on 2026-08-26; the blog returned HTTP 404. No in-window release.
- **Xiaomi** — checked [GitHub organization](https://github.com/XiaomiMiMo), [Hugging Face organization](https://huggingface.co/XiaomiMiMo), and [MiMo-V2.6 announcement](https://mimo.xiaomi.com/mimo-v2-6). No release after MiMo-V2.6-Pro on 2026-09-22.
- **NVIDIA** — checked [NVIDIA Build](https://build.nvidia.com/nvidia) and [Hugging Face](https://huggingface.co/nvidia). Recent entries included Kumo/tabular, media, research, datasets, and existing model updates. [GLM-5.3-Flash-NVFP4](https://huggingface.co/nvidia/GLM-5.3-Flash-NVFP4) is explicitly a quantized third-party GLM-5.3-Flash checkpoint and is excluded; no new NVIDIA base/specialized-base line.
- **IFM** — checked [K2 page](https://ifm.ai/k2/), [press release](https://ifm.ai/k2/press-release/), and [docs](https://docs.ifm.ai/). All three returned HTTP 403 in the direct pass; no new release is claimed. This remains an unresolved provider-surface limitation.
- **Agnes AI** — checked [homepage](https://agnes-ai.com/), [model docs](https://www.agnes-ai.com/zh-Hans/docs/agnes-30-flash), [platform](https://platform.agnes-ai.com), and [GitHub](https://github.com/AgnesAI-Labs). New repository activity was harnesses, skills, and reports; Agnes 3.0 Flash remains a preview line already represented/handled under existing policy. No new base model.
- **InclusionAI** — checked [model catalog](https://www.inclusion-ai.org/model/), [Hugging Face](https://huggingface.co/inclusionAI), [Ling-3.0-flash-VL card](https://huggingface.co/inclusionAI/Ling-3.0-flash-VL), [LLaDA-UI](https://www.inclusion-ai.org/LLaDA-UI/), [GitHub](https://github.com/inclusionAI), and [official account](https://x.com/AntLingAGI). Registry activity was infrastructure, image/any-to-any, or existing Ling/Ring work; no new qualifying base line.
- **Inception** — checked [homepage](https://inceptionlabs.ai/), [models](https://inceptionlabs.ai/models), [Mercury 2.5 announcement](https://inceptionlabs.ai/blog/introducing-mercury-2-5), and [docs](https://docs.inceptionlabs.ai/get-started). [Mercury Voice](https://inceptionlabs.ai/blog/introducing-mercury-voice) is a 2026-09-29 preview and voice-only, so it is explicitly skipped. Mercury 2.5 remains the qualifying row.
- **IBM Granite** — checked [Granite 4.2 announcement](https://research.ibm.com/blog/introducing-granite-4-2), [Granite site](https://www.ibm.com/granite), and [Hugging Face](https://huggingface.co/ibm-granite). Granite 4.2 3B/8B/30B is the existing 2026-08-25 release; Granite Speech 5.0 is speech-only and excluded. No later qualifying line.
- **LongCat** — checked [homepage](https://longcat.ai/), [LongCat 2.0 announcement](https://longcat.ai/blog/longcat-2.0), [Hugging Face](https://huggingface.co/meituan-longcat), and [GitHub](https://github.com/meituan-longcat). LongCat-DeepResearch is a research system/harness whose model improvements are described as intended for a future general-purpose release, not a new released base line. No add.
- **Thinking Machines** — checked [company site](https://thinkingmachines.ai/), [Inkling article](https://huggingface.co/blog/thinkingmachines-inkling), [Hugging Face organization](https://huggingface.co/thinkingmachines), and [GitHub organization](https://github.com/thinking-machines-lab). Tinker/cookbook updates are training infrastructure; no new model.
- **Arcee AI** — checked [home](https://arcee.ai/), [Trinity page](https://arcee.ai/trinity), [Hugging Face](https://huggingface.co/arcee-ai), and [docs](https://docs.arcee.ai/get-started/models-overview). Recent `nac` activity is a harness; no new Trinity model.
- **Celeris** — checked [home](https://celeris.ai/), [Celeris-1](https://celeris.ai/celeris-1), [Magnus page](https://celeris.ai/celeris-1-magnus), and [blog](https://celeris.ai/blog). No later qualifying model; voice/research/feature entries remain excluded.

## Explicitly missing-lab ledger

- **Amazon** — checked [AWS What's New](https://aws.amazon.com/about-aws/whats-new/) and [Amazon Science RSS](https://www.amazon.science/index.rss). No qualifying in-window coding/agentic base or specialized-base model; remains missing.
- **Cohere** — checked [blog](https://cohere.com/blog), [release notes](https://docs.cohere.com/changelog), and [Hugging Face](https://huggingface.co/CohereLabs). [Embed 5](https://cohere.com/blog/embed-5) was released 2026-09-30, but it is an embedding family, even though it supports retrieval in agentic workflows; it is excluded by scope. RCP-nDCG is a metric, not a model. No add; remains missing.
- **StepFun** — checked [official site](https://www.stepfun.com/) and [Hugging Face](https://huggingface.co/stepfun-ai). No qualifying in-window release; remains missing.
- **AI21 Labs** — checked [blog](https://www.ai21.com/blog) and [Studio redirect](https://studio.ai21.com/). No qualifying in-window programming/agentic base release; remains missing.

## Provider checklist/configuration

- No new provider was discovered. Gemini 4 Argon was found on Google's already-configured Gemini archive and developer-model surfaces, so `scripts/provider-release-sources.json` required no change.
- The configured checklist remains 26 providers plus four explicit missing labs. The provider checklist test continues to assert complete provider/missing-lab emission.

## Retrieval and evidence limits

- The direct official-surface pass requested all **86 unique configured primary URLs**, followed redirects, and returned **79 HTTP 200**, **6 HTTP 403**, and **1 HTTP 404** responses. The six 403 responses were OpenAI's two archive pages, xAI's archive, and IFM's three pages; Z.ai's blog was the 404. These limitations are recorded above and were not converted into unsupported “no activity” claims.
- Official Hugging Face organization APIs and GitHub organization APIs were queried for recent model/repository activity where configured. Updated artifacts were grouped as model updates, quantizations, snapshots, datasets, infrastructure, or harnesses before scope decisions.
- Search results were sparse for most bounded provider queries. Search snippets were used only as discovery leads; the added row is supported by the fetched official Google announcement and exact benchmark/model pages.
- Artificial Analysis and Easy Benchmarks are dynamic. The retrieved date, exact `high` configuration, metric distinction, and `Coding n/a` result are recorded above. No Coding Index score was inferred from Intelligence Index, SciCode, DeepSWE, or Google's own claims.
- The current AA model page reports Intelligence Index 53 while the Easy Benchmarks mirror reports 52.6. This is an expected source/display/rounding difference for the separate Intelligence metric, not a Coding Index discrepancy; neither value is stored as `codingIndex`.
- No sibling, family, effort, API alias, snapshot, quantization, or other benchmark score was copied to the new row.

## Expected refresh result

- **HEAD baseline:** 145 rows; newest date 2026-09-29.
- **Rows added:** 1 (`Gemini 4 Argon`).
- **Expected post-refresh:** 146 unique rows; newest date 2026-09-30.
- **Coding scores added:** none; Gemini 4 Argon remains `codingIndex: null` because the exact Coding Index is `n/a`.
- **Separate Intelligence Index addition:** Gemini 4 Argon = 53, `high`, exact AA model page.
- **Cache key:** `20261001a` in `index.html`, `src/app.js`, and the static asset regression test.
