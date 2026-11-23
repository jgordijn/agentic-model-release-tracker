# Model-release audit — 2026-11-23

## Baseline, window, and policy

- **Repository/branch:** `agentic-model-release-tracker`, direct `main` working tree; no worktree and no PR.
- **Remote:** `origin` → `https://github.com/jgordijn/agentic-model-release-tracker.git`.
- **HEAD / `origin/main` before this refresh:** `13517d72fb82d38f71454f17b6d9b276c91de97a`, `feat(data): add Thinking Machines varloop release`, committed `2026-11-21T06:35:53Z`.
- **Latest data commit before this refresh:** the same `13517d72...`; commit date and release-date boundary are recorded separately.
- **Working-tree baseline:** 183 rows, 183 unique model names; newest tracked `releaseDate` was `2026-11-20` (`TML-d24-varloop-research`). The pre-existing untracked `screenshots/baseline-local.png` was left untouched. No unrelated tracked changes were present at start.
- **Research cutoff:** inclusive through `2026-11-23` in `Europe/Amsterdam`; the first run timestamp was `2026-11-23T07:00:45+01:00`.
- **Current research window:** inclusive `2026-11-20` through `2026-11-23`, using the newest tracked `releaseDate` as the lower boundary. The baseline `TML-d24-varloop-research` row was rechecked rather than duplicated.
- **Scope:** add only maker-released base model lines or clearly differentiated specialized-base lines relevant to programming or agentic work. Exclude product features, provider integrations, modality-only releases, quantizations, pure snapshots/checkpoints, API aliases, mini/nano/lite tiers, preview-only configurations, speed/serving variants, and fine-tuned decision/product artifacts.
- **Metric rule:** `codingIndex` is populated only from an exact Artificial Analysis Coding Index row for the exact model/configuration. Intelligence Index, Coding Agent Index, FrontierCode, Terminal-Bench, SWE-bench, medical benchmarks, maker scores, and other metrics are never substituted. Unknown exact Coding Index values remain `null`.

## Required checklist and bounded retrieval

- The required pre-research command ran before external research: `node scripts/check-provider-releases.mjs --markdown`. Before the edit it derived `since 2026-11-20` and emitted 31 provider headings: 27 configured providers plus 4 explicit missing labs. After the edit it still emitted 31 headings and now derives `since 2026-11-22`.
- One bounded targeted web-search query was run for each configured provider/missing lab: **31 provider searches**. Search snippets were discovery leads only. No second broad sweep was launched.
- Three narrow follow-up searches were used only for the `LingSante-3.1-flash` discovery lead; they returned no additional indexed result. Direct official registry/model-card pages supplied the release evidence.
- Official source pages, registries, model cards, and benchmark pages were fetched directly where possible. Dynamic or blocked surfaces remain explicit evidence limits below.
- The Artificial Analysis leaderboard was fetched directly and its embedded release catalog was parsed for discovery. It exposed two in-window leads: `Inkling 2 Mini` dated `2026-11-20` and `LingSante-3.1-flash` dated `2026-11-22`. The former is excluded by the explicit Mini-tier rule; the latter was reconciled against the official InclusionAI/Hugging Face and ModelScope surfaces before inclusion.
- The final configured source set contains 134 primary URLs (27 providers plus 4 missing labs). The post-edit verification URL union contains 352 URLs, including required exact benchmark/source checks.

## Provider coverage and decisions

Every configured provider and explicit missing lab below was checked against its configured official source set and one bounded discovery query. “No add” means no new qualifying row in the current window; it does not mean every dynamic source was perfectly extractable.

### Configured providers

