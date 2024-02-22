import { Flex } from 'antd'
import { Center } from 'shared'
import { MenuCard } from 'pages/main/ui/menuCard'
import { MainMenuItems } from 'pages/main/config'

export const MainPage = () => {
  return (
    <Center>
      <h1 className='text-center'>Добро пожаловать</h1>
      <h2 className='my-3'>Выберите пункт меню</h2>
      <Flex wrap={'wrap'} justify='center' align='center' className='mb-6'>
        {MainMenuItems.map((item, index) => (
          <MenuCard {...item} key={index} />
        ))}
      </Flex>
    </Center>
  )
}
