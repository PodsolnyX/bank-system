import { RouteObject } from 'react-router-dom'
import { OperationType } from 'shared/entities'
import { AppRoutes } from 'shared/const'

import {
  AccountPage,
  AccountsPage,
  LoanPage,
  LoansListPage,
  HistoryPage,
  LogoutPage,
  MainPage,
  NewAccountPage,
  OperationPage,
  ProfilePage,
  NewLoanPage,
  CloseAccountPage,
  ChargeLoanPage,
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
    path: AppRoutes.LOANS,
    element: <LoansListPage />,
  },
  {
    path: AppRoutes.REPAY,
    element: <ChargeLoanPage />,
  },
  {
    path: AppRoutes.MAIN,
    element: <MainPage />,
  },
  {
    path: AppRoutes.LOAN_NEW,
    element: <NewLoanPage />,
  },
  {
    path: AppRoutes.LOAN,
    element: <LoanPage />,
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
