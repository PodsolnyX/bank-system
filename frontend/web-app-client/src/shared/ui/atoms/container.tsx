import { ReactNode } from 'react'
import cs from 'classnames'
export interface ContainerProps {
  children?: ReactNode
  className?: string
  [key: string]: any
}

export const Container = (props: ContainerProps) => {
  const { children, className, ...rest } = props
  return (
    <div
      className={cs(
        'bg-white rounded-lg border-[1px] border-slate-300 border-solid mx-1 p-2 relative select-none hover:shadow-inner',
        className
      )}
      {...rest}
    >
      {children}
    </div>
  )
}
