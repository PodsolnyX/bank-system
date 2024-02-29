import { OperationType } from 'shared/entities'

export function getOperationName(type: OperationType) {
  switch (type) {
    case OperationType.DEPOSIT:
      return 'Перевод'
    case OperationType.WITHDRAW:
      return 'Снятие'
    case OperationType.LOAN_CHARGE:
      return 'Погашение'
    case OperationType.LOAN_INCOME:
      return 'Кредит'
    default:
      return 'Неизвестная операция'
  }
}
