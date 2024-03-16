import { Empty, Skeleton, Table } from 'antd'
import { Operation } from 'shared/entities'
import { verboseLoanTableColumns } from './verboseTableColumns'

export interface VerboseLoanTableProps {
  operations: Operation[]
  isLoading: boolean
}

export const VerboseLoanTable = (props: VerboseLoanTableProps) => {
  const { operations, isLoading } = props

  return (
    <Table
      rowKey={(record) => record.id}
      bordered
      className='w-full border-[1px] border-border border-solid rounded-lg text-sm'
      columns={verboseLoanTableColumns}
      dataSource={operations}
      pagination={{ pageSize: 7, showSizeChanger: false }}
      locale={{
        emptyText: isLoading ? <Skeleton active={true} /> : <Empty />,
      }}
    />
  )
}
