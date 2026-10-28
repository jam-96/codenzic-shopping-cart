import { useState } from 'react'
import { useCartStore } from '../store/cartStore'
import { calculateCartTotals, formatCurrency } from '../utils/cartTotals'
import { shippingSchema, type ShippingDetails } from '../validation/shippingSchema'

type Props = { onBack: () => void; onClose: () => void }
type Step = 'shipping' | 'review'

const initialDetails: ShippingDetails = {
  fullName: '', email: '', phone: '', address: '', city: '', postalCode: '',
}

export default function Checkout({ onBack, onClose }: Props) {
  const items = useCartStore((state) => state.items)
  const clearCart = useCartStore((state) => state.clearCart)
  const [step, setStep] = useState<Step>('shipping')
  const [details, setDetails] = useState<ShippingDetails>(initialDetails)
  const [errors, setErrors] = useState<Partial<Record<keyof ShippingDetails, string>>>({})
  const [placed, setPlaced] = useState(false)
  const totals = calculateCartTotals(items)

  function updateField(field: keyof ShippingDetails, value: string) {
    setDetails((current) => ({ ...current, [field]: value }))
    setErrors((current) => ({ ...current, [field]: undefined }))
  }

  function continueToReview(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const result = shippingSchema.safeParse(details)
    if (!result.success) {
      const nextErrors: Partial<Record<keyof ShippingDetails, string>> = {}
      for (const issue of result.error.issues) {
        const field = issue.path[0] as keyof ShippingDetails
        if (!nextErrors[field]) nextErrors[field] = issue.message
      }
      setErrors(nextErrors)
      return
    }
    setDetails(result.data)
    setErrors({})
    setStep('review')
  }

  function placeOrder() {
    setPlaced(true)
    clearCart()
  }

  if (placed) {
    return (
      <div className="checkout-success">
        <div className="success-icon">✓</div>
        <p className="eyebrow">ORDER CONFIRMED</p>
        <h2>You're all set!</h2>
        <p>Your demo order has been placed successfully. No payment was collected.</p>
        <button className="primary-button" onClick={onClose}>Continue shopping</button>
      </div>
    )
  }

  if (step === 'review') {
    return (
      <div className="checkout-content">
        <div className="step-indicator"><span className="complete">1 Cart review</span><span className="active">2 Payment summary</span></div>
        <h3 className="checkout-section-title">Shipping details</h3>
        <div className="shipping-review">
          <strong>{details.fullName}</strong>
          <span>{details.email} · {details.phone}</span>
          <span>{details.address}, {details.city}, {details.postalCode}</span>
        </div>
        <h3 className="checkout-section-title">Order summary</h3>
        {items.map(({ product, quantity }) => (
          <div className="review-item" key={product.id}>
            <span>{product.title} <span className="muted">× {quantity}</span></span>
            <strong>{formatCurrency(product.price * quantity)}</strong>
          </div>
        ))}
        <div className="summary-line"><span>Subtotal</span><span>{formatCurrency(totals.subtotal)}</span></div>
        <div className="summary-line"><span>Tax</span><span>{formatCurrency(totals.tax)}</span></div>
        <div className="summary-line discount-line"><span>Discount</span><span>−{formatCurrency(totals.discount)}</span></div>
        <div className="summary-line total-line"><span>Final total</span><strong>{formatCurrency(totals.total)}</strong></div>
        <p className="demo-note">Demo checkout only — payment gateway integration is not included.</p>
        <button className="primary-button checkout-button" onClick={placeOrder}>Place order <span>→</span></button>
        <button className="text-button back-button" onClick={() => setStep('shipping')}>← Edit shipping details</button>
      </div>
    )
  }

  const fields: { key: keyof ShippingDetails; label: string; placeholder: string; type?: string; wide?: boolean }[] = [
    { key: 'fullName', label: 'Full name', placeholder: 'Jane Smith', wide: true },
    { key: 'email', label: 'Email address', placeholder: 'jane@example.com', type: 'email', wide: true },
    { key: 'phone', label: 'Phone number', placeholder: '+1 555 0100' },
    { key: 'postalCode', label: 'Postal code', placeholder: '10001' },
    { key: 'address', label: 'Street address', placeholder: '123 Market Street', wide: true },
    { key: 'city', label: 'City', placeholder: 'New York', wide: true },
  ]

  return (
    <div className="checkout-content">
      <div className="step-indicator"><span className="complete">1 Cart review</span><span className="active">2 Shipping</span><span>3 Payment summary</span></div>
      <p className="checkout-intro">Where should we send your order?</p>
      <form onSubmit={continueToReview} noValidate>
        <div className="shipping-grid">
          {fields.map((field) => (
            <div className={`form-field ${field.wide ? 'field-wide' : ''}`} key={field.key}>
              <label htmlFor={field.key}>{field.label}</label>
              <input
                id={field.key}
                type={field.type ?? 'text'}
                value={details[field.key]}
                placeholder={field.placeholder}
                onChange={(event) => updateField(field.key, event.target.value)}
                aria-invalid={Boolean(errors[field.key])}
                aria-describedby={errors[field.key] ? `${field.key}-error` : undefined}
              />
              {errors[field.key] && <span className="field-error" id={`${field.key}-error`}>{errors[field.key]}</span>}
            </div>
          ))}
        </div>
        <button className="primary-button checkout-button" type="submit">Review order <span>→</span></button>
      </form>
      <button className="text-button back-button" onClick={onBack}>← Back to cart</button>
    </div>
  )
}
