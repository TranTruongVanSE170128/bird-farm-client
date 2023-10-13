import Paginate from '@/components/paginate'
import Spinner from '@/components/ui/spinner'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Bird, Specie, getSpecie } from '@/lib/types'
import { addSearchParams, cn, formatPrice } from '@/lib/utils'
import { Calendar, MoreHorizontal, Plus } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import maleIcon from '@/assets/male.svg'
import femaleIcon from '@/assets/female.svg'
import birdIcon from '@/assets/bird-color.svg'
import breedIcon from '@/assets/breed.svg'
import noImage from '@/assets/no-image.webp'
import { useToast } from '@/components/ui/use-toast'
import { Button, buttonVariants } from '@/components/ui/button'
import { birdFarmApi } from '@/services/bird-farm-api'
import { Badge } from '@/components/ui/badge'
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

const pageSize = 12

function ManageBirdList() {
  const [searchParams] = useSearchParams()
  const pageNumber = Number(searchParams.get('pageNumber') || 1)
  const searchQuery = searchParams.get('searchQuery')
  const specie = searchParams.get('specie') || ''
  const gender = searchParams.get('gender') || ''
  const type = searchParams.get('type') || ''
  const sort = searchParams.get('sort') || 'createdAt_-1'
  const sold = searchParams.get('sold') || ''
  const status = searchParams.get('status') || ''
  const [species, setSpecies] = useState<Specie[]>([])
  const [birds, setBirds] = useState<Bird[]>([])
  const [isLoadingBirds, setIsLoadingBirds] = useState(true)
  const [totalPages, setTotalPages] = useState<number | null>(null)
  const { toast } = useToast()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchSpecies = async () => {
      const { data } = await birdFarmApi.get('/api/species')

      setSpecies(data?.species || [])
    }
    fetchSpecies()
  }, [])

  useEffect(() => {
    const fetchBirds = async () => {
      setIsLoadingBirds(true)
      try {
        const { data } = await birdFarmApi.get(
          addSearchParams('/api/birds/pagination/manage?pageSize', {
            pageNumber,
            pageSize,
            searchQuery,
            specie,
            sort,
            type,
            gender,
            status
          })
        )
        setBirds(data?.birds || null)
        setIsLoadingBirds(false)
        setTotalPages(data?.totalPages || null)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        setIsLoadingBirds(false)
        const messageError = error.response.data.message
        toast({
          variant: 'destructive',
          title: 'Lỗi',
          content: messageError || 'Không rõ nguyễn nhân'
        })
      }
    }

    fetchBirds()
  }, [pageNumber, searchQuery, specie, toast, gender, type, sort, status])

  if (!birds) {
    return <div>Loading</div>
  }

  return (
    <div>
      <div className='flex items-center justify-between mb-6'>
        <div className='text-3xl font-bold'>Danh sách chim</div>
        <Link className={cn(buttonVariants(), 'mb-6 flex items-center gap-1 my-auto')} to='/manager/birds/new'>
          <span>Tạo Chim</span>
          <Plus className='w-5 h-5' />
        </Link>
      </div>

      <div className='text-2xl font-medium'>Lọc theo tiêu chí</div>

      <div className='flex items-center mt-3 gap-4'>
        <div className='flex items-center gap-2 bg-accent p-2 rounded-md border'>
          <p className='font-medium text-sm shrink-0'>Loài chim:</p>
          <Select
            value={specie}
            onValueChange={(value) => {
              navigate(addSearchParams('/manager/birds', { sort, searchQuery, type, specie: value, gender, status }))
            }}
          >
            <SelectTrigger>
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

        <div className='flex items-center gap-2 bg-accent p-2 rounded-md border'>
          <p className='font-medium text-sm shrink-0'>Giới tính:</p>
          <Select
            value={gender}
            onValueChange={(value) => {
              navigate(addSearchParams('/manager/birds', { sort, searchQuery, type, specie, gender: value, status }))
            }}
          >
            <SelectTrigger className=''>
              <SelectValue className='font-semibold' placeholder='Lọc giới tính' />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup className=''>
                <SelectLabel>Giới tính</SelectLabel>
                <SelectItem className='cursor-pointer' value=''>
                  Tất cả
                </SelectItem>
                <SelectItem className='cursor-pointer' value='male'>
                  <div className='flex items-center'>
                    Đực
                    <img className='w-6 h-6 ml-1' src={maleIcon} alt='' />
                  </div>
                </SelectItem>
                <SelectItem className='cursor-pointer' value='female'>
                  <div className='flex items-center'>
                    Cái
                    <img className='w-6 h-6 ml-1' src={femaleIcon} alt='' />
                  </div>
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className='flex items-center gap-2 bg-accent p-2 rounded-md border'>
          <p className='font-medium text-sm shrink-0'>Loại chim:</p>
          <Select
            value={type}
            onValueChange={(value) => {
              navigate(
                addSearchParams('/manager/birds', { sort, searchQuery, type: value, specie, gender, status: '' })
              )
            }}
          >
            <SelectTrigger>
              <SelectValue className='font-semibold' placeholder='Lọc loại chim...' />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup className=''>
                <SelectLabel>Loại Chim</SelectLabel>
                <SelectItem className='cursor-pointer' value=''>
                  Tất cả
                </SelectItem>
                <SelectItem value='sell'>
                  <div className='flex items-center'>
                    <img className='w-6 h-6 mr-1' src={birdIcon} alt='' />
                    Chim kiểng
                  </div>
                </SelectItem>
                <SelectItem className='flex items-center' value='breed'>
                  <div className='flex items-center'>
                    <img className='w-6 h-6 mr-1' src={breedIcon} alt='' />
                    Chim phối giống
                  </div>
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className='flex items-center gap-2 bg-accent p-2 rounded-md border'>
          <p className='font-medium text-sm shrink-0'>Trạng thái:</p>
          <Select
            value={status}
            onValueChange={(value) => {
              if (value) {
                if (value === 'selling' || value === 'sold') {
                  navigate(
                    addSearchParams('/manager/birds', {
                      sort,
                      searchQuery,
                      status: value,
                      specie,
                      gender,
                      type: 'sell'
                    })
                  )
                }
                if (value === 'breeding' || value === 'free') {
                  navigate(
                    addSearchParams('/manager/birds', {
                      sort,
                      searchQuery,
                      status: value,
                      specie,
                      gender,
                      type: 'breed'
                    })
                  )
                }
                return
              }

              navigate(addSearchParams('/manager/birds', { sort, searchQuery, status: value, specie, gender, type }))
            }}
          >
            <SelectTrigger>
              <SelectValue className='font-semibold' placeholder='Lọc trạng thái...' />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup className=''>
                <SelectLabel>Trạng thái</SelectLabel>
                <SelectItem className='cursor-pointer' value=''>
                  Tất cả
                </SelectItem>
                <SelectItem value='selling'>
                  <div className='flex items-center'>
                    <img className='w-6 h-6 mr-1' src={birdIcon} alt='' />
                    Đang bán
                  </div>
                </SelectItem>
                <SelectItem value='sold'>
                  <div className='flex items-center'>
                    <img className='w-6 h-6 mr-1' src={birdIcon} alt='' />
                    Đã bán
                  </div>
                </SelectItem>
                <SelectItem className='flex items-center' value='breeding'>
                  <div className='flex items-center'>
                    <img className='w-6 h-6 mr-1' src={breedIcon} alt='' />
                    Đang phối giống
                  </div>
                </SelectItem>
                <SelectItem className='flex items-center' value='free'>
                  <div className='flex items-center'>
                    <img className='w-6 h-6 mr-1' src={breedIcon} alt='' />
                    Đang rảnh
                  </div>
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className='text-2xl font-medium mt-3'>Sắp xếp theo</div>

      <div className='mb-12 flex items-center mt-2 gap-3'>
        <Button
          onClick={() => {
            navigate(
              addSearchParams('/manager/birds', { sort: 'createdAt_-1', searchQuery, type, specie, gender, status })
            )
          }}
          variant={sort === 'createdAt_-1' ? 'default' : 'outline'}
          className='flex items-center gap-1'
        >
          <Calendar className='w-5 h-5 mr-1' />
          Mới nhất
        </Button>
        <Button
          onClick={() => {
            navigate(addSearchParams('/manager/birds', { sort: 'price_1', searchQuery, type, specie, gender, status }))
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
            navigate(addSearchParams('/manager/birds', { sort: 'price_-1', searchQuery, type, specie, gender, status }))
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
            <TableHead>Tên</TableHead>
            <TableHead className='text-center'>Ảnh</TableHead>
            <TableHead className='text-center'>Loại Chim</TableHead>
            <TableHead className='text-center'>Giới Tính</TableHead>
            <TableHead className='text-center'>Giá bán/Giá phối giống</TableHead>
            <TableHead className='text-center'>Trạng thái</TableHead>
            <TableHead className='text-end'></TableHead>
          </TableRow>
        </TableHeader>

        {!isLoadingBirds && (
          <TableBody>
            {birds.map((bird) => {
              return (
                <TableRow key={bird._id}>
                  <TableCell>{getSpecie(bird).name}</TableCell>
                  <TableCell>{bird.name}</TableCell>
                  <TableCell className='flex justify-center overflow-hidden'>
                    <img
                      className='w-12 h-12 border rounded-md aspect-square'
                      src={bird?.imageUrls?.[0] || noImage}
                      alt=''
                    />
                  </TableCell>

                  <TableCell>
                    {bird.type === 'sell' ? (
                      <div className='flex items-center justify-center gap-1'>
                        Chim kiểng
                        <img className='w-6 h-6' src={birdIcon} alt='' />
                      </div>
                    ) : (
                      <div className='flex items-center justify-center gap-1'>
                        Chim phối giống
                        <img className='w-6 h-6' src={breedIcon} alt='' />
                      </div>
                    )}
                  </TableCell>
                  <TableCell>
                    {bird.gender === 'male' ? (
                      <div className='flex items-center justify-center gap-1'>
                        Đực
                        <img className='w-6 h-6' src={maleIcon} alt='' />
                      </div>
                    ) : (
                      <div className='flex items-center justify-center gap-1'>
                        Cái
                        <img className='w-6 h-6' src={femaleIcon} alt='' />
                      </div>
                    )}
                  </TableCell>
                  <TableCell className='font-medium text-center text-primary'>
                    {bird.type === 'sell' ? formatPrice(bird.sellPrice || 0) : formatPrice(bird.breedPrice || 0)}
                  </TableCell>
                  <TableCell className='text-center'>
                    {bird.type === 'sell' &&
                      (bird.sold ? (
                        <Badge variant='destructive'>Đã bán</Badge>
                      ) : (
                        <Badge variant='success'>Đang bán</Badge>
                      ))}
                    {bird.type === 'breed' &&
                      (bird.breading ? (
                        <Badge variant='breed'>Đang phối giống</Badge>
                      ) : (
                        <Badge variant='info'>Sẵn sàng phối giống</Badge>
                      ))}
                  </TableCell>

                  <TableCell className='text-center'>
                    <Button size='icon' asChild variant='ghost'>
                      <Link to={`/manager/birds/${bird._id}`}>
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
      {isLoadingBirds && <Spinner className='mt-5' />}
      {!!totalPages && (
        <Paginate
          className='mt-8'
          path={addSearchParams('/manager/birds', { sort, searchQuery, type, specie, gender, sold, status })}
          pageSize={pageSize}
          pageNumber={pageNumber}
          totalPages={totalPages}
        />
      )}
    </div>
  )
}

export default ManageBirdList
