import Container from '@/components/ui/container'
import { BirdIcon, Shell } from 'lucide-react'
import redHeart from '@/assets/red-heart.svg'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { birdFarmApi } from '@/services/bird-farm-api'
import { Bird } from '@/lib/types'
import noImage from '@/assets/no-image.webp'
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
import maleIcon from '@/assets/male.svg'
import femaleIcon from '@/assets/female.svg'
import { useAuthContext } from '@/contexts/auth-provider'
// import { Button } from '@/components/ui/button'
// import { formatPrice } from '@/lib/utils'

function Pairing() {
  const [searchParams] = useSearchParams()
  const [maleBird, setMaleBird] = useState<Bird | null>(null)
  const [femaleBird, setFemaleBird] = useState<Bird | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate()
  const { user } = useAuthContext()

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

  useEffect(() => {}, [maleBird, femaleBird])

  const deposit = async () => {
    if (!user) {
      toast({
        title: 'Hãy đăng nhập để tiếp tục đặt cọc',
        variant: 'destructive'
      })
      navigate('/auth/sign-in')
      return
    }
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
  const priceYoungBird = (maleBird?.breedPrice || 0) + (femaleBird?.breedPrice || 0)

  return (
    <Container>
      <div className='flex flex-col items-center justify-center gap-4 mb-5'>
        <div className='mt-10 text-3xl uppercase'>Đặt tổ chim non theo yêu cầu</div>
        <div className='flex gap-4'>
          <div className='my-2 border-t-2 w-52' />
          <BirdIcon />
          <div className='my-2 border-t-2 w-52' />
        </div>
      </div>

      <div className='flex items-center justify-around w-full gap-4'>
        <div className='flex flex-col items-center justify-center w-full'>
          <Link to={`/birds/${maleBird?._id}`}>
            <img
              src={maleBird?.imageUrls?.[0] || noImage}
              className='w-full max-w-xs border rounded-lg aspect-square'
            />
          </Link>
          <div className='flex items-center gap-1 mt-6 text-xl font-bold'>
            {maleBird?.name} <img className='w-8 h-8' src={maleIcon} />
          </div>
          <div className='flex items-center gap-1 text-xl font-bold'>
            Giá phối giống:{' '}
            <span className='text-2xl font-normal text-primary'>{formatPrice(maleBird?.breedPrice || 0)}</span>
          </div>
        </div>

        <img src={redHeart} className='w-28 h-28' />

        <div className='flex flex-col items-center justify-center w-full'>
          <Link to={`/birds/${femaleBird?._id}`}>
            <img
              src={femaleBird?.imageUrls?.[0] || noImage}
              className='w-full max-w-xs border rounded-lg aspect-square'
            />
          </Link>
          <div className='flex items-center gap-1 mt-6 text-xl font-bold'>
            {femaleBird?.name} <img className='w-8 h-8' src={femaleIcon} />
          </div>
          <div className='flex items-center gap-1 text-xl font-bold'>
            Giá phối giống:{' '}
            <span className='text-2xl font-normal text-primary'>{formatPrice(femaleBird?.breedPrice || 0)}</span>
          </div>
        </div>
      </div>

      <div className='flex flex-col items-center w-full mt-8'>
        <div className='flex flex-col items-center gap-2 mb-5'>
          <div className='text-2xl font-bold'>Giá chim non</div>
          <div className='flex gap-1 text-2xl'>
            Chim non <img className='w-6' src={maleIcon} />:{' '}
            <div className='text-primary'>{formatPrice(priceYoungBird * 2)}</div>/con
          </div>
          <div className='text-sm'>(Giá phối giống chim đực + giá phối giống chim cái) x 2</div>
          <div className='flex gap-1 text-2xl'>
            Chim non <img className='w-6' src={femaleIcon} />:{' '}
            <div className='text-primary'>{formatPrice(priceYoungBird)}</div>/con
          </div>
          <div className='text-sm'>Giá phối giống chim đực + giá phối giống chim cái</div>
        </div>

        <AlertDialog>
          <AlertDialogTrigger>
            <Button disabled={isSubmitting}>
              Xác nhận phối giống {isSubmitting && <Shell className='w-4 h-4 ml-1 animate-spin' />}
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Đặt cọc cho tổ chim non</AlertDialogTitle>
              <AlertDialogDescription>
                Để có thể đặt tổ chim non, bạn cần đặt cọc trước một khoảng tiền bằng với giá tiền của 1 chim non đực ={' '}
                {formatPrice(priceYoungBird * 2)}
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
      </div>
    </Container>
  )
}

export default Pairing
