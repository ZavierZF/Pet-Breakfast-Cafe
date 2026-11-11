import { Check, PawPrint } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { formatPrice, getOrderTotals, type OrderSelection } from '@/lib/menu'

export function SuccessView({
  selection,
  onDone,
}: {
  selection: OrderSelection
  onDone: () => void
}) {
  const { product, total } = getOrderTotals(selection)

  return (
    <div className="flex h-full items-center justify-center">
      <section
        role="status"
        className="flex w-full max-w-md flex-col items-center gap-4 rounded-2xl border bg-card p-8 text-center"
      >
        <span className="flex size-14 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
          <Check className="size-6" aria-hidden="true" />
        </span>
        <h1 className="text-2xl font-semibold tracking-tight">Order confirmed!</h1>
        <p className="text-sm text-pretty text-muted-foreground">
          Your {product.name} is on the griddle. We&apos;ll have a water bowl ready for your furry
          friend too.
        </p>
        <dl className="grid w-full grid-cols-2 divide-x rounded-xl border bg-background font-mono text-xs uppercase">
          <div className="p-3">
            <dt className="text-muted-foreground">Order</dt>
            <dd className="mt-0.5 text-sm text-foreground">#PAW-2814</dd>
          </div>
          <div className="p-3">
            <dt className="text-muted-foreground">Total</dt>
            <dd className="mt-0.5 text-sm text-foreground">{formatPrice(total)}</dd>
          </div>
        </dl>
        <Button size="lg" className="h-11 w-full" onClick={onDone}>
          <PawPrint data-icon="inline-start" aria-hidden="true" />
          Back to menu
        </Button>
      </section>
    </div>
  )
}
