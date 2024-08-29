import TableClientes from '../components/TableClientes'
import { useClients } from '../hooks/useClients'
import { useAuth } from '../auth/AuthProvider'
import { Loading } from '../components/ui/Loading'

function Registrados () {
  const { user } = useAuth()
  const { clientesFilter, search, setSearch, loading } = useClients('con-registro', user.company)

  return (
    <>
      <header className='bg-gray-300 mx-2 p-2 rounded-md flex items-center gap-4'>
        <label>Buscar Registro Cliente</label>
        <input type='search' placeholder='N° Cedula - Nombre '
          className='border px-4 rounded-md w-96 py-2' value={search}
          onChange={ev => setSearch(ev.target.value)}
        />
      </header>

      <section className='mx-1 p-2 h-[75vh] overflow-y-auto rounded-md'>
        {
          clientesFilter.length > 0
            ? <TableClientes clientes={clientesFilter} />
            : loading && <section className='w-full flex justify-center text-2xl'><Loading message='Cargando Clientes Registrados ...' /></section>
        }
      </section>
    </>
  )
}

export default Registrados
