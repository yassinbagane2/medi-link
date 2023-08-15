import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import Login from './pages/auth/Login'
import Signup from './pages/auth/Signup'
import ResetPassword from './pages/auth/ResetPassword'
import DashboardLayout from './components/layout/DashboardLayout'
import Dashboard from './pages/dashboard/dashboard'
import Doctors from './pages/dashboard/Doctors'
import MedicalFolder from './pages/dashboard/MedicalFolder'
import Messages from './pages/dashboard/Messages'
import Appointments from './pages/dashboard/Appointments'
import MyDoctors from './pages/dashboard/MyDoctors'
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
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="/dashboard/my-doctors" element={<MyDoctors />} />
          <Route path="/dashboard/doctors" element={<Doctors />} />
          <Route path="/dashboard/medical-folder" element={<MedicalFolder />} />
          <Route path="/dashboard/messages" element={<Messages />} />
          <Route path="/dashboard/appointments" element={<Appointments />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
