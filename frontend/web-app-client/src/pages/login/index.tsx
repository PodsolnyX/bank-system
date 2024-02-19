import { useForm } from 'react-hook-form'
import { Form, Input, Button, Typography } from 'antd'

export const LoginPage = () => {
  const { register, handleSubmit } = useForm()

  const onSubmit = (data: any) => {
    console.log(data)
  }

  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <Typography.Title>Вход</Typography.Title>
      <Form className='w-1/3' onFinish={handleSubmit(onSubmit)}>
        <Form.Item
          label='Email'
          name='email'
          rules={[{ required: true, message: 'Пожалуйста, введите ваш email!' }]}
        >
          <Input {...register('email')} />
        </Form.Item>

        <Form.Item
          label='Пароль'
          name='password'
          rules={[{ required: true, message: 'Пожалуйста, введите ваш пароль!' }]}
        >
          <Input.Password {...register('password')} />
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
