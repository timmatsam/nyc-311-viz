import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { useClosedRecords } from '../../hooks/use311Data'
import type { DateRange } from '../../types'

function CustomTooltip({ active, payload }: { active?: boolean; payload?: { payload: { descriptor: string; avgMinutes: number } }[] }) {
  if (!active || !payload?.length) return null
  const { descriptor, avgMinutes } = payload[0].payload
  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg p-3 shadow-xl">
      <p className="text-white font-semibold text-sm mb-1">{descriptor}</p>
      <p className="text-emerald-400 text-sm">Avg. {avgMinutes} min to close</p>
    </div>
  )
}

export default function ResponseTimeChart({ borough, dateRange }: { borough: string; dateRange: DateRange }) {
  const { data, isLoading } = useClosedRecords(dateRange, borough === 'All' ? undefined : borough)
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 640
  const yAxisWidth = isMobile ? 100 : 156
  const marginLeft = isMobile ? 100 : 160

  const chartData = data?.byDescriptor ?? []

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 sm:p-6">
      <h2 className="text-sm font-medium text-gray-400 mb-1">Avg. NYPD Response Time by Type</h2>
      <p className="text-xs text-gray-600 mb-4">
        Closed complaints only · minutes from filed to closed
        {data ? ` · ${data.sampleSize.toLocaleString()} records sampled` : ''}
      </p>
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
            <XAxis
              type="number"
              tick={{ fill: '#6b7280', fontSize: 11 }}
              label={{ value: 'minutes', position: 'insideBottomRight', offset: -4, fill: '#4b5563', fontSize: 11 }}
            />
            <YAxis
              type="category"
              dataKey="descriptor"
              tick={{ fill: '#9ca3af', fontSize: isMobile ? 9 : 11 }}
              width={yAxisWidth}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: '#1f2937' }} />
            <Bar dataKey="avgMinutes" fill="#34d399" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  )
}
