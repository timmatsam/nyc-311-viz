# NYC 311 — Illegal Parking Dashboard

Visualizes NYC 311 Illegal Parking complaints using the [NYC Open Data](https://data.cityofnewyork.us/Social-Services/311-Service-Requests-from-2020-to-Present/erm2-nwe9) Socrata API. Data is scoped to the last 30 days.

## Setup

```bash
pnpm install
pnpm dev
```

Open [http://localhost:5173](http://localhost:5173).

## Environment Variables

Create a `.env.local` file in the project root:

```env
# Optional: Socrata app token — grants 1,000 req/rolling hour (vs unspecified shared limit)
# Register free at https://data.cityofnewyork.us
VITE_SOCRATA_APP_TOKEN=your_token_here

# Optional: swap to a backend proxy URL when adding a server layer
VITE_API_BASE_URL=https://data.cityofnewyork.us/resource/erm2-nwe9.json
```

## Build

```bash
pnpm build
pnpm preview
```

---

## Illegal Parking Complaint Types

The dashboard visualizes all 14 sub-types (descriptors) of Illegal Parking complaints:

| Descriptor | What it means |
|---|---|
| **Blocked Hydrant** | A vehicle parked in front of a fire hydrant, blocking emergency access. |
| **Posted Parking Sign Violation** | Parking that ignores a posted sign — alternate side, no parking zone, or street cleaning rules. |
| **Blocked Sidewalk** | A vehicle parked on or across a sidewalk, obstructing pedestrian access. |
| **Blocked Crosswalk** | A vehicle parked within a crosswalk, blocking pedestrian street crossing. |
| **Commercial Overnight Parking** | A commercial vehicle (truck, van with signage/commercial plates) parked on a residential street overnight without a permit. |
| **Double Parked Blocking Traffic** | A vehicle parked alongside another parked car, blocking a lane of moving traffic. |
| **Parking Permit Improper Use** | A placard or parking permit being used fraudulently or by someone not entitled to it. |
| **Double Parked Blocking Vehicle** | A vehicle double-parked and blocking another parked vehicle from leaving. |
| **Blocked Bike Lane** | A vehicle parked in a designated bike lane, forcing cyclists into traffic. |
| **License Plate Obscured** | A vehicle with a deliberately covered, altered, or unreadable license plate. |
| **Paper License Plates** | A vehicle displaying paper/temporary plates, often associated with plate fraud. |
| **Unauthorized Bus Layover** | A bus idling or staging in a location not designated for bus layovers. |
| **Overnight Commercial Storage** | A commercial vehicle repeatedly using a public street spot as long-term storage. |
| **Detached Trailer** | A truck trailer abandoned on a public street after the cab has driven away. |

## Future Enhancements

- Add borough + date range filters
- Expand to other car-related complaint types (Blocked Driveway, Noise - Vehicle, Abandoned Vehicle, etc.)
- Connect to a backend/database for caching and historical analysis
