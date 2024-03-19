import { Result, Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import { Center, Image } from 'shared/ui'
import { AppRoutes } from 'shared/const'

import logo from 'shared/assets/logo.svg'

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
