import { Input, Button } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { useRegisterMutation } from 'shared/api'
import { AppRoutes } from 'shared/const'
import { useAppDispatch } from 'shared/store'
import { setEmail } from 'shared/store'
import { toastError, toastSuccess } from 'shared/toast'
import { Form } from 'shared/ui'

export const RegisterPage = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const [trigger] = useRegisterMutation()

  const onFinish = async (values: any) => {
    try {
      await trigger(values).unwrap()
      dispatch(setEmail(values.mail))
      localStorage.setItem('email', values.mail)
      toastSuccess('Вы зарегистрировались')
      navigate(AppRoutes.MAIN)
    } catch(err) {
      toastError('Ошибка при регистрации')
    }
  }

  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <h1 className='my-2'>Регистрация</h1>
      <div className='w-5/6 md:w-1/2 text-center'>
        <Form onFinish={onFinish} layout='vertical' className='m-0'>
          <Form.Item
            label='Email'
            name='mail'
            rules={[{ required: true, message: 'Пожалуйста, введите ваш email!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label='ФИО'
            name='name'
            rules={[
              { required: true, message: 'Пожалуйста, введите ФИО!' },
              { min: 8 },
              { max: 100 },
            ]}
          >
            <Input />
          </Form.Item>

          <Link to={AppRoutes.LOGIN} className='select-none'>Вход</Link>


          <Form.Item className='m-1'>
            <Button type='primary' htmlType='submit' className='w-1/2'>
              Готово
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
