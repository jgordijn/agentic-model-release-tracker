# Agentic model release audit — 2026-09-30

## Boundary and working-tree safety

- **Repository:** `jgordijn/agentic-model-release-tracker`
- **Target branch:** `main`; direct publication is intentional. No worktree was used.
- **Remote:** `origin` → `https://github.com/jgordijn/agentic-model-release-tracker.git`
- **HEAD / `origin/main` before this refresh:** `0220b5a` (`feat: add Intelligence Index ranking option`, 2026-09-24).
- **HEAD baseline:** 135 rows; newest tracked `releaseDate` `2026-09-22`.
- **Working tree at job start:** 144 rows and newest date `2026-09-28`, with a coherent, related continuation of the prior model refresh already present in `index.html`, `src/app.js`, `src/modelData.js`, `scripts/provider-release-sources.json`, and `scripts/check-provider-releases.mjs`. Those changes were preserved; no reset, stash, or deletion was performed.
- **Known untracked file:** `screenshots/baseline-local.png`; left untouched.
- **Research cutoff:** 2026-09-30 in `Europe/Amsterdam`.
- **Effective search window for new candidates:** inclusive from the working-tree baseline `2026-09-28` through 2026-09-30. The earlier related continuation also records verified backfills dated before that boundary.
- **Checklist command:** `node scripts/check-provider-releases.mjs --markdown` was run before external research. It reported `since 2026-09-28`, 26 configured providers, and four explicit missing labs.
- **Search budget:** one bounded discovery query per configured provider and missing lab, followed by direct checks of configured official surfaces and only one exact follow-up for the Artificial Analysis/OpenAI discovery lead. Repeated broad searches were not used.

## Inclusion and score policy

Only maker-released base model lines or clearly differentiated specialized-base lines relevant to programming or agentic work are included. Product features, partner integrations, API aliases, preview-only configurations, modality-only models, quantizations, packaging/checkpoints, serving modes, and disallowed mini/nano/lite variants are excluded or collapsed into an existing family row.

`codingIndex` is populated only from an exact Artificial Analysis **Coding Index** row for the exact model and configuration. Intelligence Index, Agentic Index, SWE-bench, DeepSWE, Terminal-Bench, Terminal-Bench Science, CursorBench, maker scores, and other coding benchmarks are not substitutes. Unknown exact Coding Index values remain `null` and have no `scoreSourceUrl`.

The separate `intelligenceIndex` field remains a distinct dashboard metric. Its values and configurations never populate `codingIndex`.

## Added or retained rows in this continued refresh

The pre-existing working-tree continuation added the following verified rows and source coverage. They are included in this audit so the direct commit contains one auditable refresh rather than leaving a half-refresh stranded in the working tree.

