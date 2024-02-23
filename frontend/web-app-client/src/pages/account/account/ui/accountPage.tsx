import { HistoryTable } from 'entities'
import { Center, PageHeader, Property } from 'shared/ui'
import { useGetAccountHistoryQuery, useGetAccountQuery } from 'shared/api'
import { PageLoader } from 'widgets'
import { Navigate, useParams } from 'react-router-dom'
import { AppRoutes } from 'shared/const'
import { toast } from 'react-toastify'

export const AccountPage = () => {
  const id = useParams()['id']!
  const accQuery = useGetAccountQuery({id})
  const histQuery = useGetAccountHistoryQuery({id})


  if (accQuery.isError || histQuery.isError) {
    setTimeout(() => toast.error('Ошибка при получении данных о счете'), 100)
    return <Navigate to={AppRoutes.ACCOUNTS}/>
  }
  if (!accQuery.isSuccess || !histQuery.isSuccess) {
    return <PageLoader />
  }

  return (
    <Center>
      <PageHeader text='Страница счета' />
      <Property name='Номер счета' value={accQuery.data!.number} />
      <Property name='Текущая сумма' value={accQuery.data!.balance} />
      <Property name='Статус счета' value={accQuery.data!.closed ? 'Закрыт' : 'Открыт'} />
      <HistoryTable
        history={histQuery.data!}
      />
    </Center>
  )
}
