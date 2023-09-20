import Paginate from '@/components/paginate'
import Spinner from '@/components/ui/spinner'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Bird, getSpecie } from '@/lib/types'
import { cn, formatPrice } from '@/lib/utils'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu'
import { Check, MoreHorizontal, Plus, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import maleIcon from '@/assets/male.svg'
import femaleIcon from '@/assets/female.svg'
import { useToast } from '@/components/ui/use-toast'
import { useAuthContext } from '@/contexts/auth-provider'
import { buttonVariants } from '@/components/ui/button'
import { birdFarmApi } from '@/services/bird-farm-api'

const pageSize = 12

function AdminBirdList() {
  const [searchParams] = useSearchParams()
  const pageNumber = Number(searchParams.get('pageNumber') || 1)
  const searchQuery = searchParams.get('searchQuery') || ''
  const specie = searchParams.get('specie') || ''
  const [birds, setBirds] = useState<Bird[]>([])
  const [isLoadingBirds, setIsLoadingBirds] = useState(true)
  const [totalPages, setTotalPages] = useState<number | null>(null)
  const { toast } = useToast()
  const { accessToken } = useAuthContext()

  useEffect(() => {
    const fetchBirds = async () => {
      setIsLoadingBirds(true)
      try {
        const { data } = await birdFarmApi.get(
          `/api/birds/pagination/admin?pageSize=${pageSize}&pageNumber=${pageNumber}&searchQuery=${searchQuery}&specie=${specie}`,
          {
            headers: {
              Authorization: 'Bearer ' + accessToken
            }
          }
        )
        setBirds(data?.birds || null)
        setIsLoadingBirds(false)
        setTotalPages(data?.totalPages || null)
      } catch (error) {
        setIsLoadingBirds(false)
        toast({
          variant: 'destructive',
          title: 'Có lỗi xảy ra'
        })
      }
    }

    fetchBirds()
  }, [pageNumber, searchQuery, specie])

  if (!birds) {
    return <div>Loading</div>
  }

  return (
    <div>
      <div className='flex items-center justify-between mb-6'>
        <div className='text-3xl font-bold'>Danh sách chim</div>
        <Link className={cn(buttonVariants(), 'mb-6 flex items-center gap-1 my-auto')} to='/admin/birds/new'>
          <span>Tạo Chim</span>
          <Plus className='w-5 h-5' />
        </Link>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Loài</TableHead>
            <TableHead className='text-center'>Tên</TableHead>
            <TableHead className='text-center'>Ảnh</TableHead>
            <TableHead className='text-center'>Giá</TableHead>
            {/* <TableHead className='text-center'>Đã Bán</TableHead> */}
            <TableHead className='text-center'>Đang Bán</TableHead>
            <TableHead className='text-center'>Giới Tính</TableHead>
            <TableHead className='text-end'></TableHead>
          </TableRow>
        </TableHeader>

        {!isLoadingBirds && (
          <TableBody>
            {birds.map((bird) => {
              return (
                <TableRow key={bird._id}>
                  <TableCell className='line-clamp-1'>{getSpecie(bird).name}</TableCell>
                  <TableCell className='text-center'>{bird.name}</TableCell>
                  <TableCell className='text-center'>
                    <img src={bird.imageUrls?.[0]} alt='' />
                  </TableCell>
                  <TableCell className='text-center'>{formatPrice(bird.price)}</TableCell>
                  {/* <TableCell className='text-center'>Đã Bán</TableCell> */}
                  <TableCell className='text-center flex justify-center'>
                    <div>{bird.onSale ? <Check color='green' /> : <X color='red' />}</div>
                  </TableCell>
                  <TableCell className='text-center'>
                    {bird.gender === 'male' ? (
                      <img className='w-9 h-9 block mx-auto' src={maleIcon} alt='đực' />
                    ) : (
                      <img className='w-8 h-8 block mx-auto' src={femaleIcon} alt='cái' />
                    )}
                  </TableCell>
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
      {isLoadingBirds && <Spinner className='mt-5' />}
      {!!totalPages && (
        <Paginate
          className='mt-8'
          path={`/admin/birds?searchQuery=${searchQuery}`}
          pageSize={pageSize}
          pageNumber={pageNumber}
          totalPages={totalPages}
        />
      )}
    </div>
  )
}

export default AdminBirdList
