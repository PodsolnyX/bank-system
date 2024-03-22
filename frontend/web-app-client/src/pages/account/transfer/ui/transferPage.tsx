import { useParams } from 'react-router-dom'
import { TransferForm } from 'features/account'
import { useGetAccountQuery } from 'entities/account'
import { useWithdrawMutation } from 'entities/account'
import { AppRoutes } from 'shared/config'
import { PageLoader } from 'shared/ui'
import { ErrorMsg } from 'shared/ui'

export interface TransferPageProps {
  type: 'self' | 'external'
}

export const TransferPage = (props: TransferPageProps) => {
  const { type } = props
  const { id } = useParams()
  const [triggerTransfer] = useWithdrawMutation()

  const onFinish = async () => {}

  const account = useGetAccountQuery({ id: id! })
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
      isLoading={account.isFetching}
      onFinish={onFinish}
      type={type}
      account={account.data!}
    />
  )
}
