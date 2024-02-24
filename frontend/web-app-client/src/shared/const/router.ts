export enum AppRoutes {
  MAIN = '/',
  LOGIN = '/login',
  LOGOUT = '/logout',
  REGISTER = '/register',
  PROFILE = '/profile',

  LOAN_NEW = '/new_loan',
  LOANS = '/loans',
  LOAN = '/loan/:id',
  REPAY = '/repay/:id?',

  ACCOUNTS = '/accounts',
  ACCOUNT_NEW = '/account/new',
  ACCOUNT_HISTORY = '/accounts/:id/history',
  HISTORY = '/history',
  ACCOUNT_CLOSE = '/accounts/:id/close',
  OPERATIONS_MENU = '/operations_menu',
  OPERATION_RESULT = 'operation_result/:id',
  DEPOSIT = '/deposit/:id?',
  WITHDRAW = '/withdraw/:id?',
}

const route_rep =
  (route: string) =>
  (id = '') =>
    route.replace(/:id\??/, id).replace(/\/$/, '')

export const getAccountHistoryLink = route_rep(AppRoutes.ACCOUNT_HISTORY)
export const getAccountCloseLink = route_rep(AppRoutes.ACCOUNT_CLOSE)
export const getAccountDepositLink = route_rep(AppRoutes.DEPOSIT)
export const getAccountWithdrawLink = route_rep(AppRoutes.WITHDRAW)

export const getLoanLink = route_rep(AppRoutes.LOAN)
export const getLoanRepayLink = route_rep(AppRoutes.REPAY)
