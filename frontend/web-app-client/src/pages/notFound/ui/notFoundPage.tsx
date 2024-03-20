import { Result, Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import logo from 'shared/assets/logo.svg'
import { AppRoutes } from 'shared/config'
import { Center, Image } from 'shared/ui'

export const NotFoundPage = () => {
  const navigate = useNavigate()

  const onClick = () => {
    navigate(AppRoutes.MAIN)
  }

  return (
    <Center>
      <Result
        className='shimmer'
        icon={<Image src={logo} className='img-shadow w-[150px] md:w-[200px]' />}
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
