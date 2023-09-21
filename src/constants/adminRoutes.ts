import dashBoardIcon from '@/assets/dashboard.svg'
import birdIcon from '@/assets/bird.svg'
import nestIcon from '@/assets/nest.svg'
import orderIcon from '@/assets/order.svg'
import specieIcon from '@/assets/specie.svg'

export const routes = [
  {
    icon: dashBoardIcon,
    route: '/admin',
    label: 'Dashboard'
  },
  {
    icon: specieIcon,
    route: '/admin/species',
    label: 'Loài'
  },
  {
    icon: birdIcon,
    route: '/admin/birds',
    label: 'Chim'
  },
  {
    icon: nestIcon,
    route: '/admin/nests',
    label: 'Tổ Chim'
  },
  {
    icon: orderIcon,
    route: '/admin/orders',
    label: 'Đơn Hàng'
  }
]
