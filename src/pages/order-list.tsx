import React, { useState, useRef, useEffect } from 'react'
import Container from '@/components/ui/container'
import { Button } from '@/components/ui/button'
import { Link, useLocation } from 'react-router-dom'

type TabType = {
  tabName: string
  tabUrl: string
}
const tabItems: TabType[] = [
  { tabName: 'Tất cả', tabUrl: 'all' },
  { tabName: 'Đang xử lý', tabUrl: 'processing' },
  { tabName: 'Đang giao', tabUrl: 'delivering' },
  { tabName: 'Hoàn thành', tabUrl: 'success' },
  { tabName: 'Đã hủy', tabUrl: 'cancel' }
]
function OrderList() {
  const location = useLocation()
  const [activeTab, setActiveTab] = useState<TabType | null>(null)
  const [barStyle, setBarStyle] = useState({ left: '0%', width: '0%' })

  const tabRefs = useRef<(HTMLLIElement | null)[]>([])
  const localStorageKey = 'activeTab'

  useEffect(() => {
    const storedTab = localStorage.getItem(localStorageKey)
    if (storedTab) {
      const parsedTab = JSON.parse(storedTab)
      setActiveTab(parsedTab)
    }
  }, [])

  useEffect(() => {
    if (activeTab) {
      localStorage.setItem(localStorageKey, JSON.stringify(activeTab))
    }
  }, [activeTab])

  useEffect(() => {
    const tabParam = new URLSearchParams(location.search).get('tab')
    const matchedTab = tabItems.find((tab) => tab.tabUrl === tabParam)
    if (matchedTab) {
      setActiveTab(matchedTab)
    }
  }, [location.search, tabItems])

  useEffect(() => {
    if (activeTab) {
      const activeTabIndex = tabItems.findIndex((tab) => tab.tabUrl === activeTab.tabUrl)
      const tabWidthPercentage = 100 / tabItems.length
      const barPosition = activeTabIndex * tabWidthPercentage
      setBarStyle({ left: `${barPosition}%`, width: `${tabWidthPercentage}%` })
    }
  }, [activeTab, tabItems])

  const handleTabClick = (tab: TabType, index: number) => {
    setActiveTab(tab)
    localStorage.setItem(localStorageKey, JSON.stringify(tab))
  }

  return (
    <main>
      <Container>
        <div className='w-full h-12  shadow-md relative'>
          <div className='bg-primary h-1 absolute bottom-0 transition-all duration-300' style={barStyle}></div>
          <ul className='flex justify-around h-full items-center'>
            {tabItems.map((tab, index) => (
              <li
                key={tab.tabUrl}
                className={`cursor-pointer hover:text-primary ${
                  activeTab && activeTab.tabUrl === tab.tabUrl ? 'text-primary' : 'text-gray-600'
                }`}
                ref={(el) => (tabRefs.current[index] = el)}
                onClick={() => handleTabClick(tab, index)}
              >
                <Link to={`/orders?tab=${tab.tabUrl}`}>{tab.tabName}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className='mt-8 bg-gray-100 rounded p-4 md:p-8'>
          <div className='flex justify-end'>
            <p className='mt-2 text-teal-500'>Đơn hàng đã được giao thành công</p>
            <div className='w-[1px] h-[20px] bg-black mx-4 mt-2 '></div>
            <p className='uppercase text-red-600 mt-2'>hoàn thành</p>
          </div>
          <div className='min-w-full h-[1px] bg-black mt-2'></div>
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
            <div className='my-7 mx-7 text-center md:text-right md:w-1/2'>
              <p className='font-bold'>Thành tiền</p>
              <div className='flex justify-center md:justify-end'>
                <p className='mx-6 line-through text-slate-500'>500.000.000đ</p>
                <p className='text-red-600'>4.999.000đ</p>
              </div>
            </div>
          </div>
          <div className='min-w-full h-[1px] bg-black'></div>
          <div className='flex flex-col md:flex-row justify-end items-center my-5 mx-5'>
            <Button className='md:mx-0'>Đánh giá</Button>
            <Button className='bg-white border border-primary text-black mt-3 mx-5 md:mt-0'>Liên hệ shop</Button>
          </div>
        </div>
        <div className='mt-8 bg-gray-100 rounded p-4 md:p-8'>
          <div className='flex justify-end'>
            <p className='mt-2 text-teal-500'>Đơn hàng đã được hủy</p>
            <div className='w-[1px] h-[20px] bg-black mx-4 mt-2 '></div>
            <p className='uppercase text-red-600 mt-2'>đã hủy</p>
          </div>
          <div className='min-w-full h-[1px] bg-black mt-2'></div>
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
            <div className='my-7 mx-7 text-center md:text-right md:w-1/2'>
              <p className='font-bold'>Thành tiền</p>
              <div className='flex justify-center md:justify-end'>
                <p className='mx-6 line-through text-slate-500'>500.000.000đ</p>
                <p className='text-red-600'>4.999.000đ</p>
              </div>
            </div>
          </div>
          <div className='min-w-full h-[1px] bg-black'></div>
          <div className='flex flex-col md:flex-row justify-end items-center my-5 mx-5'>
            <Button className='md:mx-0'>Mua lại</Button>
            <Button className='bg-white border border-primary text-black mt-3 mx-5 md:mt-0'>Liên hệ shop</Button>
          </div>
        </div>
        <div className='mt-8 bg-gray-100 rounded p-4 md:p-8'>
          <div className='flex justify-end'>
            <p className='mt-2 text-teal-500'>Đơn hàng đang chờ xử lí để tiến hành giao hàng</p>
            <div className='w-[1px] h-[20px] bg-black mx-4 mt-2 '></div>
            <p className='uppercase text-red-600 mt-2'>đang xử lí</p>
          </div>
          <div className='min-w-full h-[1px] bg-black mt-2'></div>
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
            <div className='my-7 mx-7 text-center md:text-right md:w-1/2'>
              <p className='font-bold'>Thành tiền</p>
              <div className='flex justify-center md:justify-end'>
                <p className='mx-6 line-through text-slate-500'>500.000.000đ</p>
                <p className='text-red-600'>4.999.000đ</p>
              </div>
            </div>
          </div>
          <div className='min-w-full h-[1px] bg-black'></div>
          <div className='flex flex-col md:flex-row justify-end items-center my-5 mx-5'>
            <Button className='md:mx-0'>Hủy đơn hàng</Button>
            <Button className='bg-white border border-primary text-black mt-3 mx-5 md:mt-0'>Liên hệ shop</Button>
          </div>
        </div>
        <div className='mt-8 bg-gray-100 rounded p-4 md:p-8'>
          <div className='flex justify-end'>
            <p className='mt-2 text-teal-500'>Đơn hàng đang được giao đến bạn</p>
            <div className='w-[1px] h-[20px] bg-black mx-4 mt-2 '></div>
            <p className='uppercase text-red-600 mt-2'>đang giao</p>
          </div>
          <div className='min-w-full h-[1px] bg-black mt-2'></div>
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
            <div className='my-7 mx-7 text-center md:text-right md:w-1/2'>
              <p className='font-bold'>Thành tiền</p>
              <div className='flex justify-center md:justify-end'>
                <p className='mx-6 line-through text-slate-500'>500.000.000đ</p>
                <p className='text-red-600'>4.999.000đ</p>
              </div>
            </div>
          </div>
          <div className='min-w-full h-[1px] bg-black'></div>
          <div className='flex flex-col md:flex-row justify-end items-center my-5 mx-5'>
            <Button className='bg-white border border-primary text-black mt-3 mx-5 md:mt-0'>Liên hệ shop</Button>
          </div>
        </div>
      </Container>
    </main>
  )
}

export default OrderList
