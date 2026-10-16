# Model-release audit — 2026-10-16

## Baseline, window, and policy

- **Repository/branch:** `agentic-model-release-tracker`, `main` working tree; direct publication to `origin/main` is explicitly authorized. No worktree and no PR.
- **Remote:** `origin` → `https://github.com/jgordijn/agentic-model-release-tracker.git`.
- **HEAD / `origin/main` before this refresh:** `d1ba966678b5c5d1722e94f5b0da4c3815af8e2d` — `feat(data): refresh model releases through 2026-10-15` (`2026-10-15T05:15:48Z`). This is also the last commit changing the dataset.
- **Working-tree baseline:** 151 rows, 151 unique model names; newest tracked `releaseDate` `2026-10-12` (`Muse Wonder` and `Muse Wonder Full`). The only pre-existing working-tree change was the untracked `screenshots/baseline-local.png`; it was left untouched. No unrelated tracked changes were present.
- **Research cutoff:** `2026-10-16T07:05:07+02:00` in `Europe/Amsterdam` (`2026-10-16T05:05:07Z`).
- **Effective research window:** inclusive `2026-10-12` through `2026-10-16`. The `2026-10-12` boundary was rechecked without duplicating the two existing Muse Wonder rows. No qualifying maker release dated October 16 was verified; the newest qualifying rows are dated October 15.
- **Scope:** add only maker-released base model lines or clearly differentiated specialized-base lines relevant to programming or agentic work. Exclude product features, provider integrations, modality-only releases, quantizations, pure snapshots/checkpoints, API aliases, mini/nano/lite tiers, and preview-only configurations. A named model family is retained once when its official packaging has multiple deployment artifacts; those artifacts are not separate rows.
- **Score rule:** `codingIndex` is populated only from an exact Artificial Analysis Coding Index row for the exact model/configuration. Intelligence Index, Agentic Index, Terminal-Bench, SWE-bench, DeepSWE, maker scores, and other metrics are not substitutes. Unknown exact Coding Index values remain `null` without `scoreSourceUrl`. The separate `intelligenceIndex` field remains metric-specific.

## Required checklist and bounded retrieval

- The required pre-research command was run before edits: `node scripts/check-provider-releases.mjs --markdown`. It derived `since 2026-10-12` from the baseline dataset and emitted 26 configured providers plus 4 explicit missing labs.
- One bounded discovery query was run for each of the 26 configured providers and 4 explicit missing labs: 30 provider/lab queries total. Search snippets were used only as discovery leads. Empty/repeated results were not turned into a second broad sweep.
- The initial bounded pass fetched all 93 configured primary-source URLs: 86 returned 2xx; 6 returned 403 (OpenAI news/index, xAI news, and the three IFM surfaces); 1 returned 404 (Z.ai blog). The three exact Meta/NVIDIA model pages added to the recurring source inventory were separately targeted and returned HTTP 200 before the later transient DNS outage. The blocked or missing surfaces are recorded as evidence limits, not as proof that no release exists.
- The live Artificial Analysis model leaderboard was fetched directly at `https://artificialanalysis.ai/leaderboards/models` (HTTP 200, 2,483,187 bytes in the final targeted check). Its embedded catalog exposed the October 15 Meta and NVIDIA families. Primary maker/model-card evidence, not the AA catalog date, controls the stored `releaseDate`.
- Exact AA model pages were fetched directly for all three added rows (HTTP 200). They exposed Intelligence Index values/configurations but no exact Coding Index field. The exact AA pages and the live leaderboard were therefore used for metric/alias/configuration verification, not as maker release sources.
- No mirror-derived Coding Index value, user screenshot, or undated cache was used in this refresh.

## Candidate ledger

