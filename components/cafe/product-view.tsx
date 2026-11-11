import Image from 'next/image'
import { ArrowLeft, Dog, Minus, Plus, Star, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import {
  PRODUCTS,
  PUP_SIDE_PRICE,
  SIZES,
  formatPrice,
  getOrderTotals,
  type OrderSelection,
} from '@/lib/menu'

export function ProductView({
  selection,
  onChange,
  onSelectProduct,
  onBack,
  onBuyNow,
}: {
  selection: OrderSelection
  onChange: (selection: OrderSelection) => void
  onSelectProduct: (id: string) => void
  onBack: () => void
  onBuyNow: () => void
}) {
  const { product, subtotal } = getOrderTotals(selection)
  const update = (patch: Partial<OrderSelection>) => onChange({ ...selection, ...patch })

  return (
    <div className="grid h-full min-h-0 gap-4 lg:grid-cols-[1.1fr_1fr] lg:gap-6">
      <section className="relative hidden min-h-0 overflow-hidden rounded-2xl border bg-card lg:block">
        <Image
          src={product.image}
          alt={`${product.name} — ${product.tagline}`}
          fill
          priority
          sizes="(min-width: 1024px) 55vw, 0px"
          className="object-cover"
        />
        <ul className="absolute bottom-4 left-4 flex gap-2" aria-label="Other menu items">
          {PRODUCTS.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => onSelectProduct(item.id)}
                aria-label={`View ${item.name}`}
                aria-pressed={item.id === product.id}
                className={cn(
                  'relative block size-14 overflow-hidden rounded-xl border-2 bg-card transition focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none',
                  item.id === product.id ? 'border-primary' : 'border-card/70 opacity-80 hover:opacity-100',
                )}
              >
                <Image src={item.image} alt="" fill sizes="56px" className="object-cover" />
              </button>
            </li>
          ))}
        </ul>
      </section>

      <section className="flex min-h-0 flex-col gap-4 rounded-2xl border bg-card p-5 md:p-6">
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="sm" onClick={onBack} className="-ml-2">
            <ArrowLeft data-icon="inline-start" aria-hidden="true" />
            Menu
          </Button>
          <ul className="flex gap-1.5">
            {product.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-full bg-secondary px-2.5 py-0.5 font-mono text-[10px] text-secondary-foreground uppercase"
              >
                {tag}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex gap-4">
          <div className="relative size-20 shrink-0 overflow-hidden rounded-xl border bg-muted lg:hidden">
            <Image src={product.image} alt="" fill sizes="80px" className="object-cover" />
          </div>
          <div className="flex flex-col gap-1.5">
            <p className="font-mono text-[11px] text-muted-foreground uppercase">{product.tagline}</p>
            <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">{product.name}</h1>
            <p className="flex items-center gap-1.5 text-sm">
              <Star className="size-3.5 fill-primary text-primary" aria-hidden="true" />
              <span className="font-medium">{product.rating.toFixed(1)}</span>
              <span className="text-muted-foreground">
                ({product.reviews.toLocaleString('en-US')} reviews)
              </span>
            </p>
          </div>
        </div>

        <p className="line-clamp-3 text-sm leading-relaxed text-pretty text-muted-foreground">
          {product.description}
        </p>

        <fieldset className="flex flex-col gap-2">
          <legend className="mb-2 font-mono text-[11px] text-muted-foreground uppercase">Size</legend>
          <div className="grid grid-cols-3 gap-2">
            {SIZES.map((size) => {
              const checked = selection.sizeId === size.id
              return (
                <label
                  key={size.id}
                  className={cn(
                    'flex cursor-pointer flex-col rounded-xl border px-3 py-2 transition-colors has-focus-visible:ring-3 has-focus-visible:ring-ring/50',
                    checked ? 'border-primary bg-primary/5' : 'hover:bg-muted',
                  )}
                >
                  <input
                    type="radio"
                    name="size"
                    value={size.id}
                    checked={checked}
                    onChange={() => update({ sizeId: size.id })}
                    className="sr-only"
                  />
                  <span className="text-sm font-medium">{size.label}</span>
                  <span className="font-mono text-[11px] text-muted-foreground">
                    {size.priceDelta ? `+${formatPrice(size.priceDelta)}` : size.detail}
                  </span>
                </label>
              )
            })}
          </div>
        </fieldset>

        {!product.forPups && (
          <label className="flex cursor-pointer items-center gap-3 rounded-xl border bg-background p-3 transition-colors hover:bg-muted has-checked:border-secondary-foreground/40 has-checked:bg-secondary/50 has-focus-visible:ring-3 has-focus-visible:ring-ring/50">
            <span className="flex size-9 items-center justify-center rounded-lg bg-secondary text-secondary-foreground">
              <Dog className="size-4" aria-hidden="true" />
            </span>
            <span className="flex flex-1 flex-col">
              <span className="text-sm font-medium">Add a mini Pup Plate</span>
              <span className="text-xs text-muted-foreground">Dog-safe egg &amp; sweet potato bowl</span>
            </span>
            <span className="font-mono text-xs">+{formatPrice(PUP_SIDE_PRICE)}</span>
            <input
              type="checkbox"
              checked={selection.pupSide}
              onChange={(e) => update({ pupSide: e.target.checked })}
              className="size-4 accent-[var(--primary)]"
            />
          </label>
        )}

        <div className="mt-auto flex flex-col gap-3 border-t pt-4">
          <div className="flex items-center justify-between">
            <div
              className="flex items-center gap-1 rounded-xl border bg-background p-1"
              role="group"
              aria-label="Quantity"
            >
              <Button
                variant="ghost"
                size="icon"
                aria-label="Decrease quantity"
                disabled={selection.quantity <= 1}
                onClick={() => update({ quantity: Math.max(1, selection.quantity - 1) })}
              >
                <Minus aria-hidden="true" />
              </Button>
              <output aria-live="polite" className="w-8 text-center font-mono text-sm tabular-nums">
                {selection.quantity}
              </output>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Increase quantity"
                disabled={selection.quantity >= 10}
                onClick={() => update({ quantity: Math.min(10, selection.quantity + 1) })}
              >
                <Plus aria-hidden="true" />
              </Button>
            </div>
            <div className="text-right">
              <p className="font-mono text-[11px] text-muted-foreground uppercase">Subtotal</p>
              <p className="text-2xl font-semibold tracking-tight tabular-nums">
                {formatPrice(subtotal)}
              </p>
            </div>
          </div>
          <Button size="lg" className="h-12 text-base" onClick={onBuyNow}>
            <Zap data-icon="inline-start" aria-hidden="true" />
            Buy Now
          </Button>
        </div>
      </section>
    </div>
  )
}
