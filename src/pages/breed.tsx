import Container from '@/components/ui/container'
import { BirdIcon } from 'lucide-react'
import redHeart from '@/assets/red-heart.svg'
import { useSearchParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { birdFarmApi } from '@/services/bird-farm-api'
import { Bird } from '@/lib/types'
import noImage from '@/assets/no-image.avif'
import maleIcon from '@/assets/male.svg'
import femaleIcon from '@/assets/female.svg'
import { Button } from '@/components/ui/button'
import { formatPrice } from '@/lib/utils'

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

  const priceYoungBird = (maleBird?.breedPrice || 0) + (femaleBird?.breedPrice || 0); 

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

          <div className='font-bold text-xl mt-6'>{maleBird?.name}</div>
        </div>

        <img src={redHeart} className='w-28 h-28' />

        <div className='w-full flex justify-center flex-col items-center'>
          {!femaleBird?.imageUrls?.length ? (
            <img src={noImage} className='w-full aspect-square border max-w-xs' />
          ) : (
            <img src={femaleBird?.imageUrls[0]} className='w-full aspect-square border max-w-xs' />
          )}

          <div className='font-bold text-xl mt-6'>{femaleBird?.name}</div>
        </div>
      </div>
      <div className='w-full flex flex-col items-center'>
        <div className='flex flex-col items-center gap-2 mb-5'>
          <div className='font-bold text-2xl'>Giá chim non</div>
          <div className='flex gap-1 text-2xl'>Chim non <img className='w-6' src={maleIcon}/>: <div className='text-primary'>{formatPrice(priceYoungBird*2)}</div>/con</div>
          <div className='text-xs'>((Giá chim giống đực + giá chim giống cái) x 2)</div>
          <div className='flex gap-1 text-2xl'>Chim non <img className='w-6' src={femaleIcon}/>: <div className='text-primary'>{formatPrice(priceYoungBird)}</div>/con</div>
          <div className='text-xs'>(Giá chim giống đực + giá chim giống cái)</div>
        </div>
        <Button>Xác nhận phối giống</Button>
      </div>
    </Container>
  )
}

export default Pairing
