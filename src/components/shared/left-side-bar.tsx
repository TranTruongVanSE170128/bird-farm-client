import { cn } from '@/lib/utils'
import { LogOut } from 'lucide-react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useTheme } from '../theme-provider'
import { useAuthContext } from '@/contexts/auth-provider'
import { Role } from '@/lib/types'

type Props = {
  routes: { icon: string; route: string; label: string }[]
  role: Role
}

const LeftSidebar = ({ routes, role }: Props) => {
  const navigate = useNavigate()
  const pathname = useLocation().pathname
  const { theme } = useTheme()
  const { user } = useAuthContext()

  return (
    <section className='sticky top-0 left-0 z-20 flex flex-col justify-between h-screen pb-5 overflow-auto border-r custom-scrollbar w-fit border-r-dark-4 bg-dark-2 pt-28 max-md:hidden'>
      <div className='flex flex-col flex-1 w-full gap-6 px-6'>
        {routes.map((link) => {
          const isActive =
            pathname === `/${role}`
              ? link.route === `/${role}`
              : link.route === `/${role}`
              ? false
              : pathname.includes(link.route)

          return (
            <Link
              to={link.route}
              key={link.label}
              className={cn(
                'relative flex justify-start gap-4 rounded-lg p-4',
                isActive && 'bg-primary text-primary-foreground'
              )}
            >
              <img
                className={cn(theme === 'dark' && 'filter invert', isActive && 'filter invert')}
                src={link.icon}
                alt={link.label}
                width={24}
                height={24}
              />

              <p className='text-light-1 max-lg:hidden'>{link.label}</p>
            </Link>
          )
        })}
      </div>

      <div className='px-6 mt-10'>
        {user && (
          <div onClick={() => navigate('/auth/sign-in')}>
            <div className='flex gap-4 p-4 cursor-pointer'>
              <LogOut />

              <p className='text-light-2 max-lg:hidden'>Đăng xuất</p>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default LeftSidebar
