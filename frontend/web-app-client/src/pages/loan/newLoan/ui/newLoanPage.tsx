import { Center, ErrorMsg, PageHeader } from 'shared/ui'
import { NewLoanForm, NewLoanFormData } from 'features/loan'
import {
  useGetTariffsQuery,
  useGetAccountsQuery,
  useRequestLoanMutation,
} from 'shared/api'
import { useNavigate } from 'react-router-dom'
import { AppRoutes } from 'shared/const'
import { toastError, toastSuccess } from 'shared/toast'
import { PageLoader } from 'widgets'

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

  if (tariffs.isError || accounts.isError) {
    return (
      <ErrorMsg
        link={AppRoutes.LOANS}
        linkText='Перейти в меню кредитов'
        text='Произошла ошибка при загрузке данных'
      />
    )
  }

  if (!tariffs.isSuccess || !accounts.isSuccess) {
    return <PageLoader />
  }

  return (
    <Center>
      <PageHeader text='Новый кредит' />
      <NewLoanForm
        onFinish={onFinish}
        accounts={accounts.data!}
        tariffs={tariffs.data!}
      />
    </Center>
  )
}
