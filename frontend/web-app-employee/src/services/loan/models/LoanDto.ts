import {CurrencyType} from "../../common/CurrencyType.ts";
import {TariffDto} from "../../tariff/models/TariffDto.ts";

export type LoanDto = {
    id: string
    userId: string
    accountId: string
    tariff: TariffDto
    lastChargeDate?: string
    currencyType: CurrencyType
    sum: number
    debt: number
}
