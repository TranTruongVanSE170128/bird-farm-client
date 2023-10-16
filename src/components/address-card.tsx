import { birdFarmApi } from '@/services/bird-farm-api'
import { Button } from './ui/button'
import { toast } from './ui/use-toast'
import { Address } from '@/lib/types'

type Props = {
  address: Address
}

function AddressCard({ address }: Props) {
  const handleSetDefault = async () => {
    try {
      await birdFarmApi.put(`/api/users/delivery-info/${address._id}/make-default`)

      window.location.reload()
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const messageError = error.response.data.message
      toast({
        variant: 'destructive',
        title: 'Không thể cài mặc định',
        description: messageError || 'Không rõ nguyễn nhân'
      })
    }
  }

  const handleDelete = async () => {
    try {
      await birdFarmApi.delete(`/api/users/delivery-info/${address._id}`)

      window.location.reload()
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const messageError = error.response.data.message
      toast({
        variant: 'destructive',
        title: 'Không thể xóa',
        description: messageError || 'Không rõ nguyễn nhân'
      })
    }
  }

  return (
    <div className='flex justify-between border-b py-4'>
      <div className='flex flex-col gap-1'>
        <div className='flex items-center gap-2'>
          <span className='text-lg font-medium'>{address.receiver}</span> <span>|</span> <span>{address.phone}</span>
        </div>
        <p>{address.address}</p>
        {address.default && (
          <Button
            size='sm'
            variant='outline'
            className='border-primary text-primary hover:text-primary text-sm w-fit cursor-default bg-inherit hover:bg-inherit'
          >
            Mặc định
          </Button>
        )}
      </div>
      <div className='flex gap-2 items-end'>
        <Button onClick={handleDelete} variant='link' disabled={address.default}>
          Xóa
        </Button>
        <Button onClick={handleSetDefault} variant='outline' disabled={address.default}>
          Thiết lập mặc định
        </Button>
      </div>
    </div>
  )
}

export default AddressCard
