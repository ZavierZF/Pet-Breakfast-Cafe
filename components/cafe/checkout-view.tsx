'use client'

import { useState, type FormEvent } from 'react'
import Image from 'next/image'
import { ArrowLeft, CreditCard, Lock, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { PUP_SIDE_PRICE, formatPrice, getOrderTotals, type OrderSelection } from '@/lib/menu'

const inputClass =
  'h-10 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none transition placeholder:text-muted-foreground/70 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30'

function Field({
  id,
  label,
  className,
  ...props
}: { id: string; label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      <label htmlFor={id} className="font-mono text-[11px] text-muted-foreground uppercase">
        {label}
      </label>
      <input id={id} name={id} required className={inputClass} {...props} />
    </div>
  )
}

function formatCardNumber(value: string) {
  return value
    .replace(/\D/g, '')
    .slice(0, 16)
    .replace(/(.{4})/g, '$1 ')
    .trim()
}

function formatExpiry(value: string) {
  const digits = value.replace(/\D/g, '').slice(0, 4)
  return digits.length > 2 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits
}

export function CheckoutView({
  selection,
  onBack,
  onPaid,
}: {
  selection: OrderSelection
  onBack: () => void
  onPaid: () => void
}) {
  const { product, size, subtotal, tax, total } = getOrderTotals(selection)
  const [card, setCard] = useState('')
  const [expiry, setExpiry] = useState('')
  const [fulfillment, setFulfillment] = useState<'pickup' | 'dine-in'>('dine-in')
  const [isPaying, setIsPaying] = useState(false)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsPaying(true)
    setTimeout(onPaid, 1200)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="grid h-full min-h-0 gap-4 lg:grid-cols-[1.2fr_1fr] lg:gap-6"
    >
      <section className="flex min-h-0 flex-col gap-4 rounded-2xl border bg-card p-5 md:p-6">
        <div className="flex items-center justify-between">
          <Button type="button" variant="ghost" size="sm" onClick={onBack} className="-ml-2">
            <ArrowLeft data-icon="inline-start" aria-hidden="true" />
            Back
          </Button>
          <p className="flex items-center gap-1.5 font-mono text-[11px] text-muted-foreground uppercase">
            <Lock className="size-3" aria-hidden="true" />
            Secure checkout
          </p>
        </div>
        <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">Payment details</h1>

        <div className="grid grid-cols-2 gap-3">
          <Field id="name" label="Full name" autoComplete="cc-name" placeholder="Jamie Rivera" />
          <Field
            id="email"
            label="Email"
            type="email"
            autoComplete="email"
            placeholder="jamie@example.com"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="card" className="font-mono text-[11px] text-muted-foreground uppercase">
            Card number
          </label>
          <div className="relative">
            <CreditCard
              className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden="true"
            />
            <input
              id="card"
              name="card"
              required
              inputMode="numeric"
              autoComplete="cc-number"
              placeholder="4242 4242 4242 4242"
              pattern="(\d{4} ){3}\d{4}"
              title="Enter a 16-digit card number"
              value={card}
              onChange={(e) => setCard(formatCardNumber(e.target.value))}
              className={cn(inputClass, 'pl-9 font-mono')}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Field
            id="expiry"
            label="Expiry"
            inputMode="numeric"
            autoComplete="cc-exp"
            placeholder="MM/YY"
            pattern="(0[1-9]|1[0-2])\/\d{2}"
            title="Use MM/YY format"
            value={expiry}
            onChange={(e) => setExpiry(formatExpiry(e.target.value))}
            className="font-mono"
          />
          <Field
            id="cvc"
            label="CVC"
            inputMode="numeric"
            autoComplete="cc-csc"
            placeholder="123"
            pattern="\d{3,4}"
            maxLength={4}
            title="3 or 4 digits"
          />
        </div>

        <fieldset>
          <legend className="mb-1.5 font-mono text-[11px] text-muted-foreground uppercase">
            How are you joining us?
          </legend>
          <div className="grid grid-cols-2 gap-2">
            {(
              [
                { id: 'dine-in', label: 'Dine in', detail: 'Pet-friendly table' },
                { id: 'pickup', label: 'Pickup', detail: 'Ready in ~8 min' },
              ] as const
            ).map((option) => (
              <label
                key={option.id}
                className={cn(
                  'flex cursor-pointer flex-col rounded-xl border px-3 py-2 transition-colors has-focus-visible:ring-3 has-focus-visible:ring-ring/50',
                  fulfillment === option.id ? 'border-primary bg-primary/5' : 'hover:bg-muted',
                )}
              >
                <input
                  type="radio"
                  name="fulfillment"
                  value={option.id}
                  checked={fulfillment === option.id}
                  onChange={() => setFulfillment(option.id)}
                  className="sr-only"
                />
                <span className="text-sm font-medium">{option.label}</span>
                <span className="text-xs text-muted-foreground">{option.detail}</span>
              </label>
            ))}
          </div>
        </fieldset>
      </section>

      <aside className="flex min-h-0 flex-col gap-4 rounded-2xl border bg-card p-5 md:p-6">
        <h2 className="font-mono text-[11px] text-muted-foreground uppercase">Order summary</h2>
        <div className="flex items-center gap-3">
          <div className="relative size-16 shrink-0 overflow-hidden rounded-xl border bg-muted">
            <Image src={product.image} alt="" fill sizes="64px" className="object-cover" />
          </div>
          <div className="flex flex-1 flex-col">
            <p className="font-medium">{product.name}</p>
            <p className="text-xs text-muted-foreground">
              {size.label} · Qty {selection.quantity}
              {selection.pupSide && ` · + Pup Plate (${formatPrice(PUP_SIDE_PRICE)})`}
            </p>
          </div>
        </div>

        <dl className="flex flex-col gap-2 border-t pt-4 text-sm">
          <div className="flex justify-between">
            <dt className="text-muted-foreground">Subtotal</dt>
            <dd className="font-mono tabular-nums">{formatPrice(subtotal)}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-muted-foreground">Tax (8%)</dt>
            <dd className="font-mono tabular-nums">{formatPrice(tax)}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-muted-foreground">Dog treats</dt>
            <dd className="font-mono text-secondary-foreground">Free</dd>
          </div>
          <div className="flex items-baseline justify-between border-t pt-3">
            <dt className="font-medium">Total</dt>
            <dd className="text-2xl font-semibold tracking-tight tabular-nums">
              {formatPrice(total)}
            </dd>
          </div>
        </dl>

        <div className="mt-auto flex flex-col gap-2">
          <Button type="submit" size="lg" className="h-12 text-base" disabled={isPaying}>
            {isPaying ? (
              <Loader2 data-icon="inline-start" className="animate-spin" aria-hidden="true" />
            ) : (
              <Lock data-icon="inline-start" aria-hidden="true" />
            )}
            {isPaying ? 'Processing…' : `Pay ${formatPrice(total)}`}
          </Button>
          <p className="text-center font-mono text-[10px] text-muted-foreground uppercase">
            Demo mode · No card is charged or stored
          </p>
        </div>
      </aside>
    </form>
  )
}
