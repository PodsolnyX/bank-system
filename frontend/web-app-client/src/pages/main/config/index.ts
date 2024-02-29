import { AppRoutes } from 'shared/const'
import { MenuCardProps } from '../ui/menuCard'

import accountsIcon from 'assets/card.svg'
import loanIcon from 'assets/loan.svg'
import historyIcon from 'assets/history.svg'
import profileIcon from 'assets/user.svg'

export const MainMenuItems: MenuCardProps[] = [
  {
    title: 'Счета',
    link: AppRoutes.ACCOUNTS,
    icon: accountsIcon,
  },
  {
    title: 'Кредиты',
    link: AppRoutes.LOANS,
    icon: loanIcon,
  },
  {
    title: 'История',
    link: AppRoutes.HISTORY,
    icon: historyIcon,
  },
  {
    title: 'Профиль',
    link: AppRoutes.PROFILE,
    icon: profileIcon,
  },
]
