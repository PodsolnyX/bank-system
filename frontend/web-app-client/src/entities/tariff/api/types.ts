import { PaginationReq } from 'shared/api'
import { Tariff } from '../model'

export type GetTariffsReq = PaginationReq & {
  name?: string
  periodInDays?: number
  interestRate?: number
  currencyTypes?: string
}
export type GetTariffsResp = Tariff[]
