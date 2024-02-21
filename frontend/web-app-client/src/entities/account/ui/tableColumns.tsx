import { Tag } from 'antd'
import { Link } from 'react-router-dom'
import { ColumnsType } from 'antd/lib/table'
import { getDropdownItemsDescr } from 'entities/account/config'
import { Account } from 'entities/account/model'
import { Dropdown } from 'entities/account/ui/dropdown'
import { getAccountHistoryLink } from 'shared'

export const columns: ColumnsType<Account> = [
  {
    title: 'Номер',
    dataIndex: 'number',
    key: 'number',
    sorter: (a, b) => a.number.localeCompare(b.number),
    render: (number, acc) => <Link to={getAccountHistoryLink(acc.id)}>{number}</Link>,
  },
  {
    title: 'Баланс (руб.)',
    dataIndex: 'balance',
    key: 'balance',
    sorter: (a, b) => a.balance - b.balance,
    responsive: ['md'],
  },
  {
    title: 'Статус',
    dataIndex: 'closed',
    key: 'closed',
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
    onFilter: (value, acc) => acc.closed === value,
    defaultFilteredValue: [false],
  },
  {
    title: 'Действие',
    dataIndex: '',
    render: (_, acc) => <Dropdown items={getDropdownItemsDescr(acc)} />,
    width: '10%',
    align: 'center',
    responsive: ['md'],
  },
]
