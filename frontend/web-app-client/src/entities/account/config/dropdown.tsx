import { Link } from 'react-router-dom'
import { ItemType } from 'antd/lib/menu/hooks/useItems'

import { Account } from 'entities/account/model/types'
import {
  getAccountCloseLink,
  getAccountHistoryLink,
  getAccountDepositLink,
  getAccountWithdrawLink,
} from 'shared'

export const getDropdownItemsDescr = (account: Account): ItemType[] => [
  {
    label: <Link to={getAccountHistoryLink(account.id)}>История</Link>,
    disabled: false,
    key: 'history',
  },
  {
    label: <Link to={getAccountDepositLink(account.id)}>Пополнить</Link>,
    disabled: account.closed,
    key: 'deposit',
  },
  {
    label: <Link to={getAccountWithdrawLink(account.id)}>Снять</Link>,
    disabled: account.closed,
    key: 'withdraw',
  },
  {
    label: <Link to={getAccountCloseLink(account.id)}>Закрыть</Link>,
    disabled: account.closed || account.balance > 0,
    key: 'close',
  },
]
