import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { imageDB } from '@/services/firebase'
import { v4 } from 'uuid'
import { useForm } from 'react-hook-form'
import { TBirdSchema, birdSchema } from '@/lib/validations/bird'
import { zodResolver } from '@hookform/resolvers/zod'
import { Bird, Specie, getSpecie } from '@/lib/types'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import noImage from '@/assets/no-image.avif'
import { Button } from '../ui/button'
import { Textarea } from '../ui/textarea'
import { CalendarIcon, Check, ChevronsUpDown, Plus, Shell, Trash } from 'lucide-react'
import { useToast } from '../ui/use-toast'
import { useNavigate } from 'react-router-dom'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { cn, generateRandomHexCode } from '@/lib/utils'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '../ui/command'
import { ScrollArea } from '../ui/scroll-area'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import maleIcon from '@/assets/male.svg'
import femaleIcon from '@/assets/female.svg'
import breedIcon from '@/assets/breed.svg'
import sellIcon from '@/assets/sell.svg'
import { Calendar } from '../ui/calendar'
import { format } from 'date-fns'
import { vi } from 'date-fns/locale'
import { birdFarmApi } from '@/services/bird-farm-api'
import { v4 as uuid } from 'uuid'

type Props = {
  bird?: Bird
  btnTitle: string
  setEdit?: (val: boolean) => void
  action: 'create' | 'update'
}

const code = generateRandomHexCode()

