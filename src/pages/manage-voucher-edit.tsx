// import { imageDB } from '@/firebase'

import VoucherForm from '@/components/forms/voucher-form'
import { buttonVariants } from '@/components/ui/button'
import Spinner from '@/components/ui/spinner'
import { Voucher } from '@/lib/types'
import { cn } from '@/lib/utils'
import { birdFarmApi } from '@/services/bird-farm-api'
import { ArrowLeft } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

function ManageVoucherEdit() {
  const { id } = useParams()
  const [voucher, setVoucher] = useState<Voucher | null>(null)
  const [isLoadingVouchers, setIsLoadingVouchers] = useState(true)

  useEffect(() => {
    const fetchVouchers = async () => {
      const { data } = await birdFarmApi.get(`/api/vouchers/${id}`)

      setVoucher(data.voucher || null)
      setIsLoadingVouchers(false)
    }

    fetchVouchers()
  }, [id])

  useEffect

  return (
    <main>
      <div className='flex items-center justify-between mb-6'>
        <div className='text-3xl font-bold'>Chỉnh sửa voucher</div>
        <Link className={cn(buttonVariants(), 'mb-6 flex items-center gap-1 my-auto')} to='/staff/vouchers'>
          <span>Quay lại</span>
          <ArrowLeft className='w-5 h-5' />
        </Link>
      </div>

      {isLoadingVouchers ? (
        <Spinner className='mt-8' />
      ) : (
        <VoucherForm voucher={voucher || undefined} btnTitle='Lưu' action='update' />
      )}
    </main>
  )
}

export default ManageVoucherEdit
