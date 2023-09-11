import { Outlet } from 'react-router-dom'

function Layout() {
  return (
    <div>
      <div className='text-xl font-bold'>This is the layout</div>
      <Outlet />
    </div>
  )
}

export default Layout
