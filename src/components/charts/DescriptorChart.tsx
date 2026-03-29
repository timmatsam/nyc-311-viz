import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { DESCRIPTOR_INFO } from '../../data/descriptors'
import { useDescriptorCounts } from '../../hooks/use311Data'
import type { DateRange } from '../../types'

function CustomTooltip({ active, payload }: { active?: boolean; payload?: { payload: { descriptor: string; count: number } }[] }) {
  if (!active || !payload?.length) return null
  const { descriptor, count } = payload[0].payload
  const definition = DESCRIPTOR_INFO[descriptor]
  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg p-3 max-w-xs shadow-xl">
      <p className="text-white font-semibold text-sm mb-1">{descriptor}</p>
      <p className="text-blue-400 text-sm mb-2">{count.toLocaleString()} complaints</p>
      {definition && <p className="text-gray-300 text-xs leading-relaxed">{definition}</p>}
    </div>
  )
}

export default function DescriptorChart({ borough, dateRange }: { borough: string; dateRange: DateRange }) {
  const { data, isLoading } = useDescriptorCounts(dateRange, borough === 'All' ? undefined : borough)
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 640
  const yAxisWidth = isMobile ? 100 : 156
  const marginLeft = isMobile ? 100 : 160

  const chartData = data?.map((d) => ({
    descriptor: d.descriptor,
    count: Number(d.count),
  })) ?? []

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 sm:p-6">
      <h2 className="text-sm font-medium text-gray-400 mb-4">Complaints by Type</h2>
      {isLoading ? (
        <div className="h-80 flex items-center justify-center text-gray-600 text-sm">Loading…</div>
      ) : (
        <ResponsiveContainer width="100%" height={320}>
          <BarChart
            data={chartData}
            layout="vertical"
            margin={{ top: 0, right: 12, bottom: 0, left: marginLeft }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" horizontal={false} />
            <XAxis type="number" tick={{ fill: '#6b7280', fontSize: 11 }} />
            <YAxis
              type="category"
              dataKey="descriptor"
              tick={{ fill: '#9ca3af', fontSize: isMobile ? 9 : 11 }}
              width={yAxisWidth}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: '#1f2937' }} />
            <Bar dataKey="count" fill="#60a5fa" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  )
}
