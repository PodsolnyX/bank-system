import { Button, Input, InputNumber } from 'antd'
import { CreditCardOutlined } from '@ant-design/icons'

import { Center, Form } from 'shared/ui'
import { getTransferAssets } from 'features/transfer'
import { moneyRules } from 'shared/utils'
import { TransferFormProps } from './types'
import { OperationType } from 'shared/entities'

export const TransferForm = (props: TransferFormProps) => {
  const { type, account, onFinish, isLoading } = props
  const { title } = getTransferAssets(type)

  return (
    <Center>
      <h1>{title}</h1>
      <Form
        className='w-full md:w-1/3'
        onFinish={onFinish}
        initialValues={{
          AccountId: account.id,
        }}
        isLoading={isLoading}
      >
        <Form.Item label='Счет' name='AccountId'>
          <Input
            className='text-black'
            suffix={<CreditCardOutlined />}
            placeholder='Номер счета'
            readOnly
          />
        </Form.Item>

        <Form.Item
          label='Сумма'
          name='amount'
          rules={moneyRules.concat([
            {
              validator: (_rule, v) =>
                account.amount >= v || type === OperationType.DEPOSIT
                  ? Promise.resolve()
                  : Promise.reject('Недостаточно денег'),
            },
          ])}
        >
          <InputNumber
            className='w-full'
            placeholder='Введите число'
            addonAfter={account.currencyType}
          />
        </Form.Item>

        <Form.Item label='Сообщение' name='message'>
          <Input.TextArea
            showCount
            maxLength={255}
            placeholder='Введите сообщение (опционально)'
          />
        </Form.Item>

        <Button type='primary' className='float-right' htmlType='submit'>
          Подтвердить
        </Button>
      </Form>
    </Center>
  )
}
