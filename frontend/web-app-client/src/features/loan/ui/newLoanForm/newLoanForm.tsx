import { useState } from 'react'
import { Alert, Button, InputNumber, Select } from 'antd'
import { AccountBookOutlined, CreditCardOutlined } from '@ant-design/icons'
import { Form, FormProps } from 'shared/ui'
import { Account } from 'entities/account'
import { Tariff } from 'entities/tariff'
import { RequestLoanReq } from '../../api'
import { moneyRules } from 'shared/lib'
import { format } from 'shared/lib/format'

export type NewLoanFormProps = {
  onFinish: (data: NewLoanFormData) => void
  tariffs: Tariff[]
  accounts: Account[]
} & Omit<FormProps, 'children'>

export type NewLoanFormData = RequestLoanReq

export const NewLoanForm = (props: NewLoanFormProps) => {
  const { onFinish, tariffs, accounts, ...rest } = props

  const [tariff, setTariff] = useState<string | null>(null)
  const [account, setAccount] = useState<string | null>(null)
  const tariffCurr = tariffs.find((t) => t.id === tariff)?.currencyTypes
  const accountCurr = accounts.find((a) => a.id === account)?.currencyType
  const isValid = !!(accountCurr && tariffCurr?.includes(accountCurr))

  const displayCurr = isValid ? accountCurr : '...'

  const visibleTariffs = tariffs
  const visibleAccounts = accounts.filter((acc) => !acc.closedAt)

  const onFinishWrap = (data: NewLoanFormData) => {
    if (isValid) {
      onFinish({
        ...data,
        currencyType: accountCurr,
      })
    }
  }

  return (
    <Form {...rest} onFinish={onFinishWrap} className='w-2/3 md:w-1/3'>
      <Form.Item
        label='Тариф'
        name='tariffId'
        rules={[{ required: true, message: 'Пожалуйста, выберите тариф!' }]}
      >
        <Select
          className='text-black'
          suffixIcon={<AccountBookOutlined />}
          placeholder='Тариф'
          value={tariff}
          onChange={(v) => setTariff(v)}
        >
          {visibleTariffs.map((t) => (
            <Select.Option
              key={t.id}
            >{`${t.name}, ${t.interestRate}%, ${t.periodInDays} дн, ${t.currencyTypes.join(', ')}`}</Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        name='accountId'
        label='На какой счет'
        rules={[{ required: true, message: 'Пожалуйста, укажите счет!' }]}
      >
        <Select
          className='text-black'
          suffixIcon={<CreditCardOutlined />}
          placeholder='Счет'
          value={account}
          onChange={(v) => setAccount(v)}
        >
          {visibleAccounts.map((acc) => (
            <Select.Option
              key={acc.id}
            >{`${acc.id}: ${format(acc.amount)} ${acc.currencyType}`}</Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item name='amount' label='Сумма' rules={moneyRules}>
        <InputNumber
          className='w-full'
          type='number'
          placeholder='Сумма'
          addonAfter={displayCurr}
          controls={false}
        />
      </Form.Item>
      {!isValid && (
        <Alert
          message='Счет и тариф должны совпадать по валютам'
          type='info'
          className='my-2'
        />
      )}

      <p className='text-red-500'></p>
      <Button className='float-right' type='primary' htmlType='submit'>
        Создать
      </Button>
    </Form>
  )
}
