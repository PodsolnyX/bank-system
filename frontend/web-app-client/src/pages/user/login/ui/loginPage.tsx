import { Input, Button } from 'antd'
import { useAppDispatch } from 'shared/store'
import { setEmail } from 'shared/store'
import { toastSuccess } from 'shared/toast'
import { Form } from 'shared/ui'

export const LoginPage = () => {
  const dispatch = useAppDispatch()
  const onFinish = (values: any) => {
    localStorage.setItem('email', values.email)
    dispatch(setEmail(values.email))
    toastSuccess('Вход выполнен')
  }

  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <h1 className='my-2'>Войдите в аккаунт</h1>
      <div className='w-full md:w-1/2'>
        <Form onFinish={onFinish} layout='vertical'>
          <Form.Item
            label='Email'
            name='email'
            rules={[{ required: true, message: 'Пожалуйста, введите ваш email!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item>
            <Button type='primary' htmlType='submit' className='w-full'>
              Войти
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
