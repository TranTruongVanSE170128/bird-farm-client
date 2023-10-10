import { useEffect, useState } from 'react'
import Container from '@/components/ui/container'
import { Input } from '@/components/ui/input'
import axios from 'axios'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import cashIcon from '@/assets/cash.png'
import creditIcon from '@/assets/credit.svg'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Button } from '@/components/ui/button'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Cart, Products, Voucher } from '@/lib/types'
import { toast } from '@/components/ui/use-toast'
import { birdFarmApi } from '@/services/bird-farm-api'
import { Shell } from 'lucide-react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useAuthContext } from '@/contexts/auth-provider'
import { loadStripe } from '@stripe/stripe-js'
import { useCartContext } from '@/contexts/cart-provider'
import { calculateDiscount, formatPrice } from '@/lib/utils'
import noImage from '@/assets/no-image.webp'

type Province = {
  code: number
  name: string
}
type District = {
  code: number
  name: string
}
type Ward = {
  code: number
  name: string
}

const formSchema = z.object({
  type: z.enum(['cod', 'online'], {
    required_error: 'Bạn cần lựa chọn phương thức thanh toán'
  }),
  firstName: z
    .string()
    .min(2, {
      message: 'Họ tối thiểu 2 chữ cái'
    })
    .trim(),
  lastName: z.string().min(2, {
    message: 'Tên tối thiểu 2 chữ cái'
  }),
  phoneNumber: z
    .string()
    .min(10, {
      message: 'Số điện thoại có độ dài tối thiểu là 10 chữ số'
    })
    .max(11, {
      message: 'Số điện thoại có độ dài tối đa là 11 chữ số'
    })
    .trim(),
  province: z.string({ required_error: 'Bắt buộc' }).min(1, 'Tỉnh bắt buộc').trim(),
  district: z.string({ required_error: 'Bắt buộc' }).min(1, 'Thành phố bắt buộc').trim(),
  ward: z.string({ required_error: 'Bắt buộc' }).min(1, 'Phường/Xã bắt buộc').trim(),
  address: z.string({ required_error: 'Bắt buộc' }).min(1, 'Số nhà, tên đường bắt buộc').trim(),
  notice: z.string().trim().optional()
})

