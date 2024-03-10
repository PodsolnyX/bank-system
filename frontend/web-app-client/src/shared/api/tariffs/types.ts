import { PaginationReq, Tariff } from 'shared/entities'

export type GetTariffsReq = PaginationReq & {
  name?: string
  periodInDays?: number
  interestRate?: number
  currencyTypes?: string
}
export type GetTariffsResp = Tariff[]
