import { useAuth } from '../auth/AuthProvider'
import { Outlet } from 'react-router-dom'
import LoginPage from '../pages/Login'

import { Toaster } from 'sonner'

const Root = () => {
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    return <LoginPage />
  }

  return (
    <>
      <section className='pt-1'>
        <Outlet />
      </section>
      <Toaster position='top-right' duration={3000} />
    </>
  )
}

export default Root
