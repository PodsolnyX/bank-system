import { ItemType } from 'antd/lib/menu/hooks/useItems'
import { Link } from 'react-router-dom'

import { MakePriorityReq } from 'features/account/api'
import { HideAccountReq, ShowAccountReq } from 'features/preferences/@x/account'
import { Account } from 'entities/account'
import {
  getAccountCloseLink,
  getAccountHistoryLink,
  getAccountDepositLink,
  getAccountWithdrawLink,
  getAccountTransferSelfLink,
  getAccountTransferAnotherLink,
} from 'shared/config'

export const getAccountActions = (
  account: Account,
  show: (data: ShowAccountReq) => any,
  hide: (data: HideAccountReq) => any,
  makePriority: (data: MakePriorityReq) => any
): ItemType[] => [
  {
    label: 'Сделать приоритетным',
    key: 'priority',
    disabled: !!account.closedAt || account.isPriority,
    onClick: () => makePriority({accountId: account.id})
  },
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
    label: <Link to={getAccountTransferSelfLink(account.id)}>Перевод себе</Link>,
    disabled: !!account.closedAt,
    key: 'transferSelf',
  },
  {
    label: <Link to={getAccountTransferAnotherLink(account.id)}>Перевод другому</Link>,
    disabled: !!account.closedAt || account.amount <= 0,
    key: 'transfer',
  },
  {
    label: <Link to={getAccountCloseLink(account.id)}>Закрыть</Link>,
    disabled: !!account.closedAt || account.amount > 0,
    key: 'close',
  },
  {
    label: <div>{account.hidden ? 'Показывать' : 'Не показывать'}</div>,
    key: 'show',
    onClick: () =>
      account.hidden ? show({ accountId: account.id }) : hide({ accountId: account.id }),
  },
]
