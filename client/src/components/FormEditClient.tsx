import { ClienteInfoI } from '../types/Clientes.chat.bot'
import { ChangeEvent, FormEvent } from 'react'

function FormEditClien (
  { clienteInfo, handleChangeUser, handleUpdateUser }:
    { clienteInfo: ClienteInfoI, handleChangeUser: (ev: ChangeEvent<HTMLInputElement>) => void, handleUpdateUser: (ev: FormEvent<HTMLFormElement>) => void }) {
  return (
    <form className='rounded-lg p-6 bg-slate-100 shadow-lg max-w-screen-xl mx-auto' onSubmit={handleUpdateUser}>
      <div className='grid grid-cols-1 md:grid-cols-4 gap-6'>
        <div>
          <label className='block text-gray-800 font-semibold mb-2'>Nombre 1:</label>
          <input className='w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500' type='text' name='name1' onChange={handleChangeUser} value={clienteInfo.name1} />
        </div>
        <div>
          <label className='block text-gray-800 font-semibold mb-2'>Nombre 2:</label>
          <input className='w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500' type='text' name='name2' onChange={handleChangeUser} value={clienteInfo.name2} />
        </div>
        <div>
          <label className='block text-gray-800 font-semibold mb-2'>Apellido 1:</label>
          <input className='w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500' type='text' name='lastname1' onChange={handleChangeUser} value={clienteInfo.lastname1} />
        </div>
        <div>
          <label className='block text-gray-800 font-semibold mb-2'>Apellido 2:</label>
          <input className='w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500' type='text' name='lastname2' onChange={handleChangeUser} value={clienteInfo.lastname2} />
        </div>
        <div>
          <label className='block text-gray-800 font-semibold mb-2'>Cédula:</label>
          <input className='w-full p-3 border border-gray-300 rounded-md bg-gray-100' value={clienteInfo.cedula} readOnly />
        </div>
        <div>
          <label className='block text-gray-800 font-semibold mb-2'>Teléfono:</label>
          <input className='w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500' type='text' name='telefono' onChange={handleChangeUser} value={clienteInfo.telefono} />
        </div>
        <div>
          <label className='block text-gray-800 font-semibold mb-2'>Correo:</label>
          <input className='w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500' type='text' name='correo' onChange={handleChangeUser} value={clienteInfo.correo} />
        </div>
        <div>
          <label className='block text-gray-800 font-semibold mb-2'>Whatsapp:</label>
          <input className='w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500' type='text' name='telwhats' onChange={handleChangeUser} value={clienteInfo.telwhats} />
        </div>
        <div className='col-span-1 md:col-span-2'>
          <button className='w-full bg-yellow-200 p-3 hover:bg-yellow-300 rounded-md font-medium transition duration-300 text-black'>
            Actualizar Información
          </button>
        </div>
      </div>
    </form>
  )
}

export { FormEditClien }
