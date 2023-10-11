import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import AddressCard from '@/components/address-card'
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog'
import DeliveryInfoForm from '@/components/forms/delivery-info-form'
import { TDeliveryInfoSchema } from '@/lib/validations/deliveryInfo'
import { birdFarmApi } from '@/services/bird-farm-api'
import { toast } from '@/components/ui/use-toast'
import { useAuthContext } from '@/contexts/auth-provider'
import greyBirdIcon from '@/assets/grey-bird.svg'
import { useEffect, useState } from 'react'
import Spinner from '@/components/ui/spinner'

function UserAddresses() {
  const { user } = useAuthContext()
  const [isLoadingUser, setIsLoadingUser] = useState(true)

  const handleCreateAddress = async (data: TDeliveryInfoSchema) => {
    const address = [data.province, data.district, data.ward, data.address].filter(Boolean).join(', ')
    const receiver = data.receiver
    const phone = data.phoneNumber

    try {
      await birdFarmApi.post('/api/users/delivery-info', {
        address,
        receiver,
        phone
      })

      window.location.reload()
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const messageError = error.response.data.message
      toast({
        variant: 'destructive',
        title: messageError || 'Không rõ nguyễn nhân'
      })
    }
  }
  useEffect(() => {
    if (user) {
      setIsLoadingUser(false)
    }
  }, [user])

  return (
    <div>
      <div className='flex items-center justify-between'>
        <h1 className='text-xl font-semibold'>Địa chỉ của tôi</h1>
        <AlertDialog>
          <AlertDialogTrigger>
            <Button className='flex items-center gap-1'>
              <Plus className='w-6 h-6' />
              Thêm địa chỉ
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Địa chỉ mới</AlertDialogTitle>
              <AlertDialogDescription asChild>
                <div className='max-h-[70vh] overflow-y-scroll'>
                  <DeliveryInfoForm
                    addDeliveryInfo
                    className='pr-3 pl-1 pb-1 space-y-4'
                    onSubmit={handleCreateAddress}
                    CloseComponent={<AlertDialogCancel>Trở lại</AlertDialogCancel>}
                  />
                </div>
              </AlertDialogDescription>
            </AlertDialogHeader>
          </AlertDialogContent>
        </AlertDialog>
      </div>
      {isLoadingUser && <Spinner className='mt-12' />}
      {!isLoadingUser && !user?.deliveryInfos.length && (
        <div className='flex flex-col items-center justify-center col-span-1 mt-16 text-lg font-medium'>
          Chưa có địa chỉ nào <img src={greyBirdIcon} className='w-24 h-24 mt-4 mb-12' />
        </div>
      )}
      {user?.deliveryInfos.map((address) => <AddressCard key={address._id} address={address} />)}
    </div>
  )
}

export default UserAddresses
