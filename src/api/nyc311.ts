import { BASE_URL, buildHeaders } from './config'
import type {
  BoroughCount,
  DailyTrend,
  DateRange,
  DescriptorCount,
  ResponseTimeResult,
  ServiceRequest,
} from '../types'

function baseWhere(dateRange: DateRange): string {
  let where = `complaint_type='Illegal Parking' AND created_date>='${dateRange.start}'`
  if (dateRange.end) where += ` AND created_date<'${dateRange.end}'`
  return where
}

function withBorough(where: string, borough?: string): string {
  if (!borough || borough === 'All') return where
  return `${where} AND borough='${borough}'`
}

async function soql<T>(params: Record<string, string>): Promise<T> {
  const url = new URL(BASE_URL)
  for (const [k, v] of Object.entries(params)) {
    url.searchParams.set(k, v)
  }
  const res = await fetch(url.toString(), { headers: buildHeaders() })
  if (!res.ok) throw new Error(`Socrata error ${res.status}: ${res.statusText}`)
  return res.json() as Promise<T>
}

export async function fetchDescriptorCounts(dateRange: DateRange, borough?: string): Promise<DescriptorCount[]> {
  return soql({
    $select: 'descriptor, count(*) as count',
    $where: withBorough(baseWhere(dateRange), borough),
    $group: 'descriptor',
    $order: 'count DESC',
    $limit: '50',
  })
}

export async function fetchBoroughCounts(dateRange: DateRange): Promise<BoroughCount[]> {
  return soql({
    $select: 'borough, count(*) as count',
    $where: baseWhere(dateRange),
    $group: 'borough',
    $order: 'count DESC',
    $limit: '10',
  })
}

export async function fetchDailyTrend(dateRange: DateRange, borough?: string): Promise<DailyTrend[]> {
  return soql({
    $select: "date_trunc_ymd(created_date) as day, count(*) as count",
    $where: withBorough(baseWhere(dateRange), borough),
    $group: 'day',
    $order: 'day ASC',
    $limit: '32',
  })
}

export async function fetchResponseTimeStats(
  dateRange: DateRange,
  borough?: string
): Promise<ResponseTimeResult> {
  const params = new URLSearchParams({ start: dateRange.start })
  if (dateRange.end) params.set('end', dateRange.end)
  if (borough && borough !== 'All') params.set('borough', borough)

  const res = await fetch(`/api/response-times?${params}`)
  if (!res.ok) throw new Error(`API error ${res.status}: ${res.statusText}`)
  return res.json() as Promise<ResponseTimeResult>
}

export async function fetchRecentRequests(dateRange: DateRange, page: number, borough?: string): Promise<ServiceRequest[]> {
  return soql({
    $select:
      'unique_key, created_date, closed_date, resolution_description, descriptor, borough, status, incident_address',
    $where: withBorough(baseWhere(dateRange), borough),
    $order: 'created_date DESC',
    $limit: '20',
    $offset: String(page * 20),
  })
}
