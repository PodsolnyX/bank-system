import { CreditCardOutlined } from '@ant-design/icons'
import { Button, Input, InputNumber } from 'antd'

import { OperationType } from 'entities/operation'
import { moneyRules } from 'shared/lib'
import { Center, Form } from 'shared/ui'
import { getTransferAssets } from '../../../lib'
import { TransferFormProps } from './types'

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
          accountId: account.id,
        }}
        isLoading={isLoading}
      >
        <Form.Item label='Счет' name='accountId'>
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
                account.amount >= v * 100 || type === OperationType.DEPOSIT
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
