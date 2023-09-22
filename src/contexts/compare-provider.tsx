import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import { Bird } from '@/lib/types'
import React, { useContext, useState } from 'react'
import useLocalStorage from '@/hooks/use-local-storage'
import Container from '@/components/ui/container'
import { cn } from '@/lib/utils'
import { ArrowDown, Plus, X } from 'lucide-react'
import noImage from '@/assets/no-image.avif'
import { useNavigate } from 'react-router-dom'

type CompareProviderProps = {
  children: React.ReactNode
}

type AllBirds = [Bird | null, Bird | null]

type CompareContextType = {
  birds: AllBirds
  activeCompare: boolean
  setActiveCompare: (val: boolean) => void
  addToCompare: (bird: Bird) => void
  deleteAllBirds: () => void
  deleteOneBird: (bird: Bird) => void
}

export const CompareContext = React.createContext<CompareContextType | null>(null)

const CompareProvider = ({ children }: CompareProviderProps) => {
  const [birds, setBirds] = useLocalStorage<AllBirds>('compare_birds', [null, null])
  const { toast } = useToast()
  const [activeCompare, setActiveCompare] = useState(false)

  const addToCompare = (bird: Bird) => {
    if (bird !== birds[0] && bird !== birds[1]) {
      if (birds[0] === null) {
        const cloneBirds: AllBirds = [...birds]
        cloneBirds[0] = bird
        setBirds(cloneBirds)
      } else if (birds[1] === null) {
        const cloneBirds: AllBirds = [...birds]
        cloneBirds[1] = bird
        setBirds(cloneBirds)
      } else {
        toast({
          duration: 2500,
          variant: 'destructive',
          title: 'Vui lòng xóa bớt chim để tiếp tục so sánh'
        })
      }
    }

    setActiveCompare(true)
  }

  const deleteAllBirds = () => {
    setBirds([null, null])
  }

  const deleteOneBird = (bird: Bird) => {
    setBirds(
      birds.map((item) => {
        if (item === null) return null
        return item._id === bird._id ? null : item
      }) as AllBirds
    )
  }

  return (
    <CompareContext.Provider
      value={{ birds, addToCompare, activeCompare, setActiveCompare, deleteAllBirds, deleteOneBird }}
    >
      {children}
    </CompareContext.Provider>
  )
}

export default CompareProvider

export const useCompareContext = () => {
  const context = useContext(CompareContext)
  if (!context) {
    throw new Error('useCompareContext must be used within a CompareProvider')
  }
  return context
}

export function Comparator() {
  const { birds, activeCompare, setActiveCompare, deleteAllBirds, deleteOneBird } = useCompareContext()
  const firstBird = birds[0]
  const secondBird = birds[1]
  const navigate = useNavigate()
  const numberOfBirds = birds.reduce<number>((count, currentValue) => {
    if (currentValue !== null) {
      return count + 1
    } else {
      return count
    }
  }, 0)

  return (
    <div className='absolute inset-0'>
      <div className='fixed bottom-4 left-4 flex flex-col gap-2 z-50'>
        <Button
          onClick={() => {
            setActiveCompare(true)
          }}
          variant='outline'
          className={cn('shadow-md shadow-foreground rounded-2xl hover:text-primary', activeCompare && 'hidden')}
        >
          So sánh ({numberOfBirds})
        </Button>
      </div>

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
            <div className='flex flex-col gap-3'>
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
                Xóa tất cả sản phẩm
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}
