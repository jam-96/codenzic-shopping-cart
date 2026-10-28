import type { Product } from '../types/product'
import { formatCurrency } from '../utils/cartTotals'

type Props = { product: Product; onAdd: (product: Product) => void }

export default function ProductCard({ product, onAdd }: Props) {
  return (
    <article className="product-card">
      <div className="product-image-wrap">
        <img src={product.thumbnail} alt={product.title} loading="lazy" />
        {product.discountPercentage > 0 && (
          <span className="discount-badge">{Math.round(product.discountPercentage)}% off</span>
        )}
      </div>
      <div className="product-info">
        <p className="product-category">{product.category.replaceAll('-', ' ')}</p>
        <h3 title={product.title}>{product.title}</h3>
        <div className="product-meta">
          <span className="product-price">{formatCurrency(product.price)}</span>
          <span className="rating">★ {product.rating.toFixed(1)}</span>
        </div>
        <button className="add-button" onClick={() => onAdd(product)}>
          <span aria-hidden="true">＋</span> Add to cart
        </button>
      </div>
    </article>
  )
}
