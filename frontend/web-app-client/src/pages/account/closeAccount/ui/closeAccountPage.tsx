import { Center, PageHeader } from 'shared/ui'
import { CloseAccountForm } from 'features/account'

export const CloseAccountPage = () => {
  return (
    <Center>
      <PageHeader text='Закрыть счет' />
      <CloseAccountForm account={{ number: '21' }} onFinish={() => 0} />
    </Center>
  )
}
