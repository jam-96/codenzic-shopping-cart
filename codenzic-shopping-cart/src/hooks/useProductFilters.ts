import { useMemo, useState } from 'react'
import type { Product } from '../types/product'

export function useProductFilters(products: Product[]) {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')
  const [maxPrice, setMaxPrice] = useState(2000)
  const [sort, setSort] = useState('featured')

  const categories = useMemo(
    () => [...new Set(products.map((product) => product.category))].sort(),
    [products],
  )

  const filteredProducts = useMemo(() => {
    const filtered = products.filter((product) => {
      const matchesSearch = product.title.toLowerCase().includes(search.trim().toLowerCase())
      const matchesCategory = category === 'all' || product.category === category
      const matchesPrice = product.price <= maxPrice
      return matchesSearch && matchesCategory && matchesPrice
    })

    if (sort === 'price-low') filtered.sort((a, b) => a.price - b.price)
    if (sort === 'price-high') filtered.sort((a, b) => b.price - a.price)
    if (sort === 'rating') filtered.sort((a, b) => b.rating - a.rating)
    return filtered
  }, [products, search, category, maxPrice, sort])

  function clearFilters() {
    setSearch('')
    setCategory('all')
    setMaxPrice(2000)
    setSort('featured')
  }

  return {
    search, setSearch, category, setCategory, maxPrice, setMaxPrice, sort, setSort,
    categories, filteredProducts, clearFilters,
  }
}
