import { Table } from 'antd'
import { Credit } from 'entities'
import { creditTableColumns } from 'entities/credit/ui/tableColumns'

export interface CreditTableProps {
  credits: Credit[]
}

export const CreditTable = (props: CreditTableProps) => {
  const { credits } = props

  return (
    <Table
      rowKey={(record) => record.id}
      bordered
      className='w-full md:w-2/3 border-[1px] border-slate-300 border-solid rounded-lg text-sm'
      columns={creditTableColumns}
      dataSource={credits}
      pagination={{ pageSize: 7 }}
    />
  )
}
