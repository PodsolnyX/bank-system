import { Table } from 'antd'
import { Operation } from 'entities'
import {
  fullHistoryColumns,
  historyColumns,
} from './historyTableColumns'

export interface HistoryTableProps {
  history: Operation[]
  full?: boolean
}

export const HistoryTable = (props: HistoryTableProps) => {
  const { history, full } = props
  return (
    <Table
      rowKey={(record) => record.id}
      bordered
      className='w-full md:w-2/3 border-[1px] border-slate-300 border-solid rounded-lg text-sm'
      columns={full ? fullHistoryColumns : historyColumns}
      dataSource={history}
      pagination={{ pageSize: 7 }}
    />
  )
}
