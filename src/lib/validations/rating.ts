import { z } from 'zod'

export const ratingSchema = z.object({
  value: z.coerce.number().min(1, 'Nhỏ nhất 1 sao').max(5, 'Tối đa 5 sao'),
  content: z.string().optional(),
  imageUrls: z.array(z.string()).optional()
})

export type TRatingSchema = z.infer<typeof ratingSchema>
