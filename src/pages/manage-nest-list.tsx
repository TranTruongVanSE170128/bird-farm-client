import Paginate from '@/components/paginate'
import { Nest, Specie, getSpecie } from '@/lib/types'
import { useEffect, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { Button, buttonVariants } from '@/components/ui/button'
import { Calendar, MoreHorizontal, Plus } from 'lucide-react'
import { addSearchParams, cn, formatPrice } from '@/lib/utils'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import Spinner from '@/components/ui/spinner'
import { birdFarmApi } from '@/services/bird-farm-api'
import noImage from '@/assets/no-image.webp'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import decreaseIcon from '@/assets/decrease.svg'
import { Badge } from '@/components/ui/badge'

const pageSize = 12

function ManageNestList() {
  const [searchParams] = useSearchParams()
  const pageNumber = Number(searchParams.get('pageNumber') || 1)
  const searchQuery = searchParams.get('searchQuery') || ''
  const sold = searchParams.get('sold') || ''
  const specie = searchParams.get('specie') || ''
  const sort = searchParams.get('sort') || 'createdAt_-1'
  const [nests, setNests] = useState<Nest[]>([])
  const [species, setSpecies] = useState<Specie[]>([])
  const [isLoadingNests, setIsLoadingNests] = useState(true)
  const [totalPages, setTotalPages] = useState<number | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchSpecies = async () => {
      const { data } = await birdFarmApi.get('/api/species')

      setSpecies(data?.species || [])
    }
    fetchSpecies()
  }, [])

  useEffect(() => {
    const fetchNests = async () => {
      setIsLoadingNests(true)
      try {
        const { data } = await birdFarmApi.get(
          addSearchParams('/api/nests/pagination/manage', { searchQuery, pageNumber, pageSize, sort, sold, specie })
        )
        setNests(data?.nests || null)
        setIsLoadingNests(false)
        setTotalPages(data?.totalPages || null)
      } catch (error) {
        console.log(error)
      }
    }

    fetchNests()
  }, [pageNumber, searchQuery, sort, sold, specie])

  if (!nests) {
    return <div>Loading</div>
  }

  return (
    <div>
      <div className='flex items-center justify-between mb-6'>
        <div className='text-3xl font-bold'>Danh sách tổ chim</div>
        <Link className={cn(buttonVariants(), 'mb-6 flex items-center gap-1 my-auto')} to='/manager/nests/new'>
          <span>Tạo Tổ Chim</span>
          <Plus className='w-5 h-5' />
        </Link>
      </div>

      <div className='text-2xl font-medium'>Lọc theo tiêu chí</div>

      <div className='flex items center gap-3 mt-3'>
        <div className='flex items-center gap-2 bg-accent p-2 rounded-md border w-fit'>
          <p className='font-medium text-sm shrink-0'>Loài chim:</p>
          <Select
            value={specie}
            onValueChange={(value) => {
              navigate(addSearchParams('/manager/nests', { searchQuery, specie: value, sort, sold }))
            }}
          >
            <SelectTrigger className='w-[180px]'>
              <SelectValue className='font-semibold' placeholder='Lọc loài chim' />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup className='h-96'>
                <SelectLabel>Loài chim</SelectLabel>
                <SelectItem value=''>Tất cả</SelectItem>
                {species.map((specie) => {
                  return <SelectItem value={specie._id}>{specie.name}</SelectItem>
                })}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className='flex items-center gap-2 bg-accent p-2 rounded-md border w-fit'>
          <p className='font-medium text-sm shrink-0'>Trạng thái:</p>
          <Select
            value={sold}
            onValueChange={(value) => {
              navigate(addSearchParams('/manager/nests', { searchQuery, specie, sort, sold: value }))
            }}
          >
            <SelectTrigger className='w-[180px]'>
              <SelectValue className='font-semibold' placeholder='Lọc trạng thái' />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Trạng thái</SelectLabel>
                <SelectItem value=''>Tất cả</SelectItem>
                <SelectItem value='false'>Đang bán</SelectItem>
                <SelectItem value='true'>Đã bán</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className='text-2xl font-medium mt-3'>Sắp xếp theo</div>

      <div className='mb-12 flex items-center mt-2 gap-3'>
        <Button
          onClick={() => {
            navigate(addSearchParams('/manager/nests', { sort: 'createdAt_-1', searchQuery, specie, sold }))
          }}
          variant={sort === 'createdAt_-1' ? 'default' : 'outline'}
          className='flex items-center gap-1'
        >
          <Calendar className='w-5 h-5 mr-1' />
          Mới nhất
        </Button>
        <Button
          onClick={() => {
            navigate(addSearchParams('/manager/nests', { sort: 'price_1', searchQuery, specie, sold }))
          }}
          variant={sort === 'price_1' ? 'default' : 'outline'}
          className='flex items-center gap-1'
        >
          <img
            src={decreaseIcon}
            className={cn('w-5 h-5 mr-1 dark:filter dark:invert scale-y-[-1]', sort === 'price_1' && 'filter invert')}
          />
          Giá tăng dần
        </Button>
        <Button
          onClick={() => {
            navigate(addSearchParams('/manager/nests', { sort: 'price_-1', searchQuery, specie, sold }))
          }}
          variant={sort === 'price_-1' ? 'default' : 'outline'}
          className='flex items-center gap-1'
        >
          <img
            src={decreaseIcon}
            className={cn('w-5 h-5 mr-1 dark:filter dark:invert', sort === 'price_-1' && 'filter invert')}
          />
          Giá giảm dần
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Loài</TableHead>
            <TableHead className='text-center'>Ảnh</TableHead>
            <TableHead>Tổ chim</TableHead>
            <TableHead>Chim bố</TableHead>
            <TableHead>Chim mẹ</TableHead>
            <TableHead className='text-center'>Giá</TableHead>
            <TableHead className='text-center'>Trạng thái</TableHead>
            <TableHead className='text-end'></TableHead>
          </TableRow>
        </TableHeader>

        {!isLoadingNests && (
          <TableBody>
            {nests.map((nest) => {
              return (
                <TableRow key={nest._id}>
                  <TableCell>{getSpecie(nest).name}</TableCell>
                  <TableCell className='text-center'>
                    <img
                      className='block object-cover w-16 mx-auto border rounded-md aspect-square'
                      src={nest.imageUrls?.[0] || noImage}
                      alt=''
                    />
                  </TableCell>
                  <TableCell>{nest.name}</TableCell>
                  <TableCell>
                    {nest.dad ? (
                      <Link className='hover:underline hover:text-primary' to={`/manager/birds/${nest.dad._id}`}>
                        {nest.dad.name}
                      </Link>
                    ) : (
                      'Không có thông tin'
                    )}
                  </TableCell>
                  <TableCell>
                    {nest.mom ? (
                      <Link className='hover:underline hover:text-primary' to={`/manager/birds/${nest.mom._id}`}>
                        {nest.mom.name}
                      </Link>
                    ) : (
                      'Không có thông tin'
                    )}
                  </TableCell>
                  <TableCell className='font-medium text-center text-primary'>{formatPrice(nest.price)}</TableCell>
                  <TableCell className='text-center'>
                    {nest.sold ? (
                      <Badge variant='destructive'>Đã bán</Badge>
                    ) : (
                      <Badge variant='success'>Đang bán</Badge>
                    )}
                  </TableCell>
                  <TableCell className='text-center'>
                    <Button size='icon' asChild variant='ghost'>
                      <Link to={`/manager/nests/${nest._id}`}>
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
      {isLoadingNests && <Spinner className='mt-5' />}
      {!!totalPages && (
        <Paginate
          className='mt-8'
          path={addSearchParams('/manager/nests', { searchQuery, specie, sort, sold })}
          pageSize={pageSize}
          pageNumber={pageNumber}
          totalPages={totalPages}
        />
      )}
    </div>
  )
}

export default ManageNestList
