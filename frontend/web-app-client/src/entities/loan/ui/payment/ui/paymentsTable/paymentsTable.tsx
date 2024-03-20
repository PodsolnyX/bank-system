import { Empty, Skeleton, Table } from 'antd'
import { Payment } from '../../../../model'
import { FullPaymentsTableColumns, PaymentsTableColumns } from './paymentsTableColumns'

export interface PaymentsTableProps {
  payments: Payment[]
  isLoading: boolean
  full: boolean
}

export const PaymentsTable = (props: PaymentsTableProps) => {
  const { payments, full, isLoading } = props

  return (
    <Table
      rowKey={(record) => record.id}
      bordered
      className='w-full border-[1px] border-slate-300 border-solid rounded-lg text-sm'
      columns={full ? FullPaymentsTableColumns : PaymentsTableColumns}
      dataSource={payments}
      pagination={{ pageSize: 7, showSizeChanger: false }}
      locale={{
        emptyText: isLoading ? <Skeleton active={true} /> : <Empty />,
      }}
    />
  )
}
