import { useState } from 'react'
import { DESCRIPTOR_INFO } from '../data/descriptors'

export default function DescriptorTooltip({ descriptor }: { descriptor: string }) {
  const [visible, setVisible] = useState(false)
  const definition = DESCRIPTOR_INFO[descriptor]

  return (
    <span className="inline-flex items-center gap-1">
      <span>{descriptor}</span>
      {definition && (
        <span className="relative inline-block">
          <button
            onMouseEnter={() => setVisible(true)}
            onMouseLeave={() => setVisible(false)}
            className="text-gray-500 hover:text-gray-300 transition-colors leading-none"
            aria-label={`Info about ${descriptor}`}
          >
            ⓘ
          </button>
          {visible && (
            <span className="absolute z-50 bottom-full left-0 mb-2 w-56 sm:w-64 rounded-lg bg-gray-800 border border-gray-700 px-3 py-2 text-xs text-gray-200 shadow-xl pointer-events-none">
              <span className="block font-semibold text-white mb-1">{descriptor}</span>
              {definition}
            </span>
          )}
        </span>
      )}
    </span>
  )
}
