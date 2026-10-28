import { useCartStore } from '../store/cartStore'

type HeaderProps = {
  onCartClick: () => void
  isDark: boolean
  onToggleTheme: () => void
}

export default function Header({ onCartClick, isDark, onToggleTheme }: HeaderProps) {
  const itemCount = useCartStore((state) =>
    state.items.reduce((total, item) => total + item.quantity, 0),
  )

  return (
    <header className="site-header">
      <div className="container header-inner">
        <a className="brand" href="#" aria-label="Cartly home">
          <span className="brand-mark">c</span>
          <span>cartly<span className="brand-dot">.</span></span>
        </a>
        <nav className="header-nav" aria-label="Main navigation">
          <a href="#products">Shop</a>
          <a href="#why-cartly">Why Cartly?</a>
        </nav>
        <div className="header-actions">
          <button
            className="theme-toggle"
            type="button"
            onClick={onToggleTheme}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            <span aria-hidden="true">{isDark ? '☀' : '☾'}</span>
            <span className="theme-toggle-label">{isDark ? 'Light' : 'Dark'}</span>
          </button>
          <button className="cart-button" onClick={onCartClick} aria-label={`Open cart, ${itemCount} items`}>
            <span aria-hidden="true">♧</span>
            <span className="cart-button-label">Cart</span>
            <span className="cart-count">{itemCount}</span>
          </button>
        </div>
      </div>
    </header>
  )
}
