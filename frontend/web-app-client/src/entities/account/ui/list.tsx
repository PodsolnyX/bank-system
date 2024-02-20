import { List } from 'antd'
import cs from 'classnames'
import { Center } from 'shared'
import { getDropdownItemsDescr } from 'entities/account/config/dropdown'
import { Account, Dropdown } from 'entities/account'

export interface AccountsListProps {
  accounts: Account[]
}

export const AccountsList = ({ accounts }: AccountsListProps) => {
  return (
    <Center>
      <div className='w-full flex justify-center'>
        <List bordered className='overflow-hidden w-full md:w-2/3'>
          {accounts.map((account, index) => (
            <List.Item
              key={index}
              className={cs(account.closed ? 'bg-red-100' : 'bg-white')}
            >
              <div className='flex items-center w-full'>
                <div>{`${account.name} | ${account.balance} руб.`}</div>
                <div className='ml-auto'>
                  <Dropdown items={getDropdownItemsDescr(account)} />
                </div>
              </div>
            </List.Item>
          ))}
        </List>
      </div>
    </Center>
  )
}
