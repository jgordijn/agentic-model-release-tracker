# Model-release audit — 2026-10-25

## Baseline, window, and policy

- **Repository/branch:** `agentic-model-release-tracker`, direct `main` working tree; no worktree and no PR.
- **Remote:** `origin` → `https://github.com/jgordijn/agentic-model-release-tracker.git`.
- **HEAD / `origin/main` before this refresh:** `db51d238fe8aec8ed86c8da37132ca263f1de252` — `feat(data): add IFM Jais 3 release correction`.
- **Working-tree baseline:** 161 rows, 161 unique model names; newest tracked `releaseDate` was `2026-10-19` (`Ling-3.0-flash-Sante`, `MiniMax M3.1 Flash`, and `Mercury 3`). The pre-existing untracked `screenshots/baseline-local.png` was left untouched. No unrelated tracked changes were present.
- **Research cutoff:** `2026-10-25T07:05:31+01:00` in `Europe/Amsterdam` (`2026-10-25T06:05:31Z`).
- **Effective search window:** inclusive `2026-10-19` through `2026-10-25`, derived from the newest baseline dataset date rather than the last commit date.
- **Scope:** add only maker-released base model lines or clearly differentiated specialized-base lines relevant to programming or agentic work. Exclude product features, provider integrations, modality-only releases, quantizations, pure snapshots/checkpoints, API aliases, mini/nano/lite/tiny tiers, preview-only configurations, and speed/serving variants.
- **Metric rule:** `codingIndex` is populated only from an exact Artificial Analysis Coding Index row for the exact model/configuration. Intelligence Index, Agentic Index, SWE-bench, Terminal-Bench, Kimi Code Bench, maker scores, and other metrics are never substituted for Coding Index. Separate Artificial Analysis Intelligence Index data remains in its own fields only.

## Required checklist and bounded retrieval

- The required first command was run before external research: `node scripts/check-provider-releases.mjs --markdown`. At baseline it derived `since 2026-10-19` and emitted 26 configured providers plus 4 explicit missing labs (30 provider headings).
- One bounded discovery search was run for each configured provider and missing lab: 30 provider/lab searches total. Search results were treated as discovery leads only; no repeated broad sweep was used.
- A direct HTTP pass over the baseline configured primary-source set checked 108 URLs: 99 returned 2xx and 9 returned known access/error statuses. Additional exact Kimi pages were independently fetched with the web extractor.
- The Artificial Analysis model leaderboard was fetched directly (HTTP 200) and its embedded release catalog was parsed for `2026-10-19` through `2026-10-25`. It produced four in-window leads: Kimi K3.1 Pro, Ling 3.1 Flash 1019, MiniMax-M3.1-Flash, and Nemotron 3.5 Bolt E4B 4GB.
- Official Hugging Face organization APIs were checked for the configured organizations. Recent activity was grouped by family and filtered for modality-only, packaging, quantization, tiny-tier, robotics, retrieval, and snapshot artifacts before any inclusion decision.
- No qualifying lab outside the configured set was discovered. The only checklist coverage gap was an official Moonshot/Kimi release surface; it was added to the existing `Moonshot.ai` source set and tested.

## Candidate ledger

