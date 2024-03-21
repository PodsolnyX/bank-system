import { OperationType } from 'entities/operation'
import { AppRoutes, getAccountDepositLink, getAccountWithdrawLink } from 'shared/config'

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
    default:
      return {
        title: 'Неизвестная операция',
        route: AppRoutes.MAIN,
      }
  }
}
