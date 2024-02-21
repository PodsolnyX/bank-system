import { OperationType } from 'entities/operation/model/types'
import { AppRoutes } from 'shared'

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
        route: AppRoutes.DEPOSIT,
      }
    case OperationType.WITHDRAW:
      return {
        title: 'Cнять деньги',
        arrow: arrowDown,
        route: AppRoutes.WITHDRAW,
      }
    case OperationType.REPAYMENT:
      return {
        title: 'Погашение кредита',
        arrow: arrowDown,
        route: AppRoutes.CREDIT,
      }
    default:
      return {
        title: 'Неизвестная операция',
        arrow: undefined,
        route: AppRoutes.MAIN,
      }
  }
}