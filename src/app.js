import { DATA_SOURCES, IMPORTANT_MISSING_LABS, RELEASES } from "./modelData.js?v=20260903b";
import {
  applyFilters,
  buildChartSeries,
  calculateProjection,
  getChartMaxValue,
  getProvidersForGroup,
  getProjectedChartPoints,
  groupByProvider,
  paginateRows,
  sortReleases,
  summarizeReleases,
} from "./dashboardLogic.js?v=20260903b";

const TODAY = RELEASES.reduce(
  (latest, release) => (release.releaseDate > latest ? release.releaseDate : latest),
  RELEASES[0]?.releaseDate ?? new Date().toISOString().slice(0, 10),
);
const CURRENT_YEAR = Number(TODAY.slice(0, 4));
const DEFAULT_LANGUAGE = "nl";
const translations = {
  nl: {
    documentTitle: "Agentic Model Release Tracker",
    skipToContent: "Ga naar hoofdinhoud",
    languageLabel: "Taal",
    filtersTitle: "Filters",
    activeFilterCount: "{count} actieve filters",
    providersTitle: "Providers",
    kpiSectionTitle: "Belangrijkste cijfers",
    notesSectionTitle: "Datasetnotities",
    eyebrow: "Agentic werk + programmeren",
    title: "AI-modelreleases versnellen",
    subtitle:
      "Volg releases van frontier labs, Chinese labs en andere impactvolle spelers, inclusief de AA Coding Index-notities in de release dataset.",
    downloadChart: "Download plaatje",
    resetFilters: "Reset filters",
    groupLabel: "Groep",
    groupAll: "Alle groepen",
    groupCustom: "Aangepaste groep",
    minCodingIndex: "Minimum Coding Index",
    minScoreHelp: "Filter op minimale AA Coding Index-score",
    fromDate: "Vanaf",
    toDate: "Tot",
    scoredOnly: "Alleen met AA-score",
    kpiTotal: "Totaal",
    kpiYtd: "{year} tot nu toe",
    kpiProjected: "{year} projectie",
    kpiQualified: "Groene AA-score",
    kpiBest: "Beste score",
    noScore: "Geen score",
    chartSubtitle: "Geobserveerde releases met {year} tot nu toe en projectie",
    chartTitle: "Gecombineerde modelreleases",
    chartSummaryLabel: "Grafieksamenvatting",
    chartActualLabel: "Werkelijk",
    chartAxisLabel: "Aantal releases",
    chartExploreHint: "Gebruik de pijltjestoetsen om datapunten te verkennen",
    chartCanvasLabel: "Jaarlijkse modelreleases: {ytd} tot nu toe in {year}, geprojecteerd naar {projected}",
    chartActualPoint: "{year}: {value} werkelijke releases",
    chartProjectedPoint: "{year}: {value} geprojecteerde releases",
    chartYtdMarker: "T/m {date}",
    chartProjectionMarker: "31 dec",
    chartProjectedLabel: "{year} projectie",
    chartProjectedSmall: "gecombineerde releases",
    chartProjectedWord: "projectie",
    chartYtdLabel: "{year} tot nu toe",
    chartYtdSmall: "al uitgebracht",
    projectionNote: "Projectie t/m 31 december {year}",
    providerBreakdownTitle: "Provideroverzicht",
    providerBreakdownSubtitle: "Releases en hoogste AA-score",
    providerReleasesLabel: "Releases",
    providerBestScoreLabel: "Beste AA-score",
    providerRowLabel: "Filter op {provider}: {releases} releases, beste AA-score {score}",
    noProviders: "Geen providers voor deze filters",
    filterByProvider: "Filter op {provider}",
    datasetTitle: "Release-dataset",
    datasetSubtitle: "Seed-data met datum, provider, score en notitie.",
    rowsLabel: "Rijen",
    tablePaginationLabel: "Tabelpaginering",
    previousPage: "Vorige pagina",
    nextPage: "Volgende pagina",
    dateColumn: "Datum",
    providerColumn: "Provider",
    modelColumn: "Model",
    groupColumn: "Groep",
    codingIndexColumn: "AA Coding Index",
    notesColumn: "Notitie",
    sourceColumn: "Bron",
    makerLink: "maker",
    sourceForModel: "Open makerbron voor {model} in een nieuw tabblad",
    noRows: "Geen rijen",
    notAvailable: "niet beschikbaar",
    showMore: "Meer tonen",
    showLess: "Minder tonen",
    tableScrollHint: "Scroll horizontaal om alle kolommen te bekijken",
    pageCount: "Pagina {page} / {totalPages}",
    pageRange: "{startRow}-{endRow} van {totalRows}",
    maybeAddTitle: "Misschien nog toevoegen",
    sourcesTitle: "Bronnen",
    dataFreshnessLabel: "Geverifieerd t/m {date}",
    dataUtcLabel: "Alle datums in UTC",
  },
  en: {
    documentTitle: "Agentic Model Release Tracker",
    skipToContent: "Skip to main content",
    languageLabel: "Language",
    filtersTitle: "Filters",
    activeFilterCount: "{count} active filters",
    providersTitle: "Providers",
    kpiSectionTitle: "Key metrics",
    notesSectionTitle: "Dataset notes",
    eyebrow: "Agentic work + programming",
    title: "AI model releases are accelerating",
    subtitle:
      "Track releases from frontier labs, Chinese labs, and other high-impact players, including AA Coding Index notes in the release dataset.",
    downloadChart: "Download image",
    resetFilters: "Reset filters",
    groupLabel: "Group",
    groupAll: "All groups",
    groupCustom: "Custom group",
    minCodingIndex: "Minimum Coding Index",
    minScoreHelp: "Filter by minimum AA Coding Index score",
    fromDate: "From",
    toDate: "To",
    scoredOnly: "Only with AA score",
    kpiTotal: "Total",
    kpiYtd: "{year} YTD",
    kpiProjected: "{year} projected",
    kpiQualified: "Green AA score",
    kpiBest: "Best score",
    noScore: "No score",
    chartSubtitle: "Observed releases with {year} YTD and projection",
    chartTitle: "Combined model releases",
    chartSummaryLabel: "Chart summary",
    chartActualLabel: "Actual",
    chartAxisLabel: "Number of releases",
    chartExploreHint: "Use the arrow keys to explore data points",
    chartCanvasLabel: "Annual model releases: {ytd} year to date in {year}, projected to {projected}",
    chartActualPoint: "{year}: {value} actual releases",
    chartProjectedPoint: "{year}: {value} projected releases",
    chartYtdMarker: "Through {date}",
    chartProjectionMarker: "Dec 31",
    chartProjectedLabel: "{year} projected",
    chartProjectedSmall: "combined releases",
    chartProjectedWord: "projected",
    chartYtdLabel: "{year} YTD",
    chartYtdSmall: "already released",
    projectionNote: "Projection through December 31, {year}",
    providerBreakdownTitle: "Provider breakdown",
    providerBreakdownSubtitle: "Releases and highest AA score",
    providerReleasesLabel: "Releases",
    providerBestScoreLabel: "Best AA score",
    providerRowLabel: "Filter by {provider}: {releases} releases, best AA score {score}",
    noProviders: "No providers match these filters",
    filterByProvider: "Filter by {provider}",
    datasetTitle: "Release dataset",
    datasetSubtitle: "Seed data with date, provider, score, and note.",
    rowsLabel: "Rows",
    tablePaginationLabel: "Table pagination",
    previousPage: "Previous page",
    nextPage: "Next page",
    dateColumn: "Date",
    providerColumn: "Provider",
    modelColumn: "Model",
    groupColumn: "Group",
    codingIndexColumn: "AA Coding Index",
    notesColumn: "Note",
    sourceColumn: "Source",
    makerLink: "maker",
    sourceForModel: "Open maker source for {model} in a new tab",
    noRows: "No rows",
    notAvailable: "not available",
    showMore: "Show more",
    showLess: "Show less",
    tableScrollHint: "Scroll horizontally to view every column",
    pageCount: "Page {page} / {totalPages}",
    pageRange: "{startRow}-{endRow} of {totalRows}",
    maybeAddTitle: "Maybe add next",
    sourcesTitle: "Sources",
    dataFreshnessLabel: "Verified through {date}",
    dataUtcLabel: "All dates in UTC",
  },
};

