# Model-release audit — 2026-10-15

## Baseline, window, and policy

- **Repository/branch:** `agentic-model-release-tracker`, `main` working tree; direct publication to `origin/main` is explicitly authorized. No worktree and no PR.
- **Remote:** `origin` → `https://github.com/jgordijn/agentic-model-release-tracker.git`.
- **HEAD / `origin/main` before this refresh:** `2bbe6b17b9b455fbd28a9c6d0629dbea367f74e9` — `feat(data): refresh model releases through 2026-10-13` (`2026-10-13T05:23:04Z`). This is also the last commit changing the dataset.
- **Working-tree baseline:** 149 rows, 149 unique model names; newest tracked maker `releaseDate` `2026-10-10` (`Agnes 3.0 Qwen`). The only pre-existing working-tree change was the untracked `screenshots/baseline-local.png`; it was left untouched. No unrelated tracked changes were present.
- **Research cutoff:** `2026-10-15T07:07:37+02:00` in `Europe/Amsterdam`.
- **Effective research window:** inclusive `2026-10-10` through `2026-10-15`. The `2026-10-10` boundary was rechecked without duplicating `Agnes 3.0 Qwen`.
- **Scope:** add only maker-released base model lines or clearly differentiated specialized-base lines relevant to programming or agentic work. Exclude product features, provider integrations, modality-only releases, quantizations, pure snapshots/checkpoints, API aliases, mini/nano/lite tiers, and preview-only configurations. A model announced as an available named line is not collapsed merely because one access surface labels the access mode preview; the access mode is recorded in the notes.
- **Score rule:** `codingIndex` is populated only from an exact Artificial Analysis Coding Index row for the exact model/configuration. Intelligence Index, Agentic Index, Terminal-Bench, SWE-bench, DeepSWE, SWE-Marathon, maker scores, and other metrics are not substitutes. Unknown exact Coding Index values remain `null` without `scoreSourceUrl`. The separate `intelligenceIndex` field remains metric-specific.

## Required pre-research checklist and retrieval method

- The required first external-research command was run before edits:
  `node scripts/check-provider-releases.mjs --markdown`.
  It derived `since 2026-10-10` from the pre-refresh dataset and emitted 26 configured providers plus 4 explicit missing labs (30 headings).
- One bounded discovery search was run for each configured provider and each explicit missing lab: 30 provider/lab queries total. Search results were treated only as discovery leads; repeated broad searching was not used.
- The configured official primary surfaces were fetched directly in a bounded pass: 89 unique URLs before the Meta discovery-config expansion, 81 returned 2xx and 8 returned known/non-2xx/access-limit responses. The newly discovered Meta official surfaces were then fetched/extracted directly and added to the checklist configuration.
- The live Artificial Analysis model leaderboard was fetched directly at `https://artificialanalysis.ai/leaderboards/models` (HTTP 200, 2,471,138 bytes). Its embedded catalog exposed the in-window Meta families `Muse Wonder` and `Muse Wonder Full`, both with catalog `releaseDate` `2026-10-12`; the maker source, not the AA catalog date, controls the dashboard date.
- Exact AA model pages were fetched for `Muse Wonder` and `Muse Wonder Full`. They expose Intelligence Index values 52 and 56 at `max`, respectively, and do not expose an exact Coding Index field. No Coding Index value was inferred from the maker's coding/agentic benchmark claims or from the Intelligence Index.
- Meta's official `https://www.meta.com/ai/` page dates the Muse Wonder release to **October 12, 2026** and links the exact official research announcement. The announcement introduces both named models and states their availability. `https://developer.meta.com/ai/` and `https://dev.meta.ai/models/muse-wonder` independently list the two distinct model IDs and their coding/agentic capabilities.

## Candidate ledger

