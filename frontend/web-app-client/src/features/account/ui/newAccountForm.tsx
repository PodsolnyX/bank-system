import { Button, Input } from 'antd'
import { DollarOutlined } from '@ant-design/icons'
import { Form } from 'shared'

export const NewAccountForm = () => {
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
        name='initialSum'
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
