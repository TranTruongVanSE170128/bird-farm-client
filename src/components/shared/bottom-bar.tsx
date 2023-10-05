import { cn } from '@/lib/utils'
import { Link, useLocation } from 'react-router-dom'
import { useTheme } from '../theme-provider'
import { Role } from '@/lib/types'

type Props = {
  routes: { icon: string; route: string; label: string }[]
  role: Role
}

function BottomBar({ routes, role }: Props) {
  const pathname = useLocation().pathname
  const { theme } = useTheme()

  return (
    <section className='fixed bottom-0 z-10 w-full p-4 rounded-md bg-input backdrop-blur-lg xs:px-7 md:hidden'>
      <div className='flex items-center justify-between gap-3 xs:gap-5'>
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
                'relative flex flex-col items-center gap-2 rounded-lg p-2 sm:flex-1 sm:px-2 sm:py-2.5',
                isActive && 'bg-primary text-primary-foreground'
              )}
            >
              <img
                src={link.icon}
                alt={link.label}
                width={32}
                height={32}
                className={cn(theme === 'dark' && 'filter invert', isActive && 'filter invert')}
              />

              <p className='text-subtle-medium text-light-1 max-sm:hidden'>{link.label.split(/\s+/)[0]}</p>
            </Link>
          )
        })}
      </div>
    </section>
  )
}

export default BottomBar
