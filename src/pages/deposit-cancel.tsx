import Container from '@/components/ui/container'
import { Link, useSearchParams } from 'react-router-dom'
import depositCancelBg from '@/assets/deposit-cancel.png'
function DepositCancel() {
  const [searchParams] = useSearchParams()
  const type = searchParams.get('type') || 'payment' //payment will be the default type

  return (
    <main>
      <Container className='flex flex-col items-center'>
        <img src={depositCancelBg} className='w-[500px] h-[500px]' />
        <div className='text-2xl font-medium'>{type === 'payment' ? 'Thanh toán thất bại' : 'Đặt cọc thất bại'}</div>

        <Link to='/' className='underline hover:text-primary font-medium text-xl mt-12'>
          Quay lại trang chủ
        </Link>
      </Container>
    </main>
  )
}

export default DepositCancel
