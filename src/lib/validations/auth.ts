import { z } from 'zod'

// const idValidation = z.string().nonempty('id is required').trim().toLowerCase()
// const verifyCodeValidation = z.string().nonempty('verify code is required').trim().toLowerCase()

export const signInSchema = z.object({
  email: z.string({ required_error: 'Bắt buộc' }).email('Email không hợp lệ').trim().toLowerCase(),
  password: z.string({ required_error: 'Bắt buộc' }).trim()
})

export const signUpSchema = z.object({
  name: z.string({ required_error: 'Bắt buộc' }).min(2, 'Tên ít nhất 2 kí tự').trim(),
  email: z.string({ required_error: 'Bắt buộc' }).email('Email không hợp lệ').trim().toLowerCase(),
  password: z.string({ required_error: 'Bắt buộc' }).trim().min(6, 'Mật khẩu ít nhất 6 kí tự')
})

export type TSignInSchema = z.infer<typeof signInSchema>
export type TSignUpSchema = z.infer<typeof signUpSchema>
