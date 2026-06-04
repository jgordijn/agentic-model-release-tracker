import { DATA_SOURCES, IMPORTANT_MISSING_LABS, RELEASES } from "./modelData.js?v=20220604d";
import {
  OPUS_45_CODING_THRESHOLD,
  applyFilters,
  buildChartSeries,
  calculateProjection,
  getProjectedChartPoints,
  groupByProvider,
  summarizeReleases,
} from "./dashboardLogic.js?v=20220604d";

const TODAY = "2026-06-04";
const state = {
  group: "all",
  providers: [],
  minScore: 0,
  scoredOnly: false,
  after: "",
  before: "",
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
    render();
  });
  document.querySelector("#scoreFilter").addEventListener("input", (event) => {
    state.minScore = Number(event.target.value);
    document.querySelector("#scoreValue").textContent = state.minScore.toFixed(1);
    render();
  });
  document.querySelector("#scoredOnly").addEventListener("change", (event) => {
    state.scoredOnly = event.target.checked;
    render();
  });
  document.querySelector("#dateAfter").addEventListener("change", (event) => {
    state.after = event.target.value;
    render();
  });
  document.querySelector("#dateBefore").addEventListener("change", (event) => {
    state.before = event.target.value;
    render();
  });
  document.querySelector("#providerFilters").addEventListener("change", () => {
    state.providers = [...document.querySelectorAll("#providerFilters input:checked")].map((item) => item.value);
    render();
  });
  document.querySelector("#resetFilters").addEventListener("click", resetFilters);
  document.querySelector("#downloadChart").addEventListener("click", downloadCanvas);
}

function resetFilters() {
  state.group = "all";
  state.providers = [];
  state.minScore = 0;
  state.scoredOnly = false;
  state.after = [...RELEASES.map((release) => release.releaseDate)].sort()[0];
  state.before = TODAY;
  document.querySelector("#groupFilter").value = "all";
  document.querySelector("#scoreFilter").value = "0";
  document.querySelector("#scoreValue").textContent = "0.0";
  document.querySelector("#scoredOnly").checked = false;
  document.querySelector("#dateAfter").value = state.after;
  document.querySelector("#dateBefore").value = state.before;
  document.querySelectorAll("#providerFilters input").forEach((item) => {
    item.checked = false;
  });
  render();
}

function render() {
  const filtered = applyFilters(RELEASES, state);
  renderKpis(filtered);
  renderChart(filtered);
  renderProviderBreakdown(filtered);
  renderTable(filtered);
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
  document.querySelector("#thresholdText").textContent = `Opus 4.5 drempel: ${OPUS_45_CODING_THRESHOLD}`;
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
  const projectedPoint = points.find((point) => point.projected !== null);
  if (!projectedPoint?.projectedPoint) return;
  drawLine(
    ctx,
    [
      { x: projectedPoint.x, y: projectedPoint.y },
      { x: projectedPoint.x + 54, y: projectedPoint.projectedPoint.y },
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
    ctx.fillText(`${projection.projected} projected`, current.x + 78, Math.max(34, current.projectedPoint.y - 8));
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
  const rows = [...models].sort((a, b) => b.releaseDate.localeCompare(a.releaseDate));
  document.querySelector("#releaseTable tbody").innerHTML = rows
    .map(
      (item) => `
        <tr>
          <td>${item.releaseDate}</td>
          <td>${item.provider}</td>
          <td>${item.model}</td>
          <td>${item.group}</td>
          <td class="${item.codingIndex >= OPUS_45_CODING_THRESHOLD ? "good-score" : ""}">${item.codingIndex ?? "n/a"}</td>
          <td>${item.notes}</td>
          <td><a href="${item.sourceUrl}" target="_blank" rel="noreferrer">maker</a></td>
        </tr>
      `,
    )
    .join("");
}

function downloadCanvas() {
  const link = document.createElement("a");
  link.download = "ai-model-release-projection.png";
  link.href = document.querySelector("#releaseCanvas").toDataURL("image/png");
  link.click();
}

init();
