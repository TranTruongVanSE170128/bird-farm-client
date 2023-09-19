import { z } from 'zod'

export const createSpecieSchema = z.object({
  name: z.coerce.string({ required_error: 'Bắt buộc tên loài' }).nonempty('Bắt buộc tên loài'),
  imageUrl: z.coerce.string().optional(),
  description: z.coerce.string().optional()
})

export type TCreateSpecieSchema = z.infer<typeof createSpecieSchema>

// export const updateSpecieSchema = z.object({
//   params: z.object({ id: idValidation }),
//   body: z.object({
//     name: z.coerce.string().optional(),
//     imageUrl: z.coerce.string().url().optional(),
//     description: z.coerce.string().optional()
//   })
// })
