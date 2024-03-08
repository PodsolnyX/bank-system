
export interface OperationDto {
    id: string
    accountId: string
    loanId?: string
    type: OperationType
    status: OperationStatus
    amount: number
    createdAt: string
    message?: string,
    currencyType: string
}

export enum OperationType {
    Deposit = "Deposit",
    Withdraw = "Withdraw",
    LoanCharge = "LoanCharge",
    LoanIncome = "LoanIncome",
}

export enum OperationStatus {
    Success = "Success",
    Failure = "Failure",
    Processing = "Processing",
}