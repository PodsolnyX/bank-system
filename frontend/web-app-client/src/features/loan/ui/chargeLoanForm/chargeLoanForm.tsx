import { Select, InputNumber, Button, Input } from 'antd'
import { CreditCardOutlined, WalletOutlined } from '@ant-design/icons'
import { Center, ErrorMsg, Form } from 'shared/ui'
import { moneyRules } from 'shared/utils'
import { ChargeLoanFormProps } from './types'
import { useMemo, useState } from 'react'
import { AppRoutes } from 'shared/const'
import { Link } from 'react-router-dom'
import { format } from 'shared/utils/format'
import { PageLoader } from 'shared/ui'

export const ChargeLoanForm = (props: ChargeLoanFormProps) => {
  const { loan, accounts, isLoading, onFinish, ...rest } = props
  const validAccounts = useMemo(() => {
    return accounts.filter(
      (acc) => !acc.closedAt && acc.currencyType === loan.currencyType
    )
  }, [accounts, loan.currencyType])

  const [chosenAcc, setChosenAcc] = useState<string | null>(null)

  if (isLoading) {
    return <PageLoader />
  }

  if (loan.debt <= 0) {
    return (
      <ErrorMsg
        link={AppRoutes.MAIN}
        linkText='Перейти в меню'
        text='Произошла ошибка при загрузке данных'
      />
    )
  }
  if (!validAccounts.length) {
    return (
      <Center>
        <h1>Нет подходящих счетов для погашения кредита</h1>
        <Link to={AppRoutes.ACCOUNTS}>В меню счетов</Link>
      </Center>
    )
  }
  return (
    <Center>
      <h1>Погасить кредит</h1>
      <Form
        className='w-full md:w-1/3'
        {...rest}
        onFinish={(v) =>
          onFinish({
            ...v,
            currencyType: loan.currencyType,
          })
        }
        initialValues={{ loanId: loan.id }}
      >
        <Form.Item label='Кредит' name='loanId' rules={[{ required: true }]}>
          <Input
            className='text-black'
            suffix={<WalletOutlined />}
            placeholder='Кредит'
            readOnly
          />
        </Form.Item>
        <Form.Item
          label='Счет'
          name='accountId'
          rules={[{ required: true, message: 'Пожалуйста, укажите счет' }]}
        >
          <Select
            className='text-black'
            suffixIcon={<CreditCardOutlined />}
            placeholder='Номер счета'
            onChange={(v) => setChosenAcc(v)}
            value={chosenAcc}
          >
            {validAccounts.map((acc) => (
              <Select.Option
                key={acc.id}
              >{`${acc.id}: ${format(acc.amount)} ${acc.currencyType}`}</Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label='Сумма'
          name='amount'
          rules={moneyRules.concat([
            {
              validator: (_rule, v) =>
                loan.debt >= v * 100
                  ? Promise.resolve()
                  : Promise.reject('Слишком большая сумма'),
            },
            {
              validator: (_rule, v) => {
                const account = accounts.find((acc) => acc.id === chosenAcc)
                if (!account) return Promise.reject('Ошибка')
                if (account.amount < v * 100)
                  return Promise.reject('Недостаточно средств')
                return Promise.resolve()
              },
            },
          ])}
        >
          <InputNumber
            className='w-full'
            placeholder='Введите число'
            addonAfter={loan.currencyType}
          />
        </Form.Item>
        <Button type='primary' className='float-right' htmlType='submit'>
          Подтвердить
        </Button>
      </Form>
    </Center>
  )
}
