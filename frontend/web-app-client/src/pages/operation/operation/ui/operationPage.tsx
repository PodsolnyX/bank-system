import { useNavigate, useParams } from 'react-router-dom'
import { TransferForm, TransferFormValues } from 'features/transfer'
import { useGetAccountQuery } from 'entities/account'
import { useDepositMutation, useWithdrawMutation } from 'entities/account'
import { OperationType } from 'entities/operation'
import { AppRoutes } from 'shared/config'
import { toastError, toastSuccess } from 'shared/lib'
import { convert } from 'shared/lib/format'
import { PageLoader } from 'shared/ui'
import { ErrorMsg } from 'shared/ui'

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
