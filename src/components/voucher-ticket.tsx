import { Voucher } from '@/lib/types'
import { calculateExpired, cn, formatPrice } from '@/lib/utils'
import logo from '@/assets/icon.png'
import { useTheme } from './theme-provider'

type Props = {
  voucher: Voucher
  className?: string
  context?: boolean
  contextContent?: 'Lựa chọn tốt nhất' | 'Hết hàng' | 'Hết hạn' | 'Không đủ điều kiện' | 'Số lượng có hạn'
}

function VoucherTicket({ voucher, className, context = true, contextContent = 'Số lượng có hạn' }: Props) {
  const { theme } = useTheme()
  const { conditionPrice, expiredAt, discountPercent, maxDiscountValue, quantity } = voucher

  const contextElement = () => {
    if (quantity <= 0) {
      return <div className='text-xs absolute rounded-sm top-2 p-0.5 text-white bg-red-500'>Đã hết</div>
    }
    if (expiredAt < new Date()) {
      return <div className='text-xs absolute rounded-sm top-2 p-0.5 text-white bg-red-500'>Hết hạn</div>
    }
    switch (contextContent) {
      case 'Lựa chọn tốt nhất':
        return <div className='text-xs absolute rounded-sm top-2 p-0.5 text-white bg-green-500'>Lựa chọn tốt nhất</div>
      case 'Không đủ điều kiện':
        return <div className='text-xs absolute rounded-sm top-2 p-0.5 text-white bg-red-500'>Không đủ điều kiện</div>
      default:
        return <div className='text-xs absolute rounded-sm top-2 p-0.5 text-white bg-yellow-500'>Số lượng có hạn</div>
    }
  }

  return (
    <div className={cn('flex aspect-[25/9] w-96 relative', className)}>
      {context && contextElement()}

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
