import {CurrencyType} from "../../common/CurrencyType.ts";

export interface CreateTariffDto {
    name: string
    periodInDays: number
    interestRate: number
    currencyTypes: CurrencyType[]
}