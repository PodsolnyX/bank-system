import { Tag } from 'antd'
import { ColumnsType } from 'antd/lib/table'
import { Link } from 'react-router-dom'

import { Dropdown } from 'shared/ui'
import { CurrencyType, Loan } from 'shared/entities'
import { getAccountHistoryLink, getLoanLink } from 'shared/const'
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
    title: 'Счет',
    dataIndex: 'accountId',
    key: 'accountId',
    responsive: ['md'],
    render: (_, { accountId: id }) => <Link to={getAccountHistoryLink(id)}>{id}</Link>,
  },
  {
    title: 'Долг / сумма',
    dataIndex: 'debt',
    key: 'debt',
    sorter: (a, b) => a.debt - b.debt,
    defaultSortOrder: 'descend',
    render: (_, rec) => `${rec.debt} / ${rec.sum} ${rec.currencyType}`,
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
        {cr.lastChargeDate}
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
    responsive: ['md'],
  },
  {
    title: 'Тариф',
    dataIndex: 'tariff',
    render: (_, { tariff: t }) => `${t.name}, ${t.interestRate}, ${t.periodInDays}`,
    responsive: ['md'],
  },
  {
    title: 'Действия',
    dataIndex: 'action',
    render: (_, cr) => <Dropdown items={getLoanActions(cr)} />,
    align: 'center',
    width: '10%',
  },
]

const needToPay = (date: string | undefined) => {
  return !date || Date.now() - new Date(date).getMilliseconds() > 24 * 60 * 60 * 1000
}
