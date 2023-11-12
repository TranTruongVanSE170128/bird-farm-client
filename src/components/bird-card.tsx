import { Link } from 'react-router-dom'
import { Card, CardContent, CardFooter, CardHeader } from './ui/card'
import { cn, formatPrice } from '@/lib/utils'
import { Button } from './ui/button'
import { Bird } from '@/lib/types'
import noImage from '@/assets/no-image.webp'
import { useToast } from './ui/use-toast'
import { useCartContext } from '@/contexts/cart-provider'
import maleIcon from '@/assets/male.svg'
import femaleIcon from '@/assets/female.svg'
import breedIcon from '@/assets/breed.svg'
import birdIcon from '@/assets/bird-color.svg'
import { useCompareStore } from '@/store/use-compare'
import { useBreedStore } from '@/store/use-breed'
import { useAuthContext } from '@/contexts/auth-provider'

type Props = {
  className?: string
  bird: Bird
}

function BirdCard({ className, bird }: Props) {
  const { addBirdToCart } = useCartContext()
  const { addToCompare } = useCompareStore()
  const { addToBreed } = useBreedStore()
  const { user } = useAuthContext()

  const { toast } = useToast()

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
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
      variant: 'success',
      title: 'Đã thêm chim vào giỏ hàng!',
      duration: 2500
    })
  }

  return (
    <Link
      to={`/birds/${bird?._id}`}
      className={cn('focus:ring-2 rounded-lg hover:ring-2 ring-primary transition duration-300', className)}
    >
      <Card className='overflow-hidden border-2'>
        <CardHeader className='p-0 mb-4'>
          <div className='overflow-hidden aspect-square'>
            <img
              src={bird?.imageUrls?.[0] || noImage}
              alt=''
              className='object-cover w-full h-full transition-all duration-300 hover:scale-105'
            />
          </div>
        </CardHeader>
        <CardContent className='flex-col items-start'>
          <div>
            <p className='text-lg font-semibold lg:text-xl line-clamp-1'>{bird?.name}</p>
          </div>
          <div className='flex items-center gap-2'>
            Loại chim:{' '}
            {bird.type === 'sell' ? (
              <>
                Chim kiểng
                <img className='w-6 h-6' src={birdIcon} />
              </>
            ) : (
              <>
                Chim phối giống
                <img className='w-6 h-6' src={breedIcon} />
              </>
            )}
          </div>
          <div className='flex items-center gap-2 lg:text-lg'>
            {bird.type === 'sell' ? (
              <>
                Giá bán: <span className='font-medium text-primary'>{formatPrice(bird?.sellPrice || 0)}</span>
              </>
            ) : (
              <>
                Giá phối giống: <span className='font-medium text-primary'>{formatPrice(bird?.breedPrice || 0)}</span>
              </>
            )}

            {bird.gender === 'male' ? (
              <div className='flex items-center gap-0'>
                {/* Đực */}
                <img className='w-6 h-6' src={maleIcon} />
              </div>
            ) : (
              <div className='flex items-center gap-0'>
                {/* Cái */}
                <img className='w-6 h-6' src={femaleIcon} />
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className='flex flex-col gap-2'>
          <div className='flex w-full gap-2'>
            <Button
              onClick={(e) => {
                e.preventDefault()
                addToCompare(bird)
              }}
              variant='outline'
              className='w-full'
            >
              So sánh
            </Button>
          </div>
          {bird.type === 'sell' ? (
            <Button onClick={handleAddToCart} className='w-full'>
              Thêm vào giỏ
            </Button>
          ) : (
            <Button
              onClick={(e) => {
                e.preventDefault()
                addToBreed(bird)
              }}
              className='w-full'
            >
              Phối giống
            </Button>
          )}
        </CardFooter>
      </Card>
    </Link>
  )
}

export default BirdCard
