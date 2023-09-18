import useLocalStorage from '@/hooks/use-local-storage'
import React, { useContext, useEffect, useState } from 'react'

type CartProviderProps = {
  children: React.ReactNode
}

type Cart = Record<string, number>

type CartContextType = {
  cart: Cart
  addToCart: (id: string) => void
  quantityInCart: number
}

export const CartContext = React.createContext<CartContextType | null>(null)

const CartProvider = ({ children }: CartProviderProps) => {
  const { localStorageValue: cart, setLocalStorageStateValue: setCart } = useLocalStorage<Cart>('cart', {})
  const [quantityInCart, setQuantityInCart] = useState(0)

  const addToCart = (id: string) => {
    setCart({ ...cart, [id]: cart[id] ? cart[id] + 1 : 1 })
  }

  useEffect(() => {
    let sum = 0
    Object.keys(cart).map((key) => {
      sum += cart[key] || 0
    })
    setQuantityInCart(sum)
  }, [cart])

  return <CartContext.Provider value={{ cart, addToCart, quantityInCart }}>{children}</CartContext.Provider>
}

export default CartProvider

export const useCartContext = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCartContext must be used within a CartProvider')
  }
  return context
}
