# Model-release audit — 2026-10-18

## Baseline, window, and policy

- **Repository/branch:** `agentic-model-release-tracker`, `main` working tree; direct publication to `origin/main` is explicitly authorized. No worktree and no PR.
- **Remote:** `origin` → `https://github.com/jgordijn/agentic-model-release-tracker.git`.
- **HEAD / `origin/main` before this refresh:** `86b9c2fbb1e60acffb3d058145a1e36e009de06f` — `feat(data): refresh model releases through 2026-10-16` (`2026-10-16T05:25:18Z`). This is also the last commit changing the dataset before this refresh.
- **Working-tree baseline:** 154 rows, 154 unique model names; newest tracked `releaseDate` `2026-10-15` (`Muse Spark Open`, `Nemotron 3.5 Super VL`, and `Nemotron 3.5 Bolt 74B-A9B`). The only pre-existing working-tree change was the untracked `screenshots/baseline-local.png`; it was left untouched. No unrelated tracked changes were present.
- **Research cutoff:** `2026-10-18T07:07:29+02:00` in `Europe/Amsterdam` (`2026-10-18T05:07:29Z`).
- **Effective research window:** inclusive `2026-10-15` through `2026-10-18`. The `2026-10-15` boundary was rechecked without duplicating the three existing rows. One qualifying model was verified at the boundary (`Hy-Memory 30B-A3B`); one was verified on October 16 (`Dory 1.0 4B`). No qualifying maker release dated October 17–18 was verified.
- **Scope:** add only maker-released base model lines or clearly differentiated specialized-base lines relevant to programming or agentic work. Exclude product features, provider integrations, modality-only releases, quantizations, pure snapshots/checkpoints, API aliases, mini/nano/lite tiers, and preview-only configurations. Multiple deployment formats for one named family are one row.
- **Score rule:** `codingIndex` is populated only from an exact Artificial Analysis Coding Index row for the exact model/configuration. Intelligence Index, Agentic Index, Terminal-Bench, SWE-bench, SciCode, GDPval, maker scores, and other metrics are not substitutes. Unknown exact Coding Index values remain `null` without `scoreSourceUrl`. The separate `intelligenceIndex` field remains metric-specific.

## Required checklist and bounded retrieval

- The required pre-research command was run before edits: `node scripts/check-provider-releases.mjs --markdown`. It derived `since 2026-10-15` from the baseline dataset and emitted 26 configured providers plus 4 explicit missing labs.
- One bounded discovery query was run for each configured provider and each explicit missing lab: 30 provider/lab queries total. Search results were used only as discovery leads; no second broad search sweep was run.
- A direct primary-surface pass fetched the 96 URLs in the pre-refresh provider configuration. The pass returned 89 2xx responses, 7 known non-2xx responses, and no network failures. The newly discovered exact Tencent and NVIDIA model surfaces were then fetched separately: the Hy-Memory Hugging Face card, Tencent Hy-Memory GitHub repository, and NVIDIA Dory BF16 card all returned usable official content.
- The provider configuration now registers the exact Hy-Memory and Dory model surfaces and targeted queries for future sweeps. The provider count remains 26 and the explicit missing-lab list remains unchanged.
- Artificial Analysis's live model leaderboard was fetched directly (`HTTP 200`). It contained no `Dory` or `Hy-Memory` match. Candidate exact model URLs `https://artificialanalysis.ai/models/nemotron-labs-dory1-0-4b` and `https://artificialanalysis.ai/models/hy-memory-30b-a3b` returned `404`; neither row therefore received a Coding Index or Intelligence Index value.
- No mirror-derived Coding Index value, user screenshot, or undated cache was used in this refresh. NVIDIA's internal `AA v4.3.2` estimates in the Dory card were not treated as Artificial Analysis Coding Index evidence.

## Candidate ledger

