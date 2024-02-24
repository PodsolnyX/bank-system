import { Center, PageHeader } from 'shared/ui'
import { NewLoanForm, NewLoanFormData } from 'features/loan'
import {
  useGetTariffsQuery,
  useGetAccountsQuery,
  useRequestLoanMutation,
} from 'shared/api'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppRoutes } from 'shared/const'
import { toastError, toastSuccess } from 'shared/toast'
import { CurrencyType } from 'shared/entities'

export const NewLoanPage = () => {
  const navigate = useNavigate()
  const tariffs = useGetTariffsQuery({})
  const accounts = useGetAccountsQuery({})
  const [trigger] = useRequestLoanMutation()

  const onFinish = async (values: NewLoanFormData) => {
    console.log(values)
    try {
      await trigger(values).unwrap()
      toastSuccess('Ваша заявка принята, ждите')
      navigate(AppRoutes.MAIN)
    } catch {
      toastError('Произошла ошибка!')
    }
  }

  useEffect(() => {
    if (tariffs.isError || accounts.isError) {
      toastError('Произошла ошибка')
      // navigate(AppRoutes.MAIN)
    }
  }, [tariffs.isError, accounts.isError, navigate])

  if (!tariffs.isSuccess || !accounts.isSuccess) {
    // return <PageLoader />
  }

  return (
    <Center>
      <PageHeader text='Новый кредит' />
      <NewLoanForm
        onFinish={onFinish}
        accounts={[
          { amount: 32, id: '1', type: CurrencyType.EUR, user: '1', closedAt: false },
        ]}
        tariffs={[
          {
            currencyTypes: [CurrencyType.EUR],
            id: '11',
            interestRate: 11.5,
            name: 'тест',
            periodInDays: 180,
          },
        ]}
      />
    </Center>
  )
}
