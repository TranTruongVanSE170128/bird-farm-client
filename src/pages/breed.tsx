import Container from '@/components/ui/container'
import { BirdIcon } from 'lucide-react'
import redHeart from '@/assets/red-heart.svg'

function Pairing() {
  return (
    <Container>
      <div className='flex flex-col justify-center items-center gap-4 mb-5'>
        <div className='uppercase text-3xl mt-10'>Đặt tổ chim non theo yêu cầu</div>
        <div className='flex gap-4'>
          <div className='border-t-2 border-white w-52 my-2'></div>
          <BirdIcon />
          <div className='border-t-2 border-white w-52 my-2'></div>
        </div>
      </div>

      <div className='w-full flex justify-around gap-4'>
        <div className='w-56 h-96 border border-white' />
        <div className='flex items-center'>
          <img src={redHeart} className='w-40 h-40' />
        </div>
        <div className='w-56 h-96 border border-white'></div>
      </div>
    </Container>
  )
}

export default Pairing
