import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { CloseAccountForm, useCloseAccountMutation } from 'features/account'
import { useGetAccountQuery } from 'entities/account'
import { AppRoutes } from 'shared/config'
import { toastError, toastSuccess } from 'shared/lib'
import { PageLoader } from 'shared/ui'
import { Center, PageHeader } from 'shared/ui'

export const CloseAccountPage = () => {
  const id = useParams()['id']!
  const navigate = useNavigate()

  const { data, error, isFetching } = useGetAccountQuery({ id })
  const [trigger, result] = useCloseAccountMutation()

  useEffect(() => {
    if (error || data?.closedAt || (data && data.amount > 0)) {
      toastError('Ошибка!')
      navigate(AppRoutes.ACCOUNTS)
    }
  }, [error, data, navigate])

  const onFinish = async () => {
    try {
      await trigger({ accountId: id }).unwrap()
      toastSuccess('Счет закрыт!')
      navigate(AppRoutes.ACCOUNTS)
    } catch {
      toastError('Ошибка при закрытии счета!')
    }
  }

  if (isFetching || error) {
    return <PageLoader />
  }
  return (
    <Center>
      <PageHeader text='Закрыть счет' />
      <CloseAccountForm
        account={data!.id}
        isLoading={result.isLoading}
        onFinish={onFinish}
      />
    </Center>
  )
}
