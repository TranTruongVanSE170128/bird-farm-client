import BirdCard from '@/components/bird-card'
import SpecieCard from '@/components/specie-card'
import { Button } from '@/components/ui/button'
import Container from '@/components/ui/container'
import { ShoppingBag } from 'lucide-react'
import { useRef } from 'react'
import { Link } from 'react-router-dom'

function Home() {
  const speciesSection = useRef<HTMLHeadingElement>(null)

  return (
    <Container>
      <div className='rounded-lg overflow-hidden'>
        <div
          style={{ backgroundImage: `url(https://images.alphacoders.com/774/thumb-1920-774587.jpg)` }}
          className='rounded-lg relative aspect-square md:aspect-[2.4/1] overflow-hidden bg-cover mt-8'
        >
          <div className='h-full w-full flex flex-col justify-center items-center text-center gap-y-8'>
            <div className='font-bold text-3xl sm:text-5xl lg:text-6xl sm:max-w-xl max-w-xs text-foreground bg-background/70 p-4 rounded-lg'>
              Bird Farm
              <Button
                onClick={() => {
                  speciesSection.current?.scrollIntoView({
                    behavior: 'smooth'
                  })
                }}
                size='lg'
                className='w-full py-6 text-xl'
              >
                <ShoppingBag className='mr-2' />
                Shop Now
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className='flex justify-between items-center mt-8 mb-4'>
        <h1 ref={speciesSection} className='text-3xl font-bold'>
          Các loài chim bán chạy
        </h1>

        <Link to='/' className='text-xl underline text-primary font-bold'>
          Xem thêm
        </Link>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
        <SpecieCard />
        <SpecieCard />
        <SpecieCard />
        <SpecieCard />
      </div>

      <Button className='mx-auto block mt-6' size='lg'>
        Xem tất cả
      </Button>

      <div className='flex justify-between items-center mt-8 mb-4'>
        <h1 className='text-3xl font-bold'>Chim đang bán tại cửa hàng</h1>

        <Link to='/' className='text-xl underline text-primary font-bold'>
          Xem thêm
        </Link>
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
        <BirdCard />
        <BirdCard />
        <BirdCard />
        <BirdCard />
      </div>

      <Button className='mx-auto block mt-6' size='lg'>
        Xem tất cả
      </Button>
    </Container>
  )
}

export default Home
