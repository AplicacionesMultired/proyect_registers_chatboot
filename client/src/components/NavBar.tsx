import { LogoutAndDeleteToken } from '../services/logOut'
import { useAuth } from '../auth/AuthProvider'
import { NavLink } from 'react-router-dom'
import { UserIcon } from './icons'

function NavBar () {
  const { user, setIsAuthenticated } = useAuth()

  const handleLogout = () => {
    LogoutAndDeleteToken()
    setIsAuthenticated(false)
  }

  return (
    <nav className="bg-slate-600 m-1 rounded-md text-white shadow-lg">
      <ul className="flex justify-around p-2 gap-2">
        <li className="flex items-center justify-around border w-full py-4 rounded-md">
          <UserIcon />
          <article className='text-center'>
            <h1>Bienvenid@</h1>
            <p>{user.names} {user.lastnames}</p>
          </article>
          <article className='text-center'>
            <h1>Empresa</h1>
            <p>{user.company}</p>
          </article>
        </li>
        <li className="flex items-center justify-around border w-full py-4 rounded-md">
          <article className='text-center'>
            <h1>Usuario</h1>
            <p>{user.username}</p>
          </article>
          <article className='text-center'>
            <h1>Proceso</h1>
            <p>{user.process}</p>
          </article>
          <article className='text-center'>
            <h1>Sub-Proceso</h1>
            <p>{user.sub_process.toUpperCase()}</p>
          </article>
        </li>
        <li className="flex flex-col items-center border w-full py-4 rounded-md">
          <article className='flex text-center gap-2'>
            <h1>Correo:</h1>
            <p>{user.email}</p>
          </article>
          <article className='flex text-center gap-2'>
            <h1>ID:</h1>
            <p>{user.id}</p>
          </article>
        </li>
        <li className="flex flex-col justify-around">
          <button className='bg-yellow-500 rounded-md w-60 py-1 text-black shadow-md hover:bg-yellow-300 transition-all'>
            Cambiar Contraseña
          </button>
          <button className='bg-blue-700 rounded-md w-60 py-1 shadow-md hover:bg-blue-500 transition-all' onClick={() => handleLogout()}>
            Cerrar Sesión
          </button>
        </li>
      </ul>
      <ul className='flex justify-around py-2 border-t-2 font-medium'>
        <li>
          <NavLink to='/' className='hover:text-yellow-300'>
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink to='/sinregistro' className='hover:text-yellow-300'>
            Sin Registrar
          </NavLink>
        </li>
        <li>
          <NavLink to='/registrados' className='hover:text-yellow-300'>
            Registrados
          </NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default NavBar
