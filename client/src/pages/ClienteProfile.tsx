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
    <section className='mx-1  p-2 h-[83vh] overflow-y-auto rounded-md'>
      <button className='bg-red-500 p-2 hover:bg-red-700 rounded-md w-72 text-white font-medium mb-4'
        onClick={() => navigate('/sinregistro')}>
        Volver Clientes Sin Registro
      </button>

      <main className='flex p-2 border rounded-md bg-slate-300 w-full'>
        <section className='flex w-1/2'>
          <header className='flex items-center pt-8'>
            <IdIcon size={180} />
          </header>
          <div className='flex flex-col px-10'>
            <h1 className='text-center font-semibold text-2xl pb-4'>Información Cliente</h1>
            <p className='font-semibold text-lg'>Nombre: <span className='font-normal'>{cliente?.nombre}</span></p>
            <p className='font-semibold text-lg'>Cédula: <span className='font-normal'> {cliente?.cedula}</span></p>
            <p className='font-semibold text-lg'>Teléfono: <span className='font-normal'>{cliente?.telefono}</span></p>
            <p className='font-semibold text-lg'>Correo: <span className='font-normal'>{cliente?.correo}</span></p>
            <p className='font-semibold text-lg'>Whatsapp: <span className='font-normal'>{cliente?.telwhats}</span></p>
            <p className='font-semibold text-lg'>Fecha de registro: <span className='font-normal'>{cliente?.fregistro}</span></p>
          </div>

        </section>
        <form className='grid grid-cols-4 gap-2 p-2 border rounded-md bg-slate-300 '>
            <div>
              <label className='flex font-semibold text-lg'>Nombre 1:</label>
              <input className='border p-1 rounded-md' type='text' name='nombre1' />
            </div>
            <div>
              <label className='flex font-semibold text-lg'>Nombre 2:</label>
              <input className='border p-1 rounded-md' type='text' name='nombre2' />
            </div>
            <div>
              <label className='flex font-semibold text-lg'>Apellido 1:</label>
              <input className='border p-1 rounded-md' type='text' name='apellido1' />
            </div>
            <div>
              <label className='flex font-semibold text-lg'>Apellido 2:</label>
              <input className='border p-1 rounded-md' type='text' name='apellido2' />
            </div>
            <div>
              <label className='flex font-semibold text-lg'>Cédula:</label>
              <input className='border p-1 rounded-md' type='text' name='cedula' />
            </div>
            <div>
              <label className='flex font-semibold text-lg'>Teléfono:</label>
              <input className='border p-1 rounded-md' type='text' name='telefono' />
            </div>
            <div>
              <label className='flex font-semibold text-lg'>Correo:</label>
              <input className='border p-1 rounded-md' type='text' name='correo' />
            </div>
            <div>
              <label className='flex font-semibold text-lg'>Whatsapp:</label>
              <input className='border p-1 rounded-md' type='text' name='telwhats' />
            </div>

            <button className='bg-blue-500 p-2 hover:bg-blue-700 rounded-md w-72 text-white font-medium mt-auto'>
              Actualizar Información
            </button>
        </form>
      </main>

    </section>
  )
}

export default ClienteProfile
