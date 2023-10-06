import Paginate from '@/components/paginate'
import Spinner from '@/components/ui/spinner'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Order, OrderNestStatus, getUser } from '@/lib/types'
import { addSearchParams, formatDate, formatPrice, statusToVariant, statusToVi } from '@/lib/utils'
import { MoreHorizontal } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useToast } from '@/components/ui/use-toast'
import { birdFarmApi } from '@/services/bird-farm-api'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

const pageSize = 12

function ManageOrderList() {
  const [searchParams] = useSearchParams()
  const pageNumber = Number(searchParams.get('pageNumber') || 1)
  const [orders, setOrders] = useState<Order[]>([])
  const [isLoadingOrders, setIsLoadingOrders] = useState(true)
  const [totalPages, setTotalPages] = useState<number | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    const fetchOrders = async () => {
      setIsLoadingOrders(true)
      try {
        const { data } = await birdFarmApi.get(
          addSearchParams('/api/orders/pagination/manage', { pageNumber, pageSize })
        )
        setOrders(data?.orders || null)
        setIsLoadingOrders(false)
        setTotalPages(data?.totalPages || null)
      } catch (error) {
        setIsLoadingOrders(false)
        toast({
          variant: 'destructive',
          title: 'Có lỗi xảy ra'
        })
      }
    }

    fetchOrders()
  }, [pageNumber, toast])

  return (
    <div>
      <div className='flex items-center justify-between mb-6'>
        <div className='text-3xl font-bold'>Danh sách đơn hàng</div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Tên khách hàng</TableHead>
            <TableHead>Tên người nhận</TableHead>
            <TableHead className='text-center'>Số điện thoại</TableHead>
            <TableHead className='text-center'>Tổng tiền</TableHead>
            <TableHead className='text-center'>Ngày đặt</TableHead>
            <TableHead className='text-center'>Trạng thái</TableHead>
            <TableHead className='text-end'></TableHead>
          </TableRow>
        </TableHeader>

        {!isLoadingOrders && (
          <TableBody>
            {orders.map((order) => {
              return (
                <TableRow key={order._id}>
                  <TableCell>{getUser(order).name}</TableCell>
                  <TableCell>{order.receiver}</TableCell>
                  <TableCell className='text-center'>{order.phone}</TableCell>
                  <TableCell className='text-center text-primary font-medium'>
                    {formatPrice(order.totalMoney)}
                  </TableCell>
                  <TableCell className='text-center'>{formatDate(order.createdAt)}</TableCell>
                  <TableCell className='text-center'>
                    <Badge variant={statusToVariant[order.status as OrderNestStatus]}>
                      {statusToVi[order.status as OrderNestStatus]}
                    </Badge>
                  </TableCell>
                  <TableCell className='text-center'>
                    <Button size='icon' asChild variant='ghost'>
                      <Link to={`/staff/orders/${order._id}`}>
                        <MoreHorizontal className='cursor-pointer' />
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        )}
      </Table>
      {isLoadingOrders && <Spinner className='mt-5' />}
      {!!totalPages && (
        <Paginate
          className='mt-8'
          path={`/staff/orders`}
          pageSize={pageSize}
          pageNumber={pageNumber}
          totalPages={totalPages}
        />
      )}
    </div>
  )
}

export default ManageOrderList
