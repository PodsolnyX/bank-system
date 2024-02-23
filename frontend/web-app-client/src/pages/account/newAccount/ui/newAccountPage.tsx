import { Center, PageHeader } from 'shared/ui'
import { useNewAccountMutation } from 'shared/api'
import { NewAccountForm, NewAccountFormData } from 'features/account'
import { useNavigate } from 'react-router-dom'
import { getAccountHistoryLink } from 'shared/const'
import { toast } from 'react-toastify'

export const NewAccountPage = () => {
  const [trigger, result] = useNewAccountMutation()
  const navigate = useNavigate()

  const onFinish = async (data: NewAccountFormData) => {
    try {
      const result = await trigger(data).unwrap()
      toast.success('Счет создан!')
      navigate(getAccountHistoryLink(result.id))
    }
    catch {
      toast.error('Ошибка при создании счета!')
    }
  }

  return (
    <Center>
      <PageHeader text='Новый счет' />
      <NewAccountForm isLoading={result.isLoading} onFinish={onFinish} />
    </Center>
  )
}
