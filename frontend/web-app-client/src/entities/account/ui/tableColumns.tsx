import { Tag } from 'antd'
import { ColumnsType } from 'antd/lib/table'
import { getDropdownItemsDescr } from 'entities/account/config'
import { Account } from 'entities/account/model'
import { Dropdown } from 'entities/account/ui/dropdown'

export const columns: ColumnsType<Account> = [
  {
    title: 'Номер',
    dataIndex: 'number',
    key: 'number',
    sorter: (a, b) => a.number.localeCompare(b.number),
  },
  {
    title: 'Баланс (руб.)',
    dataIndex: 'balance',
    key: 'balance',
    sorter: (a, b) => a.balance - b.balance,
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
        text: 'Закрыт',
        value: true,
      },
      {
        text: 'Открыт',
        value: false,
      },
    ],
    onFilter: (value, record) => record.closed === value,
  },
  {
    title: 'Действие',
    dataIndex: '',
    render: (_, acc) => <Dropdown items={getDropdownItemsDescr(acc)} />,
    width: '15%',
    align: 'center',
  },
]
