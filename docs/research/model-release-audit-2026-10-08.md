# Model-release audit — 2026-10-08

## Research boundary and policy

- **Repository/branch:** `agentic-model-release-tracker`, `main` working tree, direct refresh to `origin/main` authorized; no worktree and no PR.
- **Baseline HEAD:** `c137662d5fb0043470c1e303c8bfcf8a1bcfdac7` (`feat(data): refresh model releases through 2026-10-05`, 2026-10-05).
- **Baseline dataset:** 147 rows; newest tracked `releaseDate` `2026-09-30`; latest data commit and newest release date are intentionally recorded separately.
- **Research window:** inclusive `2026-09-30` through `2026-10-08` in Europe/Amsterdam. The 2026-09-30 boundary was rechecked without duplicating the existing rows.
- **Cutoff/retrieval:** 2026-10-08, Europe/Amsterdam.
- **Checklist baseline:** `node scripts/check-provider-releases.mjs --markdown` was run before edits and emitted `since 2026-09-30`, covering 26 configured providers and 4 explicit missing labs. The reproducible command for this audit window is `node scripts/check-provider-releases.mjs --since 2026-09-30 --markdown`; after adding the 2026-10-07 row, the no-argument command intentionally derives a newer boundary.
- **Scope:** add only a base model line or a clearly distinct specialized-base line relevant to programming/agentic work. Exclude product features, integrations, preview-only releases/configurations, mini/nano/lite tiers, modality-only releases, quantizations, pure snapshots, aliases, and sibling/family score copying.
- **Score rule:** `codingIndex` is populated only from an exact Artificial Analysis Coding Index row/configuration. Intelligence Index, Agentic Index, Terminal-Bench, SWE-bench, FrontierCode, GDPval, maker scores, and other metrics are not substitutes. Unknown Coding Index values remain `null` with no `scoreSourceUrl`.

## Retrieval method and evidence limits

- One bounded primary search query per configured provider and missing lab was run from the generated checklist; repeated broad searches were not used.
- Every configured `primarySources` surface was fetched directly or inspected through the direct-page extractor. Search results were discovery leads only. The search backend reported Firecrawl failures and served keyless fallback results; those snippets are not used as release evidence.
- OpenAI, xAI, and IFM pages that returned 403 to the raw Node fetch were independently recovered through direct page extraction. Z.ai's configured blog URL returned 404; its configured release-notes page was checked instead. These limitations are retained rather than silently treated as stronger evidence.
- The live Artificial Analysis model leaderboard was fetched on 2026-10-08 (HTTP 200) and parsed for model families with catalog `releaseDate` in the window. Exact model pages for `claude-haiku-5-5`, `ling-3-1-flash`, and `mistral-large-4` were also fetched (HTTP 200). The exact pages exposed Intelligence Index content but no exact Coding Index field for these candidates.
- No existing Coding Index value was changed in this refresh; therefore no source-parity correction of historical Coding Index snapshots was required.

## Candidate ledger

