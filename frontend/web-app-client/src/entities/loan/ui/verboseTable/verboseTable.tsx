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
      className='w-full md:w-2/3 border-[1px] border-slate-300 border-solid rounded-lg text-sm'
      columns={verboseLoanTableColumns}
      dataSource={operations}
      pagination={{ pageSize: 7 }}
      locale={{
        emptyText: isLoading ? <Skeleton active={true} /> : <Empty />,
      }}
    />
  )
}
