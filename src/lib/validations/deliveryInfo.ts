import { z } from 'zod'

export const deliveryInfoSchema = z.object({
  type: z.enum(['cod', 'online'], {
    required_error: 'Bạn cần lựa chọn phương thức thanh toán'
  }),
  receiver: z.string().min(2, {
    message: 'Tên tối thiểu 2 chữ cái'
  }),
  phoneNumber: z
    .string()
    .min(10, {
      message: 'Số điện thoại có độ dài tối thiểu là 10 chữ số'
    })
    .max(11, {
      message: 'Số điện thoại có độ dài tối đa là 11 chữ số'
    })
    .trim()
    .refine((p) => p.match(/^[0-9]+$/), 'Số điện thoại không hợp lệ'),
  province: z.string({ required_error: 'Bắt buộc' }).min(1, 'Tỉnh bắt buộc').trim(),
  district: z.string({ required_error: 'Bắt buộc' }).min(1, 'Thành phố bắt buộc').trim(),
  ward: z.string({ required_error: 'Bắt buộc' }).min(1, 'Phường/Xã bắt buộc').trim(),
  address: z.string({ required_error: 'Bắt buộc' }).min(1, 'Số nhà, tên đường bắt buộc').trim(),
  notice: z.string().trim().optional()
})

export type TDeliveryInfoSchema = z.infer<typeof deliveryInfoSchema>
