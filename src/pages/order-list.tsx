import { useState, useEffect } from 'react'
import Container from '@/components/ui/container'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

const tabItems = [
  { label: 'Tất cả', value: 'all' },
  { label: 'Đang xử lý', value: 'processing' },
  { label: 'Đang giao', value: 'delivering' },
  { label: 'Hoàn thành', value: 'success' },
  { label: 'Đã hủy', value: 'cancel' }
] as const

const tabWidthPercentage = 20

function OrderList() {
  const [searchParams] = useSearchParams()
  const activeTab = searchParams.get('tab') || 'all'
  const navigate = useNavigate()
  const [barStyle, setBarStyle] = useState({ left: '0%', width: '0%' })

  useEffect(() => {
    const activeTabIndex = tabItems.findIndex((tab) => tab.value === activeTab)
    const barPosition = activeTabIndex * tabWidthPercentage
    setBarStyle({ left: `${barPosition}%`, width: `${tabWidthPercentage}%` })
  }, [activeTab])

  return (
    <main>
      <Container>
        <div className='w-full h-12 shadow-l border-border border relative mt-6'>
          <div className='bg-primary h-1 absolute bottom-0 transition-all duration-300' style={barStyle} />
          <ul className='flex justify-around h-full items-center'>
            {tabItems.map((tab) => (
              <li
                key={tab.value}
                className={cn(
                  'cursor-pointer hover:text-primary w-full h-full flex justify-center items-center',
                  activeTab === tab.value ? 'text-primary' : 'text-gray-600'
                )}
                onClick={() => navigate(`/orders?tab=${tab.value}`)}
              >
                <Link to={`/orders?tab=${tab.value}`}>{tab.label}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className='mt-8 rounded p-4 md:p-8 border border-border'>
          <div className='flex justify-end'>
            <p className='mt-2 text-teal-500'>Đơn hàng đã được giao thành công</p>
            <div className='w-[1px] h-[20px] bg-border mx-4 mt-2 ' />
            <p className='uppercase text-red-600 mt-2'>hoàn thành</p>
          </div>
          <div className='min-w-full h-[1px] bg-border mt-2' />
          <div className='flex flex-col md:flex-row justify-between'>
            <div className='flex items-center my-5 md:w-1/2'>
              <div className='w-[70px] h-[70px] mx-5'>
                <img
                  className='w-full h-full'
                  src='https://thuvienthucung.com/wp-content/uploads/2021/09/Cam-Nang-Nuoi-Cham-Soc-Chim-Chao-Mao.jpg'
                  alt=''
                />
              </div>
              <div>
                <p className='font-semibold text-center md:text-left'>Chim chào mào huế, mã SE170112</p>
                <p className='text-[13px] text-center md:text-left'>Giống: Chim chào mào | Đực</p>
                <p className='text-[13px] text-center md:text-left'>Phân loại: Chim trưởng thành</p>
              </div>
            </div>
            <div className='my-7 text-center md:text-right md:w-1/2'>
              <p className='font-bold'>Thành tiền</p>
              <div className='flex justify-center md:justify-end'>
                <p className='mx-6 line-through text-slate-500'>500.000.000đ</p>
                <p className='text-red-600'>4.999.000đ</p>
              </div>
            </div>
          </div>
          <div className='min-w-full h-[1px] bg-border' />
          <div className='flex flex-col md:flex-row justify-end items-center mt-5'>
            <Button className='md:mx-0'>Đánh giá</Button>
            <Button variant='outline' className='mt-3 md:mt-0 md:ml-5'>
              Liên hệ shop
            </Button>
          </div>
        </div>
      </Container>
    </main>
  )
}

export default OrderList