const state = {
  language: getInitialLanguage(),
  group: "all",
  providers: [],
  minScore: 0,
  scoredOnly: false,
  after: "",
  before: "",
  tableSort: {
    key: "releaseDate",
    direction: "desc",
  },
  tablePage: 1,
  tablePageSize: 25,
  expandedNotes: new Set(),
};

const providerColors = {
  OpenAI: "#45d38a",
  Anthropic: "#ff8a32",
  Google: "#4385f5",
  Alibaba: "#9b7cff",
  "Z.ai": "#29d6c2",
  "Moonshot.ai": "#f7cf45",
  Xiaomi: "#ff6b6b",
  DeepSeek: "#6bdcff",
  MiniMax: "#bd7cff",
  Mistral: "#ffb84d",
  xAI: "#d9dee8",
  Cursor: "#8da8c9",
  NVIDIA: "#7898ff",
  Meta: "#aa92ff",
  Tencent: "#66859f",
};

const chartInteraction = {
  targets: [],
  activeIndex: -1,
  keyboardIndex: -1,
  resizeFrame: 0,
  resizeObserver: null,
};

const filterDisclosure = {
  toggle: null,
  controls: null,
  mediaQuery: null,
};

const filterDefaults = {
  after: [...RELEASES.map((release) => release.releaseDate)].sort()[0],
  before: TODAY,
  providerCount: new Set(RELEASES.map((release) => release.provider)).size,
};

/* testable-logic:start */
function truncateText(value, maxLength = 160) {
  const text = String(value);
  if (text.length <= maxLength) return { text, truncated: false };
  if (maxLength <= 1) return { text: "…", truncated: true };

  const contentLimit = maxLength - 1;
  const candidate = text.slice(0, contentLimit).trimEnd();
  const endsAtWordBoundary = /\s/.test(text.charAt(contentLimit));
  const lastSpace = candidate.lastIndexOf(" ");
  const breakAt = !endsAtWordBoundary && lastSpace >= Math.floor(contentLimit * 0.55) ? lastSpace : candidate.length;
  return { text: `${candidate.slice(0, breakAt).trimEnd()}…`, truncated: true };
}

function positionCurrentYear(points, projection) {
  const positioned = points.map((point) => ({
    ...point,
    projectedPoint: point.projectedPoint ? { ...point.projectedPoint } : null,
  }));
  const currentIndex = positioned.findIndex((point) => point.year === projection.currentYear && point.projectedPoint);
  if (currentIndex <= 0) return positioned;

  const previousX = positioned[currentIndex - 1].x;
  const yearEndX = positioned[currentIndex].x;
  const progress = Math.min(1, Math.max(0, projection.daysElapsed / projection.daysInYear));
  positioned[currentIndex].x = previousX + (yearEndX - previousX) * progress;
  positioned[currentIndex].projectedPoint.x = yearEndX;
  return positioned;
}

