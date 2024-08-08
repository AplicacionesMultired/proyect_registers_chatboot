import { ClientesChatBot } from '../types/Clientes.chat.bot'

function TableClientes ({ clientes }: { clientes: ClientesChatBot[] }) {
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
        <th>Existe</th>
        <th>Estado </th>
        <th>Opciones</th>
      </tr>
    </thead>
    <tbody>
      {
        clientes.map(cliente => (
          <tr>
            <td>{cliente.cedula}</td>
            <td>{cliente.nombre}</td>
            <td>{cliente.telefono}</td>
            <td>{cliente.correo}</td>
            <td>{cliente.telwhats}</td>
            <td>{cliente.fregistro}</td>
            <td className={`${cliente.Existe === false ? 'bg-red-200' : 'bg-green-200'}`}>{cliente.Existe ? 'Sí' : 'No'}</td>
            <td>{cliente.ERROR}</td>
            <td>
              <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
                Registrar
              </button>
            </td>
          </tr>
        ))
      }
    </tbody>
  </table>
  )
}

export default TableClientes
