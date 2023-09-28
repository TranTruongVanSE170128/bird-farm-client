import { create } from 'zustand'

type State = {
  display: boolean
  orderId?: string
}

type Action = {
  showRatingForm: (orderId: string) => void
}

export const useRatingFormStore = create<State & Action>((set) => ({
  display: false,
  showRatingForm: (orderId: string) => {
    set({ orderId, display: true })
  }
}))
