# Model-release audit — 2026-11-24

## Baseline, window, and policy

- **Repository/branch:** `agentic-model-release-tracker`, direct `main` working tree; no worktree and no PR.
- **Remote:** `origin` → `https://github.com/jgordijn/agentic-model-release-tracker.git`.
- **HEAD / `origin/main` before this refresh:** `82d12557edbd6ec0017777cd3ab01e8b55a5cf70`, `feat(data): add LingSante 3.1 release`, committed `2026-11-23T06:36:19Z`.
- **Latest data commit before this refresh:** the same `82d12557...`; commit date and release-date boundary are recorded separately.
- **Working-tree baseline:** 184 rows, 184 unique model names; newest tracked `releaseDate` was `2026-11-22` (`LingSante-3.1-flash`). The pre-existing untracked `screenshots/baseline-local.png` was left untouched. No unrelated tracked changes were present at start.
- **Research cutoff:** inclusive through `2026-11-24` in `Europe/Amsterdam`; the run started at `2026-11-24T07:00:42+01:00`.
- **Current research window:** inclusive `2026-11-22` through `2026-11-24`, using the newest tracked `releaseDate` as the lower boundary. The `LingSante-3.1-flash` baseline row was rechecked rather than duplicated.
- **Scope:** add only maker-released base model lines or clearly differentiated specialized-base lines relevant to programming or agentic work. Exclude product features, provider integrations, modality-only releases, quantizations, pure snapshots/checkpoints, API aliases, mini/nano/lite tiers, preview-only configurations, speed/serving variants, and fine-tuned decision/product artifacts. A canonical model whose name contains `air` is eligible only when the official evidence establishes a distinct full base-model line rather than a lightweight tier; `Ling-3.2-air` meets that exception with 124B total / 5.5B active parameters and separate training/evaluation identity.
- **Metric rule:** `codingIndex` is populated only from an exact Artificial Analysis Coding Index row for the exact model/configuration. Intelligence Index, Coding Agent Index, FrontierCode, Terminal-Bench, SWE-bench, medical benchmarks, maker scores, and other metrics are never substituted. Unknown exact Coding Index values remain `null`. Intelligence Index is stored only in its separate fields when the exact AA model page exposes it.

## Required checklist and bounded retrieval

- The required pre-research command ran before external research: `node scripts/check-provider-releases.mjs --markdown`. Before the edit it derived `since 2026-11-22` and emitted 31 provider headings: 27 configured providers plus 4 explicit missing labs. After the edit it emitted 31 headings and now derives `since 2026-11-23`.
- One bounded targeted web-search query was run for each configured provider/missing lab: **31 provider searches**. Search snippets were discovery leads only. No second broad sweep was launched.
- Direct official source scans covered the configured primary surfaces. The pre-edit config contained 134 unique primary URLs; the refresh adds the two exact Ling-3.2-air HF/ModelScope surfaces, for 136 configured primary URLs after the edit.
- The Artificial Analysis model leaderboard was fetched directly and its embedded release catalog was parsed for discovery. In the inclusive window it exposed the existing `LingSante-3.1-flash` release dated `2026-11-22` and the new `Ling-3.2-air` release dated `2026-11-23`. `Inkling 2 Mini` was also visible but is a `Mini` tier and its release date is `2026-11-20`, outside the current window. `MiniCPM5-1B` was visible as an older `2026-05-25` OpenBMB release, outside the window and a size variant of the existing MiniCPM family.
- Official Hugging Face organization API scans were used as registry fallbacks for Meta, OpenBMB, Tencent, NVIDIA, Agnes AI, InclusionAI, IBM Granite, LongCat, Thinking Machines, Arcee AI, Cohere, StepFun, and Xiaomi. Recent timestamps were reconciled against model creation dates; modified quantizations, checkpoints, and existing cards were not treated as new releases.
- The post-edit invariant URL union contains 355 URLs, below the verifier budget of 360. The bounded HTTP smoke is run separately at the publication gate.

