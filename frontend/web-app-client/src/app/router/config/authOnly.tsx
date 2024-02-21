import { RouteObject } from 'react-router-dom'
import { AppRoutes } from 'shared'
import {
  AccountOperationPage,
  AccountPage,
  AccountsPage,
  CreditPage,
  HistoryPage,
  LogoutPage,
  MainPage,
  NewAccountPage,
  OperationPage,
  ProfilePage,
  NewCreditPage,
} from 'pages'

import { privateWrapper } from 'app/router/lib'
import { OperationType } from 'entities/operation'

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
    element: <OperationPage type={OperationType.WITHDRAW} />,
  },
  {
    path: AppRoutes.DEPOSIT,
    element: <OperationPage type={OperationType.DEPOSIT} />,
  },
  {
    path: AppRoutes.HISTORY,
    element: <HistoryPage />
  },
  {
    path: AppRoutes.CREDITS,
    element: <CreditPage />,
  },
  {
    path: AppRoutes.MAIN,
    element: <MainPage />,
  },
  {
    path: AppRoutes.NEW_CREDIT,
    element: <NewCreditPage />,
  },
  {
    path: AppRoutes.ACCOUNT_NEW,
    element: <NewAccountPage />,
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
