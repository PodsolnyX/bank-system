import { Center } from 'shared'
import { NewAccountForm } from 'features/account'

export const NewAccountPage = () => {
  return (
    <Center>
      <h1 className='mb-3'>Новый счет</h1>
      <NewAccountForm />
    </Center>
  )
}
