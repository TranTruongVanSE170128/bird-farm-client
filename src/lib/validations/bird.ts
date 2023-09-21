import { z } from 'zod'

export const birdSchema = z.object({
  specie: z.string().nonempty('Bắt buộc'),
  name: z.string().nonempty('Bắt buộc'),
  birth: z.date().optional(),
  price: z.number(),
  description: z.string().optional(),
  sold: z.boolean().optional(),
  type: z.enum(['sell', 'breed']),
  gender: z.enum(['male', 'female']),
  imageUrls: z.array(z.string()).optional(),
  parent: z.string().optional(),
  achievements: z
    .array(
      z.object({
        competition: z.string(),
        rank: z.number(),
        _id: z.string()
      })
    )
    .optional()
})

export type TBirdSchema = z.infer<typeof birdSchema>
