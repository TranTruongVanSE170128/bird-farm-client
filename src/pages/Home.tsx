import BirdCard from '@/components/bird-card'
import SpecieCard from '@/components/specie-card'
import Container from '@/components/ui/container'

function Home() {
  return (
    <Container>
      <div className='space-y-4 mt-8'>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
          <SpecieCard />
          <SpecieCard />
          <SpecieCard />
          <SpecieCard />
          <SpecieCard />
          <SpecieCard />
          <SpecieCard />
          <SpecieCard />
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
          <BirdCard />
          <BirdCard />
          <BirdCard />
          <BirdCard />
          <BirdCard />
          <BirdCard />
          <BirdCard />
          <BirdCard />
        </div>
      </div>
    </Container>
  )
}

export default Home
