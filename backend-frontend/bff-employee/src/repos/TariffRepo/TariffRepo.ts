import { PaginationReq } from 'dto/Common'
import { SearchTariffDto, TariffDto } from 'dto/Loan'
import { LoanAPI } from 'repos/lib'

class TariffRepo {
  async GetTariffs(Dto: PaginationReq<SearchTariffDto>) {
    return (
      await LoanAPI.Req.get<TariffDto[]>('/tariff/user', {
        params: Dto,
      })
    ).data
  }
}

export default TariffRepo
