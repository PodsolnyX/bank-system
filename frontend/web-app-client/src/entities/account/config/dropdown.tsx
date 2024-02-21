import { MenuProps } from 'antd'
import { Link } from 'react-router-dom'

import { Account } from 'entities/account/model/types'
import { AppRoutes, getAccountCloseLink, getAccountHistoryLink } from 'shared'

export const getDropdownItemsDescr = (account: Account): MenuProps['items'] => [
  {
    label: <Link to={getAccountHistoryLink(account.id)}>История</Link>,
    disabled: false,
    key: 'history',
  },
  {
    label: <Link to={AppRoutes.DEPOSIT}>Пополнить</Link>,
    disabled: account.closed,
    key: 'deposit',
  },
  {
    label: <Link to={AppRoutes.WITHDRAW}>Снять</Link>,
    disabled: account.closed,
    key: 'withdraw'
  },
  {
    label: <Link to={getAccountCloseLink(account.id)}>Закрыть</Link>,
    disabled: account.closed || account.balance > 0,
    key: 'close'
  },
]
