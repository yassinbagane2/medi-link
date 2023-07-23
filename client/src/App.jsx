import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import Login from './pages/auth/Login'
import Signup from './pages/auth/Signup'
import ResetPassword from './pages/auth/ResetPassword'
import DashboardLayout from './components/layout/DashboardLayout'

function App() {
  return (
    <>
      <Routes>
        /* public routes */
        <Route path="" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="join" element={<Signup />} />
          <Route path="reset" element={<ResetPassword />} />
        </Route>
        <Route path="/dashboard" element={<DashboardLayout />}></Route>
      </Routes>
    </>
  )
}

export default App
