import { Tag } from 'antd'
import { TagProps } from 'antd/lib'
import { ColumnsType } from 'antd/lib/table'
import { getOperationCode, getOperationName } from 'entities/operation/lib'
import { Link } from 'react-router-dom'

import { getAccountHistoryLink } from 'shared/const'
import { Operation, OperationReason, OperationType } from 'shared/entities'
import { format } from 'shared/utils/format'

export const verboseLoanTableColumns: ColumnsType<Operation> = [
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
  },
  {
    title: 'Счет',
    dataIndex: 'accountId',
    key: 'accountId',
    render: (_, op) => (
      <Link to={getAccountHistoryLink(op.accountId)}>{op.accountId}</Link>
    ),
  },
  {
    title: 'Тип',
    dataIndex: 'type',
    key: 'type',
    filters: [
      {
        text: getOperationName(OperationType.DEPOSIT, OperationReason.LOAN),
        value: getOperationCode(OperationType.DEPOSIT, OperationReason.LOAN),
      },
      {
        text: getOperationName(OperationType.WITHDRAW, OperationReason.LOAN),
        value: getOperationCode(OperationType.WITHDRAW, OperationReason.LOAN),
      },
    ],
    render: (_, op) => (
      <Tag color={getTagColor(op.type, op.reason)}>
        {getOperationName(op.type, op.reason)}
      </Tag>
    ),
    onFilter: (value, acc) => getOperationCode(acc.type, acc.reason) === value,
    align: 'center',
  },
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
