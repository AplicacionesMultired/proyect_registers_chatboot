import { Link } from 'react-router-dom'

function NotFound () {
  return (
    <div className='w-screen h-screen flex flex-col gap-2 items-center justify-center'>
      <h1>404 Not Found</h1>
      <Link to='/' className='bg-blue-400 p-2 rounded-md hover:bg-blue-600 transition-all text-white'>
        Go back to the main page
      </Link>
    </div>
  )
}

export default NotFound
