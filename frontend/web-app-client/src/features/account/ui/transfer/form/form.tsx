import { CreditCardOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Input, InputNumber, Select } from 'antd'

import { useState } from 'react'
import { useGetAccountsQuery } from 'entities/account'
import { AppRoutes } from 'shared/config'
import { format, moneyRules } from 'shared/lib'
import { Center, ErrorMsg, Form } from 'shared/ui'
import { TransferFormProps, TransferFormValues } from './types'

export const TransferForm = (props: TransferFormProps) => {
  const [disabled, setDisabled] = useState(false)
  const { type, account, onFinish, isLoading } = props

  const wrappedOnFinish = async (values: TransferFormValues) => {
    try {
      setDisabled(true)
      await onFinish(values)
      setDisabled(false)
    } catch {
      setDisabled(false)
    }
  }

  const [chosenAcc, setChosenAcc] = useState<string | null>(null)
  const mono = type === 'deposit' || type === 'withdraw'
  const bi = !mono
  const accounts = useGetAccountsQuery(
    {},
    {
      skip: mono,
    }
  )
  const validAccounts = accounts.data?.filter(
    (acc) => acc.id !== account.id && !acc.hidden && !acc.closedAt
  )

  const isFetching = isLoading || accounts.isFetching

  if (accounts.isSuccess && type === 'self' && !validAccounts?.length) {
    return (
      <ErrorMsg
        link={AppRoutes.ACCOUNT_NEW}
        linkText='Создать счет'
        text='Нет подходящих счетов'
      />
    )
  }

  return (
    <Center>
      <h1>{bi ? 'Перевод' : type === 'withdraw' ? 'Снятие' : 'Пополнение'}</h1>
      <Form
        className='w-full md:w-1/3'
        onFinish={wrappedOnFinish}
        initialValues={{
          accountId: account.id,
          fromAccountId: account.id,
        }}
        isLoading={isFetching}
      >
        {mono && (
          <Form.Item label='Счет' name='accountId'>
            <Input
              className='text-black'
              suffix={<CreditCardOutlined />}
              placeholder='Номер счета'
              readOnly
            />
          </Form.Item>
        )}
        {bi && (
          <Form.Item label='Со счета' name='fromAccountId'>
            <Input
              className='text-black'
              suffix={<CreditCardOutlined />}
              placeholder='Номер счета'
              readOnly
            />
          </Form.Item>
        )}
        {type === 'external' && (
          <Form.Item label='ID клиента' name='userId'>
            <Input
              className='text-black'
              suffix={<UserOutlined />}
              placeholder='ID клиента'
            />
          </Form.Item>
        )}
        {type === 'self' && (
          <Form.Item
            label='На счет'
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
                account.amount >= v * 100 || type === 'deposit'
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

        {mono && (
          <Form.Item label='Сообщение' name='message'>
            <Input.TextArea
              showCount
              maxLength={255}
              placeholder='Введите сообщение (опционально)'
            />
          </Form.Item>
        )}

        <Button
          type='primary'
          className='float-right'
          htmlType='submit'
          disabled={disabled}
        >
          Подтвердить
        </Button>
      </Form>
    </Center>
  )
}
