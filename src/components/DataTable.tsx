import { useState } from 'react'
import { useRecentRequests } from '../hooks/use311Data'
import { resolveShorthand } from '../data/resolutions'
import { formatDateET, formatClosedDateET } from '../utils/date'
import type { DateRange } from '../types'
import DescriptorTooltip from './DescriptorTooltip'

const STATUS_COLORS: Record<string, string> = {
  Closed: 'text-emerald-400',
  Open: 'text-blue-400',
  Unspecified: 'text-gray-500',
  'In Progress': 'text-yellow-400',
}

export default function DataTable({ borough, dateRange }: { borough: string; dateRange: DateRange }) {
  const [page, setPage] = useState(0)
  const isFiltered = borough !== 'All'
  const { data, isLoading, isFetching } = useRecentRequests(dateRange, page, isFiltered ? borough : undefined)

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 sm:p-6">
      <h2 className="text-sm font-medium text-gray-400 mb-4">Recent Complaints</h2>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-800">
              <th className="text-left text-xs text-gray-500 uppercase tracking-wider pb-3 pr-4 font-medium">Date</th>
              <th className="text-left text-xs text-gray-500 uppercase tracking-wider pb-3 pr-4 font-medium">Type</th>
              <th className="text-left text-xs text-gray-500 uppercase tracking-wider pb-3 pr-4 font-medium hidden sm:table-cell">Borough</th>
              <th className="text-left text-xs text-gray-500 uppercase tracking-wider pb-3 pr-4 font-medium">Status</th>
              <th className="text-left text-xs text-gray-500 uppercase tracking-wider pb-3 pr-4 font-medium hidden md:table-cell">Address</th>
              <th className="text-left text-xs text-gray-500 uppercase tracking-wider pb-3 font-medium hidden lg:table-cell">Resolution</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={6} className="py-12 text-center text-gray-600 text-sm">
                  Loading…
                </td>
              </tr>
            ) : (
              data?.map((r) => (
                <tr
                  key={r.unique_key}
                  className="border-b border-gray-800/50 hover:bg-gray-800/30 transition-colors"
                >
                  <td className="py-3 pr-4 text-gray-400 whitespace-nowrap text-xs sm:text-sm">
                    {formatDateET(r.created_date)}
                  </td>
                  <td className="py-3 pr-4 text-gray-200">
                    <DescriptorTooltip descriptor={r.descriptor} />
                  </td>
                  <td className="py-3 pr-4 text-gray-400 capitalize hidden sm:table-cell">
                    {r.borough?.toLowerCase() ?? '—'}
                  </td>
                  <td className={`py-3 pr-4 ${STATUS_COLORS[r.status] ?? 'text-gray-400'}`}>
                    {r.status === 'Closed' && r.closed_date ? (
                      <span className="relative group cursor-default">
                        {r.status}
                        <span className="absolute left-0 bottom-full mb-1 hidden group-hover:block bg-gray-800 border border-gray-700 text-gray-300 text-xs rounded-lg px-3 py-1.5 whitespace-nowrap shadow-xl z-10">
                          Closed {formatClosedDateET(r.closed_date)}
                        </span>
                      </span>
                    ) : (
                      r.status
                    )}
                  </td>
                  <td className="py-3 pr-4 text-gray-500 text-xs max-w-[180px] truncate hidden md:table-cell">
                    {r.incident_address ?? '—'}
                  </td>
                  <td className="py-3 text-gray-500 text-xs max-w-[220px] hidden lg:table-cell">
                    {r.resolution_description ? (
                      <span className="relative group/res cursor-default">
                        <span className="text-gray-300">{resolveShorthand(r.resolution_description)}</span>
                        <span className="absolute left-0 bottom-full mb-1 hidden group-hover/res:block bg-gray-800 border border-gray-700 text-gray-300 text-xs rounded-lg px-3 py-2 shadow-xl z-10 w-80 whitespace-normal leading-relaxed">
                          {r.resolution_description}
                        </span>
                      </span>
                    ) : (
                      <span className="text-gray-700">—</span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between mt-4">
        <span className="text-xs text-gray-600">
          Page {page + 1} · {isFetching ? 'Refreshing…' : '20 per page'}
        </span>
        <div className="flex gap-2">
          <button
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={page === 0}
            className="px-3 py-1.5 text-xs rounded-lg bg-gray-800 text-gray-300 hover:bg-gray-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            ← Previous
          </button>
          <button
            onClick={() => setPage((p) => p + 1)}
            disabled={!data || data.length < 20}
            className="px-3 py-1.5 text-xs rounded-lg bg-gray-800 text-gray-300 hover:bg-gray-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  )
}
