import { Table } from 'antd'
import { Credit } from 'shared/entities'
import { generalCreditTableColumns } from './generalTableColumns'

export interface GeneralCreditTableProps {
  credits: Credit[]
}

export const GeneralCreditTable = (props: GeneralCreditTableProps) => {
  const { credits } = props

  return (
    <Table
      rowKey={(record) => record.id}
      bordered
      className='w-full md:w-2/3 border-[1px] border-slate-300 border-solid rounded-lg text-sm'
      columns={generalCreditTableColumns}
      dataSource={credits}
      pagination={{ pageSize: 7 }}
    />
  )
}
