import cs from 'classnames'
import { ReactNode } from 'react'

export interface PropertyProps {
  name: string
  value: ReactNode
  className?: string
  containerClassName?: string
}

export const Property = (props: PropertyProps) => {
  const { name, value, className, containerClassName } = props
  return (
    <div className={cs('w-full md:w-2/3', containerClassName)}>
      <span className={cs('text-lime-500', className)}>{`${name}:`}</span> {value}
    </div>
  )
}
