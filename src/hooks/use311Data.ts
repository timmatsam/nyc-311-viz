import { useQuery } from '@tanstack/react-query'
import {
  fetchBoroughCounts,
  fetchDailyTrend,
  fetchDescriptorCounts,
  fetchRecentRequests,
  fetchResponseTimeStats,
} from '../api/nyc311'
import type { DateRange } from '../types'

export function useDescriptorCounts(dateRange: DateRange, borough?: string) {
  return useQuery({
    queryKey: ['descriptorCounts', dateRange.start, dateRange.end, borough],
    queryFn: () => fetchDescriptorCounts(dateRange, borough),
  })
}

export function useBoroughCounts(dateRange: DateRange) {
  return useQuery({
    queryKey: ['boroughCounts', dateRange.start, dateRange.end],
    queryFn: () => fetchBoroughCounts(dateRange),
  })
}

export function useDailyTrend(dateRange: DateRange, borough?: string) {
  return useQuery({
    queryKey: ['dailyTrend', dateRange.start, dateRange.end, borough],
    queryFn: () => fetchDailyTrend(dateRange, borough),
  })
}

export function useClosedRecords(dateRange: DateRange, borough?: string) {
  return useQuery({
    queryKey: ['closedRecords', dateRange.start, dateRange.end, borough],
    queryFn: () => fetchResponseTimeStats(dateRange, borough),
  })
}

export function useRecentRequests(dateRange: DateRange, page: number, borough?: string) {
  return useQuery({
    queryKey: ['recentRequests', dateRange.start, dateRange.end, page, borough],
    queryFn: () => fetchRecentRequests(dateRange, page, borough),
    placeholderData: (prev) => prev,
  })
}
