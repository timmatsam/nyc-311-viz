import type { VercelRequest, VercelResponse } from '@vercel/node'

const SOCRATA_URL =
  process.env.SOCRATA_BASE_URL ??
  'https://data.cityofnewyork.us/resource/erm2-nwe9.json'

const PAGE_SIZE = 5000
const TOTAL_PAGES = 10

interface ClosedRecord {
  descriptor: string
  created_date: string
  closed_date: string
}

interface ResponseTimeStat {
  descriptor: string
  avgMinutes: number
}

function buildHeaders(): Record<string, string> {
  const headers: Record<string, string> = { 'Content-Type': 'application/json' }
  if (process.env.SOCRATA_APP_TOKEN) {
    headers['X-App-Token'] = process.env.SOCRATA_APP_TOKEN
  }
  return headers
}

function buildWhere(start: string, end: string | undefined, borough: string | undefined): string {
  let where = `complaint_type='Illegal Parking' AND created_date>='${start}' AND closed_date IS NOT NULL`
  if (end) where += ` AND created_date<'${end}'`
  if (borough && borough !== 'All') where += ` AND borough='${borough}'`
  return where
}

async function fetchPage(where: string, offset: number): Promise<ClosedRecord[]> {
  const url = new URL(SOCRATA_URL)
  url.searchParams.set('$select', 'descriptor, created_date, closed_date')
  url.searchParams.set('$where', where)
  url.searchParams.set('$order', 'created_date DESC')
  url.searchParams.set('$limit', String(PAGE_SIZE))
  url.searchParams.set('$offset', String(offset))

  const res = await fetch(url.toString(), { headers: buildHeaders() })
  if (!res.ok) throw new Error(`Socrata error ${res.status}: ${res.statusText}`)
  return res.json() as Promise<ClosedRecord[]>
}

function diffMinutes(created: string, closed: string): number {
  return (new Date(closed).getTime() - new Date(created).getTime()) / 60_000
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { start, end, borough } = req.query as Record<string, string>

  if (!start) {
    return res.status(400).json({ error: 'Missing required param: start' })
  }

  try {
    const where = buildWhere(start, end || undefined, borough || undefined)

    const pages = Array.from({ length: TOTAL_PAGES }, (_, i) =>
      fetchPage(where, i * PAGE_SIZE)
    )
    const results = await Promise.all(pages)
    const records = results.flat()

    const byDescriptor = new Map<string, number[]>()
    let totalMinutes = 0

    for (const r of records) {
      const mins = diffMinutes(r.created_date, r.closed_date)
      if (mins < 0) continue
      totalMinutes += mins
      const arr = byDescriptor.get(r.descriptor)
      if (arr) arr.push(mins)
      else byDescriptor.set(r.descriptor, [mins])
    }

    const overallAvgMinutes = records.length > 0 ? totalMinutes / records.length : 0

    const byDescriptorAvg: ResponseTimeStat[] = Array.from(byDescriptor.entries())
      .map(([descriptor, times]) => ({
        descriptor,
        avgMinutes: Math.round(times.reduce((a, b) => a + b, 0) / times.length),
      }))
      .sort((a, b) => b.avgMinutes - a.avgMinutes)

    res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=600')

    return res.status(200).json({
      overallAvgMinutes: Math.round(overallAvgMinutes),
      byDescriptor: byDescriptorAvg,
      sampleSize: records.length,
    })
  } catch (err) {
    console.error('response-times error:', err)
    return res.status(500).json({ error: 'Failed to fetch response time data' })
  }
}
