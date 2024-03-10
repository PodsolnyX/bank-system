

export enum OperationReason {
    Cash = "Cash",
    Loan = "Loan",
}

export type OperationDto = {
    id: string
    accountId: string
    loanId?: string
    type: OperationType
    status: OperationStatus
    reason: OperationReason
    amount: number
    createdAt: string
    message?: string
    currencyType: string
}

export enum OperationType {
    Deposit = "Deposit",
    Withdraw = "Withdraw",
}

export enum OperationStatus {
    Success = "Success",
    Failure = "Failure",
    Processing = "Processing",
}