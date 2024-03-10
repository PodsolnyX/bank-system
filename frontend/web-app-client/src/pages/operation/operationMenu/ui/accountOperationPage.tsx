import { Flex } from 'antd'
import { OperationType } from 'shared/entities'
import { Center, PageHeader } from 'shared/ui'
import { Transfer } from 'features'

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
