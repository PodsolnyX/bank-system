import { Center, PageHeader } from 'shared/ui'
import { NewAccountForm } from 'features/account'

export const NewAccountPage = () => {
  return (
    <Center>
      <PageHeader text='Новый счет' />
      <NewAccountForm />
    </Center>
  )
}
