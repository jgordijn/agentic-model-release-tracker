import assert from "node:assert/strict";
import test from "node:test";

import { RELEASES } from "../src/modelData.js";

test("release dataset starts in 2022 and spans every year through 2026", () => {
  const years = [...new Set(RELEASES.map((release) => release.releaseDate.slice(0, 4)))].sort();
  assert.deepEqual(years, ["2022", "2023", "2024", "2025", "2026"]);
});

test("every release stores a maker or benchmark source URL", () => {
  for (const release of RELEASES) {
    assert.match(release.sourceUrl, /^https?:\/\//, release.model);
  }
});

test("frontier labs include pre-2025 releases for the requested chart range", () => {
  const frontierBefore2025 = RELEASES.filter(
    (release) => release.group === "Frontier labs" && release.releaseDate < "2025-01-01",
  );

  assert.ok(frontierBefore2025.length >= 10);
});
