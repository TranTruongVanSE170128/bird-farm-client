import { LogIn, LogOut, User as UserIcon } from 'lucide-react'
import registerIcon from '@/assets/register.svg'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from './ui/button'
import { Link, useLocation } from 'react-router-dom'
import { cn } from '@/lib/utils'
import orderIcon from '@/assets/order.svg'
import { useAuthContext } from '@/contexts/auth-provider'
import adminIcon from '@/assets/admin.svg'
import managerIcon from '@/assets/manager.svg'
import staffIcon from '@/assets/staff.svg'
import storeIcon from '@/assets/store.svg'

type Props = {
  className?: string
}

function ProfileButton({ className }: Props) {
  const { user, setAccessToken } = useAuthContext()
  const pathname = useLocation().pathname

  if (!user) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost' size='icon' className={cn('mr-2', className)} aria-label='Shopping Cart'>
            <UserIcon className='h-6 w-6' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='w-56'>
          <DropdownMenuGroup>
            <DropdownMenuItem asChild className='cursor-pointer'>
              <Link to='/auth/sign-in'>
                <LogIn className='mr-2 h-4 w-4' />
                <span>Đăng nhập</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild className='cursor-pointer'>
              <Link to='/auth/sign-up'>
                <img alt='đăng ký' src={registerIcon} className='mr-2 h-4 w-4 dark:filter dark:invert' />
                <span>Đăng ký</span>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className='cursor-pointer ml-3'>
          <AvatarImage src={user.imageUrl || 'https://github.com/shadcn.png'} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56'>
        <DropdownMenuLabel>
          <div className='flex flex-col space-y-1'>
            <p className='text-sm font-medium leading-none line-clamp-1'>{user.name}</p>
            <p className='text-xs leading-none text-muted-foreground line-clamp-1'>{user.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {user.role === 'admin' && (
            <DropdownMenuItem asChild className='cursor-pointer'>
              {pathname.includes('admin') ? (
                <Link to='/'>
                  <img src={storeIcon} className='mr-2 h-4 w-4 dark:filter dark:invert' />
                  <span>Xem cửa hàng</span>
                </Link>
              ) : (
                <Link to='/admin'>
                  <img src={adminIcon} className='mr-2 h-4 w-4 dark:filter dark:invert' />
                  <span>Admin</span>
                </Link>
              )}
            </DropdownMenuItem>
          )}
          {user.role === 'manager' && (
            <DropdownMenuItem asChild className='cursor-pointer'>
              {pathname.includes('manager') ? (
                <Link to='/'>
                  <img src={storeIcon} className='mr-2 h-4 w-4 dark:filter dark:invert' />
                  <span>Xem cửa hàng</span>
                </Link>
              ) : (
                <Link to='/manager'>
                  <img src={managerIcon} className='mr-2 h-4 w-4 dark:filter dark:invert' />
                  <span>Quản lý</span>
                </Link>
              )}
            </DropdownMenuItem>
          )}
          {user.role === 'staff' && (
            <DropdownMenuItem asChild className='cursor-pointer'>
              {pathname.includes('staff') ? (
                <Link to='/'>
                  <img src={storeIcon} className='mr-2 h-4 w-4 dark:filter dark:invert' />
                  <span>Xem cửa hàng</span>
                </Link>
              ) : (
                <Link to='/staff'>
                  <img src={staffIcon} className='mr-2 h-4 w-4 dark:filter dark:invert' />
                  <span>Nhân viên</span>
                </Link>
              )}
            </DropdownMenuItem>
          )}
          <DropdownMenuItem asChild className='cursor-pointer'>
            <Link to='/profile'>
              <UserIcon className='mr-2 h-4 w-4' />
              <span>Hồ sơ người dùng</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild className='cursor-pointer'>
            <Link to='/orders'>
              <img src={orderIcon} className='mr-2 h-4 w-4 dark:filter dark:invert' />
              <span>Đơn hàng</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            setAccessToken('')
            window.location.reload()
          }}
          className='cursor-pointer'
        >
          <LogOut className='mr-2 h-4 w-4' />
          <span>Đăng Xuất</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default ProfileButton
