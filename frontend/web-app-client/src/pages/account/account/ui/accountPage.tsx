import { HistoryTable } from 'entities'
import { Center, ErrorMsg, PageHeader, Property } from 'shared/ui'
import { useGetHistoryQuery, useGetAccountQuery } from 'shared/api'
import { PageLoader } from 'widgets'
import { useParams } from 'react-router-dom'
import { AppRoutes } from 'shared/const'

export const AccountPage = () => {
  const id = useParams()['id']!
  const accQuery = useGetAccountQuery({ id })
  const histQuery = useGetHistoryQuery({ account: [id] })

  if (accQuery.isError || histQuery.isError) {
    return (
      <ErrorMsg
        link={AppRoutes.ACCOUNTS}
        linkText='Вернуться в меню счетов'
        text='Произошла ошибка при загрузке данных'
      />
    )
  }
  if (!accQuery.isSuccess || !histQuery.isSuccess) {
    return <PageLoader />
  }

  return (
    <Center>
      <PageHeader text='Страница счета' />
      <Property name='Номер счета' value={accQuery.data!.id} />
      <Property name='Текущая сумма' value={accQuery.data!.amount} />
      <Property
        name='Статус счета'
        value={accQuery.data!.closedAt ? 'Закрыт' : 'Открыт'}
      />
      <HistoryTable history={histQuery.data!} />
    </Center>
  )
}
