import { OperationStatus, OperationType } from 'shared/entities'

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

export function getOperationStatusName(type: OperationStatus) {
  switch (type) {
    case OperationStatus.SUCCESS:
      return 'Успех'
    case OperationStatus.FAILURE:
      return 'Ошибка'
    case OperationStatus.PROCESSING:
      return 'В процессе'
    default:
      return 'Неизв.'
  }
}
