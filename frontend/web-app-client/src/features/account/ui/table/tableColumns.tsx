import { Tag } from 'antd'
import { ColumnsType } from 'antd/lib/table'
import { Link } from 'react-router-dom'
import { MakePriorityReq } from 'features/account/api'
import { Account } from 'entities/account'
import { ShowAccountReq } from 'entities/preferences'
import { getAccountHistoryLink } from 'shared/config'
import { CurrencyType } from 'shared/lib'
import { format } from 'shared/lib/format'
import { Dropdown } from 'shared/ui'
import { getAccountActions } from '../../config'

export const getAccountColumns = (
  show: (data: ShowAccountReq) => any,
  hide: (data: ShowAccountReq) => any,
  makePriority: (data: MakePriorityReq) => any
): ColumnsType<Account> => [
  {
    title: 'Номер',
    dataIndex: 'id',
    key: 'id',
    sorter: (a, b) => a.id.localeCompare(b.id),
    render: (id, acc) =>
      acc.isPriority ? (
        <Link to={getAccountHistoryLink(acc.id)}>{`${acc.id} (приоритетный)`}</Link>
      ) : (
        <Link to={getAccountHistoryLink(acc.id)}>{id}</Link>
      ),
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
    render: (closed, acc) => (
      <>
        <Tag color={closed ? 'red' : 'blue'}>{closed ? 'Закрыт' : 'Открыт'}</Tag>
        {acc.hidden && (
          <Tag className='mt-1' color='cyan'>
            Скрытый
          </Tag>
        )}
      </>
    ),
    width: '15%',
    align: 'center',
    filters: [
      {
        text: 'Показать скрытые',
        value: true,
      },
    ],
    onFilter: (_value, acc) => !!acc.hidden === _value,
    defaultFilteredValue: [false],
  },
  {
    title: 'Действие',
    dataIndex: '',
    render: (_, acc) => (
      <Dropdown items={getAccountActions(acc, show, hide, makePriority)} />
    ),
    width: '10%',
    align: 'center',
  },
]
