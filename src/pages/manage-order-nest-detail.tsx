import { Button, buttonVariants } from '@/components/ui/button'
import Spinner from '@/components/ui/spinner'
import { OrderNest } from '@/lib/types'
import { birdFarmApi } from '@/services/bird-farm-api'
import { ArrowLeft, Shell } from 'lucide-react'
import { ChangeEvent, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import cancel from '@/assets/cancel.svg'
import approve from '@/assets/approve.svg'
import { useToast } from '@/components/ui/use-toast'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import noImage from '@/assets/no-image.webp'
import { cn } from '@/lib/utils'
import { imageDB } from '@/services/firebase'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { v4 } from 'uuid'
import paymentIcon from '@/assets/payment.svg'

function ManageOrderNestDetail() {
  const { id } = useParams()
  const [orderNest, setOrderNest] = useState<OrderNest | null>(null)
  const [approvingOrderNest, setApprovingOrderNest] = useState(false)
  const { toast } = useToast()
  const [openAddStageForm, setOpenAddStageForm] = useState(false)

  const [requestingPayment, setRequestingPayment] = useState(false)

  const approveOrderNest = async () => {
    try {
      setApprovingOrderNest(true)
      await birdFarmApi.put(`/api/order-nests/${id}/approve`)
      window.location.reload()
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const msg = error?.response?.data?.message
      toast({
        title: 'Chấp nhận đơn hàng thất bại',
        description: msg || 'Không rõ lý do',
        variant: 'destructive'
      })
      setApprovingOrderNest(false)
    }
  }

  const requestPayment = async () => {
    try {
      setRequestingPayment(true)
      await birdFarmApi.put(`/api/order-nests/${id}/request-payment`)
      window.location.reload()
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const msg = error?.response?.data?.message
      toast({
        title: 'Yêu cầu thanh toán thất bại',
        description: msg || 'Không rõ lý do',
        variant: 'destructive'
      })
      setRequestingPayment(false)
    }
  }

  useEffect(() => {
    const fetchOrderNest = async () => {
      try {
        const { data } = await birdFarmApi.get(`/api/order-nests/${id}`)
        setOrderNest(data?.orderNest || null)
      } catch (error) {
        console.log(error)
      }
    }

    fetchOrderNest()
  }, [id])

  if (!orderNest) {
    return <Spinner />
  }

  return (
    <div>
      <div className='flex items-center justify-between mb-6'>
        <div className='flex gap-2'>
          <div className='text-3xl font-bold'>Chi tiết đơn tổ chim</div>
        </div>

        <div className='flex gap-2'>
          <Button disabled={approvingOrderNest} asChild>
            <Link className='mb-6 flex items-center gap-1 my-auto' to='/staff/order-nests'>
              <span>Quay lại</span>
              <ArrowLeft className='w-5 h-5' />
            </Link>
          </Button>
        </div>
      </div>

      <div className='flex justify-end gap-4 mt-4'>
        <Button
          variant='outline'
          disabled={approvingOrderNest || requestingPayment}
          onClick={() => {}}
          className='mb-6 flex items-center gap-1 my-auto'
        >
          <span>Hủy đơn hàng</span>
          <img src={cancel} className='w-5 h-5 dark:filter dark:invert ml-1' />
        </Button>
        {orderNest.status === 'processing' && (
          <Button
            disabled={approvingOrderNest}
            onClick={approveOrderNest}
            className='mb-6 flex items-center gap-1 my-auto'
          >
            <span>Chấp nhận đơn hàng</span>
            <img src={approve} className='w-5 h-5 filter invert' />
            {approvingOrderNest && <Shell className='animate-spin w-4 h-4 ml-1' />}
          </Button>
        )}
        {orderNest.status === 'breeding' && (
          <Button
            disabled={requestingPayment}
            onClick={requestPayment}
            className='mb-6 flex items-center gap-1 my-auto'
          >
            <span>Yêu cầu thanh toán</span>
            <img src={paymentIcon} className='w-5 h-5 filter invert' />
            {requestingPayment && <Shell className='animate-spin w-4 h-4 ml-1' />}
          </Button>
        )}
      </div>

      {!openAddStageForm && orderNest.status === 'breeding' && (
        <Button
          onClick={() => {
            setOpenAddStageForm(true)
          }}
        >
          Thêm giai đoạn mới
        </Button>
      )}
      {openAddStageForm && <AddStageForm setOpenAddStageForm={setOpenAddStageForm} id={id} />}
    </div>
  )
}

export default ManageOrderNestDetail

const addStageSchema = z.object({
  name: z.string({ required_error: 'Bắt buôc' }),
  imageUrl: z.string({ required_error: 'Bắt buôc' }),
  description: z.string({ required_error: 'Bắt buôc' })
})

type TAddStageSchema = z.infer<typeof addStageSchema>

type AddStageFormProps = {
  id?: string
  setOpenAddStageForm: (val: boolean) => void
}

const AddStageForm = ({ id, setOpenAddStageForm }: AddStageFormProps) => {
  const [files, setFiles] = useState<File[]>([])
  const { toast } = useToast()
  const form = useForm<TAddStageSchema>({
    resolver: zodResolver(addStageSchema)
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function onSubmit(values: TAddStageSchema) {
    try {
      setIsSubmitting(true)

      let imageUrl
      const image = files[0]
      if (image) {
        const imageRef = ref(imageDB, `images/${image.name + v4()}`)
        await uploadBytes(imageRef, image)
        imageUrl = await getDownloadURL(imageRef)
      }

      await birdFarmApi.post(`/api/order-nests/${id}/add-stage`, { ...values, imageUrl })

      window.location.reload()
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const messageError = error.response.data.message
      toast({
        variant: 'destructive',
        title: 'Không thể đánh giá',
        description: messageError || 'Không rõ nguyễn nhân'
      })
      setIsSubmitting(false)
    }
  }

  const handleImage = (e: ChangeEvent<HTMLInputElement>, fieldChange: (value: string) => void) => {
    e.preventDefault()

    const fileReader = new FileReader()

    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]
      setFiles(Array.from(e.target.files))

      if (!file.type.includes('image')) return

      fileReader.onload = async (event) => {
        const imageDataUrl = event.target?.result?.toString() || ''
        fieldChange(imageDataUrl)
      }

      fileReader.readAsDataURL(file)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tên giai đoạn</FormLabel>
              <FormControl>
                <Input placeholder='Nhập tên giao đoạn...' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='imageUrl'
          render={({ field }) => (
            <FormItem className='flex items-center gap-4'>
              <FormLabel className=''>
                <div className='font-bold mb-4'>Ảnh</div>
                <img
                  src={field.value || noImage}
                  alt='imageUrl'
                  width={240}
                  height={240}
                  className='rounded-md object-cover border'
                />
              </FormLabel>
              <FormControl>
                <Input
                  type='file'
                  accept='image/*'
                  placeholder='Add profile photo'
                  className='hidden'
                  onChange={(e) => handleImage(e, field.onChange)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='description'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mô tả</FormLabel>
              <FormControl>
                <Textarea rows={5} placeholder='Nhập mô tả...' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className='flex justify-end gap-2'>
          <div
            onClick={() => {
              setOpenAddStageForm(false)
            }}
            className={cn('cursor-pointer', buttonVariants({ variant: 'outline' }))}
          >
            Hủy
          </div>
          <Button disabled={isSubmitting} type='submit'>
            Thêm {isSubmitting && <Shell className='animate-spin w-4 h-4' />}
          </Button>
        </div>
      </form>
    </Form>
  )
}
