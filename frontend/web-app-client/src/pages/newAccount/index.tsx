import { Button, Input } from 'antd'
import { CreditCardOutlined } from '@ant-design/icons'
import { Form, Center } from 'shared'

export const NewAccountPage = () => {
  const onFinish = (values: any) => {
    console.log(values)
  }

  return (
    <Center>
      <h1 className='mb-3'>Новый счет</h1>
      <Form
        layout='vertical'
        initialValues={{ remember: true }}
        onFinish={onFinish}
        className='w-2/3 md:w-1/3'
      >
        <Form.Item
          name='initialSum'
          label='Начальная сумма'
          rules={[{ required: true, message: 'Пожалуйста, введите сумму!' }]}
        >
          <Input
            type='number'
            min='0'
            max='99999999'
            prefix={<CreditCardOutlined className='site-form-item-icon' />}
            placeholder='Сумма (руб)'
          />
        </Form.Item>

        <Button className='float-right' type='primary' htmlType='submit'>
          Создать
        </Button>
      </Form>
    </Center>
  )
}
