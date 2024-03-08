import { Link, useParams } from 'react-router-dom'

import { VerboseLoanTable } from 'entities'
import { Center, ErrorMsg, PageHeader, Property } from 'shared/ui'
import { AppRoutes, getLoanRepayLink } from 'shared/const'
import { needToPay } from 'entities/loan'
import { useGetHistoryQuery, useGetLoansQuery } from 'shared/api'
import { OperationStatus, SortOrder } from 'shared/entities'
import { format } from 'shared/utils/format'

export const LoanPage = () => {
  const { id } = useParams()
  const {
    data: loans,
    isFetching: loanIsFetching,
    isError: loanIsError,
  } = useGetLoansQuery({ accountIds: [id!] })
  const {
    data: history,
    isFetching: historyIsFetching,
    isError: historyIsError,
  } = useGetHistoryQuery({
    loanIds: [id!],
    limit: 100000,
    OperationStatuses: [OperationStatus.SUCCESS],
    orderBy: 'createdAt',
    sortOrder: SortOrder.DESC,
  })

  const isLoading = loanIsFetching || historyIsFetching || !history || !loans
  const isError = loanIsError || historyIsError

  if (isError || (!isLoading && loans.length === 0)) {
    return (
      <ErrorMsg
        link={AppRoutes.LOANS}
        linkText='Вернуться в меню кредитов'
        text='Произошла ошибка при загрузке данных'
      />
    )
  }

  return (
    <Center>
      <PageHeader text='Информация о кредите' />

      {!isLoading && (
        <>
          <Property
            name='Кредит'
            value={`${loans[0].id}, тариф ${loans[0].tariff.name}, ${loans[0].tariff.interestRate}%`}
          />
          <Property
            name='Долг'
            value={`${format(loans[0].debt)} ${loans[0].currencyType}`}
          />
          <Property
            name='Статус'
            value={
              needToPay(loans[0].lastChargeDate) ? (
                <Link to={getLoanRepayLink(loans[0].id)} className='text-red-500'>
                  Нужна оплата
                </Link>
              ) : (
                <span className='text-lime-500'>Да</span>
              )
            }
          />
          <Property name='Последняя оплата' value={loans[0].lastChargeDate || '—'} />
        </>
      )}

      <VerboseLoanTable operations={history!} isLoading={isLoading} />
    </Center>
  )
}
