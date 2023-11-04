import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import Spinner from '@/components/ui/spinner'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Order, getBirds, getNests, getUser } from '@/lib/types'
import { formatDate, formatPrice, statusToVariant, statusToVi } from '@/lib/utils'
import { birdFarmApi } from '@/services/bird-farm-api'
import { ArrowLeft, Shell } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import noImage from '@/assets/no-image.webp'
import cancel from '@/assets/cancel.svg'
import approve from '@/assets/approve.svg'
import { useToast } from '@/components/ui/use-toast'

function ManageOrderDetail() {
  const { id } = useParams()
  const [order, setOrder] = useState<Order | null>(null)
  const [approvingOrder, setApprovingOrder] = useState(false)
  const [cancelingOrder, setCancelingOrder] = useState(false)
  const { toast } = useToast()

  const approveOrder = async () => {
    try {
      setApprovingOrder(true)
      await birdFarmApi.put(`/api/orders/${id}/approve`)
      window.location.reload()
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const msg = error?.response?.data?.message
      toast({
        title: 'Chấp nhận đơn hàng thất bại',
        description: msg || 'Không rõ lý do',
        variant: 'destructive'
      })
      setApprovingOrder(false)
    }
  }

  const cancelOrder = async () => {
    try {
      setCancelingOrder(true)
      await birdFarmApi.put(`/api/orders/${id}/cancel`)
      window.location.reload()
      toast({
        title: 'Xóa đơn hàng thành công',
        variant: 'success'
      })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const msg = error?.response?.data?.message
      toast({
        title: 'Xóa đơn hàng thất bại',
        description: msg || 'Không rõ lý do',
        variant: 'destructive'
      })
      setCancelingOrder(false)
    }
  }

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const { data } = await birdFarmApi.get(`/api/orders/${id}`)
        setOrder(data?.order || null)
      } catch (error) {
        console.log(error)
      }
    }

    fetchOrder()
  }, [id])

  if (!order) {
    return <Spinner />
  }

  return (
    <div>
      <div className='flex items-center justify-between mb-6'>
        <div className='flex gap-2'>
          <div className='text-3xl font-bold'>Chi tiết đơn hàng</div>
        </div>

        <div className='flex gap-2'>
          <Button disabled={approvingOrder} asChild>
            <Link className='flex items-center gap-1 my-auto mb-6' to='/staff/orders'>
              <span>Quay lại</span>
              <ArrowLeft className='w-5 h-5' />
            </Link>
          </Button>
        </div>
      </div>

      <div className='grid grid-cols-12 gap-4'>
        <div className='grid grid-flow-col grid-cols-2 col-span-9 grid-rows-3 gap-4 p-6 rounded-md bg-accent'>
          <div className='flex flex-col row-span-1'>
            <div className='mb-2 font-semibold text-primary'>Tên khách hàng</div>
            <div>{getUser(order).name}</div>
          </div>
          <div className='flex flex-col row-span-1'>
            <div className='mb-2 font-semibold text-primary'>Tên người nhận</div>
            <div>{order.receiver}</div>
          </div>
          <div className='flex flex-col row-span-1'>
            <div className='mb-2 font-semibold text-primary'>Số điện thoại</div>
            <div>{order.phone}</div>
          </div>
          <div className='flex flex-col row-span-1'>
            <div className='mb-2 font-semibold text-primary'>Ngày đặt hàng</div>
            <div>{formatDate(order.createdAt)}</div>
          </div>
          <div className='flex flex-col row-span-1'>
            <div className='mb-2 font-semibold text-primary'>Địa chỉ giao hàng</div>
            <div>{order.address}</div>
          </div>

          <div className='flex flex-col row-span-1'>
            <div className='mb-2 font-semibold text-primary'>Trạng thái</div>
            <Badge className='w-fit' variant={statusToVariant[order.status]}>
              {statusToVi[order.status]}
            </Badge>
          </div>
        </div>

        <div className='flex flex-col col-span-3 p-6 rounded-md bg-accent'>
          <div className='flex items-center justify-between'>
            <div className='text-xl font-semibold'>Price</div>
          </div>

          <div className='flex flex-col gap-3 mt-4'>
            <div className='grid grid-cols-2 gap-2'>
              <div className='col-span-1'>Tổng tiền:</div>
              <div className='col-span-1 text-right'>{formatPrice(order.totalMoney)}</div>
            </div>
            <div className='grid grid-cols-2 gap-2'>
              <div className='col-span-1'>Giảm giá:</div>
              <div className='col-span-1 text-right'>-{formatPrice(order.discount || 0)}</div>
            </div>
            <div className='grid grid-cols-2 gap-2 font-semibold text-primary'>
              <div className='col-span-1'>Tổng:</div>
              <div className='col-span-1 text-right'>{formatPrice(order.totalMoney - (order.discount || 0))}</div>
            </div>
          </div>
        </div>
      </div>

      <div className='flex gap-4 mt-4 flex-row-reverse'>
        {!['success', 'canceled'].includes(order.status) && (
          <Button
            variant='outline'
            disabled={approvingOrder || cancelingOrder}
            onClick={cancelOrder}
            className='flex items-center gap-1 my-auto mb-6'
          >
            <span>Hủy đơn hàng</span>
            <img src={cancel} className='w-5 h-5 dark:filter dark:invert' />
          </Button>
        )}

        {order.status === 'processing' && (
          <Button
            disabled={approvingOrder || cancelingOrder}
            onClick={approveOrder}
            className='flex items-center gap-1 my-auto mb-6'
          >
            <span>Chấp nhận đơn hàng</span>
            <img src={approve} className='w-5 h-5 filter invert' />
            {approvingOrder && <Shell className='w-4 h-4 ml-1 animate-spin' />}
          </Button>
        )}
      </div>

      <div className='flex items-center justify-between mt-6 mb-2 text-2xl font-medium'>Danh sách sản phẩm</div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Ảnh</TableHead>
            <TableHead className=''>Tên</TableHead>
            <TableHead className='text-center'>Giá</TableHead>
            <TableHead className='text-right'>Loại hàng</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {getBirds(order).map((bird) => {
            return (
              <TableRow key={bird._id}>
                <TableCell>
                  <img
                    className='object-cover w-16 border rounded-md aspect-square'
                    src={bird.imageUrls?.[0] || noImage}
                    alt=''
                  />
                </TableCell>
                <TableCell className=''>{bird.name}</TableCell>
                <TableCell className='text-center'>{formatPrice(bird.sellPrice)}</TableCell>
                <TableCell className='text-right'>Chim kiểng</TableCell>
              </TableRow>
            )
          })}
          {getNests(order).map((nest) => {
            return (
              <TableRow key={nest._id}>
                <TableCell>
                  {!nest.imageUrls?.length ? (
                    <img className='object-cover w-16 aspect-square' src={noImage} alt='' />
                  ) : (
                    <img className='object-cover w-16 aspect-square' src={nest.imageUrls?.[0]} alt='' />
                  )}
                </TableCell>
                <TableCell className=''>{nest.name}</TableCell>
                <TableCell className='text-center'>{formatPrice(nest.price)}</TableCell>
                <TableCell className='text-right'>Tổ chim non</TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}

export default ManageOrderDetail
