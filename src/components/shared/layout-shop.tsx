import { Outlet } from 'react-router-dom'
import Header from '@/components/shared/header'

function LayoutShop() {
  return (
    <div className='relative'>
      <Header />
      <div className='px-4 sm:px-8 pb-12 pt-24'>
        <Outlet />
      </div>
    </div>
  )
}

export default LayoutShop
