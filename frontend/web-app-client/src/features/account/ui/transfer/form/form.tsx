import { CreditCardOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Input, InputNumber, Select } from 'antd'

import { useState } from 'react'
import { useGetAccountsQuery } from 'entities/account'
import { format, moneyRules } from 'shared/lib'
import { Center, Form } from 'shared/ui'
import { TransferFormProps } from './types'

export const TransferForm = (props: TransferFormProps) => {
  const { type, account, onFinish, isLoading } = props
  const [chosenAcc, setChosenAcc] = useState<string | null>(null)
  const accounts = useGetAccountsQuery(
    {},
    {
      skip: type === 'external',
    }
  )
  const validAccounts = accounts.data?.filter(
    (acc) => acc.id !== account.id && !acc.hidden && !acc.closedAt
  )

  return (
    <Center>
      <h1>Перевод</h1>
      <Form
        className='w-full md:w-1/3'
        onFinish={onFinish}
        initialValues={{
          accountId: account.id,
        }}
        isLoading={isLoading}
      >
        <Form.Item label='Со счета' name='accountId'>
          <Input
            className='text-black'
            suffix={<CreditCardOutlined />}
            placeholder='Номер счета'
            readOnly
          />
        </Form.Item>
        {type === 'external' ? (
          <Form.Item label='ID клиента' name='clientId'>
            <Input
              className='text-black'
              suffix={<UserOutlined />}
              placeholder='ID клиента'
            />
          </Form.Item>
        ) : (
          <Form.Item
            label='Счет'
            name='toAccountId'
            rules={[{ required: true, message: 'Пожалуйста, укажите счет' }]}
          >
            <Select
              className='text-black'
              suffixIcon={<CreditCardOutlined />}
              placeholder='Номер счета'
              onChange={(v) => setChosenAcc(v)}
              value={chosenAcc}
            >
              {validAccounts?.map((acc) => (
                <Select.Option
                  key={acc.id}
                >{`${acc.id}: ${format(acc.amount)} ${acc.currencyType}`}</Select.Option>
              ))}
            </Select>
          </Form.Item>
        )}

        <Form.Item
          label='Сумма'
          name='amount'
          rules={moneyRules.concat([
            {
              validator: (_rule, v) =>
                account.amount >= v * 100
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
