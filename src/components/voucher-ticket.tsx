import { Voucher } from '@/lib/types'
import { calculateExpired, cn, formatPrice } from '@/lib/utils'
import logo from '@/assets/icon.png'
import { useTheme } from './theme-provider'
import { useAuthContext } from '@/contexts/auth-provider'
import Spinner from './ui/spinner'

type Props = {
  voucher: Voucher
  className?: string
  context?: boolean
  contextContent?:
    | 'Lựa chọn tốt nhất'
    | 'Hết hàng'
    | 'Hết hạn'
    | 'Không đủ điều kiện'
    | 'Số lượng có hạn'
    | 'Đang kích hoạt'
    | 'Đang vô hiệu hóa'
    | 'Đã dùng'
  isChanging?: boolean
}

function VoucherTicket({
  voucher,
  className,
  context = true,
  contextContent = 'Số lượng có hạn',
  isChanging = false
}: Props) {
  const { theme } = useTheme()
  const { conditionPrice, expiredAt, discountPercent, maxDiscountValue, quantity } = voucher
  const { user } = useAuthContext()

  const contextElement = () => {
    console.log({ expiredAt, date: new Date() })

    if (quantity <= 0) {
      return <div className='text-xs absolute rounded-sm top-2 p-0.5 text-white bg-red-500'>Đã hết</div>
    }
    if (new Date(expiredAt) < new Date()) {
      return <div className='text-xs absolute rounded-sm top-2 p-0.5 text-white bg-red-500'>Hết hạn</div>
    }
    if (voucher.users.includes(user?._id || '')) {
      return <div className='text-xs absolute rounded-sm top-2 p-0.5 text-white bg-red-500'>Đã dùng</div>
    }
    switch (contextContent) {
      case 'Đang kích hoạt':
        return <div className='text-xs absolute rounded-sm top-2 p-0.5 text-white bg-green-500'>Đang kích hoạt</div>
      case 'Đang vô hiệu hóa':
        return <div className='text-xs absolute rounded-sm top-2 p-0.5 text-white bg-red-500'>Đang vô hiệu hóa</div>
      case 'Lựa chọn tốt nhất':
        return <div className='text-xs absolute rounded-sm top-2 p-0.5 text-white bg-green-500'>Lựa chọn tốt nhất</div>
      case 'Không đủ điều kiện':
        return <div className='text-xs absolute rounded-sm top-2 p-0.5 text-white bg-red-500'>Không đủ điều kiện</div>
      default:
        return <div className='text-xs absolute rounded-sm top-2 p-0.5 text-white bg-yellow-500'>Số lượng có hạn</div>
    }
  }

  return (
    <div className={cn('flex aspect-[25/9] w-96 relative z-0', className)}>
      {context && contextElement()}

      {isChanging && (
        <div
          onContextMenu={(e) => {
            e.preventDefault()
          }}
          className='absolute inset-0 bg-accent-foreground/30 rounded-md flex justify-center items-center z-10'
        >
          <Spinner className='text-accent/70' />
        </div>
      )}

      <div
        style={{
          backgroundImage: `linear-gradient(135deg, ${
            theme === 'light' ? '#fff' : '#000'
          } 50%, transparent 50%), linear-gradient(45deg, ${theme === 'light' ? '#fff' : '#000'} 50%, transparent 50%)`,
          backgroundPosition: 'top left, top left, top right, top right',
          backgroundSize: '10px 10px',
          backgroundRepeat: 'repeat-y'
        }}
        className='flex flex-col items-center justify-center p-3 pt-6 pl-4 border-r border-dashed rounded-l-lg shadow aspect-square bg-primary shrink-0'
      >
        <img src={logo} className='w-14 h-14' />
        <div className='font-medium text-primary-foreground'>BIRD FARM</div>
      </div>
      <div className='flex flex-col p-4 border border-l border-dashed rounded-r-lg shadow aspect-video bg-accent shrink-0 text-accent-foreground'>
        {user?.role === 'staff' ? (
          <div className='flex items-center gap-2'>
            <div className='text-lg font-medium'>Giảm {discountPercent}%</div>
            <div>
              Số lượng: <span className='font-medium text-primary'>{voucher.quantity}</span>
            </div>
          </div>
        ) : (
          <div className='text-lg font-medium'>Giảm {discountPercent}%</div>
        )}

        <div>Đơn tối thiểu {formatPrice(conditionPrice)}</div>
        <div>Giảm giá tối đa {formatPrice(maxDiscountValue)}</div>
        <div className='font-medium text-primary'>
          Hạn sử dụng: {new Date(expiredAt) > new Date() ? `còn ${calculateExpired(expiredAt)}` : 'Hết hạn'}
        </div>
      </div>
    </div>
  )
}

export default VoucherTicket
