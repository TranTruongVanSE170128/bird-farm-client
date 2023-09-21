import { z } from 'zod'

export const specieSchema = z.object({
  name: z.string().nonempty('Bắt buộc'),
  imageUrl: z.string().optional(),
  description: z.string().optional()
})

export type TSpecieSchema = z.infer<typeof specieSchema>

// export const updateSpecieSchema = z.object({
//   params: z.object({ id: idValidation }),
//   body: z.object({
//     name: z.string().optional(),
//     imageUrl: z.string().url().optional(),
//     description: z.string().optional()
//   })
// })
