import { Link } from 'react-router-dom'
import { Card, CardContent, CardFooter, CardHeader } from './ui/card'
import { cn } from '@/lib/utils'
import { Button } from './ui/button'
import { Heart } from 'lucide-react'
import { Bird } from '@/lib/types'
import { Skeleton } from './ui/skeleton'

type Props = {
  className?: string
  bird?: Bird
}

function BirdCardSkeleton({ className, bird }: Props) {
  return (
    <Link
      to={`/birds/${bird?._id}`}
      className={cn('focus:ring-2 rounded-lg hover:ring-2 ring-primary transition duration-300', className)}
    >
      <Card className='border-2 overflow-hidden'>
        <CardHeader className='p-0 mb-4'>
          <Skeleton className='aspect-square' />
        </CardHeader>
        <CardContent className='flex-col items-start'>
          <div>
            <div className='font-semibold text-lg lg:text-xl'>
              <Skeleton className='h-6 w-full' />
            </div>
          </div>

          <Skeleton className='h-6 w-full mt-1' />
        </CardContent>
        <CardFooter className='flex gap-2 flex-col'>
          <div className='flex w-full gap-2'>
            <Button variant='outline' className='w-full'>
              Thêm vào giỏ
            </Button>
            <Button className='p-2' variant='outline' size='icon'>
              <Heart />
            </Button>
          </div>
          <Button className='w-full'>Mua ngay</Button>
        </CardFooter>
      </Card>
    </Link>
  )
}

export default BirdCardSkeleton
