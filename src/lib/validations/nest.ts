import { z } from 'zod'

export const nestSchema = z.object({
  specie: z.coerce.string().nonempty('Bắt buộc'),
  name: z.coerce.string().nonempty('Bắt buộc'),
  dad: z.coerce.string(),
  mom: z.coerce.string(),
  price: z.coerce.number(),
  imageUrls: z.coerce.string().optional(),
  description: z.coerce.string().optional()
})

export type TNestSchema = z.infer<typeof nestSchema>
