import { Center, PageHeader } from 'shared'
import { NewAccountForm } from 'features/account'

export const NewAccountPage = () => {
  return (
    <Center>
      <PageHeader text='Новый счет' />
      <NewAccountForm />
    </Center>
  )
}
