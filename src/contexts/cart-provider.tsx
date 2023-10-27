import useLocalStorage from '@/hooks/use-local-storage'
import { Bird, Cart, Nest } from '@/lib/types'
import { birdFarmApi } from '@/services/bird-farm-api'
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
  clearCart: () => void
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

  const clearCart = () => {
    setCart({
      birds: [],
      nests: []
    })
  }

  useEffect(() => {
    const fetchProducts = async () => {
      const birdsData = birdFarmApi.post('/api/birds/get-by-ids', { birds: cart.birds }).then((res) => res.data.birds)
      const nestsData = birdFarmApi.post('/api/nests/get-by-ids', { nests: cart.nests }).then((res) => res.data.nests)

      const [birds, nests]: [Bird[], Nest[]] = await Promise.all([birdsData, nestsData])

      setCart({
        birds: birds.map((b) => b._id),
        nests: nests.map((n) => n._id)
      })
    }

    fetchProducts()
  }, [])

  useEffect(() => {
    setQuantityInCart(cart.birds.length + cart.nests.length)
  }, [cart])

  return (
    <CartContext.Provider
      value={{ cart, addBirdToCart, quantityInCart, addNestToCart, removeBirdFromCart, removeNestFromCart, clearCart }}
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
