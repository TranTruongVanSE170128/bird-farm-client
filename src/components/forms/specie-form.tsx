import { ChangeEvent, useState } from 'react'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { imageDB } from '@/services/firebase'
import { v4 } from 'uuid'
import { useForm } from 'react-hook-form'
import { TSpecieSchema, specieSchema } from '@/lib/validations/specie'
import { zodResolver } from '@hookform/resolvers/zod'
import { Specie } from '@/lib/types'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import noImage from '@/assets/no-image.avif'
import { Button } from '../ui/button'
import { Textarea } from '../ui/textarea'
import { Shell } from 'lucide-react'
import { useToast } from '../ui/use-toast'
import { useNavigate } from 'react-router-dom'
import { birdFarmApi } from '@/services/bird-farm-api'

type Props = {
  specie?: Specie
  btnTitle: string
}

function SpecieForm({ specie, btnTitle }: Props) {
  const [files, setFiles] = useState<File[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()
  const navigate = useNavigate()

  const form = useForm<TSpecieSchema>({
    resolver: zodResolver(specieSchema),
    defaultValues: {
      imageUrl: specie?.imageUrl ? specie.imageUrl : '',
      description: specie?.description ? specie.description : '',
      name: specie?.name ? specie.name : ''
    }
  })

  const onSubmit = async (values: TSpecieSchema) => {
    setIsSubmitting(true)
    try {
      let imageUrl = ''
      const image = files[0]
      if (image) {
        const imageRef = ref(imageDB, `images/${image.name + v4()}`)
        await uploadBytes(imageRef, image)
        imageUrl = await getDownloadURL(imageRef)
      }

      await birdFarmApi.post('/api/species', {
        ...values,
        imageUrl
      })

      toast({
        variant: 'success',
        title: 'Tạo loài mới thành công'
      })

      navigate('/admin/species')
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const messageError = error.response.data.message
      toast({
        variant: 'destructive',
        title: messageError
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
      <form className='flex flex-col justify-start gap-10' onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem className='flex w-full flex-col gap-3'>
              <FormLabel className='font-bold text-light-2'>Tên Loài*</FormLabel>
              <FormControl>
                <Input type='text' className='account-form_input no-focus' {...field} />
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
                <div className='font-bold text-light-2 mb-4'>Ảnh</div>
                {field.value ? (
                  <img
                    src={field.value}
                    alt='imageUrl'
                    width={240}
                    height={240}
                    className='rounded-md object-contain'
                  />
                ) : (
                  <img src={noImage} alt='imageUrl' width={240} height={240} className='object-contain rounded-md' />
                )}
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
            <FormItem className='flex w-full flex-col gap-3'>
              <FormLabel className='font-bold text-light-2'>Mô tả</FormLabel>
              <FormControl>
                <Textarea rows={10} className='account-form_input no-focus' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button disabled={isSubmitting} type='submit'>
          {btnTitle}
          {isSubmitting && <Shell className='ml-1 animate-spin w-4 h-4' />}
        </Button>
      </form>
    </Form>
  )
}

export default SpecieForm
