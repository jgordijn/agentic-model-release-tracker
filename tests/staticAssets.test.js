import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("app icon is referenced by the HTML shell", async () => {
  const html = await readFile(new URL("../index.html", import.meta.url), "utf8");

  assert.match(html, /<link rel="icon" type="image\/png" href="\.\/assets\/app-icon\.png" \/>/);
  assert.match(html, /<link rel="apple-touch-icon" href="\.\/assets\/app-icon\.png" \/>/);
});

test("Pages workflow includes project assets in the deployed site", async () => {
  const workflow = await readFile(new URL("../.github/workflows/pages.yml", import.meta.url), "utf8");

  assert.match(workflow, /cp -R assets site\/assets/);
});
