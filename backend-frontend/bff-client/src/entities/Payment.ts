import { Loan } from "entities/Loan"

export type Payment = {
    id: string
    loan: Loan
    amountForPay: number
    alreadyPaid: number
    paidAt?: string | null
    isActual: boolean
    penaltyFee: number
    createdAt: string
}