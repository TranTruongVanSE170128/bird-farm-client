// import { imageDB } from '@/firebase'

import VoucherForm from '@/components/forms/voucher-form'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'

function ManageVoucherNew() {
  return (
    <main>
      <div className='flex items-center justify-between mb-6'>
        <div className='text-3xl font-bold'>Tạo voucher mới</div>
        <Link className={cn(buttonVariants(), 'mb-6 flex items-center gap-1 my-auto')} to='/staff/vouchers'>
          <span>Quay lại</span>
          <ArrowLeft className='w-5 h-5' />
        </Link>
      </div>
      <VoucherForm btnTitle='Tạo' action='create' />
    </main>
  )
}

export default ManageVoucherNew
