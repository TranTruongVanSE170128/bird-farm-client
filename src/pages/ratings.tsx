import Container from '@/components/ui/container'
import avatarAlt from '@/assets/user.png'
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'
import { addSearchParams, calculateTime } from '@/lib/utils'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Rating, getBirds, getNests, getSpecie, getUser } from '@/lib/types'
import Paginate from '@/components/paginate'
import { birdFarmApi } from '@/services/bird-farm-api'
import moment from 'moment'
import Spinner from '@/components/ui/spinner'
import starFillIcon from '@/assets/star-fill.svg'
import greyBirdIcon from '@/assets/grey-bird.svg'
import noImage from '@/assets/no-image.webp'
import maleIcon from '@/assets/male.svg'
import femaleIcon from '@/assets/female.svg'
import birdIcon from '@/assets/bird-color.svg'
import nestIcon from '@/assets/nest-color.svg'
import breedIcon from '@/assets/breed.svg'
import redHeart from '@/assets/red-heart.svg'

const pageSize = 10
const buttons = [
  { label: 'Tất cả', value: '' },
  { label: '5 Sao', value: '5' },
  { label: '4 Sao', value: '4' },
  { label: '3 Sao', value: '3' },
  { label: '2 Sao', value: '2' },
  { label: '1 Sao', value: '1' }
] as const

