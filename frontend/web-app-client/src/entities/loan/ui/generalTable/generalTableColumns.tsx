import { Tag } from 'antd'
import { ColumnsType } from 'antd/lib/table'
import { Link } from 'react-router-dom'

import { LoanInfo, getLoanActions } from 'entities/loan'
import { getAccountHistoryLink, getLoanLink } from 'shared/config'
import { CurrencyType } from 'shared/lib'
import { format } from 'shared/lib/format'
import { Dropdown } from 'shared/ui'
import { getPaymentDisplayInfo, getPaymentStatus, PaymentStatus } from '../payment'

export const generalLoanTableColumns: ColumnsType<LoanInfo> = [
  {
    title: 'Номер',
    dataIndex: 'id',
    key: 'id',
    sorter: (a, b) => a.loan.id.localeCompare(b.loan.id),
    render: (_, { loan: { id } }) => <Link to={getLoanLink(id)}>{id}</Link>,
  },
  {
    title: 'Счет',
    dataIndex: 'accountId',
    key: 'accountId',
    responsive: ['md'],
    render: (_, { loan: { accountId: id } }) => (
      <Link to={getAccountHistoryLink(id)}>{id}</Link>
    ),
  },
  {
    title: 'Долг',
    dataIndex: 'debt',
    key: 'debt',
    sorter: (a, b) => a.loan.debt - b.loan.debt,
    defaultSortOrder: 'descend',
    render: (_, rec) => `${format(rec.loan.debt)} ${rec.loan.currencyType}`,
    filters: Object.keys(CurrencyType).map((cur) => ({
      text: cur,
      value: cur,
    })),
    onFilter: (value, record) => record.loan.currencyType === value,
  },
  {
    title: 'Статус',
    key: 'needToPay',
    render: (_, { loan, payment }) => {
      const info = getPaymentDisplayInfo(loan, payment)
      return <Tag color={info.color}>{info.text}</Tag>
    },
    align: 'center',
    filters: [
      {
        text: 'Оплачен',
        value: PaymentStatus.Paid,
      },
      {
        text: 'Не оплачен',
        value: PaymentStatus.NotPaid,
      },
      {
        text: 'Ч / О',
        value: PaymentStatus.Partial,
      },
      {
        text: 'Закрыт',
        value: PaymentStatus.Closed,
      },
      {
        text: 'Новый',
        value: PaymentStatus.New,
      },
    ],
    onFilter: (value, { loan, payment }) => getPaymentStatus(loan, payment) === value,
    responsive: ['md'],
  },
  {
    title: 'Тариф',
    dataIndex: 'tariff',
    render: (_, { loan: { tariff: t } }) =>
      `${t.name}, ${t.interestRate}%, ${t.periodInDays} дн.`,
    responsive: ['md'],
  },
  {
    title: 'Действия',
    dataIndex: 'action',
    render: (_, { loan }) => <Dropdown items={getLoanActions(loan)} />,
    align: 'center',
    width: '10%',
  },
]
