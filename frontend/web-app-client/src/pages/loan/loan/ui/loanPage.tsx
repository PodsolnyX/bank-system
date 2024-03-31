import { Tabs } from 'antd'
import { Link, useParams } from 'react-router-dom'

import { VerboseLoanTable } from 'entities/loan'
import { PaymentsTable, getPaymentDisplayInfo } from 'entities/loan'
import { useGetLoansQuery } from 'entities/loan'
import { useGetPaymentsQuery } from 'entities/loan'
import { useGetHistoryQuery, OperationStatus } from 'entities/operation'
import { SortOrder } from 'shared/api'
import { AppRoutes, getLoanRepayLink } from 'shared/config'
import { format } from 'shared/lib/format'
import { Center, ErrorMsg, PageHeader, Property } from 'shared/ui'

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
    orderBy: 'createdAt',
    sortOrder: SortOrder.DESC,
    OperationStatuses: [
      OperationStatus.FAILURE,
      OperationStatus.PROCESSING,
      OperationStatus.SUCCESS,
    ],
  })
  const {
    data: payments,
    isFetching: paymentsIsFetching,
    isError: paymentsIsError,
  } = useGetPaymentsQuery({
    loanIds: [id!],
    onlyActual: false,
  })
  const curPayment = payments?.find((payment) => payment.isActual)
  const displayInfo = getPaymentDisplayInfo(loans?.[0], curPayment)

  const isLoading =
    loanIsFetching ||
    historyIsFetching ||
    paymentsIsFetching ||
    !history ||
    !loans ||
    !payments
  const isError = loanIsError || historyIsError || paymentsIsError

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
            value={`${loans[0].id}, тариф ${loans[0].tariff.name}, ${loans[0].tariff.interestRate}%, ${loans[0].tariff.periodInDays} дн`}
          />
          <Property
            name='Долг'
            value={`${format(loans[0].debt)} ${loans[0].currencyType}`}
          />
          <Property
            name='Статус'
            value={
              displayInfo.needToPay ? (
                <Link to={getLoanRepayLink(loans[0].id)} className='text-red-500'>
                  {displayInfo.text}
                </Link>
              ) : (
                <span style={{ color: displayInfo.color }}>{displayInfo.text}</span>
              )
            }
          />
          <Property
            name='Последняя оплата'
            value={
              loans[0].lastChargeDate
                ? new Date(loans[0].lastChargeDate).toLocaleString()
                : '—'
            }
          />
        </>
      )}
      <Tabs
        className='w-full md:w-2/3 flex justify-center align-center'
        centered
        defaultActiveKey='1'
        items={[
          {
            label: 'Основное',
            key: '1',
            children: <VerboseLoanTable operations={history!} isLoading={isLoading} />,
          },
          {
            label: 'Отчет',
            key: '2',
            children: (
              <PaymentsTable payments={payments!} full={false} isLoading={isLoading} />
            ),
          },
        ]}
      />
    </Center>
  )
}