| Candidate | Provider | Maker/public date | Decision | Evidence and reason |
|---|---|---:|---|---|
| Hy-Memory 30B-A3B | Tencent | 2026-10-15 | **Add** | The official [Hugging Face model card](https://huggingface.co/tencent/Hy-Memory-30B-A3B) describes a distinct long-term-memory writer model that directly covers Chat, Working, and Coding scenarios. The official [Hy-Memory repository](https://github.com/Tencent-Hunyuan/Hy-Memory) documents the agent memory system and coding scene. The paper was submitted on October 15 and the official HF registry createdAt marker is `2026-10-15T09:52:00Z`; no separate dated maker announcement was found, so this is explicit fallback provenance. FP8 is packaging, not a second row. Exact AA Coding Index row: not found; `codingIndex` remains `null`. |
| Dory1.0-4B | NVIDIA | 2026-10-16 | **Add** | NVIDIA's official [BF16 model card](https://huggingface.co/nvidia/NVIDIA-Nemotron-Labs-Dory1.0-4B-BF16) states release date October 16, 2026 and documents general-purpose reasoning plus explicit Coding & Agentic evaluations. BF16/MXFP8/NVFP4/Q5_K_M are formats for one named family. Exact AA Coding Index row: not found; maker benchmarks and internal AA estimates are not substitutes. |
| NVIDIA Dory packaging variants | NVIDIA | 2026-10-16 | **Skip duplicate** | MXFP8, NVFP4, Q5_K_M, and related cards are deployment formats for Dory1.0-4B, not separate model releases. |
| Tencent Qwen3-8B-DSpine-b16 | Tencent | 2026-10-16 | **Skip** | The official HF organization lists a DSpine variant/checkpoint. It is a modified/snapshot artifact rather than a new named base family under the dashboard's snapshot/variant rule. |
| OpenBMB MiniCPM-V 4.7 | OpenBMB | 2026-10-06/07 | **Skip** | The official [model card](https://huggingface.co/openbmb/MiniCPM-V-4.7-35B-A3B) describes a vision-language on-device model and the registry date is before the window. It is not a new in-window programming/agentic base line; packaging and visual variants are excluded. |
| Agnes-Video-2.0-MoE | Agnes AI | 2026-10-11 | **Skip** | The official [model card](https://huggingface.co/Agnes-AI/Agnes-Video-2.0-MoE) identifies an audio-video generation model. It is modality-only and outside the window. |
| IBM Granite Switch 4.1 | IBM Granite | 2026-10-14 | **Skip** | The official HF model inventory and [Granite organization page](https://huggingface.co/ibm-granite) show the release before the inclusive October 15 boundary; it is not a new in-window row. |
| Cohere North 2 | Cohere | current platform page | **Skip** | [Cohere's North 2 page](https://cohere.com/blog/introducing-north-2) describes an enterprise platform update with new features, not a base model line. |
| Cohere Embed 5 / North Small Translate | Cohere | 2026-09-30/09 | **Skip** | The [release notes](https://docs.cohere.com/changelog) describe embedding and translation model families, both outside the programming/agentic base-model scope. |
| Amazon Priming hybrid model zoo | Amazon | 2026-10-12 | **Skip** | The [Amazon Science RSS](https://www.amazon.science/index.rss) exposes a research article/model zoo outside the window; it is not a named Amazon Nova base model line. |
| Step-5-Preview | StepFun | current HF activity | **Skip** | The official [StepFun homepage](https://www.stepfun.com/) and [HF organization](https://huggingface.co/stepfun-ai) label the model Preview. Preview-only releases are explicitly excluded. |
| Google Gemma 4 | Google | 2026-04-02 | **Skip** | The official [Google announcement](https://blog.google/innovation-and-ai/technology/developers-tools/gemma-4/) is outside the window; no new in-window Google model was verified. |
| Mistral Large 4 | Mistral | 2026-10-06 | **Skip** | The official [Mistral announcement](https://www.mistral.ai/news/mistral-large-4/) is outside the window and explicitly a public preview. Its coding/agentic claims are not AA Coding Index evidence. |
| Cursor Cloud Agent Canvases | Cursor | 2026-10-16 | **Skip** | The [Cursor blog](https://cursor.com/blog) entry is a cloud-agent/product capability update, not a new model line. |
| OpenAI GPT-6 Intelligent UI | OpenAI | 2026-10-07 | **Skip** | The official [OpenAI article](https://openai.com/index/gpt-6-for-everyone/) describes a ChatGPT product/interface release and explicitly says Work and Codex models are not changing. |
| xAI Grok Voice 3.0 | xAI | 2026-10-14 | **Skip** | The official [xAI archive](https://x.ai/news) lists a voice-only model before the window; voice/image/video products are excluded. |
| Meta Muse Wonder / Muse Wonder Full | Meta | 2026-10-12 | **Keep existing** | The official [Meta announcement](https://research.meta.ai/blog/muse-wonder) and current [Meta AI page](https://www.meta.com/ai/) were rechecked; both rows already exist and were not duplicated. |
| InclusionAI Ling 3.1 weights | InclusionAI | 2026-10-15 activity | **Skip duplicate** | The official [HF organization](https://huggingface.co/inclusionAI) shows existing Ling 3.1 weights and dataset activity; this is not a new family beyond the existing September 30 row. |
| LongCat-DeepResearch | LongCat | current HF activity | **Skip** | The official [LongCat organization](https://huggingface.co/meituan-longcat) describes a research system/harness; it is not a new general programming/agentic base line. |
| Celeris-1 Decision | Celeris | 2026-10-08 | **Skip** | The official [Celeris blog](https://celeris.ai/blog) lists a decision-specialized model before the window; it is not a new programming/agentic base line. |
| All other candidates | All remaining configured providers and missing labs | — | **No additional qualifying row verified** | Each provider/lab received one bounded discovery query plus a direct check of its configured official surfaces. Missing current leaderboard entries were not interpreted as deletion, age, or score decisions. Evidence limits are recorded below. |

## Added rows and exact metric provenance

### Hy-Memory 30B-A3B

- **Canonical display name:** `Hy-Memory 30B-A3B`; aliases checked: `Hy-Memory-30B-A3B`, `tencent/Hy-Memory-30B-A3B`, and the served name `hy-memory`.
- **Maker source:** [Tencent Hunyuan Hugging Face model card](https://huggingface.co/tencent/Hy-Memory-30B-A3B).
- **Supporting official source:** [Tencent Hunyuan Hy-Memory repository](https://github.com/Tencent-Hunyuan/Hy-Memory); [arXiv paper](https://arxiv.org/abs/2610.22196), submitted October 15, 2026.
- **Date provenance:** HF API `createdAt` `2026-10-15T09:52:00Z` is used as the public-availability fallback because the model card and repository do not provide a separate day-level launch announcement. The later `Hy-Memory-30B-A3B-FP8` upload is packaging for the same family.
- **Scope evidence:** the model card explicitly says the writer operates in Chat, Working, and Coding scenarios; the repository has a Working/Coding scene guide. This is a distinct specialized model line, not merely the memory harness.
- **Artificial Analysis:** candidate model URL returned `404`; the live leaderboard had no Hy-Memory row. No exact Coding Index or Intelligence Index value was stored.
- **Stored values:** `codingIndex: null`; `releaseCategory: "specialized-base"`; no `scoreSourceUrl`.

### Dory 1.0 4B

- **Canonical display name:** `Dory 1.0 4B`; aliases checked: `Dory1.0-4B`, `NVIDIA-Nemotron-Labs-Dory1.0-4B-BF16`, and `nvidia/NVIDIA-Nemotron-Labs-Dory1.0-4B-BF16`.
- **Maker source:** [NVIDIA Nemotron Labs Dory1.0-4B BF16 model card](https://huggingface.co/nvidia/NVIDIA-Nemotron-Labs-Dory1.0-4B-BF16), which explicitly states `Release Date: October 16, 2026`.
- **Scope evidence:** NVIDIA describes a general-purpose reasoning LLM and includes a Coding & Agentic section with tool-oriented benchmark results. This is a base model line, not a quantization-only row.
- **Format reconciliation:** BF16, MXFP8, NVFP4, and Q5_K_M are formats for the same 4B family; no sibling row is added.
- **Artificial Analysis:** candidate model URL returned `404`; the live leaderboard had no Dory row. The card's internal AA v4.3.2 estimates and its SWE-bench, Terminal-Bench, SciCode, GDPval, and other metrics are not exact Artificial Analysis Coding Index values.
- **Stored values:** `codingIndex: null`; no `scoreSourceUrl`; `intelligenceIndex: null`.

No mirror-derived Coding Index values were used. No sibling score was copied to either new row.

## Configured-provider coverage

Every configured provider was checked against its configured official surfaces and one bounded discovery path for the inclusive window. The configured inventory after this refresh includes the three new exact surfaces registered for Tencent/NVIDIA.

- **OpenAI:** checked [news](https://openai.com/news/), [index](https://openai.com/index/), and [API models](https://platform.openai.com/docs/models). Current surfaces showed product/safety material and existing GPT-6 references; no new qualifying model after October 15.
- **Anthropic:** checked [newsroom](https://www.anthropic.com/news) and [model docs](https://docs.anthropic.com/en/docs/about-claude/models). Haiku 5.5 remains the latest tracked qualifying release; later cyber/policy items are not models.
- **Google:** checked [Gemini archive](https://blog.google/innovation-and-ai/models-and-research/gemini-models/), [developer news](https://blog.google/innovation-and-ai/technology/developers-tools/), and [API model catalog](https://ai.google.dev/gemini-api/docs/models). Gemma 4 is April 2 and Gemini 4 Argon is already tracked; no new in-window qualifying line.
- **Meta:** checked [HF organization](https://huggingface.co/meta-models), [Meta AI](https://www.meta.com/ai/), [Muse Wonder announcement](https://research.meta.ai/blog/muse-wonder), [developer catalog](https://developer.meta.com/ai/), and [Muse Spark Open page](https://dev.meta.ai/models/muse-spark-open). No new model after the existing October 15 Muse Spark Open row.
- **OpenBMB:** checked [HF organization](https://huggingface.co/OpenBMB), [GitHub organization](https://github.com/OpenBMB), and [MiniCPM repository](https://github.com/OpenBMB/MiniCPM). MiniCPM-V 4.7 is pre-window and vision-focused; no new qualifying family.
- **Apodex:** checked [home](https://www.apodex.com/), [1.1 announcement](https://www.apodex.com/blog/apodex-1.1-scaling-agentic-intelligence-for-complex-work), and [API](https://www.apodex.com/api). Apodex 1.1 remains August 24; no new model.
- **xAI:** checked [news](https://x.ai/news) and [developer models](https://docs.x.ai/developers/models). Grok 4.7 remains current; post-boundary archive items are voice/product material.
- **Cursor:** checked [Cursor blog](https://cursor.com/blog). The October 16 item is Cloud Agent product functionality, not a model release.
- **Mistral:** checked [news](https://www.mistral.ai/news) and [model overview](https://docs.mistral.ai/getting-started/models/models_overview/). Mistral Large 4 is an October 6 public preview, outside the window; no new release.
- **Alibaba:** checked [legacy Qwen blog](https://qwenlm.github.io/blog), [Qwen blog](https://qwen.ai/blog), and [QwenCloud models](https://www.qwencloud.com/models). Qwen3.8-Max-0902 is an upgraded snapshot of an existing family; no new family.
- **Tencent:** checked [UI-Mate](https://ui-mate.github.io/), [HF organization](https://huggingface.co/tencent), [GitHub organization](https://github.com/Tencent), [Hy-Memory model card](https://huggingface.co/tencent/Hy-Memory-30B-A3B), and [Hy-Memory repository](https://github.com/Tencent-Hunyuan/Hy-Memory). **Added Hy-Memory 30B-A3B.** DSpine is a variant/checkpoint and was excluded.
- **DeepSeek:** checked [API news](https://api-docs.deepseek.com/news/) and [transparency center](https://www.deepseek.com/en/transparency/). The news path currently resolves to a not-found docs page; no post-boundary model was verified through the configured sources.
- **Moonshot.ai:** checked [platform changelog](https://platform.moonshot.ai/blog/posts/changelog), [company site](https://www.moonshot.ai/), and [Kimi account](https://x.com/Kimi_Moonshot). No new Kimi line.
- **MiniMax:** checked [news](https://www.minimax.io/news), [blog](https://www.minimax.io/blog), and current [M3 model page](https://www.minimax.io/models/text/m3). M3 is already tracked from its earlier release; no new in-window family.
- **Z.ai:** checked [blog](https://z.ai/blog) and [release notes](https://docs.z.ai/release-notes/new-released). The blog returns 404 and release notes stop at August 26; no new model verified.
- **Xiaomi:** checked [GitHub organization](https://github.com/XiaomiMiMo), [HF organization](https://huggingface.co/XiaomiMiMo), and [MiMo-V2.6](https://mimo.xiaomi.com/mimo-v2-6). Later activity is existing-family code or snapshot/variant work; the model page was not extractable.
- **NVIDIA:** checked [Build catalog](https://build.nvidia.com/nvidia), [HF organization](https://huggingface.co/nvidia), [Nemotron developer page](https://developer.nvidia.com/nemotron), existing October 15 BF16 cards, and the new [Dory BF16 card](https://huggingface.co/nvidia/NVIDIA-Nemotron-Labs-Dory1.0-4B-BF16). **Added Dory 1.0 4B.** Formats were not added as separate rows.
- **IFM:** checked [K2 home](https://ifm.ai/k2/), [press release](https://ifm.ai/k2/press-release/), and [docs](https://docs.ifm.ai/). No new release verified; any access limitations are not treated as proof of absence.
- **Agnes AI:** checked [home](https://agnes-ai.com/), [docs](https://www.agnes-ai.com/zh-Hans/docs/agnes-30-flash), [platform](https://platform.agnes-ai.com), [GitHub](https://github.com/AgnesAI-Labs), [HF organization](https://huggingface.co/Agnes-AI), and recent model cards. Video 2.0 is modality-only and pre-window; no new qualifying model.
- **InclusionAI:** checked [HF organization](https://huggingface.co/inclusionAI), [model catalog](https://www.inclusion-ai.org/model), [LLaDA-UI](https://www.inclusion-ai.org/LLaDA-UI/), [GitHub](https://github.com/inclusionAI), and [Ant Ling](https://x.com/AntLingAGI). Recent dataset/LemonDecider activity is not a qualifying base model; no new family.
- **Inception:** checked [home](https://inceptionlabs.ai/), [Mercury 2.5 announcement](https://inceptionlabs.ai/blog/introducing-mercury-2-5), [models](https://inceptionlabs.ai/models), and [docs](https://docs.inceptionlabs.ai/get-started). Mercury 2.5 remains September 8; no new model.
- **IBM Granite:** checked [Granite 4.2 announcement](https://research.ibm.com/blog/introducing-granite-4-2), [Granite site](https://www.ibm.com/granite), and [HF organization](https://huggingface.co/ibm-granite). Granite Switch 4.1 is pre-window/platform-oriented; no new qualifying line.
- **LongCat:** checked [home](https://longcat.ai/), [LongCat 2.0](https://longcat.ai/blog/longcat-2.0), [HF organization](https://huggingface.co/meituan-longcat), and [GitHub](https://github.com/meituan-longcat). LongCat-DeepResearch is a research/harness system; no new base line.
- **Thinking Machines:** checked [company site](https://thinkingmachines.ai/), [Inkling article](https://huggingface.co/blog/thinkingmachines-inkling), [HF organization](https://huggingface.co/thinkingmachines), and [GitHub](https://github.com/thinking-machines-lab). No new model.
- **Arcee AI:** checked [home](https://arcee.ai/), [Trinity](https://arcee.ai/trinity), [HF organization](https://huggingface.co/arcee-ai), and [model docs](https://docs.arcee.ai/get-started/models-overview). No new Trinity line.
- **Celeris:** checked [home](https://celeris.ai/), [Celeris-1](https://celeris.ai/celeris-1), [Magnus](https://celeris.ai/celeris-1-magnus), and [blog](https://celeris.ai/blog). The October 8 Decision model is pre-window and decision-specialized; no addition.

## Explicitly missing-lab coverage

- **Amazon:** checked [AWS What's New](https://aws.amazon.com/about-aws/whats-new/) and [Amazon Science RSS](https://www.amazon.science/index.rss). RSS was current through October 12; no in-window Nova or other qualifying base model.
- **Cohere:** checked [blog](https://cohere.com/blog), [North 2 announcement](https://cohere.com/blog/introducing-north-2), [release notes](https://docs.cohere.com/changelog), and [HF organization](https://huggingface.co/CohereLabs). North 2 is a platform update; Embed 5/translation/speech/document models are out of scope. No addition.
- **StepFun:** checked [homepage](https://www.stepfun.com/) and [HF organization](https://huggingface.co/stepfun-ai). Step-5-Preview remains explicitly preview-only; no addition.
- **AI21 Labs:** checked [blog](https://www.ai21.com/blog) and [Studio](https://studio.ai21.com/). The configured surfaces were anti-bot limited and the bounded discovery query returned no verified new Jamba/base model; this remains an evidence limit, not an absence proof.

## Evidence limits and source-parity record

- The bounded search backend returned empty results for most provider-specific queries; it was not repeated broadly. Direct official pages, HF registries, GitHub pages, RSS, and exact model cards were used for follow-up discovery.
- Some configured surfaces are dynamic, blocked, or stale: DeepSeek's configured news URL returns a not-found docs page; Z.ai's blog returns 404; the Xiaomi model page was not extractable; AI21's blog/Studio were anti-bot limited; IFM surfaces may be access-limited. These are recorded limits, not negative release proofs.
- Artificial Analysis was used for exact metric discovery only. Both added candidates were absent from the live leaderboard and their candidate model pages returned 404. No score was inferred from maker benchmarks, internal AA estimates, memory metrics, or other Coding-like metrics.
- No mirror-derived Coding Index values, user screenshots, or undated cached values were used.

## Result and final verification

- **Rows added:** 2 — `Hy-Memory 30B-A3B`, `Dory 1.0 4B`.
- **Provider checklist change:** Tencent gained the official Hy-Memory model/repository surfaces and targeted queries; NVIDIA gained the official Dory BF16 model surface and targeted query. No new provider object was needed.
- **Expected final dataset:** 156 rows, 156 unique model names; newest maker `releaseDate` `2026-10-16`.
- **Cache key:** `20261018a` in `index.html`, `src/app.js` model-data import, and `src/app.js` dashboard-logic import.
- **Intelligence scores added separately:** none; both exact AA model candidates are absent.
- **Coding scores added:** none; both exact AA Coding Index values remain unknown.
- **Initial verification after edits:** `npm test` — 103 passed, 0 failed; `git diff --check` passed; `node scripts/verify-model-refresh.mjs --cutoff=2026-10-18` — 156 rows, 156 unique models, newest `2026-10-16`, 26 configured providers, 4 missing labs, 30 checklist headings, 289 URL union, no invariant errors.
- **Bounded HTTP smoke/source check:** `node scripts/verify-model-refresh.mjs --cutoff=2026-10-18 --http` checked **289 URLs; 268 returned 2xx and 21 returned known/non-2xx limitations; no invariant errors**. The limitations were the existing OpenAI/xAI/IFM access blocks, the existing Agnes 3.0 Flash AA 404, and the existing Z.ai blog 404. The newly added Tencent/NVIDIA maker URLs and all exact row source URLs returned 2xx.
- **First read-only critical review:** an independent fresh-context reviewer found no data, scope, provenance, score, provider-config, cache-key, or test defect. It initially marked the ledger **FAIL** only because this final verification section ended with a dangling promise rather than recording the HTTP result and review status.
- **Review finding fixed:** the ledger now records the bounded HTTP result and the review limitation explicitly; no code/data change was required for the finding.
- **Follow-up read-only critical review:** **PASS** in a fresh context after the ledger correction; no critical, important, or minor findings remained. The reviewer rechecked the full diff, both new rows, exact source/score provenance, provider configuration, cache key, tests, URL smoke, and tracked/untracked scope.
- Commit, push, GitHub Actions, and live Pages results will be reported in the cron output; the audit artifact is complete for the research and pre-publication gate.
