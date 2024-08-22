import { useAuth } from '../auth/AuthProvider'
import { Outlet } from 'react-router-dom'

import LoginPage from '../pages/Login'

import { Toaster } from 'sonner'
import NavBar from '../components/NavBar'
import CambiarCompany from '../components/CambiarCompany'

const Root = () => {
  const { isAuthenticated, user } = useAuth()

  if (!isAuthenticated) {
    return <LoginPage />
  }

  return (
    user.company === 'MultiredYServired'
      ? <CambiarCompany />
      : (
        <>
          <NavBar /><section className='pt-1'>
            <Outlet />
          </section><Toaster position='top-right' duration={3000} />
          <Toaster position='top-right' duration={4000} />
        </>
        )
  )
}

export default Root
