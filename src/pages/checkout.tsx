import React, { useEffect, useState } from 'react'
import Container from '@/components/ui/container'
import { Input } from '@/components/ui/input'
import axios from 'axios'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { toast } from '@/components/ui/use-toast'
import Cash from '@/assets/cash.png'
import Vnpay from '@/assets/vnpay.png'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Button } from '@/components/ui/button'
;('use client')
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
type Province = {
  code: string
  isDeleted: boolean
  name: string
  name_with_type: string
  slug: string
  type: string
  _id: string
}
type District = {
  _id: string
  name: string
  type: string
  slug: string
  name_with_type: string
  path: string
  path_with_type: string
  code: string
  parent_code: string
  isDeleted: false
}
type Ward = {
  _id: string
  name: string
  type: string
  slug: string
  name_with_type: string
  path: string
  path_with_type: string
  code: string
  parent_code: string
  isDeleted: false
}
const FormSchema = z.object({
  type: z.enum(['cod', 'online'], {
    required_error: 'Bạn cần lựa chọn phương thức thanh toán'
  }),
  firstName: z.string().min(2, {
    message: 'Họ tối thiểu 2 chữ cái'
  }),
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
    }),
  province: z.string().nonempty('Bắt buộc'),
  district: z.string().nonempty('Bắt buộc'),
  ward: z.string().nonempty('Bắt buộc'),
  address: z.string().nonempty('Bắt buộc'),
  notice: z.string().optional()
})

