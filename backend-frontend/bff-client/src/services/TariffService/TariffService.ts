import { AuthInfo } from 'common'
import { PaginationReq } from 'dto/Common/req'
import { SearchTariffDto } from 'dto/Tariff/req'
import { TariffRepo } from 'repos/TariffRepo'

class TariffService {
  private _TariffRepo: TariffRepo

  constructor(TariffRepo: TariffRepo) {
    this._TariffRepo = TariffRepo
  }

  async GetTariffs(Dto: PaginationReq<SearchTariffDto>, AuthInfo: AuthInfo) {
    return await this._TariffRepo.GetTariffs(Dto, AuthInfo)
  }
}

export default TariffService
