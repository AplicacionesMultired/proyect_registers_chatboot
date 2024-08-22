import { AuthProvider } from './auth/AuthProvider.tsx'
import { RouterProvider } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import router from './routes/index.tsx'

import './index.css'
import axios from 'axios'

axios.defaults.withCredentials = true

const root = createRoot(document.getElementById('root')!)
root.render(
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
)
