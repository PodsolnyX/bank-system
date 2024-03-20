import { Flex } from 'antd'
import { Transfer } from 'features/transfer'
import { OperationType } from 'entities/operation'
import { Center, PageHeader } from 'shared/ui'

export const AccountOperationPage = () => {
  return (
    <Center>
      <PageHeader text='Меню операций' />
      <Flex wrap={'wrap'} justify='center' align='center' className='mb-6'>
        <Transfer type={OperationType.DEPOSIT} />
        <Transfer type={OperationType.WITHDRAW} />
      </Flex>
    </Center>
  )
}
