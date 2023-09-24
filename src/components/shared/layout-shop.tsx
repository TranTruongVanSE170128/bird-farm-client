import { Outlet } from 'react-router-dom'
import Header from '@/components/shared/header'
import Footer from '../footer'
import { ComparatorAndBreeder } from '../ui/comparator-and-breeder'

function LayoutShop() {
  return (
    <div className='relative'>
      <ComparatorAndBreeder />
      <Header />
      <div className='px-4 sm:px-8 pb-12 pt-28'>
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}

export default LayoutShop
