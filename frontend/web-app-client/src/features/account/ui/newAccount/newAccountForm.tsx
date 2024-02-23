import { Button, Input } from 'antd'
import { DollarOutlined } from '@ant-design/icons'
import { Form, FormProps } from 'shared/ui'

export type NewAccountFormProps = {
  onFinish: (data: NewAccountFormData) => void
} & Omit<FormProps, 'children'>

export interface NewAccountFormData {
  balance: number
}

export const NewAccountForm = (props: NewAccountFormProps) => {
  const { onFinish, ...rest } = props

  return (
    <Form
      {...rest}
      onFinish={(data: NewAccountFormData) => onFinish(data)}
      className='w-2/3 md:w-1/3'
    >
      <Form.Item
        name='balance'
        label='Начальная сумма'
        rules={[{ required: true, message: 'Пожалуйста, введите сумму!' }]}
      >
        <Input
          type='number'
          min='0'
          max='99999999'
          prefix={<DollarOutlined className='site-form-item-icon' />}
          placeholder='Сумма (руб)'
        />
      </Form.Item>

      <Button className='float-right' type='primary' htmlType='submit'>
        Создать
      </Button>
    </Form>
  )
}
