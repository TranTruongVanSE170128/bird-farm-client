import Container from '@/components/ui/container'
import { Link, useSearchParams } from 'react-router-dom'
import depositSuccessBg from '@/assets/deposit-success.png'
import { useBreedStore } from '@/store/use-breed'
import { useEffect } from 'react'
import { useCartContext } from '@/contexts/cart-provider'

function DepositSuccess() {
  const [searchParams] = useSearchParams()
  const type = searchParams.get('type') || 'payment' //payment will be the default type
  const { deleteAllBirds } = useBreedStore()
  const { clearCart } = useCartContext()

  useEffect(() => {
    if (type === 'payment') {
      clearCart()
    }
    if (type === 'deposit') {
      deleteAllBirds()
    }
  }, [type, deleteAllBirds, clearCart])

  return (
    <main>
      <Container className='flex flex-col items-center'>
        <img src={depositSuccessBg} className='w-[450px] h-[450px]' />
        <div className='text-2xl font-medium'>
          {type === 'payment' ? 'Thanh toán thành công' : 'Đặt cọc thành công'}
        </div>
        <p className='text-lg mt-4'>
          Cảm ơn vì đã tin tưởng <span className='text-primary font-medium'>Bird Farm Shop</span>
        </p>

        <Link to='/' className='underline hover:text-primary font-medium text-xl mt-8'>
          Quay lại trang chủ
        </Link>
      </Container>
    </main>
  )
}

export default DepositSuccess
