import { useState, useEffect } from 'react'
import Container from '@/components/ui/container'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { cn } from '@/lib/utils'

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
      </Container>
    </main>
  )
}

export default OrderList
