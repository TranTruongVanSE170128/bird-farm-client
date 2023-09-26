import dashBoardIcon from '@/assets/dashboard.svg'
import birdIcon from '@/assets/bird.svg'
import nestIcon from '@/assets/nest.svg'
import specieIcon from '@/assets/specie.svg'

export const routes = [
  {
    icon: dashBoardIcon,
    route: '/manager',
    label: 'Dashboard'
  },
  {
    icon: specieIcon,
    route: '/manager/species',
    label: 'Loài'
  },
  {
    icon: birdIcon,
    route: '/manager/birds',
    label: 'Chim'
  },
  {
    icon: nestIcon,
    route: '/manager/nests',
    label: 'Tổ Chim'
  }
]
