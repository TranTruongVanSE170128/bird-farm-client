import React, { useState, useRef, useEffect } from 'react'
import Container from '@/components/ui/container'
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
        <div className='w-full h-12 bg-white shadow-md relative'>
          <div className='bg-purple-500 h-1 absolute bottom-0 transition-all duration-300' style={barStyle}></div>
          <ul className='flex justify-around h-full items-center'>
            {tabItems.map((tab, index) => (
              <li
                key={tab.tabUrl}
                className={`cursor-pointer hover:text-purple-500 ${
                  activeTab && activeTab.tabUrl === tab.tabUrl ? 'text-purple-500' : 'text-gray-600'
                }`}
                ref={(el) => (tabRefs.current[index] = el)}
                onClick={() => handleTabClick(tab, index)}
              >
                <Link to={`/orders?tab=${tab.tabUrl}`}>{tab.tabName}</Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </main>
  )
}

export default OrderList
