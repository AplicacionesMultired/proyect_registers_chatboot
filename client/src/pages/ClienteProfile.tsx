import { useEffect, useState, MouseEvent, FormEvent, ChangeEvent } from 'react'
import { ClienteInfoI, ClientesChatBot } from '../types/Clientes.chat.bot'
import { useNavigate, useParams } from 'react-router-dom'
import { separarNombre } from '../utils/funtions'
import { useAuth } from '../auth/AuthProvider'
import { IdIcon } from '../components/icons'
import axios from 'axios'

import { FormEditClien } from '../components/FormEditClient'
import { toast } from 'sonner'
import { API_URL } from '../utils/contanst'
import FormRegister from '../components/FormRegister'
import FormDeleteClient from '../components/FormDeleteClient'

function ClienteProfile () {
  const { cc } = useParams<{ cc: string }>()
  const { user } = useAuth()
  const navigate = useNavigate()

  const [cliente, setCliente] = useState<Omit<ClientesChatBot, 'Existe'>>()
  const [stateclick, setStateClick] = useState('')

  const [clienteInfo, setClienteInfo] = useState<ClienteInfoI>({ name1: '', name2: '', lastname1: '', lastname2: '', cedula: 0, telefono: '', correo: '', telwhats: '' })

  const [update, setUpdate] = useState(false)

  useEffect(() => {
    axios.get(`${API_URL}/c-chat-bot/${cc}`, { params: { company: user.company } })
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

    axios.patch(`${API_URL}/c-chat-bot`, { data, company: user.company })
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
        if (error.response.status === 400) {
          toast.error((error.response.data.message || 'Error Al Actualizar'),
            { description: (error.response.data.errors[0] || 'No se puede actualizar el usuario') }
          )
        } else {
          toast.error('Error Al Actualizar', { description: 'Ha ocurrido un error al actualizar el cliente' })
        }
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
    <section className='mx-1 h-[80vh] overflow-y-auto rounded-md relative'>

      <button className='bg-red-500 p-2 hover:bg-red-700 rounded-md w-64 text-white font-medium mb-4 absolute'
        onClick={() => navigate('/sinregistro')}>
        Volver Clientes Sin Registro
      </button>

      <section className='flex items-center justify-center gap-6 py-4'>
        <header className='pt-8'>
          <IdIcon size={180} />
        </header>

        <div className=''>

          <h1 className='text-2xl font-semibold text-center pb-2'>Información Cliente</h1>
          <article className='font-semibold text-xl'>
            <p>Nombres: <span className='font-normal'>{cliente?.nombre}</span></p>
            <p>Cédula: <span className='font-normal'> {cliente?.cedula}</span></p>
            <p>Teléfono: <span className='font-normal'>{cliente?.telefono}</span></p>
            <p>Correo: <span className='font-normal'>{cliente?.correo}</span></p>
            <p>Whatsapp: <span className='font-normal'>{cliente?.telwhats}</span></p>
            <p>Fecha de registro: <span className='font-normal'>{cliente?.fregistro}</span></p>
          </article>
        </div>

        <section className='flex flex-col gap-4 w-64'>
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

      </section>

      <section>
        {stateclick === 'Editar' && (<FormEditClien handleUpdateUser={handleUpdateUser} handleChangeUser={handleChangeUser} clienteInfo={clienteInfo} />)}
        {stateclick === 'Registrar' && (<FormRegister cliente={clienteInfo} />)}
        { stateclick === 'Eliminar' && (<FormDeleteClient cliente={clienteInfo} />)}
      </section>

    </section>
  )
}

export default ClienteProfile
