import noImage from '@/assets/no-image.avif'
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
    <div className='flex flex-col gap-6 rounded-3xl border shadow-xl mb-10 p-10 pt-5'>
      <div className='flex justify-end'>
        {orderNest?.cancelMessage ? (
          <p className='mt-2 text-teal-500'>{orderNest?.cancelMessage}</p>
        ) : (
          <p className='mt-2 text-teal-500'>{statusToMessage[orderNest.status]}</p>
        )}

        <div className='w-[1px] h-[20px] bg-border mx-4 mt-2 ' />
        <p className='uppercase text-primary mt-2'>{statusToVi[orderNest.status]}</p>
      </div>
      <div className='min-w-full h-[1px] bg-border mb-4' />
      <div className='grid grid-cols-2 gap-12'>
        <div className='col-span-1 flex flex-col gap-2'>
          <div className='flex gap-4'>
            <div className='font-medium text-lg'>
              Chim non đực: <span className='font-normal'>{orderNest.numberChildPriceMale} con</span>
            </div>
            <div className='font-medium text-lg'>
              Chim non cái: <span className='font-normal'>{orderNest.numberChildPriceFemale} con</span>
            </div>
          </div>

          <div className='flex gap-4'>
            <div className='font-medium text-lg'>
              Giá chim non đực: <span className='font-normal'>{formatPrice(orderNest.childPriceMale)}/con</span>
            </div>
            <div className='font-medium text-lg'>
              Giá chim non cái: <span className='font-normal'>{formatPrice(orderNest.childPriceFemale)}/con</span>
            </div>
          </div>

          <Link to={`/birds/${orderNest.dad._id}`} className='flex group'>
            <img className='w-24 aspect-square object-cover rounded-md' src={orderNest.dad.imageUrls?.[0] || noImage} />
            <div className='flex flex-col justify-around mx-5'>
              <div className='font-bold group-hover:text-primary'>Chim bố: {orderNest.dad.name}</div>
              <div className='flex gap-2'>
                <div>Loài: {getSpecie(orderNest).name}</div>
                <img className='w-6 h-6' src={maleIcon} />
              </div>
              <div className='flex gap items-center'>
                Loại chim: Chim phối giống <img src={breedIcon} className='w-6 h-6' />
              </div>
            </div>
          </Link>

          <Link to={`/birds/${orderNest.mom._id}`} className='flex group'>
            <img className='w-24 aspect-square object-cover rounded-md' src={orderNest.mom.imageUrls?.[0] || noImage} />
            <div className='flex flex-col justify-around mx-5'>
              <div className='font-bold group-hover:text-primary'>Chim mẹ: {orderNest.mom.name}</div>
              <div className='flex gap-2'>
                <div>Loài: {getSpecie(orderNest).name}</div>
                <img className='w-6 h-6' src={femaleIcon} />
              </div>
              <div className='flex gap items-center'>
                Loại chim: Chim phối giống <img src={breedIcon} className='w-6 h-6' />
              </div>
            </div>
          </Link>

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
                  Đã nhận hàng {isReceivingOrder && <Shell className='ml-1 animate-spin w-4 h-4' />}
                </Button>
                <Button variant='outline'>Liên hệ shop</Button>
              </>
            )}

            {orderNest.status === 'success' && !orderNest.rated && (
              <>
                <Button onClick={() => showRatingForm({ orderNestId: orderNest._id })} disabled={isReceivingOrder}>
                  Đánh giá {isReceivingOrder && <Shell className='ml-1 animate-spin w-4 h-4' />}
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
        </div>

        {selectedStage && (
          <div className='col-span-1 flex flex-col items-center'>
            <img
              className='aspect-video rounded-xl object-cover w-full'
              src={selectedStage.imageUrl}
              alt='Selected Image'
            />
            <div className='flex flex-col items-center gap-2 mt-2 text-lg'>{selectedStage.description}</div>
          </div>
        )}

        {!orderNest.stages.length && (
          <div className='col-span-1 flex flex-col justify-center items-center text-lg font-medium'>
            Chưa có giai đoạn phát triển nào <img src={greyBirdIcon} className='w-16 h-16 mt-4' />
          </div>
        )}
      </div>

      <div className='flex flex-wrap justify-between mt-10 relative w-full'>
        {orderNest.stages.map((stage, index) => {
          return (
            <div className='flex-1 flex z-20 flex-col justify-center items-center gap-2 -mt-3'>
              <div className='flex w-full items-center justify-center'>
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
          <div className='flex-1 flex z-20 flex-col justify-center items-center gap-2 -mt-3'>
            <div className='flex w-full items-center justify-center'>
              <div className='w-full flex-1 h-2 bg-slate-200 dark:bg-slate-500' />
              <div className='h-5 aspect-square rounded-full cursor-pointer shrink-0 flex justify-center items-center text-lg font-medium p-5 bg-slate-200 text-black dark:bg-slate-500 dark:text-white'>
                ?
              </div>
              <div className='w-full flex-1 h-2 bg-primary invisible' />
            </div>
            <div>Sắp diễn ra</div>
          </div>
        )}

        {!orderNest.stages.length && (
          <div className='flex-1 flex z-20 flex-col justify-center items-center gap-2 -mt-3'>
            <div className='flex w-full items-center justify-center'>
              <div className='h-5 w-5 rounded-full cursor-pointer shrink-0 flex justify-center items-center text-lg font-medium p-5 bg-slate-200 text-black dark:bg-slate-500 dark:text-white'>
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
