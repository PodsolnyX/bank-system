import { Center, PageHeader } from 'shared/ui'
import { CloseAccountForm } from 'features/account'
import { useCloseAccountMutation, useGetAccountQuery } from 'shared/api'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { AppRoutes } from 'shared/const'
import { PageLoader } from 'widgets'
import { useEffect } from 'react'

export const CloseAccountPage = () => {
  const id = useParams()['id']!
  const navigate = useNavigate()

  const { data, error, isLoading } = useGetAccountQuery({ id })
  const [trigger, result] = useCloseAccountMutation()

  useEffect(() => {
    if (error) {
      navigate(AppRoutes.ACCOUNTS)
    }
  }, [error, navigate])

  const onFinish = async () => {
    try {
      await trigger({ id }).unwrap()
      toast.success('Счет закрыт!')
      navigate(AppRoutes.ACCOUNTS)
    } catch {
      toast.error('Ошибка при закрытии счета!')
    }
  }

  if (isLoading || error) {
    return <PageLoader />
  }
  return (
    <Center>
      <PageHeader text='Закрыть счет' />
      <CloseAccountForm
        isLoading={result.isLoading}
        account={data!}
        onFinish={onFinish}
      />
    </Center>
  )
}
