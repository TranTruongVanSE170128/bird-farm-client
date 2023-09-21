import { Button } from '@/components/ui/button'
import Container from '@/components/ui/container'
import { useCartContext } from '@/contexts/cart-provider'
import { Bird, Nest } from '@/lib/types'
import { birdFarmApi } from '@/services/bird-farm-api'
import { loadStripe } from '@stripe/stripe-js'
import { useEffect, useState } from 'react'

type Products = {
  birds: Bird[]
  nests: Nest[]
}

function Cart() {
  const { cart } = useCartContext()
  const [products, setProducts] = useState<Products>()

  useEffect(() => {
    const fetchProducts = async () => {
      const birdsData = birdFarmApi
        .post('/api/birds/get-by-ids', { birds: Object.keys(cart.birds) })
        .then((res) => res.data.birds)
      const nestsData = birdFarmApi
        .post('/api/nests/get-by-ids', { nests: Object.keys(cart.nests) })
        .then((res) => res.data.nests)

      const [birds, nests] = await Promise.all([birdsData, nestsData])

      setProducts({ birds, nests })
    }

    fetchProducts()
  }, [])

  useEffect(() => {
    console.log(products)
  }, [products])

  const makePayment = async () => {
    try {
      const stripe = await loadStripe(import.meta.env.VITE_STRIPE_KEY)

      const { data: session } = await birdFarmApi.post('/api/checkout/create-checkout-session', {
        products: cart
      })

      const result = await stripe?.redirectToCheckout({
        sessionId: session.id
      })

      if (result?.error) {
        console.log(result.error)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <main>
      <Container>
        Cart
        <Button onClick={makePayment}>Thanh Toán</Button>
      </Container>
    </main>
  )
}

export default Cart
