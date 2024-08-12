import { ClienteInfoI } from '../types/Clientes.chat.bot'
import { ChangeEvent, FormEvent } from 'react'

function FormEditClien (
  { clienteInfo, handleChangeUser, handleUpdateUser }:
    { clienteInfo: ClienteInfoI, handleChangeUser: (ev: ChangeEvent<HTMLInputElement>) => void, handleUpdateUser: (ev: FormEvent<HTMLFormElement>) => void }) {
  return (
    <form className='rounded-lg p-2 bg-slate-300' onSubmit={handleUpdateUser}>
      <div className='grid grid-cols-4 gap-6'>
        <div>
          <label className='block text-gray-700'>Nombre 1:</label>
          <input className='w-full p-2 border border-gray-300 rounded-md' type='text' name='name1' onChange={handleChangeUser} value={clienteInfo.name1} />
        </div>
        <div>
          <label className='block text-gray-700'>Nombre 2:</label>
          <input className='w-full p-2 border border-gray-300 rounded-md' type='text' name='name2' onChange={handleChangeUser} value={clienteInfo.name2} />
        </div>
        <div>
          <label className='block text-gray-700'>Apellido 1:</label>
          <input className='w-full p-2 border border-gray-300 rounded-md' type='text' name='lastname1' onChange={handleChangeUser} value={clienteInfo.lastname1} />
        </div>
        <div>
          <label className='block text-gray-700'>Apellido 2:</label>
          <input className='w-full p-2 border border-gray-300 rounded-md' type='text' name='lastname2' onChange={handleChangeUser} value={clienteInfo.lastname2} />
        </div>
        <div>
          <label className='block text-gray-700'>Cédula:</label>
          <input className='w-full p-2 border border-gray-300 rounded-md' type='text' name='cedula' onChange={handleChangeUser} value={clienteInfo.cedula} />
        </div>
        <div>
          <label className='block text-gray-700'>Teléfono:</label>
          <input className='w-full p-2 border border-gray-300 rounded-md' type='text' name='telefono' onChange={handleChangeUser} value={clienteInfo.telefono} />
        </div>
        <div>
          <label className='block text-gray-700'>Correo:</label>
          <input className='w-full p-2 border border-gray-300 rounded-md' type='text' name='correo' onChange={handleChangeUser} value={clienteInfo.correo} />
        </div>
        <div>
          <label className='block text-gray-700'>Whatsapp:</label>
          <input className='w-full p-2 border border-gray-300 rounded-md' type='text' name='telwhats' onChange={handleChangeUser} value={clienteInfo.telwhats} />
        </div>
        <div>
          <button className='w-full bg-blue-500 p-2 hover:bg-blue-700 rounded-md text-white font-medium'>
            Actualizar Información
          </button>
        </div>
      </div>
    </form>
  )
}

export { FormEditClien }
