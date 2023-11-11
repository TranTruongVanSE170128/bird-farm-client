import { z } from 'zod'

export const signInSchema = z.object({
  email: z.string().trim().toLowerCase().min(1, 'Bắt buộc').email('Email không hợp lệ'),
  password: z.string().trim().min(1, 'Bắt buộc')
})

export const signUpSchema = z.object({
  name: z.string().trim().min(1, 'Bắt buộc').min(2, 'Tên ít nhất 2 kí tự'),
  email: z.string().trim().toLowerCase().min(1, 'Bắt buộc').email('Email không hợp lệ'),
  password: z.string().trim().min(6, 'Mật khẩu ít nhất 6 kí tự')
})

export type TSignInSchema = z.infer<typeof signInSchema>
export type TSignUpSchema = z.infer<typeof signUpSchema>
