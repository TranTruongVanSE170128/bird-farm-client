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
import Dashboard from '@/pages/dashboard'
import LayoutAdmin from '@/components/shared/layout-admin'
import WishList from '@/pages/wish-list'
import Profile from '@/pages/profile'
import OrderList from '@/pages/order-list'
import AdminBirdList from '@/pages/admin-bird-list'
import Breed from '@/pages/breed'
import Cart from '@/pages/cart'
import BirdComparing from '@/pages/bird-comparing'
import NestList from '@/pages/nest-list'
import AdminSpecieList from '@/pages/admin-specie-list'
import AdminSpeciesNew from '@/pages/admin-species-new'
import AdminBirdsNew from '@/pages/admin-birds-new'
import AdminNestList from '@/pages/admin-nest-list'
import AdminNestsNew from '@/pages/admin-nests-new'
import AdminSpecieDetail from '@/pages/admin-specie-detail'
import AdminBirdDetail from '@/pages/admin-bird-detail'
import BreedBirdList from '@/pages/breed-bird-list'
import AdminNestDetail from '@/pages/admin-nest-detail'
import AdminOrderList from '@/pages/admin-order-list'
import AdminOrderDetail from '@/pages/admin-order-detail'
import NestDetail from './pages/nest-detail'
import YourNest from './pages/your-nest'

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
          <Route path='breed-birds' element={<BreedBirdList />} />
          <Route path='wishlist' element={<WishList />} />
          <Route path='profile' element={<Profile />} />
          <Route path='orders' element={<OrderList />} />
          <Route path='cart' element={<Cart />} />
          <Route path='nests/:id' element={<NestDetail />} />
          <Route path='nests' element={<NestList />} />
          <Route path='compare' element={<BirdComparing />} />
          <Route path='not-found' element={<NotFound />} />
          <Route path='breed' element={<Breed />} />
          <Route path='your-nest' element={<YourNest />} />
        </Route>

        <Route path='/admin' element={<LayoutAdmin />}>
          <Route path='' element={<Dashboard />} />
          <Route path='species' element={<AdminSpecieList />} />
          <Route path='species/new' element={<AdminSpeciesNew />} />
          <Route path='species/:id' element={<AdminSpecieDetail />} />
          <Route path='birds' element={<AdminBirdList />} />
          <Route path='birds/new' element={<AdminBirdsNew />} />
          <Route path='birds/:id' element={<AdminBirdDetail />} />
          <Route path='nests' element={<AdminNestList />} />
          <Route path='nests/new' element={<AdminNestsNew />} />
          <Route path='nests/:id' element={<AdminNestDetail />} />
          <Route path='orders' element={<AdminOrderList />} />
          <Route path='orders/:id' element={<AdminOrderDetail />} />
        </Route>

        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
