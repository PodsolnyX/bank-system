import { Link } from 'react-router-dom'
import { Card, Skeleton, Switch } from 'antd'
import { useAuth } from 'oidc-react'
import { SunOutlined, MoonOutlined } from '@ant-design/icons'

import { Center, PageHeader, Property } from 'shared/ui'
import { AppRoutes } from 'shared/config'
import { useTheme } from 'features/preferences'
import { Theme } from 'entities/preferences'
import { PageLoader } from 'shared/ui'

export const ProfilePage = () => {
  const { theme, setTheme } = useTheme()
  const { isLoading, userData } = useAuth()
  const profile = userData?.profile
  const roles = profile?.['roles']

  if (isLoading) {
    return <PageLoader />
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
          title={
            <div className='flex items-center'>
              <span className='text-pretty'>{profile?.name || 'Нет имени'}</span>
              <Switch
                className='ms-auto'
                value={theme === Theme.Dark}
                onChange={() =>
                  setTheme({ theme: theme === Theme.Dark ? Theme.Default : Theme.Dark })
                }
                checkedChildren={<MoonOutlined />}
                unCheckedChildren={<SunOutlined />}
              />
            </div>
          }
          className='w-full md:w-1/2'
        >
          <Property name='id' value={profile?.sub || '—'} className='m-0' />
          <Property
            name='Роль'
            value={roles === 'Client' ? 'Клиент' : 'Клиент, сотрудник'}
            className='m-0'
          />
          <Property name='Почта' value={profile?.email || '—'} className='m-0' />
          <Link to={AppRoutes.MAIN}>Выйти</Link>
        </Card>
      )}
    </Center>
  )
}