function findNearestChartTarget(targets, x, y, maxDistance = 28) {
  let nearest = null;
  let nearestDistance = maxDistance * maxDistance;
  targets.forEach((target) => {
    const distance = (target.x - x) ** 2 + (target.y - y) ** 2;
    if (distance <= nearestDistance) {
      nearest = target;
      nearestDistance = distance;
    }
  });
  return nearest;
}

function getProjectionAnnotationLayout(current, padding, width) {
  const endpoint = current.projectedPoint;
  const labelOnRight = width - endpoint.x >= 64;
  return {
    endpoint: {
      x: endpoint.x + (labelOnRight ? 12 : -12),
      valueY: endpoint.y - 2,
      wordY: endpoint.y + 14,
      textAlign: labelOnRight ? "left" : "right",
    },
    ytd: {
      markerX: current.x,
      textX: current.x - 7,
      textY: padding.top - 30,
      textAlign: "right",
    },
    yearEnd: {
      markerX: endpoint.x,
      textX: endpoint.x - 7,
      textY: padding.top - 12,
      textAlign: "right",
    },
  };
}

function getActiveFilterCount(filters, defaults) {
  let count = 0;
  if (filters.group !== "all" && filters.group !== "custom") count += 1;
  if (["all", "custom"].includes(filters.group)
      && (filters.providers?.length ?? defaults.providerCount) !== defaults.providerCount) count += 1;
  if (Number(filters.minScore) > 0) count += 1;
  if (filters.scoredOnly) count += 1;
  if (filters.after && filters.after !== defaults.after) count += 1;
  if (filters.before && filters.before !== defaults.before) count += 1;
  return count;
}
/* testable-logic:end */

function init() {
  populateProviderFilters();
  populateSources();
  setDateDefaults();
  configureScoreFilter();
  prepareInteractiveSurfaces();
  state.providers = getProvidersForGroup(RELEASES, state.group);
  syncProviderControls();
  bindControls();
  setupFilterDisclosure();
  applyLanguage();
  render();
  observeChartSize();
}

function getInitialLanguage() {
  const params = new URLSearchParams(window.location.search);
  const requestedLanguage = params.get("lang") || localStorage.getItem("dashboardLanguage");
  return translations[requestedLanguage] ? requestedLanguage : DEFAULT_LANGUAGE;
}

function t(key, replacements = {}) {
  const template = translations[state.language][key] ?? translations[DEFAULT_LANGUAGE][key] ?? key;
  return Object.entries({ year: CURRENT_YEAR, ...replacements }).reduce(
    (value, [name, replacement]) => value.replaceAll(`{${name}}`, String(replacement)),
    template,
  );
}

