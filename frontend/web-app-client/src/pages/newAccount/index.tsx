import { Center } from 'shared'
import { CreditCardOutlined } from '@ant-design/icons'
import { Button, Form, Input } from 'antd'

export const NewAccountPage = () => {
  const onFinish = (values: any) => {
    console.log(values)
  }

  return (
    <Center>
      <h1 className='mb-6'>Новый счет</h1>
      <Form
        layout='vertical'
        initialValues={{ remember: true }}
        onFinish={onFinish}
        className='w-full p-2 border-[1px] border-slate-300 border-solid rounded-md shadow-xl'
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
