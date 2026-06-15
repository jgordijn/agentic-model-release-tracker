import { DATA_SOURCES, IMPORTANT_MISSING_LABS, RELEASES } from "./modelData.js?v=20220604i";
import {
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
const state = {
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
  render();
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
  document.querySelector("#kpiBest").textContent = best ? `${best.model} (${best.codingIndex})` : "Geen score";
  document.querySelector("#thresholdText").textContent = "Observed releases with 2026 YTD and projection";
  document.querySelector("#chartYtd").textContent = projection.ytd;
  document.querySelector("#chartProjected").textContent = projection.projected;
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
  const padding = { left: 58, right: 88, top: 42, bottom: 58 };
  const points = getProjectedChartPoints(series, padding, width, height);

  ctx.clearRect(0, 0, width, height);
  drawChartBackground(ctx, width, height, padding);
  drawGrid(ctx, width, height, padding, maxValue);
  drawArea(ctx, points, height, padding);
  drawLine(ctx, points, "#4f95ff", false);
  drawProjectedLine(ctx, points);
  drawPoints(ctx, points);
  drawLabels(ctx, points, projection);
}

function drawChartBackground(ctx, width, height, padding) {
  const glow = ctx.createRadialGradient(width * 0.52, padding.top, 10, width * 0.52, padding.top, width * 0.72);
  glow.addColorStop(0, "rgba(53, 130, 255, 0.28)");
  glow.addColorStop(0.45, "rgba(18, 58, 110, 0.18)");
  glow.addColorStop(1, "rgba(2, 8, 20, 0)");
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, width, height);

  ctx.strokeStyle = "rgba(68, 139, 255, 0.18)";
  ctx.lineWidth = 1;
  ctx.strokeRect(padding.left, padding.top, width - padding.left - padding.right, height - padding.top - padding.bottom);
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
  }

  ctx.strokeStyle = "rgba(160, 190, 230, 0.12)";
  for (let i = 0; i <= 4; i += 1) {
    const x = padding.left + ((width - padding.left - padding.right) * i) / 4;
    ctx.beginPath();
    ctx.moveTo(x, padding.top);
    ctx.lineTo(x, height - padding.bottom);
    ctx.stroke();
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
  ctx.shadowBlur = dashed ? 0 : 18;
  ctx.strokeStyle = color;
  ctx.lineWidth = 3;
  ctx.setLineDash(dashed ? [7, 7] : []);
  ctx.beginPath();
  drawSmoothPath(ctx, points);
  ctx.stroke();
  ctx.setLineDash([]);
  ctx.restore();
}

function drawSmoothPath(ctx, points, options = {}) {
  if (points.length === 0) return;
  if (!options.continueFromCurrentPoint) {
    ctx.moveTo(points[0].x, points[0].y);
  }
  if (points.length === 1) return;

  // Catmull-Rom to cubic Bézier: keeps the line fluent while passing through
  // every actual release-count point instead of cutting across/around them.
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
    ctx.strokeStyle = "rgba(79, 149, 255, 0.34)";
    ctx.lineWidth = 2;
    ctx.arc(point.x, point.y, 10, 0, Math.PI * 2);
    ctx.stroke();
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
    ctx.font = "700 16px Inter, system-ui, sans-serif";
    ctx.fillText(String(projection.projected), current.projectedPoint.x, Math.max(34, current.projectedPoint.y - 8));
    ctx.font = "12px Inter, system-ui, sans-serif";
    ctx.fillText("projected", current.projectedPoint.x, Math.max(50, current.projectedPoint.y + 10));
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
          <td class="${item.codingIndex !== null ? "good-score" : ""}">${item.codingIndex ?? "n/a"}</td>
          <td>${item.notes}</td>
          <td><a href="${item.sourceUrl}" target="_blank" rel="noreferrer">maker</a></td>
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
      ? "Geen rijen"
      : `${paginated.startRow}-${paginated.endRow} van ${paginated.totalRows}`;
  document.querySelector("#pageCount").textContent = `Pagina ${paginated.page} / ${paginated.totalPages}`;
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
