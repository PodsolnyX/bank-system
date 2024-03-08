import { OperationType } from 'shared/entities'
import { TransferForm, TransferFormValues } from 'features/transfer'
import { useDepositMutation, useGetAccountQuery, useWithdrawMutation } from 'shared/api'
import { toastError, toastSuccess } from 'shared/toast'
import { useNavigate, useParams } from 'react-router-dom'
import { AppRoutes } from 'shared/const'
import { PageLoader } from 'widgets'
import { ErrorMsg } from 'shared/ui'
import { convert } from 'shared/utils/format'

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
      const convertedValues = convert(values)
      switch (type) {
        case OperationType.DEPOSIT:
          await deposit(convertedValues).unwrap()
          break
        case OperationType.WITHDRAW:
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

  if (account.isError) {
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
