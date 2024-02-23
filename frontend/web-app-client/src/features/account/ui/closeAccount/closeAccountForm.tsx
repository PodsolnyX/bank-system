import { Button } from 'antd'
import { Form } from 'shared/ui'
import { Account } from 'shared/entities'

export interface CloseAccountFormProps {
  onFinish: () => void
  account: Pick<Account, 'number'>
}

export const CloseAccountForm = (props: CloseAccountFormProps) => {
  const { onFinish, account } = props

  return (
    <Form
      initialValues={{ remember: true }}
      onFinish={onFinish}
      className='w-2/3 md:w-1/3'
    >
      <h2 className='text-center'>Подтвердите закрытие</h2>
      <h3 className='text-center'>Это действие невозможно отменить!</h3>
      <h3 className='text-center'>Номер счета: {account.number}</h3>

      <Button danger className='float-right' type='primary' htmlType='submit'>
        Закрыть
      </Button>
    </Form>
  )
}
