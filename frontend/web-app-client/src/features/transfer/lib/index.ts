import { AppRoutes, getAccountDepositLink, getAccountWithdrawLink } from 'shared/const'
import { OperationType } from 'shared/entities'

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
    case OperationType.LOAN_CHARGE:
      return {
        title: 'Погашение кредита',
        arrow: arrowDown,
        route: AppRoutes.LOANS,
      }
    case OperationType.LOAN_INCOME:
      return {
        title: 'Взятие кредита',
        arrow,
        route: AppRoutes.LOAN_NEW,
      }
    default:
      return {
        title: 'Неизвестная операция',
        arrow: undefined,
        route: AppRoutes.MAIN,
      }
  }
}
