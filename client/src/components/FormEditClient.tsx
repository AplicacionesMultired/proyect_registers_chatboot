import { ClienteInfoI } from '../types/Clientes.chat.bot'
import { ChangeEvent, FormEvent } from 'react'

function FormEditClien (
  { clienteInfo, handleChangeUser, handleUpdateUser }:
  { clienteInfo: ClienteInfoI, handleChangeUser: (ev: ChangeEvent<HTMLInputElement>) => void, handleUpdateUser: (ev: FormEvent<HTMLFormElement>) => void }) {
  return (
    <form className='grid grid-cols-4 gap-2 p-2 border rounded-md bg-slate-300' onSubmit={handleUpdateUser}>
      <div>
        <label className='flex font-semibold text-lg'>Nombre 1:</label>
        <input className='border p-1 rounded-md' type='text' name='name1' onChange={handleChangeUser} value={clienteInfo.name1} />
      </div>
      <div>
        <label className='flex font-semibold text-lg'>Nombre 2:</label>
        <input className='border p-1 rounded-md' type='text' name='name2' onChange={handleChangeUser} value={clienteInfo.name2} />
      </div>
      <div>
        <label className='flex font-semibold text-lg'>Apellido 1:</label>
        <input className='border p-1 rounded-md' type='text' name='lastname1' onChange={handleChangeUser} value={clienteInfo.lastname1} />
      </div>
      <div>
        <label className='flex font-semibold text-lg'>Apellido 2:</label>
        <input className='border p-1 rounded-md' type='text' name='lastname2' onChange={handleChangeUser} value={clienteInfo.lastname2} />
      </div>
      <div>
        <label className='flex font-semibold text-lg'>Cédula:</label>
        <input className='border p-1 rounded-md' type='text' name='cedula' onChange={handleChangeUser} value={clienteInfo.cedula} />
      </div>
      <div>
        <label className='flex font-semibold text-lg'>Teléfono:</label>
        <input className='border p-1 rounded-md' type='text' name='telefono' onChange={handleChangeUser} value={clienteInfo.telefono} />
      </div>
      <div>
        <label className='flex font-semibold text-lg'>Correo:</label>
        <input className='border p-1 rounded-md' type='text' name='correo' onChange={handleChangeUser} value={clienteInfo.correo} />
      </div>
      <div>
        <label className='flex font-semibold text-lg'>Whatsapp:</label>
        <input className='border p-1 rounded-md' type='text' name='telwhats' onChange={handleChangeUser} value={clienteInfo.telwhats} />
      </div>

      <button className='bg-blue-500 p-2 hover:bg-blue-700 rounded-md w-72 text-white font-medium mt-auto'>
        Actualizar Información
      </button>
    </form>
  )
}

export { FormEditClien }
