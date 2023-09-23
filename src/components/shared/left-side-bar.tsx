import { routes } from '@/constants/adminRoutes'
import { cn } from '@/lib/utils'
import { LogOut } from 'lucide-react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useTheme } from '../theme-provider'
import { useAuthContext } from '@/contexts/auth-provider'

const LeftSidebar = () => {
  const navigate = useNavigate()
  const pathname = useLocation().pathname
  const { theme } = useTheme()
  const { user } = useAuthContext()

  return (
    <section className='custom-scrollbar sticky left-0 top-0 z-20 flex h-screen w-fit flex-col justify-between overflow-auto border-r border-r-dark-4 bg-dark-2 pb-5 pt-28 max-md:hidden'>
      <div className='flex w-full flex-1 flex-col gap-6 px-6'>
        {routes.map((link) => {
          const isActive =
            pathname === '/admin'
              ? link.route === '/admin'
              : link.route === '/admin'
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

      <div className='mt-10 px-6'>
        {user && (
          <div onClick={() => navigate('/auth/sign-in')}>
            <div className='flex cursor-pointer gap-4 p-4'>
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
