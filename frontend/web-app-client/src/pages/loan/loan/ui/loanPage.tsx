import { Link, useParams } from 'react-router-dom'

import { VerboseLoanTable } from 'entities'
import { Center, ErrorMsg, PageHeader, Property } from 'shared/ui'
import { AppRoutes, getLoanRepayLink } from 'shared/const'
import { needToPay } from 'entities/loan/lib'
import { useGetHistoryQuery, useGetLoanQuery } from 'shared/api'
import { OperationStatus } from 'shared/entities'

export const LoanPage = () => {
  const { id } = useParams()
  const {
    data: loan,
    isFetching: loanIsFetching,
    isError: loanIsError,
  } = useGetLoanQuery({ id: id! })
  const {
    data: history,
    isFetching: historyIsFetching,
    isError: historyIsError,
  } = useGetHistoryQuery({
    LoanIds: [id!],
    limit: 100000,
    status: [OperationStatus.SUCCESS],
  })

  const isLoading = loanIsFetching || historyIsFetching || !history || !loan
  const isError = loanIsError || historyIsError

  if (isError) {
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
            value={`${loan.id}, тариф ${loan.tariff.name}, ${loan.tariff.interestRate}%`}
          />
          <Property
            name='Долг / сумма'
            value={`${loan.debt} / ${loan.sum} ${loan.currencyType}`}
          />
          <Property
            name='Статус'
            value={
              needToPay(loan.lastChargeDate) ? (
                <Link to={getLoanRepayLink(loan.id)} className='text-red-500'>
                  Нужна оплата
                </Link>
              ) : (
                <span className='text-lime-500'>Да</span>
              )
            }
          />
          <Property name='Последняя оплата' value={loan.lastChargeDate || '—'} />
        </>
      )}

      <VerboseLoanTable operations={history!} isLoading={isLoading} />
    </Center>
  )
}
