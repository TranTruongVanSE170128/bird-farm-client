import { Link } from 'react-router-dom'
import { Card, CardContent, CardFooter, CardHeader } from './ui/card'
import { cn, formatPrice } from '@/lib/utils'
import { Button } from './ui/button'
import { Nest } from '@/lib/types'
import noImage from '@/assets/no-image.avif'
import { useToast } from './ui/use-toast'
import { useCartContext } from '@/contexts/cart-provider'

type Props = {
  className?: string
  nest: Nest
}

function NestCard({ className, nest }: Props) {
  const { toast } = useToast()
  const { addNestToCart } = useCartContext()

  const addToCart = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    addNestToCart(nest._id)
    toast({
      variant: 'success',
      title: 'Đã thêm tổ chim vào giỏ hàng!',
      duration: 2500
    })
  }

  const handleBuyNow = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
  }

  return (
    <Link
      to={`/nests/${nest._id}`}
      className={cn('focus:ring-2 rounded-lg hover:ring-2 ring-primary transition duration-300', className)}
    >
      <Card className='border-2 overflow-hidden'>
        <CardHeader className='p-0 mb-4'>
          <div className='aspect-square overflow-hidden'>
            <img
              src={nest?.imageUrls?.[0] || noImage}
              alt=''
              className='object-cover w-full h-full transition-all duration-300 hover:scale-105'
            />
          </div>
        </CardHeader>
        <CardContent className='flex-col items-start'>
          <div>
            <p className='font-semibold text-lg lg:text-xl line-clamp-1'>{nest.name}</p>
          </div>
          <div className='flex items-center justify-between lg:text-lg'>{formatPrice(nest.price)}</div>
        </CardContent>
        <CardFooter className='flex gap-2 flex-col'>
          <div className='flex w-full gap-2'>
            <Button onClick={addToCart} variant='outline' className='w-full'>
              Thêm vào giỏ
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

export default NestCard
