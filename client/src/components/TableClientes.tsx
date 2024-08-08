import { useNavigate } from 'react-router-dom'
import { ClientesChatBot } from '../types/Clientes.chat.bot'
import { CogIcon } from './icons/CogIcon'

function TableClientes ({ clientes }: { clientes: ClientesChatBot[] }) {
  const navigate = useNavigate()

  const handleClick = (cc: string) => {
    return () => navigate(`/cliente/${cc}`)
  }

  return (
    <table className='w-full text-center'>
      <thead>
        <tr>
          <th>Cédula</th>
          <th>Nombre</th>
          <th>Teléfono</th>
          <th>Correo</th>
          <th>WhatsApp</th>
          <th>Fecha de registro</th>
          <th>Estado </th>
          <th>Opciones</th>
        </tr>
      </thead>
      <tbody>
        {
          clientes.map((cliente, index) => (
            <tr key={index}>
              <td>{cliente.cedula}</td>
              <td>{cliente.nombre}</td>
              <td>{cliente.telefono}</td>
              <td>{cliente.correo}</td>
              <td>{cliente.telwhats}</td>
              <td>{cliente.fregistro}</td>
              <td className={`${cliente.Existe === true ? 'bg-green-200' : 'bg-red-200'}`}>
                {cliente.Existe === true ? 'Registrado' : 'Sin registrar'}
              </td>
              <td>
                {
                  cliente.Existe === true
                    ? <button className='bg-yellow-300 hover:bg-yellow-400 text-black font-bold py-2 px-4 rounded'>Editar</button>
                    : <button className='bg-purple-700 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded' onClick={handleClick(cliente.cedula.toString())}>
                        <CogIcon/>
                      </button>
                }
              </td>
            </tr>
          ))
        }
      </tbody>
    </table>
  )
}

export default TableClientes
