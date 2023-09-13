import Container from '@/components/ui/container'
import { Link } from 'react-router-dom'
import { routes } from '@/constants/linkRoutes'
import { Button } from '@/components/ui/button'
import { Menu, ShoppingCart } from 'lucide-react'
import { ModeToggle } from './mode-toggle'
import ProfileButton from './profile-button'
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet'

function Header() {
  return (
    <header className='py-3 sm:flex sm:justify-between sm:items-center border-b'>
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
                      <Link key={route.label} to={route.href} className='blovk px-2 py-1 text-lg'>
                        {route.label}
                      </Link>
                    )
                  })}
                </nav>
              </SheetContent>
            </Sheet>

            <Link to='/' className='ml-4 md:ml-0'>
              <h1 className='text-xl font-bold'>STORE NAME</h1>
            </Link>
          </div>
          <nav className='mx-6 items-center space-x-4 lg:space-x-6 hidden md:flex'>
            {routes.map((route) => {
              return (
                <Button variant='ghost' asChild>
                  <Link key={route.label} to={route.href} className='text-sm font-medium transition-colors'>
                    {route.label}
                  </Link>
                </Button>
              )
            })}
          </nav>
          <div className='flex items-center'>
            <Button variant='ghost' size='icon' className='mr-2' aria-label='Shopping Cart'>
              <ShoppingCart className='h-6 w-6' />
              <span className='sr-only'>Shopping Cart</span>
            </Button>

            <ModeToggle className='mr-4' />

            <ProfileButton />
          </div>
        </div>
      </Container>
    </header>
  )
}

export default Header
