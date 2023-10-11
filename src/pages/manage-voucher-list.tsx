import Paginate from '@/components/paginate'
import { buttonVariants } from '@/components/ui/button'
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from '@/components/ui/context-menu'
import Spinner from '@/components/ui/spinner'
import { useToast } from '@/components/ui/use-toast'
import VoucherTicket from '@/components/voucher-ticket'
import { Voucher } from '@/lib/types'
import { addSearchParams, cn } from '@/lib/utils'
import { birdFarmApi } from '@/services/bird-farm-api'
import { Plus } from 'lucide-react'
import { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import voucherEnableIcon from '@/assets/voucher-enable.svg'
import voucherDisableIcon from '@/assets/voucher-disable.svg'
import editIcon from '@/assets/edit.svg'

const pageSize = 12

function ManageVoucherList() {
  const [searchParams] = useSearchParams()
  const pageNumber = Number(searchParams.get('pageNumber') || 1)
  const [vouchers, setVouchers] = useState<Voucher[]>([])
  const [isLoadingVouchers, setIsLoadingVouchers] = useState(true)
  const [totalPages, setTotalPages] = useState<number | null>(null)
  const { toast } = useToast()
  const [changedVoucher, setChangedVoucher] = useState<Voucher | null>(null)

  useEffect(() => {
    const fetchVouchers = async () => {
      setIsLoadingVouchers(true)
      try {
        const { data } = await birdFarmApi.get(addSearchParams('/api/vouchers/pagination', { pageNumber, pageSize }))
        setVouchers(data?.vouchers || null)
        setIsLoadingVouchers(false)
        setTotalPages(data?.totalPages || null)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        setIsLoadingVouchers(false)
        const messageError = error.response.data.message
        toast({
          variant: 'destructive',
          title: 'Lỗi',
          content: messageError || 'Không rõ nguyễn nhân'
        })
      }
    }

    fetchVouchers()
  }, [pageNumber, toast])

  const disableVoucher = async (voucher: Voucher) => {
    setChangedVoucher(voucher)
    try {
      await birdFarmApi.put(`/api/vouchers/${voucher._id}/disable`)
      setChangedVoucher(null)
      setVouchers((prev) =>
        prev.map((item) => {
          if (item._id === voucher._id) {
            item.enable = false
          }
          return item
        })
      )
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const messageError = error.response.data.message
      toast({
        variant: 'destructive',
        content: messageError || 'Không rõ nguyễn nhân',
        title: 'Không thể vô hiệu hóa voucher'
      })
      setChangedVoucher(null)
    }
  }

  const enableVoucher = async (voucher: Voucher) => {
    setChangedVoucher(voucher)
    try {
      await birdFarmApi.put(`/api/vouchers/${voucher._id}/enable`)
      setChangedVoucher(null)
      setVouchers((prev) =>
        prev.map((item) => {
          if (item._id === voucher._id) {
            item.enable = true
          }
          return item
        })
      )
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const messageError = error.response.data.message
      toast({
        variant: 'destructive',
        content: messageError || 'Không rõ nguyễn nhân',
        title: 'Không thể kích hoạt voucher'
      })
      setChangedVoucher(null)
    }
  }

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

      {/* <VoucherForm action='create' btnTitle='Tạo' /> */}

      <div className='flex flex-wrap gap-4'>
        {!isLoadingVouchers &&
          vouchers.map((voucher) => {
            return (
              <ContextMenu>
                <ContextMenuTrigger>
                  <VoucherTicket
                    contextContent={voucher.enable ? 'Đang kích hoạt' : 'Đang vô hiệu hóa'}
                    isChanging={changedVoucher?._id === voucher._id}
                    key={voucher._id}
                    voucher={voucher}
                  />
                </ContextMenuTrigger>
                <ContextMenuContent>
                  <ContextMenuItem asChild>
                    <Link
                      className='cursor-pointer flex justify-between items-center gap-2'
                      to={`/staff/vouchers/${voucher._id}/edit`}
                    >
                      Chỉnh sửa
                      <img src={editIcon} className='w-5 h-5' />
                    </Link>
                  </ContextMenuItem>
                  {voucher.enable ? (
                    <ContextMenuItem
                      onClick={() => {
                        disableVoucher(voucher)
                      }}
                      className='cursor-pointer flex justify-between items-center gap-2'
                    >
                      Vô hiệu hóa
                      <img src={voucherDisableIcon} className='w-5 h-5' />
                    </ContextMenuItem>
                  ) : (
                    <ContextMenuItem
                      onClick={() => {
                        enableVoucher(voucher)
                      }}
                      className='cursor-pointer flex justify-between items-center gap-2'
                    >
                      Kích hoạt
                      <img src={voucherEnableIcon} className='w-5 h-5' />
                    </ContextMenuItem>
                  )}
                </ContextMenuContent>
              </ContextMenu>
            )
          })}
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
