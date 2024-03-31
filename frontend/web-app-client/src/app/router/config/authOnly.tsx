import { RouteObject } from 'react-router-dom'
import {
  AccountPage,
  AccountsPage,
  LoanPage,
  LoansListPage,
  MainPage,
  NewAccountPage,
  TransferPage,
  ProfilePage,
  NewLoanPage,
  CloseAccountPage,
  ChargeLoanPage,
  RatingPage,
  OperationPage,
} from 'pages'
import { AppRoutes } from 'shared/config'
import { privateWrapper } from '../lib'

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
    element: <OperationPage type={'withdraw'} />,
  },
  {
    path: AppRoutes.DEPOSIT,
    element: <OperationPage type={'deposit'} />,
  },
  {
    path: AppRoutes.LOANS,
    element: <LoansListPage />,
  },
  {
    path: AppRoutes.RATING,
    element: <RatingPage />,
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
    path: AppRoutes.TRANSFER_SELF,
    element: <TransferPage type='self' />,
  },
  {
    path: AppRoutes.TRANSFER_ANOTHER,
    element: <TransferPage type='external' />,
  },
  {
    path: AppRoutes.PROFILE,
    element: <ProfilePage />,
  },
]

export const privateRoutes = privateWrapper(_privateRoutes)
