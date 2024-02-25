import { AppRoutes, getAccountDepositLink, getAccountWithdrawLink } from 'shared/const'
import { OperationType } from 'shared/entities'

export interface TransferAssets {
  title: string
  route: string
}

export function getTransferAssets(type: OperationType) {
  switch (type) {
    case OperationType.DEPOSIT:
      return {
        title: 'Внести деньги',
        route: getAccountDepositLink(),
      }
    case OperationType.WITHDRAW:
      return {
        title: 'Cнять деньги',
        route: getAccountWithdrawLink(),
      }
    case OperationType.LOAN_CHARGE:
      return {
        title: 'Погашение кредита',
        route: AppRoutes.LOANS,
      }
    case OperationType.LOAN_INCOME:
      return {
        title: 'Взятие кредита',
        route: AppRoutes.LOAN_NEW,
      }
    default:
      return {
        title: 'Неизвестная операция',
        route: AppRoutes.MAIN,
      }
  }
}
