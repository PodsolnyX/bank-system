import { Result, Button } from 'antd'
import { AppRoutes } from 'shared/config'
import { Center } from 'shared/ui'

export const ErrorPage = () => {
  return (
    <Center>
      <Result
        status='error'
        title='Что-то пошло не так'
        subTitle='Произошла непредвиденная ошибка'
        extra={[
          <Button type='primary' onClick={() => (location.href = AppRoutes.MAIN)} key='1'>
            Главная
          </Button>,
        ]}
      />
    </Center>
  )
}
