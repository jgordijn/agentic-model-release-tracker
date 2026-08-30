import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import vm from "node:vm";

async function loadAppLogic() {
  const app = await readFile(new URL("../src/app.js", import.meta.url), "utf8");
  const block = app.match(/\/\* testable-logic:start \*\/([\s\S]*?)\/\* testable-logic:end \*\//)?.[1];

  assert.ok(block, "testable app logic block");
  const sandbox = { result: null };
  vm.runInNewContext(
    `${block}; result = { truncateText, positionCurrentYear, findNearestChartTarget, getProjectionAnnotationLayout, getActiveFilterCount };`,
    sandbox,
  );
  return sandbox.result;
}

test("app icon is referenced by the HTML shell", async () => {
  const html = await readFile(new URL("../index.html", import.meta.url), "utf8");

  assert.match(html, /<link rel="icon" type="image\/png" href="\.\/assets\/app-icon\.png" \/>/);
  assert.match(html, /<link rel="apple-touch-icon" href="\.\/assets\/app-icon\.png" \/>/);
});

test("app date defaults are derived from release data", async () => {
  const app = await readFile(new URL("../src/app.js", import.meta.url), "utf8");

  assert.match(app, /const TODAY = RELEASES\.reduce\(/);
  assert.doesNotMatch(app, /const TODAY = "\d{4}-\d{2}-\d{2}"/);
});

test("HTML and module imports use the August 30 data cache key", async () => {
  const html = await readFile(new URL("../index.html", import.meta.url), "utf8");
  const app = await readFile(new URL("../src/app.js", import.meta.url), "utf8");

  assert.match(html, /src="\.\/src\/app\.js\?v=20260830a"/);
  assert.match(app, /"\.\/modelData\.js\?v=20260830a"/);
  assert.match(app, /"\.\/dashboardLogic\.js\?v=20260830a"/);
});

test("provider release checklist covers Meta and Tencent primary sources", async () => {
  const source = await readFile(new URL("../scripts/provider-release-sources.json", import.meta.url), "utf8");
  const config = JSON.parse(source);

  for (const providerName of ["Meta", "Tencent"]) {
    const provider = config.providers.find((entry) => entry.name === providerName);

    assert.ok(provider, providerName);
    assert.ok(provider.primarySources.length > 0, providerName);
    assert.ok(provider.searchQueries.length > 0, providerName);
  }

  const alibaba = config.providers.find((entry) => entry.name === "Alibaba");
  assert.ok(alibaba.primarySources.includes("https://www.qwencloud.com/models"));
  assert.ok(alibaba.searchQueries.some((query) => query.includes("qwencloud.com/models")));
});

test("chart projection is drawn as a green dashed same-year trend", async () => {
  const app = await readFile(new URL("../src/app.js", import.meta.url), "utf8");

  assert.match(app, /\{ x: projectedPoint\.x, y: projectedPoint\.y \}/);
  assert.match(app, /projectedPoint\.projectedPoint/);
  assert.match(app, /"#41e2c0"/);
  assert.doesNotMatch(app, /points\[projectedIndex - 1\]/);
});

test("chart draws y-axis tick labels from the shared chart ceiling", async () => {
  const app = await readFile(new URL("../src/app.js", import.meta.url), "utf8");

  assert.match(app, /getChartMaxValue/);
  assert.match(app, /ctx\.fillText\(String\(value\)/);
});

test("chart year labels anchor to the plot bottom instead of a fixed pixel", async () => {
  const app = await readFile(new URL("../src/app.js", import.meta.url), "utf8");

  assert.match(app, /height - padding\.bottom \+ 20/);
  assert.doesNotMatch(app, /, 394\)/);
});

test("vertical gridlines align with the plotted year points", async () => {
  const app = await readFile(new URL("../src/app.js", import.meta.url), "utf8");

  assert.match(app, /ctx\.moveTo\(point\.x, padding\.top\)/);
});

test("canvas labels and translations localize the projected word and year", async () => {
  const app = await readFile(new URL("../src/app.js", import.meta.url), "utf8");

  assert.match(app, /t\("chartProjectedWord"\)/);
  assert.doesNotMatch(app, /fillText\("projected"/);
  assert.match(app, /\{year\}/);
  assert.doesNotMatch(app, /2026 (YTD|projectie|projected|tot nu toe)/);
  assert.doesNotMatch(app, /december 2026/i);
});

test("chart redraws when the window resizes", async () => {
  const app = await readFile(new URL("../src/app.js", import.meta.url), "utf8");

  assert.match(app, /addEventListener\("resize"/);
  assert.match(app, /ResizeObserver/);
});

test("current-year chart layout separates YTD from the year-end projection", async () => {
  const { positionCurrentYear } = await loadAppLogic();
  const points = [
    { year: 2025, x: 100, y: 80, observed: 34, projected: null, projectedPoint: null },
    { year: 2026, x: 200, y: 50, observed: 53, projected: 82, projectedPoint: { x: 200, y: 20, value: 82 } },
  ];

  const positioned = positionCurrentYear(points, {
    currentYear: 2026,
    daysElapsed: 182,
    daysInYear: 364,
  });

  assert.equal(positioned[1].x, 150);
  assert.equal(positioned[1].projectedPoint.x, 200);
  assert.equal(points[1].x, 200, "input remains trustworthy and unmodified");

  const unchanged = positionCurrentYear(points, { currentYear: 2027, daysElapsed: 1, daysInYear: 365 });
  assert.deepEqual(JSON.parse(JSON.stringify(unchanged)), points);
});

test("projected endpoint labels use a separate gutter and marker labels stay anchored", async () => {
  const { getProjectionAnnotationLayout } = await loadAppLogic();
  const current = { x: 430, y: 180, projectedPoint: { x: 500, y: 72 } };
  const roomy = getProjectionAnnotationLayout(current, { left: 54, right: 82, top: 70 }, 582);

  assert.equal(roomy.endpoint.x, 512);
  assert.equal(roomy.endpoint.textAlign, "left");
  assert.equal(roomy.ytd.markerX, current.x);
  assert.equal(roomy.yearEnd.markerX, current.projectedPoint.x);
  assert.ok(roomy.ytd.textX < roomy.ytd.markerX);
  assert.ok(roomy.yearEnd.textX <= roomy.yearEnd.markerX);

  const cramped = getProjectionAnnotationLayout(current, { left: 54, right: 20, top: 70 }, 520);
  assert.equal(cramped.endpoint.x, 488);
  assert.equal(cramped.endpoint.textAlign, "right");
});

test("active filter count treats providers as one filter category", async () => {
  const { getActiveFilterCount } = await loadAppLogic();
  const defaults = { after: "2022-11-30", before: "2026-08-26", providerCount: 15 };

  assert.equal(getActiveFilterCount({
    group: "all", providers: Array(15).fill("provider"), minScore: 0, scoredOnly: false,
    after: defaults.after, before: defaults.before,
  }, defaults), 0);
  assert.equal(getActiveFilterCount({
    group: "custom", providers: ["OpenAI"], minScore: 50, scoredOnly: true,
    after: "2025-01-01", before: defaults.before,
  }, defaults), 4);
  assert.equal(getActiveFilterCount({
    group: "Frontier labs", providers: ["OpenAI", "Google"], minScore: 0, scoredOnly: false,
    after: defaults.after, before: defaults.before,
  }, defaults), 1);
});

test("chart hit testing chooses only a nearby visual point", async () => {
  const { findNearestChartTarget } = await loadAppLogic();
  const targets = [
    { x: 10, y: 10, label: "first" },
    { x: 50, y: 50, label: "second" },
  ];

  assert.equal(findNearestChartTarget(targets, 48, 51, 12).label, "second");
  assert.equal(findNearestChartTarget(targets, 30, 30, 12), null);
  assert.equal(findNearestChartTarget([], 0, 0, 12), null);
});

test("long table notes are shortened at a word boundary without changing the source", async () => {
  const { truncateText } = await loadAppLogic();

  assert.deepEqual(JSON.parse(JSON.stringify(truncateText("Short note", 20))), { text: "Short note", truncated: false });
  assert.deepEqual(JSON.parse(JSON.stringify(truncateText("A longer note with details", 14))), { text: "A longer note…", truncated: true });
  assert.deepEqual(JSON.parse(JSON.stringify(truncateText("Supercalifragilistic", 8))), { text: "Superca…", truncated: true });
});

test("chart exposes pointer and keyboard exploration with a localized tooltip", async () => {
  const app = await readFile(new URL("../src/app.js", import.meta.url), "utf8");

  assert.match(app, /addEventListener\("pointermove"/);
  assert.match(app, /addEventListener\("keydown"/);
  assert.match(app, /className = "chart-tooltip"/);
  assert.match(app, /canvas\.setAttribute\("aria-label"/);
});

test("mobile filter disclosure defaults by viewport and keeps accessible state", async () => {
  const app = await readFile(new URL("../src/app.js", import.meta.url), "utf8");

  assert.match(app, /matchMedia\("\(max-width: 620px\)"\)/);
  assert.match(app, /#filterToggle, \.filter-toggle/);
  assert.match(app, /#filterControls, \.filter-controls/);
  assert.match(app, /setAttribute\("aria-expanded", String\(expanded\)\)/);
  assert.match(app, /controls\.hidden = !expanded/);
  assert.match(app, /updateActiveFilterCount/);
});

test("dynamic HTML rendering escapes interpolated data", async () => {
  const app = await readFile(new URL("../src/app.js", import.meta.url), "utf8");

  assert.match(app, /function escapeHtml/);
  assert.match(app, /escapeHtml\(item\.notes\)/);
  assert.match(app, /escapeHtml\(item\.sourceUrl\)/);
  assert.match(app, /escapeHtml\(provider\)/);
});

test("table sort state is exposed via aria-sort on the header cell", async () => {
  const app = await readFile(new URL("../src/app.js", import.meta.url), "utf8");

  assert.match(app, /closest\("th"\)\.setAttribute\("aria-sort"/);
});

test("provider rows and table cells expose useful interactions and semantics", async () => {
  const app = await readFile(new URL("../src/app.js", import.meta.url), "utf8");

  assert.match(app, /class="provider-row" type="button"/);
  assert.match(app, /data-filter-provider/);
  assert.match(app, /class="note-toggle"/);
  assert.match(app, /<time datetime=/);
  assert.match(app, /colspan="7"/);
});

test("new semantic shell labels have complete English and Dutch translations", async () => {
  const app = await readFile(new URL("../src/app.js", import.meta.url), "utf8");

  for (const key of [
    "skipToContent",
    "languageLabel",
    "filtersTitle",
    "providersTitle",
    "kpiSectionTitle",
    "minScoreHelp",
    "chartActualLabel",
    "chartAxisLabel",
    "providerReleasesLabel",
    "providerBestScoreLabel",
    "tableScrollHint",
    "dataFreshnessLabel",
    "dataUtcLabel",
    "notesSectionTitle",
  ]) {
    assert.equal((app.match(new RegExp(`\\b${key}:`, "g")) ?? []).length, 2, key);
  }
  assert.match(app, /querySelector\("#dataFreshness"\)/);
  assert.match(app, /date: formatDisplayDate\(TODAY\)/);
});

test("keyboard focus is visible on provider pills and controls", async () => {
  const css = await readFile(new URL("../styles.css", import.meta.url), "utf8");

  assert.match(css, /\.check-pill input:focus-visible \+ span/);
});

test("language toggle exposes Dutch and English flag buttons", async () => {
  const html = await readFile(new URL("../index.html", import.meta.url), "utf8");
  const app = await readFile(new URL("../src/app.js", import.meta.url), "utf8");

  assert.match(html, /data-language="en"[^>]*aria-label="English"/);
  assert.match(html, /data-language="nl"[^>]*aria-label="Nederlands"/);
  assert.match(html, /🇬🇧/);
  assert.match(html, /🇳🇱/);
  assert.match(app, /const translations = \{/);
  assert.match(app, /localStorage\.setItem\("dashboardLanguage", state\.language\)/);
});

test("Pages workflow includes project assets in the deployed site", async () => {
  const workflow = await readFile(new URL("../.github/workflows/pages.yml", import.meta.url), "utf8");

  assert.match(workflow, /cp -R assets site\/assets/);
});
