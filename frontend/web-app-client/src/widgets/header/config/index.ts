import { AppRoutes } from 'shared'

export type MenuLinkDescription = {
  label: string
  to: string
}

const leftLinks: MenuLinkDescription[] = [
  {
    label: 'Счета',
    to: AppRoutes.ACCOUNTS,
  },
  {
    label: 'Операции',
    to: AppRoutes.OPERATIONS_MENU,
  },
  {
    label: 'Кредиты',
    to: AppRoutes.CREDITS,
  },
  {
    label: 'История',
    to: AppRoutes.HISTORY,
  },
]

const rightLinks: MenuLinkDescription[] = [
  /* {
    label: 'Профиль',
    to: AppRoutes.PROFILE,
  },
  {
    label: 'Выход',
    to: AppRoutes.LOGOUT,
  },*/
]

export const HeaderLinks = {
  left: leftLinks,
  right: rightLinks,
}
