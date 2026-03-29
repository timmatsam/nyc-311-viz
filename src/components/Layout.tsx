import type { ReactNode } from 'react'

export default function Layout({ children, headerRight, dateLabel }: { children: ReactNode; headerRight?: ReactNode; dateLabel?: string }) {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <header className="border-b border-gray-800 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          <div className="flex items-baseline gap-3">
            <h1 className="text-xl font-semibold tracking-tight">NYC 311</h1>
            <span className="text-gray-400 text-sm hidden sm:inline">Illegal Parking{dateLabel ? ` · ${dateLabel}` : ''}</span>
          </div>
          {headerRight}
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6 sm:space-y-8">{children}</main>
    </div>
  )
}
