import { Button } from '../ui/button'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { TSignInSchema, signInSchema } from '@/lib/validations/auth'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import googleIcon from '@/assets/google.svg'
import { Link, useNavigate } from 'react-router-dom'
import { Shell } from 'lucide-react'
import { useState } from 'react'
import { useToast } from '../ui/use-toast'
import { useGoogleLogin } from '@react-oauth/google'
import { useAuthContext } from '@/contexts/auth-provider'
import { birdFarmApi } from '@/services/bird-farm-api'

export function SignInForm() {
  const navigate = useNavigate()
  const { setAccessToken } = useAuthContext()
  const { toast } = useToast()
  const form = useForm<TSignInSchema>({
    resolver: zodResolver(signInSchema)
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoggingGoogle, setIsLoggingGoogle] = useState(false)

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      setIsLoggingGoogle(true)
      try {
        const { data } = await birdFarmApi.post('/api/auth/login-google', {
          accessTokenGoogle: codeResponse.access_token
        })
        const accessToken = data.accessToken
        setAccessToken(accessToken)
        navigate('/')
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        const messageError = error.response.data.message
        toast({
          variant: 'destructive',
          description: messageError || 'Không rõ nguyên nhân',
          title: 'Lỗi đăng nhập'
        })
        setIsLoggingGoogle(false)
      }
    }
  })

  async function onSubmit(values: TSignInSchema) {
    setIsSubmitting(true)
    try {
      const { data } = await birdFarmApi.post('/api/auth/sign-in', values)
      setAccessToken(data?.accessToken)
      navigate('/')
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const messageError = error.response.data.message
      toast({
        variant: 'destructive',
        description: messageError || 'Không rõ nguyên nhân',
        title: 'Lỗi đăng nhập'
      })
      if (messageError === 'Email chưa được xác thực.') {
        navigate(`/auth/${error.response.data.userId}/verify-email?email=${error.response.data.email}`)
      }
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
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
                  <Input type='password' placeholder='Nhập mật khẩu ...' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={isSubmitting} type='submit' className='w-full'>
            Đăng nhập {isSubmitting && <Shell className='w-4 h-4 animate-spin' />}
          </Button>
        </form>
      </Form>

      <div className='relative'>
        <div className='absolute inset-0 flex items-center'>
          <span className='w-full border-t' />
        </div>
        <div className='relative flex justify-center text-xs uppercase'>
          <span className='px-2 bg-background text-muted-foreground'>hoặc tiếp tục với</span>
        </div>
      </div>
      <Button
        onClick={() => {
          handleGoogleLogin()
        }}
        variant='outline'
        type='button'
        disabled={isLoggingGoogle}
      >
        <img className='mr-2 w-7 h-7' alt='google' src={googleIcon} />
        Đăng nhập bằng google
        {isLoggingGoogle && <Shell className='w-4 h-4 ml-1 animate-spin' />}
      </Button>

      <p className='mx-auto'>
        Chưa có tài khoản?{' '}
        <Link className='text-primary hover:underline' to='/auth/sign-up'>
          Đăng ký
        </Link>
      </p>
    </>
  )
}
