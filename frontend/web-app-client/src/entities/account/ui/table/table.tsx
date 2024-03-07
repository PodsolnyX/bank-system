import { Table, Skeleton, Empty } from 'antd'
import { Account } from 'shared/entities'
import { Center } from 'shared/ui'
import { columns } from './tableColumns'

export interface AccountsListProps {
  accounts: Account[]
  isLoading: boolean
}

export const AccountsTable = ({ accounts, isLoading }: AccountsListProps) => {
  return (
    <Center>
      <Table
        rowKey={(record) => record.id}
        bordered
        className='w-full md:w-2/3 border-[1px] border-slate-300 border-solid rounded-lg'
        columns={columns}
        dataSource={accounts}
        pagination={{ pageSize: 7, showSizeChanger: false }}
        locale={{
          emptyText: isLoading ? <Skeleton active={true} /> : <Empty />,
        }}
      />
    </Center>
  )
}
