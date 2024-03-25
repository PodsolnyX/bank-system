import { PaginationReq } from 'dto/Common'
import { SearchTariffDto } from 'dto/Loan'
import { TariffRepo } from 'repos/TariffRepo'

class TariffService {
  private _TariffRepo: TariffRepo

  constructor(TariffRepo: TariffRepo) {
    this._TariffRepo = TariffRepo
  }

  async GetTariffs(Dto: PaginationReq<SearchTariffDto>) {
    return await this._TariffRepo.GetTariffs(Dto)
  }
}

export default TariffService
