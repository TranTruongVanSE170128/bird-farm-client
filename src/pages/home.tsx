import BirdCard from '@/components/bird-card'
import SpecieCard from '@/components/specie-card'
import SpecieCardSkeleton from '@/components/specie-card-skeleton'
import { Button } from '@/components/ui/button'
import Container from '@/components/ui/container'
import { Bird, Specie } from '@/lib/types'
import { ArrowLeft, ArrowRight, ShoppingBag } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, EffectCoverflow } from 'swiper/modules'
import useWindowSize from '@/hooks/use-window-size'
import BirdCardSkeleton from '@/components/bird-card-skeleton'
import { birdFarmApi } from '@/services/bird-farm-api'

function Home() {
  const [isLoadingSpecies, setIsLoadingSpecies] = useState(true)
  const [species, setSpecies] = useState<Specie[]>([])
  const [isLoadingBirds, setIsLoadingBirds] = useState(true)
  const [birds, setBirds] = useState<Bird[]>([])
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
      const { data } = await birdFarmApi.get('/api/species/pagination?pageSize=8&pageNumber=1')

      setSpecies(data?.species || [])
      setIsLoadingSpecies(false)
    }

    fetchSpecies()
  }, [])

  useEffect(() => {
    const fetchSpecies = async () => {
      const { data } = await birdFarmApi.get('/api/birds/pagination?pageSize=8&pageNumber=1')

      setBirds(data?.birds || [])
      setIsLoadingBirds(false)
    }

    fetchSpecies()
  }, [])

  return (
    <Container>
      <div className='overflow-hidden rounded-lg'>
        <div
          style={{ backgroundImage: `url(https://images.alphacoders.com/774/thumb-1920-774587.jpg)` }}
          className='rounded-lg relative aspect-square md:aspect-[2.4/1] overflow-hidden bg-cover mt-8'
        >
          <div className='flex flex-col items-center justify-center w-full h-full text-center gap-y-8'>
            <div className='max-w-xs p-4 text-3xl font-bold rounded-lg sm:text-5xl lg:text-6xl sm:max-w-xl text-foreground bg-background/70'>
              Bird Farm
              <Button
                onClick={() => {
                  speciesSection.current?.scrollIntoView({
                    behavior: 'smooth'
                  })
                }}
                size='lg'
                className='w-full py-6 text-xl'
              >
                <ShoppingBag className='mr-2' />
                Shop Now
              </Button>
            </div>
          </div>
        </div>
      </div>

      <h1 ref={speciesSection} className='mt-8 mb-5 text-3xl font-bold text-center'>
        Các loài chim bán chạy
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

      <div className='flex items-center justify-between mt-8 mb-4'>
        <h1 className='text-3xl font-bold'>Chim đang bán tại cửa hàng</h1>

        <Link to='/birds' className='text-xl font-bold underline text-primary'>
          Xem thêm
        </Link>
      </div>
      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
        {isLoadingBirds
          ? Array(...new Array(8)).map((_, index) => {
              return <BirdCardSkeleton key={index} />
            })
          : birds?.map((bird) => {
              return <BirdCard key={bird._id} bird={bird} />
            })}
      </div>

      <Link className='flex justify-center mt-6' to='/birds'>
        <Button size='lg'>Xem tất cả</Button>
      </Link>
    </Container>
  )
}

export default Home
