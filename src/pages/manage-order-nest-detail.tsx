import { Button } from '@/components/ui/button'
import Spinner from '@/components/ui/spinner'
import { OrderNest } from '@/lib/types'
import { birdFarmApi } from '@/services/bird-farm-api'
import { ArrowLeft, Shell } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import cancel from '@/assets/cancel.svg'
import approve from '@/assets/approve.svg'
import { useToast } from '@/components/ui/use-toast'

function ManageOrderNestDetail() {
  const { id } = useParams()
  const [orderNest, setOrderNest] = useState<OrderNest | null>(null)
  const [approvingOrderNest, setApprovingOrderNest] = useState(false)
  const { toast } = useToast()
  // const [edit, setEdit] = useState(false)

  const approveOrderNest = async () => {
    try {
      setApprovingOrderNest(true)
      await birdFarmApi.put(`/api/order-nests/${id}/approve`)
      window.location.reload()
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const msg = error?.response?.data?.message
      toast({
        title: 'Chấp nhận đơn hàng thất bại',
        description: msg || 'Không rõ lý do',
        variant: 'destructive'
      })
      setApprovingOrderNest(false)
    }
  }

  useEffect(() => {
    const fetchOrderNest = async () => {
      try {
        const { data } = await birdFarmApi.get(`/api/order-nests/${id}`)
        setOrderNest(data?.orderNest || null)
      } catch (error) {
        console.log(error)
      }
    }

    fetchOrderNest()
  }, [id])

  if (!orderNest) {
    return <Spinner />
  }

  return (
    <div>
      <div className='flex items-center justify-between mb-6'>
        <div className='flex gap-2'>
          <div className='text-3xl font-bold'>Chi tiết đơn hàng</div>
        </div>

        <div className='flex gap-2'>
          <Button disabled={approvingOrderNest} asChild>
            <Link className='mb-6 flex items-center gap-1 my-auto' to='/admin/orderNests'>
              <span>Quay lại</span>
              <ArrowLeft className='w-5 h-5' />
            </Link>
          </Button>
        </div>
      </div>

      <div className='flex justify-end gap-4 mt-4'>
        <Button disabled={approvingOrderNest} onClick={() => {}} className='mb-6 flex items-center gap-1 my-auto'>
          <span>Hủy đơn hàng</span>
          <img src={cancel} className='w-5 h-5 filter invert' />
        </Button>
        {orderNest.status === 'processing' && (
          <Button
            disabled={approvingOrderNest}
            onClick={approveOrderNest}
            className='mb-6 flex items-center gap-1 my-auto'
          >
            <span>Chấp nhận đơn hàng</span>
            <img src={approve} className='w-5 h-5 filter invert' />
            {approvingOrderNest && <Shell className='animate-spin w-4 h-4 ml-1' />}
          </Button>
        )}
      </div>

      <div className='flex items-center justify-between mt-6 mb-2 text-2xl font-medium'>Danh sách sản phẩm</div>
    </div>
  )
}

export default ManageOrderNestDetail
