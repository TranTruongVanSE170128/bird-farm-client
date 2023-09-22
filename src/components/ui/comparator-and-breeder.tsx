import { Button } from '@/components/ui/button'
import Container from '@/components/ui/container'
import { cn } from '@/lib/utils'
import { ArrowDown, Plus, X } from 'lucide-react'
import noImage from '@/assets/no-image.avif'
import { useNavigate } from 'react-router-dom'
import { useCompareContext } from '@/contexts/compare-provider'
import { useBreedContext } from '@/contexts/breed-provider'
import redHeart from '@/assets/red-heart.svg'
import maleIcon from '@/assets/male.svg'
import femaleIcon from '@/assets/female.svg'

export function ComparatorAndBreeder() {
  const { birds: birdsCompare, activeCompare, setActiveCompare } = useCompareContext()
  const { birds: birdsBreed, activeBreed, setActiveBreed } = useBreedContext()

  const numberOfBirdsCompare = birdsCompare.reduce<number>((count, currentValue) => {
    if (currentValue !== null) {
      return count + 1
    } else {
      return count
    }
  }, 0)

  const numberOfBirdsBreed = birdsBreed.reduce<number>((count, currentValue) => {
    if (currentValue !== null) {
      return count + 1
    } else {
      return count
    }
  }, 0)

  return (
    <div className='absolute'>
      <div className='fixed bottom-4 left-4 flex flex-col gap-2 z-50'>
        <Button
          onClick={() => {
            setActiveBreed(true)
          }}
          variant='outline'
          className={cn(
            'shadow-md shadow-foreground rounded-2xl hover:text-primary',
            (activeBreed || activeCompare) && 'hidden'
          )}
        >
          Phối giống ({numberOfBirdsBreed})
        </Button>

        <Button
          onClick={() => {
            setActiveCompare(true)
          }}
          variant='outline'
          className={cn(
            'shadow-md shadow-foreground rounded-2xl hover:text-primary',
            (activeBreed || activeCompare) && 'hidden'
          )}
        >
          So sánh ({numberOfBirdsCompare})
        </Button>
      </div>

      <Comparator />
      <Breeder />
    </div>
  )
}
export function Comparator() {
  const { birds, activeCompare, setActiveCompare, deleteAllBirds, deleteOneBird } = useCompareContext()
  const firstBird = birds[0]
  const secondBird = birds[1]
  const numberOfBirds = birds.reduce<number>((count, currentValue) => {
    if (currentValue !== null) {
      return count + 1
    } else {
      return count
    }
  }, 0)

  const navigate = useNavigate()

  return (
    <Container
      className={cn(
        'fixed bottom-0 left-1/2 -translate-x-1/2 z-50 translate-y-full transition-all px-4 opacity-0 flex justify-center',
        activeCompare && 'translate-y-0 opacity-100'
      )}
    >
      <div className='h-32 bg-background border shadow-md w-full relative grid grid-cols-3 max-w-4xl'>
        <div
          onClick={() => {
            setActiveCompare(false)
          }}
          className='absolute right-0 -translate-y-full bg-background p-2 border rounded-t-lg flex items-center gap-1 hover:text-primary cursor-pointer'
        >
          Thu gọn <ArrowDown />
        </div>

        <div className='col-span-1 border flex justify-center items-center relative'>
          {firstBird ? (
            <div className='flex flex-col justify-center items-center gap-2'>
              {!firstBird?.imageUrls?.length ? (
                <img className='aspect-square w-16 object-cover' src={noImage} />
              ) : (
                <img className='aspect-square w-16 object-cover' src={firstBird.imageUrls[0]} />
              )}

              <div className='line-clamp-2'>{firstBird.name}</div>

              <Button
                onClick={() => {
                  deleteOneBird(firstBird)
                }}
                size='icon'
                variant='ghost'
                className='absolute top-2 right-2'
              >
                <X />
              </Button>
            </div>
          ) : (
            <div className='flex flex-col justify-center items-center gap-2'>
              <div className='aspect-square w-16 flex justify-center items-center border-dashed border-2'>
                <Plus />
              </div>
              <div className='line-clamp-2'>Chưa có chim</div>
            </div>
          )}
        </div>
        <div className='col-span-1 border flex justify-center items-center relative'>
          {secondBird ? (
            <div className='flex flex-col justify-center items-center gap-2'>
              {!secondBird?.imageUrls?.length ? (
                <img className='aspect-square w-16 object-cover' src={noImage} />
              ) : (
                <img className='aspect-square w-16 object-cover' src={secondBird.imageUrls[0]} />
              )}
              <div className='line-clamp-2'>{secondBird.name}</div>

              <Button
                onClick={() => {
                  deleteOneBird(secondBird)
                }}
                size='icon'
                variant='ghost'
                className='absolute top-2 right-2'
              >
                <X />
              </Button>
            </div>
          ) : (
            <div className='flex flex-col justify-center items-center gap-2'>
              <div className='aspect-square w-16 flex justify-center items-center border-dashed border-2'>
                <Plus />
              </div>
              <div className='line-clamp-2'>Chưa có chim</div>
            </div>
          )}
        </div>
        <div className='col-span-1 border flex justify-center items-center'>
          <div className='flex flex-col gap-3 justify-center items-center'>
            <Button
              onClick={() => {
                navigate(`/compare?firstBird=${firstBird?._id}&secondBird=${secondBird?._id}`)
              }}
              disabled={numberOfBirds !== 2}
              className='mt-4'
            >
              So sánh ngay
            </Button>
            <div onClick={deleteAllBirds} className='cursor-pointer hover:text-primary select-none'>
              Xóa tất cả chim
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}

export function Breeder() {
  const { birds, activeBreed, setActiveBreed, deleteAllBirds, deleteOneBird } = useBreedContext()
  const firstBird = birds[0]
  const secondBird = birds[1]
  const numberOfBirds = birds.reduce<number>((count, currentValue) => {
    if (currentValue !== null) {
      return count + 1
    } else {
      return count
    }
  }, 0)

  const navigate = useNavigate()

  return (
    <Container
      className={cn(
        'fixed bottom-0 left-1/2 -translate-x-1/2 z-50 translate-y-full transition-all px-4 opacity-0 flex justify-center',
        activeBreed && 'translate-y-0 opacity-100'
      )}
    >
      <div className='h-32 bg-background border shadow-md w-full relative grid grid-cols-3 max-w-4xl'>
        <div
          onClick={() => {
            setActiveBreed(false)
          }}
          className='absolute right-0 -translate-y-full bg-background p-2 border rounded-t-lg flex items-center gap-1 hover:text-primary cursor-pointer'
        >
          Thu gọn <ArrowDown />
        </div>

        <img src={redHeart} className='absolute z-50 top-1/2 -translate-y-1/2 left-1/3 -translate-x-1/2 w-12 h-12' />

        <div className='col-span-1 flex justify-center items-center border relative'>
          <img src={maleIcon} className='w-9 h-9 absolute translate-x-6 translate-y-2' />
          {firstBird ? (
            <div className='flex flex-col justify-center items-center gap-2'>
              {!firstBird?.imageUrls?.length ? (
                <img className='aspect-square w-16 object-cover' src={noImage} />
              ) : (
                <img className='aspect-square w-16 object-cover' src={firstBird.imageUrls[0]} />
              )}
              <div className='line-clamp-2'>{firstBird.name}</div>

              <Button
                onClick={() => {
                  deleteOneBird(firstBird)
                }}
                size='icon'
                variant='ghost'
                className='absolute top-2 right-2'
              >
                <X />
              </Button>
            </div>
          ) : (
            <div className='flex flex-col justify-center items-center gap-2'>
              <div className='aspect-square w-16 flex justify-center items-center border-dashed border-2'>
                <Plus />
              </div>
              <div className='line-clamp-2'>Chưa có chim</div>
            </div>
          )}
        </div>
        <div className='col-span-1 flex justify-center items-center border relative'>
          <img src={femaleIcon} className='w-8 h-8 absolute translate-x-6 translate-y-2 z-20' />
          {secondBird ? (
            <div className='flex flex-col justify-center items-center gap-2'>
              {!secondBird?.imageUrls?.length ? (
                <img className='aspect-square w-16 object-cover' src={noImage} />
              ) : (
                <img className='aspect-square w-16 object-cover' src={secondBird.imageUrls[0]} />
              )}

              <div className='line-clamp-2'>{secondBird.name}</div>

              <Button
                onClick={() => {
                  deleteOneBird(secondBird)
                }}
                size='icon'
                variant='ghost'
                className='absolute top-2 right-2'
              >
                <X />
              </Button>
            </div>
          ) : (
            <div className='flex flex-col justify-center items-center gap-2 relative'>
              <div className='aspect-square w-16 flex justify-center items-center border-dashed border-2'>
                <Plus />
              </div>
              <div className='line-clamp-2'>Chưa có chim</div>
            </div>
          )}
        </div>
        <div className='col-span-1 border flex justify-center items-center'>
          <div className='flex flex-col gap-3 justify-center items-center'>
            <Button
              onClick={() => {
                navigate(`/breed?firstBird=${firstBird?._id}&secondBird=${secondBird?._id}`)
              }}
              disabled={numberOfBirds !== 2}
              className='mt-4'
            >
              Phối giống ngay
            </Button>
            <div onClick={deleteAllBirds} className='cursor-pointer hover:text-primary select-none'>
              Xóa tất cả chim
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}
