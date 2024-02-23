import { HistoryTable, OperationType } from 'entities'
import { Center, PageHeader } from 'shared'

export const HistoryPage = () => {
  return (
    <Center>
      <PageHeader text='История операций' />
      <HistoryTable
        full
        history={[
          {
            amount: 350,
            date: '2005.11.06',
            type: OperationType.DEPOSIT,
            id: '13',
            account: { id: '1', number: '123-232-212' },
          },
          {
            amount: 300,
            date: '2005.11.07',
            type: OperationType.WITHDRAW,
            id: '14',
            account: { id: '1', number: '123-232-212' },
          },
          {
            amount: 400,
            date: '2006.11.08',
            type: OperationType.REPAYMENT,
            id: '15',
            credit: { id: '1', number: '1' },
            account: { id: '1', number: '123-232-212' },
          },
        ]}
      />
    </Center>
  )
}
