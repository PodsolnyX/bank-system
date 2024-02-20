import { Button } from 'antd'
import { Link } from 'react-router-dom'
import { PlusCircleOutlined } from '@ant-design/icons'
import { AppRoutes, Center } from 'shared'
import { AccountsTable } from 'entities/account'

export const AccountsPage = () => {
  const accounts = [
    {
      name: 'Накопительный счет',
      balance: 13765,
      id: '213123',
      closed: true,
      number: '1234-1234-1234-1234',
    },
    {
      name: 'Другой счет',
      balance: 5000,
      id: '2134123',
      closed: true,
      number: '1234-1234-1234-1234',
    },
    {
      name: 'Накопительный счет',
      balance: 13765,
      id: '213123',
      closed: true,
      number: '1234-1234-1234-1234',
    },
    {
      name: 'Другой счет',
      balance: 5000,
      id: '2153123',
      closed: true,
      number: '1234-1234-1234-1234',
    },
    {
      name: 'Накопительный счет',
      balance: 13765,
      id: '213142123',
      closed: true,
      number: '1234-1234-1234-1234',
    },
    {
      name: 'Другой счет',
      balance: 5000,
      id: '213321123',
      closed: false,
      number: '1234-1234-1234-1234',
    },
    {
      name: 'Накопительный счет',
      balance: 13765,
      id: '21342123',
      closed: false,
      number: '1234-1234-1234-1234',
    },
    {
      name: 'Другой счет',
      balance: 5000,
      id: '22313123',
      closed: false,
      number: '1234-1234-1234-1234',
    },
    {
      name: 'Накопительный счет',
      balance: 13765,
      id: '2131321323',
      closed: false,
      number: '1234-1234-1234-1234',
    },
    {
      name: 'Другой счет',
      balance: 5000,
      id: '213212123',
      closed: false,
      number: '5234-1234-1234-1234',
    },
  ]

  return (
    <Center>
      <h1 className='mb-1'>Список счетов</h1>
      <Link to={AppRoutes.ACCOUNT_NEW}>
        <Button className='mb-2' icon={<PlusCircleOutlined />}>
          Новый счет
        </Button>
      </Link>
      <AccountsTable accounts={accounts} />
    </Center>
  )
}
