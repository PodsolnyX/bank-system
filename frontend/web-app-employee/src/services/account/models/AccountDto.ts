
export interface AccountDto {
    id: string
    userId: string
    userName?: string
    isHidden: boolean
    amount: number
    closedAt?: string,
    currencyType: string,
    isPriority: boolean
}