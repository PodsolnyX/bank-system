import { Center, PageHeader } from 'shared'
import { Transfer } from 'features'
import { OperationType } from 'entities/operation'
import { Flex } from 'antd'

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
