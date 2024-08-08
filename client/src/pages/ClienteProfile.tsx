import { ClientesChatBot } from '../types/Clientes.chat.bot'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../auth/AuthProvider'
import { IdIcon } from '../components/icons'
import { useEffect, useState } from 'react'
import axios from 'axios'

function ClienteProfile () {
  const { cc } = useParams<{ cc: string }>()
  const { user } = useAuth()
  const navigate = useNavigate()

  const [cliente, setCliente] = useState<Omit<ClientesChatBot, 'Existe'>>()

  useEffect(() => {
    axios.get(`/c-chat-bot/${cc}`, { params: { company: user.company } })
      .then((response) => {
        setCliente(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [cc, user.company])

  return (
    <section className='mx-1'>
      <button className='bg-red-500 p-2 hover:bg-red-700 rounded-md w-72 text-white font-medium mb-1'
        onClick={() => navigate('/sinregistro')}>
        Volver Clientes Sin Registro
      </button>

      <div className='flex max-h-min p-2 border rounded-md bg-slate-300'>
        <header className=''>
          <IdIcon size={180} />
        </header>
        <div className='flex flex-col px-10'>
          <h1 className='text-center'>Perfil del cliente</h1>
          <p>Nombre: {cliente?.nombre}</p>
          <p>Cédula: {cliente?.cedula}</p>
          <p>Teléfono: {cliente?.telefono}</p>
          <p>Correo: {cliente?.correo}</p>
          <p>Whatsapp: {cliente?.telwhats}</p>
          <p>Fecha de registro: {cliente?.fregistro}</p>
        </div>
        <div className='flex flex-col justify-around'>
          <button className='bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded'>Actualizar</button>
          <button className='bg-blue-400 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded'>Registrar</button>
          <button className='bg-red-400 hover:bg-red-600 text-white font-bold py-2 px-4 rounded'>Eliminar</button>
        </div>
      </div>

    </section>
  )
}

export default ClienteProfile
