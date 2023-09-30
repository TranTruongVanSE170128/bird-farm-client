import noImage from '@/assets/no-image.avif'
import { useState } from 'react'
import { cn, statusToVi } from '@/lib/utils'
import { OrderNest, Stage, getSpecie } from '@/lib/types'
import maleIcon from '@/assets/male.svg'
import femaleIcon from '@/assets/female.svg'
import { Link } from 'react-router-dom'
import breedIcon from '@/assets/breed.svg'
import greyBirdIcon from '@/assets/grey-bird.svg'

type Props = {
  orderNest: OrderNest
}

function OrderNestCard({ orderNest }: Props) {
  const [indexActive, setIndexActive] = useState(orderNest.stages.length ? 0 : -1)
  const [selectedStage, setSelectedStage] = useState<Stage | null>(orderNest?.stages?.[0] || null)

  return (
    <div className='flex flex-col gap-6 rounded-3xl border shadow-xl mb-10 p-10'>
      <div className='grid grid-cols-2'>
        <div className='col-span-1 flex flex-col gap-2'>
          <div className='font-medium text-lg'>
            Trạng thái: <span className='font-normal'>{statusToVi[orderNest.status]}</span>
          </div>
          <div className='flex gap-4'>
            <div className='font-medium text-lg'>
              Chim non đực: <span className='font-normal'>{orderNest.numberChildPriceMale} con</span>
            </div>
            <div className='font-medium text-lg'>
              Chim non cái: <span className='font-normal'>{orderNest.numberChildPriceFemale} con</span>
            </div>
          </div>

          <Link to={`/birds/${orderNest.dad._id}`} className='flex group'>
            <img className='w-24 aspect-square object-cover rounded-md' src={orderNest.dad.imageUrls?.[0] || noImage} />
            <div className='flex flex-col justify-around mx-5'>
              <div className='font-bold group-hover:text-primary'>Chim bố: {orderNest.dad.name}</div>
              <div className='flex gap-2'>
                <div>Loài: {getSpecie(orderNest).name}</div>
                <img className='w-6 h-6' src={maleIcon} />
              </div>
              <div className='flex gap items-center'>
                Loại chim: Chim phối giống <img src={breedIcon} className='w-6 h-6' />
              </div>
            </div>
          </Link>

          <Link to={`/birds/${orderNest.mom._id}`} className='flex group'>
            <img className='w-24 aspect-square object-cover rounded-md' src={orderNest.mom.imageUrls?.[0] || noImage} />
            <div className='flex flex-col justify-around mx-5'>
              <div className='font-bold group-hover:text-primary'>Chim mẹ: {orderNest.mom.name}</div>
              <div className='flex gap-2'>
                <div>Loài: {getSpecie(orderNest).name}</div>
                <img className='w-6 h-6' src={femaleIcon} />
              </div>
              <div className='flex gap items-center'>
                Loại chim: Chim phối giống <img src={breedIcon} className='w-6 h-6' />
              </div>
            </div>
          </Link>
        </div>

        {selectedStage && (
          <div className='col-span-1 flex flex-col items-center'>
            <img
              className='aspect-video rounded-xl object-cover w-3/4'
              src={selectedStage.imageUrl}
              alt='Selected Image'
            />
            <div className='flex flex-col items-center gap-2 mt-2'>{selectedStage.description}</div>
          </div>
        )}

        {!orderNest.stages.length && (
          <div className='col-span-1 flex flex-col justify-center items-center text-lg font-medium'>
            Chưa có giai đoạn phát triển nào <img src={greyBirdIcon} className='w-16 h-16 mt-4' />
          </div>
        )}
      </div>

      <div className='flex flex-wrap justify-between mt-10 relative w-full'>
        {orderNest.stages.map((stage, index) => {
          return (
            <div className='flex-1 flex z-20 flex-col justify-center items-center gap-2 -mt-3'>
              <div className='flex w-full items-center justify-center'>
                <div
                  className={cn(
                    'w-full flex-1 h-2 bg-slate-200 dark:bg-slate-500',
                    index <= indexActive && 'bg-primary dark:bg-primary',
                    index === 0 && 'invisible'
                  )}
                />
                <div
                  className={cn(
                    'h-5 aspect-square rounded-full cursor-pointer shrink-0 flex justify-center items-center text-lg font-medium p-5',
                    index <= indexActive
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-slate-200 text-black dark:bg-slate-500 dark:text-white'
                  )}
                  onClick={() => {
                    setSelectedStage(stage), setIndexActive(index)
                  }}
                >
                  {index + 1}
                </div>
                <div
                  className={cn(
                    'w-full flex-1 h-2 bg-slate-200 dark:bg-slate-500',
                    index < indexActive && 'bg-primary dark:bg-primary',
                    index === orderNest.stages.length - 1 && orderNest.status !== 'breeding' && 'invisible'
                  )}
                />
              </div>

              <div>{stage.name}</div>
            </div>
          )
        })}
        {orderNest.status === 'breeding' && (
          <div className='flex-1 flex z-20 flex-col justify-center items-center gap-2 -mt-3'>
            <div className='flex w-full items-center justify-center'>
              <div className='w-full flex-1 h-2 bg-slate-200 dark:bg-slate-500' />
              <div className='h-5 aspect-square rounded-full cursor-pointer shrink-0 flex justify-center items-center text-lg font-medium p-5 bg-slate-200 text-black dark:bg-slate-500 dark:text-white'>
                ?
              </div>
              <div className='w-full flex-1 h-2 bg-primary invisible' />
            </div>
            <div>Sắp diễn ra</div>
          </div>
        )}

        {!orderNest.stages.length && (
          <div className='flex-1 flex z-20 flex-col justify-center items-center gap-2 -mt-3'>
            <div className='flex w-full items-center justify-center'>
              <div className='h-5 w-5 rounded-full cursor-pointer shrink-0 flex justify-center items-center text-lg font-medium p-5 bg-slate-200 text-black dark:bg-slate-500 dark:text-white'>
                ?
              </div>
            </div>
            <div>Sắp diễn ra</div>
          </div>
        )}
      </div>
    </div>
  )
}

export default OrderNestCard
