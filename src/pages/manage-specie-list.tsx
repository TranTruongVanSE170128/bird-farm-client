import Paginate from '@/components/paginate'
import SpecieCardSkeleton from '@/components/specie-card-skeleton'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Specie } from '@/lib/types'
import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import noImage from '@/assets/no-image.webp'
import { buttonVariants } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { addSearchParams, cn } from '@/lib/utils'
import { birdFarmApi } from '@/services/bird-farm-api'

const pageSize = 12

function ManageSpecieList() {
  const [searchParams] = useSearchParams()
  const pageNumber = Number(searchParams.get('pageNumber') || 1)
  const searchQuery = searchParams.get('searchQuery') || ''
  const [species, setSpecies] = useState<Specie[]>([])
  const [isLoadingSpecies, setIsLoadingSpecies] = useState(true)
  const [totalPages, setTotalPages] = useState<number | null>(null)

  useEffect(() => {
    const fetchSpecies = async () => {
      setIsLoadingSpecies(true)
      try {
        const { data } = await birdFarmApi.get(
          addSearchParams('/api/species/pagination', { pageNumber, pageSize, searchQuery })
        )
        setSpecies(data?.species || null)
        setIsLoadingSpecies(false)
        setTotalPages(data?.totalPages || null)
      } catch (error) {
        console.log(error)
      }
    }

    fetchSpecies()
  }, [pageNumber, searchQuery])

  if (!species) {
    return <div>Loading</div>
  }

  return (
    <main>
      <div className='flex items-center justify-between mb-6'>
        <div className='text-3xl font-bold'>Danh sách loài</div>
        <Link className={cn(buttonVariants(), 'mb-6 flex items-center gap-1 my-auto')} to='/manager/species/new'>
          <span>Tạo Loài</span>
          <Plus className='w-5 h-5' />
        </Link>
      </div>

      {isLoadingSpecies ? (
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
          {Array(...new Array(8)).map(() => {
            return <SpecieCardSkeleton />
          })}
        </div>
      ) : (
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
          {species.map((specie) => {
            return (
              <Link
                to={`/manager/species/${specie._id}`}
                className='overflow-hidden transition duration-300 outline-0 focus:border-2 hover:border-2 border-primary rounded-2xl'
              >
                <Card className='overflow-hidden border-2 rounded-2xl'>
                  <CardHeader className='p-0 mb-4'>
                    <div className='aspect-square'>
                      <img
                        src={specie?.imageUrl || noImage}
                        alt=''
                        className='object-fill w-full h-full transition-all duration-300 hover:scale-105'
                      />
                    </div>
                  </CardHeader>
                  <CardContent className='text-lg font-semibold text-center line-clamp-1'>{specie.name}</CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
      )}

      {!!totalPages && (
        <Paginate
          className='mt-8'
          path={`/manager/species?searchQuery=${searchQuery}`}
          pageSize={pageSize}
          pageNumber={pageNumber}
          totalPages={totalPages}
        />
      )}
    </main>
  )
}

export default ManageSpecieList
