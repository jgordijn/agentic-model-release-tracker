---
name: verify
description: Launch and drive the release-tracker dashboard to verify changes end-to-end in a real browser.
---

# Verifying the Agentic Model Release Tracker

Static dashboard (no build step). Surface is the browser GUI.

## Launch

```bash
PORT=4181 node server.js   # serves index.html + src/ at http://localhost:4181
```

Run it in the background; it logs the URL when ready. Any free port works.

## Drive

Open `http://localhost:4181` with the Chrome browser tools and screenshot.
Flows worth driving after a change:

- **Chart**: y-axis ticks, point-aligned vertical gridlines, year labels at the
  plot bottom, green dashed projection with its localized label.
- **Language toggle** (flag buttons, top right): all headings/KPIs/canvas labels
  switch NL↔EN; choice persists in `localStorage.dashboardLanguage` and via `?lang=`.
- **Filters**: date range, group select, provider pills, score slider — KPIs,
  chart, breakdown, and table must all re-render together.
- **Edge case**: set "Vanaf/From" to Jan 1 of the current year → single-year
  chart must still show a vertical dashed projection.
- **Table**: sort headers (aria-sort lives on the `th`), pagination clamps.

## Gotchas

- `resize_window` may not shrink the viewport below ~1366 CSS px; to test the
  mobile canvas, set `#releaseCanvas` style height to 330px and click Reset
  filters to force a synchronous re-render.
- `requestAnimationFrame` awaits hang over CDP when the window is occluded —
  don't await rAF in injected JS; trigger re-renders via a control click instead.
- Screenshot pixel coordinates are scaled relative to `window.innerWidth`
  (screenshots are 1366 wide); multiply DOM rect coords by 1366/innerWidth.
