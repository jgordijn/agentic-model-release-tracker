import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

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

test("chart projection is drawn as a green dashed trend with a same-year fallback start", async () => {
  const app = await readFile(new URL("../src/app.js", import.meta.url), "utf8");

  assert.match(app, /const startPoint = points\[projectedIndex - 1\] \?\? projectedPoint/);
  assert.match(app, /\{ x: startPoint\.x, y: startPoint\.y \}/);
  assert.match(app, /"#41e2c0"/);
  assert.doesNotMatch(app, /projectedPoint\.x \+ 54/);
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
