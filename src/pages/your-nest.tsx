import Container from '@/components/ui/container'
import { useEffect, useState } from 'react'
import { addSearchParams, cn } from '@/lib/utils'
import { OrderNest } from '@/lib/types'
import { birdFarmApi } from '@/services/bird-farm-api'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import Paginate from '@/components/paginate'
import Spinner from '@/components/ui/spinner'
import OrderNestCard from '@/components/order-nest-card'
import greyBirdIcon from '@/assets/grey-bird.svg'

const pageSize = 5
const tabWidthPercentage = 100 / 7
const tabItems = [
  { label: 'Tất cả', value: '' },
  { label: 'Đang xử lý', value: 'processing' },
  { label: 'Đang phối giống', value: 'breeding' },
  { label: 'Chờ thanh toán', value: 'wait-for-payment' },
  { label: 'Đang giao', value: 'delivering' },
  { label: 'Hoàn thành', value: 'success' },
  { label: 'Đã hủy', value: 'canceled' }
] as const

function YourNest() {
  const [searchParams] = useSearchParams()
  const pageNumber = Number(searchParams.get('pageNumber') || 1)
  const [orderNests, setOrderNests] = useState<OrderNest[]>([])
  const [isLoadingOrderNests, setIsLoadingOrderNests] = useState(true)
  const [totalPages, setTotalPages] = useState<number | null>(null)
  const navigate = useNavigate()
  const activeTab = searchParams.get('tab') || ''
  const [barStyle, setBarStyle] = useState({ left: '0%', width: '0%' })

  useEffect(() => {
    const fetchOrderNests = async () => {
      setIsLoadingOrderNests(true)
      const { data } = await birdFarmApi.get(
        addSearchParams('/api/order-nests/pagination', { pageNumber, pageSize, status: activeTab })
      )
      setOrderNests(data?.orderNests || [])
      setTotalPages(data?.totalPages || null)
      setIsLoadingOrderNests(false)
    }

    fetchOrderNests()
  }, [pageNumber, activeTab])

  useEffect(() => {
    const activeTabIndex = tabItems.findIndex((tab) => tab.value === activeTab)
    const barPosition = activeTabIndex * tabWidthPercentage
    setBarStyle({ left: `${barPosition}%`, width: `${tabWidthPercentage}%` })
  }, [activeTab])

  useEffect(() => {
    console.log(totalPages)
  }, [totalPages])

  return (
    <main className='container mt-8 transition-all sm:flex-row'>
      <Container>
        <div className='flex flex-col w-full gap-5 mx-2'>
          <div>
            <div className='my-5 text-2xl font-bold uppercase'>Theo dõi quá trình phát triển của tổ chim của bạn</div>

            <div className='relative w-full mt-6 h-14 shadow-l bg-muted mb-6'>
              <div className='absolute bottom-0 h-1 transition-all duration-300 bg-primary' style={barStyle} />
              <ul className='flex items-center justify-around h-full'>
                {tabItems.map((tab) => (
                  <li
                    key={tab.value}
                    className={cn(
                      'cursor-pointer hover:text-primary w-full h-full flex justify-center items-center',
                      activeTab === tab.value ? 'text-primary' : 'text-muted-foreground'
                    )}
                    onClick={() => navigate(`/your-nest?tab=${tab.value}`)}
                  >
                    <Link to={`/your-nest?tab=${tab.value}`}>{tab.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

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
            path={addSearchParams('/api/order-nests/pagination', { pageNumber, pageSize, status: activeTab })}
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
