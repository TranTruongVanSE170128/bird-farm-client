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
import nestIcon from '@/assets/nest.svg'

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
            <UserIcon className='w-6 h-6' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='w-56'>
          <DropdownMenuGroup>
            <DropdownMenuItem asChild className='cursor-pointer'>
              <Link to='/auth/sign-in'>
                <LogIn className='w-4 h-4 mr-2' />
                <span>Đăng nhập</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild className='cursor-pointer'>
              <Link to='/auth/sign-up'>
                <img alt='đăng ký' src={registerIcon} className='w-4 h-4 mr-2 dark:filter dark:invert' />
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
        <Avatar className='ml-3 cursor-pointer'>
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
                  <img src={storeIcon} className='w-4 h-4 mr-2 dark:filter dark:invert' />
                  <span>Xem cửa hàng</span>
                </Link>
              ) : (
                <Link to='/admin'>
                  <img src={adminIcon} className='w-4 h-4 mr-2 dark:filter dark:invert' />
                  <span>Quản trị viên</span>
                </Link>
              )}
            </DropdownMenuItem>
          )}
          {user.role === 'manager' && (
            <DropdownMenuItem asChild className='cursor-pointer'>
              {pathname.includes('manager') ? (
                <Link to='/'>
                  <img src={storeIcon} className='w-4 h-4 mr-2 dark:filter dark:invert' />
                  <span>Xem cửa hàng</span>
                </Link>
              ) : (
                <Link to='/manager'>
                  <img src={managerIcon} className='w-4 h-4 mr-2 dark:filter dark:invert' />
                  <span>Quản lý</span>
                </Link>
              )}
            </DropdownMenuItem>
          )}
          {user.role === 'staff' && (
            <DropdownMenuItem asChild className='cursor-pointer'>
              {pathname.includes('staff') ? (
                <Link to='/'>
                  <img src={storeIcon} className='w-4 h-4 mr-2 dark:filter dark:invert' />
                  <span>Xem cửa hàng</span>
                </Link>
              ) : (
                <Link to='/staff'>
                  <img src={staffIcon} className='w-4 h-4 mr-2 dark:filter dark:invert' />
                  <span>Nhân viên</span>
                </Link>
              )}
            </DropdownMenuItem>
          )}
          <DropdownMenuItem asChild className='cursor-pointer'>
            <Link to='/user/profile'>
              <UserIcon className='w-4 h-4 mr-2' />
              <span>Hồ sơ người dùng</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild className='cursor-pointer'>
            <Link to='/orders'>
              <img src={orderIcon} className='w-4 h-4 mr-2 dark:filter dark:invert' />
              <span>Đơn hàng</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild className='cursor-pointer'>
            <Link to='/your-nest'>
              <img src={nestIcon} className='w-4 h-4 mr-2 dark:filter dark:invert' />
              <span>Tổ chim của bạn</span>
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
          <LogOut className='w-4 h-4 mr-2' />
          <span>Đăng Xuất</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default ProfileButton
