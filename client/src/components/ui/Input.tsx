import { InputHTMLAttributes } from 'react'

interface Props extends InputHTMLAttributes<HTMLInputElement> { }

export function Input ({ ...props }: Props) {
  return (
    <input className='p-2 2xl:p-4 text-md 2xl:text-xl w-full rounded-lg outline-none
    dark:bg-dark-tremor-content-subtle border-gray-300 text-gray-800 font-medium '
      {...props} />
  )
}
