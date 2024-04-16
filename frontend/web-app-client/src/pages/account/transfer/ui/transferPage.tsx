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
import { useKey } from 'shared/api'
import { AppRoutes } from 'shared/config'
import { convert, toastError, toastSuccess } from 'shared/lib'
import { PageLoader, ErrorMsg } from 'shared/ui'
export interface TransferPageProps {
  type: 'self' | 'external'
}

export const TransferPage = (props: TransferPageProps) => {
  const { type } = props
  const { id } = useParams()
  const navigate = useNavigate()
  const [triggerTransferSelf, tsRes] = useTransferSelfMutation()
  const [triggerTransferUser, tuRes] = useTransferUserMutation()
  const self_key = useKey(tsRes.status)
  const user_key = useKey(tuRes.status)

  const onFinish = async (values: TransferFormValues) => {
    try {
      const formattedValues = convert(values)
      if (type === 'self') {
        const selfValues = formattedValues as unknown as TransferSelfReq
        await triggerTransferSelf({ ...selfValues, ...self_key }).unwrap()
      } else if (type === 'external') {
        const userValues = formattedValues as unknown as TransferUserReq
        await triggerTransferUser({ ...userValues, ...user_key }).unwrap()
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