- **OpenAI — no add.** Official surfaces checked: `https://openai.com/news/`, `https://openai.com/index/`, `https://platform.openai.com/docs/models`. The direct newsroom listing through November 22 exposed research and engineering articles, not a new model. GPT-6.2 Astra/Sol remain the November 17 baseline rows; Codex sandbox material is a harness/security feature and was skipped.
- **Anthropic — no add.** Official surfaces checked: `https://www.anthropic.com/news`, `https://www.anthropic.com/claude-fable-and-mythos-5-2`, `https://docs.anthropic.com/en/docs/about-claude/models`. The newsroom page was current through November 23 but its highlighted Fable/Mythos 5.2 article is the existing November 9 model row; no later qualifying model was verified.
- **Google — no add.** Official surfaces checked: `https://blog.google/innovation-and-ai/models-and-research/gemini-models/`, `https://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-gemini-4-neon/`, `https://blog.google/innovation-and-ai/technology/developers-tools/`, `https://ai.google.dev/gemini-api/docs/models`. Gemini 4 Neon remains the November 18 baseline; no later qualifying base line was found.
- **Meta — no add.** Official surfaces checked: `https://huggingface.co/meta-models`, `https://ai.meta.com/blog/`, `https://www.meta.com/ai/`, `https://research.meta.ai/blog/muse-wonder`, `https://research.meta.ai/blog/muse-ember`, `https://developer.meta.com/ai/`, `https://dev.meta.ai/models/muse-wonder`, `https://dev.meta.ai/models/muse-spark-open`, `https://dev.meta.ai/models/muse-ember`. Recent Hugging Face activity was packaging/discussion activity for existing Muse families; no new release date was established.
- **OpenBMB — no add.** Official surfaces checked: `https://huggingface.co/OpenBMB`, `https://github.com/OpenBMB`, `https://github.com/OpenBMB/MiniCPM`. The GitHub release surface exposed MiniCPM5-1B outside the current window; no later qualifying model was verified.
- **Apodex — no add.** Official surfaces checked: `https://www.apodex.com/`, `https://www.apodex.com/blog/apodex-1.1-scaling-agentic-intelligence-for-complex-work`, `https://www.apodex.com/api`. Apodex 1.1 remains the latest qualifying line; Mini, deep-research, product, benchmark, and harness material was excluded.
- **xAI — no add; archive evidence limited.** Official surfaces checked: `https://x.ai/news`, `https://docs.x.ai/developers/models`. The direct archive showed November product/Bot items but no post-September model release; voice, image, product, partner, and Cursor-integration items were skipped. The configured archive and several exact pages were network-failed during the final Node smoke, while the archive was independently extracted earlier.
- **Cursor — no add.** Official surface checked: `https://cursor.com/blog`. November entries were security/product work; Agent SDK and Projects are product/integration material, not a new Composer base model.
- **Mistral — no add.** Official surfaces checked: `https://mistral.ai/news`, `https://docs.mistral.ai/getting-started/models/models_overview/`. The official news page still lists Le Chonk/Mistral Large 4 as the latest relevant model, already tracked on October 29. Studio, voice, time-series, and partnership items were excluded.
- **Alibaba — no add; no verified current-window lead.** Official surfaces checked: `https://qwenlm.github.io/blog`, `https://qwen.ai/blog`, `https://www.qwencloud.com/models`. The Qwen page extraction was sparse and exposed no dated current-window release. The earlier Qwen3.5 lead remains unresolved rather than being inferred from a generic page; no new row was added.
- **Tencent — no add; explicit scope skips.** Official surfaces checked: `https://ui-mate.github.io/`, `https://huggingface.co/tencent`, `https://github.com/Tencent`, `https://huggingface.co/tencent/Hy-Memory-30B-A3B`, `https://github.com/Tencent-Hunyuan/Hy-Memory`, `https://huggingface.co/tencent/Hy4-flash`, `https://github.com/Tencent-Hunyuan/Hy4-flash`, `https://modelscope.cn/models/Tencent-Hunyuan/Hy4-flash`, `https://cloud.tencent.com/product/hunyuan`, `https://cloud.tencent.com/document/product/1823/130051`. The newly active `WePocketModel1.0` family is a unified on-device vision-language/embedding/decision model with no programming/agentic release rationale; it was skipped as modality/application-focused. WeMM video models and WePocket GGUF artifacts were skipped as modality/quantization; Hy4 updates were existing-family artifacts.
- **China Mobile — no add; Jiutian coverage incomplete.** Official surfaces checked: `https://www.10086.cn/aboutus/news/`, `https://www.10086.cn/aboutus/news/groupnews/index_detail_56169.html`, `https://jiutian.10086.cn/`, `https://jiutian.10086.cn/portal/common-helpcenter#/document/1181?platformCode=DMX_TYZX`, `https://www.modelscope.cn/models/ChinaMobile/JT-4.1-Flash-236B-A21B`. No new model identity was verified after the JT-4.1 Flash baseline. Jiutian returned access errors and China Mobile pages were intermittently network-failed; absence is not claimed as exhaustive.
- **DeepSeek — no add; configured news surface unavailable.** Official surfaces checked: `https://api-docs.deepseek.com/news/`, `https://api-docs.deepseek.com/news/news261017`, `https://www.deepseek.com/en/transparency/`. The configured news index currently returns a page-not-found response; the exact October release is already tracked and no current-window qualifying replacement was verified. This remains an evidence limitation, not a claim that DeepSeek shipped nothing.
- **Moonshot.ai — no add.** Official surfaces checked: `https://platform.moonshot.ai/blog/posts/changelog`, `https://www.moonshot.ai/`, `https://x.com/Kimi_Moonshot`, `https://www.kimi.ai/blog/`, `https://www.kimi.ai/blog/kimi-k3-1-pro`, `https://platform.kimi.ai/docs/models`, `https://platform.kimi.ai/docs/guide/kimi-k3-1-pro-quickstart`. Kimi K3.1 Pro remains the latest relevant model; no later base line was verified. Highspeed/serving variants remain collapsed.
- **MiniMax — no add.** Official surfaces checked: `https://www.minimax.io/news`, `https://www.minimax.io/blog`, `https://www.minimax.io/blog/minimax-m31f`. The November 20 “Internal Model” cryptanalysis article explicitly describes an internal research model, not a public release; M3.1 Flash is already tracked. H3 image/audio/video and MiniMax Code product material were excluded.
- **Z.ai — no add; blog unavailable.** Official surfaces checked: `https://z.ai/blog`, `https://docs.z.ai/release-notes/new-released`. The blog returned 404; release notes stop at GLM-5.3-Flash on August 26 and expose no later qualifying base model. No model was inferred from the unavailable blog.
- **Xiaomi — no add.** Official surfaces checked: `https://github.com/XiaomiMiMo`, `https://huggingface.co/XiaomiMiMo`, `https://mimo.xiaomi.com/mimo-v2-6`. The November 21 MiMo-Code repository activity is a coding-agent harness, not a new model; MiMo-V2.6 model artifacts are outside the current window. Serving, audio, and distillation variants were excluded.
- **NVIDIA — no add.** Official surfaces checked: `https://build.nvidia.com/nvidia`, `https://huggingface.co/nvidia`, `https://huggingface.co/nvidia/NVIDIA-Nemotron-3.5-Super-VL-120B-A12B-BF16`, `https://huggingface.co/nvidia/NVIDIA-Nemotron-3.5-Bolt-74B-A9B-BF16`, `https://huggingface.co/nvidia/NVIDIA-Nemotron-Labs-Dory1.0-4B-BF16`. Current registry activity was quantization, Transcribe/speech, datasets, or deployment artifacts; no new programming/agentic base line was verified.
- **IFM — no add; access limited.** Official surfaces checked: `https://ifm.ai/k2/`, `https://ifm.ai/k2/press-release/`, `https://docs.ifm.ai/`, `https://ifm.ai/jais/`, `https://ifm.ai/jais3/press-release/`, `https://ifm.ai/blog/jais3/`, `https://docs.ifm.ai/#/jais-3`, `https://huggingface.co/collections/IFM/jais-3`. Current Hugging Face activity was quantization/checkpoint refreshes and latent-feedback checkpoints; no new base model. Several IFM web pages returned 403, so this is not an exhaustive absence claim.
- **Agnes AI — no add.** Official surfaces checked: `https://agnes-ai.com/`, `https://www.agnes-ai.com/zh-Hans/docs/agnes-30-flash`, `https://www.agnes-ai.com/zh-Hans/docs/agnes-25-pro-theta`, `https://platform.agnes-ai.com`, `https://github.com/AgnesAI-Labs`, `https://github.com/AgnesAI-Labs/Agnes-3.0-Qwen`, `https://huggingface.co/Agnes-AI`, `https://huggingface.co/Agnes-AI/Agnes-3.0-Qwen`. `Agnes-Video-H3-MoE` was published on November 20 but is a MiniMax-H3-derived video/audio fine-tune; it was skipped as derivative and modality-only.
- **InclusionAI — add one; explicit scope skips.** Official surfaces checked: `https://huggingface.co/inclusionAI`, `https://huggingface.co/inclusionAI/Ling-3.0-flash-VL`, `https://www.inclusion-ai.org/model`, `https://www.inclusion-ai.org/LLaDA-UI/`, `https://github.com/inclusionAI`, `https://x.com/AntLingAGI`, `https://huggingface.co/inclusionAI/Ling-3.0-flash-Sante`, `https://huggingface.co/inclusionAI/LingSante-3.1-flash`, `https://www.modelscope.cn/models/inclusionAI/LingSante-3.1-flash`, `https://huggingface.co/inclusionAI/LBS-27B`, `https://github.com/inclusionAI/UI-Venus/tree/LBS`. **Add:** `LingSante-3.1-flash`, release date `2026-11-22`, as a distinct `specialized-base` agentic healthcare model. The Hugging Face card documents long-horizon medical workflows, search/tool use, and general-purpose tool-using-agent development, but exposes no dated maker announcement or release-date field. The official ModelScope collection’s `2026.11.22` timestamp is therefore used as the public-availability registry fallback; the exact Artificial Analysis page independently states November 22. `LingSante-3.1-flash-MXFP4` was skipped as quantization; LingSante-Pulse, SingProbe, and other medical/probe artifacts were skipped as feature-extraction/adapter/guardrail rows. The two new official model surfaces and two targeted queries were added to `provider-release-sources.json`.
- **Inception — no add.** Official surfaces checked: `https://inceptionlabs.ai/`, `https://inceptionlabs.ai/blog/introducing-mercury-2-5`, `https://inceptionlabs.ai/blog/introducing-mercury-3`, `https://inceptionlabs.ai/models`, `https://docs.inceptionlabs.ai/get-started`. Mercury 3 remains the latest relevant model and is already tracked; Mercury Voice/Decide and platform offerings were excluded.
- **IBM Granite — no add.** Official surfaces checked: `https://research.ibm.com/blog/introducing-granite-4-2`, `https://www.ibm.com/granite`, `https://huggingface.co/ibm-granite`. Granite 4.2 is already tracked from August 25; recent speech/vision/quantized activity is modality or packaging, not a new qualifying base line.
- **LongCat — no add.** Official surfaces checked: `https://longcat.ai/`, `https://longcat.ai/blog/longcat-2.0`, `https://longcat.ai/blog/longcat-2.5`, `https://huggingface.co/meituan-longcat`, `https://github.com/meituan-longcat`. Recent activity was LongCat-DeepResearch harness/video artifacts; no new general programming/agentic base release was verified.
- **Thinking Machines — no add; baseline rechecked.** Official surfaces checked: `https://thinkingmachines.ai/`, `https://thinkingmachines.ai/news/inkling-2-small/`, `https://huggingface.co/blog/thinkingmachines-inkling`, `https://huggingface.co/thinkingmachines`, `https://huggingface.co/thinkingmachines/TML-d24-varloop-research`, `https://github.com/thinking-machines-lab`. `TML-d24-varloop-research` is the existing November 20 baseline row. `Inkling 2 Mini` is a current-window benchmark lead but is explicitly excluded as a Mini tier.
- **Arcee AI — no add.** Official surfaces checked: `https://arcee.ai/`, `https://arcee.ai/trinity`, `https://huggingface.co/arcee-ai`, `https://docs.arcee.ai/get-started/models-overview`. Trinity Preview/Mini/Nano registry activity has no qualifying maker release date and is excluded by preview/size policy.
- **Celeris — no add.** Official surfaces checked: `https://celeris.ai/`, `https://celeris.ai/celeris-1`, `https://celeris.ai/celeris-1-magnus`, `https://celeris.ai/blog`. No current-window model release was exposed; Celeris 1.1 Decision remains outside the window and is a hosted decision product.

