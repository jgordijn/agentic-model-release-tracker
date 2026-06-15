import { DATA_SOURCES, IMPORTANT_MISSING_LABS, RELEASES } from "./modelData.js?v=20220604i";
import {
  OPUS_45_CODING_THRESHOLD,
  applyFilters,
  buildChartSeries,
  calculateProjection,
  getProvidersForGroup,
  getProjectedChartPoints,
  groupByProvider,
  paginateRows,
  sortReleases,
  summarizeReleases,
} from "./dashboardLogic.js?v=20220604h";

const TODAY = RELEASES.reduce(
  (latest, release) => (release.releaseDate > latest ? release.releaseDate : latest),
  RELEASES[0]?.releaseDate ?? new Date().toISOString().slice(0, 10),
);
const DEFAULT_LANGUAGE = "nl";
const translations = {
  nl: {
    documentTitle: "Agentic Model Release Tracker",
    eyebrow: "Agentic werk + programmeren",
    title: "AI-modelreleases versnellen",
    subtitle:
      "Volg releases van frontier labs, Chinese labs en andere impactvolle spelers. De Opus 4.5 Coding Index-score is de ‘goed genoeg’-drempel.",
    downloadChart: "Download plaatje",
    resetFilters: "Reset filters",
    groupLabel: "Groep",
    groupAll: "Alle groepen",
    groupCustom: "Aangepaste groep",
    minCodingIndex: "Minimum Coding Index",
    fromDate: "Vanaf",
    toDate: "Tot",
    scoredOnly: "Alleen met AA-score",
    kpiTotal: "Totaal",
    kpiYtd: "2026 tot nu toe",
    kpiProjected: "2026 projectie",
    kpiQualified: "Boven drempel",
    kpiBest: "Beste score",
    noScore: "Geen score",
    thresholdText: "Opus 4.5 drempel: {threshold}",
    chartTitle: "Gecombineerde modelreleases",
    projectionNote: "Projectie t/m 31 december 2026",
    providerBreakdownTitle: "Provideroverzicht",
    providerBreakdownSubtitle: "Releases en hoogste AA-score",
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
    noRows: "Geen rijen",
    pageCount: "Pagina {page} / {totalPages}",
    pageRange: "{startRow}-{endRow} van {totalRows}",
    maybeAddTitle: "Misschien nog toevoegen",
    sourcesTitle: "Bronnen",
  },
  en: {
    documentTitle: "Agentic Model Release Tracker",
    eyebrow: "Agentic work + programming",
    title: "AI model releases are accelerating",
    subtitle:
      "Track releases from frontier labs, Chinese labs, and other high-impact players. The Opus 4.5 Coding Index score is the “good enough” threshold.",
    downloadChart: "Download image",
    resetFilters: "Reset filters",
    groupLabel: "Group",
    groupAll: "All groups",
    groupCustom: "Custom group",
    minCodingIndex: "Minimum Coding Index",
    fromDate: "From",
    toDate: "To",
    scoredOnly: "Only with AA score",
    kpiTotal: "Total",
    kpiYtd: "2026 YTD",
    kpiProjected: "2026 projected",
    kpiQualified: "Above threshold",
    kpiBest: "Best score",
    noScore: "No score",
    thresholdText: "Opus 4.5 threshold: {threshold}",
    chartTitle: "Combined model releases",
    projectionNote: "Projection through December 31, 2026",
    providerBreakdownTitle: "Provider breakdown",
    providerBreakdownSubtitle: "Releases and highest AA score",
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
    noRows: "No rows",
    pageCount: "Page {page} / {totalPages}",
    pageRange: "{startRow}-{endRow} of {totalRows}",
    maybeAddTitle: "Maybe add next",
    sourcesTitle: "Sources",
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
};

function init() {
  populateProviderFilters();
  populateSources();
  setDateDefaults();
  state.providers = getProvidersForGroup(RELEASES, state.group);
  syncProviderControls();
  bindControls();
  applyLanguage();
  render();
}

function getInitialLanguage() {
  const params = new URLSearchParams(window.location.search);
  const requestedLanguage = params.get("lang") || localStorage.getItem("dashboardLanguage");
  return translations[requestedLanguage] ? requestedLanguage : DEFAULT_LANGUAGE;
}

function t(key, replacements = {}) {
  const template = translations[state.language][key] ?? translations[DEFAULT_LANGUAGE][key] ?? key;
  return Object.entries(replacements).reduce((value, [name, replacement]) => value.replace(`{${name}}`, replacement), template);
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

function populateProviderFilters() {
  const container = document.querySelector("#providerFilters");
  const providers = [...new Set(RELEASES.map((item) => item.provider))].sort();
  container.innerHTML = providers
    .map(
      (provider) => `
        <label class="check-pill">
          <input type="checkbox" value="${provider}" />
          <span>${provider}</span>
        </label>
      `,
    )
    .join("");
}

function populateSources() {
  document.querySelector("#sourceList").innerHTML = DATA_SOURCES.map(
    (source) => `<a href="${source.url}" target="_blank" rel="noreferrer">${source.label}</a>`,
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
    document.querySelector("#scoreValue").textContent = state.minScore.toFixed(1);
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
  document.querySelectorAll(".language-button").forEach((button) => {
    button.addEventListener("click", () => {
      state.language = button.dataset.language;
      localStorage.setItem("dashboardLanguage", state.language);
      applyLanguage();
      render();
    });
  });
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
  document.querySelector("#groupFilter").value = "all";
  document.querySelector("#scoreFilter").value = "0";
  document.querySelector("#scoreValue").textContent = "0.0";
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
  document.querySelector("#thresholdText").textContent = t("thresholdText", { threshold: OPUS_45_CODING_THRESHOLD });
}

function renderChart(models) {
  const canvas = document.querySelector("#releaseCanvas");
  const ctx = canvas.getContext("2d");
  const dpr = window.devicePixelRatio || 1;
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  canvas.width = Math.floor(width * dpr);
  canvas.height = Math.floor(height * dpr);
  ctx.scale(dpr, dpr);

  const series = buildChartSeries(models, TODAY);
  const projection = calculateProjection(models, TODAY);
  const maxValue = Math.max(1, ...series.observed, projection.projected);
  const padding = { left: 58, right: 48, top: 46, bottom: 58 };
  const points = getProjectedChartPoints(series, padding, width, height);

  ctx.clearRect(0, 0, width, height);
  drawGrid(ctx, width, height, padding, maxValue);
  drawArea(ctx, points, height, padding);
  drawLine(ctx, points, "#4f95ff", false);
  drawProjectedLine(ctx, points);
  drawPoints(ctx, points);
  drawLabels(ctx, points, projection);
}

function drawGrid(ctx, width, height, padding, maxValue) {
  ctx.strokeStyle = "rgba(160, 190, 230, 0.18)";
  ctx.lineWidth = 1;
  ctx.font = "12px Inter, system-ui, sans-serif";
  ctx.fillStyle = "#8da8c9";
  for (let i = 0; i <= 4; i += 1) {
    const y = padding.top + ((height - padding.top - padding.bottom) * i) / 4;
    const value = Math.round(maxValue - (maxValue * i) / 4);
    ctx.beginPath();
    ctx.moveTo(padding.left, y);
    ctx.lineTo(width - padding.right, y);
    ctx.stroke();
    ctx.fillText(String(value), 16, y + 4);
  }
}

function drawArea(ctx, points, height, padding) {
  if (points.length === 0) return;
  const gradient = ctx.createLinearGradient(0, padding.top, 0, height - padding.bottom);
  gradient.addColorStop(0, "rgba(66, 133, 245, 0.42)");
  gradient.addColorStop(1, "rgba(66, 133, 245, 0.02)");
  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.moveTo(points[0].x, height - padding.bottom);
  points.forEach((point) => ctx.lineTo(point.x, point.y));
  ctx.lineTo(points[points.length - 1].x, height - padding.bottom);
  ctx.closePath();
  ctx.fill();
}

function drawLine(ctx, points, color, dashed) {
  if (points.length === 0) return;
  ctx.strokeStyle = color;
  ctx.lineWidth = 3;
  ctx.setLineDash(dashed ? [7, 7] : []);
  ctx.beginPath();
  points.forEach((point, index) => {
    if (index === 0) ctx.moveTo(point.x, point.y);
    else ctx.lineTo(point.x, point.y);
  });
  ctx.stroke();
  ctx.setLineDash([]);
}

function drawProjectedLine(ctx, points) {
  const projectedIndex = points.findIndex((point) => point.projected !== null);
  const projectedPoint = points[projectedIndex];
  const previousPoint = points[projectedIndex - 1];
  if (!previousPoint || !projectedPoint?.projectedPoint) return;

  drawLine(
    ctx,
    [
      { x: previousPoint.x, y: previousPoint.y },
      { x: projectedPoint.projectedPoint.x, y: projectedPoint.projectedPoint.y },
    ],
    "#41e2c0",
    true,
  );
}

function drawPoints(ctx, points) {
  points.forEach((point) => {
    ctx.beginPath();
    ctx.fillStyle = "#ffffff";
    ctx.arc(point.x, point.y, 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.fillStyle = "#2d7dff";
    ctx.arc(point.x, point.y, 4, 0, Math.PI * 2);
    ctx.fill();
  });
}

function drawLabels(ctx, points, projection) {
  ctx.font = "700 16px Inter, system-ui, sans-serif";
  ctx.fillStyle = "#eef5ff";
  ctx.textAlign = "center";
  points.forEach((point) => {
    ctx.fillText(String(point.observed), point.x, point.y - 14);
    ctx.font = "12px Inter, system-ui, sans-serif";
    ctx.fillStyle = "#9bb9dc";
    ctx.fillText(String(point.year), point.x, 394);
    ctx.font = "700 16px Inter, system-ui, sans-serif";
    ctx.fillStyle = "#eef5ff";
  });
  const current = points.find((point) => point.year === projection.currentYear);
  if (current?.projectedPoint) {
    ctx.fillStyle = "#41e2c0";
    ctx.fillText(String(projection.projected), current.projectedPoint.x, Math.max(34, current.projectedPoint.y - 8));
  }
}

function renderProviderBreakdown(models) {
  const rows = groupByProvider(models);
  const maxReleases = Math.max(1, ...rows.map((row) => row.releases));
  document.querySelector("#providerBreakdown").innerHTML = rows
    .map(
      (row) => `
        <div class="provider-row">
          <div class="provider-name">
            <span class="swatch" style="background:${providerColors[row.provider] || "#8da8c9"}"></span>
            ${row.provider}
          </div>
          <div class="bar-track">
            <span style="width:${(row.releases / maxReleases) * 100}%; background:${providerColors[row.provider] || "#8da8c9"}"></span>
          </div>
          <div class="provider-stat">${row.releases}</div>
          <div class="provider-score">${row.latestMaxScore ?? "n/a"}</div>
        </div>
      `,
    )
    .join("");
}

function renderTable(models) {
  const sortedRows = sortReleases(models, state.tableSort);
  const paginated = paginateRows(sortedRows, { page: state.tablePage, pageSize: state.tablePageSize });
  state.tablePage = paginated.page;
  updateSortButtons();
  updatePagination(paginated);
  document.querySelector("#releaseTable tbody").innerHTML = paginated.rows
    .map(
      (item) => `
        <tr>
          <td>${item.releaseDate}</td>
          <td>${item.provider}</td>
          <td>${item.model}</td>
          <td>${item.group}</td>
          <td class="${item.codingIndex >= OPUS_45_CODING_THRESHOLD ? "good-score" : ""}">${item.codingIndex ?? "n/a"}</td>
          <td>${item.notes}</td>
          <td><a href="${item.sourceUrl}" target="_blank" rel="noreferrer">${t("makerLink")}</a></td>
        </tr>
      `,
    )
    .join("");
}

function updateSortButtons() {
  document.querySelectorAll("[data-sort-key]").forEach((button) => {
    const isActive = button.dataset.sortKey === state.tableSort.key;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-sort", isActive ? (state.tableSort.direction === "asc" ? "ascending" : "descending") : "none");
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
