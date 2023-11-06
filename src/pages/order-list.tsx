import { useState, useEffect } from 'react'
import Container from '@/components/ui/container'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { addSearchParams, cn, formatPrice, statusToMessage, statusToVi } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Order, getBirds, getNests, getSpecie } from '@/lib/types'
import { birdFarmApi } from '@/services/bird-farm-api'
import Paginate from '@/components/paginate'
import noImage from '@/assets/no-image.webp'
import femaleIcon from '@/assets/female.svg'
import maleIcon from '@/assets/male.svg'
import birdIcon from '@/assets/bird-color.svg'
import nestIcon from '@/assets/nest-color.svg'
import Spinner from '@/components/ui/spinner'
import { useToast } from '@/components/ui/use-toast'
import { useModalStore } from '@/store/use-modal'
import { useRatingFormStore } from '@/store/use-rating-form'
import greyBirdIcon from '@/assets/grey-bird.svg'

const tabItems = [
  { label: 'Tất cả', value: 'all' },
  { label: 'Đang xử lý', value: 'processing' },
  { label: 'Đang giao', value: 'delivering' },
  { label: 'Hoàn thành', value: 'success' },
  { label: 'Đã hủy', value: 'canceled' }
] as const

const tabWidthPercentage = 20
const pageSize = 5

