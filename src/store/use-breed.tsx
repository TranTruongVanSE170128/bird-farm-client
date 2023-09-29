import { create } from 'zustand'
import { Bird } from '@/lib/types'
import { useCompareStore } from './use-compare'

type AllBirds = [Bird | null, Bird | null]

type State = {
  birds: AllBirds
  activeBreed: boolean
}

type Action = {
  setBirds: (birds: AllBirds) => void
  addToBreed: (bird: Bird) => void
  deleteAllBirds: () => void
  deleteOneBird: (bird: Bird) => void
}

export const useBreedStore = create<State & Action>((set) => ({
  //   birds: useLocalStorage<AllBirds>('breed_birds', [null, null])[0],
  birds: JSON.parse(localStorage.getItem('breed_birds') || JSON.stringify([null, null])),
  activeBreed: false,
  setBirds: (birds: AllBirds) => {
    localStorage.setItem('breed_birds', JSON.stringify(birds))
    set({ birds })
  },
  addToBreed: (bird: Bird) =>
    set((state) => {
      const { birds, setBirds } = state
      if (bird.gender === 'male') {
        const cloneBirds = [...birds]
        cloneBirds[0] = bird
        setBirds(cloneBirds as AllBirds)
      } else {
        const cloneBirds = [...birds]
        cloneBirds[1] = bird
        setBirds(cloneBirds as AllBirds)
      }

      useCompareStore.setState({ activeCompare: false })
      return { activeBreed: true }
    }),
  deleteAllBirds: () => {
    set((state) => {
      state.setBirds([null, null])
      return {}
    })
  },
  deleteOneBird: (bird: Bird) => {
    set((state) => {
      state.setBirds(
        state.birds.map((item) => {
          if (item === null) return null
          return item._id === bird._id ? null : item
        }) as AllBirds
      )
      return {}
    })
  }
}))
