import Container from '@/components/ui/container'
import React from 'react'
import { useParams } from 'react-router-dom'

type Props = {}

function BirdDetail({}: Props) {
  const { id } = useParams()
  return (
    <main>
      <Container>đây là chim có id :{id}</Container>
    </main>
  )
}

export default BirdDetail
