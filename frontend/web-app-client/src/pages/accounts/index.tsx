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
      id: '214213123',
      closed: true,
      number: '1234-1234-1234-1234',
    },
    {
      name: 'Другой счет',
      balance: 5000,
      id: '213251524123',
      closed: true,
      number: '1234-1234-1234-1234',
    },
    {
      name: 'Накопительный счет',
      balance: 13765,
      id: '213125521213',
      closed: true,
      number: '1234-1234-1234-1234',
    },
    {
      name: 'Другой счет',
      balance: 5000,
      id: '2153512215123',
      closed: true,
      number: '1234-1234-1234-1234',
    },
    {
      name: 'Накопительный счет',
      balance: 13765,
      id: '2131421512512123',
      closed: true,
      number: '1234-1234-1234-1234',
    },
    {
      name: 'Другой счет',
      balance: 5000,
      id: '21332125215123',
      closed: false,
      number: '1234-1234-1234-1234',
    },
    {
      name: 'Накопительный счет',
      balance: 13765,
      id: '2134225112123',
      closed: false,
      number: '1234-1234-1234-1234',
    },
    {
      name: 'Другой счет',
      balance: 5000,
      id: '223131232133',
      closed: false,
      number: '1234-1234-1234-1234',
    },
    {
      name: 'Накопительный счет',
      balance: 13765,
      id: '2135311321323',
      closed: false,
      number: '1234-1234-1234-1234',
    },
    {
      name: 'Другой счет',
      balance: 5000,
      id: '213212151123',
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
