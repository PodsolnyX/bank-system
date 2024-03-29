import {CurrencyType} from "../../common/CurrencyType.ts";

export interface TariffDto {
    id: string
    name: string
    periodInDays: number
    interestRate: number
    currencyTypes: CurrencyType[]
}