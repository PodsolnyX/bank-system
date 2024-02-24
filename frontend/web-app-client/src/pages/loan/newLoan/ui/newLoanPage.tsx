import { Center, PageHeader } from 'shared/ui'
import { NewLoanForm } from 'features/loan'

export const NewLoanPage = () => {
  return (
    <Center>
      <PageHeader text='Новый кредит' />
      <NewLoanForm />
    </Center>
  )
}
