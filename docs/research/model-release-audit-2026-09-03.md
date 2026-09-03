# Model release and AA Coding Index audit — 2026-09-03

This is the reproducible evidence ledger for the dashboard refresh performed on **2026-09-03**. Retrieval was cut off at **2026-09-03T01:42:37+02:00** (Europe/Amsterdam), so the 2026-09-03 calendar day is only partially covered.

## Baseline and research window

- **Target branch/remote:** `main` / `https://github.com/jgordijn/agentic-model-release-tracker.git`
- **Base commit:** `origin/main` at `0e45e440354f8b091aaff2c45c6d58082a43bb89`
- **Previous data commit:** `3e36912c21fb110b53f564c029d63dd86a021bcb` — `Refresh model releases through 2026-08-30`
- **Previous dataset baseline:** 116 rows; newest tracked `releaseDate` was `2026-08-26` (`Qwen3.8-Flash`)
- **Window:** inclusive `2026-08-27..2026-09-03`, with a targeted `2026-08-26` recheck and a backfill search for qualifying releases missed by the prior provider list.
- **Result:** five rows added; the dataset now contains 121 rows and its newest release date is `2026-09-02`.

## Scope and score policy

Include base model lines and distinct specialized-base lines relevant to programming or agentic work. Exclude preview-only configurations, mini/nano/lite tiers, application or product features, partner integrations, quantizations, and modality-only releases. Maker availability/release dates take precedence over benchmark listing dates and registry timestamps.

Scores are the exact **Artificial Analysis Coding Index** metric, not the Intelligence Index or a maker-reported benchmark. If no exact model/configuration row exists, the dashboard keeps the score `null`. Model-family variants are collapsed unless the source establishes a distinct model line or a separately meaningful dated release.

## Provider coverage and decisions

The provider checklist was run before the refresh. The configuration now contains 16 providers; the four explicit missing labs remain separate and unchanged.

