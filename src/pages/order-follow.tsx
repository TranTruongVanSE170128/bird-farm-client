import React, { useState, useRef, useEffect } from 'react'

function FollowOrders() {
  const [activeTab, setActiveTab] = useState('Tất cả')
  const tabItems = ['Tất cả', 'Đang xử lí', 'Đang giao', 'Hoàn thành', 'Đã hủy']
  const [barStyle, setBarStyle] = useState({ left: '0%', width: `${100 / tabItems.length}%` })

  const tabRefs = useRef<(HTMLLIElement | null)[]>([])

  useEffect(() => {
    const tabWidthPercentage = 100 / tabItems.length

    const handleTabClick = (tab: string, index: number) => {
      setActiveTab(tab)
      const barPosition = index * tabWidthPercentage
      setBarStyle({ left: `${barPosition}%`, width: `${tabWidthPercentage}%` })
    }

    const handleTabMouseLeave = () => {
      const activeTabIndex = tabItems.indexOf(activeTab)
      const barPosition = activeTabIndex * tabWidthPercentage
      setBarStyle({ left: `${barPosition}%`, width: `${tabWidthPercentage}%` })
    }

    tabRefs.current.forEach((tabRef, index) => {
      if (tabRef) {
        tabRef.addEventListener('click', () => handleTabClick(tabItems[index], index))

        tabRef.addEventListener('mouseleave', handleTabMouseLeave)
      }
    })
  }, [activeTab, tabItems])

  useEffect(() => {
    setActiveTab('Tất cả')
  }, [])

  return (
    <div className='w-full h-12 bg-white shadow-md relative'>
      <div className='bg-purple-500 h-1 absolute bottom-0 transition-all duration-300' style={barStyle}></div>
      <ul className='flex justify-around h-full items-center'>
        {tabItems.map((tab, index) => (
          <li
            key={tab}
            className={`cursor-pointer hover:text-purple-500 ${
              activeTab === tab ? 'text-purple-500' : 'text-gray-600'
            }`}
            ref={(el) => (tabRefs.current[index] = el)}
          >
            {tab}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default FollowOrders
