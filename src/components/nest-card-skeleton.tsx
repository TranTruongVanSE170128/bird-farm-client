import { Card, CardContent, CardFooter, CardHeader } from './ui/card'
import { cn } from '@/lib/utils'
import { Button } from './ui/button'
import { Skeleton } from './ui/skeleton'

type Props = {
  className?: string
}

function NestCardSkeleton({ className }: Props) {
  return (
    <div className={cn('focus:ring-2 rounded-lg hover:ring-2 ring-primary transition duration-300', className)}>
      <Card className='overflow-hidden border-2'>
        <CardHeader className='p-0 mb-4'>
          <Skeleton className='aspect-square' />
        </CardHeader>
        <CardContent className='flex-col items-start'>
          <Skeleton className='w-full h-6' />
          <Skeleton className='w-full h-6 mt-2' />
        </CardContent>
        <CardFooter className='flex flex-col gap-2'>
          <div className='flex w-full gap-2'>
            <Button variant='outline' className='w-full'>
              Thêm vào giỏ
            </Button>
          </div>
          <Button className='w-full'>Mua ngay</Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default NestCardSkeleton
