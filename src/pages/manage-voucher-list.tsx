import Paginate from '@/components/paginate'
import { buttonVariants } from '@/components/ui/button'
import Spinner from '@/components/ui/spinner'
import { useToast } from '@/components/ui/use-toast'
import VoucherTicket from '@/components/voucher-ticket'
import { Voucher } from '@/lib/types'
import { addSearchParams, cn } from '@/lib/utils'
import { birdFarmApi } from '@/services/bird-farm-api'
import { Plus } from 'lucide-react'
import { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'

const pageSize = 12

function ManageVoucherList() {
  const [searchParams] = useSearchParams()
  const pageNumber = Number(searchParams.get('pageNumber') || 1)
  const [vouchers, setVouchers] = useState<Voucher[]>([])
  const [isLoadingVouchers, setIsLoadingVouchers] = useState(true)
  const [totalPages, setTotalPages] = useState<number | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    const fetchVouchers = async () => {
      setIsLoadingVouchers(true)
      try {
        const { data } = await birdFarmApi.get(addSearchParams('/api/vouchers/pagination', { pageNumber, pageSize }))
        setVouchers(data?.vouchers || null)
        setIsLoadingVouchers(false)
        setTotalPages(data?.totalPages || null)
      } catch (error) {
        setIsLoadingVouchers(false)
        toast({
          variant: 'destructive',
          title: 'Có lỗi xảy ra'
        })
      }
    }

    fetchVouchers()
  }, [pageNumber, toast])

  return (
    <div>
      <div className='flex items-center justify-between mb-6'>
        <div className='text-3xl font-bold'>Danh sách voucher</div>
        <Link className={cn(buttonVariants(), 'mb-6 flex items-center gap-1 my-auto')} to='/staff/vouchers/new'>
          <span>Tạo Voucher</span>
          <Plus className='w-5 h-5' />
        </Link>
      </div>

      {isLoadingVouchers && <Spinner className='mt-5' />}

      <div className='flex flex-wrap gap-4'>
        {!isLoadingVouchers && vouchers.map((voucher) => <VoucherTicket key={voucher._id} voucher={voucher} />)}
      </div>

      {!!totalPages && (
        <Paginate
          className='mt-8'
          path={`/staff/vouchers`}
          pageSize={pageSize}
          pageNumber={pageNumber}
          totalPages={totalPages}
        />
      )}
    </div>
  )
}

export default ManageVoucherList
