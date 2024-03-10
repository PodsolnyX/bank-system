import cs from 'classnames'

export interface PageHeaderProps {
  text: string
  className?: string
  [x: string]: any
}

export const PageHeader = (props: PageHeaderProps) => {
  const { text, className, ...rest } = props
  return (
    <h1 {...rest} className={cs('my-3 text-lime-500 text-center', className)}>
      {text}
    </h1>
  )
}