function CheckoutOrder() {
  const [searchParams] = useSearchParams()
  const voucherId = searchParams.get('voucher')
  const [voucher, setVoucher] = useState<Voucher | null>(null)

  const [provinces, setProvinces] = useState<Province[]>([])
  const [districts, setDistricts] = useState<District[]>([])
  const [wards, setWards] = useState<Ward[]>([])

  const [selectedProvince, setSelectedProvince] = useState<Province | null>(null)
  const [selectedDistrict, setSelectedDistrict] = useState<District | null>(null)

  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate()
  const { user } = useAuthContext()
  const [totalMoney, setTotalMoney] = useState(0)
  const [products, setProducts] = useState<Products>({ birds: [], nests: [] })
  const { cart, clearCart } = useCartContext()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      phoneNumber: '',
      province: '',
      district: '',
      ward: '',
      address: '',
      notice: ''
    }
  })

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
    const fetchProvinces = async () => {
      const response = await axios.get('https://provinces.open-api.vn/api/p/')
      setProvinces(
        response.data.sort((a: Province, b: Province) => {
          return a.name.localeCompare(b.name)
        })
      )
    }

    fetchProvinces()
  }, [])

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

  useEffect(() => {
    const handleProvinceChange = async () => {
      if (selectedProvince === null) return
      setSelectedDistrict(null)

      const response = await axios.get(`https://provinces.open-api.vn/api/p/${selectedProvince.code}?depth=2`)
      setDistricts(
        response.data.districts.sort((a: District, b: District) => {
          return a.name.localeCompare(b.name)
        })
      )
    }

    handleProvinceChange()
  }, [selectedProvince])

  useEffect(() => {
    const handleDistrictChange = async () => {
      if (selectedDistrict === null) return

      const response = await axios.get(`https://provinces.open-api.vn/api/d/${selectedDistrict.code}?depth=2`)
      setWards(
        response.data.wards.sort((a: Ward, b: Ward) => {
          return a.name.localeCompare(b.name)
        })
      )
    }

    handleDistrictChange()
  }, [selectedDistrict])

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    if (!user) {
      toast({
        title: 'Hãy đăng nhập để tiếp tục mua hàng',
        variant: 'destructive'
      })
    }

    const address = [data.province, data.district, data.ward, data.address].filter(Boolean).join(', ')
    const receiver = [data.firstName, data.lastName].filter(Boolean).join(' ')
    const phone = data.phoneNumber
    const notice = data.notice
    const cart: Cart = JSON.parse(localStorage.getItem('cart') || String({ birds: [], nests: [] }))
    const birds = cart.birds
    const nests = cart.nests

    if (data.type === 'cod') {
      setIsSubmitting(true)
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
        setIsSubmitting(false)
      }
    } else {
      try {
        setIsSubmitting(true)
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
        setIsSubmitting(false)
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
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
                  <div className='flex justify-between mt-5 mr-12'>
                    <FormField
                      control={form.control}
                      name='firstName'
                      render={({ field }) => (
                        <FormItem className='mr-3 basis-1/2'>
                          <FormLabel>Họ*</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name='lastName'
                      render={({ field }) => (
                        <FormItem className='basis-1/2'>
                          <FormLabel>Tên*</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div>
                    <FormField
                      control={form.control}
                      name='phoneNumber'
                      render={({ field }) => (
                        <FormItem className='mr-12'>
                          <FormLabel>Số điện thoại*</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className='flex justify-between mt-5 mr-12'>
                    <FormField
                      control={form.control}
                      name='province'
                      render={() => (
                        <FormItem className='mr-3 basis-1/3'>
                          <FormLabel>Tỉnh*</FormLabel>
                          <Select
                            onValueChange={(value: string) => {
                              const province = provinces.find((province) => province.code === Number(value))

                              form.setValue('province', province?.name || '')
                              setSelectedProvince(province || null)
                            }}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder='Chọn tỉnh...' />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className='max-h-[250px]'>
                              <ScrollArea>
                                {provinces?.map((province) => (
                                  <SelectItem key={province.code} value={province.code.toString()}>
                                    {province.name}
                                  </SelectItem>
                                ))}
                              </ScrollArea>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name='district'
                      render={() => (
                        <FormItem className='mr-3 basis-1/3'>
                          <FormLabel>Thành phố*</FormLabel>
                          <Select
                            onValueChange={(value: string) => {
                              const district = districts.find((district) => district.code === Number(value))

                              form.setValue('district', district?.name || '')
                              setSelectedDistrict(district || null)
                            }}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder='Chọn thành phố...' />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className='max-h-[250px]'>
                              <ScrollArea>
                                {districts?.map((district) => (
                                  <SelectItem key={district.code} value={district.code.toString()}>
                                    {district.name}
                                  </SelectItem>
                                ))}
                              </ScrollArea>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name='ward'
                      render={() => (
                        <FormItem className='mr-3 basis-1/3'>
                          <FormLabel>Phường/Xã*</FormLabel>
                          <Select
                            onValueChange={(value: string) => {
                              const ward = wards.find((ward) => ward.code === Number(value))

                              form.setValue('ward', ward?.name || '')
                            }}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder='Chọn phường/xã...' />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className='max-h-[250px]'>
                              <ScrollArea>
                                {wards?.map((ward) => (
                                  <SelectItem key={ward.code} value={ward.code.toString()}>
                                    {ward.name}
                                  </SelectItem>
                                ))}
                              </ScrollArea>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className='mt-5 mr-12'>
                    <FormField
                      control={form.control}
                      name='address'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Số nhà, tên đường*</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className='mt-5 mr-12'>
                    <p className='uppercase font-bold text-[20px]'>Thông tin bổ sung</p>
                    <div className='w-[220px] h-[1px] border'></div>

                    <FormField
                      control={form.control}
                      name='notice'
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Textarea
                              className='mt-3 h-[150px]'
                              placeholder='Ghi chú đơn hàng, ví dụ: Thời gian hay chỉ dẫn địa điểm giao hàng chi tiết hơn'
                              {...field}
                            />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className='mt-5'>
                    <p className='text-2xl font-bold uppercase'>hình thức thanh toán</p>
                    <div className='mt-5 '>
                      <FormField
                        control={form.control}
                        name='type'
                        render={({ field }) => (
                          <FormItem className='space-y-3'>
                            <FormMessage />
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className='flex flex-col space-y-1'
                              >
                                <FormItem className='flex items-center pl-4 space-y-0 border rounded-md '>
                                  <FormControl>
                                    <RadioGroupItem value='cod' />
                                  </FormControl>
                                  <FormLabel className='flex items-center gap-4 py-6 font-normal cursor-pointer'>
                                    <div>
                                      <img src={cashIcon} alt='' className='w-8 h-w-8 ml-9' />
                                    </div>
                                    Thanh toán khi nhận hàng
                                  </FormLabel>
                                </FormItem>
                                <FormItem className='flex items-center pl-4 space-y-0 border rounded-md'>
                                  <FormControl>
                                    <RadioGroupItem value='online' />
                                  </FormControl>

                                  <FormLabel className='flex items-center gap-4 py-6 font-normal cursor-pointer'>
                                    <div>
                                      <img src={creditIcon} alt='' className='w-8 mb-2 h-w-8 ml-9' />
                                    </div>
                                    Thẻ ATM/Thẻ tín dụng (Credit Card)
                                  </FormLabel>
                                </FormItem>
                              </RadioGroup>
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <div className='mt-4'>
                        <Button disabled={isSubmitting} type='submit' className='w-full p-7 text-[20px] font-bold'>
                          Thanh toán{isSubmitting && <Shell className='w-4 h-4 ml-1 animate-spin' />}
                        </Button>
                      </div>
                    </div>
                  </div>
                </form>
              </Form>
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
