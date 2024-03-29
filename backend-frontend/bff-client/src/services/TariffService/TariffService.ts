import { PaginationReq, WithUser } from 'dto/Common'
import { SearchTariffDto } from 'dto/Loan'
import { TariffRepo } from 'repos/TariffRepo'

class TariffService {
  private _TariffRepo: TariffRepo

  constructor(TariffRepo: TariffRepo) {
    this._TariffRepo = TariffRepo

    this.GetTariffs = this.GetTariffs.bind(this)
  }

  async GetTariffs(Dto: WithUser<PaginationReq<SearchTariffDto>>) {
    return await this._TariffRepo.GetTariffs(Dto)
  }
}

export default TariffService
