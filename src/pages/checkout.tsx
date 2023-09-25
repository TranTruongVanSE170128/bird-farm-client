import React, { useEffect, useState } from 'react'
import Container from '@/components/ui/container'
import { Input } from '@/components/ui/input'
import axios from 'axios'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import Cash from '@/assets/cash.png'
import Vnpay from '@/assets/vnpay.png'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Button } from '@/components/ui/button'

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
function Checkout() {
  const [listProvinces, setListPorvinces] = useState<Province[]>([])
  const [listDistrict, setListDistrict] = useState<District[]>([])
  const [selectedProvinceCode, setSelectedProvinceCode] = useState<string | null>(null)

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
      setListPorvinces(data)
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

  const handleProvinceChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const provinceCode = event.target.value
    setSelectedProvinceCode(provinceCode)
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
              <p>(Thông tin có dấu * là bắt buộc)</p>
              <div className='flex justify-between mt-5 mr-12'>
                <Input className='basis-1/2 mr-3' placeholder='Họ*' />
                <Input className='basis-1/2' placeholder='Tên*' />
              </div>
              <div className='mt-5 mr-12'>
                <Input className='' placeholder='Số điện thoại*' />
              </div>
              <div className='mt-5 flex justify-between mr-12'>
                <Select>
                  <SelectTrigger className='bisis-1/3 mr-3'>
                    <SelectValue placeholder='Tỉnh*' />
                  </SelectTrigger>
                  <SelectContent className='max-h-[250px] overflow-y-auto absolute w-[250px]'>
                    {listProvinces.map((province) => (
                      <SelectItem key={province?.slug} value={province.code}>
                        {province?.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger className='bisis-1/3 mr-3'>
                    <SelectValue placeholder='Huyện*' />
                  </SelectTrigger>
                  <SelectContent className='max-h-[250px] overflow-y-auto absolute '>
                    {listDistrict.map((district) => (
                      <SelectItem key={district?.slug} value={district.slug}>
                        {district?.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger className='bisis-1/3'>
                    <SelectValue placeholder='Xã*' />
                  </SelectTrigger>
                  <SelectContent className='max-h-[250px] overflow-y-auto absolute'>
                    {listDistrict.map((district) => (
                      <SelectItem key={district?.slug} value={district.slug}>
                        {district?.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className='mt-5 mr-12'>
                <Input className='' placeholder='Địa chỉ cụ thể...' />
              </div>
              <div className='mt-5 mr-12'>
                <p className='uppercase font-bold text-[20px]'>Thông tin bổ sung</p>
                <div className='w-[220px] h-[1px] border'></div>
                <p className='font-bold text-[15px] mt-5'>Ghi chú đơn hàng (có thể có hoặc không)</p>
                <Textarea
                  className='mt-3 h-[150px]'
                  placeholder='Ghi chú đơn hàng, ví dụ: Thời gian hay chỉ dẫn địa điểm giao hàng chi tiết hơn'
                />
              </div>
              <div className='mt-5'>
                <p className='uppercase font-bold text-3xl'>hình thức thanh toán</p>
                <div className='mt-5 '>
                  <RadioGroup defaultValue='option-one'>
                    <div className='flex items-center space-x-2 border py-10 px-5 mr-12 rounded-md'>
                      <RadioGroupItem value='option-one' id='option-one' />
                      <div>
                        <img src={Cash} alt='' className='w-[30px] h-[30px] ml-9' />
                      </div>
                      <Label htmlFor='option-one' className='text-[17px]'>
                        Thanh toán khi nhận hàng
                      </Label>
                    </div>
                    <div className='flex items-center space-x-2 border py-10 px-5 mr-12 rounded-md'>
                      <RadioGroupItem value='option-two' id='option-two' />
                      <div>
                        <img src={Vnpay} alt='' className='w-[30px] h-[30px] ml-9' />
                      </div>
                      <Label htmlFor='option-two' className='text-[17px]'>
                        Thẻ ATM/Thẻ tín dụng (Credit Card)
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            </div>
            <div className='basis-1/4 md:w-2/5 mt-8 md:mt-0'>
              <p className='text-3xl font-bold uppercase'>Đơn hàng</p>
              <div className='border rounded-md p-3 mt-10'>
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
              <div className='md:flex justify-end mt-8 hidden'>
                <Button className='w-full p-7 text-[20px] font-bold'>Thanh toán </Button>
              </div>
            </div>
          </div>
        </section>
      </Container>
    </main>
  )
}

export default Checkout
