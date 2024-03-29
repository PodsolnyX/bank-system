import { Link } from 'react-router-dom'
import { ItemType } from 'antd/lib/menu/hooks/useItems'

import { Account } from 'shared/entities'
import {
  getAccountCloseLink,
  getAccountHistoryLink,
  getAccountDepositLink,
  getAccountWithdrawLink,
} from 'shared/const'

export const getAccountActions = (account: Account): ItemType[] => [
  {
    label: <Link to={getAccountHistoryLink(account.id)}>История</Link>,
    disabled: false,
    key: 'history',
  },
  {
    label: <Link to={getAccountDepositLink(account.id)}>Пополнить</Link>,
    disabled: !!account.closedAt,
    key: 'deposit',
  },
  {
    label: <Link to={getAccountWithdrawLink(account.id)}>Снять</Link>,
    disabled: !!account.closedAt || account.amount <= 0,
    key: 'withdraw',
  },
  {
    label: <Link to={getAccountCloseLink(account.id)}>Закрыть</Link>,
    disabled: !!account.closedAt || account.amount > 0,
    key: 'close',
  },
]
