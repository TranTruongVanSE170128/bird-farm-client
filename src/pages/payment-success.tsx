import Container from '@/components/ui/container'
import { useCartContext } from '@/contexts/cart-provider'
import { useEffect } from 'react'

function PaymentSuccess() {
  const { clearCart } = useCartContext()

  useEffect(() => {
    clearCart()
  }, [clearCart])

  return (
    <main>
      <Container>Thanh toán thành công</Container>
    </main>
  )
}

export default PaymentSuccess
