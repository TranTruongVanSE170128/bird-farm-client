import { Skeleton } from '@/components/ui/skeleton'

function SpecieCardSkeleton() {
  return (
    <div className='col-span-1 overflow-hidden transition duration-300 outline-0 focus:border-2 hover:border-2 border-primary rounded-2xl'>
      <div className='h-full overflow-hidden border-2 rounded-2xl'>
        <div className='p-0 mb-4'>
          <Skeleton className='aspect-square' />
        </div>
        <Skeleton className='w-48 h-8 mx-auto mb-5' />
      </div>
    </div>
  )
}

export default SpecieCardSkeleton
