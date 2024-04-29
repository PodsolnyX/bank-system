import { SunOutlined, MoonOutlined } from '@ant-design/icons'
import { Card, Skeleton, Switch } from 'antd'
import { useAuth } from 'oidc-react'
import { Link } from 'react-router-dom'

import { useTheme } from 'features/preferences'
import { Theme } from 'entities/preferences'
import { extractFromJWT } from 'entities/user'
import { AUTH_BASE_URL } from 'shared/config'
import { Center, PageHeader, Property, PageLoader } from 'shared/ui'

export const ProfilePage = () => {
  const { theme, setTheme } = useTheme()
  const { isLoading, userData } = useAuth()
  const token = userData?.access_token
  const data = extractFromJWT(token)

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
              <span className='text-pretty'>{data.name}</span>
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
          <Property name='id' value={data.id} className='m-0' />
          <Property name='Почта' value={data.mail} className='m-0' />
          <Link to={AUTH_BASE_URL}>Выйти</Link>
        </Card>
      )}
    </Center>
  )
}
