import { Tag } from 'antd'
import { Link } from 'react-router-dom'
import { ColumnsType } from 'antd/lib/table'
import { getAccountActions } from '../../config'
import { Account, CurrencyType } from 'shared/entities'
import { Dropdown } from 'shared/ui'
import { getAccountHistoryLink } from 'shared/const'
import { format } from 'shared/utils/format'

export const columns: ColumnsType<Account> = [
  {
    title: 'Номер',
    dataIndex: 'id',
    key: 'id',
    sorter: (a, b) => a.id.localeCompare(b.id),
    render: (id, acc) => <Link to={getAccountHistoryLink(acc.id)}>{id}</Link>,
  },
  {
    title: 'Баланс',
    dataIndex: 'amount',
    key: 'amount',
    sorter: (a, b) => a.amount - b.amount,
    responsive: ['md'],
    width: '15%',
    render: (_, acc) => `${format(acc.amount)} ${acc.currencyType}`,
    filters: Object.keys(CurrencyType).map((cur) => ({
      text: cur,
      value: cur,
    })),
    onFilter: (value, record) => record.currencyType === value,
  },
  {
    title: 'Статус',
    dataIndex: 'closedAt',
    key: 'closedAt',
    render: (closed) => (
      <Tag color={closed ? 'red' : 'blue'}>{closed ? 'Закрыт' : 'Открыт'}</Tag>
    ),
    width: '15%',
    align: 'center',
    filters: [
      {
        text: 'Показать закрытые',
        value: true,
      },
    ],
    onFilter: (_value, acc) => !!acc.closedAt === _value,
    defaultFilteredValue: [false],
  },
  {
    title: 'Действие',
    dataIndex: '',
    render: (_, acc) => <Dropdown items={getAccountActions(acc)} />,
    width: '10%',
    align: 'center',
  },
]
