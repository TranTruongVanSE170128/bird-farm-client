// import { useSearchParams } from 'react-router-dom'

import BirdCard from '@/components/bird-card'
import BirdCardSkeleton from '@/components/bird-card-skeleton'
import Paginate from '@/components/paginate'
import Container from '@/components/ui/container'
import { Bird } from '@/lib/types'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

const pageSize = 12

function BirdList() {
  const [searchParams] = useSearchParams()
  const pageNumber = Number(searchParams.get('pageNumber') || 1)
  const searchQuery = searchParams.get('searchQuery') || ''
  const specie = searchParams.get('specie') || ''
  const [birds, setBirds] = useState<Bird[]>([])
  const [isLoadingBirds, setIsLoadingBirds] = useState(true)
  const [totalPages, setTotalPages] = useState<number | null>(null)

  useEffect(() => {
    const fetchBirds = async () => {
      const { data } = await axios.get(
        `${
          import.meta.env.VITE_API_URL
        }/api/birds?pageSize=${pageSize}&pageNumber=${pageNumber}searchQuery=${searchQuery}&specie=${specie}`
      )
      setBirds(data?.birds || [])
      setTotalPages(data?.totalPages || null)
      setIsLoadingBirds(false)
    }

    fetchBirds()
  }, [pageNumber, searchQuery, specie])

  return (
    <main>
      <Container>
        <div className='flex justify-between items-center mt-10 mb-6'>
          <h1 className='text-3xl font-bold'>Chim đang bán tại cửa hàng</h1>
        </div>

        {isLoadingBirds ? (
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
            {Array(...new Array(12)).map(() => {
              return <BirdCardSkeleton />
            })}
          </div>
        ) : (
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
            {birds.map((bird) => {
              return <BirdCard key={bird._id} bird={bird} />
            })}
          </div>
        )}

        {!!totalPages && (
          <Paginate
            className='mt-8'
            path={`/birds?searchQuery=${searchQuery}`}
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
