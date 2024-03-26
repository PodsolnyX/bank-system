import { useNavigate, useParams } from 'react-router-dom'
import { TransferForm, TransferFormValues } from 'features/account'
import { useGetAccountQuery, useDepositMutation, useWithdrawMutation } from 'entities/account'
import { AppRoutes } from 'shared/config'
import { toastError, toastSuccess, convert } from 'shared/lib'
import { PageLoader, ErrorMsg } from 'shared/ui'

export interface OperationPageProps {
  type: 'withdraw' | 'deposit'
}

export const OperationPage = (props: OperationPageProps) => {
  const { type } = props
  const { id } = useParams()
  const navigate = useNavigate()

  const account = useGetAccountQuery({ id: id! })
  const [withdraw, withdrawRes] = useWithdrawMutation()
  const [deposit, depositRes] = useDepositMutation()

  const onFinish = async (values: TransferFormValues) => {
    try {
      const convertedValues = convert(values)
      switch (type) {
        case 'deposit':
          await deposit(convertedValues).unwrap()
          break
        case 'withdraw':
          await withdraw(convertedValues).unwrap()
          break
        default:
          throw Error('Неизвестная операция')
      }
      toastSuccess('Запрос на операцию принят')
      navigate(AppRoutes.MAIN)
    } catch {
      toastError('Произошла ошибка')
    }
  }

  if (account.isError || account.data?.closedAt) {
    return (
      <ErrorMsg
        link={AppRoutes.ACCOUNTS}
        linkText='Перейти в меню счетов'
        text='Произошла ошибка при загрузке данных'
      />
    )
  }

  if (!account.isSuccess) {
    return <PageLoader />
  }

  return (
    <TransferForm
      isLoading={withdrawRes.isLoading || depositRes.isLoading}
      onFinish={onFinish}
      type={type}
      account={account.data!}
    />
  )
}
