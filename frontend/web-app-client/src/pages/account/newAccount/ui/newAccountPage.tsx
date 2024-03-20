import { Center, PageHeader } from 'shared/ui'
import {
  NewAccountForm,
  NewAccountFormData,
  useNewAccountMutation,
} from 'features/account'
import { useNavigate } from 'react-router-dom'
import { getAccountHistoryLink } from 'shared/config'
import { toastError, toastSuccess } from 'shared/lib'

export const NewAccountPage = () => {
  const [trigger, result] = useNewAccountMutation()
  const navigate = useNavigate()

  const onFinish = async (data: NewAccountFormData) => {
    try {
      const result = await trigger(data).unwrap()
      toastSuccess('Счет создан!')
      navigate(getAccountHistoryLink(result.id))
    } catch {
      toastError('Ошибка при создании счета!')
    }
  }

  return (
    <Center>
      <PageHeader text='Открыть счет' />
      <NewAccountForm isLoading={result.isLoading} onFinish={onFinish} />
    </Center>
  )
}
