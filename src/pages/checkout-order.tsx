import { useEffect, useState } from 'react'
import Container from '@/components/ui/container'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Cart, Products, Voucher } from '@/lib/types'
import { toast } from '@/components/ui/use-toast'
import { birdFarmApi } from '@/services/bird-farm-api'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useAuthContext } from '@/contexts/auth-provider'
import { loadStripe } from '@stripe/stripe-js'
import { useCartContext } from '@/contexts/cart-provider'
import { calculateDiscount, formatPrice } from '@/lib/utils'
import noImage from '@/assets/no-image.webp'
import DeliveryInfoForm from '@/components/forms/delivery-info-form'
import { TDeliveryInfoSchema } from '@/lib/validations/deliveryInfo'

function CheckoutOrder() {
  const [searchParams] = useSearchParams()
  const voucherId = searchParams.get('voucher')
  const [voucher, setVoucher] = useState<Voucher | null>(null)

  const { user } = useAuthContext()
  const [totalMoney, setTotalMoney] = useState(0)
  const [products, setProducts] = useState<Products>({ birds: [], nests: [] })
  const { cart, clearCart } = useCartContext()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchProducts = async () => {
      const birdsData = birdFarmApi.post('/api/birds/get-by-ids', { birds: cart.birds }).then((res) => res.data.birds)
      const nestsData = birdFarmApi.post('/api/nests/get-by-ids', { nests: cart.nests }).then((res) => res.data.nests)

      const [birds, nests] = await Promise.all([birdsData, nestsData])

      setProducts({ birds, nests })
    }

    fetchProducts()
  }, [cart])

  useEffect(() => {
    const fetchVouchers = async () => {
      const { data } = await birdFarmApi.get(`/api/vouchers/${voucherId}`)
      setVoucher(data.voucher || null)
    }
    if (voucherId) {
      fetchVouchers()
    }
  }, [voucherId])

  useEffect(() => {
    let temp = 0

    products.birds.forEach((bird) => {
      temp += bird.sellPrice
    })

    products.nests.forEach((nest) => {
      temp += nest.price
    })

    setTotalMoney(temp)
  }, [products])

  const onSubmit = async (data: TDeliveryInfoSchema) => {
    if (!user) {
      toast({
        title: 'Hãy đăng nhập để tiếp tục thanh toán',
        variant: 'destructive'
      })
      navigate('/auth/sign-in')
      return
    }

    const address = [data.province, data.district, data.ward, data.address].filter(Boolean).join(', ')
    const receiver = [data.firstName, data.lastName].filter(Boolean).join(' ')
    const phone = data.phoneNumber
    const notice = data.notice
    const cart: Cart = JSON.parse(localStorage.getItem('cart') || String({ birds: [], nests: [] }))
    const birds = cart.birds
    const nests = cart.nests

    if (data.type === 'cod') {
      try {
        await birdFarmApi.post('/api/orders', { address, receiver, phone, birds, nests, notice, voucher: voucher?._id })

        clearCart()
        navigate('/orders?tab=processing')
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        const messageError = error.response.data.message
        toast({
          variant: 'destructive',
          title: messageError || 'Không rõ nguyễn nhân'
        })
      }
    } else {
      try {
        const stripe = await loadStripe(import.meta.env.VITE_STRIPE_KEY)

        const { data: session } = await birdFarmApi.post('/api/stripe/create-checkout-session', {
          products: cart,
          receiver,
          phone,
          address,
          notice,
          voucher: voucher?._id
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
          title: messageError || 'Không rõ nguyễn nhân'
        })
      }
    }
  }

  return (
    <main>
      <Container>
        <section className='px-5 my-7'>
          <div className='flex justify-center gap-2 '>
            <span className='text-2xl text-gray-500 uppercase '>Giỏ HÀNG </span>
            <span className='text-2xl '>{'>'}</span>
            <span className='text-2xl uppercase '>Chi tiết thanh toán</span>
          </div>
          <div className='flex flex-col mt-8 md:flex-row md:justify-between'>
            <div className='basis-3/4 md:w-3/5'>
              <p className='text-2xl font-bold uppercase'>thông tin thanh toán</p>
              <DeliveryInfoForm onSubmit={onSubmit} />
            </div>
            <div className='mt-8 basis-1/4 md:w-2/5 md:mt-0'>
              <p className='text-2xl font-bold uppercase'>Đơn hàng</p>
              <div className='p-3 mt-5 border rounded-md'>
                <p className='font-bold text-gray-500 uppercase'>sản phẩm</p>
                <ScrollArea className='h-[300px] w-[350px] rounded-md p-4'>
                  {products.birds?.map((bird) => (
                    <div key={bird._id} className='flex items-center gap-3 p-2 rounded-lg '>
                      <div className='flex flex-wrap gap-2'>
                        <img
                          src={bird?.imageUrls?.[0] || noImage}
                          className='object-cover w-20 border rounded-lg aspect-square'
                        />
                      </div>

                      <div>
                        <p className='text-sm line-clamp-1'>{bird.name}</p>
                        <p className='text-primary'>{formatPrice(bird.sellPrice)}</p>
                      </div>
                    </div>
                  ))}
                  {products.nests?.map((nest) => (
                    <div key={nest._id} className='flex items-center gap-3 p-2 rounded-lg '>
                      <div className='flex flex-wrap gap-2'>
                        <img
                          src={nest?.imageUrls?.[0] || noImage}
                          className='object-cover w-20 border rounded-lg aspect-square'
                        />
                      </div>

                      <div>
                        <p className='text-sm line-clamp-1'>{nest.name}</p>
                        <p className='text-primary'>{formatPrice(nest.price)}</p>
                      </div>
                    </div>
                  ))}
                </ScrollArea>
                <div className='w-full h-[1px] border'></div>
                <div className='flex m-auto mt-5'>
                  <span className='w-1/2 font-bold text-start'>Tạm tính</span>
                  <span className='w-1/2 font-bold text-end'>{formatPrice(totalMoney)}</span>
                </div>
                <div className='flex m-auto mt-5'>
                  <span className='w-1/2 font-bold text-start'>Giảm giá</span>
                  <span className='w-1/2 font-bold text-end'>
                    {voucher ? formatPrice(calculateDiscount(totalMoney, voucher, user?._id)) : formatPrice(0)}
                  </span>
                </div>
                <div className='m-auto mt-4 border'></div>
                <div className='flex m-auto mt-5'>
                  <span className='w-1/2 font-bold text-start'>Tổng</span>
                  <span className='w-1/2 font-bold text-end'>
                    {voucher
                      ? formatPrice(totalMoney - calculateDiscount(totalMoney, voucher, user?._id))
                      : formatPrice(totalMoney)}
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

export default CheckoutOrder
