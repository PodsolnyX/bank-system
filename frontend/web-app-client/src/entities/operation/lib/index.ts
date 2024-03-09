import { OperationReason, OperationStatus, OperationType } from 'shared/entities'

export function getOperationName(type: OperationType, reason: OperationReason) {
  const names = {
    [OperationType.DEPOSIT]: {
      [OperationReason.CASH]: 'Пополнение',
      [OperationReason.LOAN]: 'Заём',
    },
    [OperationType.WITHDRAW]: {
      [OperationReason.CASH]: 'Снятие',
      [OperationReason.LOAN]: 'Погашение',
    },
  }
  return names[type][reason] || 'Неизвестная операция'
}

export function getOperationCode(type: OperationType, reason: OperationReason) {
  const names = {
    [OperationType.DEPOSIT]: {
      [OperationReason.CASH]: 0,
      [OperationReason.LOAN]: 1,
    },
    [OperationType.WITHDRAW]: {
      [OperationReason.CASH]: 2,
      [OperationReason.LOAN]: 3,
    },
  }
  return names[type][reason] || -1
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