### Explicitly missing labs

- **Amazon — no add; remains missing.** Official surfaces checked: `https://aws.amazon.com/about-aws/whats-new/`, `https://www.amazon.science/index.rss`. AWS’s November 20–21 entries were AWS Quick/Bedrock features and integrations, including Web Search; Amazon Science’s current RSS item was research/tooling. No Amazon Nova/base-model release was verified.
- **Cohere — no add; remains missing.** Official surfaces checked: `https://cohere.com/blog`, `https://docs.cohere.com/changelog`, `https://huggingface.co/CohereLabs`. Current material covered Rerank/Embed, Model Vault, product serving, or existing North/Mini Code families; no current-window qualifying base model was verified.
- **StepFun — no add; remains missing.** Official surfaces checked: `https://www.stepfun.com/`, `https://huggingface.co/stepfun-ai`. The official homepage still highlights Step 5 Preview; it is a preview/out-of-window line. No new qualifying base release was found.
- **AI21 Labs — unresolved/no add; remains missing.** Official surfaces checked: `https://www.ai21.com/blog`, `https://studio.ai21.com/`. The latest relevant item is Teel, an execution library dated November 5 and outside the window; no current-window Jamba/base-model announcement was exposed. Coverage remains incomplete rather than an exhaustive absence claim.

