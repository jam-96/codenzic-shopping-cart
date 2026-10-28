import { productsResponseSchema, type Product } from '../types/product'

const PRODUCTS_URL = 'https://dummyjson.com/products?limit=100'

export async function fetchProducts(): Promise<Product[]> {
  const response = await fetch(PRODUCTS_URL)
  if (!response.ok) {
    throw new Error(`Unable to load products (HTTP ${response.status}). Please try again.`)
  }

  const json: unknown = await response.json()
  const parsed = productsResponseSchema.safeParse(json)

  if (!parsed.success) {
    throw new Error('The product service returned data in an unexpected format.')
  }

  return parsed.data.products
}
