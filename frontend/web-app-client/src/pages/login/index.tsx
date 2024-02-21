import { Form, Input, Button, Typography } from 'antd'

export const LoginPage = () => {
  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <Typography.Title>Вход</Typography.Title>
      <Form className='w-1/3'>
        <Form.Item
          label='Email'
          name='email'
          rules={[{ required: true, message: 'Пожалуйста, введите ваш email!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label='Пароль'
          name='password'
          rules={[{ required: true, message: 'Пожалуйста, введите ваш пароль!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button type='primary' htmlType='submit' className='w-full'>
            Войти
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}
