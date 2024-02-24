import { Button, Select } from 'antd'
import { DollarOutlined } from '@ant-design/icons'
import { Form, FormProps } from 'shared/ui'
import { Account } from 'shared/entities'
import { CurrencyType } from 'shared/entities/currency'

export type NewAccountFormProps = {
  onFinish: (data: NewAccountFormData) => void
} & Omit<FormProps, 'children'>

export type NewAccountFormData = Pick<Account, 'type'>

export const NewAccountForm = (props: NewAccountFormProps) => {
  const { onFinish, ...rest } = props

  return (
    <Form
      {...rest}
      onFinish={(data: NewAccountFormData) => onFinish(data)}
      className='w-2/3 md:w-1/3'
    >
      <Form.Item
        name='type'
        label='Тип валюты'
        rules={[{ required: true, message: 'Пожалуйста, выберите тип!' }]}
      >
        <Select suffixIcon={<DollarOutlined />} placeholder='Выберите валюту'>
          {Object.keys(CurrencyType).map((cur, i) => (
            <Select.Option key={i}>{cur}</Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Button className='float-right' type='primary' htmlType='submit'>
        Создать
      </Button>
    </Form>
  )
}
