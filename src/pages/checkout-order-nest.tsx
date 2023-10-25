import { useEffect, useState } from 'react'
import Container from '@/components/ui/container'
import { toast } from '@/components/ui/use-toast'
import { birdFarmApi } from '@/services/bird-farm-api'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useAuthContext } from '@/contexts/auth-provider'
import { formatPrice } from '@/lib/utils'
import { loadStripe } from '@stripe/stripe-js'
import { TDeliveryInfoSchema } from '@/lib/validations/deliveryInfo'
import DeliveryInfoForm from '@/components/forms/delivery-info-form'
import { Address, OrderNest } from '@/lib/types'

function CheckoutOrderNest() {
  const [searchParams] = useSearchParams()
  const orderNestId = searchParams.get('orderNest')
  const [orderNest, setOrderNest] = useState<OrderNest | null>(null)

  const navigate = useNavigate()
  const { user } = useAuthContext()

  useEffect(() => {
    const fetchOrderNests = async () => {
      const { data } = await birdFarmApi.get(`/api/order-nests/${orderNestId}`)
      setOrderNest(data.orderNest || null)
    }

    fetchOrderNests()
  }, [orderNestId])

  const onSubmit = async (data: TDeliveryInfoSchema, deliveryInfo: Address | undefined) => {
    if (!user) {
      toast({
        title: 'Hãy đăng nhập để tiếp tục thanh toán',
        variant: 'destructive'
      })
      navigate('/auth/sign-in')
      return
    }

    const address = deliveryInfo
      ? deliveryInfo.address
      : [data.province, data.district, data.ward, data.address].filter(Boolean).join(', ')
    const receiver = deliveryInfo ? deliveryInfo.receiver : data.receiver
    const phone = deliveryInfo ? deliveryInfo.phone : data.phoneNumber
    const notice = data.notice

    if (data.type === 'cod') {
      try {
        await birdFarmApi.post(`/api/order-nests/${orderNest?._id}/payment-rest`, { address, receiver, phone, notice })

        navigate('/your-nest')
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        const messageError = error.response.data.message
        toast({
          variant: 'destructive',
          description: messageError || 'Không rõ nguyễn nhân',
          title: 'Không thể thanh toán'
        })
      }
    } else {
      try {
        const stripe = await loadStripe(import.meta.env.VITE_STRIPE_KEY)
        const { data: session } = await birdFarmApi.post('/api/stripe/create-payment-rest-session', {
          orderNestId: orderNest?._id,
          receiver,
          phone,
          address,
          notice
        })
        const result = await stripe?.redirectToCheckout({
          sessionId: session.id
        })
        if (result?.error) {
          console.log(result.error)
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        const messageError = error.response.data.message
        toast({
          variant: 'destructive',
          description: messageError || 'Không rõ nguyễn nhân',
          title: 'Không thể thanh toán'
        })
      }
    }
  }

  return (
    <main>
      <Container>
        <section className='px-5 my-7'>
          <div className='flex flex-col mt-8 md:flex-row md:justify-between'>
            <div className='basis-3/4 md:w-3/5'>
              <p className='text-2xl font-bold uppercase'>thông tin thanh toán</p>
              <DeliveryInfoForm className='pr-12' onSubmit={onSubmit} />
            </div>
            <div className='mt-8 basis-1/4 md:w-2/5 md:mt-0'>
              <p className='text-2xl font-bold uppercase'>Đơn hàng</p>
              <div className='p-3 mt-5 border rounded-md'>
                <div className='font-bold pb-2'>
                  Nội dung: <span className='font-medium'>Thanh toán phần còn lại của đơn đặt tổ chim non</span>
                </div>
                <div className='w-full h-[1px] border'></div>
                <div className='flex m-auto mt-5'>
                  <span className='w-1/2 font-bold text-start'>Tạm tính</span>
                  <span className='w-1/2 font-bold text-end'>{formatPrice(orderNest?.totalMoney || 0)}</span>
                </div>

                <div className='flex m-auto mt-5'>
                  <span className='w-1/2 font-bold text-start'>Đã đặt cọc</span>
                  <span className='w-1/2 font-bold text-end text-primary'>
                    -{formatPrice(orderNest?.childPriceMale || 0)}
                  </span>
                </div>

                <div className='m-auto mt-4 border'></div>
                <div className='flex m-auto mt-5'>
                  <span className='w-1/2 font-bold text-start'>Tổng</span>
                  <span className='w-1/2 font-bold text-end'>
                    {formatPrice((orderNest?.totalMoney || 0) - (orderNest?.childPriceMale || 0))}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Container>
    </main>
  )
}

export default CheckoutOrderNest