| Candidate | Provider | Maker date/source | Scope/score evidence | Decision |
|---|---|---|---|---|
| Claude Haiku 5.5 | Anthropic | 2026-10-07; [official announcement](https://www.anthropic.com/claude-haiku-5-5), [model docs](https://platform.claude.com/docs/en/models/haiku-5-5/overview) | Base model explicitly positioned for subagent coding and browser use. AA model page `https://artificialanalysis.ai/models/claude-haiku-5-5`: Intelligence Index 43, `max`; no exact Coding Index field. Alias `claude-haiku-5-5`. | **Add** with `codingIndex: null`; exact Intelligence Index stored separately. |
| Ling 3.1 Flash | InclusionAI | Maker announcement 2026-09-30; existing [Ant Ling post](https://x.com/AntLingAGI/status/2105335205741596911) | AA catalog says 2026-10-01, but maker date controls. Existing row is retained; AA detail `https://artificialanalysis.ai/models/ling-3-1-flash` reports Intelligence Index 41/default and no Coding Index. | **Keep existing row; no duplicate.** |
| Mistral Large 4 Preview | Mistral | 2026-10-06; [official announcement](https://mistral.ai/news/mistral-large-4/) | Distinct coding/agentic model, but the maker explicitly labels the availability as a public preview and says weights arrive later in October. AA catalog calls it `Mistral Large 4 Preview`, Intelligence Index 38; no exact Coding Index. | **Skip** under the explicit preview-only rule. |
| GPT-6 and Intelligent UI for everyone | OpenAI | 2026-10-07; [official index entry](https://openai.com/index/gpt-6-for-everyone/) | Product/UI announcement, not a distinct new base-model line beyond the already tracked GPT-6 Sol/Luna family. | **Skip** as a product feature/family alias. |
| Step 5 Preview | StepFun (missing lab) | Official [StepFun homepage](https://www.stepfun.com/) checked 2026-10-08 | Homepage says open-source release is still in a countdown and labels the model Preview; not a released model in this cutoff. | **Skip/unresolved until release**; no row. |
| Embed 5 | Cohere (missing lab) | Official [Cohere release notes](https://docs.cohere.com/changelog/embed-v5) dated 2026-09-30 | Embedding family, including code retrieval, but not a base programming/agentic generation model. | **Skip** as embedding-only. |
| North Mini Code | Cohere (missing lab) | Artificial Analysis article discovery lead only; not accepted as maker evidence | `Mini` tier and secondary discovery lead; excluded by the mini-tier rule. | **Skip**; no provider-config change. |
| Solar Mini 4 | Upstage (outside checklist) | Artificial Analysis article discovery lead only; no qualifying maker source verified in this bounded run | New lab lead, but the candidate is explicitly a Mini tier and therefore out of scope. | **Skip**; lab is not added to the checklist because no qualifying release was found. |
| Qwen3.8-Max-0902 | Alibaba | QwenCloud model marketplace checked | Dated snapshot/upgrade of the existing Qwen3.8-Max family, not a new family release; pure snapshots are excluded. | **Skip**; no duplicate. |

## Provider and missing-lab coverage

The following official surfaces were checked for the inclusive window. “No qualifying candidate” means no verified in-scope release was found after applying the scope rules; it does not turn inaccessible or non-dated surfaces into fabricated negative evidence.

### Configured providers

- **OpenAI:** [news](https://openai.com/news/), [index](https://openai.com/index/), [API model docs](https://platform.openai.com/docs/models). The 2026-10-07 GPT-6/UI item is a product announcement; no new qualifying base line.
- **Anthropic:** [newsroom](https://www.anthropic.com/news), [model docs](https://docs.anthropic.com/en/docs/about-claude/models), and the exact Haiku announcement/docs. **Added Claude Haiku 5.5.**
- **Google:** [Gemini model archive](https://blog.google/innovation-and-ai/models-and-research/gemini-models/), [developer news](https://blog.google/innovation-and-ai/technology/developers-tools/), [Gemini API model docs](https://ai.google.dev/gemini-api/docs/models). No post-2026-09-30 qualifying release; Gemini 4 Argon remains the boundary row.
- **Meta:** [Hugging Face organization](https://huggingface.co/meta-models), [Meta AI blog](https://ai.meta.com/blog/). No qualifying post-cutoff model.
- **OpenBMB:** [Hugging Face](https://huggingface.co/OpenBMB), [GitHub organization](https://github.com/OpenBMB), [MiniCPM repository](https://github.com/OpenBMB/MiniCPM). No qualifying post-cutoff model.
- **Apodex:** [home](https://www.apodex.com/), [Apodex 1.1 post](https://www.apodex.com/blog/apodex-1.1-scaling-agentic-intelligence-for-complex-work), [API](https://www.apodex.com/api). The page's October update metadata is not a new model date; Apodex 1.1 remains 2026-08-24.
- **xAI:** [news](https://x.ai/news), [developer model docs](https://docs.x.ai/developers/models). News confirms Grok 4.7 on 2026-09-21 and no later model release; later posts are product/integration updates.
- **Cursor:** [blog](https://cursor.com/blog). The 2026-10-06 item is “Remote control for local agents,” a product feature; no Cursor model release.
- **Mistral:** [news](https://mistral.ai/news), [model overview](https://docs.mistral.ai/getting-started/models/models_overview/), and the exact [Mistral Large 4 post](https://mistral.ai/news/mistral-large-4/). Mistral Large 4 Preview is explicitly skipped.
- **Alibaba:** [Qwen blog](https://qwenlm.github.io/blog), [Qwen AI blog](https://qwen.ai/blog), [QwenCloud model marketplace](https://www.qwencloud.com/models). Qwen3.8-Max-0902 is a dated snapshot; no new qualifying family.
- **Tencent:** [UI-Mate](https://ui-mate.github.io/), [Hugging Face](https://huggingface.co/tencent), [GitHub](https://github.com/Tencent). No qualifying post-cutoff model.
- **DeepSeek:** [API news](https://api-docs.deepseek.com/news/), [transparency center](https://www.deepseek.com/en/transparency/). No qualifying post-cutoff model.
- **Moonshot.ai:** [platform changelog](https://platform.moonshot.ai/blog/posts/changelog), [company site](https://www.moonshot.ai/), [Kimi X account](https://x.com/Kimi_Moonshot). Current entries are changelog/serving updates; no new base line.
- **MiniMax:** [news](https://www.minimax.io/news), [research blog](https://www.minimax.io/blog). The model list still shows M3/M2.7/M2.5; no new qualifying LLM after the cutoff.
- **Z.ai:** configured [blog](https://z.ai/blog) returned 404; [release notes](https://docs.z.ai/release-notes/new-released) was checked as the official fallback. No qualifying post-cutoff GLM release.
- **Xiaomi:** [GitHub organization](https://github.com/XiaomiMiMo), [Hugging Face](https://huggingface.co/XiaomiMiMo), [MiMo-V2.6 page](https://mimo.xiaomi.com/mimo-v2-6). Recent repository activity is not a new qualifying model release.
- **NVIDIA:** [NVIDIA model catalog](https://build.nvidia.com/nvidia), [Hugging Face organization](https://huggingface.co/nvidia). Recent catalog entries are OCR/ASR/other service or maintenance entries; no qualifying new programming/agentic base line.
- **IFM:** [K2 Horizon](https://ifm.ai/k2/), [press release](https://ifm.ai/k2/press-release/), [docs](https://docs.ifm.ai/). The official release remains 2026-09-03 and is already tracked.
- **Agnes AI:** [home](https://agnes-ai.com/), [Agnes 3.0 Flash docs](https://www.agnes-ai.com/zh-Hans/docs/agnes-30-flash), [platform](https://platform.agnes-ai.com), [GitHub](https://github.com/AgnesAI-Labs). No qualifying post-cutoff model.
- **InclusionAI:** [Hugging Face organization](https://huggingface.co/inclusionAI), [Ling 3.0 Flash VL](https://huggingface.co/inclusionAI/Ling-3.0-flash-VL), [model page](https://www.inclusion-ai.org/model), [LLaDA-UI](https://www.inclusion-ai.org/LLaDA-UI/), [GitHub](https://github.com/inclusionAI), [Ant Ling X account](https://x.com/AntLingAGI). AA's 2026-10-01 catalog date for Ling 3.1 Flash does not supersede the maker's 2026-09-30 date; no duplicate.
- **Inception:** [home](https://inceptionlabs.ai/), [Mercury 2.5 announcement](https://inceptionlabs.ai/blog/introducing-mercury-2-5), [models](https://inceptionlabs.ai/models), [docs](https://docs.inceptionlabs.ai/get-started). Mercury 2.5 remains a 2026-09-08 release; October page metadata is not a new release.
- **IBM Granite:** [Granite 4.2 announcement](https://research.ibm.com/blog/introducing-granite-4-2), [IBM Granite](https://www.ibm.com/granite), [Hugging Face](https://huggingface.co/ibm-granite). Recent registry activity is not a new family release.
- **LongCat:** [home](https://longcat.ai/), [LongCat 2.0 post](https://longcat.ai/blog/longcat-2.0), [Hugging Face](https://huggingface.co/meituan-longcat), [GitHub](https://github.com/meituan-longcat). No qualifying post-cutoff model.
- **Thinking Machines:** [company site](https://thinkingmachines.ai/), [Inkling announcement](https://huggingface.co/blog/thinkingmachines-inkling), [Hugging Face](https://huggingface.co/thinkingmachines), [GitHub](https://github.com/thinking-machines-lab). October homepage updates do not announce a new model; Inkling remains 2026-07-15.
- **Arcee AI:** [home](https://arcee.ai/), [Trinity](https://arcee.ai/trinity), [Hugging Face](https://huggingface.co/arcee-ai), [model docs](https://docs.arcee.ai/get-started/models-overview). October docs updates do not announce a new qualifying model.
- **Celeris:** [home](https://celeris.ai/), [Celeris-1](https://celeris.ai/celeris-1), [Celeris-1 Magnus](https://celeris.ai/celeris-1-magnus), [blog](https://celeris.ai/blog). No post-cutoff release.

### Explicitly missing labs

- **Amazon:** [AWS What's New](https://aws.amazon.com/about-aws/whats-new/) and [Amazon Science RSS](https://www.amazon.science/index.rss). No qualifying Nova/base model release.
- **Cohere:** [blog](https://cohere.com/blog), [release notes](https://docs.cohere.com/changelog), [CohereLabs Hugging Face](https://huggingface.co/CohereLabs). Embed 5 is embedding-only; North Mini Code was only a secondary discovery lead and is a Mini tier.
- **StepFun:** [official homepage](https://www.stepfun.com/) and [Hugging Face](https://huggingface.co/stepfun-ai). Step 5 is still marked Preview with a future release countdown; no released row.
- **AI21 Labs:** [blog](https://www.ai21.com/blog) and [Studio](https://studio.ai21.com/). No qualifying post-cutoff model release.

## Score and alias record

- **Added row:** Claude Haiku 5.5 — exact Artificial Analysis model URL `https://artificialanalysis.ai/models/claude-haiku-5-5`, Intelligence Index `43`, configuration `max`, retrieved 2026-10-08. No exact Artificial Analysis Coding Index field was fetched; `codingIndex` stays `null`.
- **Alias:** Anthropic API `claude-haiku-5-5` is retained in the row's `aliases` field; it is not a separate release.
- **Existing overlap:** Ling 3.1 Flash aliases remain `Ling-3.1-flash`, `ling-3-1-flash`, and `inclusionai/ling-3.1-flash`; AA catalog release date `2026-10-01` is a dated benchmark/catalog fact, not the maker availability date.
- **Skipped benchmark candidate:** Mistral Large 4 Preview has exact AA model URL `https://artificialanalysis.ai/models/mistral-large-4`, Intelligence Index `38`, and catalog release date `2026-10-06`, but it is maker-labeled public preview and therefore not stored.
- No Coding Index, Intelligence Index, provider aggregate, or historical score was overwritten for an existing row.

## Verified refresh result

- One intended dataset addition: `Claude Haiku 5.5`; final dataset is 148 rows with 148 unique model names and newest `releaseDate` `2026-10-07`.
- One cache-key refresh: `20261008a` in `index.html` and both module imports in `src/app.js`.
- One dated audit artifact: this file.
- Provider source configuration remains unchanged: all newly discovered in-window candidates were either already covered by an existing provider surface or excluded by scope; no new qualifying lab required a new checklist object.
- `npm test`: **99 passed, 0 failed**. `git diff --check`: **passed**.
- Dataset invariant script: **passed**; provider checklist: **30 expected headings, 30 emitted, no duplicates/missing names**.
- Bounded source smoke: **200 unique URLs checked; 184 returned 2xx and 16 returned known pre-existing 403/404 responses**. The new Anthropic source, exact AA model URL, and AA leaderboard all returned HTTP 200. The 16 non-2xx results are retained as evidence limits for older/inaccessible URLs, not treated as new-row blockers.
- Independent critical review and bounded follow-up review: **PASS**, no critical or important findings. The follow-up confirmed the explicit `--since 2026-09-30` checklist reproduction command.
- Evidence is intentionally conservative: direct source evidence is distinguished from benchmark/catalog discovery, and all non-Coding metrics remain out of `codingIndex`.

## 2026-10-09 correction and supersession

The following statements in this 2026-10-08 audit are superseded by the 2026-10-09 audit and its verification command:

- Step 5 Preview was available through the maker's products/API during the prior window. The earlier wording that it was "not a released model" was inaccurate. It remains intentionally skipped because the refresh job's explicit policy excludes all preview-only releases/configurations, while its open-weight release was announced for 2026-10-15.
- The prior-run URL-smoke totals and independent-review `PASS` were transient run summaries, not persisted verification output. They must not be treated as independent proof. The durable command `node scripts/verify-model-refresh.mjs --cutoff=2026-10-09 --http`, its output, and the fresh review gate are recorded in `model-release-audit-2026-10-09.md`.
- The retained 2026-10-08 research decisions remain the historical snapshot; the 2026-10-09 audit is the authoritative correction for these evidence and wording claims.
