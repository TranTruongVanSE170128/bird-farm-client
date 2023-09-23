import Paginate from '@/components/paginate'
import Spinner from '@/components/ui/spinner'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Order, getUser } from '@/lib/types'
import { addSearchParams, cn, formatDate, formatPrice, statusToVariant, statusToVi } from '@/lib/utils'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu'
import { MoreHorizontal, Plus } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useToast } from '@/components/ui/use-toast'
import { buttonVariants } from '@/components/ui/button'
import { birdFarmApi } from '@/services/bird-farm-api'
import { Badge } from '@/components/ui/badge'

const pageSize = 12

function AdminOrderList() {
  const [searchParams] = useSearchParams()
  const pageNumber = Number(searchParams.get('pageNumber') || 1)
  const searchQuery = searchParams.get('searchQuery')
  const [orders, setOrders] = useState<Order[]>([])
  const [isLoadingOrders, setIsLoadingOrders] = useState(true)
  const [totalPages, setTotalPages] = useState<number | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    const fetchOrders = async () => {
      setIsLoadingOrders(true)
      try {
        const { data } = await birdFarmApi.get(
          addSearchParams('/api/orders/pagination/admin?pageSize', { pageNumber, pageSize, searchQuery })
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
  }, [pageNumber, searchQuery, toast])

  if (!orders) {
    return <div>Loading</div>
  }

  return (
    <div>
      <div className='flex items-center justify-between mb-6'>
        <div className='text-3xl font-bold'>Danh sách chim</div>
        <Link className={cn(buttonVariants(), 'mb-6 flex items-center gap-1 my-auto')} to='/admin/orders/new'>
          <span>Tạo Chim</span>
          <Plus className='w-5 h-5' />
        </Link>
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
                  <TableCell className='text-center'>{formatPrice(order.totalMoney)}</TableCell>
                  <TableCell className='text-center'>{formatDate(order.createdAt)}</TableCell>
                  <TableCell className='text-center'>
                    <Badge variant={statusToVariant[order.status]}>{statusToVi[order.status]}</Badge>
                  </TableCell>
                  <TableCell className='text-center'>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <MoreHorizontal className='cursor-pointer' />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className='bg-background border border-border'>
                        <DropdownMenuItem asChild className='cursor-pointer py-2 px-4'>
                          <Link to={`/admin/orders/${order._id}`}>Chi Tiết</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem className='cursor-pointer py-2 px-4'>Bày Bán</DropdownMenuItem>
                        <DropdownMenuItem className='cursor-pointer py-2 px-4'>Ngừng Bán</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
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
          path={`/admin/orders?searchQuery=${searchQuery}`}
          pageSize={pageSize}
          pageNumber={pageNumber}
          totalPages={totalPages}
        />
      )}
    </div>
  )
}

export default AdminOrderList
