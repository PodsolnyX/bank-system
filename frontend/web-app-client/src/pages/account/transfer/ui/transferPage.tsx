import { useNavigate, useParams } from 'react-router-dom'
import {
  TransferForm,
  TransferFormValues,
  TransferSelfReq,
  TransferUserReq,
  useTransferSelfMutation,
  useTransferUserMutation,
} from 'features/account'
import { useGetAccountQuery } from 'entities/account'
import { AppRoutes } from 'shared/config'
import { convert, toastError, toastSuccess } from 'shared/lib'
import { PageLoader } from 'shared/ui'
import { ErrorMsg } from 'shared/ui'

export interface TransferPageProps {
  type: 'self' | 'external'
}

export const TransferPage = (props: TransferPageProps) => {
  const { type } = props
  const { id } = useParams()
  const navigate = useNavigate()
  const [triggerTransferSelf] = useTransferSelfMutation()
  const [triggerTransferUser] = useTransferUserMutation()

  const onFinish = async (values: TransferFormValues) => {
    try {
      const formattedValues = convert(values)
      if (type === 'self') {
        await triggerTransferSelf(formattedValues as TransferSelfReq).unwrap()
      } else if (type === 'external') {
        await triggerTransferUser(formattedValues as TransferUserReq).unwrap()
      }
      toastSuccess('Запрос на операцию принят')
    } catch (e) {
      toastError('Произошла ошибка')
    } finally {
      navigate(AppRoutes.MAIN)
    }
  }

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

  if (account.isFetching) {
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
