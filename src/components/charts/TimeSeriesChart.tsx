import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { useDailyTrend } from '../../hooks/use311Data'
import type { DateRange } from '../../types'

export default function TimeSeriesChart({ borough, dateRange }: { borough: string; dateRange: DateRange }) {
  const { data, isLoading } = useDailyTrend(dateRange, borough === 'All' ? undefined : borough)

  const chartData = data?.map((d) => ({
    date: d.day.slice(0, 10),
    count: Number(d.count),
  })) ?? []

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
      <h2 className="text-sm font-medium text-gray-400 mb-4">Daily Complaints — Last 30 Days</h2>
      {isLoading ? (
        <div className="h-56 flex items-center justify-center text-gray-600 text-sm">Loading…</div>
      ) : (
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={chartData} margin={{ top: 4, right: 16, bottom: 0, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
            <XAxis
              dataKey="date"
              tick={{ fill: '#6b7280', fontSize: 11 }}
              tickFormatter={(v) => v.slice(5)}
              interval="preserveStartEnd"
            />
            <YAxis tick={{ fill: '#6b7280', fontSize: 11 }} width={40} />
            <Tooltip
              contentStyle={{ background: '#111827', border: '1px solid #374151', borderRadius: 8 }}
              labelStyle={{ color: '#e5e7eb', fontSize: 12 }}
              itemStyle={{ color: '#60a5fa' }}
            />
            <Line
              type="monotone"
              dataKey="count"
              stroke="#60a5fa"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  )
}
