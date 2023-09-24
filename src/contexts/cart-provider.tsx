import useLocalStorage from '@/hooks/use-local-storage'
import React, { useContext, useEffect, useState } from 'react'
import * as _ from 'lodash'

type CartProviderProps = {
  children: React.ReactNode
}

type Cart = {
  birds: string[]
  nests: string[]
}

type CartContextType = {
  cart: Cart
  addBirdToCart: (id: string) => void
  addNestToCart: (id: string) => void
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
    setCart({ ...cart, birds: _.union([...cart.birds], [id]) })
  }

  const addNestToCart = (id: string) => {
    setCart({ ...cart, nests: _.union([...cart.nests], [id]) })
  }

  useEffect(() => {
    setQuantityInCart(cart.birds.length + cart.nests.length)
  }, [cart])

  return (
    <CartContext.Provider value={{ cart, addBirdToCart, quantityInCart, addNestToCart }}>
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
