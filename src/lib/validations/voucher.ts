import { z } from 'zod'

export const voucherSchema = z.object({
  discountPercent: z.coerce
    .number({ invalid_type_error: 'Phần trăm giảm giá không hợp lệ' })
    .min(0, 'Không thể bé hơn 0')
    .max(100, 'Không thể bé hơn 100'),
  maxDiscountValue: z.coerce
    .number({ invalid_type_error: 'Giá giảm tối đa không hợp lệ' })
    .min(0, 'Không thể bé hơn 0'),
  conditionPrice: z.coerce.number({ invalid_type_error: 'Giá tối thiểu không hợp lệ' }).min(0, 'Không thể bé hơn 0'),
  quantity: z.coerce.number({ invalid_type_error: 'Số lượng không hợp lệ' }).min(0, 'Không thể bé hơn 0'),
  expiredAt: z.date({ invalid_type_error: 'Ngày không hợp lệ' })
})

export type TVoucherSchema = z.infer<typeof voucherSchema>
