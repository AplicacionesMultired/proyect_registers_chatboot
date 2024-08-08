import { LabelHTMLAttributes } from 'react'

interface Props extends LabelHTMLAttributes<HTMLLabelElement> { }

export function Label ({ children, ...props }: Props) {
  return (
    <label className='font-semibold min-w-max' {...props}>
      {children}
    </label>
  )
}
