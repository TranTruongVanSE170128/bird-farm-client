import { cn } from '@/lib/utils'
import { Link } from 'react-router-dom'
import { Card, CardContent, CardHeader } from './ui/card'
import { Specie } from '@/lib/types'
import noImage from '@/assets/no-image.avif'

type Props = { className?: string; specie: Specie }

function SpecieCard({ className, specie }: Props) {
  return (
    <Link
      to={`/birds?specie=${specie._id}&pageNumber=1`}
      className={cn(
        'outline-0 focus:border-2 hover:border-2 border-primary transition duration-300 rounded-2xl overflow-hidden',
        className
      )}
    >
      <Card className='border-2 rounded-2xl overflow-hidden'>
        <CardHeader className='p-0 mb-4'>
          <div className='aspect-square'>
            <img
              src={specie?.imageUrl || noImage}
              alt=''
              className='object-fill w-full h-full transition-all duration-300 hover:scale-105'
            />
          </div>
        </CardHeader>
        <CardContent className='font-semibold text-lg text-center line-clamp-1'>{specie.name}</CardContent>
      </Card>
    </Link>
  )
}

export default SpecieCard
