import Container from '@/components/ui/container'
import { BirdIcon } from 'lucide-react'
import redHeart from '@/assets/red-heart.svg'
import { useSearchParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { birdFarmApi } from '@/services/bird-farm-api'
import { Bird } from '@/lib/types'
import noImage from '@/assets/no-image.avif'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { formatPrice } from '@/lib/utils'
import { toast } from '@/components/ui/use-toast'
import { loadStripe } from '@stripe/stripe-js'

function Pairing() {
  const [searchParams] = useSearchParams()
  const [maleBird, setMaleBird] = useState<Bird | null>(null)
  const [femaleBird, setFemaleBird] = useState<Bird | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

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

  const deposit = async () => {
    try {
      setIsSubmitting(true)
      const stripe = await loadStripe(import.meta.env.VITE_STRIPE_KEY)

      const { data: session } = await birdFarmApi.post('/api/stripe/create-deposit-session', {
        maleBird: maleBird?._id,
        femaleBird: femaleBird?._id
      })

      const result = await stripe?.redirectToCheckout({
        sessionId: session.id
      })

      if (result?.error) {
        console.log(result.error)
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const messageError = error.response.data.message
      toast({
        variant: 'destructive',
        title: messageError || 'Không rõ nguyễn nhân'
      })
      setIsSubmitting(false)
    }
  }

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

      <AlertDialog>
        <AlertDialogTrigger>
          <Button>Đặt tổ chim non</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Đạt cọc cho tổ chim non</AlertDialogTitle>
            <AlertDialogDescription>
              Để có thể đặt tổ chim non, bạn cần đặt cọc trước một khoảng tiền = giá phối giống chim bố + giá phối giống
              chim mẹ ={` ${formatPrice(maleBird?.breedPrice || 0)} + ${formatPrice(femaleBird?.breedPrice || 0)} `}=
              {` ${formatPrice((maleBird?.breedPrice || 0) + (femaleBird?.breedPrice || 0))}`}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Trở lại</AlertDialogCancel>
            <AlertDialogAction asChild>
              <Button onClick={deposit} disabled={isSubmitting}>
                Đặt cọc
              </Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Container>
  )
}

export default Pairing