function formatDisplayDate(date) {
  return new Intl.DateTimeFormat(state.language === "nl" ? "nl-NL" : "en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00Z`));
}

function formatShortDate(date) {
  return new Intl.DateTimeFormat(state.language === "nl" ? "nl-NL" : "en-GB", {
    day: "numeric",
    month: "short",
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00Z`));
}

function escapeHtml(value) {
  return String(value).replace(
    /[&<>"']/g,
    (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character],
  );
}

function applyLanguage() {
  document.documentElement.lang = state.language;
  document.title = t("documentTitle");
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    element.textContent = t(element.dataset.i18n);
  });
  document.querySelectorAll("[data-i18n-attr]").forEach((element) => {
    element.dataset.i18nAttr.split(",").forEach((mapping) => {
      const [attribute, key] = mapping.split(":");
      element.setAttribute(attribute, t(key));
    });
  });
  document.querySelectorAll(".language-button").forEach((button) => {
    const active = button.dataset.language === state.language;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
  });
  const freshness = document.querySelector("#dataFreshness");
  if (freshness) freshness.textContent = t("dataFreshnessLabel", { date: formatDisplayDate(TODAY) });
  updateScoreOutput();
  updateActiveFilterCount();
}

function setDateDefaults() {
  const dates = RELEASES.map((release) => release.releaseDate).sort();
  state.after = dates[0];
  state.before = TODAY;
  document.querySelector("#dateAfter").value = state.after;
  document.querySelector("#dateAfter").min = dates[0];
  document.querySelector("#dateAfter").max = TODAY;
  document.querySelector("#dateBefore").value = state.before;
  document.querySelector("#dateBefore").min = dates[0];
  document.querySelector("#dateBefore").max = TODAY;
}

function configureScoreFilter() {
  const scoreFilter = document.querySelector("#scoreFilter");
  const highestScore = Math.max(0, ...RELEASES.map((release) => release.codingIndex ?? 0));
  scoreFilter.max = String(Math.max(100, Math.ceil(highestScore / 10) * 10));
  if (!scoreFilter.hasAttribute("aria-describedby")) scoreFilter.setAttribute("aria-describedby", "scoreFilterHelp");
  updateScoreOutput();
}

function updateScoreOutput() {
  const output = document.querySelector("#scoreValue");
  const scoreFilter = document.querySelector("#scoreFilter");
  if (!output || !scoreFilter) return;
  output.textContent = state.minScore.toFixed(1);
  scoreFilter.setAttribute("aria-valuetext", state.minScore.toFixed(1));
}

function setupFilterDisclosure() {
  const toggle = document.querySelector("#filterToggle, .filter-toggle, [aria-controls='filterControls']");
  const controls = document.querySelector("#filterControls, .filter-controls");
  if (!toggle || !controls) return;

  filterDisclosure.toggle = toggle;
  filterDisclosure.controls = controls;
  filterDisclosure.mediaQuery = window.matchMedia("(max-width: 620px)");
  setFilterExpanded(!filterDisclosure.mediaQuery.matches);
  toggle.addEventListener("click", () => {
    setFilterExpanded(toggle.getAttribute("aria-expanded") !== "true");
  });
  const handleViewportChange = (event) => setFilterExpanded(!event.matches);
  if (filterDisclosure.mediaQuery.addEventListener) {
    filterDisclosure.mediaQuery.addEventListener("change", handleViewportChange);
  } else {
    filterDisclosure.mediaQuery.addListener(handleViewportChange);
  }
  updateActiveFilterCount();
}

function setFilterExpanded(expanded) {
  const { toggle, controls } = filterDisclosure;
  if (!toggle || !controls) return;
  toggle.setAttribute("aria-expanded", String(expanded));
  controls.hidden = !expanded;
}

function updateActiveFilterCount() {
  const countElement = document.querySelector("#activeFilterCount, .filter-count");
  if (!countElement) return;
  const count = getActiveFilterCount(state, filterDefaults);
  countElement.textContent = String(count);
  countElement.hidden = count === 0;
  countElement.setAttribute("aria-label", t("activeFilterCount", { count }));
}

function prepareInteractiveSurfaces() {
  const canvas = document.querySelector("#releaseCanvas");
  canvas.tabIndex = 0;
  canvas.setAttribute("aria-describedby", "chartExploreHint chartTooltip");

  if (!document.querySelector("#chartTooltip")) {
    const tooltip = document.createElement("div");
    tooltip.id = "chartTooltip";
    tooltip.className = "chart-tooltip";
    tooltip.setAttribute("role", "status");
    tooltip.hidden = true;
    canvas.closest(".chart-stage").append(tooltip);
  }
}

function observeChartSize() {
  if (!("ResizeObserver" in window)) return;
  const canvas = document.querySelector("#releaseCanvas");
  chartInteraction.resizeObserver = new ResizeObserver(() => scheduleChartRender());
  chartInteraction.resizeObserver.observe(canvas);
}

function scheduleChartRender() {
  cancelAnimationFrame(chartInteraction.resizeFrame);
  chartInteraction.resizeFrame = requestAnimationFrame(() => renderChart(applyFilters(RELEASES, state)));
}

function populateProviderFilters() {
  const container = document.querySelector("#providerFilters");
  const providers = [...new Set(RELEASES.map((item) => item.provider))].sort();
  container.innerHTML = providers
    .map(
      (provider) => `
        <label class="check-pill">
          <input type="checkbox" value="${escapeHtml(provider)}" />
          <span>${escapeHtml(provider)}</span>
        </label>
      `,
    )
    .join("");
}

function populateSources() {
  document.querySelector("#sourceList").innerHTML = DATA_SOURCES.map(
    (source) => `<a href="${escapeHtml(source.url)}" target="_blank" rel="noreferrer">${escapeHtml(source.label)}</a>`,
  ).join("");
  document.querySelector("#missingLabs").textContent = IMPORTANT_MISSING_LABS.join(", ");
}

function bindControls() {
  document.querySelector("#groupFilter").addEventListener("change", (event) => {
    state.group = event.target.value;
    state.providers = getProvidersForGroup(RELEASES, state.group);
    syncProviderControls();
    state.tablePage = 1;
    render();
  });
  document.querySelector("#scoreFilter").addEventListener("input", (event) => {
    state.minScore = Number(event.target.value);
    updateScoreOutput();
    state.tablePage = 1;
    render();
  });
  document.querySelector("#scoredOnly").addEventListener("change", (event) => {
    state.scoredOnly = event.target.checked;
    state.tablePage = 1;
    render();
  });
  document.querySelector("#dateAfter").addEventListener("change", (event) => {
    state.after = event.target.value;
    state.tablePage = 1;
    render();
  });
  document.querySelector("#dateBefore").addEventListener("change", (event) => {
    state.before = event.target.value;
    state.tablePage = 1;
    render();
  });
  document.querySelector("#providerFilters").addEventListener("change", () => {
    state.providers = [...document.querySelectorAll("#providerFilters input:checked")].map((item) => item.value);
    state.group = "custom";
    document.querySelector("#groupFilter").value = state.group;
    state.tablePage = 1;
    render();
  });
  document.querySelector("#releaseTable thead").addEventListener("click", (event) => {
    const button = event.target.closest("[data-sort-key]");
    if (!button) return;
    const key = button.dataset.sortKey;
    state.tableSort =
      state.tableSort.key === key
        ? { key, direction: state.tableSort.direction === "asc" ? "desc" : "asc" }
        : { key, direction: key === "releaseDate" || key === "codingIndex" ? "desc" : "asc" };
    state.tablePage = 1;
    render();
  });
  document.querySelector("#releaseTable tbody").addEventListener("click", (event) => {
    const noteToggle = event.target.closest(".note-toggle");
    if (noteToggle) {
      toggleNote(noteToggle.dataset.noteKey);
      return;
    }
    const providerButton = event.target.closest("[data-filter-provider]");
    if (providerButton) filterByProvider(providerButton.dataset.filterProvider);
  });
  document.querySelector("#providerBreakdown").addEventListener("click", (event) => {
    const providerButton = event.target.closest("[data-filter-provider]");
    if (providerButton) filterByProvider(providerButton.dataset.filterProvider);
  });
  document.querySelector("#rowsPerPage").addEventListener("change", (event) => {
    state.tablePageSize = Number(event.target.value);
    state.tablePage = 1;
    render();
  });
  document.querySelector("#prevPage").addEventListener("click", () => {
    state.tablePage -= 1;
    render();
  });
  document.querySelector("#nextPage").addEventListener("click", () => {
    state.tablePage += 1;
    render();
  });
  document.querySelector("#resetFilters").addEventListener("click", resetFilters);
  document.querySelector("#downloadChart").addEventListener("click", downloadCanvas);
  window.addEventListener("resize", scheduleChartRender);

  const canvas = document.querySelector("#releaseCanvas");
  canvas.addEventListener("pointermove", handleChartPointerMove);
  canvas.addEventListener("pointerleave", hideChartTooltip);
  canvas.addEventListener("blur", hideChartTooltip);
  canvas.addEventListener("keydown", handleChartKeydown);
  canvas.addEventListener("focus", () => {
    if (chartInteraction.targets.length > 0) showChartTarget(Math.max(0, chartInteraction.targets.length - 2));
  });

  document.querySelectorAll(".language-button").forEach((button) => {
    button.addEventListener("click", () => {
      state.language = button.dataset.language;
      localStorage.setItem("dashboardLanguage", state.language);
      applyLanguage();
      render();
    });
  });
}

function filterByProvider(provider) {
  state.group = "custom";
  state.providers = [provider];
  state.tablePage = 1;
  document.querySelector("#groupFilter").value = state.group;
  render();
}

function toggleNote(key) {
  if (state.expandedNotes.has(key)) state.expandedNotes.delete(key);
  else state.expandedNotes.add(key);
  renderTable(applyFilters(RELEASES, state));
}

function handleChartPointerMove(event) {
  const canvas = event.currentTarget;
  const bounds = canvas.getBoundingClientRect();
  const x = ((event.clientX - bounds.left) / bounds.width) * canvas.clientWidth;
  const y = ((event.clientY - bounds.top) / bounds.height) * canvas.clientHeight;
  const target = findNearestChartTarget(chartInteraction.targets, x, y);
  if (!target) {
    hideChartTooltip();
    return;
  }
  showChartTarget(chartInteraction.targets.indexOf(target));
}

function handleChartKeydown(event) {
  if (chartInteraction.targets.length === 0) return;
  const lastIndex = chartInteraction.targets.length - 1;
  if (event.key === "Escape") {
    hideChartTooltip();
    return;
  }
  if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
  event.preventDefault();
  if (event.key === "Home") chartInteraction.keyboardIndex = 0;
  else if (event.key === "End") chartInteraction.keyboardIndex = lastIndex;
  else if (event.key === "ArrowLeft") chartInteraction.keyboardIndex = Math.max(0, chartInteraction.keyboardIndex - 1);
  else chartInteraction.keyboardIndex = Math.min(lastIndex, chartInteraction.keyboardIndex + 1);
  showChartTarget(chartInteraction.keyboardIndex);
}

function showChartTarget(index) {
  const target = chartInteraction.targets[index];
  const tooltip = document.querySelector("#chartTooltip");
  if (!target || !tooltip) return;
  chartInteraction.activeIndex = index;
  chartInteraction.keyboardIndex = index;
  tooltip.textContent = target.label;
  tooltip.style.setProperty("--tooltip-x", `${target.x}px`);
  tooltip.style.setProperty("--tooltip-y", `${target.y}px`);
  tooltip.hidden = false;
}

function hideChartTooltip() {
  chartInteraction.activeIndex = -1;
  const tooltip = document.querySelector("#chartTooltip");
  if (tooltip) tooltip.hidden = true;
}

function resetFilters() {
  state.group = "all";
  state.providers = getProvidersForGroup(RELEASES, state.group);
  state.minScore = 0;
  state.scoredOnly = false;
  state.after = [...RELEASES.map((release) => release.releaseDate)].sort()[0];
  state.before = TODAY;
  state.tableSort = { key: "releaseDate", direction: "desc" };
  state.tablePage = 1;
  state.tablePageSize = 25;
  state.expandedNotes.clear();
  document.querySelector("#groupFilter").value = "all";
  document.querySelector("#scoreFilter").value = "0";
  updateScoreOutput();
  document.querySelector("#scoredOnly").checked = false;
  document.querySelector("#dateAfter").value = state.after;
  document.querySelector("#dateBefore").value = state.before;
  document.querySelector("#rowsPerPage").value = String(state.tablePageSize);
  syncProviderControls();
  render();
}

function render() {
  syncProviderControls();
  const filtered = applyFilters(RELEASES, state);
  renderKpis(filtered);
  renderChart(filtered);
  renderProviderBreakdown(filtered);
  renderTable(filtered);
  updateActiveFilterCount();
}

function syncProviderControls() {
  const selectedProviders = new Set(state.providers);
  document.querySelectorAll("#providerFilters input").forEach((item) => {
    item.checked = selectedProviders.has(item.value);
  });
}

function renderKpis(models) {
  const summary = summarizeReleases(models, TODAY);
  const projection = calculateProjection(models, TODAY);
  const best = summary.best;
  document.querySelector("#kpiTotal").textContent = summary.total;
  document.querySelector("#kpiYtd").textContent = summary.ytd;
  document.querySelector("#kpiProjected").textContent = projection.projected;
  document.querySelector("#kpiQualified").textContent = summary.qualified;
  document.querySelector("#kpiBest").textContent = best ? `${best.model} (${best.codingIndex})` : t("noScore");
  document.querySelector("#thresholdText").textContent = t("chartSubtitle");
  document.querySelector("#chartYtd").textContent = projection.ytd;
  document.querySelector("#chartProjected").textContent = projection.projected;
}

function renderChart(models) {
  const canvas = document.querySelector("#releaseCanvas");
  const ctx = canvas.getContext("2d");
  const dpr = Math.max(1, window.devicePixelRatio || 1);
  const width = Math.max(1, Math.round(canvas.getBoundingClientRect().width || canvas.clientWidth));
  const height = Math.max(1, Math.round(canvas.getBoundingClientRect().height || canvas.clientHeight));
  canvas.width = Math.floor(width * dpr);
  canvas.height = Math.floor(height * dpr);
  ctx.scale(dpr, dpr);

  const series = buildChartSeries(models, TODAY);
  const projection = calculateProjection(models, TODAY);
  const maxValue = getChartMaxValue(series);
  const padding = width < 560
    ? { left: 44, right: 70, top: 70, bottom: 52 }
    : { left: 54, right: 82, top: 66, bottom: 54 };
  const yearPoints = getProjectedChartPoints(series, padding, width, height);
  const points = positionCurrentYear(yearPoints, projection);

  ctx.clearRect(0, 0, width, height);
  drawChartBackground(ctx, width, height, padding);
  drawProjectionWindow(ctx, points, height, padding, width);
  drawGrid(ctx, width, height, padding, maxValue, yearPoints);
  if (points.length === 0) {
    drawEmptyChart(ctx, width, height);
  } else {
    drawArea(ctx, points, height, padding);
    drawLine(ctx, points, "#4f95ff", false);
    drawProjectedLine(ctx, points);
    drawPoints(ctx, points);
    drawLabels(ctx, points, projection, width, padding);
  }

  chartInteraction.targets = points.map((point) => ({
    x: point.x,
    y: point.y,
    kind: "actual",
    label: t("chartActualPoint", { year: point.year, value: point.observed }),
  }));
  const current = points.find((point) => point.year === projection.currentYear && point.projectedPoint);
  if (current) {
    chartInteraction.targets.push({
      x: current.projectedPoint.x,
      y: current.projectedPoint.y,
      kind: "projected",
      label: t("chartProjectedPoint", { year: current.year, value: current.projected }),
    });
  }
  if (chartInteraction.activeIndex >= chartInteraction.targets.length) hideChartTooltip();
  else if (chartInteraction.activeIndex >= 0) showChartTarget(chartInteraction.activeIndex);
  drawActiveChartTarget(ctx);
  canvas.setAttribute("aria-label", t("chartCanvasLabel", {
    year: projection.currentYear,
    ytd: projection.ytd,
    projected: projection.projected,
  }));
}

function drawChartBackground(ctx, width, height, padding) {
  const glow = ctx.createRadialGradient(width * 0.62, padding.top, 8, width * 0.62, padding.top, width * 0.68);
  glow.addColorStop(0, "rgba(53, 130, 255, 0.2)");
  glow.addColorStop(0.5, "rgba(18, 58, 110, 0.1)");
  glow.addColorStop(1, "rgba(2, 8, 20, 0)");
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, width, height);

  ctx.strokeStyle = "rgba(109, 178, 255, 0.16)";
  ctx.lineWidth = 1;
  ctx.strokeRect(padding.left, padding.top, width - padding.left - padding.right, height - padding.top - padding.bottom);
}

function drawProjectionWindow(ctx, points, height, padding, width) {
  const current = points.find((point) => point.projectedPoint);
  if (!current || current.projectedPoint.x <= current.x) return;
  const plotBottom = height - padding.bottom;
  const annotation = getProjectionAnnotationLayout(current, padding, width);

  ctx.save();
  const projectionFill = ctx.createLinearGradient(current.x, 0, current.projectedPoint.x, 0);
  projectionFill.addColorStop(0, "rgba(65, 226, 192, 0.1)");
  projectionFill.addColorStop(1, "rgba(65, 226, 192, 0.02)");
  ctx.fillStyle = projectionFill;
  ctx.fillRect(current.x, padding.top, current.projectedPoint.x - current.x, plotBottom - padding.top);

  ctx.lineWidth = 1;
  ctx.strokeStyle = "rgba(65, 226, 192, 0.68)";
  ctx.setLineDash([3, 5]);
  ctx.beginPath();
  ctx.moveTo(annotation.ytd.markerX, padding.top);
  ctx.lineTo(annotation.ytd.markerX, plotBottom);
  ctx.stroke();
  ctx.strokeStyle = "rgba(65, 226, 192, 0.32)";
  ctx.beginPath();
  ctx.moveTo(annotation.yearEnd.markerX, padding.top);
  ctx.lineTo(annotation.yearEnd.markerX, plotBottom);
  ctx.stroke();
  ctx.setLineDash([]);

  [annotation.ytd.markerX, annotation.yearEnd.markerX].forEach((x, index) => {
    ctx.beginPath();
    ctx.fillStyle = index === 0 ? "#41e2c0" : "#8da8c9";
    ctx.arc(x, padding.top, 2.5, 0, Math.PI * 2);
    ctx.fill();
  });

  ctx.font = "600 11px Inter, system-ui, sans-serif";
  ctx.fillStyle = "#41e2c0";
  ctx.textAlign = annotation.ytd.textAlign;
  ctx.fillText(t("chartYtdMarker", { date: formatShortDate(TODAY) }), annotation.ytd.textX, annotation.ytd.textY);
  ctx.fillStyle = "#9bb9dc";
  ctx.textAlign = annotation.yearEnd.textAlign;
  ctx.fillText(t("chartProjectionMarker"), annotation.yearEnd.textX, annotation.yearEnd.textY);
  ctx.restore();
}

function drawGrid(ctx, width, height, padding, maxValue, points) {
  const plotBottom = height - padding.bottom;
  ctx.font = "12px Inter, system-ui, sans-serif";
  ctx.fillStyle = "#8da8c9";
  ctx.textAlign = "right";
  for (let i = 0; i <= 4; i += 1) {
    const y = padding.top + ((plotBottom - padding.top) * i) / 4;
    const value = Math.round(maxValue - (maxValue * i) / 4);
    ctx.strokeStyle = i === 4 ? "rgba(160, 190, 230, 0.3)" : "rgba(160, 190, 230, 0.15)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(padding.left, y);
    ctx.lineTo(width - padding.right, y);
    ctx.stroke();
    ctx.fillText(String(value), padding.left - 10, y + 4);
  }

  const yearLabelY = height - padding.bottom + 20;
  ctx.textAlign = "center";
  points.forEach((point) => {
    ctx.strokeStyle = "rgba(160, 190, 230, 0.09)";
    ctx.beginPath();
    ctx.moveTo(point.x, padding.top);
    ctx.lineTo(point.x, plotBottom);
    ctx.stroke();
    ctx.fillStyle = "#9bb9dc";
    ctx.fillText(String(point.year), point.x, yearLabelY);
  });
}

function drawEmptyChart(ctx, width, height) {
  ctx.fillStyle = "#9bb9dc";
  ctx.font = "600 14px Inter, system-ui, sans-serif";
  ctx.textAlign = "center";
  ctx.fillText(t("noRows"), width / 2, height / 2);
}

function drawArea(ctx, points, height, padding) {
  if (points.length === 0) return;
  const gradient = ctx.createLinearGradient(0, padding.top, 0, height - padding.bottom);
  gradient.addColorStop(0, "rgba(66, 133, 245, 0.34)");
  gradient.addColorStop(1, "rgba(66, 133, 245, 0.015)");
  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.moveTo(points[0].x, height - padding.bottom);
  ctx.lineTo(points[0].x, points[0].y);
  drawSmoothPath(ctx, points, { continueFromCurrentPoint: true });
  ctx.lineTo(points[points.length - 1].x, height - padding.bottom);
  ctx.closePath();
  ctx.fill();
}

function drawLine(ctx, points, color, dashed) {
  if (points.length === 0) return;
  ctx.save();
  ctx.shadowColor = color;
  ctx.shadowBlur = dashed ? 0 : 14;
  ctx.strokeStyle = color;
  ctx.lineWidth = dashed ? 2.5 : 3;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.setLineDash(dashed ? [7, 7] : []);
  ctx.beginPath();
  drawSmoothPath(ctx, points);
  ctx.stroke();
  ctx.restore();
}

function drawSmoothPath(ctx, points, options = {}) {
  if (points.length === 0) return;
  if (!options.continueFromCurrentPoint) ctx.moveTo(points[0].x, points[0].y);
  if (points.length === 1) return;

  for (let index = 0; index < points.length - 1; index += 1) {
    const previous = points[Math.max(0, index - 1)];
    const current = points[index];
    const next = points[index + 1];
    const following = points[Math.min(points.length - 1, index + 2)];
    const controlScale = 1 / 6;
    ctx.bezierCurveTo(
      current.x + (next.x - previous.x) * controlScale,
      current.y + (next.y - previous.y) * controlScale,
      next.x - (following.x - current.x) * controlScale,
      next.y - (following.y - current.y) * controlScale,
      next.x,
      next.y,
    );
  }
}

function drawProjectedLine(ctx, points) {
  const projectedPoint = points.find((point) => point.projected !== null);
  if (!projectedPoint?.projectedPoint) return;
  drawLine(
    ctx,
    [
      { x: projectedPoint.x, y: projectedPoint.y },
      { x: projectedPoint.projectedPoint.x, y: projectedPoint.projectedPoint.y },
    ],
    "#41e2c0",
    true,
  );
}

function drawPoints(ctx, points) {
  points.forEach((point) => {
    ctx.save();
    ctx.shadowColor = "rgba(79, 149, 255, 0.85)";
    ctx.shadowBlur = 10;
    ctx.beginPath();
    ctx.fillStyle = "#07182a";
    ctx.strokeStyle = "#dcecff";
    ctx.lineWidth = 2;
    ctx.arc(point.x, point.y, 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  });
  const current = points.find((point) => point.projectedPoint);
  if (current) {
    ctx.save();
    ctx.beginPath();
    ctx.fillStyle = "#07182a";
    ctx.strokeStyle = "#41e2c0";
    ctx.lineWidth = 2;
    ctx.arc(current.projectedPoint.x, current.projectedPoint.y, 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  }
}

function drawLabels(ctx, points, projection, width, padding) {
  ctx.textAlign = "center";
  points.forEach((point) => {
    ctx.font = "700 15px Inter, system-ui, sans-serif";
    ctx.fillStyle = "#eef5ff";
    ctx.fillText(String(point.observed), point.x, Math.max(padding.top + 16, point.y - 13));
  });
  const current = points.find((point) => point.year === projection.currentYear);
  if (current?.projectedPoint) {
    const annotation = getProjectionAnnotationLayout(current, padding, width);
    ctx.textAlign = annotation.endpoint.textAlign;
    ctx.fillStyle = "#41e2c0";
    ctx.font = "700 15px Inter, system-ui, sans-serif";
    ctx.fillText(String(projection.projected), annotation.endpoint.x, annotation.endpoint.valueY);
    ctx.fillStyle = "#9ff8e8";
    ctx.font = "600 10px Inter, system-ui, sans-serif";
    ctx.fillText(t("chartProjectedWord"), annotation.endpoint.x, annotation.endpoint.wordY);
  }
}

function drawActiveChartTarget(ctx) {
  const target = chartInteraction.targets[chartInteraction.activeIndex];
  if (!target) return;
  ctx.save();
  ctx.strokeStyle = target.kind === "projected" ? "#41e2c0" : "#eef5ff";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(target.x, target.y, 11, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();
}

function renderProviderBreakdown(models) {
  const rows = groupByProvider(models);
  const container = document.querySelector("#providerBreakdown");
  if (rows.length === 0) {
    container.innerHTML = `<p class="provider-empty" role="listitem">${escapeHtml(t("noProviders"))}</p>`;
    return;
  }

  const maxReleases = Math.max(1, ...rows.map((row) => row.releases));
  container.innerHTML = rows
    .map((row) => {
      const color = providerColors[row.provider] || "#8da8c9";
      const score = row.latestMaxScore ?? "n/a";
      const scoreLabel = row.latestMaxScore ?? t("notAvailable");
      const selected = state.group === "custom" && state.providers.length === 1 && state.providers[0] === row.provider;
      return `
        <div class="provider-row-item" role="listitem">
          <button class="provider-row" type="button" data-filter-provider="${escapeHtml(row.provider)}"
            aria-pressed="${selected}" aria-label="${escapeHtml(t("providerRowLabel", {
              provider: row.provider,
              releases: row.releases,
              score: scoreLabel,
            }))}" style="--provider-color:${color}; --provider-share:${(row.releases / maxReleases) * 100}%">
            <span class="provider-name">
              <span class="swatch" aria-hidden="true" style="background:${color}"></span>
              <span>${escapeHtml(row.provider)}</span>
            </span>
            <span class="bar-track" aria-hidden="true">
              <span style="width:${(row.releases / maxReleases) * 100}%; background:${color}"></span>
            </span>
            <span class="provider-stat" title="${escapeHtml(t("providerReleasesLabel"))}">${row.releases}</span>
            <span class="provider-score" title="${escapeHtml(t("providerBestScoreLabel"))}">${score}</span>
          </button>
        </div>
      `;
    })
    .join("");
}

function renderTable(models) {
  const sortedRows = sortReleases(models, state.tableSort);
  const paginated = paginateRows(sortedRows, { page: state.tablePage, pageSize: state.tablePageSize });
  state.tablePage = paginated.page;
  updateSortButtons();
  updatePagination(paginated);
  const tableBody = document.querySelector("#releaseTable tbody");
  if (paginated.rows.length === 0) {
    tableBody.innerHTML = `<tr class="empty-row"><td colspan="7">${escapeHtml(t("noRows"))}</td></tr>`;
    return;
  }

  tableBody.innerHTML = paginated.rows
    .map((item) => {
      const note = truncateText(item.notes);
      const noteKey = encodeURIComponent(`${item.releaseDate}\u0000${item.provider}\u0000${item.model}`);
      const expanded = state.expandedNotes.has(noteKey);
      const color = providerColors[item.provider] || "#8da8c9";
      const score = item.codingIndex ?? "n/a";
      return `
        <tr data-provider="${escapeHtml(item.provider)}">
          <td class="cell-date"><time datetime="${escapeHtml(item.releaseDate)}">${escapeHtml(item.releaseDate)}</time></td>
          <td class="cell-provider">
            <button type="button" class="table-provider" data-filter-provider="${escapeHtml(item.provider)}"
              aria-label="${escapeHtml(t("filterByProvider", { provider: item.provider }))}">
              <span class="swatch" aria-hidden="true" style="background:${color}"></span>
              <span>${escapeHtml(item.provider)}</span>
            </button>
          </td>
          <td class="cell-model"><strong>${escapeHtml(item.model)}</strong></td>
          <td class="cell-group"><span class="group-tag">${escapeHtml(item.group)}</span></td>
          <td class="cell-score ${item.codingIndex !== null ? "good-score" : "no-score"}">
            <span aria-label="${item.codingIndex !== null ? score : escapeHtml(t("notAvailable"))}">${score}</span>
          </td>
          <td class="cell-notes">
            <span class="note-summary" ${expanded ? "hidden" : ""}>${escapeHtml(note.text)}</span>
            <span class="note-full" ${expanded ? "" : "hidden"}>${escapeHtml(item.notes)}</span>
            ${note.truncated ? `<button type="button" class="note-toggle" data-note-key="${noteKey}" aria-expanded="${expanded}">${escapeHtml(t(expanded ? "showLess" : "showMore"))}</button>` : ""}
          </td>
          <td class="cell-source"><a href="${escapeHtml(item.sourceUrl)}" target="_blank" rel="noopener noreferrer"
            aria-label="${escapeHtml(t("sourceForModel", { model: item.model }))}">${escapeHtml(t("makerLink"))}<span aria-hidden="true"> ↗</span></a></td>
        </tr>
      `;
    })
    .join("");
}

function updateSortButtons() {
  document.querySelectorAll("[data-sort-key]").forEach((button) => {
    const isActive = button.dataset.sortKey === state.tableSort.key;
    button.classList.toggle("active", isActive);
    button.closest("th").setAttribute("aria-sort", isActive ? (state.tableSort.direction === "asc" ? "ascending" : "descending") : "none");
    button.querySelector(".sort-arrow").textContent = isActive ? (state.tableSort.direction === "asc" ? "▲" : "▼") : "↕";
  });
}

function updatePagination(paginated) {
  document.querySelector("#pageRange").textContent =
    paginated.totalRows === 0
      ? t("noRows")
      : t("pageRange", { startRow: paginated.startRow, endRow: paginated.endRow, totalRows: paginated.totalRows });
  document.querySelector("#pageCount").textContent = t("pageCount", { page: paginated.page, totalPages: paginated.totalPages });
  document.querySelector("#prevPage").disabled = paginated.page <= 1;
  document.querySelector("#nextPage").disabled = paginated.page >= paginated.totalPages;
}

function downloadCanvas() {
  const link = document.createElement("a");
  link.download = "ai-model-release-projection.png";
  link.href = document.querySelector("#releaseCanvas").toDataURL("image/png");
  link.click();
}

init();
