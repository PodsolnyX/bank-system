import { Button, Input, Select } from 'antd'
import { DollarOutlined, AccountBookFilled } from '@ant-design/icons'
import { Form } from 'shared'

export const NewCreditForm = () => {
  const onFinish = (values: any) => {
    console.log(values)
  }

  return (
    <Form
      layout='vertical'
      initialValues={{ remember: true }}
      onFinish={onFinish}
      className='w-2/3 md:w-1/3'
    >
      <Form.Item
        label='Тариф'
        name='tariff'
        rules={[{ required: true, message: 'Пожалуйста, выберите тариф!' }]}
      >
        <Select
          className='text-black'
          suffixIcon={<AccountBookFilled />}
          placeholder='Тариф'
        />
      </Form.Item>
      <Form.Item
        name='sum'
        label='Сумма'
        rules={[{ required: true, message: 'Пожалуйста, введите сумму!' }]}
      >
        <Input
          type='number'
          min='10000'
          max='500000'
          suffix={<DollarOutlined className='site-form-item-icon' />}
          placeholder='Сумма (руб)'
        />
      </Form.Item>
      <Form.Item
        label='До'
        name='dateEnd'
        rules={[{ required: true, message: 'Пожалуйста, выберите дату!' }]}
      >
        <Input type='date' />
      </Form.Item>

      <Button className='float-right' type='primary' htmlType='submit'>
        Создать
      </Button>
    </Form>
  )
}