| Model | Provider | Maker date | Category | Coding Index | Decision and provenance |
|---|---|---:|---|---:|---|
| Trinity-Large-Thinking | Arcee AI | 2026-04-01* | specialized-base | unknown | Official [Hugging Face model card](https://huggingface.co/arcee-ai/Trinity-Large-Thinking); registry `createdAt` is explicitly used only as the maker-availability fallback because the card has no separate launch date. Preview, TrueBase, Mini, and Nano variants are excluded. |
| LongCat 2.0 | LongCat | 2026-06-29 | base | 45.3 | Official [LongCat release](https://longcat.ai/blog/longcat-2.0). [Easy Benchmarks model snapshot](https://easy-benchmarks.com/models/longcat-2-0), retrieved 2026-09-29, reports the exact no-effort-suffix Coding Index; it is secondary extraction evidence. The authoritative AA model URL [LongCat 2.0](https://artificialanalysis.ai/models/longcat-2-0) is retained. |
| Inkling | Thinking Machines | 2026-07-15 | base | unknown | Official [Hugging Face release article](https://huggingface.co/blog/thinkingmachines-inkling); Inkling-Small and BF16/NVFP4/GGUF packaging variants are excluded. Maker SWE-bench/Terminal-Bench and AA Intelligence Index content are not Coding Index substitutes. |
| Granite 4.2 3B | IBM Granite | 2026-08-25 | base | 17.5 | Official [IBM Granite 4.2 announcement](https://research.ibm.com/blog/introducing-granite-4-2). [Easy Benchmarks exact snapshot](https://easy-benchmarks.com/models/granite-4-2-3b), retrieved 2026-09-29, is secondary extraction evidence; authoritative AA model URL [Granite 4.2 3B](https://artificialanalysis.ai/models/granite-4-2-3b) is retained. |
| Granite 4.2 8B | IBM Granite | 2026-08-25 | base | 22.4 | Same official maker source; [Easy Benchmarks exact snapshot](https://easy-benchmarks.com/models/granite-4-2-8b), retrieved 2026-09-29, is secondary extraction evidence; authoritative AA model URL [Granite 4.2 8B](https://artificialanalysis.ai/models/granite-4-2-8b) is retained. |
| Granite 4.2 30B | IBM Granite | 2026-08-25 | base | 29.9 | Same official maker source; [Easy Benchmarks exact snapshot](https://easy-benchmarks.com/models/granite-4-2-30b), retrieved 2026-09-29, is secondary extraction evidence; authoritative AA model URL [Granite 4.2 30B](https://artificialanalysis.ai/models/granite-4-2-30b) is retained. |
| Celeris-1 Magnus | Celeris | 2026-08-31 | specialized-base | unknown | Official [Celeris announcement](https://celeris.ai/introducing-celeris-1-magnus). The maker's tau3-Banking result is not a Coding Index; no exact AA Coding Index row was independently verifiable. |
| Mercury 2.5 | Inception | 2026-09-08 | base | unknown | Official [Inception announcement](https://www.inceptionlabs.ai/blog/introducing-mercury-2-5). Mercury Voice and Mercury Router are preview-only and excluded. AA Intelligence/other benchmark material is not substituted. |
| Claude Sonnet 5.5 | Anthropic | 2026-09-28 | base | unknown | Official [Anthropic announcement](https://www.anthropic.com/claude-sonnet-5-5) and [newsroom listing](https://www.anthropic.com/news). The exact AA effort variants were checked; no exact Coding Index row was exposed, so Terminal-Bench, FrontierCode, CursorBench, and Intelligence Index values are not used. |
| GPT-6.1 Sol | OpenAI | 2026-09-29 | base | unknown | Official [OpenAI announcement](https://openai.com/index/introducing-gpt-6-1-sol/) says it is available through the API as `gpt-6.1-sol` for agentic coding and computer use. The exact AA release page [GPT-6.1 Sol](https://artificialanalysis.ai/models/gpt-6-1-sol) and leaderboard expose max/xhigh/high/medium/low configurations and Intelligence Index data, not Coding Index. The [Easy Benchmarks snapshot](https://easy-benchmarks.com/models/gpt-6-1-sol), retrieved 2026-09-30, reports Coding `n/a`; no score is inferred. |

\* The registry timestamp for Trinity-Large-Thinking is explicitly marked as fallback provenance, not a claimed announcement date.

The live AA lookup also supplied the separate `intelligenceIndex: 52`, configuration `max`, and exact model URL for GPT-6.1 Sol. That value is stored only in `intelligenceIndex`; it is not a Coding Index value.

### Separate Intelligence Index provenance for the continued rows

These values are separate from Coding Index and were recorded from the exact AA model pages/leaderboard configuration rows retrieved on 2026-09-30:

| Model | Intelligence Index | Configuration | AA model URL |
|---|---:|---|---|
| Claude Sonnet 5.5 | 56 | max with fallback | https://artificialanalysis.ai/models/claude-sonnet-5-5 |
| Granite 4.2 3B | 9 | default | https://artificialanalysis.ai/models/granite-4-2-3b |
| Granite 4.2 8B | 11 | default | https://artificialanalysis.ai/models/granite-4-2-8b |
| Granite 4.2 30B | 15 | default | https://artificialanalysis.ai/models/granite-4-2-30b |
| Inkling | 25 | xhigh | https://artificialanalysis.ai/models/inkling |
| LongCat 2.0 | 19 | default | https://artificialanalysis.ai/models/longcat-2-0 |
| Mercury 2.5 | 12 | default | https://artificialanalysis.ai/models/mercury-2-5 |
| Trinity-Large-Thinking | 11 | default | https://artificialanalysis.ai/models/trinity-large-thinking |

The dataset keeps these fields separate from `codingIndex`; no one of these values is used as a Coding Index score.

## Configured provider ledger

Every provider object in `scripts/provider-release-sources.json` was checked through the configured official surfaces and one bounded discovery query. “No qualifying add” means no new maker-dated base/specialized-base row was verified for the cutoff, not that the provider has no product activity.

- **OpenAI** — checked [news](https://openai.com/news/), [index](https://openai.com/index/), and the [official developer model catalog](https://developers.openai.com/api/docs/models). Added GPT-6.1 Sol. `Introducing dots` is image/modality scope and not a tracker row; DevDay and API changes are product/features. The initial direct fetch of the OpenAI news/index surfaces was access-limited, but the official news page and exact announcement were independently extracted through the alternate retrieval path.
- **Anthropic** — checked [newsroom](https://www.anthropic.com/news) and the [Claude model overview](https://platform.claude.com/docs/en/models/overview). Added Claude Sonnet 5.5 on 2026-09-28; no later qualifying model was found.
- **Google** — checked the [Gemini model archive](https://blog.google/innovation-and-ai/models-and-research/gemini-models/), [developer-tools archive](https://blog.google/innovation-and-ai/technology/developers-tools/), and [Gemini API models](https://ai.google.dev/gemini-api/docs/models). No new in-window qualifying base or specialized-base release.
- **Meta** — checked the [Meta AI blog](https://ai.meta.com/blog/) and [official Hugging Face organization](https://huggingface.co/meta-models). Muse Spark 1.1 is dated 2026-07-09 and outside this window; Muse Image and other media releases are modality-only. No add.
- **OpenBMB** — checked [Hugging Face](https://huggingface.co/OpenBMB), [GitHub organization](https://github.com/OpenBMB), and [MiniCPM repository](https://github.com/OpenBMB/MiniCPM). September 29 registry updates to existing artifacts do not establish a new family release; no add.
- **Apodex** — checked [homepage](https://www.apodex.com/), [blog](https://www.apodex.com/blog/apodex-1.1-scaling-agentic-intelligence-for-complex-work), and [API catalog](https://www.apodex.com/api). No add; Apodex 1.1 remains the qualifying line and Mini remains excluded.
- **xAI** — checked [developer model docs](https://docs.x.ai/developers/models) and the configured [news archive](https://x.ai/news). The news archive returned HTTP 403 during the direct surface pass and the bounded search returned no new evidence; no new release is claimed. This is an unresolved access limitation, not evidence that the archive is empty.
- **Cursor** — checked the [Cursor blog](https://cursor.com/blog). No Cursor-owned model release; integrations such as model availability in Cursor are not separate maker rows.
- **Mistral** — checked [news](https://mistral.ai/news) and the [model overview](https://docs.mistral.ai/models). No new qualifying release after the existing cutoff.
- **Alibaba** — checked [Qwen legacy blog](https://qwenlm.github.io/blog/), [Qwen blog](https://qwen.ai/blog), and [Qwen Cloud model catalog](https://www.qwencloud.com/models). No new maker-dated qualifying row; aliases and dated snapshots are not new families.
- **Tencent** — checked [UI-Mate](https://ui-mate.github.io/), [Hugging Face](https://huggingface.co/tencent), and [GitHub](https://github.com/Tencent). September registry/repository activity was not a verified new programming/agentic base line; no add.
- **DeepSeek** — checked the [API news archive](https://api-docs.deepseek.com/news/) and [transparency center](https://www.deepseek.com/en/transparency/). No release after the existing DeepSeek V4.1 Flash row.
- **Moonshot.ai** — checked the [platform changelog](https://platform.kimi.ai/blog/posts/changelog), [Moonshot homepage](https://www.moonshot.ai/), and [official Kimi account](https://x.com/Kimi_Moonshot). No new maker-dated qualifying release.
- **MiniMax** — checked [news](https://www.minimax.io/news) and [blog](https://www.minimax.io/blog). No new qualifying model in the window.
- **Z.ai** — checked [release notes](https://docs.z.ai/release-notes/new-released) and the configured [blog](https://z.ai/blog). The blog returned 404; release notes were available and yielded no in-window qualifying release.
- **Xiaomi** — checked [GitHub organization](https://github.com/XiaomiMiMo), [Hugging Face organization](https://huggingface.co/XiaomiMiMo), and [MiMo-V2.6 announcement](https://mimo.xiaomi.com/mimo-v2-6). No release after MiMo-V2.6-Pro on 2026-09-22.
- **NVIDIA** — checked [NVIDIA Build](https://build.nvidia.com/nvidia) and [Hugging Face](https://huggingface.co/nvidia). September 28–30 registry items were media, research, agent datasets, or other artifacts rather than a qualifying new base/specialized-base model; no add.
- **IFM** — checked the configured [K2 page](https://ifm.ai/k2/), [press release](https://ifm.ai/k2/press-release/), and [docs](https://docs.ifm.ai/). All three returned HTTP 403 in the direct pass; no new release is claimed. This remains an evidence limitation.
- **Agnes AI** — checked [homepage](https://agnes-ai.com/), [model docs](https://www.agnes-ai.com/zh-Hans/docs/agnes-30-flash), [platform](https://platform.agnes-ai.com), and [GitHub](https://github.com/AgnesAI-Labs). No new qualifying release.
- **InclusionAI** — checked [model catalog](https://www.inclusion-ai.org/model/), [Hugging Face](https://huggingface.co/inclusionAI), [Ling-3.0-flash-VL card](https://huggingface.co/inclusionAI/Ling-3.0-flash-VL), [LLaDA-UI](https://www.inclusion-ai.org/LLaDA-UI/), [GitHub](https://github.com/inclusionAI), and [official account](https://x.com/AntLingAGI). September 29–30 registry activity included modality/any-to-any and repository updates, not a verified new qualifying base line; no add.
- **Inception** — checked [homepage](https://www.inceptionlabs.ai/), [models](https://www.inceptionlabs.ai/models), [Mercury 2.5 announcement](https://www.inceptionlabs.ai/blog/introducing-mercury-2-5), and [docs](https://docs.inceptionlabs.ai/get-started). Mercury 2.5 is the 2026-09-08 row already retained; Mercury Voice on 2026-09-29 is voice-only and preview-only, so it is skipped.
- **IBM Granite** — checked [IBM Granite announcement](https://research.ibm.com/blog/introducing-granite-4-2), [Granite site](https://www.ibm.com/granite), and [Hugging Face](https://huggingface.co/ibm-granite). Granite 4.2 3B/8B/30B is the 2026-08-25 multi-variant release already retained with separate exact mirror rows; Granite Speech 5.0 is speech-only and excluded. No later qualifying line.
- **LongCat** — checked [LongCat homepage](https://longcat.ai/), [LongCat 2.0 announcement](https://longcat.ai/blog/longcat-2.0), [Hugging Face](https://huggingface.co/meituan-longcat), and [GitHub](https://github.com/meituan-longcat). LongCat 2.0 is the 2026-06-29 qualifying row already retained; no later maker release.
- **Thinking Machines** — checked [Inkling article](https://huggingface.co/blog/thinkingmachines-inkling), [Hugging Face organization](https://huggingface.co/thinkingmachines), [GitHub organization](https://github.com/thinking-machines-lab), and [company site](https://thinkingmachines.ai/). Inkling is the 2026-07-15 qualifying line; no later release.
- **Arcee AI** — checked [home](https://www.arcee.ai/), [Trinity page](https://www.arcee.ai/trinity), [Hugging Face](https://huggingface.co/arcee-ai), and [docs](https://docs.arcee.ai/arcee-language-models/arcee-model-overview). Trinity-Large-Thinking is retained using the documented registry fallback date; Preview, TrueBase, Mini, and Nano variants are excluded. No later qualifying release.
- **Celeris** — checked [home](https://celeris.ai/), [Celeris-1](https://celeris.ai/celeris-1), [Magnus page](https://celeris.ai/celeris-1-magnus), and [blog](https://celeris.ai/blog). Celeris-1 Magnus is the 2026-08-31 qualifying distinct line; no exact Coding Index row and no later qualifying release. Voice-only, research-only, preview, and feature entries are excluded.

## Explicitly missing-lab ledger

- **Amazon** — checked [AWS What's New](https://aws.amazon.com/new/) and [Amazon Science RSS](https://www.amazon.science/index.rss). No qualifying in-window base or specialized coding/agentic model; remains missing.
- **Cohere** — checked [blog](https://cohere.com/blog), [release notes](https://docs.cohere.com/v2/changelog), and [Hugging Face](https://huggingface.co/CohereLabs). Embed 5 on 2026-09-30 is an embedding family and is excluded; North Small Translate is translation-focused and outside the window. No add; remains missing.
- **StepFun** — checked [official site](https://www.stepfun.com/) and [Hugging Face](https://huggingface.co/stepfun-ai). No qualifying in-window release; remains missing.
- **AI21 Labs** — checked [blog](https://www.ai21.com/blog) and [Studio redirect](https://studio.ai21.com/). No qualifying in-window programming/agentic base release; remains missing.

## Provider checklist/configuration change

The continued working-tree refresh adds six newly discovered qualifying lab source sets to `scripts/provider-release-sources.json` and covers them with the provider checklist: Inception, IBM Granite, LongCat, Thinking Machines, Arcee AI, and Celeris. The checklist test asserts the full configured provider count and emits every configured provider and missing lab exactly once. No additional provider outside this expanded set was discovered during the 2026-09-30 sweep.

The ledger uses canonical/final URLs for readability where configured URLs redirected, but the exact configured `primarySources` list was read from the config and each of its 86 unique URLs was requested in the direct surface pass. That pass returned 79 HTTP 200 responses, six HTTP 403 responses, and one HTTP 404 response; the non-200 cases are reflected in the provider evidence limits above or are documented archive/catalog limitations.

## Benchmark and provenance audit

- Retrieval date for live benchmark checks: **2026-09-30**; earlier mirror values explicitly retain their 2026-09-29 retrieval date in the dataset notes.
- The live [Artificial Analysis model leaderboard](https://artificialanalysis.ai/leaderboards/models) was fetched successfully. Its visible default page is the Intelligence Index; its embedded release catalog exposed the in-window rows `Claude Sonnet 5.5` (2026-09-28) and `GPT-6.1 Sol` (2026-09-29). The release catalog is discovery/release evidence, not a Coding Index score.
- The exact AA [GPT-6.1 Sol model page](https://artificialanalysis.ai/models/gpt-6-1-sol) was fetched successfully and showed the max configuration, release September 2026, Intelligence Index 52, and no Coding Index field. Exact xhigh/high/medium/low rows were also visible on the leaderboard. The repository stores only the separate Intelligence Index value and leaves `codingIndex` null.
- The [Easy Benchmarks GPT-6.1 Sol snapshot](https://easy-benchmarks.com/models/gpt-6-1-sol) was fetched successfully on 2026-09-30 and explicitly showed Coding `n/a`. It was not used to invent a score.
- LongCat 2.0 and Granite 4.2 scores use exact no-effort-suffix Coding Index values from the dated Easy Benchmarks snapshots named in the row notes. For these four mirror-derived rows, `scoreSourceUrl` points to the exact Easy Benchmarks evidence page, `scoreSourceType` is `secondary-mirror`, `scoreConfiguration` is `no effort suffix`, and `scoreAuthorityUrl` retains the authoritative AA model URL. No mirror value is described as directly fetched from AA.
- No sibling, family, effort, API alias, or other benchmark score was copied to an unknown row. No existing HEAD coding score was overwritten.

## Evidence limits and explicit skips

- Search results were sparse or empty for most targeted provider queries. The bounded pass was followed by direct official pages, feeds, registries, and exact pages rather than repeated broad searching.
- OpenAI news/index and xAI news were access-limited during the initial direct source sweep; OpenAI's official news page and GPT-6.1 Sol announcement were independently extracted through an alternate official retrieval path. xAI had no new candidate supported by the accessible developer docs, so no new row is claimed.
- IFM's configured pages returned HTTP 403. It remains an unresolved provider-surface limitation rather than a false “no releases” proof.
- Registry `lastModified`/`createdAt` values were used for discovery or explicitly marked fallback provenance only; they were not treated as public release dates when no maker availability semantics were present.
- Benchmark pages are dynamic and may change after this snapshot. This ledger records the retrieval date, exact effort/configuration, aliases checked, and why unknown values remain unknown.
- A bounded Node 22 HTTP smoke pass with redirect following and the refresh user-agent checked 167 unique dataset source/score URLs. One pass returned 156 HTTP 200 and 11 HTTP 403; a repeat observed 154 HTTP 200, one HTTP 400, and 12 HTTP 403 because OpenAI/IFM anti-bot and DeepSeek redirect behavior varied. The new GPT-6.1 Sol page was successfully extracted through the official page retrieval path, but direct Node HTTP status was not stable; this is recorded as an access-path limitation, not as stable direct HTTP verification.

## Expected refresh result

- **HEAD baseline:** 135 rows; newest date 2026-09-22.
- **Working-tree continuation plus this candidate:** 145 unique rows.
- **Newest tracked release:** 2026-09-29 (`GPT-6.1 Sol`).
- **Rows added relative to HEAD:** 10 (nine preserved from the related 2026-09-29 continuation and GPT-6.1 Sol from the 2026-09-30 sweep).
- **Coding scores added:** LongCat 2.0 (45.3), Granite 4.2 3B (17.5), Granite 4.2 8B (22.4), and Granite 4.2 30B (29.9), all exact no-effort-suffix mirror values with `secondary-mirror` provenance and separate authoritative AA model URLs.
- **Unknown Coding scores retained:** Trinity-Large-Thinking, Inkling, Celeris-1 Magnus, Mercury 2.5, Claude Sonnet 5.5, and GPT-6.1 Sol.
- **Separate Intelligence Index additions:** Claude Sonnet 5.5, the three Granite rows, Inkling, LongCat 2.0, Mercury 2.5, Trinity-Large-Thinking, and GPT-6.1 Sol are stored with the configurations documented above; none is used as Coding Index.
