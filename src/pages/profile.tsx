import { useEffect, useState } from 'react'
import Container from '@/components/ui/container'
import { Button, buttonVariants } from '@/components/ui/button'
import voucherIcon from '@/assets/voucher.svg'
import { Input } from '@/components/ui/input'
import { Bell, Plus, User } from 'lucide-react'
import { Link, useSearchParams } from 'react-router-dom'
import { cn, roleToVi } from '@/lib/utils'
import { useAuthContext } from '@/contexts/auth-provider'
import noImage from '@/assets/no-image.avif'
import addressIcon from '@/assets/address.svg'
import AddressCard from '@/components/address-card'
import { Address } from '@/lib/types'

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

  useEffect(() => {
    setNameValue(user?.name || '')
    setImageUrl(user?.imageUrl)
  }, [user])

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

                  <Button className='float-right mt-8'>Lưu thay đổi</Button>
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

              <div className={`${activeTab === 'account-vouchers' ? 'block' : 'hidden'}`}>
                <div>
                  <h5 className='mb-3 text-2xl font-semibold'>Voucher của bạn:</h5>
                  <div className='flex items-center justify-between p-2 mb-2 border border-muted-foreground'>
                    <div className='flex--1'>
                      <h6 className='text-lg font-semibold'>Voucher 1</h6>
                      <div className='flex items-center mt-2'>
                        <img
                          className='w-24 h-24 mr-5 rounded-md'
                          src='https://c8.alamy.com/comp/EMC7YT/special-discount-10-off-stamp-EMC7YT.jpg'
                          alt='Voucher 1'
                        />
                        <div>
                          <p>Description: 10% off on all products</p>
                          <p>Code: VOUCHER10</p>
                          <p className='text-muted-foreground'>Expires: 2023-12-31</p>
                        </div>
                      </div>
                    </div>
                    <Button variant={'destructive'} className='mx-10 '>
                      Dùng Voucher
                    </Button>
                  </div>
                  <div className='flex items-center justify-between p-2 mb-2 border border-muted-foreground'>
                    <div className='flex--1'>
                      <h6 className='text-lg font-semibold'>Voucher 1</h6>
                      <div className='flex items-center mt-2'>
                        <img
                          className='w-24 h-24 mr-5 rounded-md'
                          src='https://www.pngmart.com/files/8/Voucher-Download-PNG-Image.png'
                          alt='Voucher 1'
                        />
                        <div>
                          <p>Description: 10% off on all products</p>
                          <p>Code: VOUCHER10</p>
                          <p className='text-muted-foreground'>Expires: 2023-12-31</p>
                        </div>
                      </div>
                    </div>
                    <Button variant={'destructive'} className='mx-10 '>
                      Dùng Voucher
                    </Button>
                  </div>
                </div>
              </div>

              <div className={`${activeTab === 'account-notifications' ? 'block' : 'hidden'}`}>
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
            </div>
          </div>
        </div>
      </Container>
    </main>
  )
}

export default Profile
