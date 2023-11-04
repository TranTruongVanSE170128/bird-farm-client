import BirdCard from '@/components/bird-card'
import SpecieCard from '@/components/specie-card'
import SpecieCardSkeleton from '@/components/specie-card-skeleton'
import { Button } from '@/components/ui/button'
import Container from '@/components/ui/container'
import { Bird, Specie } from '@/lib/types'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, EffectCoverflow } from 'swiper/modules'
import useWindowSize from '@/hooks/use-window-size'
import BirdCardSkeleton from '@/components/bird-card-skeleton'
import { birdFarmApi } from '@/services/bird-farm-api'
import Banners from '@/components/ui/banners'

function Home() {
  const [isLoadingSpecies, setIsLoadingSpecies] = useState(true)
  const [species, setSpecies] = useState<Specie[]>([])
  const [isLoadingBirds, setIsLoadingBirds] = useState(true)
  const [birdsSell, setBirdsSell] = useState<Bird[]>([])
  const [birdsBreed, setBirdsBreed] = useState<Bird[]>([])
  const { width } = useWindowSize()
  const speciesSection = useRef<HTMLHeadingElement>(null)

  const sliceSpeciePerView = useMemo(() => {
    if (width < 640) return 1
    else if (width < 768) return 2
    else if (width < 1024) return 3
    else return 4
  }, [width])

  useEffect(() => {
    const fetchSpecies = async () => {
      const { data } = await birdFarmApi.get('/api/species')

      setSpecies(data?.species || [])
      setIsLoadingSpecies(false)
    }

    fetchSpecies()
  }, [])

  useEffect(() => {
    const fetchBirdsSell = async () => {
      const { data } = await birdFarmApi.get('/api/birds/pagination?pageSize=8&pageNumber=1&type=sell')

      setBirdsSell(data?.birds || [])
      setIsLoadingBirds(false)
    }

    fetchBirdsSell()
  }, [])

  useEffect(() => {
    const fetchBirdsBreed = async () => {
      const { data } = await birdFarmApi.get('/api/birds/pagination?pageSize=8&pageNumber=1&type=breed')

      setBirdsBreed(data?.birds || [])
      setIsLoadingBirds(false)
    }

    fetchBirdsBreed()
  }, [])

  return (
    <Container>
      <Banners />

      <h1 ref={speciesSection} className='mt-8 mb-5 text-3xl font-bold text-center'>
        Các loài chim đang có tại cửa hàng
      </h1>
      <div className='relative'>
        <Swiper
          effect={'coverflow'}
          grabCursor={true}
          centeredSlides={true}
          loop={true}
          slidesPerView={sliceSpeciePerView}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 2.5
          }}
          pagination={{ el: '.swiper-pagination', clickable: true }}
          navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          }}
          modules={[EffectCoverflow, Pagination, Navigation]}
          spaceBetween={16}
          scrollbar={{ draggable: true }}
        >
          {isLoadingSpecies
            ? Array(...new Array(8)).map((_, index) => {
                return (
                  <SwiperSlide key={index}>
                    <SpecieCardSkeleton />
                  </SwiperSlide>
                )
              })
            : species?.map((specie) => {
                return (
                  <SwiperSlide key={specie._id}>
                    <SpecieCard specie={specie} />
                  </SwiperSlide>
                )
              })}
        </Swiper>

        <Button className='absolute left-0 z-40 p-2 -translate-x-1/2 -translate-y-1/2 rounded-full text-primary-foreground bg-primary swiper-button-prev slider-arrow top-1/2'>
          <ArrowLeft />
        </Button>
        <Button className='absolute right-0 z-40 p-2 translate-x-1/2 -translate-y-1/2 rounded-full text-primary-foreground bg-primary swiper-button-next slider-arrow top-1/2'>
          <ArrowRight />
        </Button>
      </div>

      <Link className='flex justify-center mt-6' to='/species'>
        <Button size='lg'>Xem tất cả</Button>
      </Link>

      <div className='flex items-center justify-between mt- mb-4'>
        <h1 className='text-3xl font-bold'>Chim kiểng đang bán tại cửa hàng</h1>
      </div>
      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
        {isLoadingBirds
          ? Array(...new Array(8)).map((_, index) => {
              return <BirdCardSkeleton key={index} />
            })
          : birdsSell?.map((bird) => {
              return <BirdCard key={bird._id} bird={bird} />
            })}
      </div>

      <Link className='flex justify-center mt-6' to='/birds?type=sell'>
        <Button size='lg'>Xem tất cả</Button>
      </Link>

      <div className='flex items-center justify-between mt-8 mb-4'>
        <h1 className='text-3xl font-bold'>Chim phối giống đang có tại cửa hàng</h1>
      </div>
      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
        {isLoadingBirds
          ? Array(...new Array(8)).map((_, index) => {
              return <BirdCardSkeleton key={index} />
            })
          : birdsBreed?.map((bird) => {
              return <BirdCard key={bird._id} bird={bird} />
            })}
      </div>

      <Link className='flex justify-center mt-6' to='/birds?type=breed'>
        <Button size='lg'>Xem tất cả</Button>
      </Link>
    </Container>
  )
}

export default Home
