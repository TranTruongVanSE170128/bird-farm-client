import dashBoardIcon from '@/assets/dashboard.svg'
import birdIcon from '@/assets/bird.svg'
import nestIcon from '@/assets/nest.svg'
import orderIcon from '@/assets/order.svg'

export const routes = [
  {
    icon: dashBoardIcon,
    route: '/admin',
    label: 'Dashboard'
  },
  {
    icon: birdIcon,
    route: '/admin/birds',
    label: 'Birds'
  },
  {
    icon: nestIcon,
    route: '/admin/nests',
    label: 'Nests'
  },
  {
    icon: orderIcon,
    route: '/admin/orders',
    label: 'Orders'
  }
]
