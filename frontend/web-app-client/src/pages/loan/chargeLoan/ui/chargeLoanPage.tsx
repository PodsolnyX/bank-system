import { useNavigate, useParams } from 'react-router-dom'
import { ChargeLoanForm, ChargeLoanFormValues } from 'features/loan'
import { useChargeLoanMutation, useGetAccountsQuery, useGetLoanQuery } from 'shared/api'
import { AppRoutes } from 'shared/const'
import { CurrencyType } from 'shared/entities'
import { toastError, toastSuccess } from 'shared/toast'
import { ErrorMsg } from 'shared/ui'

export const ChargeLoanPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [trigger, result] = useChargeLoanMutation()
  const loan = useGetLoanQuery({ id: id! })
  const accounts = useGetAccountsQuery({})

  const onFinish = async (values: ChargeLoanFormValues) => {
    try {
      await trigger(values).unwrap()
      toastSuccess('Запрос на операцию принят')
      navigate(AppRoutes.HISTORY)
    } catch {
      toastError('Произошла ошибка')
    }
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
      loan={{
        currencyType: CurrencyType.EUR,
        debt: 31,
        id: '7820',
      }}
      showSkeleton={!loan.isSuccess || !accounts.isSuccess}
      accounts={[
        { id: '3', type: CurrencyType.EUR, amount: 13 },
        { id: '4', type: CurrencyType.RUB, amount: 15 },
      ]}
    />
  )
}
