import { useNavigate, useParams } from 'react-router-dom'
import {
  ChargeLoanForm,
  ChargeLoanFormValues,
  useChargeLoanMutation,
} from 'features/loan'
import { useGetAccountsQuery } from 'entities/account'
import { useGetLoansQuery } from 'entities/loan'
import { AppRoutes } from 'shared/config'
import { toastError, toastSuccess } from 'shared/lib'
import { convert } from 'shared/lib/format'
import { ErrorMsg } from 'shared/ui'
import { PageLoader } from 'shared/ui'

export const ChargeLoanPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [trigger, result] = useChargeLoanMutation()
  const loan = useGetLoansQuery({ accountIds: [id!] })
  const accounts = useGetAccountsQuery({ hidden: false })

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
