import { Flex } from 'antd'
import { useAppSelector } from 'shared/lib'
import { PageHeader, Center, PageLoader } from 'shared/ui'
import { MainMenuItems } from '../config'
import { MenuCard } from './menuCard'


export const MainPage = () => {
  const redirected = useAppSelector((store) => store.authReducer.redirected)

  if (!redirected) {
    return <PageLoader />
  }

  return (
    <Center>
      <PageHeader text='Добро пожаловать' />
      <h2 className='my-3'>Выберите пункт меню</h2>
      <Flex wrap={'wrap'} justify='center' align='center' className='mb-6'>
        {MainMenuItems.map((item, index) => (
          <MenuCard {...item} key={index} />
        ))}
      </Flex>
    </Center>
  )
}
