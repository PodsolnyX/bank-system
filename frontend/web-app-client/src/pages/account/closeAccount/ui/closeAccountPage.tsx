import { Center, PageHeader } from 'shared'
import { CloseAccountForm } from 'features/account'

export const CloseAccountPage = () => {
  return (
    <Center>
      <PageHeader text='Закрыть счет' />
      <CloseAccountForm />
    </Center>
  )
}
