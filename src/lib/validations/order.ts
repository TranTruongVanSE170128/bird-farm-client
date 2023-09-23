import { z } from 'zod'

export const orderSchema = z.object({
  body: z.object({
    receiver: z.string().trim(),
    phone: z.string().trim(),
    address: z.string().trim(),
    birds: z.array(z.string()).default([]),
    nests: z.array(z.string()).default([]),
    voucher: z.string().optional()
  })
})

export type TOrderSchema = z.infer<typeof orderSchema>
