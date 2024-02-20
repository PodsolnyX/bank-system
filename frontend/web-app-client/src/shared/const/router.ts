export enum AppRoutes {
  MAIN = '/',
  LOGIN = '/login',
  LOGOUT = '/logout',
  REGISTER = '/register',
  PROFILE = '/profile',

  NEW_CREDIT = '/new_credit',
  CREDIT = '/credits',

  ACCOUNTS = '/accounts',
  ACCOUNT_NEW = '/account/new',
  ACCOUNT_HISTORY = '/accounts/:id/history',
  ACCOUNT_CLOSE = '/accounts/:id/close',
  OPERATIONS_MENU = '/operations_menu',
  OPERATION_RESULT = 'operation_result/:id',
  DEPOSIT = '/deposit',
  WITHDRAW = '/withdraw',
}

export const getAccountHistoryLink = (id: string) =>
  AppRoutes.ACCOUNT_HISTORY.replace(':id', id)
export const getAccountCloseLink = (id: string) =>
  AppRoutes.ACCOUNT_CLOSE.replace(':id', id)
