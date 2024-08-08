import { createBrowserRouter } from 'react-router-dom'
import Root from './Root'
import Dashboard from '../pages/Dashboard'
import NotFound from '../pages/NotFound'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Dashboard />
      }
    ]
  }
])

export default router
