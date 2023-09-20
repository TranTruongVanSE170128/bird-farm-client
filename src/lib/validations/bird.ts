import { z } from 'zod'

export const birdSchema = z.object({
  specie: z.string().nonempty('Bắt buộc'),
  name: z.string().nonempty('Bắt buộc'),
  birth: z.date().optional(),
  price: z.number(),
  description: z.string().optional(),
  sold: z.boolean().optional(),
  onSale: z.boolean(),
  gender: z.enum(['male', 'female']),
  imageUrls: z.string().optional(),
  parent: z.string().optional(),
  achievements: z.string().optional(),
  discount: z.string().optional()
})

export type TBirdSchema = z.infer<typeof birdSchema>
