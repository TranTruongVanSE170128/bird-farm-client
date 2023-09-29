import orderIcon from '@/assets/order.svg'
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
  }
]
