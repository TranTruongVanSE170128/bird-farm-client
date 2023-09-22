import { Link } from 'react-router-dom'
import { Card, CardContent, CardFooter, CardHeader } from './ui/card'
import { cn, formatPrice } from '@/lib/utils'
import { Button } from './ui/button'
import { Bird } from '@/lib/types'
import noImage from '@/assets/no-image.avif'
import { useToast } from './ui/use-toast'
import { useCartContext } from '@/contexts/cart-provider'
import { useCompareContext } from '@/contexts/compare-provider'

type Props = {
  className?: string
  bird: Bird
}

function BirdCard({ className, bird }: Props) {
  const { addBirdToCart } = useCartContext()
  const { addToCompare } = useCompareContext()

  const { toast } = useToast()

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    addBirdToCart(bird._id)
    toast({
      variant: 'success',
      title: 'Đã thêm chim vào giỏ hàng!',
      duration: 2500
    })
  }

  const handleBuyNow = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
  }

  return (
    <Link
      to={`/birds/${bird?._id}`}
      className={cn('focus:ring-2 rounded-lg hover:ring-2 ring-primary transition duration-300', className)}
    >
      <Card className='border-2 overflow-hidden'>
        <CardHeader className='p-0 mb-4'>
          <div className='aspect-square overflow-hidden'>
            <img
              src={bird?.imageUrls?.[0] || noImage}
              alt=''
              className='object-cover w-full h-full transition-all duration-300 hover:scale-105'
            />
          </div>
        </CardHeader>
        <CardContent className='flex-col items-start'>
          <div>
            <p className='font-semibold text-lg lg:text-xl line-clamp-1'>{bird?.name}</p>
          </div>
          <div className='flex items-center justify-between lg:text-lg'>{formatPrice(bird?.price || 0)}</div>
        </CardContent>
        <CardFooter className='flex gap-2 flex-col'>
          <div className='flex w-full gap-2'>
            <Button onClick={handleAddToCart} variant='outline' className='w-full'>
              Thêm vào giỏ
            </Button>
            <Button
              onClick={(e) => {
                e.preventDefault()
                addToCompare(bird)
              }}
              variant='outline'
              className='w-full'
            >
              Thêm so sánh
            </Button>
          </div>
          <Button onClick={handleBuyNow} className='w-full'>
            Mua ngay
          </Button>
        </CardFooter>
      </Card>
    </Link>
  )
}

export default BirdCard
