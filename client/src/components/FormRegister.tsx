import { ClienteInfoI } from '../types/Clientes.chat.bot'
import { useState } from 'react'
import { toast } from 'sonner'

import { useAuth } from '../auth/AuthProvider'
import { useNavigate } from 'react-router-dom'
import { registerClient } from '../services/clientService'

function FormRegister ({ cliente }: { cliente: ClienteInfoI }) {
  const [genero, setGenero] = useState('')
  const { user } = useAuth()

  const navigate = useNavigate()

  const handleSubmit = () => {
    toast.promise(registerClient(cliente, genero, user.username), {
      loading: 'Creando Cliente...',
      success: (data) => {
        console.log(data)
        setTimeout(() => navigate('/registrados'), 2000)
        return 'Cliente Creado Correctamente'
      },
      error: (data) => {
        if (data.response.status === 400) {
          return data.response.data.message || 'Error al crear cliente'
        }
      }
    })
  }

  return (
    <section className='bg-gray-200 shadow-lg rounded-lg p-6 max-w-2xl mx-auto'>
      <h2 className='text-2xl font-bold mb-4 text-gray-800 text-center'>Información Del Cliente</h2>
      <p className='text-gray-600 mb-6'>Se creará cliente fiel con la siguiente información:</p>

      <article className='flex flex-col gap-2 mb-4'>
        <div className='flex items-center'>
          <h3 className='font-semibold text-gray-700 w-44'>Nombres:</h3>
          <p className='text-gray-800'>{cliente.name1} {cliente.name2} {cliente.lastname1} {cliente.lastname2}</p>
        </div>
        <div className='flex items-center'>
          <h3 className='font-semibold text-gray-700 w-44'>N° Documento:</h3>
          <p className='text-gray-800'>{cliente.cedula}</p>
        </div>
        <div className='flex items-center'>
          <h3 className='font-semibold text-gray-700 w-44'>Correo:</h3>
          <p className='text-gray-800'>{cliente.correo}</p>
        </div>
        <div className='flex items-center'>
          <h3 className='font-semibold text-gray-700 w-44'>N° Telefono:</h3>
          <p className='text-gray-800'>{cliente.telefono}</p>
        </div>
        <div className='flex items-center'>
          <h3 className='font-semibold text-gray-700 w-44'>N° Registrado:</h3>
          <p className='text-gray-800'>{cliente.telwhats}</p>
        </div>
      </article>

      <form className='pb-4'>
        <div className='flex items-center'>
          <h3 className='font-semibold text-gray-700 w-44'>Género:</h3>
          <select className='border border-gray-300 rounded-md p-2' onChange={(ev) => setGenero(ev.target.value)}>
            <option value=''>Seleccione</option>
            <option value='34'>Masculino</option>
            <option value='33'>Femenino</option>
          </select>
        </div>
      </form>

      <button type='submit' onClick={handleSubmit}
        className='bg-green-500 hover:bg-green-600 transition-colors duration-300 p-3 rounded-md text-white w-full font-semibold'>
        Confirmar Creación
      </button>
    </section>
  )
}

export default FormRegister
