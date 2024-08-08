import { createBrowserRouter } from 'react-router-dom'
import Root from './Root'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        index: true,
        element: <p>Hola</p>
      }
    ]
  }
])

export default router
