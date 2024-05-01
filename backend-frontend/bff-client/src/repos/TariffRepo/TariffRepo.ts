import { ReqMetaInfo } from 'common'
import { PaginationReq } from 'dto/Common/req'
import { SearchTariffDto } from 'dto/Tariff/req'
import { TariffDto } from 'dto/Tariff/resp'
import { LoanAPI } from 'repos/lib'

class TariffRepo {
  async GetTariffs(Dto: PaginationReq<SearchTariffDto>, AuthInfo: ReqMetaInfo) {
    return (
      await LoanAPI.Req(AuthInfo).get<TariffDto[]>('/tariff/user', {
        params: Dto,
      })
    ).data
  }
}

export default TariffRepo
