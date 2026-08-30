# Model release and AA Coding Index audit — 2026-08-30

This is the reproducible evidence ledger for the dashboard refresh through **2026-08-30**. The release window was checked inclusively from the previous newest tracked date, **2026-08-13**, while a missed Meta release from 2026-08-09 was recovered during the configured/missing-lab sweep.

## Scope policy

Include base model lines and distinct specialized base lines relevant to programming or agentic work. Exclude preview-only configurations, mini/nano/lite tiers, app features, partner integrations, quantizations, and modality-only releases. Maker announcements/model cards take precedence for dates. Scores are the exact **Artificial Analysis Coding Index** values from the current AA embedded model dataset, not Intelligence Index values.

## Provider coverage and decisions

| Provider | Official surfaces checked | Decision through 2026-08-30 |
|---|---|---|
| OpenAI | [News](https://openai.com/news/), [API changelog](https://platform.openai.com/api/docs/changelog), [models](https://platform.openai.com/docs/models) | No new base line. Skipped Ultrafast service tier, Astra forthcoming mention, pricing, and integrations. |
| Anthropic | [News](https://www.anthropic.com/news), [release notes](https://platform.claude.com/docs/en/release-notes/overview), [models](https://platform.claude.com/docs/en/about-claude/models/overview) | No new model line. Skipped watermark, toolsets, and hardware standard. |
| Google | [Gemini changelog](https://ai.google.dev/gemini-api/docs/changelog), [model announcements](https://blog.google/innovation-and-ai/models-and-research/gemini-models/) | Added Gemini 3.7 Flash (2026-08-13). Skipped Transcribe/Live and Omni 1.1 as modality-only. |
| xAI | [News](https://x.ai/news), [models](https://docs.x.ai/developers/models) | Retained Grok 4.6 (2026-08-12). Later posts were partner/product integrations. |
| Cursor | [Blog](https://cursor.com/blog), [changelog RSS](https://cursor.com/changelog/rss.xml) | No Composer model release. |
| Mistral | [News RSS](https://mistral.ai/news/rss), [official models](https://huggingface.co/mistralai/models?sort=createdAt) | No model release. Agentic Search was tooling; HUMAIN was a partnership. |
| Alibaba | [Qwen blog](https://qwen.ai/blog), [QwenCloud models](https://www.qwencloud.com/models), [official models](https://huggingface.co/Qwen) | Added Qwen3.8-Flash (2026-08-26); skipped FP8/size derivatives. |
| DeepSeek | [Updates](https://api-docs.deepseek.com/updates), [GA announcement](https://api-docs.deepseek.com/news/news260813), [official model](https://huggingface.co/deepseek-ai/DeepSeek-V4-Pro-0813) | Added dated GA checkpoint DeepSeek-V4-Pro-0813. It supersedes the preview checkpoint and is distinct from the earlier 0424 row; the experimental Vision extension was skipped. |
| Moonshot.ai | [Kimi blog](https://www.kimi.ai/blog), [announcement forum](https://forum.moonshot.ai/c/announcement/5.json), [official models](https://huggingface.co/moonshotai) | No new Kimi base model; K3 Ollama/Cursor posts were integrations. |
| MiniMax | [Blog](https://www.minimax.io/blog), [official models](https://huggingface.co/MiniMaxAI) | No qualifying release; Music 3.0 was modality-only and Code Plugins were tooling. |
| Z.ai | [Release notes](https://docs.z.ai/release-notes/new-released), [GLM-5.3](https://docs.z.ai/guides/llm/glm-5.3), [GLM-5.3-Flash](https://docs.z.ai/guides/vlm/glm-5.3-flash) | Added GLM-5.3 (2026-08-18) and separately trained GLM-5.3-Flash (2026-08-26). |
| Xiaomi | [Official models](https://huggingface.co/XiaomiMiMo/models?sort=createdAt), [GitHub](https://github.com/XiaomiMiMo) | No new model; MiMo-Code activity was not a new checkpoint. |
| NVIDIA | [Build](https://build.nvidia.com/nvidia), [official models](https://huggingface.co/nvidia/models?sort=createdAt) | Added standalone Competition Coding teacher checkpoint (2026-08-14); collapsed teacher siblings and skipped conversions/adapters/modality assets. |
| Meta | [AI blog](https://ai.meta.com/blog/), [official models](https://huggingface.co/meta-models) | Added missed Muse-Glimmer-30B (2026-08-09), an official local autonomous/coding-agent base line. |
| Tencent | [UI-Mate](https://ui-mate.github.io/), [official models](https://huggingface.co/tencent), [GitHub](https://github.com/Tencent) | Added UI-Mate family (2026-08-16), collapsing 9B/27B. Skipped Hy4-preview and embedding models. |
| Amazon | [AWS releases](https://aws.amazon.com/about-aws/whats-new/recent/feed/), [Nova](https://aws.amazon.com/ai/generative-ai/nova/) | No qualifying Amazon/Nova release. |
| Cohere | [Changelog](https://docs.cohere.com/changelog), [blog](https://cohere.com/blog), [official models](https://huggingface.co/CohereLabs) | No qualifying release; Parse was a document-processing public beta. |
| StepFun | [Official models](https://huggingface.co/stepfun-ai/models?sort=createdAt), [GitHub](https://github.com/stepfun-ai) | No qualifying release. |
| AI21 Labs | [Changelog](https://docs.ai21.com/docs/changelog), [official models](https://huggingface.co/ai21labs) | No qualifying release. |

## Added release ledger

| Model | Date | Category | Coding Index | Release source | Score source/configuration |
|---|---:|---|---:|---|---|
| Muse-Glimmer-30B | 2026-08-09 | base | 49.0 | [Meta model card](https://huggingface.co/meta-models/Muse-Glimmer-30B) | [Muse Glimmer (high)](https://artificialanalysis.ai/models/muse-glimmer) |
| Grok 4.6 | 2026-08-12 | base | 76.8 | [xAI](https://x.ai/news/grok-4-6) | [high](https://artificialanalysis.ai/models/grok-4-6) |
| Gemini 3.7 Flash | 2026-08-13 | base | 76.1 | [Google](https://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-gemini-3-7-flash/) | [high](https://artificialanalysis.ai/models/gemini-3-7-flash) |
| DeepSeek-V4-Pro-0813 | 2026-08-13 | base | unknown | [DeepSeek GA](https://api-docs.deepseek.com/news/news260813) | Exact dated snapshot had no Coding Index; generic 0424 score was not copied. |
| NVIDIA-Nemotron-Labs-Teacher-Competition-Coding | 2026-08-14 | specialized-base | unknown | [NVIDIA model card](https://huggingface.co/nvidia/NVIDIA-Nemotron-Labs-Teacher-Competition-Coding) | No exact AA row. |
| UI-Mate | 2026-08-16 | specialized-base | unknown | [Tencent project](https://ui-mate.github.io/) | No exact AA row. |
| GLM-5.3 | 2026-08-18 | base | 74.8 | [Z.ai](https://docs.z.ai/guides/llm/glm-5.3) | [max](https://artificialanalysis.ai/models/glm-5-3) |
| GLM-5.3-Flash | 2026-08-26 | base | 71.5 | [Z.ai](https://docs.z.ai/guides/vlm/glm-5.3-flash) | [max/default](https://artificialanalysis.ai/models/glm-5-3-flash) |
| Qwen3.8-Flash | 2026-08-26 | base | 73.1 | [QwenCloud production model](https://www.qwencloud.com/models/qwen3.8-flash) | [Qwen3.8-Flash-Next](https://artificialanalysis.ai/models/qwen3-8-flash-next) |

Qwen’s official [Flash-Next model card](https://huggingface.co/Qwen/Qwen3.8-Flash-Next) maps the open architecture to the production `Qwen3.8-Flash` line. Therefore the AA Flash-Next configuration is attached to the canonical production row rather than added as a duplicate release.

## Current Coding Index audit

Retrieved **2026-08-30** from the embedded `codingIndex` records behind the [AA model leaderboard](https://artificialanalysis.ai/leaderboards/models); exact model pages below preserve aliases/configurations. The former dedicated Coding Index URL returned 404. Historical non-null scores were retained when AA’s current field became null.

| Dashboard model | Current value | Exact AA row/configuration |
|---|---:|---|
| Kimi K2.5 | 46.8 | [Reasoning](https://artificialanalysis.ai/models/kimi-k2-5) |
| MiniMax M2.7 | 52.6 | [default](https://artificialanalysis.ai/models/minimax-m2-7) |
| GPT-5.4 | 71.1 | [xhigh](https://artificialanalysis.ai/models/gpt-5-4) |
| GLM-5.1 | 55.8 | [Reasoning](https://artificialanalysis.ai/models/glm-5-1) |
| Kimi K2.6 | 61.8 | [Reasoning/default](https://artificialanalysis.ai/models/kimi-k2-6) |
| MiMo-V2.5-Pro | 60.2 | [Reasoning/default](https://artificialanalysis.ai/models/mimo-v2-5-pro) |
| Qwen3.7-Max | 66.0 | [default](https://artificialanalysis.ai/models/qwen3-7-max) |
| MiniMax M3 | 58.6 | [default](https://artificialanalysis.ai/models/minimax-m3) |
| NVIDIA Nemotron 3 Ultra 550B-A55B | 49.3 | [Reasoning](https://artificialanalysis.ai/models/nvidia-nemotron-3-ultra-550b-a55b) |
| DiffusionGemma | 19.7 | [26B A4B](https://artificialanalysis.ai/models/diffusiongemma-26b-a4b) |
| Qwen3.8-Max | 71.8 | [default](https://artificialanalysis.ai/models/qwen3-8-max) |
| GPT-5.6 Sol | 77.4 | [max](https://artificialanalysis.ai/models/gpt-5-6-sol) |
| GPT-5.6 Terra | 76.7 | [max](https://artificialanalysis.ai/models/gpt-5-6-terra) |
| GPT-5.6 Luna | 71.4 | [max](https://artificialanalysis.ai/models/gpt-5-6-luna) |

All other scored 2026 rows were checked against the same dataset. Eighteen matched their current one-decimal value. Five historical rows currently expose a null Coding Index; their existing historical scores were not erased. Exact aliases remained absent for Composer 1.5/2/2.5, Qwen-AgentWorld, Leanstral 1.5, Qwen3.7-Flash, and Gemini 3.5 Flash Cyber, so those rows remain unscored.
