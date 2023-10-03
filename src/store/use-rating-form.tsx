import { create } from 'zustand'

type State = {
  display: boolean
  orderId?: string
  orderNestId?: string
}

type Action = {
  showRatingForm: ({ orderId, orderNestId }: { orderId?: string; orderNestId?: string }) => void
}

export const useRatingFormStore = create<State & Action>((set) => ({
  display: false,
  showRatingForm: ({ orderId, orderNestId }) => {
    if (orderNestId) {
      set({ orderNestId, display: true })
      return
    }
    if (orderId) {
      set({ orderId, display: true })
    }
  }
}))
