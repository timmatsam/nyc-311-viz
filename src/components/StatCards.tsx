import { useBoroughCounts, useClosedRecords, useDescriptorCounts } from '../hooks/use311Data'
import type { DateRange } from '../types'

function Card({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl px-6 py-5">
      <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">{label}</p>
      <p className="text-2xl sm:text-3xl font-bold text-white leading-tight break-words">{value}</p>
      {sub && <p className="text-xs text-gray-500 mt-1">{sub}</p>}
    </div>
  )
}

function formatMinutes(mins: number): string {
  if (mins < 60) return `${mins} min`
  const hrs = (mins / 60).toFixed(1)
  return `${hrs} hr`
}

function formatBoroughName(b: string): string {
  return b.charAt(0) + b.slice(1).toLowerCase()
}

export default function StatCards({ borough, dateRange }: { borough: string; dateRange: DateRange }) {
  const isFiltered = borough !== 'All'
  const descriptors = useDescriptorCounts(dateRange, isFiltered ? borough : undefined)
  const boroughs = useBoroughCounts(dateRange)
  const closed = useClosedRecords(dateRange, isFiltered ? borough : undefined)

  const total = descriptors.data?.reduce((sum, d) => sum + Number(d.count), 0) ?? null
  const topDescriptor = descriptors.data?.[0]?.descriptor ?? null

  const sorted = boroughs.data
    ? [...boroughs.data].sort((a, b) => Number(b.count) - Number(a.count))
    : []
  const totalBoroughCount = sorted.reduce((sum, b) => sum + Number(b.count), 0)
  const boroughRank = isFiltered
    ? sorted.findIndex((b) => b.borough === borough) + 1
    : 0
  const boroughCount = isFiltered
    ? sorted.find((b) => b.borough === borough)
    : null

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <Card
        label="Total Complaints"
        value={total !== null ? total.toLocaleString() : '—'}
        sub={isFiltered ? `${formatBoroughName(borough)} · ${dateRange.label}` : dateRange.label}
      />
      <Card
        label="Top Complaint"
        value={topDescriptor ?? '—'}
        sub={
          descriptors.data?.[0]
            ? `${Number(descriptors.data[0].count).toLocaleString()} reports`
            : undefined
        }
      />
      {isFiltered ? (
        <Card
          label="Borough Rank"
          value={boroughRank > 0 ? `#${boroughRank} of ${sorted.length}` : '—'}
          sub={
            boroughCount
              ? `${Number(boroughCount.count).toLocaleString()} complaints`
              : undefined
          }
        />
      ) : (
        <Card
          label="Most Active Borough"
          value={sorted[0]?.borough ? formatBoroughName(sorted[0].borough) : '—'}
          sub={
            sorted[0] && totalBoroughCount > 0
              ? `${Math.round((Number(sorted[0].count) / totalBoroughCount) * 100)}% of complaints`
              : undefined
          }
        />
      )}
      <Card
        label="Avg. Response Time"
        value={closed.data ? formatMinutes(closed.data.overallAvgMinutes) : '—'}
        sub={closed.data ? `Based on ${closed.data.sampleSize.toLocaleString()} closed complaints` : 'Loading…'}
      />
    </div>
  )
}
