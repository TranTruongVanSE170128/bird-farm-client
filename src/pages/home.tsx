import BirdCard from '@/components/bird-card'
import SpecieCard from '@/components/specie-card'
import SpecieCardSkeleton from '@/components/specie-card-skeleton'
import { Button } from '@/components/ui/button'
import Container from '@/components/ui/container'
import { Bird, Specie } from '@/lib/types'
import axios from 'axios'
import { ArrowLeft, ArrowRight, ShoppingBag } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, EffectCoverflow } from 'swiper/modules'
import useWindowSize from '@/hooks/use-window-size'
import BirdCardSkeleton from '@/components/bird-card-skeleton'
import Footer from '@/components/footer'

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
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/species?pageSize=8&pageNumber=1`)

      setSpecies(data?.species || [])
      setIsLoadingSpecies(false)
    }

    fetchSpecies()
  }, [])

  useEffect(() => {
    const fetchSpecies = async () => {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/birds?pageSize=8&pageNumber=1`)

      setBirds(data?.birds || [])
      setIsLoadingBirds(false)
    }

    fetchSpecies()
  }, [])

  return (
    <Container>
      <div className='rounded-lg overflow-hidden'>
        <div
          style={{ backgroundImage: `url(https://images.alphacoders.com/774/thumb-1920-774587.jpg)` }}
          className='rounded-lg relative aspect-square md:aspect-[2.4/1] overflow-hidden bg-cover mt-8'
        >
          <div className='h-full w-full flex flex-col justify-center items-center text-center gap-y-8'>
            <div className='font-bold text-3xl sm:text-5xl lg:text-6xl sm:max-w-xl max-w-xs text-foreground bg-background/70 p-4 rounded-lg'>
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

      <h1 ref={speciesSection} className='text-3xl font-bold mt-8 mb-5 text-center'>
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
          onSwiper={(swiper) => console.log(swiper)}
          onSlideChange={() => console.log('slide change')}
        >
          {isLoadingSpecies
            ? Array(...new Array(8)).map(() => {
                return (
                  <SwiperSlide>
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

        <Button className='p-2 text-primary-foreground bg-primary rounded-full swiper-button-prev slider-arrow absolute left-0 top-1/2 -translate-y-1/2 z-40 -translate-x-1/2'>
          <ArrowLeft />
        </Button>
        <Button className='p-2 text-primary-foreground bg-primary rounded-full swiper-button-next slider-arrow absolute right-0 top-1/2 -translate-y-1/2 z-40 translate-x-1/2'>
          <ArrowRight />
        </Button>
      </div>

      <Link className='mt-6 flex justify-center' to='/species'>
        <Button size='lg'>Xem tất cả</Button>
      </Link>

      <div className='flex justify-between items-center mt-8 mb-4'>
        <h1 className='text-3xl font-bold'>Chim đang bán tại cửa hàng</h1>

        <Link to='/birds' className='text-xl underline text-primary font-bold'>
          Xem thêm
        </Link>
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
        {isLoadingBirds
          ? Array(...new Array(8)).map(() => {
              return <BirdCardSkeleton />
            })
          : birds?.map((bird) => {
              return <BirdCard key={bird._id} bird={bird} />
            })}
      </div>

      <Link className='mt-6 flex justify-center' to='/birds'>
        <Button size='lg'>Xem tất cả</Button>
      </Link>

      <Footer />  

    </Container>
  )
}

export default Home
