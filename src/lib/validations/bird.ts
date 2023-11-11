import { z } from 'zod'

export const birdSchema = z
  .object({
    specie: z.string().trim().min(1, 'Bắt buộc'),
    name: z.string().trim().min(1, 'Bắt buộc'),
    birth: z.date({ invalid_type_error: 'Ngày sinh không hợp lệ' }).optional(),
    sellPrice: z.coerce.number({ invalid_type_error: 'Giá bán không hợp lệ' }).optional(),
    breedPrice: z.coerce.number({ invalid_type_error: 'Giá phối giống không hợp lệ' }).optional(),
    description: z.string().trim().optional(),
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
