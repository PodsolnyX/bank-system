import { Form as AntdForm } from 'antd'
import cs from 'classnames'
import { CommonProps } from 'shared/utils'

export type FormProps = CommonProps & {
  isLoading?: boolean
}

export const Form = (props: FormProps) => {
  const { children, className, isLoading, ...rest } = props
  return (
    <AntdForm
      disabled={!!isLoading}
      layout='vertical'
      className={cs(
        'w-full p-2 m-2 border-[1px] border-slate-300 border-solid rounded-md shadow-xl',
        className,
        { 'animate-pulse': isLoading }
      )}
      {...rest}
    >
      {children}
    </AntdForm>
  )
}

Form.Item = AntdForm.Item
