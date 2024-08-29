import { useNavigate } from 'react-router-dom'

function Dashboard () {
  const navigate = useNavigate()
  return (
    <main className='flex flex-col items-center justify-center pt-20'>
      <h1 className='text-5xl font-bold mb-4 animate-bounce'>Bienvenid@!</h1>
      <p className='text-lg mb-8 text-center max-w-xl'>
        Aplicativo para la gestión de clientes registrados y sin registrar. los cuales realizan solicitud mediante el chat-bot de WhatsApp.
      </p>
      <button onClick={() => navigate('/sinregistro')} className='px-6 py-3 bg-white text-blue-500 font-semibold rounded-lg shadow-md hover:bg-gray-100 transition duration-300 transform hover:scale-105'>
        Ver Clientes Sin Registro
      </button>
    </main>

  )
}

export default Dashboard
