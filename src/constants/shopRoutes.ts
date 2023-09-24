import breedIcon from '@/assets/breed.svg'
import birdIcon from '@/assets/bird-color.svg'
import nestIcon from '@/assets/nest-color.svg'

export const routes = [
  {
    href: '/birds?type=sell',
    label: 'Chim kiểng',
    icon: birdIcon
  },
  {
    href: '/birds?type=breed',
    label: 'Chim phối giống',
    icon: breedIcon
  },
  {
    href: '/nests',
    label: 'Tổ chim non có sẵn',
    icon: nestIcon
  }
]