## Candidate ledger

| Candidate / lead | Provider | Release date evidence | Decision | Exact Artificial Analysis Coding Index |
|---|---|---|---|---|
| **LingSante-3.1-flash** | InclusionAI | Official HF model card; no dated maker announcement/card field; official ModelScope collection timestamp `2026.11.22` used as registry fallback; exact AA model page says released November 22, 2026 | **Add** one `specialized-base` row. Distinct healthcare-specialized model built on Ling-3.1-flash with separate training/post-training and explicit long-horizon/tool-using-agent scope. | **Unknown/null.** Exact AA page has N/A Intelligence and no Coding Index field; Easy Benchmarks exact aliases returned Model Not Found. |
| Inkling 2 Mini | Thinking Machines | AA catalog release `2026-11-20`; official HF card is a Mini tier | **Skip:** explicit Mini-tier exclusion. | Not checked/stored. |
| Tencent WePocketModel1.0-2B/4B | Tencent | Official HF activity/model cards, updated November 23; unified on-device vision-language/embedding/decision family | **Skip:** modality/application-focused; no programming/agentic base-line rationale. GGUF artifacts also excluded as quantization. | Unknown; no row. |
| LingSante-3.1-flash-MXFP4 | InclusionAI | HF/ModelScope model card identifies RTN MXFP4 post-training quantization of LingSante-3.1-flash | **Skip:** quantization of the added base family, not a second row. | Source-model scores are not used for the quantized row. |
| LingSante-Pulse-1.0 | InclusionAI | Official HF registry, November 20 creation | **Skip:** ECG/EEG/PPG/glucose feature-extraction model; modality/application-only. | Unknown; no row. |
| SingProbe / DeepSeek singprobe rows | InclusionAI | Official HF registry, November 19 creation | **Skip:** guardrail/probe/adapter attached to existing models, not a base release. | Unknown; no row. |
| Agnes-Video-H3-MoE | Agnes AI | Official HF card, November 20 creation | **Skip:** MiniMax-H3-derived video/audio fine-tune and modality-only artifact. | Unknown; no row. |
| Arcee Trinity Preview/Mini/Nano registry activity | Arcee AI | Official HF organization updates | **Skip:** preview/size variants without a qualifying maker release date. | Unknown; no row. |
| NVIDIA Transcribe GGUF / Qwen quantization | NVIDIA | Official HF registry activity November 20 | **Skip:** speech/quantization/deployment artifacts. | Unknown; no row. |
| IFM feedback/latent-feedback checkpoints | IFM | Official HF registry activity November 20–22 | **Skip:** research checkpoints/datasets, not public base model lines. | Unknown; no row. |
| MiniMax Internal Model (MIM) | MiniMax | Official MiniMax article, November 20 | **Skip:** explicitly internal-only research model. | Unknown; no row. |
| MiMo Code | Xiaomi | Official XiaomiMiMo GitHub activity November 21 | **Skip:** coding-agent harness powered by existing models. | Not checked/stored. |
| Amazon Web Search / AWS Quick updates | Amazon | Official AWS announcements November 20–21 | **Skip:** product features/integrations, not models. | Not checked/stored. |
| Cohere Model Vault/Rerank/Embed updates | Cohere | Official Cohere blog/changelog through November 4 | **Skip:** serving/product/retrieval models, not a programming/agentic base release in the window. | Not checked/stored. |
| Step 5 Preview | StepFun | Official homepage/model card, outside current window and preview-only | **Skip:** outside window and preview. | Unknown; no row. |
| Teel | AI21 Labs | Official AI21 article, November 5 | **Skip:** execution library, not a model and outside the window. | Unknown; no row. |

