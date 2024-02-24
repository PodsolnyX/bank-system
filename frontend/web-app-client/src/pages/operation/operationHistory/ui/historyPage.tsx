import { HistoryTable } from 'entities'
import { OperationType } from 'shared/entities'
import { Center, PageHeader } from 'shared/ui'

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
            accountId: '23',
          },
          {
            amount: 300,
            date: '2005.11.07',
            type: OperationType.WITHDRAW,
            id: '14',
            accountId: '234',
          },
          {
            amount: 400,
            date: '2006.11.08',
            type: OperationType.LOAN_CHARGE,
            id: '15',
            loadId: '312',
            accountId: '132',
          },
        ]}
      />
    </Center>
  )
}
