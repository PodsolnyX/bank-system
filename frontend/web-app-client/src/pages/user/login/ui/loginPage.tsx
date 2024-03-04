import { Input, Button } from 'antd'
import { Link } from 'react-router-dom'
import { useGetProfileMutation } from 'shared/api'
import { AppRoutes } from 'shared/const'
import { useAppDispatch } from 'shared/store'
import { setEmail } from 'shared/store'
import { toastError, toastSuccess } from 'shared/toast'
import { Form } from 'shared/ui'

export const LoginPage = () => {
  const dispatch = useAppDispatch()

  const [trigger] = useGetProfileMutation()

  const onFinish = async (values: any) => {
    try {
      await trigger(values.mail).unwrap()
      dispatch(setEmail(values.mail))
      localStorage.setItem('email', values.mail)
      toastSuccess('Вход выполнен')
    } catch {
      toastError('Ошибка при входе')
    }
  }

  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <h1 className='my-2'>Вход в аккаунт</h1>
      <div className='w-5/6 md:w-1/2 text-center'>
        <Form onFinish={onFinish} layout='vertical' className='m-0'>
          <Form.Item
            label='Email'
            name='mail'
            rules={[{ required: true, message: 'Пожалуйста, введите ваш email!' }]}
          >
            <Input />
          </Form.Item>

          <Link to={AppRoutes.REGISTER} className='select-none'>Регистрация</Link>

          <Form.Item className='m-1'>
            <Button type='primary' htmlType='submit' className='w-1/2'>
              Войти
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
