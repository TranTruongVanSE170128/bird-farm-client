import useLocalStorage from '@/hooks/use-local-storage'
import React, { useContext, useEffect, useState } from 'react'

type CartProviderProps = {
  children: React.ReactNode
}

type Cart = {
  birds: Record<string, number>
  nests: Record<string, number>
}

type CartContextType = {
  cart: Cart
  addBirdToCart: (id: string) => void
  quantityInCart: number
}

export const CartContext = React.createContext<CartContextType | null>(null)

const CartProvider = ({ children }: CartProviderProps) => {
  const [cart, setCart] = useLocalStorage<Cart>('cart', {
    birds: {},
    nests: {}
  })

  const [quantityInCart, setQuantityInCart] = useState(0)

  const addBirdToCart = (id: string) => {
    setCart({ ...cart, birds: { ...cart.birds, [id]: cart.birds[id] ? cart.birds[id] + 1 : 1 } })
  }

  useEffect(() => {
    let sum = 0
    Object.keys(cart.birds).map((key) => {
      sum += cart.birds[key] || 0
    })
    Object.keys(cart.nests).map((key) => {
      sum += cart.nests[key] || 0
    })
    setQuantityInCart(sum)
  }, [cart])

  return <CartContext.Provider value={{ cart, addBirdToCart, quantityInCart }}>{children}</CartContext.Provider>
}

export default CartProvider

export const useCartContext = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCartContext must be used within a CartProvider')
  }
  return context
}
