import { Button, Select } from 'antd'
import { CreditCardOutlined } from '@ant-design/icons'
import { Form } from 'shared'

export const CloseAccountForm = () => {
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
      <h2 className='text-red-500 text-center'>Подтвердите закрытие</h2>
      <Form.Item label='Счет' name='account'>
        <Select
          className='text-black'
          suffixIcon={<CreditCardOutlined />}
          placeholder='Счет'
        />
      </Form.Item>

      <Button danger className='float-right' type='primary' htmlType='submit'>
        Закрыть
      </Button>
    </Form>
  )
}
