import { ColumnsType } from 'antd/lib/table'
import { Link } from 'react-router-dom'

import { getAccountHistoryLink } from 'shared/const'
import { Operation } from 'shared/entities'

export const verboseCreditTableColumns: ColumnsType<Operation> = [
  {
    title: 'Дата',
    dataIndex: 'date',
    key: 'date',
    sorter: (a, b) => a.date.localeCompare(b.date),
  },
  {
    title: 'Счет',
    dataIndex: 'account',
    key: 'account',
    render: (_, { account }) => (
      <Link to={getAccountHistoryLink(account.id)}>{account.number}</Link>
    ),
  },
  {
    title: 'Сумма (руб.)',
    dataIndex: 'amount',
    key: 'amount',
    sorter: (a, b) => a.amount - b.amount,
  },
]
