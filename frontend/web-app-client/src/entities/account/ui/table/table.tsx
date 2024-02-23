import { Table } from 'antd'
import { Account } from 'shared/entities'
import { Center } from 'shared/ui'
import { columns } from './tableColumns'

export interface AccountsListProps {
  accounts: Account[]
}

export const AccountsTable = ({ accounts }: AccountsListProps) => {
  return (
    <Center>
      <Table
        rowKey={(record) => record.id}
        bordered
        className='w-full md:w-2/3 border-[1px] border-slate-300 border-solid rounded-lg'
        columns={columns}
        dataSource={accounts}
        pagination={{ pageSize: 7 }}
      />
    </Center>
  )
}
