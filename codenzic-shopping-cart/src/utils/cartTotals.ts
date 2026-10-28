import type { CartItem } from '../store/cartStore'

export type CartTotals = {
  subtotal: number
  tax: number
  discount: number
  total: number
  itemCount: number
}

export function calculateCartTotals(items: CartItem[]): CartTotals {
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  const tax = subtotal * 0.05
  const discount = subtotal > 100 ? subtotal * 0.1 : 0
  return {
    subtotal,
    tax,
    discount,
    total: Math.max(0, subtotal + tax - discount),
    itemCount: items.reduce((sum, item) => sum + item.quantity, 0),
  }
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value)
}
