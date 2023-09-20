import { Button } from '@/components/ui/button'
import Container from '@/components/ui/container'
import { useCartContext } from '@/contexts/cart-provider'
import { birdFarmApi } from '@/services/bird-farm-api'
import { loadStripe } from '@stripe/stripe-js'

function Cart() {
  const { cart } = useCartContext()

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
