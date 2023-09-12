import { BrowserRouter, Route, Routes } from 'react-router-dom'

import SignIn from './pages/sign-in'
import SignUp from './pages/sign-up'
import Layout from './pages/layout'
import Home from './pages/home'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/auth'>
          <Route path='sign-in' element={<SignIn />} />
          <Route path='sign-up' element={<SignUp />} />
        </Route>
        <Route path='/' element={<Layout />}>
          <Route path='' element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
