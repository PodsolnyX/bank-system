import { Button, Input, Select } from 'antd'
import { CreditCardOutlined, DollarOutlined } from '@ant-design/icons'

import { Center, Form } from 'shared/ui'
import { OperationType } from 'shared/entities'
import { getTransferAssets } from 'features/transfer/lib'

export interface TransferFormProps {
  type: OperationType
}

export const TransferForm = (props: TransferFormProps) => {
  const { type } = props
  const { title } = getTransferAssets(type)

  return (
    <Center>
      <h1>{title}</h1>
      <Form className='w-full md:w-1/3'>
        <Form.Item label='Счет' name='account'>
          <Select
            className='text-black'
            suffixIcon={<CreditCardOutlined />}
            placeholder='Номер счета'
          />
        </Form.Item>
        {type === OperationType.REPAYMENT && (
          <Form.Item label='Кредит' name='credit'>
            <Select
              className='text-black'
              suffixIcon={<CreditCardOutlined />}
              placeholder='Кредит'
            />
          </Form.Item>
        )}
        <Form.Item label='Сумма (руб.)' name='amount'>
          <Input
            type='number'
            min='10'
            max='99999999'
            suffix={<DollarOutlined />}
            placeholder='Введите число'
          />
        </Form.Item>
        <Button type='primary' className='float-right'>
          Подтвердить
        </Button>
      </Form>
    </Center>
  )
}
