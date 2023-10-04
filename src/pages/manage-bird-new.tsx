import BirdForm from '@/components/forms/bird-form'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'

function ManageBirdNew() {
  return (
    <div>
      <div className='flex items-center justify-between mb-6'>
        <div className='text-3xl font-bold'>Tạo chim mới</div>
        <Link className={cn(buttonVariants(), 'mb-6 flex items-center gap-1 my-auto')} to='/manager/birds'>
          <span>Quay lại</span>
          <ArrowLeft className='w-5 h-5' />
        </Link>
      </div>
      <BirdForm action='create' btnTitle='Tạo' />
    </div>
  )
}

export default ManageBirdNew
