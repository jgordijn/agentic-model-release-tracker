# Model-release audit — 2026-11-21

## Baseline, window, and policy

- **Repository/branch:** `agentic-model-release-tracker`, direct `main` working tree; no worktree and no PR.
- **Remote:** `origin` → `https://github.com/jgordijn/agentic-model-release-tracker.git`.
- **HEAD / `origin/main` before this refresh:** `50135a8cdc31af358150cf30a9a47078fd373874`, `feat(data): add Gemini 4 Neon release`, committed `2026-11-19T06:21:05Z`.
- **Latest data commit before this refresh:** the same `50135a8...`; commit/update date and release-date boundary are recorded separately.
- **Working-tree baseline:** 182 rows, 182 unique model names; newest tracked `releaseDate` was `2026-11-18` (`Gemini 4 Neon`). The pre-existing untracked `screenshots/baseline-local.png` was left untouched. No unrelated tracked changes were present at start.
- **Research cutoff:** inclusive through `2026-11-21` in `Europe/Amsterdam`; the refresh ran on `2026-11-21` and the final local timestamp recorded was `2026-11-21T07:25:52+01:00`.
- **Current research window:** inclusive `2026-11-18` through `2026-11-21`, using the newest tracked `releaseDate` as the lower boundary. The baseline `Gemini 4 Neon` row was rechecked rather than duplicated.
- **Scope:** add only maker-released base model lines or clearly differentiated specialized-base lines relevant to programming or agentic work. Exclude product features, provider integrations, modality-only releases, quantizations, pure snapshots/checkpoints, API aliases, mini/nano/lite tiers, preview-only configurations, speed/serving variants, and fine-tuned decision/product artifacts.
- **Metric rule:** `codingIndex` is populated only from an exact Artificial Analysis Coding Index row for the exact model/configuration. Intelligence Index, Coding Agent Index, FrontierCode, Terminal-Bench, SWE-bench, maker scores, and other metrics are never substituted. Unknown exact Coding Index values remain `null`.

## Required checklist and bounded retrieval