## Provider coverage and decisions

Every configured provider and explicit missing lab below was checked against its configured official source set and one bounded discovery query. “No add” means no new qualifying row in the current window; it does not mean every dynamic source was perfectly extractable.

### Configured providers

- **OpenAI — no add.** Official surfaces checked: `https://openai.com/news/`, `https://openai.com/index/`, `https://platform.openai.com/docs/models`. OpenAI’s current news/index surfaces showed the existing GPT-6.2 Astra/Sol release and product/Codex material, not a newer base model. Codex app/harness material was skipped as product/integration scope.
- **Anthropic — no add.** Official surfaces checked: `https://www.anthropic.com/news`, `https://www.anthropic.com/claude-fable-and-mythos-5-2`, `https://docs.anthropic.com/en/docs/about-claude/models`. The newsroom’s latest model announcement remains Claude Fable/Mythos 5.2 from November 9; the later newsroom/product/standards items are not model releases.
- **Google — no add.** Official surfaces checked: `https://blog.google/innovation-and-ai/models-and-research/gemini-models/`, `https://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-gemini-4-neon/`, `https://blog.google/innovation-and-ai/technology/developers-tools/`, `https://ai.google.dev/gemini-api/docs/models`. Gemini 4 Neon’s page has `datePublished` November 18 and `dateModified` November 23; the modification is not a new release. No later qualifying base line was verified.
- **Meta — no add.** Official surfaces checked: `https://huggingface.co/meta-models`, `https://ai.meta.com/blog/`, `https://www.meta.com/ai/`, `https://research.meta.ai/blog/muse-wonder`, `https://research.meta.ai/blog/muse-ember`, `https://developer.meta.com/ai/`, `https://dev.meta.ai/models/muse-wonder`, `https://dev.meta.ai/models/muse-spark-open`, `https://dev.meta.ai/models/muse-ember`. Recent registry/blog activity was existing Muse-family or packaging activity; no new release date was established.
- **OpenBMB — no add.** Official surfaces checked: `https://huggingface.co/OpenBMB`, `https://github.com/OpenBMB`, `https://github.com/OpenBMB/MiniCPM`. `MiniCPM5-1B` is an older May 25 release and a size variant of the existing MiniCPM5 family; recent repository activity was deployment/documentation activity. No current-window qualifying model was verified.
- **Apodex — no add.** Official surfaces checked: `https://www.apodex.com/`, `https://www.apodex.com/blog/apodex-1.1-scaling-agentic-intelligence-for-complex-work`, `https://www.apodex.com/api`. Apodex 1.1 remains the latest qualifying line; Mini, deep-research, product, benchmark, and integration material was excluded.
- **xAI — no add.** Official surfaces checked: `https://x.ai/news`, `https://docs.x.ai/developers/models`. The directly extracted news archive runs through November 11 product items and has no November 23–24 model release; the model docs identify Grok 4.7 as the current code model and were last updated September 21. Voice, image/video, Grok Bot product, partner, and Cursor-integration items were skipped.
- **Cursor — no add.** Official surface checked: `https://cursor.com/blog`. Composer 2/2.5 and current blog material were checked; editor/product/integration items do not create a new dashboard base-model row.
- **Mistral — no add.** Official surfaces checked: `https://mistral.ai/news`, `https://docs.mistral.ai/getting-started/models/models_overview/`. Mistral Large 4 remains the latest relevant tracked model; Studio, voice, time-series, platform, and partnership material was excluded.
- **Alibaba — no add.** Official surfaces checked: `https://qwenlm.github.io/blog`, `https://qwen.ai/blog`, `https://www.qwencloud.com/models`. Qwen Cloud’s current model marketplace lists existing Qwen4-Max and Qwen3.8-Flash lines; no newer qualifying release date was verified.
- **Tencent — no add; explicit scope skips.** Official surfaces checked: `https://ui-mate.github.io/`, `https://huggingface.co/tencent`, `https://github.com/Tencent`, `https://huggingface.co/tencent/Hy-Memory-30B-A3B`, `https://github.com/Tencent-Hunyuan/Hy-Memory`, `https://huggingface.co/tencent/Hy4-flash`, `https://github.com/Tencent-Hunyuan/Hy4-flash`, `https://modelscope.cn/models/Tencent-Hunyuan/Hy4-flash`, `https://cloud.tencent.com/product/hunyuan`, `https://cloud.tencent.com/document/product/1823/130051`. `OmniEVIE-4B` was created November 24 as a retrieval/feature-extraction model and was skipped as modality/application-focused. WeMM-Ecom cards were created November 18 and are e-commerce multimodal/fine-tuned families; later GGUF/GPTQ updates are packaging. Existing Hy4/Hy-Memory families were not duplicated.
- **China Mobile — no add.** Official surfaces checked: `https://www.10086.cn/aboutus/news/`, `https://www.10086.cn/aboutus/news/groupnews/index_detail_56169.html`, `https://jiutian.10086.cn/`, `https://jiutian.10086.cn/portal/common-helpcenter#/document/1181?platformCode=DMX_TYZX`, `https://www.modelscope.cn/models/ChinaMobile/JT-4.1-Flash-236B-A21B`. The official November 8 China Mobile article describes the Jiutian ecosystem and platform plans, not a new named base model; the ModelScope registry remains the JT-4.1 baseline. Jiutian’s access errors remain an evidence limitation for that surface.
- **DeepSeek — no add; configured news index unavailable.** Official surfaces checked: `https://api-docs.deepseek.com/news/`, `https://api-docs.deepseek.com/news/news261017`, `https://www.deepseek.com/en/transparency/`. The configured news index returned 404; the exact October release and transparency surface were available, and no current-window qualifying replacement was verified. No model was inferred from the unavailable index.
- **Moonshot.ai — no add.** Official surfaces checked: `https://platform.moonshot.ai/blog/posts/changelog`, `https://www.moonshot.ai/`, `https://x.com/Kimi_Moonshot`, `https://www.kimi.ai/blog/`, `https://www.kimi.ai/blog/kimi-k3-1-pro`, `https://platform.kimi.ai/docs/models`, `https://platform.kimi.ai/docs/guide/kimi-k3-1-pro-quickstart`. Kimi K3.1 Pro remains the latest relevant model; Highspeed/serving variants remain collapsed.
- **MiniMax — no add.** Official surfaces checked: `https://www.minimax.io/news`, `https://www.minimax.io/blog`, `https://www.minimax.io/blog/minimax-m31f`. No public current-window base-model release was verified; audio/video/image and MiniMax Code product material was excluded.
- **Z.ai — no add; blog unavailable.** Official surfaces checked: `https://z.ai/blog`, `https://docs.z.ai/release-notes/new-released`. The blog returned 404; release notes expose no later qualifying GLM base line. No model was inferred from the unavailable blog.
- **Xiaomi — no add.** Official surfaces checked: `https://github.com/XiaomiMiMo`, `https://huggingface.co/XiaomiMiMo`, `https://mimo.xiaomi.com/mimo-v2-6`. Recent MiMo-Code repository activity is a coding-agent harness, not a new model; serving/audio/distillation variants were excluded.
- **NVIDIA — no add.** Official surfaces checked: `https://build.nvidia.com/nvidia`, `https://huggingface.co/nvidia`, `https://huggingface.co/nvidia/NVIDIA-Nemotron-3.5-Super-VL-120B-A12B-BF16`, `https://huggingface.co/nvidia/NVIDIA-Nemotron-3.5-Bolt-74B-A9B-BF16`, `https://huggingface.co/nvidia/NVIDIA-Nemotron-Labs-Dory1.0-4B-BF16`. Current registry activity was quantization, reranking, speech, or deployment artifacts; no new programming/agentic base line was verified.
- **IFM — no add; web access limited but registry alternative checked.** Official surfaces checked: `https://ifm.ai/k2/`, `https://ifm.ai/k2/press-release/`, `https://docs.ifm.ai/`, `https://ifm.ai/jais/`, `https://ifm.ai/jais3/press-release/`, `https://ifm.ai/blog/jais3/`, `https://docs.ifm.ai/#/jais-3`, `https://huggingface.co/collections/IFM/jais-3`. The official Jais 3 collection is updated October 15 and exposes the already tracked family plus quantized/conversion variants; no current-window base release was verified. Several IFM web pages returned 403.
- **Agnes AI — no add.** Official surfaces checked: `https://agnes-ai.com/`, `https://www.agnes-ai.com/zh-Hans/docs/agnes-30-flash`, `https://www.agnes-ai.com/zh-Hans/docs/agnes-25-pro-theta`, `https://platform.agnes-ai.com`, `https://github.com/AgnesAI-Labs`, `https://github.com/AgnesAI-Labs/Agnes-3.0-Qwen`, `https://huggingface.co/Agnes-AI`, `https://huggingface.co/Agnes-AI/Agnes-3.0-Qwen`. No current-window qualifying model was verified; modality-only or derivative artifacts remain excluded.
- **InclusionAI — add one; explicit scope skips.** Official surfaces checked: `https://huggingface.co/inclusionAI`, `https://huggingface.co/inclusionAI/Ling-3.0-flash-VL`, `https://www.inclusion-ai.org/model`, `https://www.inclusion-ai.org/LLaDA-UI/`, `https://github.com/inclusionAI`, `https://x.com/AntLingAGI`, `https://huggingface.co/inclusionAI/Ling-3.0-flash-Sante`, `https://huggingface.co/inclusionAI/LingSante-3.1-flash`, `https://huggingface.co/inclusionAI/Ling-3.2-air`, `https://www.modelscope.cn/models/inclusionAI/LingSante-3.1-flash`, `https://www.modelscope.cn/models/inclusionAI/Ling-3.2-air`, `https://huggingface.co/inclusionAI/LBS-27B`, `https://github.com/inclusionAI/UI-Venus/tree/LBS`. **Add:** `Ling-3.2-air`, release date `2026-11-23`, as a distinct `base` agentic/programming model. The HF card documents workflow automation, professional-document reasoning, tool-call parsers, and terminal-task evaluation. The HF registry `createdAt` marker and ModelScope date corroborate public availability. LingSante MXFP4/air-VL and other medical/probe/quantized artifacts were skipped. The two new official surfaces and two targeted queries were added to `provider-release-sources.json`.
- **Inception — no add.** Official surfaces checked: `https://inceptionlabs.ai/`, `https://inceptionlabs.ai/blog/introducing-mercury-2-5`, `https://inceptionlabs.ai/blog/introducing-mercury-3`, `https://inceptionlabs.ai/models`, `https://docs.inceptionlabs.ai/get-started`. Mercury 3 remains the latest relevant model; Mercury Voice/Decide and platform offerings were excluded.
- **IBM Granite — no add.** Official surfaces checked: `https://research.ibm.com/blog/introducing-granite-4-2`, `https://www.ibm.com/granite`, `https://huggingface.co/ibm-granite`. Granite 4.2’s page is published August 25 and was only modified later; recent speech/vision/quantized activity is not a new qualifying base line.
- **LongCat — no add.** Official surfaces checked: `https://longcat.ai/`, `https://longcat.ai/blog/longcat-2.0`, `https://longcat.ai/blog/longcat-2.5`, `https://huggingface.co/meituan-longcat`, `https://github.com/meituan-longcat`. No current-window general programming/agentic base release was verified.
- **Thinking Machines — no add; baseline rechecked.** Official surfaces checked: `https://thinkingmachines.ai/`, `https://thinkingmachines.ai/news/inkling-2-small/`, `https://huggingface.co/blog/thinkingmachines-inkling`, `https://huggingface.co/thinkingmachines`, `https://huggingface.co/thinkingmachines/TML-d24-varloop-research`, `https://github.com/thinking-machines-lab`. `TML-d24-varloop-research` remains the November 20 baseline. `Inkling 2 Mini` is outside the window and explicitly excluded as a Mini tier.
- **Arcee AI — no add.** Official surfaces checked: `https://arcee.ai/`, `https://arcee.ai/trinity`, `https://huggingface.co/arcee-ai`, `https://docs.arcee.ai/get-started/models-overview`. Trinity Preview/Mini/Nano activity is excluded by preview/size policy and no current-window maker release was verified.
- **Celeris — no add.** Official surfaces checked: `https://celeris.ai/`, `https://celeris.ai/celeris-1`, `https://celeris.ai/celeris-1-magnus`, `https://celeris.ai/blog`. No current-window model release was exposed.

