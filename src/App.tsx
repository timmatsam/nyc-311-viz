import { useState } from 'react'
import BoroughChart from './components/charts/BoroughChart'
import DescriptorChart from './components/charts/DescriptorChart'
import ResponseTimeChart from './components/charts/ResponseTimeChart'
import TimeSeriesChart from './components/charts/TimeSeriesChart'
import BoroughFilter from './components/BoroughFilter'
import DataTable from './components/DataTable'
import Layout from './components/Layout'
import ResolutionLegend from './components/ResolutionLegend'
import StatCards from './components/StatCards'
import TimeRangeFilter from './components/TimeRangeFilter'
import { buildLast30DaysRange } from './utils/date'
import type { DateRange } from './types'

export default function App() {
  const [borough, setBorough] = useState('All')
  const [dateRange, setDateRange] = useState<DateRange>(buildLast30DaysRange)

  return (
    <Layout
      dateLabel={dateRange.label}
      headerRight={
        <div className="flex items-center gap-2">
          <TimeRangeFilter value={dateRange} onChange={setDateRange} />
          <BoroughFilter value={borough} onChange={setBorough} />
        </div>
      }
    >
      <StatCards borough={borough} dateRange={dateRange} />
      <TimeSeriesChart borough={borough} dateRange={dateRange} />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DescriptorChart borough={borough} dateRange={dateRange} />
        <BoroughChart selectedBorough={borough} dateRange={dateRange} />
      </div>
      <ResponseTimeChart borough={borough} dateRange={dateRange} />
      <ResolutionLegend />
      <DataTable borough={borough} dateRange={dateRange} />
    </Layout>
  )
}
