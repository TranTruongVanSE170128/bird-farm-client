import Container from '@/components/ui/container'
import { Link } from 'react-router-dom'
import { routes } from '@/constants/shopRoutes'
import { Button } from '@/components/ui/button'
import { Bell, Menu, ShoppingCart } from 'lucide-react'
import ProfileButton from '../profile-button'
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet'
import logoBlack from '@/assets/logo-black.png'
import logoWhite from '@/assets/logo-white.png'
import { useTheme } from '../theme-provider'
import { Input } from '../ui/input'
import { useCartContext } from '@/contexts/cart-provider'
import { useAuthContext } from '@/contexts/auth-provider'

function Header() {
  const { theme } = useTheme()
  const { user } = useAuthContext()
  const { quantityInCart } = useCartContext()

  return (
    <header className='py-3 px-4 sm:flex sm:justify-between sm:items-center border-b fixed top-0 w-full z-50 bg-background'>
      <Container>
        <div className='relative flex h-16 w-full items-center justify-between'>
          <div className='flex items-center'>
            <Sheet>
              <SheetTrigger>
                <Menu className='h-6 md:hidden' />
              </SheetTrigger>
              <SheetContent side='left' className='w-[300px] sm:w-[400px]'>
                <nav className='flex flex-col gap-4'>
                  {routes.map((route) => {
                    return (
                      <Link key={route.label} to={route.href} className='px-2 py-1 text-lg'>
                        {route.label}
                      </Link>
                    )
                  })}
                </nav>
              </SheetContent>
            </Sheet>

            <Link to='/' className='ml-4 md:ml-0'>
              <img className='max-h-[36px]' src={theme === 'light' ? logoBlack : logoWhite} />
            </Link>

            <nav className='m-4 items-center hidden md:flex'>
              {routes.map((route) => {
                return (
                  <Button key={route.label} variant='ghost' asChild>
                    <Link key={route.label} to={route.href} className='text-sm font-medium transition-colors'>
                      {route.label}
                    </Link>
                  </Button>
                )
              })}
            </nav>
          </div>

          <div className='flex items-center flex-1 justify-end'>
            <Input className='mr-4 max-w-xs flex-1 outline-none' type='text' placeholder='Tìm kiếm chim...' />

            <Button variant='ghost' size='icon' className='shrink-0 relative' aria-label='Shopping Cart'>
              <ShoppingCart className='h-6 w-6' />
              {!!quantityInCart && (
                <div className='bg-red-500 text-slate-50 absolute rounded-full w-5 h-5 text-sm flex justify-center items-center -top-[2px] -right-[2px]'>
                  {quantityInCart}
                </div>
              )}
            </Button>

            {user && (
              <Button variant='ghost' size='icon' className='shrink-0' aria-label='Shopping Cart'>
                <Bell className='h-6 w-6' />
              </Button>
            )}

            {/* <ModeToggle className='shrink-0' /> */}

            <ProfileButton className='shrink-0' />
          </div>
        </div>
      </Container>
    </header>
  )
}

export default Header