### Explicitly missing labs

- **Amazon — no add; remains missing.** Official surfaces checked: `https://aws.amazon.com/about-aws/whats-new/`, `https://www.amazon.science/index.rss`. Current AWS entries were product/features/integrations; no Amazon Nova/base-model release was verified.
- **Cohere — no add; remains missing.** Official surfaces checked: `https://cohere.com/blog`, `https://docs.cohere.com/changelog`, `https://huggingface.co/CohereLabs`. Tiny Aya cards were created in February and only modified now; current Rerank/Embed/serving material is not a new programming/agentic base release.
- **StepFun — no add; remains missing.** Official surfaces checked: `https://www.stepfun.com/`, `https://huggingface.co/stepfun-ai`. No current-window qualifying base release was found; preview/quantization/fine-tune material remains excluded.
- **AI21 Labs — no add; remains missing.** Official surfaces checked: `https://www.ai21.com/blog`, `https://studio.ai21.com/`. No current-window Jamba/base-model announcement was exposed; coverage is limited by the sparse configured surfaces, so absence is not claimed beyond the checked evidence.

## Candidate ledger

| Candidate / lead | Provider | Release-date evidence | Decision | Exact Artificial Analysis Coding Index |
|---|---|---|---|---|
| **Ling-3.2-air** | InclusionAI | HF registry `createdAt` `2026-11-23T03:55:12Z`; ModelScope page `dateModified` `2026-11-23`; AA exact page release date November 23, 2026 | **Add** one `base` row. Distinct 124B/5.5B-active model with workflow automation, document reasoning, tool-call parsers, and terminal-task evidence; the `air` name is not a lightweight tier. | **Unknown/null.** Exact AA model page exposes Intelligence Index only; Easy Benchmarks exact page is Model Not Found. |
| LingSante-3.1-flash | InclusionAI | Existing baseline row; official ModelScope/AA date November 22, 2026 | **Recheck only; no duplicate.** | Remains null; no exact Coding Index field. |
| Inkling 2 Mini | Thinking Machines | AA catalog release `2026-11-20`; official Mini family identity | **Skip:** outside current window and explicit Mini-tier exclusion. | Not stored. |
| MiniCPM5-1B | OpenBMB | AA catalog release `2026-05-25`; HF/GitHub family activity | **Skip:** outside window and size variant of the existing MiniCPM5 family. | Not stored. |
| Tencent OmniEVIE-4B | Tencent | HF registry created `2026-11-24`; retrieval/feature-extraction tags | **Skip:** modality/application-focused retrieval model, not a programming/agentic base line. | Unknown; no row. |
| Tencent WeMM-Ecom family and later GGUF/GPTQ cards | Tencent | Base family created November 18; later cards are packaging/quantization | **Skip:** outside window; e-commerce multimodal/fine-tuned family and quantizations. | Unknown; no row. |
| NVIDIA current registry updates | NVIDIA | Existing model cards modified November 23–24 | **Skip:** quantization, reranking, speech, or deployment artifacts; no new base model. | Unknown; no row. |
| InclusionAI LingSante MXFP4/air-VL and probes | InclusionAI | HF registry/model cards | **Skip:** quantizations, modality-only medical artifacts, feature-extraction/probe/adapter rows. | Unknown; no row. |
| Google Gemini 4 Neon page modification | Google | `datePublished` November 18; `dateModified` November 23 | **Skip:** metadata change, not a new release. | Existing row remains null. |
| IBM Granite 4.2 page modification | IBM Granite | `datePublished` August 25; later page modification | **Skip:** outside window; existing row. | Existing row remains null. |
| Provider product/integration leads (Codex app, Grok Bot, MiMo Code, AWS Web Search, Agent Skills, Composer/editor features) | Multiple | Official pages checked in the configured surfaces | **Skip:** product feature, harness, integration, or serving surface rather than a new base model line. | Not stored. |

