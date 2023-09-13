import { cn } from '@/lib/utils'
import { Link } from 'react-router-dom'
import { Card, CardContent, CardHeader } from './ui/card'

type Props = { className?: string }

function SpecieCard({ className }: Props) {
  return (
    <Link
      to='/'
      className={cn('outline-0 focus:ring-2 hover:ring-2 ring-primary transition duration-300 rounded-lg', className)}
    >
      <Card className='rounded-lg border-2'>
        <CardHeader className='pt-4'>
          <div className='aspect-square rounded-lg overflow-hidden'>
            <img
              src='https://daohieu.com/wp-content/uploads/2020/05/chim-vang-anh-917x1024.jpg'
              alt=''
              className='object-cover w-full h-full rounded-lg transition-all duration-300 hover:scale-105'
            />
          </div>
        </CardHeader>
        <CardContent className='font-semibold text-lg text-center'>Chim Vàng Anh</CardContent>
      </Card>
    </Link>
  )
}

export default SpecieCard
