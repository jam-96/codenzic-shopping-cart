import { z } from 'zod'

export const productSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  category: z.string(),
  price: z.number(),
  discountPercentage: z.number().optional().default(0),
  rating: z.number(),
  stock: z.number().optional().default(0),
  thumbnail: z.string().url(),
  images: z.array(z.string().url()).optional().default([]),
})

export const productsResponseSchema = z.object({
  products: z.array(productSchema),
  total: z.number(),
  skip: z.number(),
  limit: z.number(),
})

export type Product = z.infer<typeof productSchema>
