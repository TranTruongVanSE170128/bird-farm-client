import Paginate from '@/components/paginate'
import Spinner from '@/components/ui/spinner'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Bird, getSpecie } from '@/lib/types'
import { addSearchParams, cn, formatPrice } from '@/lib/utils'
import { MoreHorizontal, Plus } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import maleIcon from '@/assets/male.svg'
import femaleIcon from '@/assets/female.svg'
import birdIcon from '@/assets/bird-color.svg'
import breedIcon from '@/assets/breed.svg'
import noImage from '@/assets/no-image.webp'
import { useToast } from '@/components/ui/use-toast'
import { Button, buttonVariants } from '@/components/ui/button'
import { birdFarmApi } from '@/services/bird-farm-api'

const pageSize = 12

function ManageBirdList() {
  const [searchParams] = useSearchParams()
  const pageNumber = Number(searchParams.get('pageNumber') || 1)
  const searchQuery = searchParams.get('searchQuery') || ''
  const specie = searchParams.get('specie')
  const [birds, setBirds] = useState<Bird[]>([])
  const [isLoadingBirds, setIsLoadingBirds] = useState(true)
  const [totalPages, setTotalPages] = useState<number | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    const fetchBirds = async () => {
      setIsLoadingBirds(true)
      try {
        const { data } = await birdFarmApi.get(
          addSearchParams('/api/birds/pagination?pageSize', { pageNumber, pageSize, searchQuery, specie })
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
  }, [pageNumber, searchQuery, specie, toast])

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

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Loài</TableHead>
            <TableHead>Tên</TableHead>
            <TableHead className='text-center'>Ảnh</TableHead>
            <TableHead className='text-center'>Loại Chim</TableHead>
            <TableHead className='text-center'>Giá bán/Giá phối giống</TableHead>
            {/* <TableHead className='text-center'>Đã Bán</TableHead> */}
            <TableHead className='text-center'>Giới Tính</TableHead>
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
                  <TableCell className='font-medium text-center text-primary'>
                    {bird.type === 'sell' ? formatPrice(bird.sellPrice || 0) : formatPrice(bird.breedPrice || 0)}
                  </TableCell>
                  {/* <TableCell className='text-center'>Đã Bán</TableCell> */}

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
          path={`/manager/birds?searchQuery=${searchQuery || ''}`}
          pageSize={pageSize}
          pageNumber={pageNumber}
          totalPages={totalPages}
        />
      )}
    </div>
  )
}

export default ManageBirdList
