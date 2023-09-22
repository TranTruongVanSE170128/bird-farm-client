import { Bird } from '@/lib/types'
import React, { useContext, useState } from 'react'
import useLocalStorage from '@/hooks/use-local-storage'

type BreedProviderProps = {
  children: React.ReactNode
}

type AllBirds = [Bird | null, Bird | null]

type BreedContextType = {
  birds: AllBirds
  activeBreed: boolean
  setActiveBreed: (val: boolean) => void
  addToBreed: (bird: Bird) => void
  deleteAllBirds: () => void
  deleteOneBird: (bird: Bird) => void
}

export const BreedContext = React.createContext<BreedContextType | null>(null)

const BreedProvider = ({ children }: BreedProviderProps) => {
  const [birds, setBirds] = useLocalStorage<AllBirds>('breed_birds', [null, null])
  const [activeBreed, setActiveBreed] = useState(false)

  const addToBreed = (bird: Bird) => {
    if (bird.gender === 'male') {
      setBirds((prev) => {
        prev[0] = bird
        return prev
      })
    } else {
      setBirds((prev) => {
        prev[1] = bird
        return prev
      })
    }

    setActiveBreed(true)
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
    <BreedContext.Provider value={{ birds, addToBreed, activeBreed, setActiveBreed, deleteAllBirds, deleteOneBird }}>
      {children}
    </BreedContext.Provider>
  )
}

export default BreedProvider

export const useBreedContext = () => {
  const context = useContext(BreedContext)
  if (!context) {
    throw new Error('useBreedContext must be used within a BreedProvider')
  }
  return context
}
