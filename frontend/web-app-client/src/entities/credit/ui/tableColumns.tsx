import { Tag } from 'antd'
import { ColumnsType } from 'antd/lib/table'
import { Link } from 'react-router-dom'

import { getCreditLink, Dropdown } from 'shared'
import { Credit } from 'entities/credit/model'
import { getDropdownItemsDescr } from 'entities/credit/config'

export const creditTableColumns: ColumnsType<Credit> = [
  {
    title: 'Номер',
    dataIndex: 'number',
    key: 'number',
    sorter: (a, b) => a.number.localeCompare(b.number),
    render: (_, { id, number }) => <Link to={getCreditLink(id)}>{number}</Link>,
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
    title: 'Сумма (руб.)',
    dataIndex: 'fullAmount',
    key: 'fullAmount',
    sorter: (a, b) => a.fullAmount - b.fullAmount,
    responsive: ['md'],
  },
  {
    title: 'Долг (руб.)',
    dataIndex: 'currentAmount',
    key: 'currentAmount',
    sorter: (a, b) => a.currentAmount - b.currentAmount,
    defaultSortOrder: 'descend',
    responsive: ['md'],
  },
  {
    title: 'Пеня (руб.)',
    dataIndex: 'fine',
    key: 'fine',
    sorter: (a, b) => a.fine - b.fine,
    responsive: ['md'],
  },
  {
    title: 'Статус',
    dataIndex: 'needToPay',
    key: 'needToPay',
    render: (_, cr) => (
      <Tag color={cr.needToPay ? 'red' : 'green'}>
        {cr.needToPay ? 'Не оплачен' : 'Оплачен'}
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
    onFilter: (value, cr) => cr.needToPay === value,
  },
  {
    title: 'Действия',
    dataIndex: 'action',
    render: (_, cr) => <Dropdown items={getDropdownItemsDescr(cr)} />,
    align: 'center',
  },
]
