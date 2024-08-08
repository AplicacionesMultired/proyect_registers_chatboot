import axios from 'axios'
import { useEffect, useState } from 'react'
import { ClientesChatBot } from '../types/Clientes.chat.bot'
import TableClientes from '../components/TableClientes'

function SinRegistro () {
  const [clientes, setClientes] = useState<ClientesChatBot[]>([])

  useEffect(() => {
    axios.get('/c-chat-bot')
      .then(response => {
        setClientes(response.data)
      })
      .catch(error => {
        console.log(error)
      })
  }, [])

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
