import { useEffect } from 'react'
import { Card } from 'antd'
import { useGetProfileMutation } from 'shared/api'
import { useAppSelector } from 'shared/store'
import { Center, PageHeader, Property } from 'shared/ui'
import { PageLoader } from 'widgets'
import { Link } from 'react-router-dom'
import { AppRoutes } from 'shared/const'

export const ProfilePage = () => {
  const [trigger, { data, isLoading }] = useGetProfileMutation()
  const mail = useAppSelector((store) => store.authReducer.mail)

  useEffect(() => {
    trigger(mail)
  }, [trigger, mail])

  if (isLoading) {
    return <PageLoader />
  }

  return (
    <Center>
      <PageHeader text='Профиль' />
      <Card
        title={data?.name || 'Нет имени'}
        extra={<Link to={AppRoutes.LOGOUT}>Выйти</Link>}
        className='w-full md:w-1/2'
      >
        <Property name='id' value={data?.id || '—'} className='m-0' />
        <Property
          name='Роль'
          value={data?.isEmployee ? 'Клиент, сотрудник' : 'Клиент'}
          className='m-0'
        />
        <Property name='Почта' value={data?.mail || '—'} className='m-0' />
      </Card>
    </Center>
  )
}
