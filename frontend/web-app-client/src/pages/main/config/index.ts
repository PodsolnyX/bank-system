import { AppRoutes } from 'shared'
import { MenuCardProps } from 'pages/main/ui/menuCard'

import accountsIcon from 'assets/card.svg'
import creditIcon from 'assets/credit.svg'
import historyIcon from 'assets/history.svg'

export const MainMenuItems: MenuCardProps[] = [
  {
    title: 'Счета',
    link: AppRoutes.ACCOUNTS,
    icon: accountsIcon,
  },
  {
    title: 'Кредиты',
    link: AppRoutes.CREDITS,
    icon: creditIcon,
  },
  {
    title: 'История',
    link: AppRoutes.HISTORY,
    icon: historyIcon,
  },
]
