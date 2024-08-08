import { useAuth } from '../auth/AuthProvider'
import CambiarCompany from '../components/CambiarCompany'

function Dashboard () {
  const { user } = useAuth()
  const { company } = user

  return (
    company === 'MultiredYServired'
      ? <CambiarCompany />
      : (
          <div className="bg-blue-200 mx-1 p-2 rounded-md">
            <h1>Dashboard</h1>
            <p>Welcome to the Dashboard</p>
          </div>
        )
  )
}

export default Dashboard