## Exact score and configuration audit

- **Rows added:** one — `Ling-3.2-air`, dated `2026-11-23`, `releaseCategory: "base"`, `focus: ["agentic", "programming"]`.
- **Rows with changed Coding Index:** none.
- **New Coding Index value:** none. The new row retains `codingIndex: null`; no sibling, family, Intelligence Index, AutomationBench-AA, FrontierCode, Terminal-Bench, or maker score was substituted.
- **Separate Intelligence Index value:** `23`, exact Artificial Analysis model page `https://artificialanalysis.ai/models/ling-3-2-air`, representative configuration `default`/no suffix. This is stored only in `intelligenceIndex`, `intelligenceIndexConfiguration`, and `intelligenceIndexSourceUrl`; it is not a Coding Index.
- **Exact benchmark page:** `https://artificialanalysis.ai/models/ling-3-2-air` fetched directly with HTTP 200. The page identifies InclusionAI, states release November 23, 2026, reports Intelligence Index 23, and exposes no exact dashboard Coding Index field.
- **Mirror/secondary evidence:** `https://easy-benchmarks.com/models/ling-3-2-air` fetched directly and returned `Model Not Found`. No mirror-derived value was used.
- **Configuration:** no Coding Index configuration is applicable because no exact Coding Index row/value was available. No `max`, `xhigh`, `high`, or other effort value was invented.
- **Alias policy:** canonical maker/HF identity is `Ling-3.2-air`; `ling-3-2-air` is the AA slug and `inclusionAI/Ling-3.2-air` is the registry identifier. Quantized/packaged variants are not separate rows.

