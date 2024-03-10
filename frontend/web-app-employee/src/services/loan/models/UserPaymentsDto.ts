import {LoanDto} from "./LoanDto";

export type UserPaymentsDto = {
    id: string,
    loan: LoanDto,
    amountForPay: number,
    alreadyPaid: number,
    paidAt?: string,
    isActual: boolean,
    penaltyFee: number,
    createdAt: string
}