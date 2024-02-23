import { Tag } from 'antd'
import { TagProps } from 'antd/es/tag'
import { ColumnsType } from 'antd/lib/table'
import { Link } from 'react-router-dom'

import { getOperationName } from 'entities/operation/lib'
import { getAccountHistoryLink, getCreditLink } from 'shared/const'
import { Operation, OperationType } from 'shared/entities'

export const historyColumns: ColumnsType<Operation> = [
  {
    title: 'Дата',
    dataIndex: 'date',
    key: 'number',
    sorter: (a, b) => a.date.localeCompare(b.date),
  },
  {
    title: 'Тип',
    dataIndex: 'type',
    key: 'type',
    filters: [
      {
        text: getOperationName(OperationType.DEPOSIT),
        value: OperationType.DEPOSIT,
      },
      {
        text: getOperationName(OperationType.WITHDRAW),
        value: OperationType.WITHDRAW,
      },
      {
        text: getOperationName(OperationType.REPAYMENT),
        value: OperationType.REPAYMENT,
      },
    ],
    render: (_, op) => (
      <>
        <Tag color={getTagColor(op.type)}>{getOperationName(op.type)}</Tag>
        {op.type === OperationType.REPAYMENT && (
          <Link to={getCreditLink(op.credit?.id)}>{`Кредит #${op.credit?.number}`}</Link>
        )}
      </>
    ),
    onFilter: (value, acc) => acc.type === value,
  },
  {
    title: 'Сумма (руб.)',
    dataIndex: 'amount',
    key: 'amount',
    width: '10%',
    align: 'center',
    sorter: (a, b) => a.amount - b.amount,
  },
]

export const fullHistoryColumns: ColumnsType<Operation> = [
  {
    title: 'Счет',
    dataIndex: 'account',
    key: 'account',
    width: '15%',
    render: (acc) => <Link to={getAccountHistoryLink(acc.id)}>{acc.number}</Link>,
    sorter: (a, b) => a.date.localeCompare(b.date),
  },
  ...historyColumns,
]

const getTagColor = (type: OperationType): NonNullable<TagProps['color']> => {
  switch (type) {
    case OperationType.DEPOSIT:
      return 'green'
    case OperationType.WITHDRAW:
      return 'blue'
    case OperationType.REPAYMENT:
      return 'orange'
    default:
      return 'default'
  }
}
