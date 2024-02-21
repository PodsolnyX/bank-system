import { OperationType } from 'entities/operation/model/types'

export function getOperationName(type: OperationType) {
  switch (type) {
    case OperationType.DEPOSIT:
      return 'Перевод'
    case OperationType.WITHDRAW:
      return 'Снятие'
    case OperationType.REPAYMENT:
      return 'Погашение'
    default:
      return 'Неизвестная операция'
  }
}
