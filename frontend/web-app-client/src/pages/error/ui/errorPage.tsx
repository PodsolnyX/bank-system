import { Result, Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import { Center } from 'shared/ui'
import { AppRoutes } from 'shared/const'

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
        subTitle='Произошла непредвиденная ошибка'
        extra={[
          <Button type='primary' onClick={onClick}>
            Главная
          </Button>,
        ]}
      />
    </Center>
  )
}
