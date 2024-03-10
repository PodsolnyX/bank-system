import { Loan, Payment } from 'shared/entities'

export enum PaymentStatus {
  Closed,
  Paid,
  NotPaid,
  Partial,
  New
}

export const getPaymentStatus = (loan: Loan | null | undefined, payment?: Payment | null  | undefined): PaymentStatus => {
  if (loan?.isClosed) {
    return PaymentStatus.Closed
  }
  if (!payment) {
    return PaymentStatus.New
  }
  if (payment.alreadyPaid >= payment.amountForPay) {
    return PaymentStatus.Paid
  }
  return payment.alreadyPaid === 0 ? PaymentStatus.NotPaid : PaymentStatus.Partial
}

export type StatusDisplayInfo = {
  color: string
  text: string
  needToPay: boolean
}

export const getPaymentDisplayInfo = (
  loan: Loan | null | undefined, 
  payment: Payment | null | undefined
): StatusDisplayInfo => {
  const status = getPaymentStatus(loan, payment)

  switch (status) {
    case PaymentStatus.Closed:
      return {
        color: 'blue',
        text: 'Закрыт',
        needToPay: false,
      }
    case PaymentStatus.NotPaid:
      return {
        color: 'red',
        text: 'Не оплачен',
        needToPay: true,
      }
    case PaymentStatus.Paid:
      return {
        color: 'green',
        text: 'Оплачен',
        needToPay: false,
      }
    case PaymentStatus.Partial:
      return {
        color: 'orange',
        text: 'ч / о',
        needToPay: true,
      }
      case PaymentStatus.New:
        return {
          color: 'gray',
          text: 'Новый',
          needToPay: false,
        }
    default:
      return {
        color: 'gray',
        text: 'Неизв.',
        needToPay: false,
      }
  }
}
