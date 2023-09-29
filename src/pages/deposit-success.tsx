import Container from '@/components/ui/container'
import { useBreedStore } from '@/store/use-breed'

import { useEffect } from 'react'

function DepositSuccess() {
  const { deleteAllBirds } = useBreedStore()

  useEffect(() => {
    deleteAllBirds()
  }, [deleteAllBirds])

  return (
    <main>
      <Container>Đặt cọc thành công</Container>
    </main>
  )
}

export default DepositSuccess
