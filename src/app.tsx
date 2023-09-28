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
import Breed from '@/pages/breed'
import Cart from '@/pages/cart'
import BirdComparing from '@/pages/bird-comparing'
import NestList from '@/pages/nest-list'
import BreedBirdList from '@/pages/breed-bird-list'
import NestDetail from './pages/nest-detail'
import LayoutManager from './components/shared/layout-manager'
import LayoutStaff from './components/shared/layout-staff'
import ManageSpecieList from './pages/manage-specie-list'
import ManageSpecieDetail from './pages/manage-specie-detail'
import ManageBirdList from './pages/manage-bird-list'
import ManageBirdNew from './pages/manage-bird-new'
import ManageBirdDetail from './pages/manage-bird-detail'
import ManageNestList from './pages/manage-nest-list'
import ManageNestNew from './pages/manage-nest-new'
import ManageNestDetail from './pages/manage-nest-detail'
import ManageOrderList from './pages/manage-order-list'
import ManageOrderDetail from './pages/manage-order-detail'
import ManageSpecieNew from './pages/manage-specie-new'
import Ratings from './pages/ratings'
import Modal from './components/ui/modal'
import Checkout from './pages/checkout'
import PaymentSuccess from './pages/payment-success'
import PaymentCancel from './pages/payment-cancel'
import { RatingForm } from './components/forms/rating-form'

function App() {
  return (
    <BrowserRouter>
      <Toaster />
      <Modal />
      <RatingForm />

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
          <Route path='orders/payment-success' element={<PaymentSuccess />} />
          <Route path='orders/payment-cancel' element={<PaymentCancel />} />
          <Route path='orders' element={<OrderList />} />
          <Route path='cart' element={<Cart />} />
          <Route path='nests/:id' element={<NestDetail />} />
          <Route path='nests' element={<NestList />} />
          <Route path='compare' element={<BirdComparing />} />
          <Route path='not-found' element={<NotFound />} />
          <Route path='breed' element={<Breed />} />
          <Route path='ratings' element={<Ratings />} />
          <Route path='checkout' element={<Checkout />} />
        </Route>

        <Route path='/admin' element={<LayoutAdmin />}>
          <Route path='' element={<Dashboard />} />
          <Route path='species' element={<ManageSpecieList />} />
          <Route path='species/new' element={<ManageSpecieNew />} />
          <Route path='species/:id' element={<ManageSpecieDetail />} />
          <Route path='birds' element={<ManageBirdList />} />
          <Route path='birds/new' element={<ManageBirdNew />} />
          <Route path='birds/:id' element={<ManageBirdDetail />} />
          <Route path='nests' element={<ManageNestList />} />
          <Route path='nests/new' element={<ManageNestNew />} />
          <Route path='nests/:id' element={<ManageNestDetail />} />
          <Route path='orders' element={<ManageOrderList />} />
          <Route path='orders/:id' element={<ManageOrderDetail />} />
        </Route>

        <Route path='/manager' element={<LayoutManager />}>
          <Route path='' element={<Dashboard />} />
          <Route path='species' element={<ManageSpecieList />} />
          <Route path='species/new' element={<ManageSpecieNew />} />
          <Route path='species/:id' element={<ManageSpecieDetail />} />
          <Route path='birds' element={<ManageBirdList />} />
          <Route path='birds/new' element={<ManageBirdNew />} />
          <Route path='birds/:id' element={<ManageBirdDetail />} />
          <Route path='nests' element={<ManageNestList />} />
          <Route path='nests/new' element={<ManageNestNew />} />
          <Route path='nests/:id' element={<ManageNestDetail />} />
        </Route>

        <Route path='/staff' element={<LayoutStaff />}>
          <Route path='' element={<Dashboard />} />
          <Route path='orders' element={<ManageOrderList />} />
          <Route path='orders/:id' element={<ManageOrderDetail />} />
        </Route>

        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