## Exact score and configuration audit

- **Rows added:** one — `LingSante-3.1-flash`, dated `2026-11-22`, `releaseCategory: "specialized-base"`, `focus: ["agentic"]`.
- **Rows with changed Coding Index:** none.
- **New Coding Index value:** none. The new row retains `codingIndex: null`; no sibling, family, medical benchmark, Intelligence Index, Coding Agent Index, Terminal-Bench, SWE-bench, or maker score was substituted.
- **New Intelligence Index value:** none. The exact AA page reports N/A, so `intelligenceIndex`, its configuration, and its source remain `null`.
- **Exact benchmark page:** `https://artificialanalysis.ai/models/lingsante-3-1-flash-1119` fetched directly with HTTP 200. The page identifies InclusionAI, says the model was released November 22, 2026, and exposes no exact dashboard Coding Index value.
- **Mirror/secondary evidence:** Easy Benchmarks was fetched directly for the exact candidate aliases and returned Model Not Found. No mirror-derived value was used.
- **Configuration:** not applicable because no exact Coding Index row/value was available. No `max`, `xhigh`, `high`, or other effort value was invented.
- **Alias policy:** the canonical maker/HF identity is `LingSante-3.1-flash`; `inclusionAI/LingSante-3.1-flash` and the AA catalog slug `lingsante-3-1-flash-1119` are aliases for the same row. `LingSante-3.1-flash-MXFP4` is a post-training quantization and is not a second row. The older `Ling-3.0-flash-Sante` remains a separate prior healthcare release.

