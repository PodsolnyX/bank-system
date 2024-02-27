import { CurrencyType } from "entities/Currency"

export type RequestLoanDto = {
    AccountId: string
    TariffId: string
    MoneyAmount: number
    CurrencyType: CurrencyType
}