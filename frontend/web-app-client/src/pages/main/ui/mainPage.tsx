import { Flex } from 'antd'
import { PageHeader, Center } from 'shared/ui'
import { MenuCard } from './menuCard'
import { MainMenuItems } from '../config'

export const MainPage = () => {
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
