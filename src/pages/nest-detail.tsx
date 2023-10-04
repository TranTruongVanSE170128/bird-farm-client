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

function NestDetail() {
  const imageRef = useRef<HTMLImageElement | null>(null)
  const { addNestToCart } = useCartContext()
  const { toast } = useToast()
  const { id } = useParams()
  const [nest, setNest] = useState<Nest | null>(null)

  const [sameNests, setSameNests] = useState<Nest[]>([])
  const [isLoadingSameNests, setIsLoadingSameNests] = useState(true)

  const handleMouseEnter = (imageUrl: string) => {
    if (imageRef.current) {
      imageRef.current.src = imageUrl
    }
  }

  useEffect(() => {
    const fetchNest = async () => {
      const { data } = await birdFarmApi.get(`/api/nests/${id}`)

      setNest(data.nest || null)
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

  if (!nest) {
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
                className='w-full h-full aspect-square object-cover rounded-md border cursor-pointer'
                src={nest?.imageUrls?.[0] || noImage}
                alt='nest'
              />
            </div>
            <div className='grid grid-cols-5 mt-2 gap-2 flex-wrap w-full'>
              {nest.imageUrls?.map((imageUrl) => {
                return (
                  <img
                    onMouseEnter={() => {
                      handleMouseEnter(imageUrl)
                    }}
                    className='w-full h-full aspect-square object-cover rounded cursor-pointer'
                    src={imageUrl}
                    alt='nest'
                  />
                )
              })}
            </div>
          </div>

          <div className='col-span-7 text-lg px-4'>
            <h3 className='text-3xl font-semibold my-2'>{nest.name}</h3>

            <div className='mt-4'>
              <span className='font-medium'>Danh mục: </span>
              <span>
                <Link
                  to={`/nests?specie=${getSpecie(nest)._id}`}
                  className='font-normal hover:text-primary hover:underline cursor-pointer ml-2'
                >
                  Tổ {getSpecie(nest).name}
                </Link>
              </span>
            </div>

            <div className='flex gap-12 my-4'>
              <div className='flex items-center gap-2 text-lg'>
                <div className='font-medium'>Chim Bố:</div>{' '}
                {nest.dad ? (
                  <Link className='hover:underline hover:text-primary' to={`/birds/${nest.dad._id}`}>
                    {nest.dad.name}
                  </Link>
                ) : (
                  'Không có thông tin'
                )}
              </div>

              <div className='flex items-center gap-2 text-lg'>
                <div className='font-medium'>Chim Mẹ:</div>{' '}
                {nest.mom?._id ? (
                  <Link className='hover:underline hover:text-primary' to={`/birds/${nest.mom._id}`}>
                    {nest.mom.name}
                  </Link>
                ) : (
                  'Không có thông tin'
                )}
              </div>
            </div>

            <div className='flex items-center gap-2'>
              <div className='font-medium text-xl'>Giá: </div>
              <p className='text-3xl text-red-500 font-medium'>{formatPrice(nest.price)}</p>
            </div>

            <p className='my-3 mb-6'>
              <span className='pr-1 font-medium text-xl'>Mô tả :</span>{' '}
              <span> {nest.description || 'Không có thông tin'} </span>
            </p>

            <div className='flex gap-4 my-6 mt-10'>
              <Button
                className='text-lg'
                onClick={() => {
                  addNestToCart(nest._id)
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

              <Button className='text-lg' onClick={() => {}} size='lg'>
                Mua ngay
              </Button>
            </div>
          </div>
        </section>
        {/* <div className='text-center flex flex-col gap-3 mt-7 items-center'>
          <h3 className='text-3xl uppercase font-bold'>gọi ngay cho trang trại</h3>
          <p>Để được tư vấn trực tiếp</p>
          <Button
            className='bg-yellow-300 py-8 gap-2 text rounded-full text-slate-500 hover:bg-yellow-300 hover:opacity-80'
            size='lg'
          >
            <img src={Ellipce} alt='' className='w-12 h-w-12' /> Hotline: 033233005
          </Button>
        </div> */}

        <div className='font-medium text-2xl my-4'>Sản phẩm tương tự</div>

        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
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