| Provider | Official surfaces checked | Decision through the retrieval cutoff |
|---|---|---|
| OpenAI | [News RSS](https://openai.com/news/rss.xml), [models](https://platform.openai.com/docs/models), [API changelog](https://platform.openai.com/docs/changelog), [Astra post](https://openai.com/index/path-to-astra/) | **Skip.** The window contains operational/API changes; Astra is described as coming soon without a release date or production availability. |
| Anthropic | [Newsroom](https://www.anthropic.com/news), [Fable 5.1 announcement](https://www.anthropic.com/claude-fable-and-mythos-5-1), [Fable 5.1 model docs](https://docs.anthropic.com/docs/en/models/fable-5-1/overview) | **Add Claude Fable 5.1.** Mythos 5.1 is the same underlying model with restricted Project Glasswing safeguards and is not a separate row. |
| Google | [Gemini API changelog](https://ai.google.dev/gemini-api/docs/changelog), [Gemini 3.8 Flash docs](https://ai.google.dev/gemini-api/docs/models/gemini-3.8-flash), [DeepMind model card](https://deepmind.google/models/model-cards/gemini-3-8-flash/) | **Add Gemini 3.8 Flash.** Omni Flash and Transcribe/Live are modality-only; agentic video understanding is a feature on existing models. |
| Meta | [Meta AI blog](https://ai.meta.com/blog/), [Muse Spark 1.3 announcement](https://research.meta.ai/blog/introducing-muse-spark-1-3), [developer model page](https://developer.meta.com/ai/models/muse-spark/) | **Add Muse Spark 1.3.** It is released through Muse Code and Meta Model API for agentic and coding work. |
| Apodex | [Apodex home](https://www.apodex.com/), [Apodex 1.1 announcement](https://www.apodex.com/blog/apodex-1.1-scaling-agentic-intelligence-for-complex-work), [core model/API page](https://www.apodex.com/api) | **Add Apodex 1.1 as a newly discovered provider.** The maker describes a 397B raw LLM/API model with code execution, tool calling, long-horizon complex work, and software-engineering use. The 35B Mini sibling is excluded. |
| xAI | [News](https://x.ai/news), [model docs](https://docs.x.ai/docs/models), [release notes](https://docs.x.ai/docs/release-notes) | **Skip.** Grok Bot, app, and partner-availability updates do not introduce a new base model line. |
| Cursor | [Blog](https://cursor.com/blog), [changelog](https://cursor.com/changelog), [changelog RSS](https://cursor.com/changelog/rss.xml) | **Skip.** Self-hosted machines and cloud-agent updates are product changes; no new Composer model line was found. |
| Mistral | [News](https://mistral.ai/news), [news RSS](https://mistral.ai/news/rss), [official model registry](https://huggingface.co/api/models?author=mistralai&sort=createdAt&direction=-1&limit=100) | **Skip.** The latest news items are partnership/product content and no post-cutoff qualifying model was found. |
| Alibaba | [QwenCloud models](https://www.qwencloud.com/models), [Qwen3.8-Max-0902](https://www.qwencloud.com/models/qwen3.8-max-0902), [Qwen research](https://qwen.ai/research), [official registry](https://huggingface.co/api/models?author=Qwen&sort=createdAt&direction=-1&limit=100) | **Skip as a new row.** Qwen3.8-Max-0902 is explicitly an upgraded dated snapshot/alias of the existing canonical Qwen3.8-Max row, and no exact new AA row exists; it is recorded below as a material skip. |
| Tencent | [ContextPilot repository](https://github.com/Tencent/ContextPilot), [initial public release commit](https://github.com/Tencent/ContextPilot/commit/8496c869212d5a9f3730eb46120d4ae5bc6d2dfc), [ContextPilot HF card](https://huggingface.co/tencent/ContextPilot-14B), [Hy4-preview card](https://huggingface.co/tencent/Hy4-preview) | **Add ContextPilot.** **Skip Hy4-preview** because the maker calls it preview-only. |
| DeepSeek | [API updates](https://api-docs.deepseek.com/updates/#date-2026-08-21), [Vision-Exp HF card](https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash-Vision-Exp), [official registry](https://huggingface.co/api/models?author=deepseek-ai&sort=createdAt&direction=-1&limit=100) | **Skip.** DeepSeek V4 Flash Vision Exp was released on 2026-08-21; the later HF publication is delayed weights availability, not a new model release in this window. |
| Moonshot.ai | [Announcement feed](https://forum.moonshot.ai/c/announcement/5.json), [official registry](https://huggingface.co/api/models?author=moonshotai&sort=createdAt&direction=-1&limit=100) | **Skip.** The newest qualifying model announcement remains Kimi K3 on 2026-07-22. |
| MiniMax | [News](https://www.minimax.io/news), [blog](https://www.minimax.io/blog), [official registry](https://huggingface.co/api/models?author=MiniMaxAI&sort=createdAt&direction=-1&limit=100) | **Skip.** The 2026-08-26 item is financial news; no new qualifying model appeared afterward. |
| Z.ai | [Release notes](https://docs.z.ai/release-notes/new-released), [model API](https://z.ai/model-api), [official registry](https://huggingface.co/api/models?author=zai-org&sort=createdAt&direction=-1&limit=100) | **Skip.** GLM-5.3-Flash on 2026-08-26 is already tracked; no later qualifying line was found. |
| Xiaomi | [GitHub organization](https://github.com/XiaomiMiMo), [official registry](https://huggingface.co/api/models?author=XiaomiMiMo&sort=createdAt&direction=-1&limit=100) | **Skip.** Recent activity is code/repository maintenance, not a new model release. |
| NVIDIA | [NVIDIA model catalog](https://build.nvidia.com/nvidia), [official registry](https://huggingface.co/api/models?author=nvidia&sort=createdAt&direction=-1&limit=100), [DeepSeek NVFP4](https://huggingface.co/nvidia/DeepSeek-V4-Pro-0813-NVFP4), [Muse Glimmer NVFP4](https://huggingface.co/nvidia/Muse-Glimmer-30B-NVFP4) | **Skip.** Late registry items are quantized/conversion assets for already tracked models; no newer first-party base line was found. |
| Amazon *(explicitly missing lab)* | [AWS What's New RSS](https://aws.amazon.com/about-aws/whats-new/recent/feed/), [Amazon Nova](https://aws.amazon.com/ai/generative-ai/nova/), [official registry](https://huggingface.co/api/models?author=amazon&sort=createdAt&direction=-1&limit=100) | **Skip.** Window items are Bedrock/features or partner availability, not a new Amazon Nova base model. |
| Cohere *(explicitly missing lab)* | [Cohere changelog](https://docs.cohere.com/changelog), [Cohere blog](https://cohere.com/blog), [Tiny Aya HF card](https://huggingface.co/CohereLabs/tiny-aya-l2-thinker), [official registry](https://huggingface.co/api/models?author=CohereLabs&sort=createdAt&direction=-1&limit=100) | **Skip.** Parse is a document-parsing service; Tiny Aya L2 Thinker is a tiny multilingual research tier without programming/agentic scope. |
| StepFun *(explicitly missing lab)* | [StepFun site](https://www.stepfun.com/), [GitHub organization](https://github.com/stepfun-ai), [official registry](https://huggingface.co/api/models?author=stepfun-ai&sort=createdAt&direction=-1&limit=100) | **Skip.** No post-cutoff model; the newest listed flagship is Step-3.7-Flash from June. |
| AI21 Labs *(explicitly missing lab)* | [AI21 blog](https://www.ai21.com/blog/), [docs changelog](https://docs.ai21.com/changelog), [official registry](https://huggingface.co/api/models?author=ai21labs&sort=createdAt&direction=-1&limit=100) | **Bounded skip.** No post-cutoff model was found; the docs route was 404/blank and some blog access was partially constrained, so this is not an unlimited-completeness claim. |

## Added release ledger

| Model | Release date | Provider | Category | Coding Index | Maker source | Exact AA row/configuration |
|---|---:|---|---|---:|---|---|
| Apodex 1.1 | 2026-08-24 | Apodex | base | 60.8 | [Apodex 1.1 announcement](https://www.apodex.com/blog/apodex-1.1-scaling-agentic-intelligence-for-complex-work) | [Apodex 1.1](https://artificialanalysis.ai/models/apodex-1-1), raw `60.7552191704813`, no effort suffix |
| ContextPilot | 2026-08-30 | Tencent | specialized-base | unknown | [Tencent repository](https://github.com/Tencent/ContextPilot) | No exact AA row. [Initial public release commit](https://github.com/Tencent/ContextPilot/commit/8496c869212d5a9f3730eb46120d4ae5bc6d2dfc) dated `2026-08-30T17:09:10Z`; 8B, 14B, and E4B checkpoints collapsed. |
| Claude Fable 5.1 | 2026-09-01 | Anthropic | base | 81.6 | [Anthropic announcement](https://www.anthropic.com/claude-fable-and-mythos-5-1) | [Claude Fable 5.1](https://artificialanalysis.ai/models/claude-fable-5-1), `Adaptive Reasoning, Max Effort, Default Fallback`, raw `81.6028575391871` |
| Gemini 3.8 Flash | 2026-09-02 | Google | base | 76.3 | [Google API changelog](https://ai.google.dev/gemini-api/docs/changelog) | [Gemini 3.8 Flash](https://artificialanalysis.ai/models/gemini-3-8-flash), `high`, raw `76.2896206131225` |
| Muse Spark 1.3 | 2026-09-02 | Meta | base | 76.5 | [Meta AI Research announcement](https://research.meta.ai/blog/introducing-muse-spark-1-3) | [Muse Spark 1.3](https://artificialanalysis.ai/models/muse-spark-1-3-xhigh), `xhigh`, raw `76.4504438895825` |

### Selection notes

- **Apodex:** The maker announcement is dated Aug 24, so it is a backfill even though Artificial Analysis lists the benchmark release as Aug 30. The full 397B core/raw LLM API model is tracked; `Apodex 1.1 Mini` is excluded by the existing mini-tier rule.
- **ContextPilot:** The official repository has no GitHub Release object. Its official initial-public-release commit is the chosen maker chronology; HF `createdAt` timestamps on Aug 27 are registry timing. The official `ContextPilot-8B`, `ContextPilot-14B`, and `ContextPilot-E4B` cards are one specialized line that qualifies under the dashboard's agentic scope through long-horizon planning, memory, retrieval, offloading, and tool use. No score is inferred from related models.
- **Claude Fable 5.1:** Fable 5.1 is generally available for coding and long-running agentic work. Mythos 5.1 has the same underlying model and restricted safeguards, so it is not a duplicate dashboard row. The score uses the exact max-effort/default-fallback AA record.
- **Gemini 3.8 Flash:** Google documents the stable/GA `gemini-3.8-flash` endpoint for long-horizon software engineering and autonomous agents. The AA score uses the high-effort row, consistent with the existing Gemini 3.7 Flash convention.
- **Muse Spark 1.3:** Meta says the model is rolling out in Muse Code and Meta Model API; xhigh is currently released while max reasoning is forthcoming. The xhigh row is tracked; a separate max row is not added.

## Material skipped candidates

| Candidate | Evidence and decision |
|---|---|
| Qwen3.8-Max-0902 | [QwenCloud](https://www.qwencloud.com/models/qwen3.8-max-0902) calls it an upgraded snapshot/alias of the existing canonical Qwen3.8-Max row. It has no exact new AA row, so it is not duplicated as a family release. |
| Claude Mythos 5.1 | [Anthropic](https://www.anthropic.com/claude-fable-and-mythos-5-1) says Fable 5.1 and Mythos 5.1 are the same model with different safeguards; Mythos is restricted to Project Glasswing. No score is copied. |
| OpenAI Astra | [OpenAI](https://openai.com/index/path-to-astra/) describes a forthcoming model/safety effort; no release date or production availability. |
| DeepSeek-V4-Flash-Vision-Exp | [DeepSeek](https://api-docs.deepseek.com/updates/#date-2026-08-21) dates API availability to 2026-08-21, outside both the new window and the targeted Aug 26 recheck. The Aug 31 HF publication is delayed weights availability. |
| Gemini Omni Flash and Gemini 3.5 Transcribe/Live | [Google changelog](https://ai.google.dev/gemini-api/docs/changelog) identifies these as video-generation/editing or speech-transcription lines; they are modality-only under the dashboard policy. |
| Tencent Hy4-preview | [Official card](https://huggingface.co/tencent/Hy4-preview) explicitly calls the checkpoint preview-only; the FP8 sibling is also a quantization. |
| NVIDIA DeepSeek/Muse NVFP4 | The [DeepSeek NVFP4](https://huggingface.co/nvidia/DeepSeek-V4-Pro-0813-NVFP4) and [Muse Glimmer NVFP4](https://huggingface.co/nvidia/Muse-Glimmer-30B-NVFP4) cards are quantized versions of existing model lines, not new base models. |
| Cohere Parse | [Cohere](https://docs.cohere.com/changelog) dates Parse to Aug 27, but it is a document-parsing service/model, not a programming/agentic base line. |
| Cohere Tiny Aya L2 Thinker | The [HF card](https://huggingface.co/CohereLabs/tiny-aya-l2-thinker) is a tiny multilingual research model with no qualifying programming/agentic scope; tiny tiers are excluded. |

## Artificial Analysis audit and evidence limits

- Artificial Analysis is dynamic. The exact Coding Index evidence came from the embedded `codingIndex` records in the live [model leaderboard](https://artificialanalysis.ai/leaderboards/models), joined to exact model slugs. Direct model pages default to Intelligence Index text, so their visible Intelligence score was not substituted for Coding Index.
- The tracker stores one decimal, while this ledger preserves the retrieved raw values and exact configuration labels for the five scored additions. The values are not copied from the stale [Easy Benchmarks snapshot](https://easy-benchmarks.com/benchmarks/artificial_analysis_coding_index); that page was used only as a secondary cross-check.
- A separate parent audit compared existing scored rows against current embedded AA records: 21 exact score-source slugs matched their rounded stored values and 0 differences were detected. The remaining 34 scored rows use generic, historical, or secondary/unmatched provenance and were intentionally not changed in this refresh.
- Registry `createdAt` timestamps were not silently treated as maker release dates. ContextPilot uses the official initial-public-release commit; Apodex uses the dated maker announcement rather than AA's benchmark listing date.
- Search-result snippets were discovery hints only, never release/date/score evidence. The final day was partially elapsed at cutoff, and Alibaba/AI21 surfaces had dynamic or constrained portions; no coverage claim extends beyond the retrieved cutoff.
