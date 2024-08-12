import { ClientesChatBot } from '../types/Clientes.chat.bot'
import TableClientes from '../components/TableClientes'
import { useAuth } from '../auth/AuthProvider'
import { useEffect, useState } from 'react'
import axios from 'axios'

function Registrados () {
  const [clientes, setClientes] = useState<ClientesChatBot[]>([])
  const [search, setSearch] = useState<string>('')
  const { user } = useAuth()

  useEffect(() => {
    axios.get('/c-chat-bot', { params: { company: user.company, option: 'con-registro' } })
      .then(response => {
        setClientes(response.data)
      })
      .catch(error => {
        console.log(error)
      })
  }, [user.company])

  const clientesFilter = clientes.filter(cliente => {
    return cliente.nombre.toLowerCase().includes(search.toLowerCase()) || cliente.cedula.toString().includes(search)
  })

  return (
    <div className="mx-1  p-2 h-[83vh] overflow-y-auto rounded-md">
      <div className='bg-gray-200 py-2 px-4 rounded-md flex items-center gap-4'>
        <label>Buscar Registro Cliente</label>
        <input type='search' placeholder='Nombre <-> N° Cedula'
          className='border px-4 rounded-md w-96 py-2' value={search}
          onChange={ev => setSearch(ev.target.value)}
        />
      </div>
      {clientesFilter.length > 0
        ? <TableClientes clientes={clientesFilter} />
        : null
      }
    </div>
  )
}

export default Registrados
