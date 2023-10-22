import { useEffect, useState } from 'react'
import { Button, buttonVariants } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Shell } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useAuthContext } from '@/contexts/auth-provider'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { imageDB } from '@/services/firebase'
import { v4 } from 'uuid'
import { birdFarmApi } from '@/services/bird-farm-api'
import { toast } from '@/components/ui/use-toast'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

function UserProfile() {
  const { user } = useAuthContext()
  const [nameValue, setNameValue] = useState<string>(user?.name || '')
  const [files, setFiles] = useState<File[]>([])
  const [imageUrl, setImageUrl] = useState(user?.imageUrl)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [defaultAvatarUrl, setDefaultAvatarUrl] = useState<string | null>(null)

  useEffect(() => {
    const fetchMedia = async () => {
      const { data } = await birdFarmApi.get('/api/media')
      setDefaultAvatarUrl(data.media.defaultAvatarUrl)
    }

    fetchMedia()
  }, [])

  useEffect(() => {
    setNameValue(user?.name || '')
    setImageUrl(user?.imageUrl)
  }, [user])

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()

    const fileReader = new FileReader()

    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]
      setFiles(Array.from(e.target.files))

      if (!file.type.includes('image')) return

      fileReader.onload = async (event) => {
        const imageDataUrl = event.target?.result?.toString() || ''
        setImageUrl(imageDataUrl)
      }

      fileReader.readAsDataURL(file)
    }
  }

  const handleSaveChange = async () => {
    setIsSubmitting(true)
    try {
      let imageUrl
      const image = files[0]
      if (image) {
        const imageRef = ref(imageDB, `images/${image.name + v4()}`)
        await uploadBytes(imageRef, image)
        imageUrl = await getDownloadURL(imageRef)
      }
      await birdFarmApi.post(`/api/users/${user?._id}`, {
        imageUrl: imageUrl,
        name: nameValue || undefined
      })

      window.location.reload()
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

  return (
    <div>
      <h1 className='mb-4 text-2xl font-semibold'>Hồ sơ của tôi</h1>

      <div className='flex items-center mb-4 gap-8'>
        <Avatar className='w-28 h-28 cursor-pointer border-2 border-primary'>
          <AvatarImage src={imageUrl || defaultAvatarUrl || 'https://github.com/shadcn.png'} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className='flex flex-col'>
          <label>
            <div className={cn('cursor-pointer', buttonVariants({ variant: 'outline' }))}>Cập nhật ảnh đại diện</div>
            <Input
              type='file'
              className='hidden'
              // accept='image/jpeg, image/png, image/gif'
              onChange={handleImage}
            />
          </label>
        </div>
      </div>

      <div>
        <div className='font-medium mb-2'>Tên</div>
        <Input
          type='text'
          value={nameValue}
          onChange={(e) => {
            setNameValue(e.target.value)
          }}
        />

        <div className='font-medium mb-2 mt-4'>Email</div>
        <Input disabled type='text' value={user?.email} />
      </div>

      <Button disabled={isSubmitting} onClick={handleSaveChange} className='float-right mt-8'>
        Lưu thay đổi {isSubmitting && <Shell className='w-4 h-4 ml-1 animate-spin' />}
      </Button>
    </div>
  )
}

export default UserProfile
