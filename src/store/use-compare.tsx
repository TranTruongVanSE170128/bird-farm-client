import { create } from 'zustand'
import { Bird } from '@/lib/types'
import { toast } from '@/components/ui/use-toast'
import { useBreedStore } from './use-breed'

type AllBirds = [Bird | null, Bird | null]

type State = {
  birds: AllBirds
  activeCompare: boolean
}

type Action = {
  setBirds: (birds: AllBirds) => void
  addToCompare: (bird: Bird) => void
  deleteAllBirds: () => void
  deleteOneBird: (bird: Bird) => void
}

export const useCompareStore = create<State & Action>((set) => ({
  birds: JSON.parse(localStorage.getItem('compare_birds') || String([null, null])),
  activeCompare: false,
  setBirds: (birds: AllBirds) => {
    localStorage.setItem('compare_birds', JSON.stringify(birds))
    set({ birds })
  },
  addToCompare: (bird: Bird) =>
    set((state) => {
      const { birds } = state
      if (bird !== birds[0] && bird !== birds[1]) {
        if (birds[0] === null) {
          const cloneBirds: AllBirds = [...birds]
          cloneBirds[0] = bird
          state.setBirds(cloneBirds)
        } else if (birds[1] === null) {
          const cloneBirds: AllBirds = [...birds]
          cloneBirds[1] = bird
          state.setBirds(cloneBirds)
        } else {
          console.log(3)

          toast({
            duration: 2500,
            variant: 'destructive',
            title: 'Vui lòng xóa bớt chim để tiếp tục so sánh'
          })
        }
      }
      useBreedStore.setState({ activeBreed: false })
      return { activeCompare: true }
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
