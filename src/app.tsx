import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Toaster } from '@/components/ui/toaster'
import SignIn from '@/pages/sign-in'
import SignUp from '@/pages/sign-up'
import Home from '@/pages/home'
import LayoutShop from '@/components/shared/layout-shop'
import VerifyEmail from '@/pages/verify-email'
import BirdDetail from '@/pages/bird-detail'
import BirdList from '@/pages/bird-list'
import SpecieList from '@/pages/specie-list'
import NotFound from '@/pages/not-found'
import Dashboard from './pages/dashboard'
import LayoutAdmin from './components/shared/layout-admin'
import WishList from './pages/wish-list'
import Profile from './pages/profile'
import OrderList from './pages/order-list'
import Pairing from './pages/pairing'

function App() {
  return (
    <BrowserRouter>
      <Toaster />
      <Routes>
        <Route path='/auth'>
          <Route path='sign-in' element={<SignIn />} />
          <Route path='sign-up' element={<SignUp />} />
          <Route path=':userId/verify-email' element={<VerifyEmail />} />
        </Route>

        <Route path='/' element={<LayoutShop />}>
          <Route path='' element={<Home />} />
          <Route path='species' element={<SpecieList />} />
          <Route path='birds/:id' element={<BirdDetail />} />
          <Route path='birds' element={<BirdList />} />
          <Route path='wishlist' element={<WishList />} />
          <Route path='profile' element={<Profile />} />
          <Route path='orders' element={<OrderList />} />
          <Route path='pairing' element={<Pairing />} />
        </Route>

        <Route path='/admin' element={<LayoutAdmin />}>
          <Route path='' element={<Dashboard />} />
          <Route path='birds' element={<Dashboard />} />
          <Route path='nests' element={<Dashboard />} />
          <Route path='orders' element={<Dashboard />} />
        </Route>

        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
