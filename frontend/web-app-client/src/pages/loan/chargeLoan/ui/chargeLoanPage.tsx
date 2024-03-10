import { useNavigate, useParams } from 'react-router-dom'
import { ChargeLoanForm, ChargeLoanFormValues } from 'features/loan'
import { useChargeLoanMutation, useGetAccountsQuery, useGetLoansQuery } from 'shared/api'
import { AppRoutes } from 'shared/const'
import { toastError, toastSuccess } from 'shared/toast'
import { ErrorMsg } from 'shared/ui'
import { PageLoader } from 'widgets'
import { convert } from 'shared/utils/format'

export const ChargeLoanPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [trigger, result] = useChargeLoanMutation()
  const loan = useGetLoansQuery({ accountIds: [id!] })
  const accounts = useGetAccountsQuery({})

  const onFinish = async (values: ChargeLoanFormValues) => {
    try {
      await trigger(convert(values)).unwrap()
      toastSuccess('Запрос на операцию принят')
      navigate(AppRoutes.MAIN)
    } catch {
      toastError('Произошла ошибка')
    }
  }
  if (loan.isFetching || accounts.isFetching) {
    return <PageLoader />
  }
  if (loan.isError || accounts.isError) {
    return (
      <ErrorMsg
        link={AppRoutes.LOANS}
        linkText='Вернуться в меню кредитов'
        text='Произошла ошибка при загрузке данных'
      />
    )
  }
  return (
    <ChargeLoanForm
      isLoading={result.isLoading}
      onFinish={onFinish}
      loan={loan.data![0]}
      showSkeleton={!loan.isSuccess || !accounts.isSuccess}
      accounts={accounts.data!}
    />
  )
}
