const BOROUGHS = ['All', 'BRONX', 'BROOKLYN', 'MANHATTAN', 'QUEENS', 'STATEN ISLAND'] as const

export default function BoroughFilter({
  value,
  onChange,
}: {
  value: string
  onChange: (borough: string) => void
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="bg-gray-800 border border-gray-700 text-gray-300 text-sm rounded-lg px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-blue-500"
    >
      {BOROUGHS.map((b) => (
        <option key={b} value={b}>
          {b === 'All' ? 'All Boroughs' : b.charAt(0) + b.slice(1).toLowerCase()}
        </option>
      ))}
    </select>
  )
}
