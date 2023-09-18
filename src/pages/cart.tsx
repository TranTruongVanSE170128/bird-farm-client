import { Button } from '@/components/ui/button'
import Container from '@/components/ui/container'
import { useCartContext } from '@/contexts/cart-provider'
import { loadStripe } from '@stripe/stripe-js'
import axios from 'axios'

function Cart() {
  const { cart } = useCartContext()

  const makePayment = async () => {
    try {
      const stripe = await loadStripe(import.meta.env.VITE_STRIPE_KEY)

      const { data: session } = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/checkout/create-checkout-session`,
        {
          products: cart
        }
      )

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
