// import { useSearchParams } from 'react-router-dom'

import BirdCard from '@/components/bird-card'
import BirdCardSkeleton from '@/components/bird-card-skeleton'
import Paginate from '@/components/paginate'
import Container from '@/components/ui/container'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Bird, Specie } from '@/lib/types'
import { addSearchParams } from '@/lib/utils'
import { birdFarmApi } from '@/services/bird-farm-api'
import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

const pageSize = 12

function BirdList() {
  const [searchParams] = useSearchParams()
  const pageNumber = Number(searchParams.get('pageNumber') || 1)
  const searchQuery = searchParams.get('searchQuery')
  const specie = searchParams.get('specie') || ''
  const type = searchParams.get('type')
  const [birds, setBirds] = useState<Bird[]>([])
  const [isLoadingBirds, setIsLoadingBirds] = useState(true)
  const [totalPages, setTotalPages] = useState<number | null>(null)
  const [species, setSpecies] = useState<Specie[]>([])
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
      const { data } = await birdFarmApi.get(
        addSearchParams('/api/birds/pagination', {
          pageSize,
          pageNumber,
          searchQuery,
          specie,
          type
        })
      )
      setBirds(data?.birds || [])
      setTotalPages(data?.totalPages || null)
      setIsLoadingBirds(false)
    }

    fetchBirds()

    console.log({ searchQuery })
  }, [pageNumber, searchQuery, specie, type])

  return (
    <main>
      <Container>
        <div className='flex items-center justify-between mt-10 mb-6'>
          <h1 className='text-3xl font-bold'>Chim đang bán tại cửa hàng</h1>
        </div>

        <div className='text-2xl font-medium'>Bộ lọc loài chim</div>

        <Select
          value={specie}
          onValueChange={(value) => {
            navigate(addSearchParams('/birds', { searchQuery, type, specie: value }))
          }}
        >
          <SelectTrigger className='w-[180px] mt-3 mb-6'>
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

        {isLoadingBirds ? (
          <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
            {Array(...new Array(12)).map((_, i) => {
              return <BirdCardSkeleton key={i} />
            })}
          </div>
        ) : (
          <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
            {birds.map((bird) => {
              return <BirdCard key={bird._id} bird={bird} />
            })}
          </div>
        )}

        {!!totalPages && (
          <Paginate
            className='mt-8'
            path={addSearchParams('/birds', { searchQuery, type, specie })}
            pageSize={pageSize}
            pageNumber={pageNumber}
            totalPages={totalPages}
          />
        )}
      </Container>
    </main>
  )
}

export default BirdList
