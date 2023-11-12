import { Link, useNavigate, useParams } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import { Bird, getDad, getMom, getSpecie } from '@/lib/types'
import Container from '@/components/ui/container'
import noImage from '@/assets/no-image.webp'
import { calculateAge, formatPrice } from '@/lib/utils'
import medalIcon from '@/assets/medal.png'
import { birdFarmApi } from '@/services/bird-farm-api'
import maleIcon from '@/assets/male.svg'
import femaleIcon from '@/assets/female.svg'
import { Button } from '@/components/ui/button'
import { useCartContext } from '@/contexts/cart-provider'
import { useToast } from '@/components/ui/use-toast'
import Spinner from '@/components/ui/spinner'
import BirdCardSkeleton from '@/components/bird-card-skeleton'
import BirdCard from '@/components/bird-card'
import { useCompareStore } from '@/store/use-compare'
import { useBreedStore } from '@/store/use-breed'
import compareIcon from '@/assets/compare.svg'
import { ShoppingCart } from 'lucide-react'
import { useAuthContext } from '@/contexts/auth-provider'

function BirdDetail() {
  const { id } = useParams()
  const [bird, setBird] = useState<Bird | null>(null)
  const navigate = useNavigate()
  const imageRef = useRef<HTMLImageElement | null>(null)
  const { addToCompare } = useCompareStore()
  const { addToBreed } = useBreedStore()
  const { addBirdToCart } = useCartContext()
  const { toast } = useToast()
  const [sameBirds, setSameBirds] = useState<Bird[]>([])
  const [isLoadingSameBirds, setIsLoadingSameBirds] = useState(true)
  const { user } = useAuthContext()

  const handleMouseEnter = (imageUrl: string) => {
    if (imageRef.current) {
      imageRef.current.src = imageUrl
    }
  }

  useEffect(() => {
    const fetchBird = async () => {
      setIsLoadingSameBirds(true)
      try {
        const { data } = await birdFarmApi.get(`/api/birds/${id}`)

        setBird(data?.bird || null)
      } catch (error) {
        navigate('/not-found')
      }
      setIsLoadingSameBirds(false)
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

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [id])

  if (isLoadingSameBirds || !bird) {
    return <Spinner className='mt-12' />
  }

  return (
    <main className='container mt-8 transition-all sm:flex-row'>
      <Container>
        <section className='grid grid-cols-12 gap-8 '>
          <div className='col-span-5'>
            <div>
              <img
                ref={imageRef}
                className='object-cover w-full h-full border rounded cursor-pointer aspect-square'
                src={bird?.imageUrls?.[0] || noImage}
                alt='bird'
              />
            </div>
            <div className='grid flex-wrap w-full grid-cols-5 gap-2 mt-2'>
              {bird.imageUrls?.map((imageUrl) => {
                return (
                  <img
                    onMouseEnter={() => {
                      handleMouseEnter(imageUrl)
                    }}
                    className='object-cover w-full h-full rounded cursor-pointer aspect-square'
                    src={imageUrl}
                    alt='bird'
                  />
                )
              })}
            </div>
          </div>

          <div className='col-span-7 px-4 text-lg'>
            <div className='flex'>
              <div>
                <span className='font-medium'>Danh mục: </span>
                <span>
                  <Link
                    to={`/birds?specie=${getSpecie(bird)._id}`}
                    className='ml-2 font-normal cursor-pointer hover:text-primary hover:underline'
                  >
                    {getSpecie(bird).name}
                  </Link>
                </span>
              </div>

              <div className='mx-5 font-bold'>|</div>

              <div className='flex items-center gap-2'>
                <div className='text-xl font-medium'>Loại chim:</div>
                <p>{bird.type === 'sell' ? 'Chim kiểng' : 'Chim phối giống'}</p>
              </div>
            </div>

            <h3 className='my-2 text-3xl font-semibold'>{bird.name}</h3>

            <div className='flex items-center gap-4'>
              <div className='flex items-center gap-2'>
                <div className='text-xl font-medium'>{bird.type === 'sell' ? 'Giá bán: ' : 'Giá phối giống: '}</div>
                <p className='text-3xl font-medium text-primary'>
                  {formatPrice(bird.type === 'sell' ? bird.sellPrice : bird.breedPrice)}
                </p>
              </div>

              <div className='flex items-start gap-2'>
                <div className='text-xl font-medium'>Giới tính: </div>
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

            <div className='flex gap-8 my-3'>
              <div className='flex gap-4'>
                <div className='font-semibold '>Bố: </div>
                {getDad(bird) ? (
                  <Link
                    to={`/birds/${getDad(bird)._id}`}
                    className='font-normal cursor-pointer text-primary hover:underline'
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
                    className='font-normal cursor-pointer text-primary hover:underline'
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

            <div className='mb-2 font-medium'>
              Thành tích thi đấu: {!bird.achievements?.length && 'Không có thông tin'}
            </div>

            <div className='flex flex-col gap-2'>
              {bird?.achievements?.map((achievement) => {
                return (
                  <div className='flex items-center'>
                    <span className='pr-3'>
                      <img className='w-6' src={medalIcon}></img>
                    </span>
                    <span className='mr-1 font-medium'>Hạng {achievement.rank}</span>
                    <span> {achievement.competition}</span>
                  </div>
                )
              })}
            </div>

            {bird.type === 'breed' ? (
              <div className='flex gap-4 mt-8'>
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
              <div className='flex gap-4 mt-8'>
                <Button
                  onClick={() => {
                    addToCompare(bird)
                  }}
                  size='lg'
                  variant='outline'
                >
                  <img src={compareIcon} className='w-5 h-5 mr-1 dark:filter dark:invert' />
                  So sánh
                </Button>
                <Button
                  onClick={() => {
                    if (user?.role !== 'customer' && user?.role !== 'guest') {
                      toast({
                        variant: 'destructive',
                        title: 'Bạn không có quyền thêm chim vào giỏ hàng!',
                        duration: 2500
                      })
                      return
                    }
                    addBirdToCart(bird._id)
                    toast({
                      title: 'Đã thêm chim vào giỏ hàng',
                      variant: 'success'
                    })
                  }}
                  size='lg'
                >
                  <ShoppingCart className='mr-1' />
                  Thêm vào giỏ
                </Button>
              </div>
            )}
          </div>
        </section>

        {/* <div className='flex flex-col items-center gap-3 text-center mt-7'>
          <h3 className='text-3xl font-bold uppercase'>gọi ngay cho trang trại</h3>
          <p>Để được tư vấn trực tiếp</p>
          <Button
            className='gap-2 py-8 bg-yellow-300 rounded-full text text-slate-500 hover:bg-yellow-300 hover:opacity-80'
            size='lg'
          >
            <img src={Ellipce} alt='' className='w-12 h-w-12' /> Hotline: 033233005
          </Button>
        </div> */}

        <div className='my-4 text-2xl font-medium'>Sản phẩm tương tự</div>

        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
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
