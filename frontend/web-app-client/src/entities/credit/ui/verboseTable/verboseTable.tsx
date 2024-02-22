import { Table } from 'antd'
import { Operation } from 'entities'
import { verboseCreditTableColumns } from './verboseTableColumns'

export interface VerboseCreditTableProps {
  operations: Operation[]
}

export const VerboseCreditTable = (props: VerboseCreditTableProps) => {
  const { operations } = props

  return (
    <Table
      rowKey={(record) => record.id}
      bordered
      className='w-full md:w-2/3 border-[1px] border-slate-300 border-solid rounded-lg text-sm'
      columns={verboseCreditTableColumns}
      dataSource={operations}
      pagination={{ pageSize: 7 }}
    />
  )
}
