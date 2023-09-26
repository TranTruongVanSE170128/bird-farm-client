import { Badge } from '@/components/ui/badge'
import { buttonVariants } from '@/components/ui/button'
import Spinner from '@/components/ui/spinner'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Order, getBirds, getNests, getUser } from '@/lib/types'
import { cn, formatDate, formatPrice, statusToVariant, statusToVi } from '@/lib/utils'
import { birdFarmApi } from '@/services/bird-farm-api'
import { ArrowLeft } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import noImage from '@/assets/no-image.avif'

function ManageOrderDetail() {
  const { id } = useParams()
  const [order, setOrder] = useState<Order | null>(null)
  // const [edit, setEdit] = useState(false)

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
          {/* {!edit && (
            <Button
              onClick={() => {
                setEdit(true)
              }}
              className='mb-6 flex items-center gap-1 my-auto'
            >
              <span>Chỉnh sửa</span>
              <Edit className='w-5 h-5' />
            </Button>
          )} */}
          <Link className={cn(buttonVariants(), 'mb-6 flex items-center gap-1 my-auto')} to='/admin/orders'>
            <span>Quay lại</span>
            <ArrowLeft className='w-5 h-5' />
          </Link>
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
              <div className='col-span-1'>{formatPrice(order.totalMoney)}</div>
            </div>
            <div className='grid grid-cols-2 gap-2'>
              <div className='col-span-1'>Phí vận chuyển:</div>
              <div className='col-span-1'>0đ</div>
            </div>
            <div className='grid grid-cols-2 gap-2 font-semibold text-primary'>
              <div className='col-span-1'>Tổng:</div>
              <div className='col-span-1'>{formatPrice(order.totalMoney)}</div>
            </div>
          </div>
        </div>
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
              <TableRow>
                <TableCell>
                  {!bird.imageUrls?.length ? (
                    <img className='aspect-square w-16 object-cover' src={noImage} alt='' />
                  ) : (
                    <img className='aspect-square w-16 object-cover' src={bird.imageUrls?.[0]} alt='' />
                  )}
                </TableCell>
                <TableCell className=''>{bird.name}</TableCell>
                <TableCell className='text-center'>{formatPrice(bird.sellPrice)}</TableCell>
                <TableCell className='text-right'>Chim kiểng</TableCell>
              </TableRow>
            )
          })}
          {getNests(order).map((nest) => {
            return (
              <TableRow>
                <TableCell>
                  {!nest.imageUrls?.length ? (
                    <img className='aspect-square w-16 object-cover' src={noImage} alt='' />
                  ) : (
                    <img className='aspect-square w-16 object-cover' src={nest.imageUrls?.[0]} alt='' />
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
