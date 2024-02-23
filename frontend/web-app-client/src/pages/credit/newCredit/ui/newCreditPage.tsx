import { Center, PageHeader } from 'shared/ui'
import { NewCreditForm } from 'features/credit'

export const NewCreditPage = () => {
  return (
    <Center>
      <PageHeader text='Новый кредит' />
      <NewCreditForm />
    </Center>
  )
}
