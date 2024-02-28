import { Table, Skeleton, Empty } from 'antd'
import { Operation } from 'shared/entities'
import { fullHistoryColumns, historyColumns } from './historyTableColumns'

export interface HistoryTableProps {
  isLoading: boolean
  history: Operation[]
  full?: boolean
}

export const HistoryTable = (props: HistoryTableProps) => {
  const { history, full, isLoading } = props
  return (
    <Table
      rowKey={(record) => record.id}
      bordered
      className='w-full md:w-2/3 border-[1px] border-slate-300 border-solid rounded-lg text-sm'
      columns={full ? fullHistoryColumns : historyColumns}
      dataSource={history}
      pagination={{ pageSize: 7 }}
      locale={{
        emptyText: isLoading ? <Skeleton active={true} /> : <Empty />,
      }}
    />
  )
}
