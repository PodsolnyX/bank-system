import cs from 'classnames'
import { CommonProps } from 'shared/lib'

export const Container = (props: CommonProps) => {
  const { children, className, ...rest } = props
  return (
    <div
      className={cs(
        'bg-cardbg rounded-lg border-[1px] border-border border-solid m-1 p-2 relative select-none hover:shadow-inner',
        className
      )}
      {...rest}
    >
      {children}
    </div>
  )
}
