/* eslint-disable @typescript-eslint/no-explicit-any */
import { birdFarmApi } from '@/services/bird-farm-api'
import { imageDB } from '@/services/firebase'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { ChangeEvent, useEffect, useState } from 'react'
import { v4 } from 'uuid'
import { ReactSortable } from 'react-sortablejs'
import { Button, buttonVariants } from '@/components/ui/button'
import Spinner from '@/components/ui/spinner'
import { cn } from '@/lib/utils'
import { Shell, Trash, UploadIcon } from 'lucide-react'
import { toast } from '@/components/ui/use-toast'

type TUpdateBanner = {
  updating: boolean
  updatedBannerUrls: string[]
  isSubmitting: boolean
}
type TUpdateDefaultAvatar = {
  updating: boolean
  isSubmitting: boolean
  updatedDefaultAvatar: string | null
}

function ManageMedia() {
  const [bannerUrls, setBannerUrls] = useState<string[]>([])
  const [defaultAvatarUrl, setDefaultAvatarUrl] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [updateBanner, setUpdateBanner] = useState<TUpdateBanner>({
    updating: false,
    updatedBannerUrls: [],
    isSubmitting: false
  })
  const [updateDefaultAvatar, setUpdateDefaultAvatar] = useState<TUpdateDefaultAvatar>({
    updating: false,
    updatedDefaultAvatar: null,
    isSubmitting: false
  })

  const [files, setFiles] = useState<File[]>([])

  useEffect(() => {
    const fetchMedia = async () => {
      const { data } = await birdFarmApi.get('/api/media')
      setBannerUrls(data.media.bannerUrls)
      setDefaultAvatarUrl(data.media.defaultAvatarUrl)
    }

    fetchMedia()
  }, [])

  const uploadImages = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsUploading(true)

    const image = e.target.files?.[0]

    if (!image) return

    const imageRef = ref(imageDB, `images/${image.name + v4()}`)

    await uploadBytes(imageRef, image)

    const url = await getDownloadURL(imageRef)

    setUpdateBanner((prev) => ({ ...prev, updatedBannerUrls: [...prev.updatedBannerUrls, url] }))

    setIsUploading(false)
  }

  const handleUpdateBanner = async () => {
    setUpdateBanner((prev) => ({ ...prev, isSubmitting: true }))
    try {
      await birdFarmApi.put(`/api/media`, { bannerUrls: updateBanner.updatedBannerUrls })
      window.location.reload()
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setUpdateBanner((prev) => ({ ...prev, isSubmitting: false }))
      const messageError = error.response.data.message
      toast({
        variant: 'destructive',
        title: 'Không thể cập nhật banner',
        description: messageError || 'Không rõ nguyễn nhân'
      })
    }
  }

  const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()

    const fileReader = new FileReader()

    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]
      setFiles(Array.from(e.target.files))

      if (!file.type.includes('image')) return

      fileReader.onload = async (event) => {
        const imageDataUrl = event.target?.result?.toString() || ''
        setUpdateDefaultAvatar((prev) => ({ ...prev, updatedDefaultAvatar: imageDataUrl }))
      }

      fileReader.readAsDataURL(file)
    }
  }

  const handleUpdateDefaultAvatar = async () => {
    setUpdateDefaultAvatar((prev) => ({ ...prev, isSubmitting: true }))
    try {
      let defaultAvatarUrl
      const image = files[0]
      if (image) {
        const imageRef = ref(imageDB, `images/${image.name + v4()}`)
        await uploadBytes(imageRef, image)
        defaultAvatarUrl = await getDownloadURL(imageRef)
      }

      await birdFarmApi.put(`/api/media`, { defaultAvatarUrl })

      window.location.reload()
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const messageError = error.response.data.message
      toast({
        variant: 'destructive',
        title: 'Không thể cập nhật ảnh đại diện mặc định',
        description: messageError || 'Không rõ nguyên nhân'
      })
      setUpdateDefaultAvatar((prev) => ({ ...prev, isSubmitting: false }))
    }
  }

  return (
    <div>
      <div className='text-3xl font-bold mb-4'>Media</div>

      <div className='flex items-center justify-between mb-6'>
        <div className='text-2xl font-bold'>Banner</div>
        {!updateBanner.updating && (
          <Button
            onClick={() => {
              setUpdateBanner({
                updating: true,
                updatedBannerUrls: bannerUrls,
                isSubmitting: false
              })
            }}
          >
            Chỉnh sửa
          </Button>
        )}
      </div>

      {!updateBanner.updating && (
        <div className='flex flex-wrap gap-2'>
          {bannerUrls.map((url) => {
            return <img key={url} src={url} alt='' className='h-44 aspect-video object-cover border rounded-md' />
          })}
        </div>
      )}
      {updateBanner.updating && (
        <>
          <div className='flex flex-wrap gap-2'>
            <ReactSortable
              list={updateBanner.updatedBannerUrls as any}
              setList={(val) => {
                setUpdateBanner((prev) => ({ ...prev, updatedBannerUrls: val as any }))
              }}
              className='flex flex-wrap gap-2'
            >
              {updateBanner.updatedBannerUrls.map((url) => {
                return (
                  <div className='h-44 aspect-video group relative'>
                    <Button
                      onClick={() => {
                        setUpdateBanner((prev) => ({
                          ...prev,
                          updatedBannerUrls: prev.updatedBannerUrls.filter((banner) => banner !== url)
                        }))
                      }}
                      size='icon'
                      className='absolute top-2 right-2 opacity-60 hover:opacity-100 hidden group-hover:flex'
                    >
                      <Trash className='' />
                    </Button>
                    <img key={url} src={url} alt='' className='w-full h-full object-cover border rounded-md' />'
                  </div>
                )
              })}
            </ReactSortable>

            {isUploading ? (
              <div className='flex items-center justify-center h-44 aspect-square'>
                <Spinner className='text-primary' />
              </div>
            ) : (
              <div className={cn(buttonVariants({ variant: 'outline' }), 'h-44 aspect-square cursor-pointer border-2')}>
                <label>
                  <div className='flex flex-col items-center justify-center'>
                    <UploadIcon />
                    <h1 className='text-base normal-case'>Tải lên</h1>
                  </div>
                  <input onChange={(e) => uploadImages(e)} type='file' className='hidden' />
                </label>
              </div>
            )}
          </div>
          <div className='flex justify-end items-center gap-2 mt-4'>
            <Button
              disabled={updateBanner.isSubmitting}
              onClick={() => {
                setUpdateBanner({ updating: false, updatedBannerUrls: [], isSubmitting: false })
              }}
              variant='outline'
            >
              Hủy
            </Button>
            <Button disabled={updateBanner.isSubmitting} onClick={handleUpdateBanner}>
              Lưu {updateBanner.isSubmitting && <Shell className='w-4 h-4 ml-1 animate-spin' />}
            </Button>
          </div>
        </>
      )}

      <div className='flex items-center justify-between mb-6 mt-12'>
        <div className='text-2xl font-bold'>Ảnh đại diện mặc định</div>
        {!updateDefaultAvatar.updating && (
          <Button
            onClick={() => {
              setUpdateDefaultAvatar({
                updating: true,
                isSubmitting: false,
                updatedDefaultAvatar: defaultAvatarUrl
              })
            }}
          >
            Chỉnh sửa
          </Button>
        )}
      </div>
      {!updateDefaultAvatar.updating && <img src={defaultAvatarUrl || ''} className='w-44 h-44' />}
      {updateDefaultAvatar.updating && (
        <>
          <div className='flex flex-wrap gap-2'>
            <img src={updateDefaultAvatar.updatedDefaultAvatar || ''} className='w-44 h-44' />

            <label className=''>
              <div
                className={cn(
                  buttonVariants({ variant: 'outline' }),
                  'h-44 aspect-square cursor-pointer border-2 flex flex-col'
                )}
              >
                <UploadIcon />
                <h1 className='text-base normal-case'>Tải lên</h1>
              </div>
              <input onChange={handleImage} type='file' className='hidden' />
            </label>
          </div>
          <div className='flex justify-end items-center gap-2 mt-4'>
            <Button
              disabled={updateDefaultAvatar.isSubmitting}
              onClick={() => {
                setUpdateDefaultAvatar({ updating: false, isSubmitting: false, updatedDefaultAvatar: null })
              }}
              variant='outline'
            >
              Hủy
            </Button>
            <Button disabled={updateDefaultAvatar.isSubmitting} onClick={handleUpdateDefaultAvatar}>
              Lưu {updateDefaultAvatar.isSubmitting && <Shell className='w-4 h-4 ml-1 animate-spin' />}
            </Button>
          </div>
        </>
      )}
    </div>
  )
}

export default ManageMedia
