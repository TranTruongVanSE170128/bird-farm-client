import { z } from 'zod'

export const birdSchema = z
  .object({
    specie: z.string().min(1, 'Bắt buộc'),
    name: z.string().min(1, 'Bắt buộc'),
    birth: z.date().optional(),
    sellPrice: z.coerce.number().optional(),
    breedPrice: z.coerce.number().optional(),
    description: z.string().optional(),
    sold: z.coerce.boolean().optional(),
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
  .refine(
    (data) => {
      return (data.type === 'sell' && data.sellPrice) || data.type === 'breed'
    },
    {
      message: 'Giá bán bắt buộc',
      path: ['sellPrice']
    }
  )
  .refine(
    (data) => {
      return (data.type === 'breed' && data.breedPrice) || data.type === 'sell'
    },
    {
      message: 'Giá phối giống bắt buộc',
      path: ['breedPrice']
    }
  )
export type TBirdSchema = z.infer<typeof birdSchema>
