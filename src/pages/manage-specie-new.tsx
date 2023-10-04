// import { imageDB } from '@/firebase'

import SpecieForm from '@/components/forms/specie-form'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'

function ManageSpecieNew() {
  return (
    <main>
      <div className='flex items-center justify-between mb-6'>
        <div className='text-3xl font-bold'>Tạo loài mới</div>
        <Link className={cn(buttonVariants(), 'mb-6 flex items-center gap-1 my-auto')} to='/manager/species'>
          <span>Quay lại</span>
          <ArrowLeft className='w-5 h-5' />
        </Link>
      </div>
      <SpecieForm btnTitle='Tạo' action='create' />
    </main>
  )
}

export default ManageSpecieNew
