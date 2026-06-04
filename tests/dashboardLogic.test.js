import assert from "node:assert/strict";
import test from "node:test";

import {
  OPUS_45_CODING_THRESHOLD,
  applyFilters,
  buildChartSeries,
  calculateProjection,
  getProjectedChartPoints,
  groupByProvider,
  paginateRows,
  sortReleases,
  summarizeReleases,
} from "../src/dashboardLogic.js";

const sampleModels = [
  {
    model: "Claude Opus 4.5",
    provider: "Anthropic",
    group: "Frontier labs",
    releaseDate: "2025-11-24",
    codingIndex: 47.8,
    focus: ["agentic", "programming"],
  },
  {
    model: "GPT-5.5",
    provider: "OpenAI",
    group: "Frontier labs",
    releaseDate: "2026-04-23",
    codingIndex: 59.1,
    focus: ["agentic", "programming"],
  },
  {
    model: "Qwen3.7 Max",
    provider: "Alibaba",
    group: "Chinese+Other",
    releaseDate: "2026-05-19",
    codingIndex: 50.1,
    focus: ["programming"],
  },
  {
    model: "Mistral Medium 3",
    provider: "Mistral",
    group: "Chinese+Other",
    releaseDate: "2025-05-07",
    codingIndex: null,
    focus: ["programming"],
  },
];

test("applyFilters narrows by group, provider, score floor, and scored-only mode", () => {
  const filtered = applyFilters(sampleModels, {
    group: "Chinese+Other",
    providers: ["Alibaba", "Mistral"],
    minScore: OPUS_45_CODING_THRESHOLD,
    scoredOnly: true,
    after: "2026-01-01",
    before: "2026-12-31",
  });

  assert.deepEqual(
    filtered.map((item) => item.model),
    ["Qwen3.7 Max"],
  );
});

test("applyFilters returns all rows when no filters are active", () => {
  assert.equal(applyFilters(sampleModels).length, sampleModels.length);
});

test("applyFilters treats a zero score floor as no score filter", () => {
  assert.equal(applyFilters(sampleModels, { minScore: 0 }).length, sampleModels.length);
});

test("applyFilters excludes unscored and low-scoring models at a score floor", () => {
  const filtered = applyFilters(sampleModels, {
    minScore: OPUS_45_CODING_THRESHOLD,
  });

  assert.deepEqual(
    filtered.map((item) => item.model),
    ["Claude Opus 4.5", "GPT-5.5", "Qwen3.7 Max"],
  );
});

test("applyFilters excludes non-selected providers", () => {
  const filtered = applyFilters(sampleModels, {
    providers: ["OpenAI"],
  });

  assert.deepEqual(
    filtered.map((item) => item.model),
    ["GPT-5.5"],
  );
});

test("applyFilters excludes rows outside date bounds", () => {
  assert.deepEqual(
    applyFilters(sampleModels, { after: "2026-06-01" }).map((item) => item.model),
    [],
  );
  assert.deepEqual(
    applyFilters(sampleModels, { before: "2025-01-01" }).map((item) => item.model),
    [],
  );
});

test("applyFilters excludes unscored rows when scoredOnly is active", () => {
  assert.deepEqual(
    applyFilters(sampleModels, { scoredOnly: true }).map((item) => item.model),
    ["Claude Opus 4.5", "GPT-5.5", "Qwen3.7 Max"],
  );
});

test("summarizeReleases handles datasets without scored models", () => {
  const summary = summarizeReleases(
    [
      {
        model: "Unscored",
        provider: "Mistral",
        group: "Chinese+Other",
        releaseDate: "2026-01-01",
        codingIndex: null,
        focus: ["programming"],
      },
    ],
    "2026-06-04",
  );

  assert.equal(summary.best, null);
  assert.equal(summary.qualified, 0);
  assert.equal(summary.scored, 0);
});

test("summarizeReleases reports totals, YTD, qualified count, and best model", () => {
  const summary = summarizeReleases(sampleModels, "2026-06-04");

  assert.equal(summary.total, 4);
  assert.equal(summary.ytd, 2);
  assert.equal(summary.qualified, 3);
  assert.equal(summary.scored, 3);
  assert.equal(summary.best.model, "GPT-5.5");
  assert.equal(summary.threshold, OPUS_45_CODING_THRESHOLD);
});

test("calculateProjection extrapolates current-year releases to a full year", () => {
  const projection = calculateProjection(sampleModels, "2026-06-04");

  assert.equal(projection.currentYear, 2026);
  assert.equal(projection.ytd, 2);
  assert.equal(projection.projected, 5);
  assert.equal(projection.daysElapsed, 155);
});

test("calculateProjection handles leap years", () => {
  const projection = calculateProjection(
    [
      {
        model: "Leap Model",
        provider: "OpenAI",
        group: "Frontier labs",
        releaseDate: "2024-01-01",
        codingIndex: 10,
        focus: ["programming"],
      },
    ],
    "2024-12-31",
  );

  assert.equal(projection.daysInYear, 366);
  assert.equal(projection.projected, 1);
});

test("calculateProjection handles century years that are not leap years", () => {
  const projection = calculateProjection(
    [
      {
        model: "Century Model",
        provider: "OpenAI",
        group: "Frontier labs",
        releaseDate: "2100-01-01",
        codingIndex: 10,
        focus: ["programming"],
      },
    ],
    "2100-12-31",
  );

  assert.equal(projection.daysInYear, 365);
  assert.equal(projection.projected, 1);
});

