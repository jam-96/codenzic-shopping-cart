import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import Header from './components/Header'
import ProductCard from './components/ProductCard'
import CartDrawer from './components/CartDrawer'
import { fetchProducts } from './api/products'
import { useCartStore } from './store/cartStore'
import { useProductFilters } from './hooks/useProductFilters'

export default function App() {
  const [cartOpen, setCartOpen] = useState(false)
  const [isDark, setIsDark] = useState(() => {
    try {
      return window.localStorage.getItem('cartly-theme') === 'dark'
    } catch {
      return false
    }
  })
  const [toast, setToast] = useState('')
  const addItem = useCartStore((state) => state.addItem)
  const { data: products = [], isLoading, isError, error, refetch } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  })
  const filters = useProductFilters(products)

  useEffect(() => {
    document.documentElement.dataset.theme = isDark ? 'dark' : 'light'
    try {
      window.localStorage.setItem('cartly-theme', isDark ? 'dark' : 'light')
    } catch {
      // The theme still works for this session if storage is unavailable.
    }
  }, [isDark])

  function handleAdd(product: (typeof products)[number]) {
    addItem(product)
    setToast(`${product.title} added to your cart`)
    window.setTimeout(() => setToast(''), 2400)
  }

  return (
    <>
      <Header onCartClick={() => setCartOpen(true)} isDark={isDark} onToggleTheme={() => setIsDark((current) => !current)} />
      <main>
        <section className="hero-section">
          <div className="container hero-content">
            <div className="hero-copy">
              <span className="hero-pill"><span className="sparkle">✦</span> YOUR EVERYDAY FINDS</span>
              <h1>Good things.<br /><span>Great prices.</span></h1>
              <p>Meet your new favourite things — thoughtfully picked for everyday life.</p>
              <a href="#products" className="hero-cta">Explore the collection <span>→</span></a>
              <div className="hero-trust"><span>✓ Easy returns</span><span>✓ Secure checkout demo</span></div>
            </div>
            <div className="hero-art" aria-label="Decorative shopping illustration">
              <div className="hero-orbit orbit-one"></div>
              <div className="hero-orbit orbit-two"></div>
              <div className="hero-sticker sticker-top">little<br />treats ✦</div>
              <div className="hero-bag"><div className="bag-handle"></div><div className="bag-face">c<span>.</span></div><div className="bag-smile">☺</div></div>
              <div className="hero-sticker sticker-bottom">made for<br />your day ♡</div>
              <span className="float-star star-one">✦</span><span className="float-star star-two">✳</span>
            </div>
          </div>
        </section>

        <section className="benefit-strip" id="why-cartly">
          <div className="container benefit-grid">
            <div><span className="benefit-icon">✦</span><div><strong>Curated finds</strong><p>Little things, big joy</p></div></div>
            <div><span className="benefit-icon">♡</span><div><strong>Shopping made easy</strong><p>Simple from start to finish</p></div></div>
            <div><span className="benefit-icon">↗</span><div><strong>Good value</strong><p>Everyday prices to love</p></div></div>
          </div>
        </section>

        <section className="products-section container" id="products">
          <div className="section-heading">
            <div><p className="eyebrow">THE GOOD STUFF</p><h2>Find your next favourite</h2><p className="section-subtitle">A few lovely things to make everyday better.</p></div>
            <span className="results-count">{filters.filteredProducts.length} products</span>
          </div>

          <div className="filter-panel">
            <div className="search-wrap"><span>⌕</span><input value={filters.search} onChange={(event) => filters.setSearch(event.target.value)} placeholder="Search products..." aria-label="Search products by title" /></div>
            <select value={filters.category} onChange={(event) => filters.setCategory(event.target.value)} aria-label="Filter by category">
              <option value="all">All categories</option>
              {filters.categories.map((category) => <option key={category} value={category}>{category.replaceAll('-', ' ')}</option>)}
            </select>
            <label className="price-filter">Max price <strong>${filters.maxPrice}</strong><input type="range" min="0" max="2000" step="25" value={filters.maxPrice} onChange={(event) => filters.setMaxPrice(Number(event.target.value))} aria-label="Maximum price" /></label>
            <select value={filters.sort} onChange={(event) => filters.setSort(event.target.value)} aria-label="Sort products">
              <option value="featured">Featured</option><option value="price-low">Price: low to high</option><option value="price-high">Price: high to low</option><option value="rating">Top rated</option>
            </select>
            <button className="clear-filters" onClick={filters.clearFilters}>Clear</button>
          </div>

          {isLoading ? (
            <div className="state-panel"><div className="loading-spinner"></div><h3>Finding the good stuff...</h3><p>Loading products for you.</p></div>
          ) : isError ? (
            <div className="state-panel error-panel"><div className="state-emoji">☁</div><h3>We couldn't load the products</h3><p>{error instanceof Error ? error.message : 'Something went wrong. Please try again.'}</p><button className="primary-button" onClick={() => void refetch()}>Try again</button></div>
          ) : filters.filteredProducts.length === 0 ? (
            <div className="state-panel"><div className="state-emoji">⌕</div><h3>No matches just yet</h3><p>Try another search or clear your filters.</p><button className="secondary-button" onClick={filters.clearFilters}>Clear filters</button></div>
          ) : (
            <div className="product-grid">
              {filters.filteredProducts.map((product) => <ProductCard key={product.id} product={product} onAdd={handleAdd} />)}
            </div>
          )}
        </section>
      </main>

      <footer className="site-footer"><div className="container footer-inner"><a className="brand footer-brand" href="#"><span className="brand-mark">c</span><span>cartly<span className="brand-dot">.</span></span></a><p>A little joy in your everyday. Demo shopping experience.</p><span>Built with React & TypeScript</span></div></footer>

      {toast && <div className="toast-message" role="status"><span>✓</span>{toast}</div>}
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  )
}
