import { Button } from './ui/button'

type Address = {
  address: string
  phone: string
  receiver: string
  default: boolean
}

type Props = {
  address: Address
}

function AddressCard({ address }: Props) {
  return (
    <div className='flex justify-between border-b py-4'>
      <div className='flex flex-col gap-1'>
        <div className='flex items-center gap-2'>
          <span className='text-lg font-medium'>{address.receiver}</span> <span>|</span> <span>{address.phone}</span>
        </div>
        <p>{address.address}</p>
        {address.default && (
          <Button size='sm' variant='outline' disabled className='border-primary text-primary text-sm w-fit'>
            Mặc định
          </Button>
        )}
      </div>
      <div className='flex gap-2 items-end'>
        <Button variant='link'>Cập nhật</Button>
        <Button variant='outline' disabled={address.default}>
          Thiết lập mặc định
        </Button>
      </div>
    </div>
  )
}

export default AddressCard