test("calculateProjection handles century years that are leap years", () => {
  const projection = calculateProjection(
    [
      {
        model: "Millennium Model",
        provider: "OpenAI",
        group: "Frontier labs",
        releaseDate: "2000-01-01",
        codingIndex: 10,
        focus: ["programming"],
      },
    ],
    "2000-12-31",
  );

  assert.equal(projection.daysInYear, 366);
  assert.equal(projection.projected, 1);
});

test("buildChartSeries counts observed and projected releases per year", () => {
  const series = buildChartSeries(sampleModels, "2026-06-04");

  assert.deepEqual(series.years, [2025, 2026]);
  assert.deepEqual(series.observed, [2, 2]);
  assert.deepEqual(series.projected, [null, 5]);
});

test("getProjectedChartPoints places projected value above the previous year when it is higher", () => {
  const points = getProjectedChartPoints(
    { years: [2022, 2023, 2024, 2025, 2026], observed: [1, 9, 14, 17, 12], projected: [null, null, null, null, 29] },
    { left: 58, right: 48, top: 46, bottom: 58 },
    900,
    420,
  );
  const observed2025 = points.find((point) => point.year === 2025);
  const projected2026 = points.find((point) => point.year === 2026).projectedPoint;

  assert.ok(projected2026.y < observed2025.y);
  assert.equal(projected2026.value, 29);
});

test("getProjectedChartPoints omits projected point when there is no projection", () => {
  const points = getProjectedChartPoints(
    { years: [2025], observed: [2], projected: [null] },
    { left: 58, right: 48, top: 46, bottom: 58 },
    900,
    420,
  );

  assert.equal(points[0].projectedPoint, null);
});

test("groupByProvider creates stable provider totals and handles missing scores", () => {
  const grouped = groupByProvider([
    ...sampleModels,
    {
      model: "Earlier OpenAI",
      provider: "OpenAI",
      group: "Frontier labs",
      releaseDate: "2025-01-01",
      codingIndex: 30,
      focus: ["programming"],
    },
  ]);

  const alibaba = grouped.find((row) => row.provider === "Alibaba");
  assert.equal(alibaba.releases, 1);
  assert.equal(alibaba.qualified, 1);
  assert.equal(grouped.find((row) => row.provider === "OpenAI").latestMaxScore, 59.1);
  assert.equal(grouped.find((row) => row.provider === "Mistral").latestMaxScore, null);
});

test("groupByProvider sorts by highest score first with unscored providers last", () => {
  const grouped = groupByProvider([
    ...sampleModels,
    {
      model: "Unscored Cohere",
      provider: "Cohere",
      group: "Chinese+Other",
      releaseDate: "2026-01-01",
      codingIndex: null,
      focus: ["programming"],
    },
  ]);

  assert.deepEqual(
    grouped.map((row) => row.provider),
    ["OpenAI", "Alibaba", "Anthropic", "Cohere", "Mistral"],
  );
});

test("sortReleases sorts by table columns with stable null handling", () => {
  assert.deepEqual(
    sortReleases(sampleModels, { key: "provider", direction: "asc" }).map((item) => item.provider),
    ["Alibaba", "Anthropic", "Mistral", "OpenAI"],
  );
  assert.deepEqual(
    sortReleases(sampleModels, { key: "codingIndex", direction: "desc" }).map((item) => item.model),
    ["GPT-5.5", "Qwen3.7 Max", "Claude Opus 4.5", "Mistral Medium 3"],
  );
  assert.deepEqual(
    sortReleases(sampleModels, { key: "codingIndex", direction: "asc" }).map((item) => item.model),
    ["Mistral Medium 3", "Claude Opus 4.5", "Qwen3.7 Max", "GPT-5.5"],
  );
  assert.deepEqual(
    sortReleases(sampleModels).map((item) => item.model),
    ["Qwen3.7 Max", "GPT-5.5", "Claude Opus 4.5", "Mistral Medium 3"],
  );
  assert.deepEqual(
    sortReleases(
      [
        { ...sampleModels[0], model: "B Model", releaseDate: "2026-01-01" },
        { ...sampleModels[0], model: "A Model", releaseDate: "2026-01-01" },
      ],
      { key: "releaseDate", direction: "desc" },
    ).map((item) => item.model),
    ["A Model", "B Model"],
  );
});

test("paginateRows returns the requested page and clamps out-of-range pages", () => {
  const paginated = paginateRows(sampleModels, { page: 2, pageSize: 2 });
  assert.deepEqual(
    paginated.rows.map((item) => item.model),
    ["Qwen3.7 Max", "Mistral Medium 3"],
  );
  assert.equal(paginated.totalPages, 2);
  assert.equal(paginated.startRow, 3);
  assert.equal(paginated.endRow, 4);

  assert.equal(paginateRows(sampleModels, { page: 99, pageSize: 2 }).page, 2);
  assert.equal(paginateRows(sampleModels, { page: 0, pageSize: 2 }).page, 1);
  assert.equal(paginateRows([], { page: 3, pageSize: 2 }).startRow, 0);
  assert.equal(paginateRows([], { page: 3, pageSize: 2 }).endRow, 0);
  assert.equal(paginateRows(sampleModels, { pageSize: 0 }).pageSize, 25);
});
