import noImage from '@/assets/no-image.webp'
import { useState } from 'react'
import { cn, formatPrice, statusToMessage, statusToVi } from '@/lib/utils'
import { OrderNest, Stage, getSpecie } from '@/lib/types'
import maleIcon from '@/assets/male.svg'
import femaleIcon from '@/assets/female.svg'
import { Link, useNavigate } from 'react-router-dom'
import breedIcon from '@/assets/breed.svg'
import greyBirdIcon from '@/assets/grey-bird.svg'
import { birdFarmApi } from '@/services/bird-farm-api'
import { useModalStore } from '@/store/use-modal'
import { toast } from './ui/use-toast'
import { Button } from './ui/button'
import { Shell } from 'lucide-react'
import { useRatingFormStore } from '@/store/use-rating-form'
import { useAuthContext } from '@/contexts/auth-provider'

type Props = {
  orderNest: OrderNest
}

function OrderNestCard({ orderNest }: Props) {
  const [indexActive, setIndexActive] = useState(orderNest.stages.length ? 0 : -1)
  const [selectedStage, setSelectedStage] = useState<Stage | null>(orderNest?.stages?.[0] || null)
  const { showModal } = useModalStore()
  const navigate = useNavigate()
  const [isReceivingOrder, setIsReceivingOrder] = useState(false)
  const { showRatingForm } = useRatingFormStore()
  const { user } = useAuthContext()
  const isStaff = user?.role === 'staff'

  const receiveOrderNest = async (id: string) => {
    setIsReceivingOrder(true)
    try {
      await birdFarmApi.put(`api/order-nests/${id}/receive`)
      window.location.reload()
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const messageError = error.response.data.message
      setIsReceivingOrder(false)
      toast({
        title: 'Không thể nhận hàng',
        description: messageError || 'Không rõ nguyên nhân',
        variant: 'destructive'
      })
    }
  }

  const redirectToCheckout = () => {
    navigate(`/checkout-order-nest?orderNest=${orderNest._id}`)
  }

  const showModalCancelOrderNest = (id: string) => {
    showModal({
      title: 'Bạn có chắc muốn hủy đơn hàng không?',
      titleAction: 'Hủy đơn hàng',
      titleCancel: 'Không phải bây giờ',
      handleAction: async () => {
        try {
          await birdFarmApi.put(`api/order-nests/${id}/cancel`)
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

  return (
    <div className='flex flex-col gap-6 p-8 mb-10 border shadow-xl rounded-3xl'>
      {!isStaff && (
        <>
          <div className='flex justify-end'>
            {orderNest?.cancelMessage ? (
              <p className='mt-2 text-teal-500'>{orderNest?.cancelMessage}</p>
            ) : (
              <p className='mt-2 text-teal-500'>{statusToMessage[orderNest.status]}</p>
            )}

            <div className='w-[1px] h-[20px] bg-border mx-4 mt-2 ' />
            <p className='mt-2 uppercase text-primary'>{statusToVi[orderNest.status]}</p>
          </div>
          <div className='min-w-full h-[1px] bg-border mb-4' />
        </>
      )}
      <div className='grid grid-cols-2 gap-12'>
        <div className='flex flex-col col-span-1 gap-2'>
          <div className='flex gap-4'>
            <div className='text-lg font-medium'>
              Chim non đực: <span className='text-primary'>{orderNest.numberChildPriceMale}</span> con
            </div>
            <div className='text-lg font-medium'>
              Chim non cái: <span className='text-primary'>{orderNest.numberChildPriceFemale}</span> con
            </div>
          </div>

          <div className='flex gap-4'>
            <div className='text-lg font-medium'>
              Giá chim non đực: <span className='text-primary'>{formatPrice(orderNest.childPriceMale)}</span>/con
            </div>
            <div className='text-lg font-medium'>
              Giá chim non cái: <span className='text-primary'>{formatPrice(orderNest.childPriceFemale)}</span>/con
            </div>
          </div>

          <Link to={`/birds/${orderNest.dad._id}`} className='flex group'>
            <img
              className='object-cover w-24 border rounded-md aspect-square'
              src={orderNest.dad.imageUrls?.[0] || noImage}
            />
            <div className='flex flex-col justify-around mx-5'>
              <div className='font-bold'>Chim bố: {orderNest.dad.name}</div>
              <div className='flex gap-2'>
                <div>Loài: {getSpecie(orderNest).name}</div>
                <img className='w-6 h-6' src={maleIcon} />
              </div>
              <div className='flex items-center gap'>
                Loại chim: Chim phối giống <img src={breedIcon} className='w-6 h-6' />
              </div>
            </div>
          </Link>

          <Link to={`/birds/${orderNest.mom._id}`} className='flex group'>
            <img
              className='object-cover w-24 border rounded-md aspect-square'
              src={orderNest.mom.imageUrls?.[0] || noImage}
            />
            <div className='flex flex-col justify-around mx-5'>
              <div className='font-bold'>Chim mẹ: {orderNest.mom.name}</div>
              <div className='flex gap-2'>
                <div>Loài: {getSpecie(orderNest).name}</div>
                <img className='w-6 h-6' src={femaleIcon} />
              </div>
              <div className='flex items-center gap'>
                Loại chim: Chim phối giống <img src={breedIcon} className='w-6 h-6' />
              </div>
            </div>
          </Link>

          {!isStaff && (
            <div className='flex flex-row items-center gap-3 mt-8'>
              {orderNest.status === 'processing' && (
                <>
                  <Button>Liên hệ shop</Button>

                  <Button onClick={() => showModalCancelOrderNest(orderNest._id)} variant='outline'>
                    Hủy đơn hàng
                  </Button>
                </>
              )}

              {orderNest.status === 'breeding' && <Button>Liên hệ shop</Button>}

              {orderNest.status === 'wait-for-payment' && (
                <>
                  <Button onClick={() => redirectToCheckout()}>Thanh toán ngay</Button>
                  <Button variant='outline'>Liên hệ shop</Button>
                </>
              )}

              {orderNest.status === 'delivering' && (
                <>
                  <Button
                    onClick={() => {
                      receiveOrderNest(orderNest._id)
                    }}
                    disabled={isReceivingOrder}
                  >
                    Đã nhận hàng {isReceivingOrder && <Shell className='w-4 h-4 ml-1 animate-spin' />}
                  </Button>
                  <Button variant='outline'>Liên hệ shop</Button>
                </>
              )}

              {orderNest.status === 'success' && !orderNest.rated && (
                <>
                  <Button onClick={() => showRatingForm({ orderNestId: orderNest._id })} disabled={isReceivingOrder}>
                    Đánh giá {isReceivingOrder && <Shell className='w-4 h-4 ml-1 animate-spin' />}
                  </Button>
                  <Button variant='outline'>Liên hệ shop</Button>
                </>
              )}

              {orderNest.status === 'success' && orderNest.rated && (
                <>
                  <Button>Liên hệ shop</Button>
                  <Button variant='outline' disabled={true} className='border-primary text-primary'>
                    Đã Đánh Giá
                  </Button>
                </>
              )}
            </div>
          )}
        </div>

        {selectedStage && (
          <div className='flex flex-col items-center col-span-1'>
            <img
              className='object-cover w-full aspect-video rounded-xl'
              src={selectedStage.imageUrl}
              alt='Selected Image'
            />
            <div className='flex flex-col items-center gap-2 mt-2 text-lg'>{selectedStage.description}</div>
          </div>
        )}

        {!orderNest.stages.length && (
          <div className='flex flex-col items-center justify-center col-span-1 text-lg font-medium'>
            Chưa có giai đoạn phát triển nào <img src={greyBirdIcon} className='w-16 h-16 mt-4' />
          </div>
        )}
      </div>

      <div className='relative flex flex-wrap justify-between w-full mt-10'>
        {orderNest.stages.map((stage, index) => {
          return (
            <div className='z-20 flex flex-col items-center justify-center flex-1 gap-2 -mt-3'>
              <div className='flex items-center justify-center w-full'>
                <div
                  className={cn(
                    'w-full flex-1 h-2 bg-slate-200 dark:bg-slate-500',
                    index <= indexActive && 'bg-primary dark:bg-primary',
                    index === 0 && 'invisible'
                  )}
                />
                <div
                  className={cn(
                    'h-5 aspect-square rounded-full cursor-pointer shrink-0 flex justify-center items-center text-lg font-medium p-5',
                    index <= indexActive
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-slate-200 text-black dark:bg-slate-500 dark:text-white'
                  )}
                  onClick={() => {
                    setSelectedStage(stage), setIndexActive(index)
                  }}
                >
                  {index + 1}
                </div>
                <div
                  className={cn(
                    'w-full flex-1 h-2 bg-slate-200 dark:bg-slate-500',
                    index < indexActive && 'bg-primary dark:bg-primary',
                    index === orderNest.stages.length - 1 && orderNest.status !== 'breeding' && 'invisible'
                  )}
                />
              </div>

              <div>{stage.name}</div>
            </div>
          )
        })}
        {orderNest.status === 'breeding' && (
          <div className='z-20 flex flex-col items-center justify-center flex-1 gap-2 -mt-3'>
            <div className='flex items-center justify-center w-full'>
              <div className='flex-1 w-full h-2 bg-slate-200 dark:bg-slate-500' />
              <div className='flex items-center justify-center h-5 p-5 text-lg font-medium text-black rounded-full cursor-pointer aspect-square shrink-0 bg-slate-200 dark:bg-slate-500 dark:text-white'>
                ?
              </div>
              <div className='flex-1 invisible w-full h-2 bg-primary' />
            </div>
            <div>Sắp diễn ra</div>
          </div>
        )}

        {!orderNest.stages.length && (
          <div className='z-20 flex flex-col items-center justify-center flex-1 gap-2 -mt-3'>
            <div className='flex items-center justify-center w-full'>
              <div className='flex items-center justify-center w-5 h-5 p-5 text-lg font-medium text-black rounded-full cursor-pointer shrink-0 bg-slate-200 dark:bg-slate-500 dark:text-white'>
                ?
              </div>
            </div>
            <div>Sắp diễn ra</div>
          </div>
        )}
      </div>
    </div>
  )
}

export default OrderNestCard
