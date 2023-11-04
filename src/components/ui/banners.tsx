import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules'
import { useEffect, useState } from 'react'
import { birdFarmApi } from '@/services/bird-farm-api'
import { ChevronLeft, ChevronRight } from 'lucide-react'

function Banners() {
  const [bannerUrls, setBannerUrls] = useState<string[]>([])

  useEffect(() => {
    const fetchMedia = async () => {
      const { data } = await birdFarmApi.get('/api/media')
      setBannerUrls(data.media.bannerUrls)
    }

    fetchMedia()
  }, [])
  return (
    <div className='overflow-hidden rounded-lg'>
      <div className='rounded-lg relative aspect-square md:aspect-[2.4/1] bg-cover mt-8 z-20'>
        <Swiper
          // install Swiper modules
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={50}
          slidesPerView={1}
          pagination={{ el: '.swiper-pagination-2', clickable: true }}
          navigation={{
            nextEl: '.swiper-button-next-2',
            prevEl: '.swiper-button-prev-2'
          }}
          scrollbar={{ draggable: true }}
          className='w-full h-full z-30 overflow-hidden rounded-lg'
        >
          {bannerUrls.map((bannerUrl) => {
            return (
              <SwiperSlide>
                <img className='w-full h-full object-cover' src={bannerUrl} />
              </SwiperSlide>
            )
          })}
        </Swiper>

        <div className='absolute left-0 z-40 p-2 -translate-x-1/4 -translate-y-1/2 swiper-button-prev-2 slider-arrow-2 top-1/2'>
          <ChevronLeft className='w-20 h-20 text-primary' />
        </div>
        <div className='absolute right-0 z-40 p-2 translate-x-1/4 -translate-y-1/2 swiper-button-next-2 slider-arrow-2 top-1/2'>
          <ChevronRight className='w-20 h-20 text-primary' />
        </div>
      </div>
    </div>
  )
}

export default Banners
