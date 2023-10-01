import orderIcon from '@/assets/order.svg'
import voucherIcon from '@/assets/voucher.svg'

import orderNestIcon from '@/assets/order-nest.svg'
export const routes = [
  {
    icon: orderIcon,
    route: '/staff/orders',
    label: 'Đơn Hàng'
  },
  {
    icon: orderNestIcon,
    route: '/staff/order-nests',
    label: 'Đơn Tổ Chim'
  },
  {
    icon: voucherIcon,
    route: '/staff/vouchers',
    label: 'Voucher'
  }
]
