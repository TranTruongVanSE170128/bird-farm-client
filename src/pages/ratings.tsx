import Container from '@/components/ui/container'
import avatarAlt from '@/assets/user.png'
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'
import { addSearchParams, calculateTime } from '@/lib/utils'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Rating, getUser } from '@/lib/types'
import Paginate from '@/components/paginate'
import { birdFarmApi } from '@/services/bird-farm-api'
import moment from 'moment'
import Spinner from '@/components/ui/spinner'
import starFillIcon from '@/assets/star-fill.svg'

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
        <h1 className=' text-3xl my-12 font-semibold text-center'>Đánh giá và Nhận xét</h1>

        <div className='flex justify-start items-center border rounded-sm mb-4 p-4'>
          <div className='mx-10'>
            <span className='font-medium text-4xl mx-4'>{averageRatings?.toFixed(1) || 0}</span>
            <span className='font-medium text-2xl'>/ 5</span>
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

                <rect className='fill-slate-300 w-full h-full' clipPath='url(#stars)' />

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
                className='border border-primary text-base'
              >
                {button.label}
              </Button>
            ))}
          </div>
        </div>

        {isLoadingRatings && <Spinner />}

        {!isLoadingRatings &&
          ratings.map((rating) => {
            return (
              <div className='flex justify-center border mb-4'>
                <div className='p-4 cursor-pointer w-full '>
                  <div className='flex justify-between items-center mb-4 mx-10'>
                    <div className='flex items-center'>
                      <div className='w-10 h-10 rounded-full overflow-hidden mr-2'>
                        <img
                          className='w-full h-full object-cover'
                          src={getUser(rating).imageUrl || avatarAlt}
                          alt='Profile Image'
                        />
                      </div>

                      <div className=''>
                        <strong className='text-lg mr-2 '>{getUser(rating).name}</strong>
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

                  <div className='text-foreground text-xl mx-10'>{rating.content}</div>

                  <div className='flex mt-2 mx-10'>
                    {!!rating.imageUrls?.length && (
                      <img
                        className='w-24 aspect-square object-cover rounded cursor-pointer'
                        src={rating.imageUrls[0]}
                        alt='rating'
                      />
                    )}
                  </div>
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