function Checkout() {
  const [listProvinces, setListProvinces] = useState<Province[]>([])
  const [listDistrict, setListDistrict] = useState<District[]>([])
  const [listWard, setListWard] = useState<Ward[]>([])
  const [selectedProvinceCode, setSelectedProvinceCode] = useState<string | null>(null)
  const [selectedDistrictCode, setSelectedDistrictCode] = useState<string | null>(null)
  useEffect(() => {
    const getProvince = async () => {
      try {
        const result = await axios.get('https://vn-public-apis.fpo.vn/provinces/getAll?limit=-1')
        return result.data.data.data
      } catch (error) {
        console.error(error)
        return []
      }
    }

    const fetchData = async () => {
      const data = await getProvince()
      console.log('Province', data)
      setListProvinces(data)
    }
    fetchData()
  }, [])

  useEffect(() => {
    const getDistrict = async () => {
      if (selectedProvinceCode) {
        try {
          const result = await axios.get(
            `https://vn-public-apis.fpo.vn/districts/getByProvince?provinceCode=${selectedProvinceCode}&limit=-1`
          )
          return result.data.data.data
        } catch (error) {
          console.error(error)
          return []
        }
      } else {
        return []
      }
    }

    const fetchData = async () => {
      const data = await getDistrict()
      console.log('District', data)
      setListDistrict(data)
    }
    fetchData()
  }, [selectedProvinceCode])
  useEffect(() => {
    const getWard = async () => {
      if (selectedDistrictCode) {
        try {
          const result = await axios.get(
            `https://vn-public-apis.fpo.vn/wards/getByDistrict?districtCode=${selectedDistrictCode}2&limit=-1`
          )
          return result.data.data.data
        } catch (error) {
          console.error(error)
          return []
        }
      } else {
        return []
      }
    }

    const fetchData = async () => {
      const data = await getWard()
      console.log('Ward', data)
      setListWard(data)
    }
    fetchData()
  }, [selectedDistrictCode])

  const handleProvinceChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedProvinceCode(event.target.value)
  }
  const handleDistrictChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDistrictCode(event.target.value)
  }
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
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

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: 'You submitted the following values:',
      description: (
        <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
          <code className='text-white'>{JSON.stringify(data, null, 2)}</code>
        </pre>
      )
    })
  }
  return (
    <main>
      <Container>
        <section className='my-7 px-5'>
          <div className='flex justify-center gap-2 '>
            <span className='uppercase text-2xl  text-gray-500 '>Giỏ HÀNG </span>
            <span className='text-2xl '>{'>'}</span>
            <span className='uppercase text-2xl '>Chi tiết thanh toán</span>
          </div>
          <div className='flex flex-col mt-8 md:flex-row md:justify-between'>
            <div className='basis-3/4 md:w-3/5'>
              <p className='uppercase text-3xl font-bold'>thông tin thanh toán</p>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
                  <div className='flex justify-between mt-5 mr-12'>
                    <FormField
                      control={form.control}
                      name='firstName'
                      render={({ field }) => (
                        <FormItem className='basis-1/2 mr-3'>
                          <FormControl>
                            <Input placeholder='Họ*' {...field} />
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
                          <FormControl>
                            <Input placeholder='Tên*' {...field} />
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
                          <FormControl>
                            <Input placeholder='Số điện thoại*' {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className='mt-5 flex justify-between mr-12'>
                    <FormField
                      control={form.control}
                      name='province'
                      render={({ field }) => (
                        <FormItem className='basis-1/3 mr-3'>
                          <FormControl>
                            <Select value={selectedProvinceCode ?? ''} onValueChange={() => handleProvinceChange}>
                              <SelectTrigger >
                                <SelectValue placeholder='Tỉnh*' />
                              </SelectTrigger>
                              <SelectContent className='max-h-[250px] overflow-y-auto absolute w-[250px]'>
                                {listProvinces.map((province) => (
                                  <SelectItem key={province.code} value={province.code}>
                                    {province?.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name='district'
                      render={({ field }) => (
                        <FormItem className='basis-1/3 mr-3'>
                          <FormControl>
                            <Select value={selectedDistrictCode ?? ''} onValueChange={() => handleDistrictChange}>
                              <SelectTrigger>
                                <SelectValue placeholder='Huyện*' />
                              </SelectTrigger>
                              <SelectContent className='max-h-[250px] overflow-y-auto absolute w-[250px]'>
                                {listDistrict.map((district) => (
                                  <SelectItem key={district.code} value={district.code}>
                                    {district?.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name='ward'
                      render={({ field }) => (
                        <FormItem className='basis-1/3'>
                          <FormControl>
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder='Xã*' />
                              </SelectTrigger>
                              <SelectContent className='max-h-[250px] overflow-y-auto absolute w-[250px]'>
                                {listWard.map((ward) => (
                                  <SelectItem key={ward?.code} value={ward?.code}>
                                    {ward?.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </FormControl>
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
                          <FormControl>
                            <Input placeholder='Địa chỉ cụ thể' {...field} />
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
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className='mt-5'>
                    <p className='uppercase font-bold text-3xl'>hình thức thanh toán</p>
                    <div className='mt-5 '>
                      <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className='w-full space-y-6'>
                          <FormField
                            control={form.control}
                            name='type'
                            render={({ field }) => (
                              <FormItem className='space-y-3'>
                                <FormLabel></FormLabel>
                                <FormControl>
                                  <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    className='flex flex-col space-y-1'
                                  >
                                    <FormItem className='flex items-center space-x-3 space-y-0 border py-10 px-5 rounded-md mr-12 '>
                                      <FormControl>
                                        <RadioGroupItem value='cod' id='cod' />
                                      </FormControl>
                                      <div>
                                        <img src={Cash} alt='' className='w-[30px] h-[30px] ml-9' />
                                      </div>
                                      <FormLabel className='font-normal text-[17px]'>
                                        {' '}
                                        Thanh toán khi nhận hàng
                                      </FormLabel>
                                    </FormItem>
                                    <FormItem className='flex items-center space-x-3 space-y-0 border py-10 px-5 rounded-md mr-12'>
                                      <FormControl>
                                        <RadioGroupItem value='online' id='online' />
                                      </FormControl>
                                      <div>
                                        <img src={Vnpay} alt='' className='w-[30px] h-[30px] ml-9' />
                                      </div>
                                      <FormLabel className='font-normal text-[17px]'>
                                        {' '}
                                        Thẻ ATM/Thẻ tín dụng (Credit Card)
                                      </FormLabel>
                                    </FormItem>
                                  </RadioGroup>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <div className='mr-12'>
                            <Button type='submit' className='w-full p-7 text-[20px] font-bold'>
                              Thanh toán
                            </Button>
                          </div>
                        </form>
                      </Form>
                    </div>
                  </div>
                </form>
              </Form>
            </div>
            <div className='basis-1/4 md:w-2/5 mt-8 md:mt-0'>
              <p className='text-3xl font-bold uppercase'>Đơn hàng</p>
              <div className='border rounded-md p-3 mt-5'>
                <p className='uppercase text-gray-500 font-bold'>sản phẩm</p>
                <ScrollArea className='h-[300px] w-[350px] rounded-md p-4'>
                  {new Array(10).fill(null).map((i, index) => (
                    <div key={index} className='flex p-2 justify-between items-center gap-3  rounded-lg '>
                      <img
                        src='https://upload.wikimedia.org/wikipedia/commons/8/89/Black-naped_Oriole.jpg?fbclid=IwAR2NXjH7Wi1KWHPwvNvmESdLhjUE42zhr9Y-9KZneFisiKtkAimoH1ws8XI'
                        alt=''
                        className='aspect-auto object-cover w-[80px] rounded-lg'
                      />
                      <div>
                        <p className='text-[15px]'>Chim Chào Mào Huế mã SE170112</p>
                        <p className='text-red-600'>5.000.000đ</p>
                      </div>
                    </div>
                  ))}
                </ScrollArea>
                <div className='w-full h-[1px] border'></div>
                <div className='flex m-auto mt-5'>
                  <span className='w-1/2 text-start font-bold'>Tạm tính</span>
                  <span className='w-1/2 text-end font-bold'>50.000.000đ</span>
                </div>
                <div className='flex m-auto mt-5'>
                  <span className='w-1/2 text-start font-bold'>Giảm giá</span>
                  <span className='w-1/2 text-end font-bold'>50%</span>
                </div>
                <div className='border mt-4 m-auto'></div>
                <div className='flex m-auto mt-5'>
                  <span className='w-1/2 text-start font-bold'>Tổng</span>
                  <span className='w-1/2 text-end font-bold'>25.000.000đ</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Container>
    </main>
  )
}

export default Checkout
