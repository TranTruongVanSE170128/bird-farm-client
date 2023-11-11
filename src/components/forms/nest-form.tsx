import { ChangeEvent, useEffect, useState } from 'react'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { imageDB } from '@/services/firebase'
import { v4 } from 'uuid'
import { useForm } from 'react-hook-form'
import { TNestSchema, nestSchema } from '@/lib/validations/nest'
import { zodResolver } from '@hookform/resolvers/zod'
import { Bird, Nest, Specie, getSpecie } from '@/lib/types'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import noImage from '@/assets/no-image.webp'
import { Button } from '../ui/button'
import { Textarea } from '../ui/textarea'
import { Check, ChevronsUpDown, Shell } from 'lucide-react'
import { useToast } from '../ui/use-toast'
import { useNavigate } from 'react-router-dom'
import { cn, generateRandomHexCode } from '@/lib/utils'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '../ui/command'
import { ScrollArea } from '../ui/scroll-area'
import { birdFarmApi } from '@/services/bird-farm-api'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'

type Props = {
  nest?: Nest
  btnTitle: string
  setEdit?: (val: boolean) => void
  action: 'create' | 'update'
}

const code = generateRandomHexCode()

function NestForm({ nest, btnTitle, action, setEdit }: Props) {
  const [files, setFiles] = useState<File[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [species, setSpecies] = useState<Specie[]>([])
  const [ableBirdDads, setAbleBirdDads] = useState<Bird[]>([])
  const [ableBirdMoms, setAbleBirdMoms] = useState<Bird[]>([])

  const form = useForm<TNestSchema>({
    resolver: zodResolver(nestSchema),
    defaultValues: {
      imageUrls: nest?.imageUrls,
      description: nest?.description,
      name: nest?.name ? nest.name : code, //
      price: nest?.price,
      specie: nest?.specie ? getSpecie(nest)._id : '',
      dad: nest?.dad?._id,
      mom: nest?.mom?._id
    }
  })

  const specie = form.getValues('specie')

  const onSubmit = async (values: TNestSchema) => {
    setIsSubmitting(true)
    try {
      let imageUrls: string[] = nest?.imageUrls || []
      const image = files[0]
      if (image) {
        const imageRef = ref(imageDB, `images/${image.name + v4()}`)
        await uploadBytes(imageRef, image)
        imageUrls = [await getDownloadURL(imageRef)]
      }

      const body = {
        ...values,
        imageUrls
      }

      const { data } =
        action === 'create'
          ? await birdFarmApi.post('/api/nests', body)
          : await birdFarmApi.put(`/api/nests/${nest?._id}`, body)

      toast({
        variant: 'success',
        title: action === 'create' ? 'Tạo chim mới thành công' : 'Cập nhật chim thành công'
      })

      navigate(`/manager/nests/${data.nest._id}`)
      window.location.reload()
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log({ error })

      const messageError = error.response.data.message
      toast({
        variant: 'destructive',
        description: messageError || 'Không rõ nguyên nhân',
        title: 'Lỗi'
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

  useEffect(() => {
    const fetchSpecies = async () => {
      const { data } = await birdFarmApi.get('/api/species')

      setSpecies(data?.species || [])
    }
    fetchSpecies()
  }, [])

  useEffect(() => {
    const fetchAbleParent = async () => {
      const { data } = await birdFarmApi.get(`/api/birds/breed?specie=${specie}`)

      setAbleBirdDads(data?.birdsMale || [])
      setAbleBirdMoms(data?.birdsFemale || [])
    }

    if (specie) {
      fetchAbleParent()
    }
  }, [specie])

  return (
    <Form {...form}>
      <form className='flex flex-col justify-start gap-10' onSubmit={form.handleSubmit(onSubmit)}>
        <div className='flex gap-4'>
          <FormField
            control={form.control}
            name='specie'
            render={({ field }) => (
              <FormItem className='flex flex-col'>
                <FormLabel>Loài*</FormLabel>
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        aria-expanded={open}
                        variant='outline'
                        role='combobox'
                        className={cn('w-[200px] justify-between', !field.value && 'text-muted-foreground')}
                      >
                        {field.value ? species.find((specie) => specie._id === field.value)?.name : 'Chọn loài'}
                        <ChevronsUpDown className='w-4 h-4 ml-2 opacity-50 shrink-0' />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className='w-[200px] p-0'>
                    <Command>
                      <CommandInput placeholder='Search framework...' />
                      <CommandEmpty>Không tìm thấy.</CommandEmpty>
                      <CommandGroup>
                        <ScrollArea className='h-96'>
                          {species.map((specie) => (
                            <CommandItem
                              className='cursor-pointer'
                              value={specie.name}
                              key={specie._id}
                              onSelect={() => {
                                setOpen(false)
                                form.setValue('specie', specie._id)
                                form.setValue('name', 'Tổ ' + specie.name + ' mã ' + code)
                              }}
                            >
                              <Check
                                className={cn('mr-2 h-4 w-4', specie._id === field.value ? 'opacity-100' : 'opacity-0')}
                              />
                              {specie.name}
                            </CommandItem>
                          ))}
                        </ScrollArea>
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          {form.getValues('specie') && (
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem className='flex flex-col w-full'>
                  <FormLabel className='font-bold text-light-2'>Tên Tổ Chim*</FormLabel>
                  <FormControl>
                    <Input disabled className='' {...field} />
                  </FormControl>
                  <FormDescription>Tên tổ chim được tạo tự động</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
        </div>

        <div className='flex gap-4'>
          <FormItem className='w-64'>
            <FormLabel>Chim bố</FormLabel>
            <Select
              defaultValue={form.getValues('dad')}
              onValueChange={(value: string) => {
                form.setValue('dad', value)
              }}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder='Chọn chim bố...' />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {ableBirdDads.map((bird) => {
                  return <SelectItem value={bird._id}>{bird.name}</SelectItem>
                })}
              </SelectContent>
            </Select>
          </FormItem>

          <FormItem className='w-64'>
            <FormLabel>Chim mẹ</FormLabel>
            <Select
              defaultValue={form.getValues('mom')}
              onValueChange={(value: string) => {
                form.setValue('mom', value)
              }}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder='Chọn chim mẹ...' />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {ableBirdMoms.map((bird) => {
                  return <SelectItem value={bird._id}>{bird.name}</SelectItem>
                })}
              </SelectContent>
            </Select>
          </FormItem>

          <FormField
            control={form.control}
            name='price'
            render={({ field }) => (
              <FormItem className='flex w-full flex-col gap-2 mt-[3px]'>
                <FormLabel className='font-bold'>Giá*(vnđ)</FormLabel>
                <FormControl>
                  <Input placeholder='Giá chim...' type='text' className='no-focus' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name='imageUrls'
          render={({ field }) => (
            <FormItem className='flex items-center gap-4'>
              <FormLabel className=''>
                <div className='mb-4 font-bold'>Ảnh</div>
                {!field.value?.length ? (
                  <img
                    src={noImage}
                    alt='imageUrl'
                    width={240}
                    height={240}
                    className='object-contain border rounded-md'
                  />
                ) : (
                  field.value.map((url) => {
                    return (
                      <img src={url} alt='imageUrl' width={240} height={240} className='object-contain rounded-md' />
                    )
                  })
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
            <FormItem className='flex flex-col w-full gap-3'>
              <FormLabel className='font-bold text-light-2'>Mô tả</FormLabel>
              <FormControl>
                <Textarea rows={10} className='' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className='flex justify-end gap-2'>
          {setEdit && (
            <Button
              onClick={() => {
                setEdit(false)
              }}
              disabled={isSubmitting}
              variant='outline'
              type='submit'
            >
              Hủy
            </Button>
          )}
          <Button disabled={isSubmitting} type='submit'>
            {btnTitle}
            {isSubmitting && <Shell className='w-4 h-4 ml-1 animate-spin' />}
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default NestForm
