import { ClientesChatBot } from '../types/Clientes.chat.bot'
import TableClientes from '../components/TableClientes'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useAuth } from '../auth/AuthProvider'

function SinRegistro () {
  const [clientes, setClientes] = useState<ClientesChatBot[]>([])
  const { user } = useAuth()

  useEffect(() => {
    axios.get('/c-chat-bot', { params: { company: user.company, option: 'sin-registro' } })
      .then(response => {
        setClientes(response.data)
      })
      .catch(error => {
        console.log(error)
      })
  }, [user.company])

  return (
    <div className="mx-1  p-2 h-[83vh] overflow-y-auto rounded-md">
      {clientes.length > 0
        ? <TableClientes clientes={clientes} />
        : (
          <div className='text-center'>
            <h1 className='text-2xl'>No hay clientes sin registro</h1>
          </div>
          )
      }
    </div>
  )
}

export default SinRegistro
