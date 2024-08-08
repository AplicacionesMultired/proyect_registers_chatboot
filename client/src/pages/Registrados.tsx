import { ClientesChatBot } from '../types/Clientes.chat.bot'
import TableClientes from '../components/TableClientes'
import { useAuth } from '../auth/AuthProvider'
import { useEffect, useState } from 'react'
import axios from 'axios'

function Registrados () {
  const [clientes, setClientes] = useState<ClientesChatBot[]>([])
  const { user } = useAuth()

  useEffect(() => {
    axios.get('/c-chat-bot', { params: { company: user.company, option: 'con-registro' } })
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
        : null
        }
    </div>
  )
}

export default Registrados
