import { OperationType } from 'entities/operation/model/types'
import { AppRoutes, getAccountDepositLink, getAccountWithdrawLink } from 'shared'

import arrow from 'assets/arrow.svg'
import arrowDown from 'assets/arrowDown.svg'

export interface TransferAssets {
  title: string
  arrow: string | undefined
  route: string
}

export function getTransferAssets(type: OperationType) {
  switch (type) {
    case OperationType.DEPOSIT:
      return {
        title: 'Внести деньги',
        arrow,
        route: getAccountDepositLink(),
      }
    case OperationType.WITHDRAW:
      return {
        title: 'Cнять деньги',
        arrow: arrowDown,
        route: getAccountWithdrawLink(),
      }
    case OperationType.REPAYMENT:
      return {
        title: 'Погашение кредита',
        arrow: arrowDown,
        route: AppRoutes.CREDITS,
      }
    default:
      return {
        title: 'Неизвестная операция',
        arrow: undefined,
        route: AppRoutes.MAIN,
      }
  }
}