function OrderList() {
  const [searchParams] = useSearchParams()
  const activeTab = searchParams.get('tab') || 'all'
  const [barStyle, setBarStyle] = useState({ left: '0%', width: '0%' })
  const navigate = useNavigate()
  const pageNumber = Number(searchParams.get('pageNumber') || 1)
  const [orders, setOrders] = useState<Order[]>([])
  const [isLoadingOrders, setIsLoadingOrders] = useState(true)
  const [totalPages, setTotalPages] = useState<number | null>(null)
  const { toast } = useToast()
  const { showRatingForm } = useRatingFormStore()
  const { showModal } = useModalStore()

  const showModalCancelOrder = (id: string) => {
    showModal({
      title: 'Bạn có chắc muốn hủy đơn hàng không?',
      titleAction: 'Hủy đơn hàng',
      titleCancel: 'Trở lại',
      handleAction: async () => {
        try {
          await birdFarmApi.put(`api/orders/${id}/cancel`)
          navigate('/orders?tab=canceled')
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
          const messageError = error.response.data.message

          toast({
            title: 'Không thể hủy đơn hàng',
            description: messageError || 'Không rõ nguyên nhân',
            variant: 'destructive'
          })
        }
      }
    })
  }

  const receiveOrder = async (id: string) => {
    try {
      await birdFarmApi.put(`api/orders/${id}/receive`)
      navigate('/orders?tab=success')
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const messageError = error.response.data.message

      toast({
        title: 'Không thể nhận hàng',
        description: messageError || 'Không rõ nguyên nhân',
        variant: 'destructive'
      })
    }
  }

  useEffect(() => {
    const activeTabIndex = tabItems.findIndex((tab) => tab.value === activeTab)
    const barPosition = activeTabIndex * tabWidthPercentage
    setBarStyle({ left: `${barPosition}%`, width: `${tabWidthPercentage}%` })
  }, [activeTab])

  useEffect(() => {
    const fetchOrders = async () => {
      setIsLoadingOrders(true)
      const { data } = await birdFarmApi.get(
        addSearchParams('/api/orders/pagination', { pageNumber, pageSize, status: activeTab !== 'all' && activeTab })
      )
      setOrders(data?.orders || [])
      setTotalPages(data?.totalPages || null)
      setIsLoadingOrders(false)
    }

    fetchOrders()
  }, [pageNumber, activeTab])

  return (
    <main>
      <Container>
        <div className='relative w-full mt-6 h-14 shadow-l bg-muted'>
          <div className='absolute bottom-0 h-1 transition-all duration-300 bg-primary' style={barStyle} />
          <ul className='flex items-center justify-around h-full'>
            {tabItems.map((tab) => (
              <li
                key={tab.value}
                className={cn(
                  'cursor-pointer hover:text-primary w-full h-full flex justify-center items-center',
                  activeTab === tab.value ? 'text-primary' : 'text-muted-foreground'
                )}
                onClick={() => navigate(`/orders?tab=${tab.value}`)}
              >
                <Link to={`/orders?tab=${tab.value}`}>{tab.label}</Link>
              </li>
            ))}
          </ul>
        </div>
        {isLoadingOrders && <Spinner className='mt-12' />}

        {!isLoadingOrders && !orders.length && (
          <div className='flex justify-center items-center w-full h-[400px] bg-accent mt-4'>
            <div className='flex flex-col items-center justify-center col-span-1 mt-12 text-lg font-medium'>
              Chưa có đơn hàng nào <img src={greyBirdIcon} className='w-24 h-24 mt-4' />
            </div>
          </div>
        )}

        {!isLoadingOrders &&
          orders?.map((order) => {
            type TStateButton = { title: string; disabled?: boolean; className?: string; handleClick: () => void }

            const stateButtons: TStateButton[] = []
            if (order.status === 'success' && !order.rated) {
              stateButtons.push({ title: 'Đánh Giá', handleClick: () => showRatingForm({ orderId: order._id }) })
            }

            if (order.status === 'delivering') {
              stateButtons.push({
                title: 'Đã Nhận Hàng',
                handleClick: () => {
                  receiveOrder(order._id)
                }
              })
            }

            if (order.status === 'processing') {
              stateButtons.push({ title: 'Hủy Đơn Hàng', handleClick: () => showModalCancelOrder(order._id) })
            }

            if (order.status === 'success' && order.rated) {
              stateButtons.push({
                title: 'Đã Đánh Giá',
                disabled: true,
                handleClick: () => showRatingForm({ orderId: order._id }),
                className: 'border-primary select-none'
              })
            }

            return (
              <div key={order._id} className='px-8 py-4 mt-4 rounded bg-muted'>
                <div className='flex justify-end'>
                  {order?.cancelMessage ? (
                    <p className='mt-2 text-teal-500'>{order?.cancelMessage}</p>
                  ) : (
                    <p className='mt-2 text-teal-500'>{statusToMessage[order.status]}</p>
                  )}

                  <div className='w-[1px] h-[20px] bg-border mx-4 mt-2 ' />
                  <p className='mt-2 uppercase text-primary'>{statusToVi[order.status]}</p>
                </div>
                <div className='min-w-full h-[1px] bg-border/50 my-4' />
                {getBirds(order).map((bird) => (
                  <div key={bird._id} className='flex flex-row justify-between mb-3'>
                    <div className='flex items-center gap-4'>
                      <img
                        className='object-cover w-20 border rounded-md cursor-pointer aspect-square'
                        src={bird.imageUrls?.[0] || noImage}
                        alt='bird'
                      />

                      <div>
                        <p className='font-semibold text-center md:text-left'>{bird.name}</p>
                        <p className='flex items-center'>
                          Loài: {getSpecie(bird).name}
                          {bird.gender === 'male' ? (
                            <img className='w-6 h-6 ml-1' src={maleIcon} alt='' />
                          ) : (
                            <img className='w-6 h-6 ml-1' src={femaleIcon} alt='' />
                          )}
                        </p>
                        <p className='flex items-center'>
                          Phân loại: Chim kiểng <img src={birdIcon} className='w-5 h-5 ml-1' />
                        </p>
                      </div>
                    </div>
                    <div className='flex items-center'>
                      <p>{formatPrice(bird.sellPrice)}</p>
                    </div>
                  </div>
                ))}
                {getNests(order).map((nest) => (
                  <div key={nest._id} className='flex flex-row justify-between mb-4'>
                    <div className='flex items-center gap-4'>
                      <img
                        className='object-cover w-20 border rounded-md cursor-pointer aspect-square'
                        src={nest.imageUrls?.[0] || noImage}
                        alt='nest'
                      />

                      <div>
                        <p className='font-semibold text-center md:text-left'>{nest.name}</p>
                        <p className='flex items-center'>Loài: {getSpecie(nest).name}</p>
                        <p className='flex items-center'>
                          Phân loại: Tổ chim non <img src={nestIcon} className='w-5 h-5 ml-1' />
                        </p>
                      </div>
                    </div>
                    <div className='flex items-center'>
                      <p>{formatPrice(nest.price)}</p>
                    </div>
                  </div>
                ))}
                <div className='min-w-full h-[1px] bg-border/50' />
                <div className='flex items-center justify-end gap-3 mt-6'>
                  <p className='mt-1 text-lg font-medium leading-0'>Thành tiền:</p>
                  {order.discount ? (
                    <div className='flex items-center gap-2 leading-0'>
                      <p className='line-through text-2xl text-slate-500'>{formatPrice(order.totalMoney)}</p>
                      <p className='text-2xl font-medium text-primary'>
                        {formatPrice(order.totalMoney - order.discount)}
                      </p>
                    </div>
                  ) : (
                    <p className='text-2xl font-semibold text-primary'>{formatPrice(order.totalMoney)}</p>
                  )}
                </div>
                <div className='flex flex-col items-center justify-end gap-3 mt-5 md:flex-row'>
                  {stateButtons.map((button, i) => {
                    return (
                      <Button
                        key={button.title}
                        disabled={button.disabled}
                        variant={i === 0 ? 'default' : 'outline'}
                        onClick={button.handleClick}
                        className={button.className}
                        size='lg'
                      >
                        {button.title}
                      </Button>
                    )
                  })}
                </div>
              </div>
            )
          })}

        {!!totalPages && (
          <Paginate
            className='mt-8'
            path={addSearchParams('/orders', { tab: activeTab })}
            pageSize={pageSize}
            pageNumber={pageNumber}
            totalPages={totalPages}
          />
        )}
      </Container>
    </main>
  )
}

export default OrderList
