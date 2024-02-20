import { RouteObject } from 'react-router-dom'
import { AppRoutes } from 'shared'
import {
  AccountOperationPage,
  AccountPage,
  AccountsPage,
  CreditPage,
  LogoutPage,
  MainPage,
  OperationPage,
  ProfilePage,
  TariffsPage,
} from 'pages'

import { privateWrapper } from 'app/router/lib'

// These routes are only for authorized users

const _privateRoutes: RouteObject[] = [
  {
    path: AppRoutes.ACCOUNT_HISTORY,
    element: <AccountPage />,
  },
  {
    path: AppRoutes.ACCOUNTS,
    element: <AccountsPage />,
  },
  {
    path: AppRoutes.OPERATIONS_MENU,
    element: <AccountOperationPage />,
  },
  {
    path: AppRoutes.WITHDRAW,
    element: <OperationPage />,
  },
  {
    path: AppRoutes.DEPOSIT,
    element: <OperationPage />,
  },
  {
    path: AppRoutes.CREDIT,
    element: <CreditPage />,
  },
  {
    path: AppRoutes.MAIN,
    element: <MainPage />,
  },
  {
    path: AppRoutes.NEW_CREDIT,
    element: <TariffsPage />,
  },
  {
    path: AppRoutes.PROFILE,
    element: <ProfilePage />,
  },
  {
    path: AppRoutes.LOGOUT,
    element: <LogoutPage />,
  },
]

export const privateRoutes = privateWrapper(_privateRoutes)
