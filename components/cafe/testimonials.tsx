import { Star } from 'lucide-react'
import { cn } from '@/lib/utils'

const TESTIMONIALS = [
  { name: 'Priya & Mochi', rating: 5, quote: 'Fluffiest pancakes in town, and Mochi got her own pup plate.' },
  { name: 'Jordan & Rex', rating: 5, quote: 'Ordered ahead, sat in the sun, Rex had water before I did.' },
  { name: 'Sam & Pickles', rating: 4, quote: 'Latte art is gorgeous. Pickles now refuses any other cafe.' },
]

export function Testimonials() {
  return (
    <div className="flex flex-col gap-2">
      <h2 className="font-mono text-[11px] text-muted-foreground uppercase">What regulars say</h2>
      <ul className="grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
        {TESTIMONIALS.map((t, index) => (
          <li
            key={t.name}
            className={cn(
              'flex flex-col gap-1 rounded-xl border bg-background p-2.5',
              index === 2 && 'hidden xl:flex',
              index === 1 && 'hidden sm:flex',
            )}
          >
            <div className="flex items-center justify-between gap-2">
              <span className="truncate text-xs font-medium">{t.name}</span>
              <span className="flex shrink-0 text-primary" role="img" aria-label={`${t.rating} out of 5 stars`}>
                {Array.from({ length: 5 }, (_, i) => (
                  <Star
                    key={i}
                    className={cn('size-3', i < t.rating ? 'fill-current' : 'text-border')}
                    aria-hidden="true"
                  />
                ))}
              </span>
            </div>
            <p className="line-clamp-2 text-xs leading-snug text-muted-foreground">{t.quote}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
