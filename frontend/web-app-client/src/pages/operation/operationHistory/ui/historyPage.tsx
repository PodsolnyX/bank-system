import { HistoryTable } from 'entities'
import { useGetHistoryQuery } from 'shared/api'
import { AppRoutes } from 'shared/const'
import { OperationStatus, SortOrder } from 'shared/entities'
import { Center, ErrorMsg, PageHeader } from 'shared/ui'

export const HistoryPage = () => {
  const histQuery = useGetHistoryQuery({
    orderBy: 'createdAt',
    sortOrder: SortOrder.DESC,
    OperationStatuses: [
      OperationStatus.FAILURE,
      OperationStatus.PROCESSING,
      OperationStatus.SUCCESS,
    ],
  })

  if (histQuery.isError) {
    return (
      <ErrorMsg
        link={AppRoutes.MAIN}
        linkText='Вернуться в главное меню'
        text='Произошла ошибка при загрузке данных'
      />
    )
  }

  return (
    <Center>
      <PageHeader text='История операций' />
      <HistoryTable isLoading={histQuery.isFetching} full history={histQuery.data!} />
    </Center>
  )
}
