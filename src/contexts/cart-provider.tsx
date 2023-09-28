import useLocalStorage from '@/hooks/use-local-storage'
import { Cart } from '@/lib/types'
import React, { useContext, useEffect, useState } from 'react'

type CartProviderProps = {
  children: React.ReactNode
}

type CartContextType = {
  cart: Cart
  addBirdToCart: (id: string) => void
  addNestToCart: (id: string) => void
  removeBirdFromCart: (id: string) => void
  removeNestFromCart: (id: string) => void
  quantityInCart: number
}

export const CartContext = React.createContext<CartContextType | null>(null)

const CartProvider = ({ children }: CartProviderProps) => {
  const [cart, setCart] = useLocalStorage<Cart>('cart', {
    birds: [],
    nests: []
  })

  const [quantityInCart, setQuantityInCart] = useState(0)

  const addBirdToCart = (id: string) => {
    if (!cart.birds.includes(id)) {
      setCart({ ...cart, birds: [...cart.birds, id] })
    }
  }

  const removeBirdFromCart = (id: string) => {
    const newCart = { ...cart }
    newCart.birds = newCart.birds.filter((item) => item !== id)
    setCart(newCart)
  }

  const addNestToCart = (id: string) => {
    if (!cart.nests.includes(id)) {
      setCart({ ...cart, nests: [...cart.nests, id] })
    }
  }

  const removeNestFromCart = (id: string) => {
    const newCart = { ...cart }
    newCart.nests = newCart.nests.filter((item) => item !== id)
    setCart(newCart)
  }

  useEffect(() => {
    setQuantityInCart(cart.birds.length + cart.nests.length)
  }, [cart])

  return (
    <CartContext.Provider
      value={{ cart, addBirdToCart, quantityInCart, addNestToCart, removeBirdFromCart, removeNestFromCart }}
    >
      {children}
    </CartContext.Provider>
  )
}

export default CartProvider

export const useCartContext = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCartContext must be used within a CartProvider')
  }
  return context
}
