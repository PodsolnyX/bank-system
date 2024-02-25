import { Form as AntdForm, FormProps as AntdFormProps, Skeleton } from 'antd'
import cs from 'classnames'
import { CommonProps } from 'shared/utils'

export type FormProps = AntdFormProps &
  CommonProps & {
    isLoading?: boolean | undefined
    showSkeleton?: boolean | undefined
  }

export const Form = (props: FormProps) => {
  const { children, className, isLoading, showSkeleton, ...rest } = props
  return (
    <AntdForm
      disabled={!!isLoading || !!showSkeleton}
      layout='vertical'
      className={cs(
        'w-full p-2 m-2 border-[1px] border-slate-300 border-solid rounded-md shadow-xl',
        className,
        { 'animate-pulse': isLoading }
      )}
      {...rest}
    >
      {<Skeleton loading={!!showSkeleton}>{children}</Skeleton>}
    </AntdForm>
  )
}

Form.Item = AntdForm.Item
