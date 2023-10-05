import Container from '@/components/ui/container'
import { useEffect, useState } from 'react'
import { addSearchParams } from '@/lib/utils'
import { OrderNest } from '@/lib/types'
import { birdFarmApi } from '@/services/bird-farm-api'
import { useSearchParams } from 'react-router-dom'
import Paginate from '@/components/paginate'
import Spinner from '@/components/ui/spinner'
import OrderNestCard from '@/components/order-nest-card'
import greyBirdIcon from '@/assets/grey-bird.svg'

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
    <main className='container mt-8 transition-all sm:flex-row'>
      <Container>
        <div className='flex flex-col w-full gap-5 mx-2'>
          <div>
            <div className='my-5 text-2xl font-bold uppercase'>Theo dõi quá trình phát triển của tổ chim của bạn</div>

            {isLoadingOrderNests && <Spinner className='mt-8' />}

            {!isLoadingOrderNests && !orderNests.length && (
              <div className='flex justify-center items-center w-full h-[400px] bg-accent mt-4'>
                <div className='flex flex-col items-center justify-center col-span-1 mt-12 text-lg font-medium'>
                  Chưa có tổ chim nào <img src={greyBirdIcon} className='w-24 h-24 mt-4' />
                </div>
              </div>
            )}

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
