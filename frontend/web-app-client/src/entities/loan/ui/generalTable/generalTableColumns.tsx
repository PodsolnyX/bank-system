import { Tag } from 'antd'
import { ColumnsType } from 'antd/lib/table'
import { Link } from 'react-router-dom'

import { Dropdown } from 'shared/ui'
import { CurrencyType, Loan } from 'shared/entities'
import { getLoanLink } from 'shared/const'
import { getLoanActions } from 'entities/loan'

export const generalLoanTableColumns: ColumnsType<Loan> = [
  {
    title: 'Номер',
    dataIndex: 'id',
    key: 'id',
    sorter: (a, b) => a.id.localeCompare(b.id),
    render: (_, { id }) => <Link to={getLoanLink(id)}>{id}</Link>,
  },
  {
    title: 'От',
    dataIndex: 'dateStart',
    key: 'dateStart',
    sorter: (a, b) => a.dateStart.localeCompare(b.dateStart),
    responsive: ['md'],
  },
  {
    title: 'До',
    dataIndex: 'dateEnd',
    key: 'dateEnd',
    sorter: (a, b) => a.dateEnd.localeCompare(b.dateEnd),
    responsive: ['md'],
  },
  {
    title: 'Сумма',
    key: 'fullAmount',
    sorter: (a, b) => a.sum - b.sum,
    responsive: ['md'],
    render: (_, rec) => `${rec.sum}${rec.currencyType}`,
  },
  {
    title: 'Долг',
    dataIndex: 'currentAmount',
    key: 'currentAmount',
    sorter: (a, b) => a.debt - b.debt,
    defaultSortOrder: 'descend',
    responsive: ['md'],
    render: (_, rec) => `${rec.debt}${rec.currencyType}`,
  },
  {
    title: 'Валюта',
    dataIndex: 'type',
    key: 'type',
    responsive: ['md'],
    filters: Object.keys(CurrencyType).map((cur) => ({
      text: cur,
      value: cur,
    })),
    onFilter: (value, record) => record.currencyType === value,
  },
  {
    title: 'Статус',
    key: 'needToPay',
    render: (_, cr) => (
      <Tag color={needToPay(cr.lastChargeDate) ? 'red' : 'green'}>
        {needToPay(cr.lastChargeDate) ? 'Не оплачен' : 'Оплачен'}
      </Tag>
    ),
    align: 'center',
    filters: [
      {
        text: 'Оплачен',
        value: false,
      },
      {
        text: 'Не оплачен',
        value: true,
      },
    ],
    onFilter: (value, cr) => needToPay(cr.lastChargeDate) === value,
  },
  {
    title: 'Срок',
  },
  {
    title: 'Действия',
    dataIndex: 'action',
    render: (_, cr) => <Dropdown items={getLoanActions(cr)} />,
    align: 'center',
  },
]

const needToPay = (date: string | undefined) => {
  return !date || Date.now() - new Date(date).getMilliseconds() > 24 * 60 * 60 * 1000
}
