import { Table, Skeleton, Empty } from 'antd'
import { useEffect, useState } from 'react'
import {
  HideAccountReq,
  ShowAccountReq,
  useHideAccountMutation,
  useShowAccountMutation,
} from 'features/preferences/@x/account'
import { Account } from 'entities/account'
import { Center } from 'shared/ui'
import { getAccountColumns } from './tableColumns'

export interface AccountsListProps {
  accounts: Account[]
  isLoading: boolean
}

export const AccountsTable = ({ accounts, isLoading }: AccountsListProps) => {
  const [accountsInTable, setAccountsInTable] = useState(accounts)

  const [showTrigger] = useShowAccountMutation()
  const [hideTrigger] = useHideAccountMutation()

  useEffect(() => {
    setAccountsInTable(accounts)
  }, [accounts])

  const show = async (data: ShowAccountReq) => {
    await showTrigger(data)
    setAccountsInTable((accs) =>
      accs.map((acc) => ({
        ...acc,
        hidden: acc.id === data.accountId ? false : acc.hidden,
      }))
    )
  }

  const hide = async (data: HideAccountReq) => {
    await hideTrigger(data)
    setAccountsInTable((accs) =>
      accs.map((acc) => ({
        ...acc,
        hidden: acc.id === data.accountId ? true : acc.hidden,
      }))
    )
  }

  return (
    <Center>
      <Table
        rowKey={(record) => record.id}
        bordered
        className='w-full md:w-2/3 border-[1px] border-border border-solid rounded-lg'
        columns={getAccountColumns(show, hide)}
        dataSource={accountsInTable}
        pagination={{ pageSize: 7, showSizeChanger: false }}
        locale={{
          emptyText: isLoading ? <Skeleton active={true} /> : <Empty />,
        }}
      />
    </Center>
  )
}
