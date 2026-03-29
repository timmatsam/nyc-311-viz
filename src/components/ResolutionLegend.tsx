import { useState } from 'react'
import { RESOLUTION_LEGEND } from '../data/resolutions'

export default function ResolutionLegend() {
  const [open, setOpen] = useState(false)

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 sm:p-6">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-gray-200 transition-colors w-full text-left"
      >
        <span className={`text-xs transition-transform ${open ? 'rotate-90' : ''}`}>▶</span>
        NYPD Resolution Types
        <span className="text-xs text-gray-600 font-normal">
          — {RESOLUTION_LEGEND.length} categories
        </span>
      </button>

      {open && (
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="text-left text-xs text-gray-500 uppercase tracking-wider pb-3 pr-4 font-medium whitespace-nowrap">
                  Shorthand
                </th>
                <th className="text-left text-xs text-gray-500 uppercase tracking-wider pb-3 pr-4 font-medium">
                  Meaning
                </th>
                <th className="text-left text-xs text-gray-500 uppercase tracking-wider pb-3 font-medium hidden lg:table-cell">
                  Original NYPD Text
                </th>
              </tr>
            </thead>
            <tbody>
              {RESOLUTION_LEGEND.map((r) => (
                <tr key={r.shorthand} className="border-b border-gray-800/50">
                  <td className="py-2.5 pr-4 text-white font-medium whitespace-nowrap">
                    {r.shorthand}
                  </td>
                  <td className="py-2.5 pr-4 text-gray-400">
                    {r.summary}
                  </td>
                  <td className="py-2.5 text-gray-600 text-xs leading-relaxed hidden lg:table-cell">
                    {r.original}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
