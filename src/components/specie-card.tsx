import { cn } from '@/lib/utils'
import { Link } from 'react-router-dom'
import { Card, CardContent, CardHeader } from './ui/card'
import { Specie } from '@/lib/types'
import noImage from '@/assets/no-image.avif'

type Props = { className?: string; specie: Specie }

function SpecieCard({ className, specie }: Props) {
  return (
    <Link
      to='/'
      className={cn(
        'outline-0 focus:ring-2 hover:ring-2 overflow-hidden ring-primary transition duration-300 rounded-lg',
        className
      )}
    >
      <Card className='border-2'>
        <CardHeader className='p-0 mb-4'>
          <div className='aspect-square overflow-hidden'>
            <img
              src={specie?.imageUrl || noImage}
              alt=''
              className='object-cover w-full h-full transition-all duration-300 hover:scale-105'
            />
          </div>
        </CardHeader>
        <CardContent className='font-semibold text-lg text-center line-clamp-1'>{specie.name}</CardContent>
      </Card>
    </Link>
  )
}

export default SpecieCard
