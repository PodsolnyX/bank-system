import { Table } from 'antd'
import { Loan } from 'shared/entities'
import { generalLoanTableColumns } from './generalTableColumns'

export interface GeneralLoanTableProps {
  loans: Loan[]
}

export const GeneralLoanTable = (props: GeneralLoanTableProps) => {
  const { loans } = props

  return (
    <Table
      rowKey={(record) => record.id}
      bordered
      className='w-full md:w-2/3 border-[1px] border-slate-300 border-solid rounded-lg text-sm'
      columns={generalLoanTableColumns}
      dataSource={loans}
      pagination={{ pageSize: 7 }}
    />
  )
}
