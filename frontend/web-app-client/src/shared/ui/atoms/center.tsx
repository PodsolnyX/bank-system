import cs from 'classnames'
import { CommonProps } from 'shared/lib'

export const Center = (props: CommonProps) => {
  const { children, className, ...rest } = props
  return (
    <div
      className={cs('w-full h-full flex flex-col justify-center items-center', className)}
      {...rest}
    >
      {children}
    </div>
  )
}
