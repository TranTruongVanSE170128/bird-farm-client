import { Button } from '../ui/button'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { TSignUpSchema, signUpSchema } from '@/lib/validations/auth'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import axios from 'axios'
import googleIcon from '@/assets/google.svg'
import { Link, useNavigate } from 'react-router-dom'
import { Shell } from 'lucide-react'
import { useState } from 'react'

export function SignUpForm() {
  const navigate = useNavigate()
  const form = useForm<TSignUpSchema>({
    resolver: zodResolver(signUpSchema)
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function onSubmit(values: TSignUpSchema) {
    setIsSubmitting(true)

    try {
      const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/sign-up`, values)
      if (data?.email && data?.userId) {
        navigate(`/auth/${data.userId}/verify-email?email=${data.email}`)
        return
      }

      throw new Error('Có lỗi xảy ra')
    } catch (error) {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tên đầy đủ</FormLabel>
                <FormControl>
                  <Input placeholder='Nhập tên đầy đủ ...' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder='Nhập email ...' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mật khẩu</FormLabel>
                <FormControl>
                  <Input placeholder='Nhập mật khẩu ...' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={isSubmitting} type='submit' className='w-full'>
            {!isSubmitting ? 'Đăng ký' : <Shell className='animate-spin w-4 h-4' />}
          </Button>
        </form>
      </Form>

      <div className='relative'>
        <div className='absolute inset-0 flex items-center'>
          <span className='w-full border-t' />
        </div>
        <div className='relative flex justify-center text-xs uppercase'>
          <span className='bg-background px-2 text-muted-foreground'>hoặc tiếp tục với</span>
        </div>
      </div>
      <Button variant='outline' type='button'>
        <img className='w-7 h-7 mr-2' alt='google' src={googleIcon} /> Đăng ký bằng google
      </Button>

      <p className='mx-auto'>
        Đã có sẵn tài khoản?{' '}
        <Link className='text-primary hover:underline' to='/auth/sign-in'>
          Đăng nhập
        </Link>
      </p>
    </>
  )
}
