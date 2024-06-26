import { Table, Skeleton, Empty } from 'antd'
import { Operation } from '../../model'
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
      className='w-full md:w-2/3 mt-2 border-[1px] border-border border-solid rounded-lg text-sm'
      columns={full ? fullHistoryColumns : historyColumns}
      dataSource={history}
      pagination={{ pageSize: 7, showSizeChanger: false }}
      locale={{
        emptyText: isLoading ? <Skeleton active={true} /> : <Empty />,
      }}
    />
  )
}