| Candidate / lead | Provider | Maker/public date | Decision | Evidence and reason |
|---|---|---:|---|---|
| **Kimi K3.1 Pro** | Moonshot.ai | 2026-10-24 | **Add** | The official [Kimi research index](https://www.kimi.ai/blog/) dates the [Kimi K3.1 Pro announcement](https://www.kimi.ai/blog/kimi-k3-1-pro) `2026-10-24`. It describes an available 3T-class model with a 1M-token context window and substantial coding and agentic improvements. The official [API model list](https://platform.kimi.ai/docs/models) and [quickstart](https://platform.kimi.ai/docs/guide/kimi-k3-1-pro-quickstart) confirm live model availability for programming agents and tool use. |
| `Ling 3.1 Flash 1019` | InclusionAI | AA catalog `2026-10-22` | **Skip snapshot/variant** | The AA catalog lead is a proprietary `1019` service/evaluation variant. The official [Ling 3.1 Flash model card](https://huggingface.co/inclusionAI/Ling-3.1-flash) is the existing family line, created before the window; no new maker announcement or distinct base family was found. The dated AA alias is not a new dashboard release row. |
| `MiniMax-M3.1-Flash` | MiniMax | 2026-10-19 | **Skip duplicate** | The exact AA catalog lead is already represented by `MiniMax M3.1 Flash` at the inclusive boundary. No second row is created for an AA naming variant. |
| `Nemotron 3.5 Bolt E4B 4GB` | NVIDIA | registry created 2026-10-05 | **Skip outside window/preview-packaging** | The official NVIDIA Build catalog and [NVIDIA registry](https://huggingface.co/nvidia) show the compact E4B endpoint/package, but its model artifact predates the window and the current activity is preview/serving or packaging. It is not a new in-window base family release. |
| `Ling-3.0-tiny-UBTree` | InclusionAI | registry created 2026-10-21 | **Skip tiny tier** | The official registry explicitly names a `tiny` line. Tiny/mini/nano/lite tiers are excluded even when the underlying family is agentic. |
| `Ming-3.0-*`, `Realtime-Venus` | InclusionAI | October registry activity | **Skip modality-only** | Official registry tags identify speech, text-to-speech, audio, video, or real-time any-to-any models, not programming/agentic language-model base lines. |
| `Hy-Nomas`, `WeVisOne-VL-2B/4B` | Tencent | 2026-10-21/22 | **Skip modality-only** | Official model cards identify interactive video-world generation and image perception/OCR/localization/matting. They are not programming/agentic base lines. |
| `MiniCPM-V-4.7`, `MiniCPM-o-4.5` activity | OpenBMB | October registry activity | **Skip modality/product scope** | Official HF/GitHub surfaces show multimodal/on-device, RAG, speech, dataset, and packaging activity; no qualifying new programming/agentic base family was verified. |
| `Voxtral 3`, `Timestral`, NVIDIA retrieval/embedding/parse/protein/robotics activity | Mistral/NVIDIA | October 20–24 | **Skip modality/task scope** | Official archives and registries show audio, forecasting, retrieval, embeddings, document parsing, biology, robotics, or packaging rather than a qualifying general programming/agentic base release. |
| `Rerank 5`, Model Vault, North retrieval/translation activity | Cohere | October 21–22 | **Skip retrieval/product scope** | Official Cohere blog, changelog, and registry show reranking, retrieval, confidential infrastructure, or translation; no new in-scope base language-model line. |
| Other leads across all configured providers and missing labs | All | — | **No additional qualifying row verified** | Each provider/lab received its bounded search and direct configured-surface check. Evidence limits are recorded below; no unsupported omission claim is made for blocked surfaces. |

## Added row and metric provenance

### Kimi K3.1 Pro

- **Canonical display name:** `Kimi K3.1 Pro`.
- **Provider/group/category:** `Moonshot.ai` / `Chinese+Other` / `base`.
- **Stored release date:** `2026-10-24`, the maker date shown on the official Kimi research index. Artificial Analysis reports October 23 as its catalog date, but the maker announcement controls the dashboard release date.
- **Maker source:** [Kimi K3.1 Pro announcement](https://www.kimi.ai/blog/kimi-k3-1-pro).
- **Additional official surfaces:** [Kimi research index](https://www.kimi.ai/blog/), [Kimi API model list](https://platform.kimi.ai/docs/models), and [Kimi K3.1 Pro quickstart](https://platform.kimi.ai/docs/guide/kimi-k3-1-pro-quickstart).
- **Aliases checked:** `Kimi K3.1 Pro`, `kimi-k3.1-pro`, and `kimi-k3.1-pro-highspeed`. The Highspeed name is a speed variant of the same model, not a second release row.
- **Scope evidence:** the maker describes long-horizon coding, agentic capabilities, tool use, programming-agent integrations, and availability through Kimi Code and the API. It is a distinct post-trained K3.1 model line rather than a product-only feature.
- **Separate Intelligence Index evidence:** the Artificial Analysis model page and direct leaderboard row were fetched on `2026-10-25`; both identify the un-suffixed Kimi K3.1 Pro row with Intelligence Index 55. The official Kimi API documentation states that `max` is the default reasoning effort, so the repository records the representative configuration as `max`; it is not used as Coding Index.
- **Artificial Analysis Coding Index audit (retrieved 2026-10-25):** the exact AA model page was fetched successfully, but its metric content exposes Intelligence Index and other evaluation references, not an exact Coding Index field/value for Kimi K3.1 Pro. The exact [Easy Benchmarks model URL](https://easy-benchmarks.com/models/kimi-k3-1-pro) returned HTTP 200 with `Model Not Found`. No exact Coding Index row/configuration was independently verified.
- **Stored Coding Index values:** `codingIndex: null`; no `scoreSourceUrl`, configuration, mirror-derived score, or maker benchmark substitution. Terminal-Bench, Kimi Code Bench, internal coding benchmarks, and other maker metrics were explicitly not stored as Coding Index.

## Configured-provider coverage

Each configured provider's official surfaces were checked. The final checklist still contains 26 configured providers; the final checker emitted all 30 provider/lab headings exactly once.

- **OpenAI:** checked [news](https://openai.com/news/), [index](https://openai.com/index/), and [model docs](https://platform.openai.com/docs/models). No new GPT/Codex base line was verified in the window. OpenAI archive URLs were HTTP 403 in the direct smoke, so this remains an access limitation rather than proof that every archive item was extractable. **Unresolved evidence limit; no add.**
- **Anthropic:** checked [newsroom](https://www.anthropic.com/news) and [model docs](https://docs.anthropic.com/en/docs/about-claude/models). The October 25 newsroom item was Agent Skills/product material, not a new model. **No add.**
- **Google:** checked [Gemini archive](https://blog.google/innovation-and-ai/models-and-research/gemini-models/), [developer-tools archive](https://blog.google/innovation-and-ai/technology/developers-tools/), and [Gemini API model docs](https://ai.google.dev/gemini-api/docs/models). The October 22 docs update exposed existing families and preview/audio material, not a new qualifying line. **No add.**
- **Meta:** checked [HF organization](https://huggingface.co/meta-models), [Meta AI blog](https://ai.meta.com/blog/), [Meta AI](https://www.meta.com/ai/), [Muse Wonder research](https://research.meta.ai/blog/muse-wonder), [developer catalog](https://developer.meta.com/ai/), [Muse Wonder developer page](https://dev.meta.ai/models/muse-wonder), and [Muse Spark Open developer page](https://dev.meta.ai/models/muse-spark-open). Recent registry activity was existing Muse packaging/updates. **No add.**
- **OpenBMB:** checked [HF organization](https://huggingface.co/OpenBMB), [GitHub organization](https://github.com/OpenBMB), and [MiniCPM repository](https://github.com/OpenBMB/MiniCPM). Recent activity was multimodal/on-device, RAG, speech, datasets, or packaging. **No add.**
- **Apodex:** checked [home](https://www.apodex.com/), [Apodex 1.1 announcement](https://www.apodex.com/blog/apodex-1.1-scaling-agentic-intelligence-for-complex-work), and [API catalog](https://www.apodex.com/api). Existing Apodex 1.1/Mini/research surfaces were not new qualifying base releases. **No add.**
- **xAI:** checked [news](https://x.ai/news) and [developer model docs](https://docs.x.ai/developers/models). The news archive was HTTP 403; accessible discovery showed product/voice/partnership material and no verified later base model. **Unresolved evidence limit; no add.**
- **Cursor:** checked the [Cursor blog](https://cursor.com/blog). Entries were product/infrastructure updates; no new Cursor-owned model line. **No add.**
- **Mistral:** checked [news](https://mistral.ai/news) and the [model overview](https://docs.mistral.ai/getting-started/models/models_overview/). Voxtral 3 is audio and Timestral is forecasting; neither qualifies. **No add.**
- **Alibaba:** checked [legacy Qwen blog](https://qwenlm.github.io/blog), [Qwen blog](https://qwen.ai/blog), and [Qwen Cloud models](https://www.qwencloud.com/models). No new maker-dated programming/agentic family; dated snapshots remain excluded. **No add.**
- **Tencent:** checked [UI-Mate](https://ui-mate.github.io/), [HF organization](https://huggingface.co/tencent), [GitHub organization](https://github.com/Tencent), [Hy-Memory card](https://huggingface.co/tencent/Hy-Memory-30B-A3B), and [Hy-Memory repository](https://github.com/Tencent-Hunyuan/Hy-Memory). Hy-Nomas/WeVisOne-VL are modality-only and Hy-Memory activity is packaging. **No add.**
- **DeepSeek:** checked [API archive](https://api-docs.deepseek.com/news/), the exact [October 17 release](https://api-docs.deepseek.com/news/news261017), and [transparency center](https://www.deepseek.com/en/transparency/). No release after the already tracked October 17 row. **No add.**
- **Moonshot.ai:** checked [platform changelog](https://platform.moonshot.ai/blog/posts/changelog), [company site](https://www.moonshot.ai/), [official Kimi account](https://x.com/Kimi_Moonshot), newly registered [Kimi research index](https://www.kimi.ai/blog/), [K3.1 Pro announcement](https://www.kimi.ai/blog/kimi-k3-1-pro), [API model list](https://platform.kimi.ai/docs/models), and [K3.1 Pro quickstart](https://platform.kimi.ai/docs/guide/kimi-k3-1-pro-quickstart). **Add Kimi K3.1 Pro; the new official surfaces are now in the checklist.**
- **MiniMax:** checked [news](https://www.minimax.io/news), [research/blog](https://www.minimax.io/blog), and [M3.1 Flash announcement](https://www.minimax.io/blog/minimax-m31f). MiniMax Code Mini App is a product/plugin feature; M3.1 Flash is already tracked at the boundary. **No add.**
- **Z.ai:** checked [blog](https://z.ai/blog) and [release notes](https://docs.z.ai/release-notes/new-released). The blog returned 404 and release notes had no later qualifying model. **Unresolved access/404 limit; no add.**
- **Xiaomi:** checked [GitHub organization](https://github.com/XiaomiMiMo), [HF organization](https://huggingface.co/XiaomiMiMo), and [MiMo-V2.6 page](https://mimo.xiaomi.com/mimo-v2-6). Activity was MiMo-Code/harness, RL, dataset, or existing-family maintenance. **No add.**
- **NVIDIA:** checked [NVIDIA Build](https://build.nvidia.com/nvidia), [HF organization](https://huggingface.co/nvidia), and the exact [Nemotron Super VL](https://huggingface.co/nvidia/NVIDIA-Nemotron-3.5-Super-VL-120B-A12B-BF16), [Nemotron Bolt](https://huggingface.co/nvidia/NVIDIA-Nemotron-3.5-Bolt-74B-A9B-BF16), and [Dory](https://huggingface.co/nvidia/NVIDIA-Nemotron-Labs-Dory1.0-4B-BF16) cards. Recent activity was retrieval, embeddings, parsing, robotics, biology, packaging, or preview endpoints. **No add.**
- **IFM:** checked [K2](https://ifm.ai/k2/), [K2 press release](https://ifm.ai/k2/press-release/), [docs](https://docs.ifm.ai/), [Jais](https://ifm.ai/jais/), [Jais 3 press release](https://ifm.ai/jais3/press-release/), [Jais 3 technical blog](https://ifm.ai/blog/jais3/), [Jais 3 docs](https://docs.ifm.ai/#/jais-3), and the official [Jais 3 HF collection](https://huggingface.co/collections/IFM/jais-3). Direct Node smoke saw IFM 403s, but the previously verified Jais 3 correction remains in the baseline and no later IFM model was found. **No additional add; access limitation retained.**
- **Agnes AI:** checked [home](https://agnes-ai.com/), [Flash docs](https://www.agnes-ai.com/zh-Hans/docs/agnes-30-flash), [platform](https://platform.agnes-ai.com), [GitHub organization](https://github.com/AgnesAI-Labs), [Agnes 3.0 Qwen repository](https://github.com/AgnesAI-Labs/Agnes-3.0-Qwen), [HF organization](https://huggingface.co/Agnes-AI), and [Qwen card](https://huggingface.co/Agnes-AI/Agnes-3.0-Qwen). October activity was video/audio or harness work. **No add.**
- **InclusionAI:** checked [HF organization](https://huggingface.co/inclusionAI), [Ling VL card](https://huggingface.co/inclusionAI/Ling-3.0-flash-VL), [model catalog](https://www.inclusion-ai.org/model), [LLaDA-UI](https://www.inclusion-ai.org/LLaDA-UI/), [GitHub organization](https://github.com/inclusionAI), [official account](https://x.com/AntLingAGI), and [Ling Sante card](https://huggingface.co/inclusionAI/Ling-3.0-flash-Sante). Tiny, audio, realtime, and dated Ling variants were excluded; no new qualifying family beyond the boundary row. **No add.**
- **Inception:** checked [home](https://inceptionlabs.ai/), [Mercury 2.5](https://inceptionlabs.ai/blog/introducing-mercury-2-5), [Mercury 3](https://inceptionlabs.ai/blog/introducing-mercury-3), [models](https://inceptionlabs.ai/models), and [docs](https://docs.inceptionlabs.ai/get-started). Mercury 3 is already the boundary row. **No add.**
- **IBM Granite:** checked [Granite 4.2 announcement](https://research.ibm.com/blog/introducing-granite-4-2), [Granite](https://www.ibm.com/granite), and [HF organization](https://huggingface.co/ibm-granite). Switch GGUF, speech, and time-series artifacts are out of scope. **No add.**
- **LongCat:** checked [home](https://longcat.ai/), [LongCat 2.0](https://longcat.ai/blog/longcat-2.0), [HF organization](https://huggingface.co/meituan-longcat), and [GitHub organization](https://github.com/meituan-longcat). LongCat-2.5 is preview and DeepResearch is a harness/research system. **No add.**
- **Thinking Machines:** checked [company site](https://thinkingmachines.ai/), [Inkling article](https://huggingface.co/blog/thinkingmachines-inkling), [HF organization](https://huggingface.co/thinkingmachines), and [GitHub organization](https://github.com/thinking-machines-lab). October activity was Tinker infrastructure and packaging. **No add.**
- **Arcee AI:** checked [home](https://arcee.ai/), [Trinity](https://arcee.ai/trinity), [HF organization](https://huggingface.co/arcee-ai), and [model docs](https://docs.arcee.ai/get-started/models-overview). No later qualifying model family. **No add.**
- **Celeris:** checked [home](https://celeris.ai/), [Celeris-1](https://celeris.ai/celeris-1), [Celeris-1 Magnus](https://celeris.ai/celeris-1-magnus), and [blog](https://celeris.ai/blog). No later programming/agentic base line. **No add.**

## Explicitly missing-lab coverage

- **Amazon:** checked [AWS What's New](https://aws.amazon.com/about-aws/whats-new/) and [Amazon Science RSS](https://www.amazon.science/index.rss). No Nova programming/agentic base release; activity was product/research material. **Skip/no add; remains missing.**
- **Cohere:** checked [blog](https://cohere.com/blog), [release notes](https://docs.cohere.com/changelog), and [HF organization](https://huggingface.co/CohereLabs). Rerank 5, embeddings, retrieval, translation, and Model Vault activity are out of scope. **Skip/no add; remains missing.**
- **StepFun:** checked [official site](https://www.stepfun.com/) and [HF organization](https://huggingface.co/stepfun-ai). Step 5 remains Preview; audio is modality-only and no later qualifying base line was verified. **Skip/no add; remains missing.**
- **AI21 Labs:** checked [AI21 blog](https://www.ai21.com/blog) and [AI21 Studio](https://studio.ai21.com/). October posts concerned forward-deployed research and coding-agent evaluation, not a new AI21 base model. **Skip/no add; remains missing; blog extraction is partially antibot-limited.**

## Score, alias, and snapshot decisions

- **Rows added this pass:** one, `Kimi K3.1 Pro`, dated `2026-10-24`.
- **Rows skipped:** AA-only `Ling 3.1 Flash 1019` variant, already tracked MiniMax M3.1 Flash duplicate, NVIDIA E4B preview/packaging lead, tiny/audio/video/retrieval/forecasting/robotics/translation/product leads described above.
- **Changed existing Coding Index scores:** none. No historical Coding Index was refreshed from another snapshot or effort configuration.
- **New row Coding Index:** unknown. The exact AA page had no Coding Index field/value and the exact Easy Benchmarks model page returned Model Not Found. No Intelligence Index, Terminal-Bench, Kimi Code Bench, internal maker score, or other metric was substituted.
- **New row separate Intelligence Index:** 55, representative `max` configuration, source `https://artificialanalysis.ai/models/kimi-k3-1-pro`, retrieved `2026-10-25`; the live row was un-suffixed and the official API docs define `max` as the default effort. This is stored in the separate Intelligence Index fields and is not a Coding Index value.
- **Family/variant decision:** Kimi K3.1 Pro Highspeed is a speed variant of the same model and is recorded as an alias only. No separate row is made for it.

## Provider checklist/configuration feedback

- `scripts/provider-release-sources.json` now registers the Kimi research index, exact Kimi K3.1 Pro announcement, Kimi API model list, and exact quickstart under the existing `Moonshot.ai` provider, plus targeted `{since}` queries.
- The configured set remains **26 providers** and the explicit missing-lab set remains **Amazon, Cohere, StepFun, and AI21 Labs**.
- The final checklist emitted **30 headings** exactly once. The provider-deck tests assert the new Moonshot/Kimi source and query coverage.
- `scripts/verify-model-refresh.mjs` keeps a bounded HTTP budget and was raised from 300 to 310 URLs because the new official source set makes the final union 305 URLs.

## Evidence limits

- Search retrieval was bounded to one discovery query per configured provider/missing lab, followed only by exact-page and registry follow-ups. Search snippets were not used as final release evidence.
- Direct HTTP smoke is volatile. The final bounded run checked 305 URLs: 283 returned 2xx and 22 returned non-2xx. Known limitations were OpenAI archive/help URLs (403), xAI news (403), IFM pages (403), the existing Artificial Analysis Agnes 3.0 Flash URL (404), and Z.ai blog (404). The required Anthropic model page, Artificial Analysis leaderboard, Kimi maker pages, and Kimi AA model page were not among the required-URL failures.
- Artificial Analysis is dynamic. Its exact Kimi page and live leaderboard were fetched, but no exact Kimi Coding Index value was exposed. The Easy Benchmarks page was treated as a secondary mirror and only established that the exact model page was not found; it was not treated as Artificial Analysis direct evidence.
- Hugging Face `createdAt`/`lastModified` timestamps were used for registry discovery and artifact classification only. The Kimi dashboard `releaseDate` is controlled by the dated maker index/announcement.
- X pages were not independently extractable; accessible official fallbacks were used where available. OpenAI, xAI, IFM, Z.ai, and AI21 access limitations remain explicitly recorded rather than converted into unsupported absence claims.

## Verification and publication gate

- **Final dataset expected:** 162 rows, 162 unique model names; newest `releaseDate` is `2026-10-24`.
- **Cache key:** `20261025a` in `index.html`, the `src/app.js` model-data import, and the `src/app.js` dashboard-logic import.
- **Tracked paths intended for publication:** `src/modelData.js`, `scripts/provider-release-sources.json`, `scripts/verify-model-refresh.mjs`, `index.html`, `src/app.js`, `tests/modelData.test.js`, `tests/staticAssets.test.js`, and this ledger. The untracked screenshot remains untouched and uncommitted.
- **Tests:** `npm test` — **107 passed, 0 failed**.
- **Diff hygiene:** `git diff --check` — **passed**.
- **Provider checklist:** final `node scripts/check-provider-releases.mjs --markdown` — `since 2026-10-24`, **30 headings**, and the Kimi source/query present. The initial baseline checklist used `since 2026-10-19` as required.
- **Dataset invariants:** `node scripts/verify-model-refresh.mjs --cutoff=2026-10-25` — **162 rows**, **162 unique models**, newest `2026-10-24`, **26 configured providers**, **4 missing labs**, **30 checklist headings**, **305 URL union**, no invariant errors.
- **Bounded HTTP smoke/source check:** `node scripts/verify-model-refresh.mjs --cutoff=2026-10-25 --http` — **305 URLs checked, 283 returned 2xx, 22 non-2xx/network limitations, no invariant errors**.
- **Read-only critical review history:** an initial fresh-context review identified and the parent corrected two artifact issues: a stale pending-gate statement and missing retrieval/configuration detail for the separate Intelligence Index. The bounded post-fix follow-up review returned **PASS** with no critical or important findings; its one minor dangling-pointer wording issue is resolved here by recording the result directly.