## Evidence limits

- Search retrieval was bounded to one provider query per configured provider/missing lab (31 total), plus exact-page/direct-registry follow-ups. Empty search results were not treated as proof of absence; configured official surfaces and registries were checked directly.
- Provider pages and registries are dynamic. Some configured Node fetches returned 403/401/404 or transient network errors, including IFM web pages, Jiutian, the DeepSeek news index, and the Z.ai blog. Alternative configured/official surfaces were used where available: the xAI archive and docs, the China Mobile official news article, the IFM Hugging Face collection, and exact model cards.
- Artificial Analysis was used for release identity, date, and metric auditing. The leaderboard/detail pages are Intelligence Index-oriented for this new row; the visible `codingIndex` UI translation text was not treated as a score.
- No user-provided screenshot or visual-only evidence was used. No mirror-derived score was stored.

## Machine-readable refresh facts

```json
{
  "cutoff": "2026-11-24",
  "window": {"fromInclusive": "2026-11-22", "toInclusive": "2026-11-24"},
  "baseline": {
    "rows": 184,
    "uniqueModels": 184,
    "newestReleaseDate": "2026-11-22",
    "head": "82d12557edbd6ec0017777cd3ab01e8b55a5cf70"
  },
  "newRows": [
    {
      "model": "Ling-3.2-air",
      "provider": "InclusionAI",
      "releaseDate": "2026-11-23",
      "releaseCategory": "base",
      "focus": ["agentic", "programming"],
      "codingIndex": null,
      "intelligenceIndex": 23,
      "intelligenceIndexConfiguration": "default",
      "sourceUrl": "https://huggingface.co/inclusionAI/Ling-3.2-air",
      "intelligenceIndexSourceUrl": "https://artificialanalysis.ai/models/ling-3-2-air",
      "aliases": ["Ling-3.2-air", "ling-3-2-air", "inclusionAI/Ling-3.2-air"]
    }
  ],
  "scoreEvidence": {
    "metric": "Artificial Analysis Coding Index",
    "exactModelUrl": "https://artificialanalysis.ai/models/ling-3-2-air",
    "retrieved": "2026-11-24",
    "codingIndex": "unknown",
    "configuration": "not applicable; no exact Coding Index row/value",
    "easyBenchmarksExactAlias": "Model Not Found",
    "mirror": "not used"
  },
  "finalInvariantTarget": {
    "rows": 185,
    "uniqueModels": 185,
    "newestReleaseDate": "2026-11-23",
    "configuredProviders": 27,
    "missingLabs": 4,
    "checklistHeadings": 31,
    "urlUnion": 355
  }
}
```

