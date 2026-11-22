export type Product = {
  id: string
  name: string
  tagline: string
  description: string
  price: number
  image: string
  tags: string[]
  rating: number
  reviews: number
  forPups?: boolean
}

export type Size = { id: string; label: string; detail: string; priceDelta: number }

export const SIZES: Size[] = [
  { id: 'regular', label: 'Regular', detail: 'Solo', priceDelta: 0 },
  { id: 'large', label: 'Large', detail: '+2 extra', priceDelta: 300 },
  { id: 'share', label: 'Share', detail: 'For two', priceDelta: 700 },
]

export const PUP_SIDE_PRICE = 400
export const TAX_RATE = 0.08

export const PRODUCTS: Product[] = [
  {
    id: 'pancakes',
    name: 'Golden Stack',
    tagline: 'Buttermilk pancakes',
    description:
      'Three fluffy buttermilk pancakes, whipped honey butter, Vermont maple and a scatter of fresh berries. Our most-ordered plate since day one.',
    price: 1400,
    image: '/images/pancakes.webp',
    tags: ['Vegetarian', 'Bestseller'],
    rating: 4.9,
    reviews: 2184,
  },
  {
    id: 'avocado-toast',
    name: 'Sunrise Toast',
    tagline: 'Avocado on sourdough',
    description:
      'Smashed avocado on house-baked sourdough with a soft poached egg, chili crunch and microgreens. Bright, filling and ready in minutes.',
    price: 1300,
    image: '/images/avocado-toast.webp',
    tags: ['High protein', 'Chef pick'],
    rating: 4.8,
    reviews: 1420,
  },
  {
    id: 'latte',
    name: 'Paw Latte',
    tagline: 'Oat milk espresso',
    description:
      'Double-shot espresso with silky oat milk and our signature paw-print latte art. Roasted locally, poured with love.',
    price: 600,
    image: '/images/latte.webp',
    tags: ['Vegan', 'Hot'],
    rating: 4.9,
    reviews: 3310,
  },
  {
    id: 'pup-plate',
    name: 'Pup Plate',
    tagline: 'For your four-legged friend',
    description:
      'Vet-approved bowl of plain scrambled egg, roasted sweet potato and blueberries, finished with a house-baked peanut biscuit. No salt, no seasoning.',
    price: 800,
    image: '/images/pup-plate.webp',
    tags: ['Dog-safe', 'Vet-approved'],
    rating: 5.0,
    reviews: 968,
    forPups: true,
  },
]

export function formatPrice(cents: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(cents / 100)
}

export type OrderSelection = {
  productId: string
  sizeId: string
  pupSide: boolean
  quantity: number
}

export function getOrderTotals(selection: OrderSelection) {
  const product = PRODUCTS.find((p) => p.id === selection.productId) ?? PRODUCTS[0]
  const size = SIZES.find((s) => s.id === selection.sizeId) ?? SIZES[0]
  const unit = product.price + size.priceDelta + (selection.pupSide ? PUP_SIDE_PRICE : 0)
  const subtotal = unit * selection.quantity
  const tax = Math.round(subtotal * TAX_RATE)
  return { product, size, unit, subtotal, tax, total: subtotal + tax }
}
