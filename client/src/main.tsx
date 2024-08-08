import { AuthProvider } from './auth/AuthProvider.tsx'
import { RouterProvider } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import router from './routes/index.tsx'
import { StrictMode } from 'react'
import './index.css'

const root = createRoot(document.getElementById('root')!)
root.render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
)
