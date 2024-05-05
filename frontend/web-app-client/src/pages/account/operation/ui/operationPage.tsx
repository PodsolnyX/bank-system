import { useNavigate, useParams } from 'react-router-dom'
import {
  TransferForm,
  TransferFormValues,
  useDepositMutation,
  useWithdrawMutation,
} from 'features/account'
import { useGetAccountQuery } from 'entities/account'
import { useKey } from 'shared/api'
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
  const withdraw_key = useKey(withdrawRes.status)
  const deposit_key = useKey(depositRes.status)

  const onFinish = async (values: TransferFormValues) => {
    try {
      const convertedValues = convert(values)
      switch (type) {
        case 'deposit':
          await deposit({ ...convertedValues, ...deposit_key }).unwrap()
          break
        case 'withdraw':
          await withdraw({ ...convertedValues, ...withdraw_key }).unwrap()
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
