import { Button } from 'antd'
import { Link } from 'react-router-dom'
import { PlusCircleOutlined } from '@ant-design/icons'
import { AppRoutes, Center } from 'shared'
import { AccountsList } from 'entities/account'

export const AccountsPage = () => {
  const accounts = [
    { name: 'Накопительный счет', balance: 13765, id: '213123', closed: true },
    { name: 'Другой счет', balance: 5000, id: '2134123', closed: true },
    { name: 'Накопительный счет', balance: 13765, id: '213123', closed: true },
    { name: 'Другой счет', balance: 5000, id: '2153123', closed: true },
    { name: 'Накопительный счет', balance: 13765, id: '213142123', closed: true },
    { name: 'Другой счет', balance: 5000, id: '213321123' },
    { name: 'Накопительный счет', balance: 13765, id: '21342123' },
    { name: 'Другой счет', balance: 5000, id: '22313123' },
    { name: 'Накопительный счет', balance: 13765, id: '2131321323' },
    { name: 'Другой счет', balance: 5000, id: '213212123' },
  ]

  return (
    <Center>
      <h1 className='mb-1'>Список счетов</h1>
      <Link to={AppRoutes.ACCOUNT_NEW}>
        <Button className='mb-2' icon={<PlusCircleOutlined />}>
          Новый счет
        </Button>
      </Link>
      <AccountsList accounts={accounts} />
    </Center>
  )
}
