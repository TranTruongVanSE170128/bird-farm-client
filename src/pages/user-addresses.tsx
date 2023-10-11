import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
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

function UserAddresses() {
  return (
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
  )
}

export default UserAddresses
