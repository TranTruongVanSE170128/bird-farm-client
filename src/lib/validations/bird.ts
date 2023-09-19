import { z } from 'zod'

export const createBirdSchema = z.object({
  specie: z.coerce.string().nonempty('bắt buộc loài').trim(),
  name: z.coerce.string().nonempty('bắt buộc tên').trim(),
  birth: z.coerce.date().optional(),
  price: z.coerce.number(),
  description: z.coerce.string().optional(),
  sold: z.coerce.boolean().optional(),
  onSale: z.coerce.boolean(),
  gender: z.enum(['male', 'female']),
  imageUrls: z.coerce.string().optional(),
  parent: z.coerce.string().optional(),
  achievements: z.coerce.string().optional(),
  discount: z.coerce.string().optional()
})

export type TCreateBirdSchema = z.infer<typeof createBirdSchema>
