import { RouteObject } from 'react-router-dom'
import { AppRoutes } from 'shared'
import {
  AccountOperationPage,
  AccountPage,
  AccountsPage,
  CreditPage,
  MainPage,
  TariffsPage,
} from 'pages'

import { privateWrapper } from 'app/router/lib'

// These routes are only for authorized users

const _privateRoutes: RouteObject[] = [
  {
    path: AppRoutes.ACCOUNT,
    element: <AccountPage />,
  },
  {
    path: AppRoutes.ACCOUNTS,
    element: <AccountsPage />,
  },
  {
    path: AppRoutes.ACCOUNT_OPERATION,
    element: <AccountOperationPage />,
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
    path: AppRoutes.TARIFFS,
    element: <TariffsPage />,
  },
]

export const privateRoutes = privateWrapper(_privateRoutes)
