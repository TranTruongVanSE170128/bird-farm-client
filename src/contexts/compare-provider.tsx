import { useToast } from '@/components/ui/use-toast'
import { Bird } from '@/lib/types'
import React, { useContext, useState } from 'react'
import useLocalStorage from '@/hooks/use-local-storage'

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
