import { z } from 'zod'

export const specieSchema = z.object({
  name: z.string().trim().min(1, 'Bắt buộc'),
  imageUrl: z.string().trim().optional(),
  description: z.string().trim().optional()
})

export type TSpecieSchema = z.infer<typeof specieSchema>
