import { Voucher } from '@/lib/types'
import { calculateExpired, formatPrice } from '@/lib/utils'
import logo from '@/assets/icon.png'
import { useTheme } from './theme-provider'

type Props = {
  voucher: Voucher
}

function VoucherTicket({ voucher }: Props) {
  const { theme } = useTheme()
  const { conditionPrice, expiredAt, discountPercent, maxDiscountValue, quantity } = voucher
  return (
    <div className='flex aspect-[25/9] w-96 relative'>
      <div className='text-xs bg-yellow-500 absolute rounded-sm top-2 p-0.5 text-white'>
        {quantity ? 'Số lượng có hạn' : 'Đã hết'}
      </div>

      <div
        style={{
          backgroundImage: `linear-gradient(135deg, ${
            theme === 'light' ? '#fff' : '#000'
          } 50%, transparent 50%), linear-gradient(45deg, ${theme === 'light' ? '#fff' : '#000'} 50%, transparent 50%)`,
          backgroundPosition: 'top left, top left, top right, top right',
          backgroundSize: '10px 10px',
          backgroundRepeat: 'repeat-y'
        }}
        className='aspect-square bg-primary shrink-0 p-3 rounded-l-lg flex flex-col items-center justify-center shadow border-r-2 border-dashed pl-4 pt-6'
      >
        <img src={logo} className='w-14 h-14' />
        <div className='text-primary-foreground font-medium'>BIRD FARM</div>
      </div>
      <div className='aspect-video bg-accent shrink-0 text-accent-foreground border p-4 rounded-r-lg flex flex-col shadow border-l-2 border-dashed'>
        <div className='text-lg font-medium'>Giảm {discountPercent}%</div>
        <div>Đơn tối thiểu {formatPrice(conditionPrice)}</div>
        <div>Giảm giá tối đa {formatPrice(maxDiscountValue)}</div>
        <div className='text-primary font-medium'>
          Hạn sử dụng: {new Date(expiredAt) > new Date() ? `còn ${calculateExpired(expiredAt)}` : 'Hết hạn'}
        </div>
      </div>
    </div>
  )
}

export default VoucherTicket
