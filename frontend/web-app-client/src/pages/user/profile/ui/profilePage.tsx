import { useEffect } from 'react'
import { Card, Skeleton } from 'antd'
import { useLazyGetProfileQuery } from 'shared/api'
import { useAppSelector } from 'shared/store'
import { Center, PageHeader, Property } from 'shared/ui'
import { Link } from 'react-router-dom'
import { AppRoutes } from 'shared/const'

export const ProfilePage = () => {
  const [trigger, { data, isLoading }] = useLazyGetProfileQuery()
  const mail = useAppSelector((store) => store.authReducer.mail)

  useEffect(() => {
    if (mail) {
      trigger(mail, true)
    }
  }, [trigger, mail])

  if (isLoading) {
    return
  }

  return (
    <Center>
      <PageHeader text='Профиль' />
      {isLoading ? (
        <Card className='w-full md:w-1/2'>
          <Skeleton />
        </Card>
      ) : (
        <Card
          title={<span className='text-pretty'>{data?.name || 'Нет имени'}</span>}
          className='w-full md:w-1/2'
        >
          <Property name='id' value={data?.id || '—'} className='m-0' />
          <Property
            name='Роль'
            value={data?.isEmployee ? 'Клиент, сотрудник' : 'Клиент'}
            className='m-0'
          />
          <Property name='Почта' value={data?.mail || '—'} className='m-0' />
          <Link to={AppRoutes.LOGOUT}>Выйти</Link>
        </Card>
      )}
    </Center>
  )
}