## Evidence limits

- Search retrieval was bounded to one provider query per configured provider/missing lab (31 total), plus three narrow exact-candidate follow-ups. Empty search results were not treated as evidence of absence; direct official surfaces were used instead.
- Provider pages and registries are dynamic. Final Node smoke results varied with network availability: one bounded run checked 352 URLs with 301 HTTP 2xx responses and 51 non-2xx/network results; the only required-source issue was a transient network failure for the ModelScope URL. `web_extract` independently fetched the ModelScope base-card URL and returned HTTP 200 with the official collection date; the direct HF card and exact AA model page also fetched successfully.
- Known source limitations include IFM 403s, Jiutian 401/403s, xAI/X/Twitter and several provider network failures, the Z.ai blog 404, DeepSeek’s configured news-index 404, and stale Artificial Analysis 404s for older rows. These statuses do not prove permanent absence.
- Artificial Analysis was used for release-date/identity discovery and exact metric auditing. Its leaderboard’s visible table is Intelligence Index-oriented; the new row has no exact Coding Index value. The page’s `codingIndex` text in UI translations was not treated as a score.
- No user-provided screenshot or visual-only evidence was used. No mirror-derived score was stored.
- Alibaba’s earlier Qwen3.5 lead and AI21’s missing-lab coverage remain unresolved/limited; no unsupported row was added.

