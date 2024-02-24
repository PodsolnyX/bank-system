import { HistoryTable } from 'entities'
import { Center, PageHeader, Property } from 'shared/ui'
import { useGetAccountHistoryQuery, useGetAccountQuery } from 'shared/api'
import { PageLoader } from 'widgets'
import { Navigate, useParams } from 'react-router-dom'
import { AppRoutes } from 'shared/const'
import { toastError } from 'shared/toast'

export const AccountPage = () => {
  const id = useParams()['id']!
  const accQuery = useGetAccountQuery({ id })
  const histQuery = useGetAccountHistoryQuery({ id })

  if (accQuery.isError || histQuery.isError) {
    toastError('Ошибка при получении данных о счете')
    return <Navigate to={AppRoutes.ACCOUNTS} />
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
