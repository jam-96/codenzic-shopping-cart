import { z } from 'zod'

export const shippingSchema = z.object({
  fullName: z.string().trim().min(1, 'Please enter your full name.'),
  email: z.string().trim().email('Enter a valid email address.'),
  phone: z.string().trim().min(1, 'Please enter your phone number.'),
  address: z.string().trim().min(1, 'Please enter your address.'),
  city: z.string().trim().min(1, 'Please enter your city.'),
  postalCode: z.string().trim().min(1, 'Please enter your postal code.'),
})

export type ShippingDetails = z.infer<typeof shippingSchema>
