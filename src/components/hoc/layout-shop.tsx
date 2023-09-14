import { Outlet } from 'react-router-dom'
import Header from '@/components/header'

function LayoutShop() {
  return (
    <>
      <Header />
      <div className='px-4 sm:px-8 pb-12'>
        <Outlet />
      </div>
    </>
  )
}

export default LayoutShop
