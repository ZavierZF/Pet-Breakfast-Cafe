import { PawPrint } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { View } from './cafe-shop'

const STEPS: { id: View; label: string }[] = [
  { id: 'home', label: 'Menu' },
  { id: 'product', label: 'Details' },
  { id: 'checkout', label: 'Checkout' },
]

export function SiteHeader({
  view,
  onNavigate,
}: {
  view: View
  onNavigate: (view: View) => void
}) {
  const currentIndex = view === 'success' ? STEPS.length : STEPS.findIndex((s) => s.id === view)

  return (
    <header className="border-b bg-card/80 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-4 px-4 md:px-6">
        <button
          type="button"
          onClick={() => onNavigate('home')}
          className="flex items-center gap-2 rounded-md focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
        >
          <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <PawPrint className="size-4" aria-hidden="true" />
          </span>
          <span className="text-base font-semibold tracking-tight">Pawfee</span>
          <span className="hidden rounded-full border px-2 py-0.5 font-mono text-[10px] text-muted-foreground uppercase sm:inline">
            Est. 2019
          </span>
        </button>

        <nav aria-label="Order progress">
          <ol className="flex items-center gap-1 font-mono text-[11px] uppercase">
            {STEPS.map((step, index) => {
              const isActive = index === currentIndex
              const isDone = index < currentIndex
              return (
                <li key={step.id} className="flex items-center gap-1">
                  <span
                    aria-current={isActive ? 'step' : undefined}
                    className={cn(
                      'flex items-center gap-1.5 rounded-full px-2.5 py-1 transition-colors',
                      isActive && 'bg-foreground text-background',
                      isDone && 'text-secondary-foreground',
                      !isActive && !isDone && 'text-muted-foreground',
                    )}
                  >
                    <span className="tabular-nums">0{index + 1}</span>
                    <span className="hidden sm:inline">{step.label}</span>
                  </span>
                  {index < STEPS.length - 1 && (
                    <span className="h-px w-3 bg-border sm:w-5" aria-hidden="true" />
                  )}
                </li>
              )
            })}
          </ol>
        </nav>
      </div>
    </header>
  )
}
