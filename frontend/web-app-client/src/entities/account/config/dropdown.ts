import { Account } from 'entities/account/model/types'
import { DropdownItemDescr } from 'entities/account/ui/dropdown'
import { AppRoutes, getAccountCloseLink, getAccountHistoryLink } from 'shared'

export const getDropdownItemsDescr = (account: Account): DropdownItemDescr[] => [
  {
    label: 'История',
    isVisible: true,
    link: getAccountHistoryLink(account.id),
  },
  {
    label: 'Пополнить',
    isVisible: !account.closed,
    link: AppRoutes.DEPOSIT,
  },
  {
    label: 'Снять',
    isVisible: !account.closed,
    link: AppRoutes.WITHDRAW,
  },
  {
    label: 'Закрыть',
    isVisible: !account.closed && account.balance <= 0,
    link: getAccountCloseLink(account.id),
  },
]
