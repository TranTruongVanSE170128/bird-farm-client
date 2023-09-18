import { z } from 'zod'

const idValidation = z.coerce.string().nonempty('id is required').trim()
const nameValidation = z.coerce.string().nonempty('name is required').trim()
const codeValidation = z.coerce.string().nonempty('code is required').trim().length(6)

export const addSpecieSchema = z.object({
  body: z.object({
    name: nameValidation,
    code: codeValidation,
    imageUrl: z.coerce.string().url().optional(),
    description: z.coerce.string().optional()
  })
})

export const updateSpecieSchema = z.object({
  params: z.object({ id: idValidation }),
  body: z.object({
    name: z.coerce.string().optional(),
    imageUrl: z.coerce.string().url().optional(),
    description: z.coerce.string().optional()
  })
})
