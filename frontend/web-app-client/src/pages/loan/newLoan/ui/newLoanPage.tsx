import { Center, ErrorMsg, PageHeader } from 'shared/ui'
import { NewLoanForm, NewLoanFormData } from 'features/loan'
import { useGetAccountsQuery } from 'entities/account'
import { useGetTariffsQuery } from 'entities/tariff'
import { useRequestLoanMutation } from 'features/loan'
import { useNavigate } from 'react-router-dom'
import { AppRoutes } from 'shared/config'
import { toastError, toastSuccess } from 'shared/lib'
import { PageLoader } from 'shared/ui'
import { convert } from 'shared/lib/format'

export const NewLoanPage = () => {
  const navigate = useNavigate()
  const tariffs = useGetTariffsQuery({})
  const accounts = useGetAccountsQuery({ hidden: false })
  const [trigger] = useRequestLoanMutation()

  const onFinish = async (values: NewLoanFormData) => {
    try {
      await trigger(convert(values)).unwrap()
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

  if (accounts.data?.filter((acc) => !acc.closedAt)?.length === 0) {
    return (
      <ErrorMsg
        text='У вас еще нет активных счетов'
        link={AppRoutes.ACCOUNTS}
        linkText='В меню счетов'
      />
    )
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
