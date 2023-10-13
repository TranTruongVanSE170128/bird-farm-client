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
import { addSearchParams, cn } from '@/lib/utils'
import { birdFarmApi } from '@/services/bird-farm-api'
import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import breedIcon from '@/assets/breed.svg'
import birdIcon from '@/assets/bird-color.svg'
import maleIcon from '@/assets/male.svg'
import femaleIcon from '@/assets/female.svg'
import { Button } from '@/components/ui/button'
import { Calendar } from 'lucide-react'
import decreaseIcon from '@/assets/decrease.svg'

const pageSize = 12

function BirdList() {
  const [searchParams] = useSearchParams()
  const pageNumber = Number(searchParams.get('pageNumber') || 1)
  const searchQuery = searchParams.get('searchQuery')
  const specie = searchParams.get('specie') || ''
  const gender = searchParams.get('gender') || ''
  const type = searchParams.get('type') || ''
  const sort = searchParams.get('sort') || 'createdAt_-1'
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
          type,
          gender,
          sort
        })
      )
      setBirds(data?.birds || [])
      setTotalPages(data?.totalPages || null)
      setIsLoadingBirds(false)
    }

    fetchBirds()
  }, [pageNumber, searchQuery, specie, type, gender, sort])

  return (
    <main>
      <Container>
        <div className='flex items-center justify-between mt-10 mb-6'>
          <h1 className='text-3xl font-bold'>
            {type === 'sell'
              ? 'Chim đang bán tại cửa hàng'
              : type === 'breed'
              ? 'Chim phối giống tại cửa hàng'
              : 'Chim đang có tại cửa hàng'}
          </h1>
        </div>

        <div className='text-2xl font-medium'>Lọc theo tiêu chí</div>

        <div className='flex items-center mt-3 gap-4'>
          <div className='flex items-center gap-2 bg-accent p-2 rounded-md border'>
            <p className='font-medium text-sm shrink-0'>Loài chim:</p>
            <Select
              value={specie}
              onValueChange={(value) => {
                navigate(addSearchParams('/birds', { sort, searchQuery, type, specie: value, gender }))
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
                navigate(addSearchParams('/birds', { sort, searchQuery, type, specie, gender: value }))
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
                navigate(addSearchParams('/birds', { sort, searchQuery, type: value, specie, gender }))
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
        </div>

        <div className='text-2xl font-medium mt-3'>Sắp xếp theo</div>

        <div className='mb-12 flex items-center mt-2 gap-3'>
          <Button
            onClick={() => {
              navigate(addSearchParams('/birds', { sort: 'createdAt_-1', searchQuery, type, specie, gender }))
            }}
            variant={sort === 'createdAt_-1' ? 'default' : 'outline'}
            className='flex items-center gap-1'
          >
            <Calendar className='w-5 h-5 mr-1' />
            Mới nhất
          </Button>
          <Button
            onClick={() => {
              navigate(addSearchParams('/birds', { sort: 'price_1', searchQuery, type, specie, gender }))
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
              navigate(addSearchParams('/birds', { sort: 'price_-1', searchQuery, type, specie, gender }))
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
            path={addSearchParams('/birds', { searchQuery, type, specie, sort, gender })}
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
