'use client'

import { useState } from 'react'
import { SiteHeader } from './site-header'
import { StatusBar } from './status-bar'
import { LandingView } from './landing-view'
import { ProductView } from './product-view'
import { CheckoutView } from './checkout-view'
import { SuccessView } from './success-view'
import type { OrderSelection } from '@/lib/menu'

export type View = 'home' | 'product' | 'checkout' | 'success'

const DEFAULT_SELECTION: OrderSelection = {
  productId: 'pancakes',
  sizeId: 'regular',
  pupSide: false,
  quantity: 1,
}

export function CafeShop() {
  const [view, setView] = useState<View>('home')
  const [selection, setSelection] = useState<OrderSelection>(DEFAULT_SELECTION)

  function openProduct(productId: string) {
    setSelection({ ...DEFAULT_SELECTION, productId })
    setView('product')
  }

  return (
    <div className="flex h-dvh flex-col overflow-hidden">
      <SiteHeader view={view} onNavigate={setView} />
      <main className="bg-dot-grid min-h-0 flex-1 px-4 py-4 md:px-6 lg:py-5">
        <div
          key={view}
          className="animate-in fade-in slide-in-from-bottom-2 mx-auto h-full max-w-7xl duration-300"
        >
          {view === 'home' && <LandingView onSelectProduct={openProduct} />}
          {view === 'product' && (
            <ProductView
              selection={selection}
              onChange={setSelection}
              onSelectProduct={openProduct}
              onBack={() => setView('home')}
              onBuyNow={() => setView('checkout')}
            />
          )}
          {view === 'checkout' && (
            <CheckoutView
              selection={selection}
              onBack={() => setView('product')}
              onPaid={() => setView('success')}
            />
          )}
          {view === 'success' && (
            <SuccessView
              selection={selection}
              onDone={() => {
                setSelection(DEFAULT_SELECTION)
                setView('home')
              }}
            />
          )}
        </div>
      </main>
      <StatusBar />
    </div>
  )
}
