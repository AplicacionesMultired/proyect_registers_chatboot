import TableClientes from '../components/TableClientes'
import { useAuth } from '../auth/AuthProvider'
import { useState } from 'react'
import { useClients } from '../hooks/useClients'

function Registrados () {
  const { user } = useAuth()
  const { clientes } = useClients('registrados', user.company)
  const [search, setSearch] = useState<string>('')

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
