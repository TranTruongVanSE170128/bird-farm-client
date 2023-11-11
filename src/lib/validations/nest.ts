import { z } from 'zod'

export const nestSchema = z.object({
  specie: z.string().trim().min(1, 'Bắt buộc'),
  name: z.string().trim().min(1, 'Bắt buộc'),
  dad: z.string().optional(),
  mom: z.string().optional(),
  price: z.coerce.number({ invalid_type_error: 'Giá bán không hợp lệ' }),
  imageUrls: z.array(z.string()).optional(),
  description: z.string().optional()
})

export type TNestSchema = z.infer<typeof nestSchema>