| Candidate | Provider | Maker date | Official evidence | Scope / score decision |
|---|---|---:|---|---|
| Muse Wonder | Meta | 2026-10-12 | [Meta research announcement](https://research.meta.ai/blog/muse-wonder); [Meta AI homepage](https://www.meta.com/ai/); [Meta developer catalog](https://developer.meta.com/ai/); [developer model page](https://dev.meta.ai/models/muse-wonder) | **Add** as a `base` line. The maker names it separately, describes frontier coding, long-running agents, computer use, and availability through Meta Model API/Muse Code. Canonical API alias: `muse-wonder-1.0`. `codingIndex: null`; AA Intelligence Index `52` at `max` is stored separately. The API docs label access preview, but the named model is an available release rather than a preview-only configuration. |
| Muse Wonder Full | Meta | 2026-10-12 | Same official Meta announcement and developer model page; the developer page lists `muse-wonder-full-1.0` separately and makes it available to Muse Code subscribers. | **Add** as a distinct `base` line. Artificial Analysis exposes a separate family row, so the sibling is not collapsed and no score is copied. `codingIndex: null`; AA Intelligence Index `56` at `max` is stored separately. |
| Claude Haiku 5.5 | Anthropic | 2026-10-07 | Existing [Anthropic release](https://www.anthropic.com/claude-haiku-5-5) and [newsroom](https://www.anthropic.com/news) | **Keep existing boundary row; no duplicate.** No post-boundary Anthropic model release was verified. Oct 14 office/policy items are not models. |
| Grok Voice 3.0 | xAI | 2026-10-14 | [xAI news archive](https://x.ai/news) | **Skip:** voice-only modality release; the configured archive was Cloudflare-blocked in direct HTTP, but the extracted official archive exposed the title/date and the configured exclusion rule is decisive. |
| Muse Spark 1.3 updates | Meta | 2026-10-12 | [Meta model catalog](https://www.meta.com/ai/), [Meta developer catalog](https://developer.meta.com/ai/) | **Skip duplicate:** existing Muse Spark 1.3 family row; no new family or separate alias. |
| Step-5-Preview | StepFun | current HF activity in window | [StepFun Hugging Face organization](https://huggingface.co/stepfun-ai); configured [StepFun homepage](https://www.stepfun.com/) | **Skip:** maker-labeled preview-only model; BF16/NVFP4 artifacts are packaging/variants. The preview-only scope rule applies. |
| LongCat-2.5-Preview | LongCat | current home page | [LongCat home](https://longcat.ai/); [LongCat organization](https://huggingface.co/meituan-longcat) | **Skip:** explicitly labeled preview-only; no qualifying non-preview base release in the window. LongCat-DeepResearch is a research/harness system, not a new general base line. |
| MiniCPM5-1B | OpenBMB | 2026-05-26 | [OpenBMB release](https://github.com/OpenBMB/MiniCPM/releases) | **Skip:** outside the window and a size sibling of the tracked MiniCPM5 family; no duplicate size row. Current DSpark/vision artifacts are excluded checkpoints or modality variants. |
| Celeris-1 Decision | Celeris | 2026-10-08 | [Celeris blog](https://celeris.ai/blog) | **Skip:** outside the `2026-10-10` boundary and a decision-specialized product model rather than a new in-window programming/agentic base line. |
| Priming hybrid model zoo | Amazon | 2026-10-12 | [Amazon Science article](https://www.amazon.science/blog/can-we-change-an-ai-models-architecture-without-retraining-it-from-scratch); [Amazon Science RSS](https://www.amazon.science/index.rss) | **Skip:** research architecture/model zoo and released checkpoints, not a named Amazon Nova base model line for this dashboard. No new Amazon programming/agentic base family was verified. |
| North 2 | Cohere | 2026-10-05 | [Cohere announcement](https://cohere.com/blog/introducing-north-2) | **Skip:** outside the window and a model-agnostic enterprise platform/harness, not a base model release. Embed 5 and translation-only entries are also excluded. |
| AI21 coding-agent research | AI21 Labs | 2026-10-14 | [AI21 blog](https://www.ai21.com/blog) | **Skip:** research/evaluation articles, not a new Jamba or other qualifying model line. |
| All other candidates | All providers and missing labs | — | Official surfaces and one bounded discovery query per provider/lab, listed below | **No additional qualifying row verified.** Missing current leaderboard entries are not treated as deletion, age, or score decisions. |

## Added rows and score provenance

### Muse Wonder

- Canonical display name: `Muse Wonder`; alias checked: `muse-wonder-1.0`.
- Maker source: [Muse Wonder: A Frontier Model For Personal & Professional AI Agents](https://research.meta.ai/blog/muse-wonder).
- Availability/source corroboration: [Meta AI homepage](https://www.meta.com/ai/) (dated Oct 12, 2026) and [Meta developer catalog](https://developer.meta.com/ai/).
- Scope evidence: the maker explicitly describes frontier coding, long-running agents, advanced computer use, memory/focus, and multi-file software work.
- Artificial Analysis: [Muse Wonder model page](https://artificialanalysis.ai/models/muse-wonder), retrieved 2026-10-15, exact `Intelligence Index 52`, configuration `max`; the page has no exact Coding Index field.
- Stored values: `codingIndex: null`; `intelligenceIndex: 52`; `intelligenceIndexConfiguration: "max"`; `intelligenceIndexSourceUrl` is the exact AA model page; no `scoreSourceUrl`.

### Muse Wonder Full

- Canonical display name: `Muse Wonder Full`; alias checked: `muse-wonder-full-1.0`.
- Maker source: the same [official Muse Wonder announcement](https://research.meta.ai/blog/muse-wonder), which names Muse Wonder Full as a separate model and states it is available for Muse Code subscribers.
- Availability/source corroboration: [Meta developer model page](https://dev.meta.ai/models/muse-wonder) and [Meta developer catalog](https://developer.meta.com/ai/).
- Scope evidence: the maker calls it the most capable model in the series and documents coding, long-running agentic work, computer use, and critical developer workflows.
- Artificial Analysis: [Muse Wonder Full model page](https://artificialanalysis.ai/models/muse-wonder-full), retrieved 2026-10-15, exact `Intelligence Index 56`, configuration `max`; the page has no exact Coding Index field.
- Stored values: `codingIndex: null`; `intelligenceIndex: 56`; `intelligenceIndexConfiguration: "max"`; `intelligenceIndexSourceUrl` is the exact AA model page; no `scoreSourceUrl`.

No maker benchmark, DeepSWE, SWE-Marathon, Terminal-Bench, FrontierCode, Intelligence Index, or other non-Coding metric was copied into `codingIndex`. No sibling score was copied between the two Muse Wonder rows.

## Configured-provider coverage

Every configured provider was checked against its configured official surfaces and one bounded discovery path for the inclusive window. The entries below record the surfaces and the result.

- **OpenAI:** [news](https://openai.com/news/), [index](https://openai.com/index/), [API models](https://platform.openai.com/docs/models). The accessible API catalog and index showed product/safety material and existing GPT-6 family references; no new qualifying base line after the boundary. OpenAI archive pages were HTTP 403 in the direct pass; this limitation was not converted into a claim of absence.
- **Anthropic:** [newsroom](https://www.anthropic.com/news), [model docs](https://docs.anthropic.com/en/docs/about-claude/models). Haiku 5.5 remains the boundary release; Oct 14 policy/office items are not model releases.
- **Google:** [Gemini archive](https://blog.google/innovation-and-ai/models-and-research/gemini-models/), [developer news](https://blog.google/innovation-and-ai/technology/developers-tools/), [API models](https://ai.google.dev/gemini-api/docs/models). Gemini 4 Argon remains the latest qualifying line; no post-boundary model.
- **Meta:** [Hugging Face organization](https://huggingface.co/meta-models), [AI blog](https://ai.meta.com/blog/), newly registered [Meta AI homepage](https://www.meta.com/ai/), [Muse Wonder research announcement](https://research.meta.ai/blog/muse-wonder), newly registered [Meta developer catalog](https://developer.meta.com/ai/), and [exact developer model page](https://dev.meta.ai/models/muse-wonder). **Added Muse Wonder and Muse Wonder Full.** The new official surfaces were added to `provider-release-sources.json` with bounded queries.
- **OpenBMB:** [Hugging Face](https://huggingface.co/OpenBMB), [GitHub organization](https://github.com/OpenBMB), [MiniCPM releases](https://github.com/OpenBMB/MiniCPM/releases), and [repository](https://github.com/OpenBMB/MiniCPM). Recent activity is existing MiniCPM/DSpark/vision work; no in-window qualifying family.
- **Apodex:** [home](https://www.apodex.com/), [blog](https://www.apodex.com/blog/apodex-1.1-scaling-agentic-intelligence-for-complex-work), [API](https://www.apodex.com/api). No new qualifying model.
- **xAI:** [news](https://x.ai/news) and [developer models](https://docs.x.ai/developers/models). Grok Voice 3.0 is modality-only; the xAI archive was Cloudflare-blocked in direct HTTP and the extracted archive was used for the explicit skip.
- **Cursor:** [blog](https://cursor.com/blog). Recent entries are product/company material; no new Cursor model line.
- **Mistral:** [news](https://mistral.ai/news) and [model overview](https://docs.mistral.ai/getting-started/models/models_overview/). No post-boundary qualifying release.
- **Alibaba:** [legacy Qwen blog](https://qwenlm.github.io/blog), [Qwen blog](https://qwen.ai/blog), and [QwenCloud models](https://www.qwencloud.com/models). Qwen3.8-Max-0902 remains an upgraded snapshot; no new family.
- **Tencent:** [UI-Mate](https://ui-mate.github.io/), [Hugging Face organization](https://huggingface.co/tencent), and [GitHub organization](https://github.com/Tencent). Recent Youtu/EVIE/document and other modality activity is outside the scope.
- **DeepSeek:** [API news](https://api-docs.deepseek.com/news/) and [transparency center](https://www.deepseek.com/en/transparency/). The archive resolves to a docs landing page and the transparency center lists V4.0/V3.2 only; no in-window release verified.
- **Moonshot.ai:** [platform changelog](https://platform.moonshot.ai/blog/posts/changelog), [company site](https://www.moonshot.ai/), and [Kimi account](https://x.com/Kimi_Moonshot). Kimi K3 remains latest; no new line.
- **MiniMax:** [news](https://www.minimax.io/news) and [blog](https://www.minimax.io/blog). Current LLM navigation remains M3/M2.7/M2.5; recent H3/music/speech material is excluded.
- **Z.ai:** [blog](https://z.ai/blog) and [release notes](https://docs.z.ai/release-notes/new-released). The blog returned 404; release notes remain at GLM-5.3-Flash dated 2026-08-26. No in-window model.
- **Xiaomi:** [GitHub organization](https://github.com/XiaomiMiMo), [Hugging Face organization](https://huggingface.co/XiaomiMiMo), and [MiMo-V2.6](https://mimo.xiaomi.com/mimo-v2-6). MOPD/RL uploads are existing-family variants/checkpoints.
- **NVIDIA:** [NVIDIA catalog](https://build.nvidia.com/nvidia) and [Hugging Face](https://huggingface.co/nvidia). No in-window qualifying language/agent model; current entries are modality, maintenance, or deployment artifacts.
- **IFM:** [K2 home](https://ifm.ai/k2/), [press release](https://ifm.ai/k2/press-release/), and [docs](https://docs.ifm.ai/). Cloudflare blocked all three direct HTTP fetches; no new family was found through the bounded search and no absence claim is made.
- **Agnes AI:** [home](https://agnes-ai.com/), [existing docs](https://www.agnes-ai.com/zh-Hans/docs/agnes-30-flash), [platform](https://platform.agnes-ai.com), [GitHub organization](https://github.com/AgnesAI-Labs), [Agnes 3.0 Qwen GitHub](https://github.com/AgnesAI-Labs/Agnes-3.0-Qwen), [Hugging Face organization](https://huggingface.co/Agnes-AI), and [Qwen model card](https://huggingface.co/Agnes-AI/Agnes-3.0-Qwen). The 2026-10-10 Agnes row remains the latest; no duplicate.
- **InclusionAI:** [Hugging Face organization](https://huggingface.co/inclusionAI), [Ling model page](https://huggingface.co/inclusionAI/Ling-3.0-flash-VL), [model catalog](https://www.inclusion-ai.org/model), [LLaDA-UI](https://www.inclusion-ai.org/LLaDA-UI/), [GitHub](https://github.com/inclusionAI), and [Ant Ling](https://x.com/AntLingAGI). Ling 3.1 activity is an existing row update; no new family.
- **Inception:** [home](https://inceptionlabs.ai/), [blog](https://inceptionlabs.ai/blog), [Mercury 2.5](https://inceptionlabs.ai/blog/introducing-mercury-2-5), [models](https://inceptionlabs.ai/models), and [docs](https://docs.inceptionlabs.ai/get-started). No new model; voice remains excluded.
- **IBM Granite:** [Granite 4.2 announcement](https://research.ibm.com/blog/introducing-granite-4-2), [Granite](https://www.ibm.com/granite), and [Hugging Face](https://huggingface.co/ibm-granite). Recent IBM research items are not a new Granite programming/agentic base line.
- **LongCat:** [home](https://longcat.ai/), [LongCat-2.0](https://longcat.ai/blog/longcat-2.0), [Hugging Face](https://huggingface.co/meituan-longcat), and [GitHub](https://github.com/meituan-longcat). LongCat-2.5-Preview and DeepResearch are excluded; no new non-preview base line.
- **Thinking Machines:** [company site](https://thinkingmachines.ai/), [Inkling article](https://huggingface.co/blog/thinkingmachines-inkling), [Hugging Face](https://huggingface.co/thinkingmachines), and [GitHub](https://github.com/thinking-machines-lab). Later activity is infrastructure/repository maintenance.
- **Arcee AI:** [home](https://arcee.ai/), [Trinity](https://arcee.ai/trinity), [Hugging Face](https://huggingface.co/arcee-ai), and [model docs](https://docs.arcee.ai/get-started/models-overview). No new Trinity family release.
- **Celeris:** [home](https://celeris.ai/), [Celeris-1](https://celeris.ai/celeris-1), [Magnus](https://celeris.ai/celeris-1-magnus), and [blog](https://celeris.ai/blog). The Oct 8 Celeris-1 Decision is pre-window and decision-specialized; no in-window qualifying release.

## Explicitly missing-lab coverage

- **Amazon:** [AWS What's New](https://aws.amazon.com/about-aws/whats-new/) and [Amazon Science RSS](https://www.amazon.science/index.rss). The Oct 12 Priming research article is a hybrid-architecture/model-zoo research release, not a new Amazon Nova base line; AWS surface was DNS-inaccessible in the extraction pass and RSS was available.
- **Cohere:** [blog](https://cohere.com/blog), [release notes](https://docs.cohere.com/changelog), and [CohereLabs](https://huggingface.co/CohereLabs). North 2 is a platform/harness and outside the window; no qualifying model.
- **StepFun:** [homepage](https://www.stepfun.com/) and [Hugging Face](https://huggingface.co/stepfun-ai). Step-5-Preview activity is explicitly preview-only; no qualifying row.
- **AI21 Labs:** [blog](https://www.ai21.com/blog) and [Studio](https://studio.ai21.com/). Oct 14 coding-agent evaluation research is not a model release; Studio was DNS-inaccessible in extraction.

## Evidence limits and source-parity record

- Direct primary-surface limits: `https://ai.meta.com/blog/` timed out in the bounded Node fetch but the exact Meta developer/homepage/research surfaces were extracted successfully; OpenAI's two archive pages returned 403; xAI's archive returned 403/Cloudflare; IFM's three surfaces returned 403/Cloudflare; Z.ai's blog returned 404. These are recorded limitations, not negative release proofs.
- The Artificial Analysis live leaderboard was used for discovery and exact metric/configuration checks, never as the maker `sourceUrl`. The two new Meta rows have exact AA model pages for the separate Intelligence Index values but no exact Coding Index field.
- No mirror-derived Coding Index values were used. No user screenshot or undated cached value was treated as direct AA evidence.
- Meta's official research announcement, Meta AI homepage, and developer catalog provide primary release and scope evidence for both names. The developer docs expose `muse-wonder-1.0` and `muse-wonder-full-1.0`, while the AA catalog exposes separate family identities; this is why the rows are not collapsed.

## Result and final verification

- **Rows added:** 2 — `Muse Wonder`, `Muse Wonder Full`.
- **Provider checklist change:** Meta gained the official Meta AI homepage, research announcement, developer catalog, and exact developer model surface plus bounded Muse Wonder queries.
- **Expected final dataset:** 151 rows, 151 unique model names; newest maker date `2026-10-12`.
- **Cache key:** `20261015a` in `index.html`, `src/app.js`, and both module imports.
- **Intelligence scores added separately:** Muse Wonder `52` (`max`); Muse Wonder Full `56` (`max`), both from exact AA model pages.
- **Coding scores added:** none; both exact AA Coding Index values remain unknown.
- **`npm test`:** **101 passed, 0 failed**.
- **`git diff --check`:** passed.
- **Final provider checklist:** `node scripts/check-provider-releases.mjs --markdown` derived `since 2026-10-12` from the new latest release date and emitted 30 provider/lab headings (26 configured providers plus 4 explicit missing labs), followed by the explicit missing-labs section.
- **Dataset/provider invariants:** `node scripts/verify-model-refresh.mjs --cutoff=2026-10-15` reported **151 rows, 151 unique models, newest `2026-10-12`, 26 configured providers, 4 missing labs, 30 checklist headings, 280 URL union, and no invariant errors**.
- **Bounded HTTP smoke:** `node scripts/verify-model-refresh.mjs --cutoff=2026-10-15 --http` checked **280 URLs; 259 returned 2xx and 21 returned known/non-2xx limitations; no invariant errors**. The non-2xx set is limited to existing OpenAI/xAI/IFM access blocks, two known 404s (`Agnes 3.0 Flash` AA page and Z.ai blog), one OpenAI Help URL block, and other previously recorded provider/benchmark limitations; no new row depends on an unverified URL.
- **Fresh-context critical review:** the first read-only review found two non-data issues: this ledger had not yet recorded the final verification outputs, and the AA provenance comment omitted this refresh date. Both were fixed. A bounded fresh-context follow-up review returned **PASS** with no critical, important, or minor findings.