## Verification at edit stage

- **Expected final dataset:** 185 rows, 185 unique model names; newest `releaseDate` `2026-11-23`.
- **Cache key:** `20261124a` in `index.html`, the `src/app.js` model-data import, and the `src/app.js` dashboard-logic import.
- **Intended tracked paths:** `src/modelData.js`, `scripts/provider-release-sources.json`, `index.html`, `src/app.js`, `scripts/verify-model-refresh.mjs`, `tests/modelData.test.js`, `tests/staticAssets.test.js`, `.github/workflows/pages.yml`, and this ledger. The pre-existing untracked screenshot remains untouched and uncommitted.
- **Tests:** `npm test` — **123 passed, 0 failed**.
- **Dataset/checklist invariants:** `node scripts/verify-model-refresh.mjs --cutoff=2026-11-24` — **185 rows**, **185 unique models**, newest `2026-11-23`, **27 configured providers**, **4 missing labs**, **31 checklist headings**, **355 URL union**, no invariant errors.
- **Provider checklist:** `node scripts/check-provider-releases.mjs --markdown` after the edit emitted **31 provider headings** and now defaults to `since 2026-11-23`.
- **Diff hygiene:** `git diff --check` passed before the final full-diff/reviewer gate.
- **Alias audit:** a read-only normalized alias probe covered 83 aliases across 39 rows and found no cross-row collisions.
- **Bounded HTTP smoke/source check:** the latest `node scripts/verify-model-refresh.mjs --cutoff=2026-11-24 --http` run checked **355 URLs**, with **295 HTTP 2xx** and **60 non-2xx/network results**. The verifier exited non-zero because the concurrent Node fetch could not reach the required `https://www.modelscope.cn/models/inclusionAI/Ling-3.2-air` URL; the failure is transient/network-surface-specific, not a source-content failure. Targeted `curl -L` checks returned HTTP **200** with `text/html` for the new HF maker page, exact Artificial Analysis page, and ModelScope page; `web_extract` also fetched the ModelScope page. The remaining non-2xx results are known legacy 404/403/401 or intermittent provider/X/Twitter/network failures documented above; no unverified score or source claim depends on them.
- **Pages deployment recovery and live verification:** push run `45340648896` and manual run `45340878537` both passed the Pages test job but initially failed in `actions/deploy-pages@v5` because artifact metadata briefly reported zero artifacts for `github-pages`; a retry then reported two artifacts. `.github/workflows/pages.yml` now waits 20 seconds after `actions/upload-pages-artifact@v5` so metadata can settle. Follow-up commit `89f2fa82a8e1df6c49d7410f784c505239e6c4b3` produced run `45341254888`, whose test and deploy jobs both succeeded. Pages API reports `https://jgordijn.github.io/agentic-model-release-tracker/` as built. With cache-buster `?commit=89f2fa82a8e1df6c49d7410f784c505239e6c4b3`, the live HTML and all three JS assets returned HTTP 200; the deployed `modelData.js` contained 185 unique rows, newest `releaseDate` `2026-11-23`, `Ling-3.2-air`, and the exact AA URL, while `index.html`/`app.js` contained cache key `20261124a`.
