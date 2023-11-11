import { Navigate, Outlet } from 'react-router-dom'
import LeftSidebar from './left-side-bar'
import TopBar from './top-bar'
import BottomBar from './bottom-bar'
import { useAuthContext } from '@/contexts/auth-provider'
import { routes } from '@/constants/managerRoutes'
import { useEffect } from 'react'

function LayoutManager() {
  const { role } = useAuthContext()
  // const navigate = useNavigate()
  // const pathName = useLocation().pathname

  // useEffect(() => {
  //   if (pathName === '/manager') {
  //     navigate('/manager/species')
  //   }
  // }, [pathName, navigate])

  useEffect(() => {
    console.log(routes)
  }, [])

  if (role && !(role === 'manager')) {
    return <Navigate to='/' />
  }

  return (
    <main className='relative'>
      <TopBar baseUrl='/manager' />
      <div className='flex'>
        <LeftSidebar routes={routes} role='manager' />
        <section className='flex flex-col items-center flex-1 min-h-screen px-4 pb-10 bg-dark-1 pt-28 max-md:pb-32 sm:px-8'>
          <div className='w-full max-w-7xl'>
            <Outlet />
          </div>
        </section>
      </div>

      <BottomBar routes={routes} role='manager' />
    </main>
  )
}

export default LayoutManager
