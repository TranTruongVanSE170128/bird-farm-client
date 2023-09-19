import { Outlet, useNavigate } from 'react-router-dom'
import LeftSidebar from './left-side-bar'
import TopBar from './top-bar'
import BottomBar from './bottom-bar'
import { useEffect } from 'react'
import { useAuthContext } from '@/contexts/auth-provider'

function LayoutAdmin() {
  const { user } = useAuthContext()
  const navigate = useNavigate()

  useEffect(() => {
    if (user?.role && user?.role !== 'admin') {
      navigate('/')
    }
  }, [user])

  return (
    <main className='relative'>
      <TopBar />
      <div className='flex'>
        <LeftSidebar />
        <section className='flex min-h-screen flex-1 flex-col items-center bg-dark-1 px-4 pb-10 pt-28 max-md:pb-32 sm:px-8'>
          <div className='w-full max-w-7xl'>
            <Outlet />
          </div>
        </section>
      </div>

      <BottomBar />
    </main>
  )
}

export default LayoutAdmin
