# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev          # start Vite dev server (frontend only, no API)
pnpm build        # tsc + vite build
pnpm preview      # preview production build locally
vercel dev        # run frontend + Vercel serverless API together locally
```

No test runner is configured.

## Architecture

This is a **Vite + React SPA** deployed on Vercel, visualizing NYC 311 Illegal Parking complaints sourced from the NYC Open Data Socrata API (`erm2-nwe9`).

### Data flow

Most data fetches happen **client-side** directly from Socrata via SoQL queries in `src/api/nyc311.ts`. The one exception is response-time computation: `api/response-times.ts` is a **Vercel serverless function** (`@vercel/node`) that fans out 10 parallel paginated Socrata requests (50k records total) and aggregates the results server-side, returning precomputed averages by descriptor and precinct. This avoids pushing large datasets to the browser.

All API calls are wrapped in **TanStack Query** hooks (`src/hooks/use311Data.ts`). Query keys always include `[dateRange.start, dateRange.end, borough]` so filters cause automatic re-fetches.

### State

Global filter state (`borough: string`, `dateRange: DateRange`) lives in `App.tsx` and is passed as props to every chart/table component. There is no global state manager.

### Key types

`DateRange` (`src/types/index.ts`) has `start`, `end`, and `label` fields, all ISO timestamp strings. Socrata returns timestamps **without timezone** — they are Eastern Time wall-clock values. `src/utils/date.ts` handles parsing these correctly via an Intl round-trip offset correction (`parseAsET`). Always use this utility when displaying or computing durations from Socrata dates.

### Environment variables

| Variable | Used in | Purpose |
|---|---|---|
| `VITE_API_BASE_URL` | frontend | Override Socrata endpoint |
| `VITE_SOCRATA_APP_TOKEN` | frontend | Socrata rate-limit token |
| `SOCRATA_BASE_URL` | serverless fn | Override Socrata endpoint |
| `SOCRATA_APP_TOKEN` | serverless fn | Socrata rate-limit token |

Without tokens the app still works but hits Socrata's unauthenticated rate limits.

### Static data

`src/data/fines.ts` contains a hardcoded NYC parking fine schedule keyed by `descriptor` string. `FineLegend` and related components read from this; it is not fetched from any API.
