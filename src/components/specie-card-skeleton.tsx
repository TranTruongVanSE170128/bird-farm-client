import { Skeleton } from '@/components/ui/skeleton'

function SpecieCardSkeleton() {
  return (
    <div className='outline-0 focus:ring-2 hover:ring-2 overflow-hidden ring-primary transition duration-300 rounded-lg'>
      <div className='border-2 cursor-pointer'>
        <div className='p-0 mb-4'>
          <Skeleton className='aspect-square' />
        </div>
        <Skeleton className='w-44 h-8 rounded-full mx-auto mb-4' />
      </div>
    </div>
  )
}

export default SpecieCardSkeleton
