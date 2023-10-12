import { z } from 'zod'

export const specieSchema = z.object({
  name: z.string().min(1, 'Bắt buộc'),
  imageUrl: z.string().optional(),
  description: z.string().optional()
})

export type TSpecieSchema = z.infer<typeof specieSchema>
