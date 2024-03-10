import { ColumnsType } from 'antd/lib/table'
import { Link } from 'react-router-dom'
import { getLoanLink } from 'shared/const'

import { CurrencyType, Payment } from 'shared/entities'
import { format } from 'shared/utils/format'

const commonColumns: ColumnsType<Payment> = [
  {
    title: 'Выставлен',
    dataIndex: 'createdAt',
    key: 'createdAt',
    sorter: (a, b) => a.createdAt.localeCompare(b.createdAt),
    defaultSortOrder: 'descend',
    render: (_, rec) => (rec.createdAt ? new Date(rec.createdAt).toLocaleString() : '-'),
  },
  {
    title: 'Дата оплаты',
    dataIndex: 'paidAt',
    key: 'paidAt',
    render: (_, rec) => (rec.paidAt ? new Date(rec.paidAt).toLocaleString() : '-'),
    responsive: ['md'],
  },
  {
    title: 'Заплачено',
    dataIndex: 'alreadyPaid',
    key: 'alreadyPaid',
    render: (_, rec) => format(rec.alreadyPaid),
  },
  {
    title: 'Из',
    dataIndex: 'amountForPay',
    key: 'amountForPay',
    render: (_, rec) => format(rec.amountForPay),
    sorter: (a, b) => a.amountForPay - b.amountForPay,
  },
  {
    title: 'Пеня',
    dataIndex: 'penaltyFee',
    key: 'penaltyFee',
    render: (_, rec) => format(rec.penaltyFee),
    responsive: ['md'],
  },
  {
    title: 'Актуален',
    dataIndex: 'isActual',
    key: 'isActual',
    render: (_, rec) => (rec.isActual ? 'Да' : 'Нет'),
    filters: [
      {
        text: 'Показывать новые',
        value: true,
      },
      {
        text: 'Показывать старые',
        value: false,
      },
    ],
    onFilter: (value, rec) => rec.isActual === value,
    responsive: ['md'],
  },
]

export const PaymentsTableColumns: ColumnsType<Payment> = [
  ...commonColumns,
  {
    title: 'Валюта',
    dataIndex: 'currencyType',
    key: 'currencyType',
    width: '15%',
    render: (_, { loan }) => `${loan.currencyType}`,
  },
]

export const FullPaymentsTableColumns: ColumnsType<Payment> = [
  {
    title: 'Кредит',
    dataIndex: 'loanId',
    key: 'loanId',
    width: '15%',
    render: (_, { loan: { id } }) => <Link to={getLoanLink(id)}>{id}</Link>,
  },
  ...commonColumns,
  {
    title: 'Валюта',
    dataIndex: 'currencyType',
    key: 'currencyType',
    width: '15%',
    render: (_, { loan }) => `${loan.currencyType}`,
    filters: Object.keys(CurrencyType).map((cur) => ({
      text: cur,
      value: cur,
    })),
    onFilter: (value, { loan }) => loan.currencyType === value,
  },
]
