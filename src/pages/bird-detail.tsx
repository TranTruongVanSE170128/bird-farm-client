import Container from '@/components/ui/container'

import { useParams } from 'react-router-dom'

function BirdDetail() {
  const { id } = useParams()
  return (
    <main>
      <Container>đây là chim có id :{id}</Container>
    </main>
  )
}

export default BirdDetail