function Ratings() {
  moment.locale('vi')
  const [searchParams] = useSearchParams()
  const pageNumber = Number(searchParams.get('pageNumber') || 1)
  const selectedValue = Number(searchParams.get('value')) || ''
  const [ratings, setRatings] = useState<Rating[]>([])
  const [isLoadingRatings, setIsLoadingRatings] = useState(true)
  const [totalPages, setTotalPages] = useState<number | null>(null)
  const [averageRatings, setAverageRatings] = useState<number>(5)
  const navigate = useNavigate()

  useEffect(() => {
    console.log(ratings.map((r) => r.order))
  }, [ratings])

  useEffect(() => {
    const fetchRatings = async () => {
      setIsLoadingRatings(true)
      const { data } = await birdFarmApi.get(
        addSearchParams('/api/ratings/pagination', { pageNumber, pageSize, value: selectedValue || undefined })
      )
      setRatings(data?.ratings || [])
      setTotalPages(data?.totalPages || null)
      setIsLoadingRatings(false)
    }

    fetchRatings()
  }, [pageNumber, selectedValue])

  useEffect(() => {
    const fetchAverageRatings = async () => {
      const { data } = await birdFarmApi.get('/api/ratings/average')
      setAverageRatings(data?.average || null)
    }

    fetchAverageRatings()
  }, [])

  const handleButtonClick = (value: string) => {
    navigate(`/ratings?value=${value}`)
  }
  return (
    <main className=''>
      <Container>
        <h1 className='my-12 text-3xl font-semibold text-center '>Đánh giá và Nhận xét</h1>

        <div className='flex items-center justify-start p-4 mb-4 rounded-sm bg-muted'>
          <div className='mx-10'>
            <span className='mx-4 text-4xl font-medium'>{averageRatings?.toFixed(1) || 0}</span>
            <span className='text-2xl font-medium'>/ 5</span>
            <div className='flex my-2'>
              <svg viewBox='0 0 1000 200' className='mb-0'>
                <defs>
                  <polygon id='star' points='100,0 131,66 200,76 150,128 162,200 100,166 38,200 50,128 0,76 69,66' />
                  <clipPath id='stars'>
                    <use xlinkHref='#star' />
                    <use xlinkHref='#star' x='20%' />
                    <use xlinkHref='#star' x='40%' />
                    <use xlinkHref='#star' x='60%' />
                    <use xlinkHref='#star' x='80%' />
                  </clipPath>
                </defs>

                <rect className='w-full h-full fill-slate-300' clipPath='url(#stars)' />

                <rect width={averageRatings * 20 + '%'} className='fill-[#eab308] h-full' clipPath='url(#stars)' />
              </svg>
            </div>
          </div>

          <div className='flex gap-3'>
            {buttons.map((button) => (
              <Button
                key={button.value}
                onClick={() => handleButtonClick(button.value)}
                variant={selectedValue.toString() === button.value ? 'default' : 'outline'}
                className='text-base border border-primary'
              >
                {button.label}
              </Button>
            ))}
          </div>
        </div>

        {isLoadingRatings && <Spinner />}

        {!isLoadingRatings && !ratings.length && (
          <div className='flex justify-center items-center w-full h-[400px] bg-accent mt-4'>
            <div className='flex flex-col items-center justify-center col-span-1 mt-12 text-lg font-medium'>
              Chưa có đánh giá nào <img src={greyBirdIcon} className='w-24 h-24 mt-4' />
            </div>
          </div>
        )}

        {!isLoadingRatings &&
          ratings.map((rating) => {
            return (
              <div className='flex justify-center mb-4 bg-muted'>
                <div className='w-full p-4 cursor-pointer mx-10'>
                  <div className='flex items-center justify-between mb-4'>
                    <div className='flex items-center'>
                      <div className='w-10 h-10 mr-2 overflow-hidden rounded-full'>
                        <img
                          className='object-cover w-full h-full'
                          src={getUser(rating).imageUrl || avatarAlt}
                          alt='Profile Image'
                        />
                      </div>

                      <div className=''>
                        <strong className='mr-2 text-lg '>{getUser(rating).name}</strong>
                        <span className='text-lg'> {calculateTime(rating.createdAt)}</span>
                      </div>
                    </div>

                    <div className='flex'>
                      {Array(rating.value)
                        .fill(null)
                        .map((_, index) => {
                          return <img key={index} src={starFillIcon} className='w-7 h-7' />
                        })}
                    </div>
                  </div>

                  <div className='text-xl text-foreground'>{rating.content}</div>

                  <div className='flex mt-2'>
                    {!!rating.imageUrls?.length && (
                      <img
                        className='object-cover w-24 rounded cursor-pointer aspect-square'
                        src={rating.imageUrls[0]}
                        alt='rating'
                      />
                    )}
                  </div>

                  {rating.order && (
                    <>
                      <div className='text-lg font-medium mb-2'>Sản phẩm đã mua:</div>

                      <div className='flex flex-wrap gap-4'>
                        {getBirds(rating.order).map((bird) => (
                          <div className='flex items-center gap-4 bg-card p-2 rounded-lg'>
                            <img
                              className='object-cover w-20 border rounded-md cursor-pointer aspect-square'
                              src={bird.imageUrls?.[0] || noImage}
                              alt='bird'
                            />

                            <div>
                              <p className='font-semibold text-center md:text-left'>{bird.name}</p>
                              <p className='flex items-center'>
                                Loài: {getSpecie(bird).name}
                                {bird.gender === 'male' ? (
                                  <img className='w-6 h-6 ml-1' src={maleIcon} alt='' />
                                ) : (
                                  <img className='w-6 h-6 ml-1' src={femaleIcon} alt='' />
                                )}
                              </p>
                              <p className='flex items-center'>
                                Phân loại: Chim kiểng <img src={birdIcon} className='w-5 h-5 ml-1' />
                              </p>
                            </div>
                          </div>
                        ))}
                        {getNests(rating.order).map((nest) => (
                          <div className='flex items-center gap-4 bg-card p-2 rounded-lg'>
                            <img
                              className='object-cover w-20 border rounded-md cursor-pointer aspect-square'
                              src={nest.imageUrls?.[0] || noImage}
                              alt='nest'
                            />

                            <div>
                              <p className='font-semibold text-center md:text-left'>{nest.name}</p>
                              <p className='flex items-center'>Loài: {getSpecie(nest).name}</p>
                              <p className='flex items-center'>
                                Phân loại: Tổ chim non <img src={nestIcon} className='w-5 h-5 ml-1' />
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                  {rating.orderNest && (
                    <>
                      <div className='text-lg font-medium mb-2'>Đặt tổ chim non:</div>

                      <div className='flex flex-wrap gap-4 items-center'>
                        <div className='flex items-center gap-4 bg-card p-2 rounded-lg'>
                          <img
                            className='object-cover w-20 border rounded-md cursor-pointer aspect-square'
                            src={rating.orderNest.dad.imageUrls?.[0] || noImage}
                            alt='rating.orderNest.dad'
                          />

                          <div>
                            <p className='font-semibold text-center md:text-left'>{rating.orderNest.dad.name}</p>
                            <p className='flex items-center'>
                              Loài: {getSpecie(rating.orderNest.dad).name}
                              <img className='w-6 h-6 ml-1' src={maleIcon} alt='' />
                            </p>
                            <p className='flex items-center'>
                              Phân loại: Chim phối giống <img src={breedIcon} className='w-5 h-5 ml-1' />
                            </p>
                          </div>
                        </div>

                        <img src={redHeart} className='w-12 h-12' />

                        <div className='flex items-center gap-4 bg-card p-2 rounded-lg'>
                          <img
                            className='object-cover w-20 border rounded-md cursor-pointer aspect-square'
                            src={rating.orderNest.mom.imageUrls?.[0] || noImage}
                            alt='rating.orderNest.mom'
                          />

                          <div>
                            <p className='font-semibold text-center md:text-left'>{rating.orderNest.mom.name}</p>
                            <p className='flex items-center'>
                              <img className='w-6 h-6 ml-1' src={femaleIcon} alt='' />
                            </p>
                            <p className='flex items-center'>
                              Phân loại: Chim phối giống <img src={breedIcon} className='w-5 h-5 ml-1' />
                            </p>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )
          })}

        {!!totalPages && (
          <Paginate
            className='mt-8'
            path={addSearchParams('/ratings', { value: selectedValue || undefined })}
            pageSize={pageSize}
            pageNumber={pageNumber}
            totalPages={totalPages}
          />
        )}
      </Container>
    </main>
  )
}

export default Ratings