## Machine-readable refresh facts

```json
{
  "cutoff": "2026-11-23",
  "window": {"fromInclusive": "2026-11-20", "toInclusive": "2026-11-23"},
  "baseline": {
    "rows": 183,
    "uniqueModels": 183,
    "newestReleaseDate": "2026-11-20",
    "head": "13517d72fb82d38f71454f17b6d9b276c91de97a"
  },
  "newRows": [
    {
      "model": "LingSante-3.1-flash",
      "provider": "InclusionAI",
      "releaseDate": "2026-11-22",
      "releaseCategory": "specialized-base",
      "focus": ["agentic"],
      "codingIndex": null,
      "intelligenceIndex": null,
      "sourceUrl": "https://huggingface.co/inclusionAI/LingSante-3.1-flash",
      "aliases": ["LingSante-3.1-flash", "inclusionAI/LingSante-3.1-flash", "lingsante-3-1-flash-1119"]
    }
  ],
  "scoreEvidence": {
    "metric": "Artificial Analysis Coding Index",
    "exactModelUrl": "https://artificialanalysis.ai/models/lingsante-3-1-flash-1119",
    "retrieved": "2026-11-23",
    "codingIndex": "unknown",
    "configuration": "not applicable; no exact Coding Index row/value",
    "easyBenchmarksExactAlias": "Model Not Found",
    "mirror": "not used"
  },
  "finalVerification": {
    "rows": 184,
    "uniqueModels": 184,
    "newestReleaseDate": "2026-11-22",
    "configuredProviders": 27,
    "missingLabs": 4,
    "checklistHeadings": 31,
    "urlUnion": 352,
    "httpSmokeLastCompleted": {"checked": 352, "ok": 301, "non2xxOrNetwork": 51},
    "invariantErrors": []
  }
}
```

## Verification at edit stage

- **Expected final dataset:** 184 rows, 184 unique model names; newest `releaseDate` `2026-11-22`.
- **Cache key:** `20261123a` in `index.html`, the `src/app.js` model-data import, and the `src/app.js` dashboard-logic import.
- **Intended tracked paths:** `src/modelData.js`, `scripts/provider-release-sources.json`, `index.html`, `src/app.js`, `scripts/verify-model-refresh.mjs`, `tests/modelData.test.js`, `tests/staticAssets.test.js`, and this ledger. The pre-existing untracked screenshot remains untouched and uncommitted.
- **Tests:** `npm test` — **122 passed, 0 failed**.
- **Dataset/checklist invariants:** `node scripts/verify-model-refresh.mjs --cutoff=2026-11-23` — **184 rows**, **184 unique models**, newest `2026-11-22`, **27 configured providers**, **4 missing labs**, **31 checklist headings**, **352 URL union**, no invariant errors.
- **Provider checklist:** `node scripts/check-provider-releases.mjs --markdown` after the edit emitted **31 provider headings** and now defaults to `since 2026-11-22`.
- **Bounded HTTP smoke/source check:** one recorded run checked **352 URLs**, with **301 HTTP 2xx** and **51 non-2xx/network results**. A fresh-context rerun produced a different 2xx/non-2xx split because provider/network endpoints are unstable; counts are not treated as stable. The non-2xx/network results are documented above; the new HF source and exact Artificial Analysis page were among the successful required checks, while ModelScope’s URL was independently verified via direct page extraction after a transient Node fetch failure.
- **Diff hygiene:** final `git diff --check` and the full diff review are publication-gate checks after this ledger is added.
