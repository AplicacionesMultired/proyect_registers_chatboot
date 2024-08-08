import { createContext, useContext, useEffect, useState, Dispatch, ReactNode, SetStateAction } from 'react'
import { LOGIN_URL } from '../utils/contanst'
import { type User } from '../types/User'
import axios from 'axios'

interface IAuthContext {
  isAuthenticated: boolean
  user: User
  setUser: Dispatch<SetStateAction<User>>
  setIsAuthenticated: Dispatch<SetStateAction<boolean>>
}

const InitialUser: User = { username: '', email: '', names: '', lastnames: '', company: '', process: '', sub_process: '', id: '' }

const AuthContext = createContext<IAuthContext | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<User>(InitialUser)

  useEffect(() => {
    axios.get(`${LOGIN_URL}/profile`, { params: { app: 'chat-bot' } })
      .then(res => {
        if (res.status === 200) {
          setIsAuthenticated(true)
          setUser(res.data)
        }
      })
      .catch(error => {
        if (error.response.status === 401) {
          setIsAuthenticated(false)
          setUser(InitialUser)
        }
      })
  }, [setIsAuthenticated])

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, user, setUser }}>
      {children}
    </AuthContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = (): IAuthContext => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
