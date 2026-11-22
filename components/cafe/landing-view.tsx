import Image from 'next/image'
import { ArrowRight, Dog, Leaf, Star, Timer } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { PRODUCTS, formatPrice } from '@/lib/menu'
import { Testimonials } from './testimonials'

const STATS = [
  { icon: Dog, value: '12k+', label: 'Pups served' },
  { icon: Timer, value: '8 min', label: 'Avg. prep' },
  { icon: Leaf, value: '100%', label: 'Local beans' },
]

export function LandingView({ onSelectProduct }: { onSelectProduct: (id: string) => void }) {
  return (
    <div className="grid h-full min-h-0 gap-4 lg:grid-cols-[1fr_1.05fr] lg:gap-6">
      <section className="flex min-h-0 flex-col justify-between gap-4 rounded-2xl border bg-card p-5 md:p-7">
        <div className="flex flex-col gap-4">
          <p className="flex w-fit items-center gap-2 rounded-full border bg-background px-3 py-1 font-mono text-[11px] text-muted-foreground uppercase">
            <span className="size-1.5 rounded-full bg-primary" aria-hidden="true" />
            Now serving · Order ahead
          </p>
          <h1 className="text-3xl leading-[1.05] font-semibold tracking-tight text-balance md:text-5xl xl:text-6xl">
            Breakfast for humans <span className="text-primary">&amp; hounds</span>
          </h1>
          <p className="max-w-md text-sm leading-relaxed text-pretty text-muted-foreground md:text-base">
            A cozy neighborhood cafe where every table is pet-friendly. Order your plate (and theirs)
            in a few taps, then grab a sunny seat.
          </p>
          <div className="flex flex-wrap gap-2">
            <Button size="lg" className="h-11 px-5" onClick={() => onSelectProduct('pancakes')}>
              Order breakfast
              <ArrowRight data-icon="inline-end" aria-hidden="true" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-11 px-5"
              onClick={() => onSelectProduct('pup-plate')}
            >
              <Dog data-icon="inline-start" aria-hidden="true" />
              Pup menu
            </Button>
          </div>
        </div>

        <dl className="hidden grid-cols-3 divide-x rounded-xl border bg-background sm:grid [@media(max-height:760px)]:hidden">
          {STATS.map((stat) => (
            <div key={stat.label} className="flex flex-col gap-0.5 px-4 py-3">
              <dt className="flex items-center gap-1.5 font-mono text-[10px] text-muted-foreground uppercase">
                <stat.icon className="size-3" aria-hidden="true" />
                {stat.label}
              </dt>
              <dd className="text-lg font-semibold tracking-tight">{stat.value}</dd>
            </div>
          ))}
        </dl>

        <div className="flex flex-col gap-2">
          <h2 className="font-mono text-[11px] text-muted-foreground uppercase">
            {"Today's menu"}
          </h2>
          <ul className="grid grid-cols-2 gap-2 xl:grid-cols-4">
            {PRODUCTS.map((product) => (
              <li key={product.id}>
                <button
                  type="button"
                  onClick={() => onSelectProduct(product.id)}
                  className="group flex w-full items-center gap-2.5 rounded-xl border bg-background p-2 text-left transition-colors hover:border-primary/50 hover:bg-accent focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
                >
                  <span className="relative size-11 shrink-0 overflow-hidden rounded-lg bg-muted">
                    <Image src={product.image} alt="" fill sizes="44px" className="object-cover" />
                  </span>
                  <span className="flex min-w-0 flex-col">
                    <span className="truncate text-sm font-medium">{product.name}</span>
                    <span className="font-mono text-xs text-muted-foreground">
                      {formatPrice(product.price)}
                    </span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        <Testimonials />
      </section>

      <section
        aria-label="Inside the cafe"
        className="relative hidden min-h-0 overflow-hidden rounded-2xl border lg:block"
      >
        <Image
          src="/images/hero.webp"
          alt="A golden retriever sitting beside a sunny cafe table with a latte and pancakes"
          fill
          priority
          sizes="(min-width: 1024px) 50vw, 0px"
          className="object-cover"
        />
        <div className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-3">
          <div className="flex items-center gap-3 rounded-xl border bg-card/90 p-3 backdrop-blur">
            <span className="flex size-9 items-center justify-center rounded-lg bg-secondary text-secondary-foreground">
              <Dog className="size-4" aria-hidden="true" />
            </span>
            <div>
              <p className="text-sm font-medium">Free water bowls &amp; treats</p>
              <p className="font-mono text-[11px] text-muted-foreground uppercase">
                At every table, always
              </p>
            </div>
          </div>
          <p className="flex items-center gap-1.5 rounded-full bg-foreground px-3 py-1.5 font-mono text-[11px] text-background uppercase">
            <Star className="size-3 fill-current" aria-hidden="true" />
            4.9 · 8.2k reviews
          </p>
        </div>
      </section>
    </div>
  )
}
