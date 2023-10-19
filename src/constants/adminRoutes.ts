import dashBoardIcon from '@/assets/dashboard.svg'
import accountIcon from '@/assets/account.svg'

export const routes = [
  {
    icon: dashBoardIcon,
    route: '/admin',
    label: 'Dashboard'
  },
  {
    icon: accountIcon,
    route: '/admin/accounts',
    label: 'Tài khoản'
  }
]
