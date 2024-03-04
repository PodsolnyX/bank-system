import { OperationType } from 'shared/entities'
import { TransferForm, TransferFormValues } from 'features/transfer'
import { useDepositMutation, useGetAccountQuery, useWithdrawMutation } from 'shared/api'
import { toastError, toastSuccess } from 'shared/toast'
import { useNavigate, useParams } from 'react-router-dom'
import { AppRoutes, getAccountHistoryLink } from 'shared/const'
import { PageLoader } from 'widgets'

export interface OperationPageProps {
  type: OperationType.WITHDRAW | OperationType.DEPOSIT
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
      switch (type) {
        case OperationType.DEPOSIT:
          await deposit(values).unwrap()
          break
        case OperationType.WITHDRAW:
          await withdraw(values).unwrap()
          break
        default:
          throw Error('Неизвестная операция')
      }
      toastSuccess('Запрос на операцию принят')
      navigate(getAccountHistoryLink(id))
    } catch {
      toastError('Произошла ошибка')
    }
  }

  if (account.isError) {
    toastError('Произошла ошибка')
    navigate(AppRoutes.ACCOUNTS)
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
