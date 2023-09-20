import Paginate from '@/components/paginate'
import { Nest } from '@/lib/types'
import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { buttonVariants } from '@/components/ui/button'
import { MoreHorizontal, Plus } from 'lucide-react'
import { cn, formatPrice } from '@/lib/utils'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import Spinner from '@/components/ui/spinner'
import { birdFarmApi } from '@/services/bird-farm-api'

const pageSize = 12

function AdminNestList() {
  const [searchParams] = useSearchParams()
  const pageNumber = Number(searchParams.get('pageNumber') || 1)
  const searchQuery = searchParams.get('searchQuery') || ''
  const nest = searchParams.get('nest') || ''
  const [nests, setNests] = useState<Nest[]>([])
  const [isLoadingNests, setIsLoadingNests] = useState(true)
  const [totalPages, setTotalPages] = useState<number | null>(null)

  useEffect(() => {
    const fetchNests = async () => {
      setIsLoadingNests(true)
      try {
        const { data } = await birdFarmApi.get(
          `/api/nests/pagination?pageSize=${pageSize}&pageNumber=${pageNumber}&searchQuery=${searchQuery}&nest=${nest}`
        )
        setNests(data?.nests || null)
        setIsLoadingNests(false)
        setTotalPages(data?.totalPages || null)
      } catch (error) {
        console.log(error)
      }
    }

    fetchNests()
  }, [pageNumber, searchQuery, nest])

  if (!nests) {
    return <div>Loading</div>
  }

  return (
    <div>
      <div className='flex items-center justify-between mb-6'>
        <div className='text-3xl font-bold'>Danh sách tổ chim</div>
        <Link className={cn(buttonVariants(), 'mb-6 flex items-center gap-1 my-auto')} to='/admin/nests/new'>
          <span>Tạo Tổ Chim</span>
          <Plus className='w-5 h-5' />
        </Link>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className='text-center'>Ảnh</TableHead>
            <TableHead className='text-center'>Giá</TableHead>
            {/* <TableHead className='text-center'>Đã Bán</TableHead> */}
            <TableHead className='text-end'></TableHead>
          </TableRow>
        </TableHeader>

        {!isLoadingNests && (
          <TableBody>
            {nests.map((nest) => {
              return (
                <TableRow key={nest._id}>
                  <TableCell className='text-center'>
                    <img src={nest.imageUrls?.[0]} alt='' />
                  </TableCell>
                  <TableCell className='text-center'>{formatPrice(nest.price)}</TableCell>
                  {/* <TableCell className='text-center'>Đã Bán</TableCell> */}
                  <TableCell className='text-center'>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <MoreHorizontal className='cursor-pointer' />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className='bg-background border border-border'>
                        <DropdownMenuItem className='cursor-pointer py-2 px-4'>Chi Tiết</DropdownMenuItem>
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
      {isLoadingNests && <Spinner className='mt-5' />}
      {!!totalPages && (
        <Paginate
          className='mt-8'
          path={`/admin/nests?searchQuery=${searchQuery}`}
          pageSize={pageSize}
          pageNumber={pageNumber}
          totalPages={totalPages}
        />
      )}
    </div>
  )
}

export default AdminNestList
