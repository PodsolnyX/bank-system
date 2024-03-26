import { AuthInfo } from 'common'
import { PaginationReq } from 'dto/Common'
import { SearchTariffDto, TariffDto } from 'dto/Loan'
import { LoanAPI } from 'repos/lib'

class TariffRepo {
  async GetTariffs(Dto: PaginationReq<SearchTariffDto>, AuthInfo: AuthInfo) {
    return (
      await LoanAPI.Req(AuthInfo).get<TariffDto[]>('/tariff/user', {
        params: Dto,
      })
    ).data
  }
}

export default TariffRepo
