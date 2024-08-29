import { toast } from 'sonner'
import { ClienteInfoI } from '../types/Clientes.chat.bot'
import { useState } from 'react'
import { deleteClient } from '../services/clientService'
import { useNavigate } from 'react-router-dom'

function FormDeleteClient ({ cliente }: { cliente: ClienteInfoI }) {
  const [motivo, setMotivo] = useState('')
  const navigate = useNavigate()

  const handleSubmit = () => {
    toast.promise(deleteClient(cliente, motivo), {
      loading: 'Enviando Solicitud...',
      success: (data) => {
        setTimeout(() => navigate('/registrados'), 2000)
        return data
      },
      error: (data) => {
        if (data.response.status === 400) {
          return data.response.data.message || 'Error al enviar solicitud'
        }
      }
    })
  }

  return (
    <section className='bg-gray-200 shadow-lg rounded-lg p-6 max-w-2xl mx-auto'>
      <h2 className='text-2xl font-bold mb-4 text-gray-800 text-center'>Información Del Cliente</h2>
      <p className='text-gray-600 mb-6'>Se enviará registro del cliente para eliminación con la siguiente información:</p>

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

      <form className='pb-4 w-full flex items-center gap-2'>
        <label htmlFor='motivo' className='font-semibold text-gray-700'>Motivo de Eliminación:</label>
        <textarea name="motivo" id="motivo" className='w-full' value={motivo} onChange={ev => setMotivo(ev.target.value)} required>
        </textarea>
      </form>
      <button type='submit' onClick={handleSubmit}
          className='bg-red-300 hover:bg-red-500 transition-colors duration-300 p-3 rounded-md text-white w-full font-semibold'>
          Confirmar Solicitud Eliminación
      </button>
    </section>
  )
}

export default FormDeleteClient
