import { Skeleton } from '@/components/ui/skeleton'

function SpecieCardSkeleton() {
  return (
    <div className='outline-0 focus:border-2 hover:border-2 border-primary transition duration-300 rounded-2xl overflow-hidden col-span-1'>
      <div className='border-2 rounded-2xl overflow-hidden h-full'>
        <div className='p-0 mb-4'>
          <Skeleton className='aspect-square' />
        </div>
        <Skeleton className='w-48 h-8 mx-auto mb-5' />
      </div>
    </div>
  )
}

export default SpecieCardSkeleton
