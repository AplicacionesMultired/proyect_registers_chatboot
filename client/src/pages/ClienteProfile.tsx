import { useEffect, useState, MouseEvent, FormEvent, ChangeEvent } from 'react'
import { ClienteInfoI, ClientesChatBot } from '../types/Clientes.chat.bot'
import { useNavigate, useParams } from 'react-router-dom'
import { separarNombre } from '../utils/funtions'
import { useAuth } from '../auth/AuthProvider'
import { IdIcon } from '../components/icons'
import axios from 'axios'

import { FormEditClien } from '../components/FormEditClient'
import { toast } from 'sonner'

function ClienteProfile () {
  const { cc } = useParams<{ cc: string }>()
  const { user } = useAuth()
  const navigate = useNavigate()

  const [cliente, setCliente] = useState<Omit<ClientesChatBot, 'Existe'>>()
  const [stateclick, setStateClick] = useState('')

  const [clienteInfo, setClienteInfo] = useState<ClienteInfoI>({ name1: '', name2: '', lastname1: '', lastname2: '', cedula: 0, telefono: '', correo: '', telwhats: '' })

  const [update, setUpdate] = useState(false)

  useEffect(() => {
    axios.get(`/c-chat-bot/${cc}`, { params: { company: user.company } })
      .then(response => setCliente(response.data))
      .catch(error => console.log(error))
  }, [cc, user.company, update])

  function handleClickOpt (ev: MouseEvent<HTMLButtonElement>) {
    const { name } = ev.currentTarget
    setStateClick(name)

    if (cliente !== undefined) {
      const { nombre1, nombre2, apellido1, apellido2 } = separarNombre(cliente.nombre)
      setClienteInfo({
        name1: nombre1,
        name2: nombre2,
        lastname1: apellido1,
        lastname2: apellido2,
        cedula: cliente.cedula,
        telefono: cliente.telefono,
        correo: cliente.correo,
        telwhats: cliente.telwhats
      })
    }
  }

  function handleUpdateUser (ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault()
    const nombre = `${clienteInfo.name1} ${clienteInfo.name2} ${clienteInfo.lastname1} ${clienteInfo.lastname2}`
    const cedula = clienteInfo.cedula
    const telefono = clienteInfo.telefono
    const correo = clienteInfo.correo
    const telwhats = clienteInfo.telefono
    const data = { nombre, cedula, telefono, correo, telwhats }

    axios.patch('/c-chat-bot', { data, company: user.company })
      .then(response => {
        if (response.status === 200) {
          setClienteInfo({ name1: '', name2: '', lastname1: '', lastname2: '', cedula: 0, telefono: '', correo: '', telwhats: '' })
          setStateClick('')
          setUpdate(!update)
          toast.success('Cliente Actualizado', { description: 'El cliente ha sido actualizado correctamente' })
        }
      }
      )
      .catch(error => {
        console.log(error)
        toast.error('Error', { description: 'Ha ocurrido un error al actualizar el cliente' })
      })
  }

  const handleChangeUser = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setClienteInfo(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  return (
    <section className='mx-1 h-[83vh] overflow-y-auto rounded-md'>
      <button className='bg-red-500 p-2 hover:bg-red-700 rounded-md w-72 text-white font-medium mb-4'
        onClick={() => navigate('/sinregistro')}>
        Volver Clientes Sin Registro
      </button>

      <main className='flex w-full bg-gray-200 rounded-md gap-1'>

        <section className='w-4/12 border border-gray-500 rounded-md flex items-center'>
          <header className=''>
            <IdIcon size={180} />
          </header>
          <div className=''>
            <h1 className='text-center font-semibold text-2xl pb-2'>Información Cliente</h1>
            <p className='font-semibold text-lg'>Nombres: <span className='font-normal'>{cliente?.nombre}</span></p>
            <p className='font-semibold text-lg'>Cédula: <span className='font-normal'> {cliente?.cedula}</span></p>
            <p className='font-semibold text-lg'>Teléfono: <span className='font-normal'>{cliente?.telefono}</span></p>
            <p className='font-semibold text-lg'>Correo: <span className='font-normal'>{cliente?.correo}</span></p>
            <p className='font-semibold text-lg'>Whatsapp: <span className='font-normal'>{cliente?.telwhats}</span></p>
            <p className='font-semibold text-lg'>Fecha de registro: <span className='font-normal'>{cliente?.fregistro}</span></p>
          </div>

        </section>

        <section className='w-1/12 border border-gray-500 rounded-md flex flex-col justify-around px-1'>

          <button className='bg-yellow-400 p-2 rounded-md text-black font-semibold hover:bg-yellow-500'
            name='Editar' onClick={ev => handleClickOpt(ev)}>
            Editar
          </button>

          <button className='bg-green-400 p-2 rounded-md text-black font-semibold hover:bg-green-500'
            name='Registrar' onClick={ev => handleClickOpt(ev)}>
            Registrar
          </button>

          <button className='bg-red-400 p-2 rounded-md text-black font-semibold hover:bg-red-500'
            name='Eliminar' onClick={ev => handleClickOpt(ev)}>
            Eliminar
          </button>

        </section>

        <section className='w-7/12 border border-gray-500 rounded-md '>
          { stateclick === 'Editar' && (<FormEditClien handleUpdateUser={handleUpdateUser} handleChangeUser={handleChangeUser} clienteInfo={clienteInfo} />) }
        </section>

      </main>

    </section>
  )
}

export default ClienteProfile
