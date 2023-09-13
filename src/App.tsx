import { BrowserRouter, Route, Routes } from 'react-router-dom'

import SignIn from '@/pages/sign-in'
import SignUp from '@/pages/sign-up'

import Home from '@/pages/home'
import LayoutShop from '@/components/hoc/layout-shop'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/auth'>
          <Route path='sign-in' element={<SignIn />} />
          <Route path='sign-up' element={<SignUp />} />
        </Route>
        <Route path='/' element={<LayoutShop />}>
          <Route path='' element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
