export interface ServiceRequest {
  unique_key: string
  created_date: string
  closed_date?: string
  resolution_description?: string
  complaint_type: string
  descriptor: string
  borough: string
  status: string
  agency: string
  latitude?: string
  longitude?: string
  incident_address?: string
}

export interface DescriptorCount {
  descriptor: string
  count: string
}

export interface BoroughCount {
  borough: string
  count: string
}

export interface DailyTrend {
  day: string
  count: string
}

export interface ClosedRecord {
  descriptor: string
  created_date: string
  closed_date: string
}

export interface ResponseTimeStat {
  descriptor: string
  avgMinutes: number
}

export interface ResponseTimeResult {
  overallAvgMinutes: number
  byDescriptor: ResponseTimeStat[]
  sampleSize: number
}

export interface DateRange {
  start: string
  end: string
  label: string
}

