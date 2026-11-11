'use client'

import { useEffect, useState } from 'react'
import { BellRing, Cat, Check, Dog, Rabbit, type LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

const STEPS: { label: string; helper: string; icon: LucideIcon }[] = [
  { label: 'Order received', helper: 'Miso the cat took your ticket', icon: Cat },
  { label: 'Preparing your meal', helper: 'Chef Biscuit is on the griddle', icon: Dog },
  { label: 'Ready to serve', helper: 'Clover is bringing it over', icon: Rabbit },
]

const STEP_DELAY_MS = 2600

function playDing() {
  const AudioCtx =
    window.AudioContext ??
    (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
  if (!AudioCtx) return
  const ctx = new AudioCtx()
  const start = ctx.currentTime
  for (const [frequency, offset] of [
    [1318.5, 0],
    [1760, 0.12],
  ]) {
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = 'sine'
    osc.frequency.value = frequency
    gain.gain.setValueAtTime(0.0001, start + offset)
    gain.gain.exponentialRampToValueAtTime(0.3, start + offset + 0.01)
    gain.gain.exponentialRampToValueAtTime(0.0001, start + offset + 1.2)
    osc.connect(gain).connect(ctx.destination)
    osc.start(start + offset)
    osc.stop(start + offset + 1.25)
  }
  setTimeout(() => ctx.close(), 1600)
}

export function OrderProgress() {
  const [step, setStep] = useState(0)
  const isReady = step === STEPS.length - 1

  useEffect(() => {
    if (isReady) {
      playDing()
      return
    }
    const timer = setTimeout(() => setStep((s) => s + 1), STEP_DELAY_MS)
    return () => clearTimeout(timer)
  }, [step, isReady])

  return (
    <div className="flex w-full flex-col gap-3">
      <ol className="relative grid grid-cols-3 gap-2">
        <span className="absolute top-6 right-[16.66%] left-[16.66%] h-0.5 rounded-full bg-border" aria-hidden="true">
          <span
            className="block h-full rounded-full bg-primary transition-[width] duration-700 ease-out"
            style={{ width: `${(step / (STEPS.length - 1)) * 100}%` }}
          />
        </span>
        {STEPS.map((item, index) => {
          const done = index < step
          const active = index === step
          const Icon = item.icon
          return (
            <li
              key={item.label}
              aria-current={active ? 'step' : undefined}
              className="relative flex flex-col items-center gap-1.5"
            >
              <span
                className={cn(
                  'relative flex size-12 items-center justify-center rounded-full border-2 bg-background transition-colors duration-500',
                  done && 'border-primary bg-primary text-primary-foreground',
                  active && !isReady && 'border-primary text-primary',
                  active && isReady && 'border-secondary-foreground bg-secondary text-secondary-foreground',
                  !done && !active && 'text-muted-foreground',
                )}
              >
                <Icon
                  className={cn(
                    'size-5',
                    active && !isReady && 'motion-safe:animate-bounce',
                    active && isReady && 'motion-safe:animate-[paw-hop_0.6s_ease-out_2]',
                  )}
                  aria-hidden="true"
                />
                {done && (
                  <span className="absolute -right-1 -bottom-1 flex size-4 items-center justify-center rounded-full border-2 border-card bg-secondary text-secondary-foreground">
                    <Check className="size-2.5" aria-hidden="true" />
                  </span>
                )}
                {active && !isReady && (
                  <span className="absolute inset-0 rounded-full border-2 border-primary motion-safe:animate-ping" aria-hidden="true" />
                )}
              </span>
              <span
                className={cn(
                  'font-mono text-[10px] leading-tight uppercase',
                  active || done ? 'text-foreground' : 'text-muted-foreground',
                )}
              >
                {item.label}
              </span>
            </li>
          )
        })}
      </ol>
      <p
        aria-live="polite"
        className={cn(
          'flex items-center justify-center gap-2 rounded-xl border bg-background px-3 py-2 text-xs text-muted-foreground',
          isReady && 'border-secondary-foreground/30 bg-secondary text-secondary-foreground',
        )}
      >
        {isReady && (
          <BellRing className="size-3.5 motion-safe:animate-[bell-ring_0.9s_ease-in-out_2]" aria-hidden="true" />
        )}
        {isReady ? 'Ding! Your order is ready to serve.' : STEPS[step].helper}
      </p>
    </div>
  )
}
