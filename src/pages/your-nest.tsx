import Container from '@/components/ui/container'
import { useEffect, useState } from 'react'
import { addSearchParams } from '@/lib/utils'
import { OrderNest } from '@/lib/types'
import { birdFarmApi } from '@/services/bird-farm-api'
import { useSearchParams } from 'react-router-dom'
import Paginate from '@/components/paginate'
import Spinner from '@/components/ui/spinner'
import OrderNestCard from '@/components/ui/order-nest-card'

const pageSize = 5

function YourNest() {
  const [searchParams] = useSearchParams()
  const pageNumber = Number(searchParams.get('pageNumber') || 1)
  const [orderNests, setOrderNests] = useState<OrderNest[]>([])
  const [isLoadingOrderNests, setIsLoadingOrderNests] = useState(true)
  const [totalPages, setTotalPages] = useState<number | null>(null)

  useEffect(() => {
    const fetchOrderNests = async () => {
      setIsLoadingOrderNests(true)
      const { data } = await birdFarmApi.get(addSearchParams('/api/order-nests/pagination', { pageNumber, pageSize }))
      setOrderNests(data?.orderNests || [])
      setTotalPages(data?.totalPages || null)
      setIsLoadingOrderNests(false)
    }

    fetchOrderNests()
  }, [pageNumber])

  return (
    <main className='mt-8 container sm:flex-row transition-all'>
      <Container>
        <div className='w-full flex flex-col mx-2 gap-5'>
          <div>
            <div className='font-bold uppercase my-5 text-2xl'>Theo dõi quá trình phát triển của tổ chim của bạn</div>

            {isLoadingOrderNests && <Spinner className='mt-8' />}

            {!isLoadingOrderNests && orderNests?.map((orderNest) => <OrderNestCard orderNest={orderNest} />)}
          </div>
        </div>

        {!!totalPages && (
          <Paginate
            className='mt-8'
            path={'/your-nest'}
            pageSize={pageSize}
            pageNumber={pageNumber}
            totalPages={totalPages}
          />
        )}
      </Container>
    </main>
  )
}

export default YourNest
