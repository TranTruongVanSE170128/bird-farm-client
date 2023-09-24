import Container from '@/components/ui/container'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel
} from '@/components/ui/select'
import NestCard from '@/components/nest-card'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Nest } from '@/lib/types'
import { birdFarmApi } from '@/services/bird-farm-api'
import Paginate from '@/components/paginate'
import { addSearchParams } from '@/lib/utils'
import NestCardSkeleton from '@/components/nest-card-skeleton'

const pageSize = 12

function NestList() {
  const [searchParams] = useSearchParams()
  const pageNumber = Number(searchParams.get('pageNumber') || 1)
  const searchQuery = searchParams.get('searchQuery') || ''
  const specie = searchParams.get('specie') || ''
  const [nests, setNests] = useState<Nest[]>([])
  const [isLoadingNests, setIsLoadingNests] = useState(true)
  const [totalPages, setTotalPages] = useState<number | null>(null)

  useEffect(() => {
    const fetchNests = async () => {
      setIsLoadingNests(true)
      const { data } = await birdFarmApi.get(
        addSearchParams('/api/nests/pagination', { pageNumber, pageSize, searchQuery, specie })
      )
      setNests(data?.nests || [])
      setTotalPages(data?.totalPages || null)
      setIsLoadingNests(false)
    }

    fetchNests()
  }, [pageNumber, searchQuery, specie])
  return (
    <main>
      <Container>
        <div className='flex justify-between items-center mt-10 mb-6'>
          <h1 className='text-3xl font-bold'>Tổ Chim đang bán tại cửa hàng</h1>
        </div>

        <div className='pt-5 font-medium text-2xl'>Bộ Lọc</div>

        <Select>
          <SelectTrigger className='w-[180px] mt-3 mb-6'>
            <SelectValue className='font-semibold' placeholder='Lọc loài chim' />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Loài chim</SelectLabel>
              <SelectItem value='Chim sẻ'>Chim sẻ</SelectItem>
              <SelectItem value='Chim vành khuyên'>Chim vành khuyên</SelectItem>
              <SelectItem value='Chim sáo'>Chim sáo</SelectItem>
              <SelectItem value='Chim mật'>Chim mật</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        {isLoadingNests ? (
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
            {Array(...new Array(12)).map((_, i) => {
              return <NestCardSkeleton key={i} />
            })}
          </div>
        ) : (
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
            {nests.map((nest) => {
              return <NestCard key={nest._id} nest={nest} />
            })}
          </div>
        )}

        {!!totalPages && (
          <Paginate
            className='mt-8'
            path={addSearchParams('/nests', { searchQuery, specie })}
            pageSize={pageSize}
            pageNumber={pageNumber}
            totalPages={totalPages}
          />
        )}
      </Container>
    </main>
  )
}

export default NestList
