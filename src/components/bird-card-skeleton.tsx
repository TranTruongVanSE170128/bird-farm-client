import { Link } from 'react-router-dom'
import { Card, CardContent, CardFooter, CardHeader } from './ui/card'
import { cn } from '@/lib/utils'
import { Button } from './ui/button'
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
      <Card className='overflow-hidden border-2'>
        <CardHeader className='p-0 mb-4'>
          <Skeleton className='aspect-square' />
        </CardHeader>
        <CardContent className='flex-col items-start'>
          <div>
            <div className='text-lg font-semibold lg:text-xl'>
              <Skeleton className='w-full h-6' />
            </div>
          </div>

          <Skeleton className='w-full h-6 mt-1' />
          <Skeleton className='w-full h-6 mt-1' />
        </CardContent>
        <CardFooter className='flex flex-col gap-2'>
          <div className='flex w-full gap-2'>
            <Button variant='outline' className='w-full'>
              So sánh
            </Button>
          </div>
          <Button className='w-full'>Thêm vào giỏ</Button>
        </CardFooter>
      </Card>
    </Link>
  )
}

export default BirdCardSkeleton
