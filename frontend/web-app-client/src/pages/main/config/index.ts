import accountsIcon from 'shared/assets/card.svg'
import loanIcon from 'shared/assets/loan.svg'
import profileIcon from 'shared/assets/user.svg'
import { AppRoutes } from 'shared/config'
import { MenuCardProps } from '../ui/menuCard'

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
    title: 'Профиль',
    link: AppRoutes.PROFILE,
    icon: profileIcon,
  },
]
