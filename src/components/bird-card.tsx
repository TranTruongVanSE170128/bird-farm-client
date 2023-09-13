import { Link } from 'react-router-dom'
import { Card, CardContent, CardFooter, CardHeader } from './ui/card'
import { cn } from '@/lib/utils'
import { Button } from './ui/button'
import { Heart } from 'lucide-react'

type Props = {
  className?: string
}

function BirdCard({ className }: Props) {
  return (
    <Link to='/' className={cn('focus:ring-2 rounded-lg hover:ring-2 ring-primary transition duration-300', className)}>
      <Card className='border-2 overflow-hidden'>
        <CardHeader className='p-0 mb-4'>
          <div className='aspect-square overflow-hidden'>
            <img
              src='https://www.droversvet.com.au/wp-content/uploads/2014/09/Fotolia_51454286_1000x666.jpg'
              alt=''
              className='object-cover w-full h-full transition-all duration-300 hover:scale-105'
            />
          </div>
        </CardHeader>
        <CardContent className='flex-col items-start'>
          <div>
            <p className='font-semibold text-lg lg:text-xl'>Chim Sẻ mã SE1234</p>
          </div>
          <div className='flex items-center justify-between lg:text-lg'>200.000đ</div>
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

export default BirdCard
