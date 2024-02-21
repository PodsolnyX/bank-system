import { Form as AntdForm } from 'antd'
import cs from 'classnames'
import { CommonProps } from 'shared/utils'

export const Form = (props: CommonProps) => {
  const { children, className, ...rest } = props
  return (
    <AntdForm
      layout='vertical'
      className={cs(
        'w-full p-2 m-2 border-[1px] border-slate-300 border-solid rounded-md shadow-xl',
        className
      )}
      {...rest}
    >
      {children}
    </AntdForm>
  )
}

Form.Item = AntdForm.Item
