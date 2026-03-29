import { buildLast30DaysRange, buildMonthRange, MONTH_NAMES, todayInET } from '../utils/date'
import type { DateRange } from '../types'

const LAST_30 = '__last30__'
const START_YEAR = 2020

function buildOptions(): { value: string; label: string }[] {
  const today = todayInET()
  const currentYear = Number(today.slice(0, 4))
  const currentMonth = Number(today.slice(5, 7))

  const options: { value: string; label: string }[] = [
    { value: LAST_30, label: 'Last 30 days' },
  ]

  for (let y = currentYear; y >= START_YEAR; y--) {
    const maxMonth = y === currentYear ? currentMonth : 12
    for (let m = maxMonth; m >= 1; m--) {
      options.push({
        value: `${y}-${m}`,
        label: `${MONTH_NAMES[m - 1].slice(0, 3)} ${y}`,
      })
    }
  }

  return options
}

const OPTIONS = buildOptions()

export default function TimeRangeFilter({
  value,
  onChange,
}: {
  value: DateRange
  onChange: (range: DateRange) => void
}) {
  const selectValue = value.label === 'Last 30 days'
    ? LAST_30
    : (() => {
        const [y, m] = value.start.split('-')
        return `${Number(y)}-${Number(m)}`
      })()

  return (
    <select
      value={selectValue}
      onChange={(e) => {
        const v = e.target.value
        if (v === LAST_30) {
          onChange(buildLast30DaysRange())
        } else {
          const [y, m] = v.split('-').map(Number)
          onChange(buildMonthRange(y, m))
        }
      }}
      className="bg-gray-800 border border-gray-700 text-gray-300 text-sm rounded-lg px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-blue-500"
    >
      {OPTIONS.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  )
}
