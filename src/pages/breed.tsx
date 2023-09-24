import Container from '@/components/ui/container'
import { BirdIcon } from 'lucide-react'
import redHeart from '@/assets/red-heart.svg'
import { useSearchParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { birdFarmApi } from '@/services/bird-farm-api'
import { Bird } from '@/lib/types'
import noImage from '@/assets/no-image.avif'

function Pairing() {
  const [searchParams] = useSearchParams()
  const [maleBird, setMaleBird] = useState<Bird | null>(null)
  const [femaleBird, setFemaleBird] = useState<Bird | null>(null)

  useEffect(() => {
    const fetchBirds = async () => {
      const { data } = await birdFarmApi.post('/api/birds/get-by-ids', {
        birds: [searchParams.get('maleBird'), searchParams.get('femaleBird')]
      })

      const birds: Bird[] = data.birds

      setMaleBird(birds.find((bird) => bird.gender === 'male') || null)
      setFemaleBird(birds.find((bird) => bird.gender === 'female') || null)
    }

    fetchBirds()
  }, [searchParams])

  useEffect(() => {
    console.log({ maleBird, femaleBird })
  }, [maleBird, femaleBird])

  return (
    <Container>
      <div className='flex flex-col justify-center items-center gap-4 mb-5'>
        <div className='uppercase text-3xl mt-10'>Đặt tổ chim non theo yêu cầu</div>
        <div className='flex gap-4'>
          <div className='border-t-2 w-52 my-2'></div>
          <BirdIcon />
          <div className='border-t-2 w-52 my-2'></div>
        </div>
      </div>

      <div className='w-full flex justify-around gap-4 items-center'>
        <div className='w-full flex justify-center flex-col items-center'>
          {!maleBird?.imageUrls?.length ? (
            <img src={noImage} className='w-full aspect-square border max-w-xs' />
          ) : (
            <img src={maleBird?.imageUrls[0]} className='w-full aspect-square border max-w-xs' />
          )}

          <div className='font-bold text-lg mt-6'>{maleBird?.name}</div>
        </div>

        <img src={redHeart} className='w-28 h-28' />

        <div className='w-full flex justify-center flex-col items-center'>
          {!femaleBird?.imageUrls?.length ? (
            <img src={noImage} className='w-full aspect-square border max-w-xs' />
          ) : (
            <img src={femaleBird?.imageUrls[0]} className='w-full aspect-square border max-w-xs' />
          )}

          <div className='font-bold text-lg mt-6'>{femaleBird?.name}</div>
        </div>
      </div>
    </Container>
  )
}

export default Pairing
