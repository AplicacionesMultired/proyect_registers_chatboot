import { createBrowserRouter } from 'react-router-dom'
import Root from './Root'
import Dashboard from '../pages/Dashboard'
import NotFound from '../pages/NotFound'
import SinRegistro from '../pages/SinRegistro'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Dashboard />
      },
      {
        path: 'sinregistro',
        element: <SinRegistro />
      }
    ]
  }
])

export default router
