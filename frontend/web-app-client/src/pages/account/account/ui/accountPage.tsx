import { HistoryTable } from 'entities'
import { Center, PageHeader, Property } from 'shared/ui'
import { Account, OperationType } from 'shared/entities'

export const AccountPage = () => {
  const account: Account = {
    balance: 3132,
    closed: false,
    number: '1234-5678-9087',
    id: '3',
  }

  return (
    <Center>
      <PageHeader text='Страница счета' />
      <Property name='Номер счета' value={account.number} />
      <Property name='Текущая сумма' value={account.balance} />
      <Property name='Статус счета' value={account.closed ? 'Закрыт' : 'Открыт'} />
      <HistoryTable
        history={[
          { amount: 350, date: '2005.11.06', type: OperationType.DEPOSIT, id: '13' },
          { amount: 300, date: '2005.11.07', type: OperationType.WITHDRAW, id: '14' },
          {
            amount: 400,
            date: '2006.11.08',
            type: OperationType.REPAYMENT,
            id: '15',
            credit: { id: '1', number: '1' },
          },
        ]}
      />
    </Center>
  )
}
