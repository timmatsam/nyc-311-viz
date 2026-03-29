import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip, Legend } from 'recharts'
import { useBoroughCounts } from '../../hooks/use311Data'
import type { DateRange } from '../../types'

const COLORS = ['#60a5fa', '#34d399', '#f59e0b', '#f87171', '#a78bfa']
const DIM_OPACITY = 0.25

export default function BoroughChart({ selectedBorough, dateRange }: { selectedBorough: string; dateRange: DateRange }) {
  const { data, isLoading } = useBoroughCounts(dateRange)
  const isFiltered = selectedBorough !== 'All'

  const chartData = data
    ?.filter((d) => d.borough && d.borough !== 'Unspecified')
    .map((d) => ({ name: d.borough, value: Number(d.count) })) ?? []

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
      <h2 className="text-sm font-medium text-gray-400 mb-4">Complaints by Borough</h2>
      {isLoading ? (
        <div className="h-80 flex items-center justify-center text-gray-600 text-sm">Loading…</div>
      ) : (
        <ResponsiveContainer width="100%" height={320}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="45%"
              innerRadius={70}
              outerRadius={110}
              paddingAngle={3}
              dataKey="value"
            >
              {chartData.map((entry, i) => (
                <Cell
                  key={i}
                  fill={COLORS[i % COLORS.length]}
                  opacity={isFiltered && entry.name !== selectedBorough ? DIM_OPACITY : 1}
                />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{ background: '#111827', border: '1px solid #374151', borderRadius: 8 }}
              labelStyle={{ color: '#e5e7eb', fontSize: 12 }}
              formatter={(value) => [Number(value).toLocaleString(), 'Complaints']}
            />
            <Legend
              formatter={(value: string) => <span style={{ color: '#9ca3af', fontSize: 12 }}>{value}</span>}
            />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  )
}
