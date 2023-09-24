import { Link, useNavigate, useParams } from 'react-router-dom'
import Ellipce from '@/assets/Ellipse2.png'
import { useEffect, useRef, useState } from 'react'
import { Bird, getDad, getMom, getSpecie } from '@/lib/types'
import Container from '@/components/ui/container'
import noImage from '@/assets/no-image.avif'
import { calculateAge, formatPrice } from '@/lib/utils'
import moment from 'moment'
import 'moment/locale/vi'
import medalIcon from '@/assets/medal.png'
import { birdFarmApi } from '@/services/bird-farm-api'
import maleIcon from '@/assets/male.svg'
import femaleIcon from '@/assets/female.svg'
import { Button } from '@/components/ui/button'
import { useCompareContext } from '@/contexts/compare-provider'
import { useBreedContext } from '@/contexts/breed-provider'
import { useCartContext } from '@/contexts/cart-provider'
import { useToast } from '@/components/ui/use-toast'
import Spinner from '@/components/ui/spinner'
import BirdCardSkeleton from '@/components/bird-card-skeleton'
import BirdCard from '@/components/bird-card'

function BirdDetail() {
  moment.locale('vi')
  const { id } = useParams()
  const [bird, setBird] = useState<Bird | null>(null)
  const navigate = useNavigate()
  const imageRef = useRef<HTMLImageElement | null>(null)
  const { addToCompare } = useCompareContext()
  const { addToBreed } = useBreedContext()
  const { addBirdToCart } = useCartContext()
  const { toast } = useToast()
  const [sameBirds, setSameBirds] = useState<Bird[]>([])
  const [isLoadingSameBirds, setIsLoadingSameBirds] = useState(true)

  const handleMouseEnter = (imageUrl: string) => {
    if (imageRef.current) {
      imageRef.current.src = imageUrl
    }
  }

  useEffect(() => {
    const fetchBird = async () => {
      try {
        const { data } = await birdFarmApi.get(`/api/birds/${id}`)

        setBird(data?.bird || null)
      } catch (error) {
        navigate('/not-found')
      }
    }

    fetchBird()
  }, [id, navigate])

  useEffect(() => {
    const fetchSameBirds = async () => {
      if (!bird) return

      const { data } = await birdFarmApi.get(
        `/api/birds/pagination?pageNumber=1&pageSize=8&type=${bird.type}&specie=${getSpecie(bird)._id}`
      )

      setSameBirds(data.birds || [])
      setIsLoadingSameBirds(false)
    }

    fetchSameBirds()
  }, [bird])

  if (!bird) {
    return <Spinner className='mt-12' />
  }

  return (
    <main className=' mt-8 container sm:flex-row transition-all '>
      <Container>
        <section className='grid grid-cols-12 gap-8 '>
          <div className='col-span-5'>
            <div>
              {!bird.imageUrls?.length ? (
                <img
                  ref={imageRef}
                  className='w-full h-full aspect-square object-cover rounded cursor-pointer'
                  src={noImage}
                  alt='bird'
                />
              ) : (
                <img
                  ref={imageRef}
                  className='w-full h-full aspect-square object-cover rounded cursor-pointer'
                  src={bird.imageUrls[0]}
                  alt='bird'
                />
              )}
            </div>
            <div className='grid grid-cols-5 mt-2 gap-2 flex-wrap w-full'>
              {bird.imageUrls?.map((imageUrl) => {
                return (
                  <img
                    onMouseEnter={() => {
                      handleMouseEnter(imageUrl)
                    }}
                    className='w-full h-full aspect-square object-cover rounded cursor-pointer'
                    src={imageUrl}
                    alt='bird'
                  />
                )
              })}
            </div>
          </div>

          <div className='col-span-7 text-lg px-4'>
            <div className='flex'>
              <div>
                <span className='font-medium'>Danh mục: </span>
                <span>
                  <Link
                    to={`/birds?specie=${getSpecie(bird)._id}`}
                    className='font-normal hover:text-primary hover:underline cursor-pointer ml-2'
                  >
                    {getSpecie(bird).name}
                  </Link>
                </span>
              </div>

              <div className='mx-5 font-bold'>|</div>

              <div className='flex items-center gap-2'>
                <div className='font-medium text-xl'>Loại chim:</div>
                <p>{bird.type === 'sell' ? 'Chim kiểng' : 'Chim phối giống'}</p>
              </div>
            </div>

            <h3 className='text-3xl font-semibold my-2'>{bird.name}</h3>

            <div className='flex gap-4 items-center'>
              <div className='flex items-center gap-2'>
                <div className='font-medium text-xl'>{bird.type === 'sell' ? 'Giá bán: ' : 'Giá phối giống: '}</div>
                <p className='text-3xl text-red-500 font-medium'>
                  {formatPrice(bird.type === 'sell' ? bird.sellPrice : bird.breedPrice)}
                </p>
              </div>

              <div className='flex items-start gap-2'>
                <div className='font-medium text-xl'>Giới tính: </div>
                {bird.gender === 'male' ? (
                  <div className='flex items-center mt-[2px]'>
                    Đực
                    <img className='w-6 h-6 ml-1' src={maleIcon} alt='' />
                  </div>
                ) : (
                  <div className='flex items-center mt-[2px]'>
                    Cái
                    <img className='w-6 h-6 ml-1' src={femaleIcon} alt='' />
                  </div>
                )}
              </div>
            </div>

            <div className='my-3 flex gap-8'>
              <div className='flex gap-4'>
                <div className='font-semibold '>Bố: </div>
                {getDad(bird) ? (
                  <Link
                    to={`/birds/${getDad(bird)._id}`}
                    className='font-normal text-primary hover:underline cursor-pointer'
                  >
                    {getDad(bird).name}
                  </Link>
                ) : (
                  <div>Không có thông tin</div>
                )}
              </div>
              <div className='flex gap-4'>
                <div className='font-semibold '>Mẹ: </div>
                {getMom(bird) ? (
                  <Link
                    to={`/birds/${getMom(bird)._id}`}
                    className='font-normal text-primary hover:underline cursor-pointer'
                  >
                    {getMom(bird).name}
                  </Link>
                ) : (
                  <div>Không có thông tin</div>
                )}
              </div>
            </div>

            <div className='flex-col'>
              <p>
                <span className='pr-4 font-medium'>Tuổi :</span> <span> {calculateAge(bird.birth)}</span>
              </p>
              <p className='my-3'>
                <span className='pr-1 font-medium'>Mô tả :</span>{' '}
                <span> {bird.description || 'Không có thông tin'} </span>
              </p>
            </div>

            <div className='font-medium mb-2'>
              Thành tích thi đấu: {!bird.achievements?.length && 'Không có thông tin'}
            </div>

            <div className='flex flex-col gap-2'>
              {bird?.achievements?.map((achievement) => {
                return (
                  <div className='flex items-center'>
                    <span className='pr-3'>
                      <img className='w-6' src={medalIcon}></img>
                    </span>
                    <span className='font-medium mr-1'>Hạng {achievement.rank}</span>
                    <span> {achievement.competition}</span>
                  </div>
                )
              })}
            </div>

            {bird.type === 'breed' ? (
              <div className='flex mt-8 gap-4'>
                <Button
                  onClick={() => {
                    addToCompare(bird)
                  }}
                  size='lg'
                  variant='outline'
                >
                  So sánh
                </Button>
                <Button
                  onClick={() => {
                    addToBreed(bird)
                  }}
                  size='lg'
                >
                  Phối giống
                </Button>
              </div>
            ) : (
              <div className='flex mt-8 gap-4'>
                <Button
                  onClick={() => {
                    addToCompare(bird)
                  }}
                  size='lg'
                  variant='outline'
                >
                  So sánh
                </Button>
                <Button
                  onClick={() => {
                    addBirdToCart(bird._id)
                    toast({
                      title: 'Đã thêm chim vào giỏ hàng',
                      variant: 'success'
                    })
                  }}
                  size='lg'
                  variant='outline'
                >
                  Thêm vào giỏ
                </Button>

                <Button onClick={() => {}} size='lg'>
                  Mua ngay
                </Button>
              </div>
            )}
          </div>
        </section>

        <div className='text-center flex flex-col gap-3 mt-7 items-center'>
          <h3 className='text-3xl uppercase font-bold'>gọi ngay cho trang trại</h3>
          <p>Để được tư vấn trực tiếp</p>
          <Button
            className='bg-yellow-300 py-8 gap-2 text rounded-full text-slate-500 hover:bg-yellow-300 hover:opacity-80'
            size='lg'
          >
            <img src={Ellipce} alt='' className='w-12 h-w-12' /> Hotline: 033233005
          </Button>
        </div>

        <div className='font-medium text-2xl my-4'>Sản phẩm tương tự</div>

        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
          {isLoadingSameBirds
            ? Array(...new Array(8)).map((_, index) => {
                return <BirdCardSkeleton key={index} />
              })
            : sameBirds?.map((bird) => {
                return <BirdCard key={bird._id} bird={bird} />
              })}
        </div>
      </Container>
    </main>
  )
}

export default BirdDetail