| Candidate | Provider | Maker date | Decision | Evidence and reason |
|---|---|---:|---|---|
| Muse Spark Open | Meta | 2026-10-15 | **Add** | [Meta developer model page](https://dev.meta.ai/models/muse-spark-open) describes coding, multimodal perception, and end-to-end agentic workflows. The official [Hugging Face model card](https://huggingface.co/meta-models/Muse-Spark-Open-816B-A42B) dates the named model October 15, 2026 and calls out coding agents, tool use, and long-horizon task completion. BF16/NVFP4 files are packaging for this named model, not separate releases. Exact AA row: `Muse Spark Open (xhigh)`, Intelligence Index 39; no exact Coding Index field. |
| Nemotron 3.5 Super VL | NVIDIA | 2026-10-15 | **Add** | NVIDIA's official [BF16 model card](https://huggingface.co/nvidia/NVIDIA-Nemotron-3.5-Super-VL-120B-A12B-BF16) dates the full-precision family release October 15, 2026 and describes coding, tool use, reasoning, and multimodal agent workflows. The NVFP4 page is a quantized deployment package and is not tracked separately. Exact AA row: `Nemotron 3.5 Super VL`, no effort suffix, Intelligence Index 26; no exact Coding Index field. |
| Nemotron 3.5 Bolt 74B-A9B | NVIDIA | 2026-10-15 | **Add** | NVIDIA's official [BF16 model card](https://huggingface.co/nvidia/NVIDIA-Nemotron-3.5-Bolt-74B-A9B-BF16) dates the distinct compressed/post-trained model October 15, 2026 and documents local agentic tasks, tool calling, browsing, terminal use, and coding languages. The 24GB IQ2, GGUF, and LiLiCorr artifacts are deployment packaging, not separate rows. Exact AA row: no effort suffix, Intelligence Index 21; no exact Coding Index field. |
| Ling 3.1 Flash open-source weights | InclusionAI | 2026-10-14 | **Skip duplicate** | The configured [Ant Ling official account](https://x.com/AntLingAGI) exposes the open-source announcement, but it is the already tracked Ling 3.1 Flash family's weight publication, not a new family. The existing `2026-09-30` row remains the maker release; weights and aliases are not a second release. |
| Mistral Large 4 | Mistral | 2026-10-06 | **Skip** | The official [Mistral announcement](https://mistral.ai/news/mistral-large-4/) was checked. It is outside the inclusive `2026-10-12` baseline window and explicitly a public preview; neither condition permits a new row in this refresh. Its coding and agentic claims are not AA Coding Index evidence. |
| Cohere coding-agent team research | Cohere | 2026-10-14 | **Skip** | [Cohere's article](https://cohere.com/blog/lessons-from-scaling-teams-of-frontier-coding-agents) is research about a multi-agent harness and evaluation methodology, not a new Command/North base model. |
| AI21 post-training partnerships and coding-agent research | AI21 Labs | 2026-10-14/15 | **Skip** | The configured [AI21 blog](https://www.ai21.com/blog) showed post-training work on NVIDIA Nemotron and evaluation/research articles. These are not new AI21 Jamba or other qualifying base model lines. |
| Step-5-Preview | StepFun | current HF activity | **Skip** | The configured [StepFun Hugging Face organization](https://huggingface.co/stepfun-ai) showed maker-labeled preview activity. Preview-only releases are explicitly excluded; no qualifying non-preview base line was verified. |
| LongCat-DeepResearch | LongCat | current HF activity | **Skip** | The configured [LongCat organization](https://huggingface.co/meituan-longcat) showed a research model combined with a deep-research harness. This is a system/harness, not a new general programming/agentic base line. |
| Celeris-1 Decision | Celeris | 2026-10-08 | **Skip** | The configured [Celeris blog](https://celeris.ai/blog) showed the October 8 decision-specialized release. It is before the window and is not a new programming/agentic base line. |
| Amazon Priming research model zoo | Amazon | 2026-10-12 | **Skip** | The configured [Amazon Science RSS](https://www.amazon.science/index.rss) exposed the October 12 Priming research article. It describes an architecture/model zoo rather than a named Amazon Nova base model line for this dashboard. |
| Cohere North 2 / Embed 5 / North Small Translate | Cohere | 2026-09/10 | **Skip** | North 2 is a platform update, Embed 5 is an embedding family, and North Small Translate is translation-only. They are outside the required model scope even where the official surfaces were current. |
| All other candidates | All configured providers and missing labs | — | **No additional qualifying row verified** | Each provider/lab received a bounded query and direct official-surface pass. Current leaderboard absence was not interpreted as deletion, age, or a score decision. The blocked surfaces and other evidence limits are listed below. |

## Added rows and exact metric provenance

### Muse Spark Open

- Canonical display name: `Muse Spark Open`; aliases checked: `muse-spark-open` and `meta-models/Muse-Spark-Open-816B-A42B`.
- Maker source: [Meta developer model page](https://dev.meta.ai/models/muse-spark-open); release-date fallback/corroboration: [official Meta model card](https://huggingface.co/meta-models/Muse-Spark-Open-816B-A42B), which states October 15, 2026.
- Scope evidence: Meta documents coding agents, tool use, end-to-end agentic task completion, and multimodal reasoning. This is a named open-weight model line, not a quantization-only or alias row.
- AA source: [Muse Spark Open model page](https://artificialanalysis.ai/models/muse-spark-open), retrieved 2026-10-16. Exact representative configuration is `Muse Spark Open (xhigh)`; displayed Intelligence Index is `39`.
- Stored values: `codingIndex: null`; `intelligenceIndex: 39`; `intelligenceIndexConfiguration: "xhigh"`; `intelligenceIndexSourceUrl` is the exact AA model page; no `scoreSourceUrl`.
- The model card's JobBench, DeepSWE, Terminal-Bench, and other benchmark values were not substituted for AA Coding Index.

### Nemotron 3.5 Super VL

- Canonical display name: `Nemotron 3.5 Super VL`; aliases checked: `nemotron-3.5-super-vl` and `NVIDIA-Nemotron-3.5-Super-VL-120B-A12B-BF16`.
- Maker source: [NVIDIA BF16 model card](https://huggingface.co/nvidia/NVIDIA-Nemotron-3.5-Super-VL-120B-A12B-BF16), which states a 2026-10-15 Hugging Face release and describes coding/tool/agent use. The related [NVFP4 card](https://huggingface.co/nvidia/NVIDIA-Nemotron-3.5-Super-VL-120B-A12B-NVFP4) was checked only to classify it as a quantized package, not as a second release.
- AA source: [Nemotron 3.5 Super VL model page](https://artificialanalysis.ai/models/nemotron-3-5-super-vl), retrieved 2026-10-16. Exact representative configuration has no effort suffix; displayed Intelligence Index is `26`.
- Stored values: `codingIndex: null`; `intelligenceIndex: 26`; `intelligenceIndexConfiguration: "default"`; `intelligenceIndexSourceUrl` is the exact AA model page; no `scoreSourceUrl`.
- NVIDIA's SWE-bench, Terminal-Bench, DeepSWE, and other maker metrics were not substituted for AA Coding Index.

### Nemotron 3.5 Bolt 74B-A9B

- Canonical display name: `Nemotron 3.5 Bolt 74B-A9B`; aliases checked: `nemotron-3-5-bolt-74b-a9b` (AA model slug) and `NVIDIA-Nemotron-3.5-Bolt-74B-A9B-BF16` (official HF identifier).
- Maker source: [NVIDIA BF16 model card](https://huggingface.co/nvidia/NVIDIA-Nemotron-3.5-Bolt-74B-A9B-BF16), which states a 2026-10-15 Hugging Face release and documents coding languages, tool calling, browsing, terminal use, and local agentic work. The [24GB IQ2 card](https://huggingface.co/nvidia/NVIDIA-Nemotron-3.5-Bolt-74B-A9B-24GB), GGUF cards, and LiLiCorr drafter were checked as packaging/deployment artifacts and excluded as separate rows.
- AA source: [Nemotron 3.5 Bolt 74B-A9B model page](https://artificialanalysis.ai/models/nemotron-3-5-bolt-74b-a9b), retrieved 2026-10-16. Exact representative configuration has no effort suffix; displayed Intelligence Index is `21`.
- Stored values: `codingIndex: null`; `intelligenceIndex: 21`; `intelligenceIndexConfiguration: "default"`; `intelligenceIndexSourceUrl` is the exact AA model page; no `scoreSourceUrl`.
- NVIDIA's Terminal-Bench, SWE-bench, and other maker metrics were not substituted for AA Coding Index.

No mirror-derived Coding Index values were used. No sibling score was copied between the three new rows.

## Configured-provider coverage

Every configured provider was checked using its configured official surfaces and one bounded discovery path for the inclusive window. The configured search queries are reproducible from `scripts/provider-release-sources.json` and the final checklist command.

- **OpenAI:** checked [news](https://openai.com/news/), [index](https://openai.com/index/), and [API models](https://platform.openai.com/docs/models). API model docs were reachable; OpenAI news/index surfaces were HTTP 403 and the bounded search produced no verified post-boundary qualifying model. No absence claim is made beyond that evidence limit.
- **Anthropic:** checked [newsroom](https://www.anthropic.com/news) and [model docs](https://docs.anthropic.com/en/docs/about-claude/models). Haiku 5.5 remains the latest tracked qualifying release; later cyber/policy material is not a model.
- **Google:** checked the [Gemini archive](https://blog.google/innovation-and-ai/models-and-research/gemini-models/), [developer news](https://blog.google/innovation-and-ai/technology/developers-tools/), and [API model catalog](https://ai.google.dev/gemini-api/docs/models). The catalog was last updated October 13 and showed no new qualifying base line after the boundary; live/audio/TTS/image/preview/lite entries were excluded.
- **Meta:** checked [Hugging Face organization](https://huggingface.co/meta-models), [AI blog](https://ai.meta.com/blog/), [Meta AI](https://www.meta.com/ai/), [Muse Wonder research](https://research.meta.ai/blog/muse-wonder), [developer catalog](https://developer.meta.com/ai/), and [Muse model pages](https://dev.meta.ai/models/muse-wonder). **Added Muse Spark Open** from the official developer/Hugging Face surfaces. Existing Muse Wonder rows were not duplicated.
- **OpenBMB:** checked [Hugging Face](https://huggingface.co/OpenBMB), [GitHub organization](https://github.com/OpenBMB), and [MiniCPM repository](https://github.com/OpenBMB/MiniCPM). No post-boundary qualifying family; checkpoint, size, and modality artifacts remain excluded.
- **Apodex:** checked [home](https://www.apodex.com/), [1.1 announcement](https://www.apodex.com/blog/apodex-1.1-scaling-agentic-intelligence-for-complex-work), and [API](https://www.apodex.com/api). No new qualifying model.
- **xAI:** checked [news](https://x.ai/news) and [developer models](https://docs.x.ai/developers/models). The news archive was Cloudflare-blocked; docs still showed Grok 4.7 as current. No verified post-boundary qualifying model; voice/image/video products remain excluded.
- **Cursor:** checked [Cursor blog](https://cursor.com/blog). No new proprietary Cursor model after the boundary; xAI's existing Grok 4.7 announcement is not a Cursor release.
- **Mistral:** checked [news](https://mistral.ai/news) and [model overview](https://docs.mistral.ai/getting-started/models/models_overview/). Mistral Large 4 is October 6 and explicitly preview-only/outside the window; no new qualifying release after October 12.
- **Alibaba:** checked [legacy Qwen blog](https://qwenlm.github.io/blog), [Qwen blog](https://qwen.ai/blog), and [QwenCloud models](https://www.qwencloud.com/models). Qwen3.8-Max-0902 is an upgraded snapshot and is not a new family; no new qualifying model.
- **Tencent:** checked [UI-Mate](https://ui-mate.github.io/), [Hugging Face organization](https://huggingface.co/tencent), and [GitHub organization](https://github.com/Tencent). No new qualifying model; modality and research artifacts remain excluded.
- **DeepSeek:** checked [API news](https://api-docs.deepseek.com/news/) and [transparency center](https://www.deepseek.com/en/transparency/). No post-boundary model release was verified.
- **Moonshot.ai:** checked [platform changelog](https://platform.moonshot.ai/blog/posts/changelog), [company site](https://www.moonshot.ai/), and [Kimi account](https://x.com/Kimi_Moonshot). Kimi K3 remains current; no new line.
- **MiniMax:** checked [news](https://www.minimax.io/news) and [blog](https://www.minimax.io/blog). Current LLM lineup remains M3/M2.7/M2.5; H3, music, and speech items are not qualifying programming/agentic additions in this window.
- **Z.ai:** checked [blog](https://z.ai/blog) and [release notes](https://docs.z.ai/release-notes/new-released). The blog returned 404; release notes stop at August 26. No new model.
- **Xiaomi:** checked [GitHub organization](https://github.com/XiaomiMiMo), [Hugging Face organization](https://huggingface.co/XiaomiMiMo), and [MiMo-V2.6](https://mimo.xiaomi.com/mimo-v2-6). No new family; later uploads are snapshots/variants.
- **NVIDIA:** checked [Build catalog](https://build.nvidia.com/nvidia) and [Hugging Face organization](https://huggingface.co/nvidia), then verified the exact [Super VL BF16 card](https://huggingface.co/nvidia/NVIDIA-Nemotron-3.5-Super-VL-120B-A12B-BF16), [Bolt BF16 card](https://huggingface.co/nvidia/NVIDIA-Nemotron-3.5-Bolt-74B-A9B-BF16), and corresponding AA pages. **Added Nemotron 3.5 Super VL and Nemotron 3.5 Bolt 74B-A9B.** Quantized/deployment artifacts were not added.
- **IFM:** checked K2 home, [press release](https://ifm.ai/k2/press-release/), and [docs](https://docs.ifm.ai/). All three main surfaces were Cloudflare-blocked; bounded search produced no new verified family. This is an unresolved evidence limitation, not an absence claim.
- **Agnes AI:** checked [home](https://agnes-ai.com/), [docs](https://www.agnes-ai.com/zh-Hans/docs/agnes-30-flash), [platform](https://platform.agnes-ai.com), [GitHub organization](https://github.com/AgnesAI-Labs), [Qwen repository](https://github.com/AgnesAI-Labs/Agnes-3.0-Qwen), [Hugging Face organization](https://huggingface.co/Agnes-AI), and [model card](https://huggingface.co/Agnes-AI/Agnes-3.0-Qwen). No new family after the October 10 row.
- **InclusionAI:** checked [Hugging Face](https://huggingface.co/inclusionAI), [Ling card](https://huggingface.co/inclusionAI/Ling-3.0-flash-VL), [model catalog](https://www.inclusion-ai.org/model), [LLaDA-UI](https://www.inclusion-ai.org/LLaDA-UI/), [GitHub](https://github.com/inclusionAI), and [Ant Ling](https://x.com/AntLingAGI). October 14 open-source weights are a publication event for the existing Ling 3.1 Flash row; no new family.
- **Inception:** checked [home](https://inceptionlabs.ai/), [Mercury 2.5](https://inceptionlabs.ai/blog/introducing-mercury-2-5), [models](https://inceptionlabs.ai/models), and [docs](https://docs.inceptionlabs.ai/get-started). No new model after the boundary.
- **IBM Granite:** checked [Granite 4.2 announcement](https://research.ibm.com/blog/introducing-granite-4-2), [Granite site](https://www.ibm.com/granite), and [Hugging Face](https://huggingface.co/ibm-granite). No new Granite programming/agentic base line.
- **LongCat:** checked [home](https://longcat.ai/), [LongCat 2.0](https://longcat.ai/blog/longcat-2.0), [Hugging Face](https://huggingface.co/meituan-longcat), and [GitHub](https://github.com/meituan-longcat). LongCat-DeepResearch is a harness/research system; no new non-preview base line.
- **Thinking Machines:** checked [company site](https://thinkingmachines.ai/), [Inkling article](https://huggingface.co/blog/thinkingmachines-inkling), [Hugging Face](https://huggingface.co/thinkingmachines), and [GitHub](https://github.com/thinking-machines-lab). No new model.
- **Arcee AI:** checked [home](https://arcee.ai/), [Trinity](https://arcee.ai/trinity), [Hugging Face](https://huggingface.co/arcee-ai), and [model docs](https://docs.arcee.ai/get-started/models-overview). No new Trinity line; current items are financing/harness/product material.
- **Celeris:** checked [home](https://celeris.ai/), [Celeris-1](https://celeris.ai/celeris-1), [Magnus](https://celeris.ai/celeris-1-magnus), and [blog](https://celeris.ai/blog). The October 8 Decision model is outside the window and decision-specialized; no addition.

## Explicitly missing-lab coverage

- **Amazon:** checked [AWS What's New](https://aws.amazon.com/about-aws/whats-new/) and [Amazon Science RSS](https://www.amazon.science/index.rss). The October 12 Priming research release is not an Amazon Nova base model; no addition.
- **Cohere:** checked [blog](https://cohere.com/blog), [release notes](https://docs.cohere.com/changelog), and [CohereLabs](https://huggingface.co/CohereLabs). October 14 coding-agent research is a harness/evaluation article; North 2, Embed 5, and translation/speech/document models are out of scope. No addition.
- **StepFun:** checked [homepage](https://www.stepfun.com/) and [Hugging Face](https://huggingface.co/stepfun-ai). Step-5-Preview is explicitly preview-only; no addition.
- **AI21 Labs:** checked [blog](https://www.ai21.com/blog) and [Studio](https://studio.ai21.com/). October posts describe post-training/research rather than a new Jamba or other qualifying base model. No addition.

## Discovery-config result

- No new lab outside the configured provider set was found. To make the recurring sweep reproducible, the Meta and NVIDIA provider entries were extended with the exact official model-card/developer URLs and targeted Muse Spark Open/Nemotron queries. NVIDIA and Meta were already configured providers; no new provider object was needed.
- **Provider checklist config:** exact Meta/NVIDIA model surfaces and targeted queries were added to `scripts/provider-release-sources.json`; the final checklist still contains 26 configured providers and the unchanged explicit missing-lab list `["Amazon", "Cohere", "StepFun", "AI21 Labs"]`.

## Verification

- **Expected final dataset:** 154 rows, 154 unique model names; newest maker `releaseDate` `2026-10-15`.
- **Cache key:** `20261016a` in `index.html`, `src/app.js` model-data import, and `src/app.js` dashboard-logic import.
- **Intelligence scores added separately:** Muse Spark Open `39` (`xhigh`); Nemotron 3.5 Super VL `26` (no effort suffix); Nemotron 3.5 Bolt 74B-A9B `21` (no effort suffix). All three exact AA model pages were HTTP 200 and reported no exact Coding Index field.
- **Coding scores added:** none; all three exact Coding Index values remain unknown.
- **`npm test`:** **102 passed, 0 failed**.
- **`git diff --check`:** passed.
- **Provider checklist:** final `node scripts/check-provider-releases.mjs --markdown` derived `since 2026-10-15` from the refreshed newest release date and emitted 30 provider/lab headings (26 configured providers plus 4 explicit missing labs).
- **Dataset/provider invariants:** `node scripts/verify-model-refresh.mjs --cutoff=2026-10-16` reported **154 rows, 154 unique models, newest `2026-10-15`, 26 configured providers, 4 missing labs, 30 checklist headings, 286 URL union, and no invariant errors**.
- **Bounded HTTP smoke/source check:** A successful bounded run of `node scripts/verify-model-refresh.mjs --cutoff=2026-10-16 --http` checked **286 URLs; 265 returned 2xx and 21 returned known/non-2xx limitations; no invariant errors**. The 21 limitations were existing OpenAI/Help OpenAI access blocks (15), IFM Cloudflare blocks (3), xAI news Cloudflare block (1), and two known 404s (Agnes 3.0 Flash AA page and Z.ai blog). The newly added Meta/NVIDIA maker URLs, exact AA pages, and AA leaderboard also returned HTTP 200 in a separate targeted check. A later rerun was blocked by a transient DNS/network outage (`fetch failed` for all URLs), so no stronger claim is made about a later live snapshot.
- **Untracked-file policy:** `screenshots/baseline-local.png` remained untracked and untouched. No unrelated tracked change was present before publication.
