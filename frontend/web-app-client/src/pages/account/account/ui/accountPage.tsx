import { useParams } from 'react-router-dom'
import { PlusCircleOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'

import { HistoryTable } from 'entities'
import { Center, ErrorMsg, PageHeader, Property } from 'shared/ui'
import { useGetHistoryQuery, useGetAccountQuery } from 'shared/api'
import { AppRoutes } from 'shared/const'
import { Button, Skeleton } from 'antd'

export const AccountPage = () => {
  const id = useParams()['id']!
  const accQuery = useGetAccountQuery({ id })
  const histQuery = useGetHistoryQuery({ account: [id] })
  const isLoading = !accQuery.isSuccess || !histQuery.isSuccess

  if (accQuery.isError || histQuery.isError) {
    return (
      <ErrorMsg
        link={AppRoutes.ACCOUNTS}
        linkText='Вернуться в меню счетов'
        text='Произошла ошибка при загрузке данных'
      />
    )
  }

  return (
    <Center>
      <PageHeader text='Страница счета' />
      {isLoading ? (
        <>
          <Skeleton.Button className='mb-2' />
          <Skeleton />
        </>
      ) : (
        <>
          <Link to={AppRoutes.ACCOUNT_NEW}>
            <Button className='mb-2' icon={<PlusCircleOutlined />}>
              Новый счет
            </Button>
          </Link>
          <Property name='Номер счета' value={accQuery.data!.id} />
          <Property
            name='Текущая сумма'
            value={`${accQuery.data!.amount}${accQuery.data!.type}`}
          />
          <Property
            name='Статус счета'
            value={
              accQuery.data!.closedAt ? `Закрыт ${accQuery.data!.closedAt}` : 'Открыт'
            }
          />
        </>
      )}
      <HistoryTable isLoading={isLoading} history={histQuery.data!} />
    </Center>
  )
}
