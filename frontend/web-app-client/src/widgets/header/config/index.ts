import { AppRoutes } from 'shared/config'

export type MenuLinkDescription = {
  label: string
  to: string
}

const leftLinks: MenuLinkDescription[] = [
  {
    label: 'Счета',
    to: AppRoutes.ACCOUNTS,
  },
  /*  {
    label: 'Операции',
    to: AppRoutes.OPERATIONS_MENU,
  }, */
  {
    label: 'Кредиты',
    to: AppRoutes.LOANS,
  },
  {
    label: 'История',
    to: AppRoutes.HISTORY,
  },
]

const rightLinks: MenuLinkDescription[] = [
  {
    label: 'Профиль',
    to: AppRoutes.PROFILE,
  },
]

export const HeaderLinks = {
  left: leftLinks,
  right: rightLinks,
}
