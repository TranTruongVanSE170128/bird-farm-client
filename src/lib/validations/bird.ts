import { z } from 'zod'

export const birdSchema = z
  .object({
    specie: z.string().nonempty('Bắt buộc'),
    name: z.string().nonempty('Bắt buộc'),
    birth: z.date().optional(),
    sellPrice: z.number().optional(),
    breedPrice: z.number().optional(),
    description: z.string().optional(),
    sold: z.boolean().optional(),
    type: z.enum(['sell', 'breed']),
    gender: z.enum(['male', 'female']),
    imageUrls: z.array(z.string()).optional(),
    parent: z
      .object({
        dad: z.string().optional(),
        mom: z.string().optional()
      })
      .optional(),
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
  .refine((data) => {
    return (data.type === 'sell' && data.sellPrice) || (data.type === 'breed' && data.breedPrice)
  })

export type TBirdSchema = z.infer<typeof birdSchema>
