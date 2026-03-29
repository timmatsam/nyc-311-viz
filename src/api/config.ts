export const BASE_URL =
  import.meta.env.VITE_API_BASE_URL ??
  'https://data.cityofnewyork.us/resource/erm2-nwe9.json'

export const APP_TOKEN: string | undefined = import.meta.env.VITE_SOCRATA_APP_TOKEN

export function buildHeaders(): HeadersInit {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  }
  if (APP_TOKEN) {
    headers['X-App-Token'] = APP_TOKEN
  }
  return headers
}
