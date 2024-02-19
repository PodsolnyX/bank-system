import { Result, Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import { AppRoutes, Center } from 'shared'
import logo from 'assets/logo.svg'

export const NotFoundPage = () => {
  const navigate = useNavigate()

  const onClick = () => {
    navigate(AppRoutes.MAIN)
  }

  return (
    <Center>
      <Result
        className='shimmer'
        icon={<img src={logo} className='img-shadow' />}
        title='Страница не найдена!'
        subTitle='Извините, запрашиваемая Вами страница не существует.'
        extra={
          <Button type='primary' onClick={onClick}>
            Домой
          </Button>
        }
      />
    </Center>
  )
}
