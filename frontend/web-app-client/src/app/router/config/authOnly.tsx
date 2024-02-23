import { RouteObject } from 'react-router-dom'
import { OperationType } from 'shared/entities'
import { AppRoutes } from 'shared/const'

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
  CloseAccountPage,
} from 'pages'

import { privateWrapper } from 'app/router/lib'

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
    element: <HistoryPage />,
  },
  {
    path: AppRoutes.CREDITS,
    element: <CreditPage />,
  },
  {
    path: AppRoutes.REPAY,
    element: <OperationPage type={OperationType.REPAYMENT} />,
  },
  {
    path: AppRoutes.MAIN,
    element: <MainPage />,
  },
  {
    path: AppRoutes.CREDIT_NEW,
    element: <NewCreditPage />,
  },
  {
    path: AppRoutes.CREDIT,
    element: <CreditPage />,
  },
  {
    path: AppRoutes.ACCOUNT_NEW,
    element: <NewAccountPage />,
  },
  {
    path: AppRoutes.ACCOUNT_CLOSE,
    element: <CloseAccountPage />,
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
