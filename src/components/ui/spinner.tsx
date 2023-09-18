import { cn } from '@/lib/utils'
import { Shell } from 'lucide-react'

type Props = {
  className?: string
}

function Spinner({ className }: Props) {
  return (
    <div className='flex justify-center'>
      <Shell size='48px' className={cn('animate-spin', className)} />
    </div>
  )
}

export default Spinner
