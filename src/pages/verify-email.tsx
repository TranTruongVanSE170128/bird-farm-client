import { birdFarmApi } from '@/services/bird-farm-api'
import { useState } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'

function VerifyEmail() {
  const { userId } = useParams()
  const [searchParams] = useSearchParams()
  const email = searchParams.get('email')
  const [code, setCode] = useState('')
  const [verify, setVerify] = useState<'pending' | 'success' | 'fail'>('pending')
  const [isSubmiting, setIsSubmiting] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmiting(true)

    try {
      await birdFarmApi.get(`/api/auth/${userId}/verify/${code}`)
      setVerify('success')
    } catch (error) {
      setVerify('fail')
      setIsSubmiting(false)
    }
  }

  return (
    <>
      {isSubmiting && <div>đang submit</div>}
      <form onSubmit={handleSubmit}>
        Hãy kiểm tra email: {email}
        <input
          onChange={(e) => {
            setCode(e.target.value)
          }}
          value={code}
          type='text'
          className='border border-black py-2 px-4'
        />
      </form>
      {verify === 'success' && (
        <div>
          Xác thực email thành công <Link to='/auth/sign-in'>Đăng nhập</Link>
        </div>
      )}
      {verify === 'fail' && (
        <div>
          Xác thực thất bại <Link to='/'>Quay lại trang chủ</Link>
        </div>
      )}
    </>
  )
}

export default VerifyEmail