function BirdForm({ bird, btnTitle, setEdit, action }: Props) {
  const [files, setFiles] = useState<File[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [species, setSpecies] = useState<Specie[]>([])
  const form = useForm<TBirdSchema>({
    resolver: zodResolver(birdSchema),
    defaultValues: {
      ...bird,
      specie: bird?.specie ? getSpecie(bird)._id : '',
      name: bird?.name || code,
      birth: bird?.birth ? new Date(bird.birth) : undefined,
      parent: bird?.parent ? JSON.stringify(bird.parent) : undefined //
    }
  })
  const [achievements, setAchievements] = useState(form.getValues('achievements'))
  const newCompetition = useRef<HTMLInputElement>(null)
  const newRank = useRef<HTMLInputElement>(null)

  const onSubmit = async (values: TBirdSchema) => {
    setIsSubmitting(true)
    try {
      let imageUrls: string[] = []
      const image = files[0]
      if (image) {
        const imageRef = ref(imageDB, `images/${image.name + v4()}`)
        await uploadBytes(imageRef, image)
        imageUrls = [await getDownloadURL(imageRef)]
      }

      const body = {
        ...values,
        imageUrls,
        achievements
      }

      const { data } =
        action === 'create'
          ? await birdFarmApi.post('/api/birds', body)
          : await birdFarmApi.put(`/api/birds/${bird?._id}`, body)

      toast({
        variant: 'success',
        title: action === 'create' ? 'Tạo chim mới thành công' : 'Cập nhật chim thành công'
      })

      navigate(`/admin/birds/${data.bird._id}`)
      window.location.reload()
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log({ error })

      const messageError = error.response.data.message
      toast({
        variant: 'destructive',
        title: messageError
      })
      setIsSubmitting(false)
    }
  }

  const handleImage = (e: ChangeEvent<HTMLInputElement>, fieldChange: (value: string[]) => void) => {
    e.preventDefault()

    const fileReader = new FileReader()

    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]
      setFiles(Array.from(e.target.files))

      if (!file.type.includes('image')) return

      fileReader.onload = async (event) => {
        const imageDataUrl = event.target?.result?.toString() || ''
        fieldChange([imageDataUrl])
      }

      fileReader.readAsDataURL(file)
    }
  }

  const handleChangeAchievements = (e: ChangeEvent<HTMLInputElement>, id: string, field: string) => {
    const newAchievements = achievements ? [...achievements] : []
    const updatedAchievement = newAchievements?.find((achievement) => achievement._id === id) || {
      competition: '',
      rank: 0,
      _id: ''
    }

    const newValue = e.target.value

    if (field === 'competition') {
      updatedAchievement[field] = newValue
    }
    if (field === 'rank' && !isNaN(Number(newValue))) {
      updatedAchievement[field] = parseInt(newValue) || 0
    }

    setAchievements(newAchievements)
  }

  const handleDeleteAchievement = (id: string) => {
    setAchievements(achievements?.filter((achievement) => achievement._id !== id))
  }

  const handleAddAchievement = () => {
    const newCompetitionValue = newCompetition.current?.value
    const newRankValue = Number(newRank.current?.value)

    if (newCompetitionValue && !isNaN(newRankValue)) {
      const newAchievement = { competition: newCompetitionValue, rank: newRankValue, _id: uuid() }
      setAchievements(achievements ? [...achievements, newAchievement] : [newAchievement])

      if (newCompetition.current) {
        newCompetition.current.value = ''
      }
      if (newRank.current) {
        newRank.current.value = ''
      }
    }
  }

  useEffect(() => {
    const fetchSpecies = async () => {
      const { data } = await birdFarmApi.get('/api/species')

      setSpecies(data?.species || [])
    }
    fetchSpecies()
  }, [])

  return (
    <Form {...form}>
      <form className='flex flex-col justify-start gap-10' onSubmit={form.handleSubmit(onSubmit)}>
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
                      <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
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
                              form.setValue('name', specie.name + ' mã ' + code)
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
              <FormItem className='flex w-full flex-col gap-3'>
                <FormLabel className='font-bold'>Tên*</FormLabel>
                <FormControl>
                  <Input disabled type='hidden' className='no-focus' {...field} />
                </FormControl>

                <div className='flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300'>
                  {form.getValues('name')}
                </div>

                <FormDescription>Tên được tạo tự động</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <FormField
          control={form.control}
          name='gender'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Giới Tính*</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder='Chọn giới tính cho chim' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value='male'>
                    <div className='flex items-center'>
                      <img className='w-6 h-6 mr-1' src={maleIcon} alt='' />
                      Đực
                    </div>
                  </SelectItem>
                  <SelectItem className='flex items-center' value='female'>
                    <div className='flex items-center'>
                      <img className='w-6 h-6 mr-1' src={femaleIcon} alt='' />
                      Cái
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='type'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Loại Chim*</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder='Chọn loại chim' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value='sell'>
                    <div className='flex items-center'>
                      <img className='w-6 h-6 mr-1' src={sellIcon} alt='' />
                      Chim để bán
                    </div>
                  </SelectItem>
                  <SelectItem className='flex items-center' value='breed'>
                    <div className='flex items-center'>
                      <img className='w-6 h-6 mr-1' src={breedIcon} alt='' />
                      Chim để phối giống
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {form.getValues('type') === 'sell' && (
          <FormField
            control={form.control}
            name='sellPrice'
            render={({ field }) => (
              <FormItem className='flex w-full flex-col gap-3'>
                <FormLabel className='font-bold'>Giá bán*(vnđ)</FormLabel>
                <FormControl>
                  <Input placeholder='Giá bán...' type='text' className='no-focus' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {form.getValues('type') === 'breed' && (
          <FormField
            control={form.control}
            name='breedPrice'
            render={({ field }) => (
              <FormItem className='flex w-full flex-col gap-3'>
                <FormLabel className='font-bold'>Giá phối giống*(vnđ)</FormLabel>
                <FormControl>
                  <Input placeholder='Giá phối giống...' type='text' className='no-focus' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <FormField
          control={form.control}
          name='imageUrls'
          render={({ field }) => (
            <FormItem className='flex items-center gap-4'>
              <FormLabel className=''>
                <div className='font-bold mb-4'>Ảnh</div>
                {!field.value?.length ? (
                  <img src={noImage} alt='imageUrl' width={240} height={240} className='object-contain rounded-md' />
                ) : (
                  field.value.map((url) => {
                    return (
                      <img src={url} alt='imageUrl' width={240} height={240} className='rounded-md object-contain' />
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
          name='birth'
          render={({ field }) => (
            <FormItem className='flex flex-col'>
              <FormLabel>Ngày Sinh</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={'outline'}
                      className={cn('w-[240px] pl-3 text-left font-normal', !field.value && 'text-muted-foreground')}
                    >
                      {field.value ? format(field.value, 'PPP', { locale: vi }) : <span>Chọn ngày sinh</span>}
                      <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className='w-auto p-0' align='start'>
                  <Calendar
                    mode='single'
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) => date > new Date() || date < new Date('1900-01-01')}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        <div>
          <div className='text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 font-semibold text-light-2 mb-3'>
            Thành Tích Thi Đấu
          </div>
          <div className='flex w-full'>
            <div className='grid grid-cols-2 gap-3 w-full'>
              <div className='col-span-1 text-sm flex items-end pb-3'>Tên Cuộc Thi</div>
              <div className='col-span-1 text-sm flex items-end pb-3'>Xếp Hạng</div>
            </div>
            <Button size='icon' variant='outline' className='invisible'></Button>
          </div>
          <div className='flex flex-col gap-3'>
            {achievements?.map((achievement) => {
              return (
                <div key={achievement._id} className='flex w-full gap-3'>
                  <div className='grid grid-cols-2 gap-3 w-full'>
                    <Input
                      onChange={(e) => handleChangeAchievements(e, achievement._id, 'competition')}
                      value={achievement.competition}
                      className='col-span-1 py-2 px-4 rounded-md border-border border'
                    />
                    <Input
                      onChange={(e) => handleChangeAchievements(e, achievement._id, 'rank')}
                      value={achievement.rank}
                      className='col-span-1 py-2 px-4 rounded-md border-border border'
                    />
                  </div>
                  <Button
                    onClick={() => {
                      handleDeleteAchievement(achievement._id)
                    }}
                    size='icon'
                    variant='outline'
                  >
                    <Trash />
                  </Button>
                </div>
              )
            })}
            <div className='flex w-full gap-3'>
              <div className='grid grid-cols-2 gap-3 w-full'>
                <Input ref={newCompetition} className='col-span-1 py-2 px-4 rounded-md border-border border' />
                <Input ref={newRank} className='col-span-1 py-2 px-4 rounded-md border-border border' />
              </div>
              <Button onClick={handleAddAchievement} size='icon' variant='outline'>
                <Plus />
              </Button>
            </div>
          </div>
        </div>

        <FormField
          control={form.control}
          name='description'
          render={({ field }) => (
            <FormItem className='flex w-full flex-col gap-3'>
              <FormLabel className='font-bold'>Mô tả</FormLabel>
              <FormControl>
                <Textarea rows={10} className='no-focus' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className='flex gap-2 justify-end'>
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
            {isSubmitting && <Shell className='ml-1 animate-spin w-4 h-4' />}
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default BirdForm
