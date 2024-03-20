import { Tag } from 'antd'
import { TagProps } from 'antd/es/tag'
import { ColumnsType } from 'antd/lib/table'
import { Link } from 'react-router-dom'

import { getAccountHistoryLink, getLoanLink } from 'shared/config'
import { CurrencyType } from 'shared/lib'
import { format } from 'shared/lib/format'
import { getOperationCode, getOperationName, getOperationStatusName } from '../../lib'
import { Operation, OperationReason, OperationStatus, OperationType } from '../../model'

const commonColumns: ColumnsType<Operation> = [
  {
    title: 'Дата',
    dataIndex: 'createdAt',
    key: 'createdAt',
    sorter: (a, b) => {
      if (a.createdAt && b.createdAt) {
        return a.createdAt.localeCompare(b.createdAt)
      }
      return 0
    },
    render: (_, rec) => (rec.createdAt ? new Date(rec.createdAt).toLocaleString() : '-'),
  },
  {
    title: 'Код',
    dataIndex: 'id',
    key: 'id',
    responsive: ['md'],
  },
  {
    title: 'Статус',
    dataIndex: 'status',
    key: 'status',
    render: (_rec, { status }) => getOperationStatusName(status),
    responsive: ['md'],
    align: 'center',
    filters: [
      {
        text: getOperationStatusName(OperationStatus.SUCCESS),
        value: OperationStatus.SUCCESS,
      },
      {
        text: getOperationStatusName(OperationStatus.PROCESSING),
        value: OperationStatus.PROCESSING,
      },
      {
        text: getOperationStatusName(OperationStatus.FAILURE),
        value: OperationStatus.FAILURE,
      },
    ],
    onFilter: (value, op) => op.status === value,
  },
  {
    title: 'Тип',
    dataIndex: 'type',
    key: 'type',
    filters: [
      {
        text: getOperationName(OperationType.DEPOSIT, OperationReason.CASH),
        value: getOperationCode(OperationType.DEPOSIT, OperationReason.CASH),
      },
      {
        text: getOperationName(OperationType.DEPOSIT, OperationReason.LOAN),
        value: getOperationCode(OperationType.DEPOSIT, OperationReason.LOAN),
      },
      {
        text: getOperationName(OperationType.WITHDRAW, OperationReason.CASH),
        value: getOperationCode(OperationType.WITHDRAW, OperationReason.CASH),
      },
      {
        text: getOperationName(OperationType.WITHDRAW, OperationReason.LOAN),
        value: getOperationCode(OperationType.WITHDRAW, OperationReason.LOAN),
      },
    ],
    render: (_, op) => (
      <>
        <Tag color={getTagColor(op.type, op.reason)}>
          {getOperationName(op.type, op.reason)}
        </Tag>
        {op.loanId && <Link to={getLoanLink(op.loanId)}>{`Кредит ${op.loanId}`}</Link>}
      </>
    ),
    onFilter: (value, acc) => getOperationCode(acc.type, acc.reason) === value,
    align: 'center',
  },
  {
    title: `Примечание`,
    dataIndex: 'message',
    key: 'message',
    render: (msg) => msg || '-',
    className: 'wrap break-all',
    responsive: ['md'],
  },
]

export const historyColumns: ColumnsType<Operation> = [
  ...commonColumns,
  {
    title: `Сумма`,
    dataIndex: 'amount',
    key: 'amount',
    width: '10%',
    align: 'center',
    sorter: (a, b) => a.amount - b.amount,
    render: (_, rec) => `${format(rec.amount)} ${rec.currencyType}`,
  },
]

export const fullHistoryColumns: ColumnsType<Operation> = [
  {
    title: 'Счет',
    dataIndex: 'accountId',
    key: 'accountId',
    width: '15%',
    render: (_, { accountId }) => (
      <Link to={getAccountHistoryLink(accountId)}>{accountId}</Link>
    ),
  },
  ...commonColumns,
  {
    title: `Сумма`,
    dataIndex: 'amount',
    key: 'amount',
    width: '10%',
    align: 'center',
    sorter: (a, b) => a.amount - b.amount,
    render: (_, rec) => `${format(rec.amount)} ${rec.currencyType}`,
    filters: Object.keys(CurrencyType).map((cur) => ({
      text: cur,
      value: cur,
    })),
    onFilter: (value, record) => record.currencyType === value,
  },
]

const getTagColor = (
  type: OperationType,
  reason: OperationReason
): NonNullable<TagProps['color']> => {
  const names = {
    [OperationType.DEPOSIT]: {
      [OperationReason.CASH]: 'green',
      [OperationReason.LOAN]: 'blue',
    },
    [OperationType.WITHDRAW]: {
      [OperationReason.CASH]: 'red',
      [OperationReason.LOAN]: 'orange',
    },
  }
  return names[type][reason]
}
