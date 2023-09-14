import { z } from 'zod'

// const idValidation = z.string().nonempty('id is required').trim().toLowerCase()
// const verifyCodeValidation = z.string().nonempty('verify code is required').trim().toLowerCase()

export const signInSchema = z.object({
  email: z.string().nonempty('Vui lòng điền email').email().trim().toLowerCase(),
  password: z.string().nonempty('Vui lòng điền mật khẩu').trim().toLowerCase()
})

export const signUpSchema = z.object({
  name: z.string().nonempty('Vui lòng điền tên').trim().toLowerCase(),
  email: z.string().nonempty('Vui lòng điền email').email().trim().toLowerCase(),
  password: z.string().nonempty('Vui lòng điền mật khẩu').trim().toLowerCase()
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
