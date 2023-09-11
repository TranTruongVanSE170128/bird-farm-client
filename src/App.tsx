import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Layout from './pages/Layout'

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
