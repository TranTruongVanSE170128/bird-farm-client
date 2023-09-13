import { Outlet } from 'react-router-dom'
import Header from '@/components/header'

function LayoutShop() {
  return (
    <div className='px-4 sm:px-8'>
      <Header />
      <Outlet />
    </div>
  )
}

export default LayoutShop