- The required pre-research command ran before external research: `node scripts/check-provider-releases.mjs --markdown`. It derived `since 2026-11-18` and emitted 31 provider headings: 27 configured providers plus 4 explicit missing labs.
- One bounded targeted search query was run for each configured provider/missing lab by the read-only research pass: **31 provider searches**. Results were sparse/empty for most providers; no repeated broad sweep was launched. A narrow exact follow-up for `TML-d24-varloop-research` also returned no search result, so the model card—not a snippet—supplied the release evidence.
- The final configured source set contains 132 primary URLs (27 providers plus 4 missing labs). The final bounded HTTP smoke covered all of them as part of a 349-URL union of maker, benchmark, data-source, and checklist URLs.
- The live [Artificial Analysis model leaderboard](https://artificialanalysis.ai/leaderboards/models) was fetched directly for discovery and metric-shape checking. It exposes Intelligence Index rows, not an exact Coding Index row for the new candidate. No Artificial Analysis Coding Index value was inferred from the leaderboard.
- The exact [TML-d24-varloop-research Artificial Analysis page](https://artificialanalysis.ai/models/tml-d24-varloop-research) returned HTTP 404. No mirror value was used.
- The exact [Thinking Machines model card](https://huggingface.co/thinkingmachines/TML-d24-varloop-research) was fetched directly. It states **Date of release: Nov 20, 2026**, identifies Thinking Machines Lab as the provider, describes a variable-loop model distinct from Inkling 2 Mini, and includes separate Agentic Coding, tool-use, and long-horizon evaluation sections.

## Provider coverage and decisions

Every configured provider and explicit missing lab below was checked against its configured official source set and one bounded discovery query. The source URLs listed are the configured surfaces checked; direct extraction was used where available, while dynamic, probe-only, blocked, or redirected surfaces remain explicit evidence limits.

### Configured providers

- **OpenAI — no add.** Surfaces: `https://openai.com/news/`, `https://openai.com/index/`, `https://platform.openai.com/docs/models`. The November 18 Codex sandbox lead is a harness/security feature, not a model; no later qualifying base line was verified.
- **Anthropic — no add.** Surfaces: `https://www.anthropic.com/news`, `https://www.anthropic.com/claude-fable-and-mythos-5-2`, `https://docs.anthropic.com/en/docs/about-claude/models`. Fable/Mythos 5.2 remains the November 9 release already tracked; a newsroom presentation is not a new release.
- **Google — no add.** Surfaces: `https://blog.google/innovation-and-ai/models-and-research/gemini-models/`, `https://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-gemini-4-neon/`, `https://blog.google/innovation-and-ai/technology/developers-tools/`, `https://ai.google.dev/gemini-api/docs/models`. Gemini 4 Neon is the existing November 18 baseline row; no later qualifying model was verified.
- **Meta — no add.** Surfaces: `https://huggingface.co/meta-models`, `https://ai.meta.com/blog/`, `https://www.meta.com/ai/`, `https://research.meta.ai/blog/muse-wonder`, `https://research.meta.ai/blog/muse-ember`, `https://developer.meta.com/ai/`, `https://dev.meta.ai/models/muse-wonder`, `https://dev.meta.ai/models/muse-spark-open`, `https://dev.meta.ai/models/muse-ember`. Muse registry/card activity was treated as updates to existing families, not new releases; packaging and deployment variants were skipped.
- **OpenBMB — no add.** Surfaces: `https://huggingface.co/OpenBMB`, `https://github.com/OpenBMB`, `https://github.com/OpenBMB/MiniCPM`. The latest MiniCPM5-2B evidence is outside the window; current OCR/vision, packaging, and checkpoint activity did not establish a new qualifying line.
- **Apodex — no add.** Surfaces: `https://www.apodex.com/`, `https://www.apodex.com/blog/apodex-1.1-scaling-agentic-intelligence-for-complex-work`, `https://www.apodex.com/api`. Apodex 1.1 remains the latest qualifying line; Mini, Deep Research, product, benchmark, and harness material was excluded.
- **xAI — no add; archive access limited.** Surfaces: `https://x.ai/news`, `https://docs.x.ai/developers/models`. The news archive was HTTP 403 in the final smoke; the extracted listing and model docs showed no post-2026-11-18 qualifying model. Product and existing Grok-family material was not duplicated.
- **Cursor — no add.** Surface: `https://cursor.com/blog`. Projects multiplayer, Agent SDK, and other current entries are product/SDK/integration material, not a new Composer base model.
- **Mistral — no add.** Surfaces: `https://mistral.ai/news`, `https://docs.mistral.ai/getting-started/models/models_overview/`; the official RSS fallback `https://mistral.ai/news/rss` was also checked. No in-window base or specialized-base release was verified; Studio, voice, and time-series items were excluded.
- **Alibaba — no add; one unresolved lead.** Surfaces: `https://qwenlm.github.io/blog`, `https://qwen.ai/blog`, `https://www.qwencloud.com/models`, with the exact official fallback `https://qwen.ai/blog?id=qwen4-max` also checked. Qwen4 Max is pre-window and already tracked. A search lead resolving to `https://qwen.ai/blog/qwen3.5-release-2026` did not expose a dated model announcement or independently confirm a Qwen3.5 identity, so it remains **unresolved**, not an addition.
- **Tencent — no add.** Surfaces: `https://ui-mate.github.io/`, `https://huggingface.co/tencent`, `https://github.com/Tencent`, `https://huggingface.co/tencent/Hy-Memory-30B-A3B`, `https://github.com/Tencent-Hunyuan/Hy-Memory`, `https://huggingface.co/tencent/Hy4-flash`, `https://github.com/Tencent-Hunyuan/Hy4-flash`, `https://modelscope.cn/models/Tencent-Hunyuan/Hy4-flash`, `https://cloud.tencent.com/product/hunyuan`, `https://cloud.tencent.com/document/product/1823/130051`. Hy4 Flash was already tracked on November 17; Hy4 base/FP8 artifacts, video material, PlayCoder, and BrowserSkill were excluded as variants, modality, research, or integrations.
- **China Mobile — no add; Jiutian coverage incomplete.** Surfaces: `https://www.10086.cn/aboutus/news/`, `https://www.10086.cn/aboutus/news/groupnews/index_detail_56169.html`, `https://jiutian.10086.cn/`, `https://jiutian.10086.cn/portal/common-helpcenter#/document/1181?platformCode=DMX_TYZX`, `https://www.modelscope.cn/models/ChinaMobile/JT-4.1-Flash-236B-A21B`. JT-4.1 Flash remains the existing line. November 19 industrialization/news articles did not name a new base model; Jiutian returned 403/401 in the final smoke, so absence is not claimed as exhaustive.
- **DeepSeek — no add.** Surfaces: `https://api-docs.deepseek.com/news/`, `https://api-docs.deepseek.com/news/news261017`, `https://www.deepseek.com/en/transparency/`. V4.1 Flash 1017 is already tracked; API experience, harness, and serving activity are not new model families.
- **Moonshot.ai — no add.** Surfaces: `https://platform.moonshot.ai/blog/posts/changelog`, `https://www.moonshot.ai/`, `https://x.com/Kimi_Moonshot`, `https://www.kimi.ai/blog/`, `https://www.kimi.ai/blog/kimi-k3-1-pro`, `https://platform.kimi.ai/docs/models`, `https://platform.kimi.ai/docs/guide/kimi-k3-1-pro-quickstart`. Kimi K3.1 Pro remains the latest relevant line and is outside the window; high-speed/serving variants were collapsed.
- **MiniMax — no add.** Surfaces: `https://www.minimax.io/news`, `https://www.minimax.io/blog`, `https://www.minimax.io/blog/minimax-m31f`. The November 20 internal cryptanalysis model is not a public release; H3-Image and other audio/video/image material is modality-only or outside the window.
- **Z.ai — no add; blog unavailable.** Surfaces: `https://z.ai/blog`, `https://docs.z.ai/release-notes/new-released`. The blog returned 404 in the final smoke; release notes exposed no later qualifying base model. No model was inferred from the unavailable blog.
- **Xiaomi — no add.** Surfaces: `https://github.com/XiaomiMiMo`, `https://huggingface.co/XiaomiMiMo`, `https://mimo.xiaomi.com/mimo-v2-6`. MiMo Code activity is a coding-agent harness powered by existing MiMo models, not a new model family.
- **NVIDIA — no add.** Surfaces: `https://build.nvidia.com/nvidia`, `https://huggingface.co/nvidia`, `https://huggingface.co/nvidia/NVIDIA-Nemotron-3.5-Super-VL-120B-A12B-BF16`, `https://huggingface.co/nvidia/NVIDIA-Nemotron-3.5-Bolt-74B-A9B-BF16`, `https://huggingface.co/nvidia/NVIDIA-Nemotron-Labs-Dory1.0-4B-BF16`. Transcribe GGUF, Qwen quantization, and audio-visual artifacts were excluded; no later qualifying Nemotron base line was verified.
- **IFM — no add; access limited.** Surfaces: `https://ifm.ai/k2/`, `https://ifm.ai/k2/press-release/`, `https://docs.ifm.ai/`, `https://ifm.ai/jais/`, `https://ifm.ai/jais3/press-release/`, `https://ifm.ai/blog/jais3/`, `https://docs.ifm.ai/#/jais-3`, `https://huggingface.co/collections/IFM/jais-3`. IFM web pages returned 403 in the final smoke; alternate docs/registry evidence exposed no later qualifying release. This is an access limit, not proof of exhaustive absence.
- **Agnes AI — no add.** Surfaces: `https://agnes-ai.com/`, `https://www.agnes-ai.com/zh-Hans/docs/agnes-30-flash`, `https://www.agnes-ai.com/zh-Hans/docs/agnes-25-pro-theta`, `https://platform.agnes-ai.com`, `https://github.com/AgnesAI-Labs`, `https://github.com/AgnesAI-Labs/Agnes-3.0-Qwen`, `https://huggingface.co/Agnes-AI`, `https://huggingface.co/Agnes-AI/Agnes-3.0-Qwen`. Agnes-Video-H3-MoE is a derivative/adapter package for video/audio generation, not a programming/agentic base line.
- **InclusionAI — no add; explicit scope skips.** Surfaces: `https://huggingface.co/inclusionAI`, `https://huggingface.co/inclusionAI/Ling-3.0-flash-VL`, `https://www.inclusion-ai.org/model`, `https://www.inclusion-ai.org/LLaDA-UI/`, `https://github.com/inclusionAI`, `https://x.com/AntLingAGI`, `https://huggingface.co/inclusionAI/Ling-3.0-flash-Sante`, `https://huggingface.co/inclusionAI/LBS-27B`, `https://github.com/inclusionAI/UI-Venus/tree/LBS`. LingSante-Pulse is physiological signal extraction; SingProbe records are adapters/guardrails; neither is a new programming/agentic base line.
- **Inception — no add.** Surfaces: `https://inceptionlabs.ai/`, `https://inceptionlabs.ai/blog/introducing-mercury-2-5`, `https://inceptionlabs.ai/blog/introducing-mercury-3`, `https://inceptionlabs.ai/models`, `https://docs.inceptionlabs.ai/get-started`. Mercury 3 is outside the window and already tracked; voice/decision products were excluded.
- **IBM Granite — no add.** Surfaces: `https://research.ibm.com/blog/introducing-granite-4-2`, `https://www.ibm.com/granite`, `https://huggingface.co/ibm-granite`. Speech/ASR activity is modality-only and outside the window; Granite language families are already tracked.
- **LongCat — no add.** Surfaces: `https://longcat.ai/`, `https://longcat.ai/blog/longcat-2.0`, `https://longcat.ai/blog/longcat-2.5`, `https://huggingface.co/meituan-longcat`, `https://github.com/meituan-longcat`. LongCat-DeepResearch is a harness around LongCat-2.0, and video/avatar artifacts are modality-only/outside the window.
- **Thinking Machines — add one.** Surfaces: `https://thinkingmachines.ai/`, `https://thinkingmachines.ai/news/inkling-2-small/`, `https://huggingface.co/blog/thinkingmachines-inkling`, `https://huggingface.co/thinkingmachines`, the newly added exact card `https://huggingface.co/thinkingmachines/TML-d24-varloop-research`, and `https://github.com/thinking-machines-lab`. `Inkling 2 Mini` is a relevant November 20 lead but is explicitly excluded as a Mini tier. `TML-d24-varloop-research` is added as a distinct `specialized-base` row because the official card documents a variable-loop architecture, different later training/post-training, open weights, and separate agentic-coding/tool-use evaluations.
- **Arcee AI — no add.** Surfaces: `https://arcee.ai/`, `https://arcee.ai/trinity`, `https://huggingface.co/arcee-ai`, `https://docs.arcee.ai/get-started/models-overview`. Trinity Preview, Mini, and Nano registry updates have no maker release date and are excluded by preview/size policy.
- **Celeris — no add.** Surfaces: `https://celeris.ai/`, `https://celeris.ai/celeris-1`, `https://celeris.ai/celeris-1-magnus`, `https://celeris.ai/blog`. Celeris 1.1 Decision is outside the window and is a hosted decision product, not a qualifying general programming/agentic base line.

### Explicitly missing labs

- **Amazon — no add; remains missing.** Surfaces: `https://aws.amazon.com/about-aws/whats-new/` and `https://www.amazon.science/index.rss`; the AWS recent-announcements RSS fallback was also checked. Web Search on Bedrock and DevOps Agent updates are product features/integrations; the Amazon Science mathematics article is research/tooling, not a new Nova/base model.
- **Cohere — no add; remains missing.** Surfaces: `https://cohere.com/blog`, `https://docs.cohere.com/changelog`, `https://huggingface.co/CohereLabs`. Current leads concern North/platform, retrieval/video, or existing product families; no qualifying current-window base model was verified.
- **StepFun — no add; remains missing.** Surfaces: `https://www.stepfun.com/`, `https://huggingface.co/stepfun-ai`. Step 5 Preview and its NVFP4 artifact are outside the window and excluded as preview/quantization; no new qualifying release was found.
- **AI21 Labs — unresolved/no add; remains missing.** Surfaces: `https://www.ai21.com/blog`, `https://studio.ai21.com/`. Teel is an execution library outside the window, and no verifiable current-window Jamba/base-model announcement was exposed. This remains incomplete coverage rather than a claim of exhaustive absence.

## Candidate ledger

| Candidate / lead | Provider | Release date | Maker/source evidence | Decision and scope reason | Exact Artificial Analysis Coding Index |
|---|---|---:|---|---|---|
| Codex sandbox | OpenAI | 2026-11-18 | [Official article](https://openai.com/index/inside-the-codex-sandbox/) | **Skip:** harness/security feature, not a model. | Unknown; no model row checked. |
| Gemini 4 Neon | Google | 2026-11-18 | [Official announcement](https://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-gemini-4-neon/) | **Skip duplicate:** qualifying baseline row already present. | Unknown; exact AA page exposed Intelligence Index only. |
| Muse Glimmer 30B / Muse Spark Open registry activity | Meta | 2026-11-18 registry updates | [Glimmer card](https://huggingface.co/meta-models/Muse-Glimmer-30B), [Spark Open card](https://huggingface.co/meta-models/Muse-Spark-Open-816B-A42B) | **Skip:** existing cards/packaging updated; timestamps are not new release dates. | Unknown; maker metrics are not AA Coding Index. |
| Qwen3.5 exact-page search lead | Alibaba | Unknown | [Unresolved URL](https://qwen.ai/blog/qwen3.5-release-2026) resolved to generic/sparse Qwen content. | **Unresolved:** no dated announcement or independently confirmed model identity. | Not checked/stored. |
| Hy4 base / Hy4 FP8 artifacts | Tencent | 2026-11-18 registry timestamp only | [HF organization](https://huggingface.co/tencent) | **Skip:** existing family artifact/quantization; not a new base line. | Unknown. |
| No named new model in November 19 China Mobile industrialization items | China Mobile | 2026-11-19 | [News surface](https://www.10086.cn/aboutus/news/) | **Skip:** corporate/industrialization material without a new model identity. | Not checked/stored. |
| MiniMax Internal Model (MIM) | MiniMax | 2026-11-20 | [Official article](https://www.minimax.io/blog/practical-cryptanalysis-with-minimaxs-latest-internal-model) | **Skip:** internal-only research model, not a public release. | Unknown. |
| MiMo Code | Xiaomi | 2026-11-20 activity | [Official repository](https://github.com/XiaomiMiMo/MiMo-Code) | **Skip:** coding-agent harness powered by existing MiMo models. | Not checked/stored. |
| Nemotron 3.5 Transcribe GGUF | NVIDIA | 2026-11-20 registry update | [Official card](https://huggingface.co/nvidia/NVIDIA-Nemotron-3.5-Transcribe-30B-A4B-GGUF) | **Skip:** speech/transcription and GGUF packaging; not a new programming base line. | Unknown. |
| LingSante-Pulse-1.0 | InclusionAI | 2026-11-20 registry creation | [Official card](https://huggingface.co/inclusionAI/LingSante-Pulse-1.0) | **Skip:** ECG/EEG/PPG/glucose signal encoder and feature-extraction model. | Unknown. |
| Ling-3.1-flash-1019-singprobe | InclusionAI | 2026-11-19 registry creation | [Official card](https://huggingface.co/inclusionAI/Ling-3.1-flash-1019-singprobe) | **Skip:** streaming guardrail/probe attached to an existing base model. | Unknown. |
| DeepSeek-V4.1-Flash-1017-singprobe | InclusionAI | 2026-11-19 registry creation | [Official card](https://huggingface.co/inclusionAI/DeepSeek-V4.1-Flash-1017-singprobe) | **Skip:** adapter/guardrail attached to another provider's existing model. | Unknown. |
| Agnes-Video-H3-MoE | Agnes AI | 2026-11-20 | [Official card](https://huggingface.co/Agnes-AI/Agnes-Video-H3-MoE) | **Skip:** derivative Router/LoRA package and video/audio modality-only model. | Unknown. |
| LongCat-DeepResearch | LongCat | Unknown | [Official project](https://meituan-longcat.github.io/LongCat-DeepResearch/) | **Skip:** multi-agent research harness around LongCat-2.0, not a new base model. | Unknown. |
| Inkling 2 Mini | Thinking Machines | 2026-11-20 | [Official card](https://huggingface.co/thinkingmachines/Inkling-2-Mini) | **Skip:** relevant to coding/agents but explicitly a Mini tier. | Unknown; exact page exposed no AA Coding Index. |
| **TML-d24-varloop-research** | **Thinking Machines** | **2026-11-20** | [Official model card](https://huggingface.co/thinkingmachines/TML-d24-varloop-research) states the release date, open weights, variable-loop architecture, and agentic-coding/tool-use evaluations. | **Add one `specialized-base` row:** distinct later training and variable-loop behavior; not an alias, quantization, pure snapshot, or size-only variant. | **Unknown/null.** Exact [AA model URL](https://artificialanalysis.ai/models/tml-d24-varloop-research) returned 404; no exact Coding Index row/configuration was evidenced. |
| Web Search on Amazon Bedrock | Amazon | 2026-11-21 | [AWS announcement](https://aws.amazon.com/about-aws/whats-new/2026/11/web-search-amazon-bedrock/) | **Skip:** product feature/integration, not an Amazon model release. | Not checked/stored. |
| AWS DevOps Agent new chat capabilities | Amazon | 2026-11-20 | [AWS announcement](https://aws.amazon.com/about-aws/whats-new/2026/11/devops-agent-new-chat-capabilities/) | **Skip:** product feature, not a model. | Not checked/stored. |
| Amazon Science mathematics article | Amazon | 2026-11-18 | [Official article](https://www.amazon.science/blog/mathematical-proof-powered-by-ai-and-no-hallucinations) | **Skip:** research/tooling article without a new base-model release. | Not checked/stored. |
| Arcee Trinity Preview/Mini/Nano registry activity | Arcee AI | Unknown | [Official organization](https://huggingface.co/arcee-ai) | **Skip:** preview/size variants with update timestamps, not verified release dates. | Unknown. |
| Step 5 Preview / NVFP4 | StepFun | 2026-10-15 | [Official page](https://www.stepfun.com/step-5-preview), [HF artifact](https://huggingface.co/stepfun-ai/Step-5-Preview-NVFP4) | **Skip:** outside window; preview and quantization are excluded. | Unknown. |
| Teel | AI21 Labs | 2026-11-05 | [Official article](https://www.ai21.com/blog/teel-turbo-efficient-execution-library/) | **Skip:** execution library, not a model, and outside window. | Unknown. |

All other provider leads were either absent after the bounded search/source checks or were existing, out-of-window, product, modality, preview, adapter, quantization, or harness material. Their explicit no-add/unresolved decisions are recorded in the provider section above.

## Exact score and configuration audit

- **Rows added:** one — `TML-d24-varloop-research`, dated `2026-11-20`, `releaseCategory: "specialized-base"`.
- **Rows with changed Coding Index:** none.
- **New Coding Index values:** none. The new row retains `codingIndex: null`; no sibling, maker, Intelligence Index, DeepSWE, SWEBench, Terminal-Bench, or Coding Agent Index value was substituted.
- **New Intelligence Index values:** none. The exact AA URL for TML returned 404 and no Intelligence Index was stored either.
- **Mirror policy:** no mirror or aggregator score was used. The authoritative AA URL is retained in the row note as a failed exact-page lookup, not as a successful score source.
- **Alias/variant policy:** `TML-d24-varloop-research` is one canonical row. Its relationship to `Inkling 2 Mini` is documented as a distinct variable-loop/later-training model, while `Inkling 2 Mini` itself remains excluded for the explicit Mini-tier rule. Native NVFP4/MXFP8 precision in the card was not treated as a separate quantization release.

## Evidence limits

- Search retrieval was bounded to one configured discovery query per provider/missing lab (31 total), plus one narrow exact-candidate follow-up. Search snippets were discovery leads only and were not used as final maker evidence.
- Official pages and registries are dynamic. Some archives were client-rendered, redirected, probe-only, or blocked. The final HTTP smoke recorded these point-in-time limitations: Artificial Analysis 404s for existing stale model URLs (`agnes-3-0-flash`, `ling-3-1-flash-1019`); IFM pages 403; Jiutian 403/401; xAI news 403; China Mobile news network failure; and Z.ai blog 404. These statuses do not prove permanent absence.
- The Artificial Analysis leaderboard is a dynamic Intelligence Index page. It was used for discovery/configuration context only; it did not expose an exact Coding Index row for TML. The exact TML Artificial Analysis model URL returned 404.
- No user-provided screenshot or visual-only evidence was used. No mirror-derived score was stored.
- AI21 Labs remains an explicit missing lab with incomplete current coverage; Alibaba has one unresolved Qwen3.5 search lead. The audit does not claim exhaustive absence for those evidence-limited cases.
- No qualifying provider outside the existing 27-provider checklist was discovered. The newly added Thinking Machines exact model card is a new official release surface for an already configured provider, so its URL and targeted query were added to the provider checklist config.

## Machine-readable refresh facts

```json
{
  "cutoff": "2026-11-21",
  "window": {"fromInclusive": "2026-11-18", "toInclusive": "2026-11-21"},
  "baseline": {
    "rows": 182,
    "uniqueModels": 182,
    "newestReleaseDate": "2026-11-18",
    "head": "50135a8cdc31af358150cf30a9a47078fd373874"
  },
  "newRows": [
    {
      "model": "TML-d24-varloop-research",
      "provider": "Thinking Machines",
      "releaseDate": "2026-11-20",
      "releaseCategory": "specialized-base",
      "codingIndex": null,
      "intelligenceIndex": null,
      "sourceUrl": "https://huggingface.co/thinkingmachines/TML-d24-varloop-research"
    }
  ],
  "scoreEvidence": {
    "metric": "Artificial Analysis Coding Index",
    "exactModelUrl": "https://artificialanalysis.ai/models/tml-d24-varloop-research",
    "retrieved": "2026-11-21",
    "exactModelUrlStatus": 404,
    "codingIndex": "unknown",
    "mirror": "not used"
  },
  "finalVerification": {
    "rows": 183,
    "uniqueModels": 183,
    "newestReleaseDate": "2026-11-20",
    "configuredProviders": 27,
    "missingLabs": 4,
    "checklistHeadings": 31,
    "configuredPrimarySourceUrls": 132,
    "urlUnion": 349,
    "http2xx": 337,
    "httpNon2xxOrNetwork": 12,
    "invariantErrors": []
  }
}
```

## Verification at edit stage

- **Expected final dataset:** 183 rows, 183 unique model names; newest `releaseDate` `2026-11-20`.
- **Cache key:** `20261121a` in `index.html`, the `src/app.js` model-data import, and the `src/app.js` dashboard-logic import.
- **Intended tracked paths:** `src/modelData.js`, `scripts/provider-release-sources.json`, `index.html`, `src/app.js`, `scripts/verify-model-refresh.mjs`, `tests/modelData.test.js`, `tests/staticAssets.test.js`, and this ledger. The pre-existing untracked screenshot remains untouched and uncommitted.
- **Tests:** `npm test` — **122 passed, 0 failed**.
- **Diff hygiene:** `git diff --check` passed.
- **Provider checklist:** after the edit, `node scripts/check-provider-releases.mjs --markdown` emitted **31 provider headings** plus the `Explicitly missing labs` section marker; its default boundary is now `since 2026-11-20`.
- **Dataset/checklist invariants:** `node scripts/verify-model-refresh.mjs --cutoff=2026-11-21` confirmed **183 rows**, **183 unique models**, newest `2026-11-20`, **27 configured providers**, **4 missing labs**, **31 checklist headings**, URL union **349**, valid ISO dates, valid source URLs/categories, score-source invariants, and no invariant errors.
- **Bounded HTTP smoke/source check:** `node scripts/verify-model-refresh.mjs --cutoff=2026-11-21 --http` checked **349 URLs**: **337 returned 2xx** and **12 returned non-2xx/network results**, all documented above; no invariant errors occurred. The new official Thinking Machines model card passed the smoke.
