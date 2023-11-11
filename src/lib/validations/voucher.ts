import { z } from 'zod'

export const voucherSchema = z.object({
  discountPercent: z.coerce
    .number({ invalid_type_error: 'Phần trăm giảm giá không hợp lệ' })
    .min(0, 'Không thể bé hơn 0%')
    .max(100, 'Không thể lớn hơn 100%'),
  maxDiscountValue: z.coerce
    .number({ invalid_type_error: 'Giá giảm tối đa không hợp lệ' })
    .min(0, 'Không thể bé hơn 0đ')
    .max(1000000, 'Không thể lớn hơn 1.000.000đ'),
  conditionPrice: z.coerce.number({ invalid_type_error: 'Giá tối thiểu không hợp lệ' }).min(0, 'Không thể bé hơn 0đ'),
  quantity: z.coerce.number({ invalid_type_error: 'Số lượng không hợp lệ' }).min(0, 'Không thể bé hơn 0'),
  expiredAt: z.date({ invalid_type_error: 'Ngày hết hạn không hợp lệ' })
})

export type TVoucherSchema = z.infer<typeof voucherSchema>
