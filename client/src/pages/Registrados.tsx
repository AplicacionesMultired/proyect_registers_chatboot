import TableClientes from '../components/TableClientes'
import { useClients } from '../hooks/useClients'
import { useAuth } from '../auth/AuthProvider'

function Registrados () {
  const { user } = useAuth()
  const { clientesFilter, search, setSearch } = useClients('con-registro', user.company)

  return (
    <>
      <header className='bg-gray-300 mx-2 p-2 rounded-md flex items-center gap-4'>
        <label>Buscar Registro Cliente</label>
        <input type='search' placeholder='N° Cedula - Nombre '
          className='border px-4 rounded-md w-96 py-2' value={search}
          onChange={ev => setSearch(ev.target.value)}
        />
      </header>

      <section className='mx-1  p-2 h-[75vh] overflow-y-auto rounded-md'>
        {clientesFilter.length > 0
          ? <TableClientes clientes={clientesFilter} />
          : (
            <div className='text-center'>
              <h1 className='text-2xl'>No Existe Clientes Registrados</h1>
            </div>
            )
        }
      </section>
    </>
  )
}

export default Registrados
