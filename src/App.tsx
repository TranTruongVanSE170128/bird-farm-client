import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Toaster } from '@/components/ui/toaster'
import SignIn from '@/pages/sign-in'
import SignUp from '@/pages/sign-up'

import Home from '@/pages/home'
import LayoutShop from '@/components/hoc/layout-shop'
import VerifyEmail from './pages/verify-email'

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
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
