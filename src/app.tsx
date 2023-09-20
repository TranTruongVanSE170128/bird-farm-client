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
import AdminBirdList from './pages/admin-bird-list'
import Pairing from './pages/pairing'
import Cart from './pages/cart'
import BirdComparing from './pages/bird-comparing'
import NestList from './pages/nest-list'
import AdminSpecieList from './pages/admin-specie-list'
import AdminSpeciesNew from './pages/admin-species-new'
import AdminBirdsNew from './pages/admin-birds-new'
import AdminNestList from './pages/admin-nest-list'
import AdminNestsNew from './pages/admin-nests-new'

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
          <Route path='cart' element={<Cart />} />
          <Route path='nests' element={<NestList />} />
          <Route path='compare' element={<BirdComparing />} />
          <Route path='not-found' element={<NotFound />} />
          <Route path='pairing' element={<Pairing />} />
        </Route>

        <Route path='/admin' element={<LayoutAdmin />}>
          <Route path='' element={<Dashboard />} />
          <Route path='species' element={<AdminSpecieList />} />
          <Route path='species/new' element={<AdminSpeciesNew />} />
          <Route path='birds' element={<AdminBirdList />} />
          <Route path='birds/new' element={<AdminBirdsNew />} />
          <Route path='nests' element={<AdminNestList />} />
          <Route path='nests/new' element={<AdminNestsNew />} />
          <Route path='orders' element={<Dashboard />} />
        </Route>

        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
