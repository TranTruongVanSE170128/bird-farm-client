import { Link } from 'react-router-dom'
import logoWhite from '@/assets/logo-white.png'
import logoBlack from '@/assets/logo-black.png'
import { LogOut } from 'lucide-react'
import { ModeToggle } from '../mode-toggle'
import { useTheme } from '../theme-provider'
import { useAuthContext } from '@/contexts/auth-provider'
import ProfileButton from '../profile-button'

type Props = {
  baseUrl: string
}

function TopBar({ baseUrl }: Props) {
  const { user } = useAuthContext()
  const { theme } = useTheme()

  return (
    <nav className='fixed top-0 z-30 bg-background flex w-full items-center justify-between border-b px-6 py-3'>
      <Link to={baseUrl} className='flex items-center gap-4 py-1'>
        <img src={theme === 'light' ? logoBlack : logoWhite} alt='logo' className='h-12' />
      </Link>

      <div className='flex items-center gap-1'>
        <div className='block md:hidden'>
          {user && (
            <div onClick={() => {}}>
              <div className='flex cursor-pointer gap-4 p-4'>
                <LogOut />

                <p className='text-light-2 max-lg:hidden'>Logout</p>
              </div>
            </div>
          )}
        </div>

        <ModeToggle />

        <ProfileButton />
      </div>
    </nav>
  )
}

export default TopBar
