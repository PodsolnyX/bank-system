import { Center } from 'shared'
import { NewCreditForm } from 'features/credit'

export const NewCreditPage = () => {
  return (
    <Center>
      <h1 className='mb-3'>Новый кредит</h1>
      <NewCreditForm />
    </Center>
  )
}
