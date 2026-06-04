export const OPUS_45_CODING_THRESHOLD = 47.8;

export function applyFilters(models, filters = {}) {
  const {
    group = "all",
    providers = [],
    minScore = null,
    scoredOnly = false,
    after = "",
    before = "",
  } = filters;

  return models.filter((model) => {
    if (group === "custom" && providers.length === 0) return false;
    if (group !== "all" && group !== "custom" && model.group !== group) return false;
    if (providers.length > 0 && !providers.includes(model.provider)) return false;
    if (after && model.releaseDate < after) return false;
    if (before && model.releaseDate > before) return false;
    if (scoredOnly && model.codingIndex === null) return false;
    if (minScore > 0 && (model.codingIndex === null || model.codingIndex < minScore)) return false;
    return true;
  });
}

export function getProvidersForGroup(models, group) {
  const providers = [...new Set(models.map((model) => model.provider))].sort();
  if (group === "all" || group === "custom") return providers;
  return providers.filter((provider) => models.some((model) => model.provider === provider && model.group === group));
}

export function summarizeReleases(models, today) {
  const currentYear = getYear(today);
  const scoredModels = models.filter((model) => model.codingIndex !== null);
  const qualifiedModels = models.filter(
    (model) => model.codingIndex !== null && model.codingIndex >= OPUS_45_CODING_THRESHOLD,
  );
  const best = scoredModels.reduce(
    (leader, model) => (leader === null || model.codingIndex > leader.codingIndex ? model : leader),
    null,
  );

  return {
    total: models.length,
    ytd: models.filter((model) => getYear(model.releaseDate) === currentYear).length,
    scored: scoredModels.length,
    qualified: qualifiedModels.length,
    best,
    threshold: OPUS_45_CODING_THRESHOLD,
  };
}

export function calculateProjection(models, today) {
  const now = new Date(`${today}T00:00:00Z`);
  const currentYear = now.getUTCFullYear();
  const startOfYear = new Date(Date.UTC(currentYear, 0, 1));
  const daysElapsed = Math.floor((now - startOfYear) / 86_400_000) + 1;
  const daysInYear = isLeapYear(currentYear) ? 366 : 365;
  const ytd = models.filter((model) => getYear(model.releaseDate) === currentYear).length;

  return {
    currentYear,
    ytd,
    projected: Math.ceil((ytd * daysInYear) / daysElapsed),
    daysElapsed,
    daysInYear,
  };
}

export function buildChartSeries(models, today) {
  const projection = calculateProjection(models, today);
  const years = [...new Set(models.map((model) => getYear(model.releaseDate)))].sort((a, b) => a - b);
  const observed = years.map((year) => models.filter((model) => getYear(model.releaseDate) === year).length);
  const projected = years.map((year) => (year === projection.currentYear ? projection.projected : null));

  return { years, observed, projected };
}

export function getProjectedChartPoints(series, padding, width, height) {
  const maxValue = Math.max(1, ...series.observed, ...series.projected.filter((value) => value !== null));
  const plotWidth = width - padding.left - padding.right;
  const plotHeight = height - padding.top - padding.bottom;
  const xStep = series.years.length > 1 ? plotWidth / (series.years.length - 1) : 0;

  return series.years.map((year, index) => {
    const x = padding.left + index * xStep;
    const observed = series.observed[index];
    const projected = series.projected[index];

    return {
      year,
      x,
      y: scaleValue(observed, maxValue, padding, plotHeight),
      observed,
      projected,
      projectedPoint:
        projected === null
          ? null
          : {
              value: projected,
              x,
              y: scaleValue(projected, maxValue, padding, plotHeight),
            },
    };
  });
}

export function groupByProvider(models) {
  const providers = [...new Set(models.map((model) => model.provider))].sort();

  return providers
    .map((provider) => {
      const releases = models.filter((model) => model.provider === provider);
      const scored = releases.filter((model) => model.codingIndex !== null);
      const latestMaxScore = scored.reduce(
        (maxScore, model) => (maxScore === null || model.codingIndex > maxScore ? model.codingIndex : maxScore),
        null,
      );

      return {
        provider,
        releases: releases.length,
        scored: scored.length,
        qualified: scored.filter((model) => model.codingIndex >= OPUS_45_CODING_THRESHOLD).length,
        latestMaxScore,
      };
    })
    .sort((a, b) => compareNullableNumbers(b.latestMaxScore, a.latestMaxScore) || a.provider.localeCompare(b.provider));
}

export function sortReleases(models, sort = {}) {
  const { key = "releaseDate", direction = "desc" } = sort;
  const multiplier = direction === "asc" ? 1 : -1;

  return [...models].sort((a, b) => {
    const result = compareValues(a[key], b[key]);
    if (result !== 0) return result * multiplier;
    return b.releaseDate.localeCompare(a.releaseDate) || a.model.localeCompare(b.model);
  });
}

export function paginateRows(rows, pagination = {}) {
  const pageSize = Math.max(1, Number(pagination.pageSize) || 25);
  const totalPages = Math.max(1, Math.ceil(rows.length / pageSize));
  const page = Math.min(Math.max(1, Number(pagination.page) || 1), totalPages);
  const startIndex = (page - 1) * pageSize;
  const pageRows = rows.slice(startIndex, startIndex + pageSize);

  return {
    rows: pageRows,
    page,
    pageSize,
    totalRows: rows.length,
    totalPages,
    startRow: rows.length === 0 ? 0 : startIndex + 1,
    endRow: startIndex + pageRows.length,
  };
}

function getYear(date) {
  return new Date(`${date}T00:00:00Z`).getUTCFullYear();
}

function isLeapYear(year) {
  return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
}

function scaleValue(value, maxValue, padding, plotHeight) {
  return padding.top + plotHeight - (value / maxValue) * plotHeight;
}

function compareValues(a, b) {
  if (typeof a === "number" || typeof b === "number" || a === null || b === null) {
    return compareNullableNumbers(a, b);
  }
  return String(a).localeCompare(String(b));
}

function compareNullableNumbers(a, b) {
  if (a === null && b === null) return 0;
  if (a === null) return -1;
  if (b === null) return 1;
  return a - b;
}
