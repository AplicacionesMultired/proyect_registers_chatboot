import { createBrowserRouter } from 'react-router-dom'

import SinRegistro from '../pages/SinRegistro'
import Registrados from '../pages/Registrados'
import Dashboard from '../pages/Dashboard'
import NotFound from '../pages/NotFound'
import Root from './Root'

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
      },
      {
        path: 'registrados',
        element: <Registrados />
      }
    ]
  }
])

export default router
