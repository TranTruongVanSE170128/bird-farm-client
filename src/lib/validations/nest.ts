import { z } from 'zod'

export const nestSchema = z.object({
  specie: z.string().nonempty('Bắt buộc'),
  name: z.string().nonempty('Bắt buộc'),
  dad: z.string().optional(),
  mom: z.string().optional(),
  price: z.number(),
  imageUrls: z.string().optional(),
  description: z.string().optional()
})

export type TNestSchema = z.infer<typeof nestSchema>
