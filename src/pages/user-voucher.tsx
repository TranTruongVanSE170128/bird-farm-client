import { useEffect, useState } from 'react'
import { Voucher } from '@/lib/types'
import { birdFarmApi } from '@/services/bird-farm-api'
import VoucherTicket from '@/components/voucher-ticket'

function UserVouchers() {
  const [vouchers, setVouchers] = useState<Voucher[]>([])

  useEffect(() => {
    const fetchVouchers = async () => {
      const { data } = await birdFarmApi.get('/api/vouchers')

      setVouchers(data.vouchers || [])
    }

    fetchVouchers()
  }, [])

  return (
    <>
      <h1 className='mb-8 text-2xl font-semibold'>Kho vouchers</h1>
      <div className='grid grid-cols-2'>
        {vouchers.map((voucher) => (
          <VoucherTicket className='col-span-1 mb-4' key={voucher._id} voucher={voucher} />
        ))}
      </div>
    </>
  )
}

export default UserVouchers
