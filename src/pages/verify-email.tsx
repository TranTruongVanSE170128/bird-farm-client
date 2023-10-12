import Container from '@/components/ui/container'
import { birdFarmApi } from '@/services/bird-farm-api'
import { useState } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import mailIcon from '@/assets/mail.png'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Shell } from 'lucide-react'
import { toast } from '@/components/ui/use-toast'

function VerifyEmail() {
  const { userId } = useParams()
  const [searchParams] = useSearchParams()
  const email = searchParams.get('email')
  const [code, setCode] = useState('')
  const [verify, setVerify] = useState<'pending' | 'success' | 'fail'>('fail')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async () => {
    if (!code) {
      toast({
        title: 'Không thể xác thực',
        description: 'Không tìm thấy mã xác thực',
        variant: 'destructive'
      })
      return
    }
    setIsSubmitting(true)

    try {
      await birdFarmApi.get(`/api/auth/${userId}/verify/${code}`)
      setVerify('success')
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const messageError = error.response.data.message
      setIsSubmitting(false)
      toast({
        title: 'Không thể xác thực',
        description: messageError || 'Không rõ nguyên nhân',
        variant: 'destructive'
      })
      setVerify('fail')
      setIsSubmitting(false)
    }
  }

  const resendCode = async () => {
    setIsSubmitting(true)
    try {
      await birdFarmApi.get(`/api/auth/${userId}/send-code`)
      setIsSubmitting(false)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const messageError = error.response.data.message
      setIsSubmitting(false)
      toast({
        title: 'Không thể gửi lại mã xác thực',
        description: messageError || 'Không rõ nguyên nhân',
        variant: 'destructive'
      })
    }
  }

  return (
    <main>
      <Container className='flex justify-center items-center min-h-screen flex-col'>
        <div className='flex flex-col justify-center items-center w-[500px] shadow-2xl p-12 rounded-lg'>
          <div className='font-bold text-2xl'>Xác thực email</div>
          <img src={mailIcon} className='w-32 h-32 my-6' />
          {verify === 'pending' && (
            <>
              <p>Chúng tôi đã gửi mã xác thực đến email của bạn</p>
              <h4 className='font-medium text-lg my-4'>{email}</h4>
              <div className='flex flex-col w-full'>
                <Input
                  onChange={(e) => {
                    setCode(e.target.value)
                  }}
                  value={code}
                  type='text'
                  className='px-4 py-2 border border-black'
                />

                <Button
                  onClick={() => {
                    handleSubmit()
                  }}
                  className='w-full mt-4'
                  disabled={isSubmitting}
                >
                  Tiếp tục {isSubmitting && <Shell className='w-4 h-4 ml-1 animate-spin' />}
                </Button>
                <Button
                  onClick={() => {
                    resendCode()
                  }}
                  disabled={isSubmitting}
                  className='w-full mt-2'
                  variant='outline'
                >
                  Gửi lại mã
                </Button>
              </div>
            </>
          )}
          {verify === 'success' && (
            <div className='flex flex-col items-center'>
              <p className='font-medium'>Xác thực email thành công</p>
              <Button className='mt-4'>
                <Link to='/auth/sign-in'>Đăng nhập</Link>
              </Button>
            </div>
          )}
          {verify === 'fail' && (
            <div className='flex flex-col items-center'>
              <p className='font-medium'>Xác thực email thất bại</p>
              <Button
                onClick={() => {
                  setVerify('pending')
                }}
                className='mt-3'
              >
                Nhập lại mã xác thực
              </Button>
              <Button variant='link' className=''>
                <Link to='/'>Quay lại trang chủ</Link>
              </Button>
            </div>
          )}
        </div>
      </Container>
    </main>
  )
}

export default VerifyEmail
