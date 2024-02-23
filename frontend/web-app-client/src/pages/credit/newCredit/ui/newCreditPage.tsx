import { Center, PageHeader } from 'shared'
import { NewCreditForm } from 'features/credit'

export const NewCreditPage = () => {
  return (
    <Center>
      <PageHeader text='Новый кредит' />
      <NewCreditForm />
    </Center>
  )
}
