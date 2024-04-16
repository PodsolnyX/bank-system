import { Flex } from 'antd'
import addNotification from 'react-push-notification';
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
      <button onClick={() => {
        setTimeout(() => addNotification({
            title: 'Warning',
            subtitle: 'This is a subtitle',
            message: 'This is a very long message',
            native: true // when using native, your OS will handle theming.
        }), 5000);
    }}>выфвфы</button>
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
