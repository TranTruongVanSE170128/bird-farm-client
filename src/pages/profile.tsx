import { useEffect, useState } from 'react'
import Container from '@/components/ui/container'
import { Button, buttonVariants } from '@/components/ui/button'
import voucherIcon from '@/assets/voucher.svg'
import { Input } from '@/components/ui/input'
import { Bell, Plus, Shell, User } from 'lucide-react'
import { Link, useSearchParams } from 'react-router-dom'
import { cn, roleToVi } from '@/lib/utils'
import { useAuthContext } from '@/contexts/auth-provider'
import noImage from '@/assets/no-image.avif'
import addressIcon from '@/assets/address.svg'
import AddressCard from '@/components/address-card'
import { Address, Voucher } from '@/lib/types'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { imageDB } from '@/services/firebase'
import { v4 } from 'uuid'
import { birdFarmApi } from '@/services/bird-farm-api'
import { toast } from '@/components/ui/use-toast'
import VoucherTicket from '@/components/voucher-ticket'

const addresses: Address[] = [
  {
    address: '123 Main Street',
    phone: '555-123-4567',
    receiver: 'John Doe',
    default: true
  },
  {
    address: '456 Elm Avenue',
    phone: '555-987-6543',
    receiver: 'Jane Smith',
    default: false
  },
  {
    address: '789 Oak Road',
    phone: '555-555-5555',
    receiver: 'Alice Johnson',
    default: false
  }
]

function Profile() {
  const [searchParams] = useSearchParams()
  const activeTab = searchParams.get('tab')
  const { user } = useAuthContext()
  const [nameValue, setNameValue] = useState<string>(user?.name || '')
  const [files, setFiles] = useState<File[]>([])
  const [imageUrl, setImageUrl] = useState(user?.imageUrl)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [vouchers, setVouchers] = useState<Voucher[]>([])

  useEffect(() => {
    setNameValue(user?.name || '')
    setImageUrl(user?.imageUrl)
  }, [user])

  useEffect(() => {
    const fetchVouchers = async () => {
      const { data } = await birdFarmApi.get('/api/vouchers')

      setVouchers(data.vouchers || [])
    }

    fetchVouchers()
  }, [])

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
    <main>
      <Container>
        <div className='flex mt-12'>
          <div className='w-[220px] shrink-0'>
            <div className='flex flex-col gap-4'>
              <div className='flex items-center mb-4'>
                <img
                  className='w-12 aspect-square border-2 rounded-full border-primary'
                  src={user?.imageUrl || noImage}
                  alt='Profile Avatar'
                />
                <div className='ml-4'>
                  <p className='font-medium'>{user?.name}</p>
                  <p className='text-sm'>{roleToVi[user?.role || 'guest']}</p>
                </div>
              </div>

              <div className='flex items-center'>
                <User className='w-7 h-7 mr-2' />
                <Link
                  className={cn(
                    `hover:text-primary rounded-md text-lg font-medium`,
                    activeTab === 'profile' && 'text-primary'
                  )}
                  to='/user?tab=profile'
                >
                  Hồ sơ
                </Link>
              </div>
              <div className='flex items-center'>
                <img src={addressIcon} className='w-7 h-7 mr-2 dark:filter dark:invert' />
                <Link
                  className={cn(
                    `hover:text-primary rounded-md text-lg font-medium`,
                    activeTab === 'addresses' && 'text-primary'
                  )}
                  to='/user?tab=addresses'
                >
                  Địa chỉ
                </Link>
              </div>
              <div className='flex items-center'>
                <img src={voucherIcon} className='w-7 h-7 mr-2 dark:filter dark:invert' />
                <Link
                  className={cn(
                    `hover:text-primary rounded-md text-lg font-medium`,
                    activeTab === 'vouchers' && 'text-primary'
                  )}
                  to='/user?tab=vouchers'
                >
                  Kho vouchers
                </Link>
              </div>
              <div className='flex items-center'>
                <Bell className='w-7 h-7 mr-2' />
                <Link
                  className={cn(
                    `hover:text-primary rounded-md text-lg font-medium`,
                    activeTab === 'notifications' && 'text-primary'
                  )}
                  to='/user?tab=notifications'
                >
                  Thông báo
                </Link>
              </div>
            </div>
          </div>

          <div className='flex-1 bg-muted p-8 rounded-md'>
            <div>
              {activeTab === 'profile' && (
                <div>
                  <h1 className='mb-4 text-xl font-semibold'>Hồ sơ của tôi</h1>

                  <div className='flex items-center mb-4'>
                    <img className='w-20 h-20 mr-4 rounded-full' src={imageUrl || noImage} />
                    <div className='flex flex-col'>
                      <label>
                        <div className={cn('cursor-pointer', buttonVariants({ variant: 'outline' }))}>
                          Cập nhật ảnh đại diện
                        </div>
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
              )}

              {activeTab === 'addresses' && (
                <div>
                  <div className='flex items-center justify-between'>
                    <h1 className='text-xl font-semibold'>Địa chỉ của tôi</h1>
                    <Button>
                      <Plus />
                      Thêm địa chỉ
                    </Button>
                  </div>
                  {addresses.map((address) => (
                    <AddressCard address={address} />
                  ))}
                </div>
              )}

              {activeTab === 'vouchers' && (
                <div className='flex flex-wrap gap-8'>
                  {vouchers.map((voucher) => (
                    <VoucherTicket
                      // contextContent={
                      //   totalMoney < voucher.conditionPrice ? 'Không đủ điều kiện' : index === 0 ? 'Lựa chọn tốt nhất' : 'Số lượng có hạn'
                      // }
                      key={voucher._id}
                      voucher={voucher}
                    />
                  ))}
                </div>
              )}

              {activeTab === 'notifications' && (
                <div>
                  <div>
                    <h3 className='text-lg font-semibold'>Đơn mua</h3>
                    <div className='flex items-center justify-between my-4'>
                      <img
                        className='object-cover w-20 h-20 rounded-md'
                        src='https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Eopsaltria_australis_-_Mogo_Campground.jpg/640px-Eopsaltria_australis_-_Mogo_Campground.jpg'
                        alt='Notification 1'
                      />
                      <div className='flex-1 ml-4'>
                        <span>Đã xác nhận thanh toán. Đơn hàng vadj2341 đã được đặt vui lòng kiểm tra đơn hàng</span>
                      </div>
                      <Button>Xem chi tiết</Button>
                    </div>
                  </div>

                  <div>
                    <hr />
                    <h3 className='text-lg font-semibold'>Đơn đặt</h3>
                    <div className='flex items-center justify-between my-4'>
                      <img
                        className='object-cover w-20 h-20 rounded-md'
                        src='https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Eopsaltria_australis_-_Mogo_Campground.jpg/640px-Eopsaltria_australis_-_Mogo_Campground.jpg'
                        alt='Notification 2'
                      />
                      <div className='flex-1 ml-4'>
                        <span>Đơn đặt của bạn đã có cập nhật mới từ shop, vui lòng kiểm tra</span>
                      </div>
                      <Button>Xem chi tiết</Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </main>
  )
}

export default Profile
