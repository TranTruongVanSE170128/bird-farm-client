import Paginate from '@/components/paginate'
import Spinner from '@/components/ui/spinner'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { OrderNest, getUser } from '@/lib/types'
import { addSearchParams, formatDate, statusToVariant, statusToVi } from '@/lib/utils'
import { MoreHorizontal } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useToast } from '@/components/ui/use-toast'
import { birdFarmApi } from '@/services/bird-farm-api'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

const pageSize = 12

function ManageOrderNestList() {
  const [searchParams] = useSearchParams()
  const pageNumber = Number(searchParams.get('pageNumber') || 1)
  const [orderNests, setOrderNests] = useState<OrderNest[]>([])
  const [isLoadingOrderNests, setIsLoadingOrderNests] = useState(true)
  const [totalPages, setTotalPages] = useState<number | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    const fetchOrderNests = async () => {
      setIsLoadingOrderNests(true)
      try {
        const { data } = await birdFarmApi.get(
          addSearchParams('/api/order-nests/pagination/manage', { pageNumber, pageSize })
        )
        setOrderNests(data?.orderNests || null)
        setIsLoadingOrderNests(false)
        setTotalPages(data?.totalPages || null)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        setIsLoadingOrderNests(false)
        const messageError = error.response.data.message
        toast({
          variant: 'destructive',
          title: 'Lỗi',
          content: messageError || 'Không rõ nguyễn nhân'
        })
      }
    }

    fetchOrderNests()
  }, [pageNumber, toast])

  if (!orderNests) {
    return <div>Loading</div>
  }

  return (
    <div>
      <div className='flex items-center justify-between mb-6'>
        <div className='text-3xl font-bold'>Danh sách đơn tổ chim</div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Tên khách hàng</TableHead>
            <TableHead>Chim bố</TableHead>
            <TableHead>Chim mẹ</TableHead>
            <TableHead className='text-center'>Ngày đặt</TableHead>
            <TableHead className='text-center'>Trạng thái</TableHead>
            <TableHead className='text-end'></TableHead>
          </TableRow>
        </TableHeader>

        {!isLoadingOrderNests && (
          <TableBody>
            {orderNests.map((orderNest) => {
              return (
                <TableRow key={orderNest._id}>
                  <TableCell>{getUser(orderNest).name}</TableCell>
                  <TableCell>
                    {orderNest.dad ? (
                      <div className='hover:underline hover:text-primary'>{orderNest.dad.name}</div>
                    ) : (
                      'Không có thông tin'
                    )}
                  </TableCell>
                  <TableCell>
                    {orderNest.mom ? (
                      <div className='hover:underline hover:text-primary'>{orderNest.mom.name}</div>
                    ) : (
                      'Không có thông tin'
                    )}
                  </TableCell>
                  <TableCell className='text-center'>{formatDate(orderNest.createdAt)}</TableCell>
                  <TableCell className='text-center'>
                    <Badge variant={statusToVariant[orderNest.status]}>{statusToVi[orderNest.status]}</Badge>
                  </TableCell>
                  <TableCell className='text-center'>
                    <Button size='icon' asChild variant='ghost'>
                      <Link to={`/staff/order-nests/${orderNest._id}`}>
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
      {isLoadingOrderNests && <Spinner className='mt-5' />}
      {!!totalPages && (
        <Paginate
          className='mt-8'
          path={`/staff/order-nests`}
          pageSize={pageSize}
          pageNumber={pageNumber}
          totalPages={totalPages}
        />
      )}
    </div>
  )
}

export default ManageOrderNestList
