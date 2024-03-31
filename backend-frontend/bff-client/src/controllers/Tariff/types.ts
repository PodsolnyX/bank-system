import { Request } from 'express'
import { PaginationReq } from 'dto/Common/req'
import { SearchTariffDto } from 'dto/Tariff/req'

export type GetTariffsReq = Request<{}, {}, {}, PaginationReq<SearchTariffDto>>
