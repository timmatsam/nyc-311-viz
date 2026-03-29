const ET_SHORT = new Intl.DateTimeFormat('en-US', {
  timeZone: 'America/New_York',
  month: 'short',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
})

const ET_LONG = new Intl.DateTimeFormat('en-US', {
  timeZone: 'America/New_York',
  month: 'short',
  day: 'numeric',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
})

/**
 * Parse a Socrata "floating" timestamp as America/New_York.
 *
 * Socrata returns ISO strings like "2026-03-26T14:30:45.000" with no TZ
 * indicator — they represent Eastern Time. We force-parse by:
 * 1. Treating the string as UTC (append Z)
 * 2. Finding the ET↔UTC offset at that instant via Intl round-trip
 * 3. Shifting so the Date's UTC instant matches the intended ET wall-clock time
 */
function parseAsET(iso: string): Date {
  const asUtc = new Date(iso + 'Z')
  const etStr = asUtc.toLocaleString('en-US', { timeZone: 'America/New_York' })
  const etDate = new Date(etStr)
  const offsetMs = asUtc.getTime() - etDate.getTime()
  return new Date(asUtc.getTime() - offsetMs)
}

export function formatDateET(iso: string): string {
  return ET_SHORT.format(parseAsET(iso))
}

export function formatClosedDateET(iso: string): string {
  return ET_LONG.format(parseAsET(iso))
}

/** Get today's date in ET as YYYY-MM-DD. */
export function todayInET(): string {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'America/New_York' }).format(new Date())
}

import type { DateRange } from '../types'

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

function pad2(n: number): string {
  return String(n).padStart(2, '0')
}

export function buildLast30DaysRange(): DateRange {
  const today = todayInET()
  const d = new Date(today + 'T00:00:00')
  d.setDate(d.getDate() - 30)
  return {
    start: `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}T00:00:00.000`,
    end: '',
    label: 'Last 30 days',
  }
}

export function buildMonthRange(year: number, month: number): DateRange {
  const nextMonth = month === 12 ? 1 : month + 1
  const nextYear = month === 12 ? year + 1 : year
  return {
    start: `${year}-${pad2(month)}-01T00:00:00.000`,
    end: `${nextYear}-${pad2(nextMonth)}-01T00:00:00.000`,
    label: `${MONTH_NAMES[month - 1]} ${year}`,
  }
}

export { MONTH_NAMES }
