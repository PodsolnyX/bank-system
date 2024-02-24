import { Button } from 'antd'
import { Link } from 'react-router-dom'
import { PlusCircleOutlined } from '@ant-design/icons'
import { Center, PageHeader } from 'shared/ui'
import { AppRoutes } from 'shared/const'
import { AccountsTable } from 'entities/account'
import { Account } from 'shared/entities'
import { CurrencyType } from 'shared/entities/currency'

export const AccountsPage = () => {
  const accounts: Account[] = [
    {
      amount: 0,
      id: '1214213123',
      closedAt: '10.01.2000',
      type: CurrencyType.RUB,
      user: '12',
    },
    {
      amount: 0,
      id: '214213123',
      type: CurrencyType.EUR,
      user: '12',
    },
  ]

  return (
    <Center>
      <PageHeader text='Список счетов' />
      <Link to={AppRoutes.ACCOUNT_NEW}>
        <Button className='mb-2' icon={<PlusCircleOutlined />}>
          Новый счет
        </Button>
      </Link>
      <AccountsTable accounts={accounts} />
    </Center>
  )
}
