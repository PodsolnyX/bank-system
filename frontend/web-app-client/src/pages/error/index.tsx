import { Result, Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import { AppRoutes, Center } from 'shared'

export const ErrorPage = () => {
  const navigate = useNavigate()

  const onClick = () => {
    navigate(AppRoutes.MAIN)
  }

  return (
    <Center>
      <Result
        status='error'
        title='Что-то пошло не так'
        subTitle='Произошла непредвиденная ошибка, попробуйте вернуться на главную страницу.'
        extra={[
          <Button type='primary' onClick={onClick}>
            Главная
          </Button>,
        ]}
      />
    </Center>
  )
}
