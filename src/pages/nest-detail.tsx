import Container from '@/components/ui/container'
import { useEffect, useRef, useState } from 'react'
import noImage from '@/assets/no-image.webp'
import { formatPrice } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { useCartContext } from '@/contexts/cart-provider'
import { useToast } from '@/components/ui/use-toast'
import { Nest, getSpecie } from '@/lib/types'
import { birdFarmApi } from '@/services/bird-farm-api'
import { Link, useParams } from 'react-router-dom'
import Spinner from '@/components/ui/spinner'
import NestCardSkeleton from '@/components/nest-card-skeleton'
import NestCard from '@/components/nest-card'
import { ShoppingCart } from 'lucide-react'
import { useAuthContext } from '@/contexts/auth-provider'

function NestDetail() {
  const imageRef = useRef<HTMLImageElement | null>(null)
  const { addNestToCart } = useCartContext()
  const { toast } = useToast()
  const { id } = useParams()
  const [nest, setNest] = useState<Nest | null>(null)
  const { user } = useAuthContext()
  const [sameNests, setSameNests] = useState<Nest[]>([])
  const [isLoadingSameNests, setIsLoadingSameNests] = useState(true)

  const handleMouseEnter = (imageUrl: string) => {
    if (imageRef.current) {
      imageRef.current.src = imageUrl
    }
  }

  useEffect(() => {
    setIsLoadingSameNests(true)
    const fetchNest = async () => {
      const { data } = await birdFarmApi.get(`/api/nests/${id}`)

      setNest(data.nest || null)
      setIsLoadingSameNests(false)
    }

    fetchNest()
  }, [id])

  useEffect(() => {
    const fetchSameNests = async () => {
      if (!nest) return

      const { data } = await birdFarmApi.get(
        `/api/nests/pagination?pageNumber=1&pageSize=8&specie=${getSpecie(nest)._id}`
      )

      setSameNests(data.nests || [])
      setIsLoadingSameNests(false)
    }

    fetchSameNests()
  }, [nest])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [id])

  if (isLoadingSameNests || !nest) {
    return <Spinner className='mt-12' />
  }

  return (
    <main>
      <Container>
        <section className='grid grid-cols-12 gap-8 mt-10'>
          <div className='col-span-5'>
            <div>
              <img
                ref={imageRef}
                className='object-cover w-full h-full border rounded-md cursor-pointer aspect-square'
                src={nest?.imageUrls?.[0] || noImage}
                alt='nest'
              />
            </div>
            <div className='grid flex-wrap w-full grid-cols-5 gap-2 mt-2'>
              {nest.imageUrls?.map((imageUrl) => {
                return (
                  <img
                    onMouseEnter={() => {
                      handleMouseEnter(imageUrl)
                    }}
                    className='object-cover w-full h-full rounded cursor-pointer aspect-square'
                    src={imageUrl}
                    alt='nest'
                  />
                )
              })}
            </div>
          </div>

          <div className='col-span-7 px-4 text-lg'>
            <h3 className='my-2 text-3xl font-semibold'>{nest.name}</h3>

            <div className='mt-4'>
              <span className='font-medium'>Danh mục: </span>
              <span>
                <Link
                  to={`/nests?specie=${getSpecie(nest)._id}`}
                  className='ml-2 font-normal cursor-pointer hover:text-primary hover:underline'
                >
                  Tổ {getSpecie(nest).name}
                </Link>
              </span>
            </div>

            <div className='flex gap-12 my-4'>
              <div className='flex items-center gap-2 text-lg'>
                <div className='font-medium'>Chim Bố:</div>{' '}
                {nest.dad ? (
                  <Link className='hover:underline text-primary' to={`/birds/${nest.dad._id}`}>
                    {nest.dad.name}
                  </Link>
                ) : (
                  'Không có thông tin'
                )}
              </div>

              <div className='flex items-center gap-2 text-lg'>
                <div className='font-medium'>Chim Mẹ:</div>{' '}
                {nest.mom?._id ? (
                  <Link className='hover:underline text-primary' to={`/birds/${nest.mom._id}`}>
                    {nest.mom.name}
                  </Link>
                ) : (
                  'Không có thông tin'
                )}
              </div>
            </div>

            <div className='flex items-center gap-2'>
              <div className='text-xl font-medium'>Giá: </div>
              <p className='text-3xl font-medium text-primary'>{formatPrice(nest.price)}</p>
            </div>

            <p className='my-3 mb-6'>
              <span className='pr-1 text-xl font-medium'>Mô tả :</span>{' '}
              <span> {nest.description || 'Không có thông tin'} </span>
            </p>

            <div className='flex gap-4 my-6 mt-10'>
              <Button
                onClick={() => {
                  if (user?.role !== 'customer' && user?.role !== 'guest') {
                    toast({
                      variant: 'destructive',
                      title: 'Bạn không có quyền thêm tổ chim vào giỏ hàng!',
                      duration: 2500
                    })
                    return
                  }
                  addNestToCart(nest._id)
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
          {isLoadingSameNests
            ? Array(...new Array(8)).map((_, index) => {
                return <NestCardSkeleton key={index} />
              })
            : sameNests?.map((nest) => {
                return <NestCard key={nest._id} nest={nest} />
              })}
        </div>
      </Container>
    </main>
  )
}

export default NestDetail
