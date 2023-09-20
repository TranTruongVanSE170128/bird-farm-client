import Paginate from '@/components/paginate'
import SpecieCard from '@/components/specie-card'
import SpecieCardSkeleton from '@/components/specie-card-skeleton'
import Container from '@/components/ui/container'
import { Specie } from '@/lib/types'
import { birdFarmApi } from '@/services/bird-farm-api'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

const pageSize = 8

function SpecieList() {
  const [searchParams] = useSearchParams()
  const pageNumber = Number(searchParams.get('pageNumber') || 1)
  const searchQuery = searchParams.get('searchQuery') || ''
  const [species, setSpecies] = useState<Specie[]>([])
  const [isLoadingSpecies, setIsLoadingSpecies] = useState(true)
  const [totalPages, setTotalPages] = useState<number | null>(null)

  useEffect(() => {
    const fetchSpecies = async () => {
      const { data } = await birdFarmApi.get(
        `/api/species/pagination?pageSize=${pageSize}&pageNumber=${pageNumber}&searchQuery=${searchQuery}`
      )

      setSpecies(data?.species || [])
      setTotalPages(data?.totalPages || null)
      setIsLoadingSpecies(false)
    }

    fetchSpecies()
  }, [pageNumber, searchQuery])

  return (
    <main>
      <Container>
        <div className='flex justify-between items-center my-12'>
          <h1 className='text-3xl font-bold'>Các loài chim đang bán tại cửa hàng</h1>
        </div>

        {isLoadingSpecies ? (
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
            {Array(...new Array(12)).map(() => {
              return <SpecieCardSkeleton />
            })}
          </div>
        ) : (
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
            {species.map((specie) => {
              return <SpecieCard key={specie._id} specie={specie} />
            })}
          </div>
        )}

        {!!totalPages && (
          <Paginate
            className='mt-8'
            path={`/species?searchQuery=${searchQuery}`}
            pageSize={pageSize}
            pageNumber={pageNumber}
            totalPages={totalPages}
          />
        )}
      </Container>
    </main>
  )
}

export default SpecieList
