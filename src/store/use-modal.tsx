import { create } from 'zustand'
import React from 'react'

type State = {
  display: boolean
  title?: string
  content?: React.ReactNode
  titleAction?: string
  titleCancel?: string
  handleAction?: () => Promise<void>
}

type Action = {
  showModal: (params: Partial<State>) => void
  resetModal: () => void
}

export const useModalStore = create<State & Action>((set) => ({
  display: false,
  showModal: (params) => {
    set({ ...params, display: true })
  },
  resetModal: () => {
    set({ title: '', content: '', display: false })
  }
}))
