import { useState } from 'react'
import { useCartStore } from '../store/cartStore'
import { calculateCartTotals, formatCurrency } from '../utils/cartTotals'
import Checkout from './Checkout'

type Props = { open: boolean; onClose: () => void }

export default function CartDrawer({ open, onClose }: Props) {
  const items = useCartStore((state) => state.items)
  const increaseQuantity = useCartStore((state) => state.increaseQuantity)
  const decreaseQuantity = useCartStore((state) => state.decreaseQuantity)
  const removeItem = useCartStore((state) => state.removeItem)
  const clearCart = useCartStore((state) => state.clearCart)
  const [checkoutOpen, setCheckoutOpen] = useState(false)
  const totals = calculateCartTotals(items)
  const minimumReached = totals.subtotal >= 10

  if (!open) return null

  return (
    <div className="drawer-backdrop" onMouseDown={(event) => {
      if (event.target === event.currentTarget) onClose()
    }}>
      <aside className="cart-drawer" aria-label="Shopping cart">
        <div className="drawer-header">
          <div>
            <p className="eyebrow">YOUR BAG</p>
            <h2>{checkoutOpen ? 'Checkout' : 'Shopping cart'} <span className="muted">({totals.itemCount})</span></h2>
          </div>
          <button className="icon-button" onClick={onClose} aria-label="Close cart">✕</button>
        </div>

        {checkoutOpen ? (
          <Checkout onBack={() => setCheckoutOpen(false)} onClose={onClose} />
        ) : items.length === 0 ? (
          <div className="empty-cart">
            <div className="empty-icon">🛍️</div>
            <h3>Your cart is taking a break</h3>
            <p>Add something you love and it will show up here.</p>
            <button className="primary-button" onClick={onClose}>Explore products</button>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {items.map(({ product, quantity }) => (
                <div className="cart-item" key={product.id}>
                  <img src={product.thumbnail} alt={product.title} />
                  <div className="cart-item-content">
                    <div className="cart-item-top">
                      <div>
                        <h3>{product.title}</h3>
                        <p>{formatCurrency(product.price)}</p>
                      </div>
                      <button className="remove-button" onClick={() => removeItem(product.id)} aria-label={`Remove ${product.title}`}>Remove</button>
                    </div>
                    <div className="cart-item-bottom">
                      <div className="quantity-control">
                        <button disabled={quantity <= 1} onClick={() => decreaseQuantity(product.id)} aria-label="Decrease quantity">−</button>
                        <span>{quantity}</span>
                        <button disabled={quantity >= 5} onClick={() => increaseQuantity(product.id)} aria-label="Increase quantity">＋</button>
                      </div>
                      <strong>{formatCurrency(product.price * quantity)}</strong>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="cart-summary">
              <button className="text-button clear-cart" onClick={clearCart}>Clear cart</button>
              <div className="summary-line"><span>Subtotal</span><span>{formatCurrency(totals.subtotal)}</span></div>
              <div className="summary-line"><span>Tax (5%)</span><span>{formatCurrency(totals.tax)}</span></div>
              <div className="summary-line discount-line"><span>Discount {totals.discount > 0 ? '(10%)' : '(over $100)'}</span><span>−{formatCurrency(totals.discount)}</span></div>
              <div className="summary-line total-line"><span>Total</span><strong>{formatCurrency(totals.total)}</strong></div>
              {!minimumReached && <p className="checkout-hint">Add {formatCurrency(10 - totals.subtotal)} more to reach the $10 minimum checkout value.</p>}
              <button className="primary-button checkout-button" disabled={!minimumReached} onClick={() => setCheckoutOpen(true)}>
                Continue to checkout <span aria-hidden="true">→</span>
              </button>
              <p className="secure-note">♡ A little joy, delivered to you</p>
            </div>
          </>
        )}
      </aside>
    </div>
  )
}
