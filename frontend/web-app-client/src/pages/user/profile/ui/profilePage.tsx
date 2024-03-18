import { useEffect } from 'react'
import { Card, Skeleton, Switch } from 'antd'
import { SunOutlined, MoonOutlined } from '@ant-design/icons'
import { useLazyGetProfileQuery } from 'shared/api'
import { useAppSelector } from 'shared/store'
import { Center, PageHeader, Property } from 'shared/ui'
import { Link } from 'react-router-dom'
import { AppRoutes } from 'shared/const'
import { useTheme } from 'app/styles/lib'
import { Theme } from 'shared/entities'

export const ProfilePage = () => {
  const { theme, setTheme } = useTheme()

  const [trigger, { data, isLoading }] = useLazyGetProfileQuery()
  const id = useAppSelector((store) => store.authReducer.id)

  useEffect(() => {
    if (id) {
      trigger(id, true)
    }
  }, [trigger, id])

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
          title={
            <div className='flex items-center'>
              <span className='text-pretty'>{data?.name || 'Нет имени'}</span>
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
          <Property name='id' value={data?.id || '—'} className='m-0' />
          <Property
            name='Роль'
            value={data?.isEmployee ? 'Клиент, сотрудник' : 'Клиент'}
            className='m-0'
          />
          <Property name='Почта' value={data?.mail || '—'} className='m-0' />
          <Link to={AppRoutes.MAIN}>Выйти</Link>
        </Card>
      )}
    </Center>
  )
}
