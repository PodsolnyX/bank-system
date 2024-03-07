import {CurrencyType} from "../../entities/Currency";

export type CreateTariffDto = {
    name: string
    periodInDays: number
    interestRate: number
    currencyTypes: CurrencyType[]
}