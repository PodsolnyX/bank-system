import { ColumnsType } from 'antd/lib/table'
import { Link } from 'react-router-dom'

import { getAccountHistoryLink } from 'shared/const'
import { Operation } from 'shared/entities'

export const verboseLoanTableColumns: ColumnsType<Operation> = [
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
    render: (_, acc) => <Link to={getAccountHistoryLink(acc.id)}>{acc.id}</Link>,
  },
  {
    title: 'Сумма (руб.)',
    dataIndex: 'amount',
    key: 'amount',
    sorter: (a, b) => a.amount - b.amount,
  },
]
