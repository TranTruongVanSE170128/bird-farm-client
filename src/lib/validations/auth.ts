import { z } from 'zod'

// const idValidation = z.coerce.string().nonempty('id is required').trim().toLowerCase()
// const verifyCodeValidation = z.coerce.string().nonempty('verify code is required').trim().toLowerCase()

export const signInSchema = z.object({
  email: z.coerce.string({ required_error: 'Bắt buộc' }).email('Email không hợp lệ').trim().toLowerCase(),
  password: z.coerce.string({ required_error: 'Bắt buộc' }).trim()
})

export const signUpSchema = z.object({
  name: z.coerce.string({ required_error: 'Bắt buộc' }).min(2, 'Tên ít nhất 2 kí tự').trim(),
  email: z.coerce.string({ required_error: 'Bắt buộc' }).email('Email không hợp lệ').trim().toLowerCase(),
  password: z.coerce.string({ required_error: 'Bắt buộc' }).trim().min(6, 'Mật khẩu ít nhất 6 kí tự')
})

export type TSignInSchema = z.infer<typeof signInSchema>
export type TSignUpSchema = z.infer<typeof signUpSchema>

// export const forgetPasswordSchema = z.object({
//   body: z.object({
//     email: emailValidation
//   })
// })

// export const verifyEmailSchema = z.object({
//   params: z.object({
//     id: idValidation,
//     verifyCode: verifyCodeValidation
//   })
// })

// export const resetPasswordSchema = z.object({
//   params: z.object({
//     id: idValidation,
//     resetPasswordCode: verifyCodeValidation
//   }),
//   body: z.object({
//     password: passwordValidation
//   })
// })
