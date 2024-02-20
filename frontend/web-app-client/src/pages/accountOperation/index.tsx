import { Center } from 'shared'
import { Transfer } from 'features'
import { OperationType } from 'entities/operation'
import { Flex } from 'antd'

export const AccountOperationPage = () => {
  return (
    <Center>
      <h1 className='mb-6'>Меню операций</h1>
      <Flex className='mb-6'>
        <Transfer type={OperationType.DEPOSIT} />
        <Transfer type={OperationType.WITHDRAW} />
      </Flex>
    </Center>
  )
}
