import { Input, Button } from 'antd'
import { useGetProfileMutation } from 'shared/api'
import { useAppDispatch } from 'shared/store'
import { setEmail } from 'shared/store'
import { toastError, toastSuccess } from 'shared/toast'
import { Form } from 'shared/ui'

export const LoginPage = () => {
  const dispatch = useAppDispatch()

  const [trigger] = useGetProfileMutation()

  const onFinish = async (values: any) => {
    localStorage.setItem('email', values.email)
    try {
      await trigger(values.email).unwrap()
      dispatch(setEmail(values.email))
      toastSuccess('Вход выполнен')
    } catch {
      toastError('Ошибка при входе')
    }
  }

  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <h1 className='my-2'>Вход в аккаунт</h1>
      <div className='w-5/6 md:w-1/2'>
        <Form onFinish={onFinish} layout='vertical' className='m-0'>
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
